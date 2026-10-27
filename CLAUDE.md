# Site vitrine — Atelier Perceval (mobilier & menuiserie)

Site **statique** (HTML / CSS / JS, sans framework ni build). Il se publie tel quel :
le dossier racine est le dossier publié.

## Structure
- `index.html` — structure et textes de la page (textes à compléter entre [crochets])
- `style.css` — design : palette neutre, typographies Cormorant Garamond (titres) + Jost (texte)
- `mentions-legales.html` — page des mentions légales (liée depuis le bas de page)
- `main.js` — **la liste `REALISATIONS`** en haut du fichier : une entrée par meuble
  (`titre`, `materiaux`, `photos`). La première photo de la liste est la couverture.
- `images/` — photos optimisées (format portrait 4:5, 1800 px max, JPEG qualité 84)
- `outils/preparer_photos.py` — prépare une photo brute au bon format (voir plus bas)

## Charte (à respecter dans toute modification)
- Style très épuré et neutre : ce sont les matières des photos qui font la couleur.
  Pas d'accent de couleur, pas d'ombres portées, pas d'effets.
- Titres : nom de typologie précis + au plus un qualificatif, sans répéter les matériaux
  (ex. « Bergère gondole », « Banc à claire-voie »). Majuscules gérées par le CSS.
- Matériaux : en italique sous le titre, séparés par des virgules, première lettre en majuscule.
- Apostrophes typographiques (’) dans les textes.
- Grille : 3 colonnes ordinateur, 2 tablette, 1 mobile. Ne pas casser le responsive.

## Ajouter un meuble
1. Préparer chaque photo avec l'outil (il crée le format 4:5 sans couper le meuble) :
   ```
   python3 outils/preparer_photos.py photo-brute.jpg images/nom-du-meuble-1.jpg
   ```
   Options : `--mode auto` (défaut), `haut`, `bas`, `cotes`.
   - Photo en largeur : l'outil prolonge le fond du studio en haut et en bas.
   - Si un objet touche le **bas** de la photo (couette, ombre) → `--mode haut` (prolonge seulement le mur).
   - Si un objet touche le **haut** (feuille de plante…) → `--mode bas` (prolonge seulement le sol).
   - Photo très haute dont le meuble occupe toute la hauteur → `--mode cotes`.
   Toujours vérifier visuellement le résultat avant de l'intégrer.
2. Ajouter l'entrée dans `REALISATIONS` (dans `main.js`), photo de couverture en premier.

## Aperçu local
```
python3 -m http.server 8000
```
puis ouvrir http://localhost:8000

## Publication
Hébergement statique (Netlify ou Cloudflare Pages) relié au dépôt GitHub :
chaque `git push` sur la branche principale publie automatiquement.
Pas de commande de build, dossier publié = racine. `netlify.toml` gère le cache.

## Reste à faire avant la mise en ligne
- [ ] Remplacer les textes entre [crochets] restants dans `index.html` (Instagram, ville)
- [ ] Compléter `mentions-legales.html` : forme juridique, adresse, SIRET, directeur de la publication,
      nom et adresse de l'hébergeur choisi
- [ ] Section « L'atelier » (présentation) : retirée pour l'instant, à recréer plus tard
      entre la grille et le contact quand le texte sera prêt
- [ ] Vérifier l'aperçu sur ordinateur et sur mobile
