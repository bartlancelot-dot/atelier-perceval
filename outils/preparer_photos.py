#!/usr/bin/env python3
"""Prépare une photo de meuble pour la grille du site (format portrait 4:5).

Usage :
    python3 outils/preparer_photos.py SOURCE.jpg images/DESTINATION.jpg [--mode auto|haut|bas|cotes]

- La photo est redressée (EXIF), mise au format 4:5 sans couper le meuble,
  réduite à 1800 px max et enregistrée en JPEG qualité 84.
- Pour atteindre le 4:5, on PROLONGE le fond du studio (bord flouté et fondu)
  au lieu de recadrer :
    auto  : photo en largeur -> fond prolongé en haut et en bas ;
            photo déjà proche du portrait -> inchangée (le site recadre légèrement au centre)
    haut  : prolonge seulement le haut (quand un objet touche le bas de la photo)
    bas   : prolonge seulement le bas (quand un objet touche le haut de la photo)
    cotes : prolonge les côtés (photo très haute dont le meuble occupe toute la hauteur)

Dépendance : Pillow (pip install Pillow)
"""
import argparse
from PIL import Image, ImageOps, ImageFilter, ImageDraw

RATIO = 4 / 5  # largeur / hauteur
FONDU = 70     # largeur du raccord en pixels


def _bande(im, box, taille):
    return im.crop(box).resize(taille).filter(ImageFilter.GaussianBlur(30))


def prolonger_vertical(im, haut=True, bas=True):
    W, H = im.size
    TH = int(W / RATIO)
    total = TH - H
    p_haut = total if (haut and not bas) else (0 if not haut else total // 2)
    p_bas = total - p_haut
    c = Image.new("RGB", (W, TH))
    if p_haut:
        c.paste(_bande(im, (0, 0, W, 40), (W, p_haut + FONDU)), (0, 0))
    if p_bas:
        b = _bande(im, (0, H - 40, W, H), (W, p_bas + FONDU))
        c.paste(b, (0, TH - b.size[1]))
    m = Image.new("L", (W, H), 255)
    d = ImageDraw.Draw(m)
    for i in range(FONDU):
        v = int(255 * i / FONDU)
        if p_haut:
            d.line([(0, i), (W, i)], fill=v)
        if p_bas:
            d.line([(0, H - 1 - i), (W, H - 1 - i)], fill=v)
    c.paste(im, (0, p_haut), m)
    return c


def prolonger_cotes(im):
    W, H = im.size
    TW = int(H * RATIO)
    if TW <= W:
        return im
    pad = (TW - W) // 2
    c = Image.new("RGB", (TW, H))
    c.paste(_bande(im, (0, 0, 30, H), (pad + FONDU, H)), (0, 0))
    r = _bande(im, (W - 30, 0, W, H), (TW - W - pad + FONDU, H))
    c.paste(r, (TW - r.size[0], 0))
    m = Image.new("L", (W, H), 255)
    d = ImageDraw.Draw(m)
    for i in range(FONDU):
        v = int(255 * i / FONDU)
        d.line([(i, 0), (i, H)], fill=v)
        d.line([(W - 1 - i, 0), (W - 1 - i, H)], fill=v)
    c.paste(im, (pad, 0), m)
    return c


def preparer(src, dst, mode="auto"):
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    W, H = im.size
    if mode == "cotes":
        im = prolonger_cotes(im)
    elif mode == "haut":
        im = prolonger_vertical(im, haut=True, bas=False)
    elif mode == "bas":
        im = prolonger_vertical(im, haut=False, bas=True)
    elif W / H > 0.85:  # auto : photo en largeur ou carrée
        im = prolonger_vertical(im)
    im.thumbnail((1800, 1800))
    im.save(dst, "JPEG", quality=84, optimize=True, progressive=True)
    print(f"{dst}  {im.size[0]}x{im.size[1]}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("source")
    ap.add_argument("destination")
    ap.add_argument("--mode", default="auto", choices=["auto", "haut", "bas", "cotes"])
    a = ap.parse_args()
    preparer(a.source, a.destination, a.mode)
