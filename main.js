/* =====================================================================
   VOS RÉALISATIONS
   Pour ajouter un meuble : déposez ses photos dans le dossier images/
   puis ajoutez un bloc ci-dessous. La première photo est la principale.
   ===================================================================== */
const REALISATIONS = [
  {
    titre: 'Bergère gondole',
    materiaux: 'Acajou, tissu jaune et galon doré',
    photos: [
      'images/fauteuil-club-art-deco-1.jpg', // couverture : vue de face
      'images/fauteuil-club-art-deco-2.jpg',
      'images/fauteuil-club-art-deco-3.jpg',
      'images/fauteuil-club-art-deco-4.jpg',
      'images/fauteuil-club-art-deco-5.jpg',
      'images/fauteuil-club-art-deco-6.jpg',
      'images/fauteuil-club-art-deco-7.jpg',
    ],
  },
  {
    titre: 'Chaise Paganini',
    materiaux: 'Noyer, cuir vachette pleine fleur',
    photos: [
      'images/chaise-paganini-1.jpg', // couverture
      'images/chaise-paganini-2.jpg',
      'images/chaise-paganini-3.jpg',
      'images/chaise-paganini-4.jpg',
      'images/chaise-paganini-5.jpg',
    ],
  },
  {
    titre: 'Banc à claire-voie',
    materiaux: 'Sapin, teinte chêne moyen, vernis brillant',
    photos: [
      'images/banc-sapin-brutaliste-1.jpg', // couverture
      'images/banc-sapin-brutaliste-2.jpg',
    ],
  },
  {
    titre: 'Meuble d’écoute',
    materiaux: 'Contreplaqué peuplier tranche apparente, teinte noyer et brillant mat, cuir vachette, cannage naturel',
    photos: [
      'images/meuble-vinyle-1.jpg', // couverture
      'images/meuble-vinyle-2.jpg',
      'images/meuble-vinyle-3.jpg',
      'images/meuble-vinyle-5.jpg',
      'images/meuble-vinyle-6.jpg',
    ],
  },
  {
    titre: 'Tête de lit panneautée',
    materiaux: 'MDF, mousse, tissu bleu glacier, liseuses métal blanc, chêne clair',
    photos: [
      'images/tete-de-lit-1.jpg', // couverture
      'images/tete-de-lit-2.jpg',
      'images/tete-de-lit-3.jpg',
      'images/tete-de-lit-4.jpg',
    ],
  },
  {
    titre: 'Tabouret en U',
    materiaux: 'Hêtre lamellé-collé, teinte noyer, vernis mat, tissu zèbre bouclette',
    photos: [
      'images/tabouret-zebre-1.jpg', // couverture
      'images/tabouret-zebre-2.jpg',
      'images/tabouret-zebre-3.jpg',
    ],
  },
  {
    titre: 'Console de canapé',
    materiaux: 'MDF peint, vernis satiné',
    photos: [
      'images/etagere-canape-1.jpg', // couverture
      'images/etagere-canape-2.jpg',
      'images/etagere-canape-3.jpg',
    ],
  },
  {
    titre: 'Banquette d’angle',
    materiaux: 'Contreplaqué bouleau, chants visibles, teinte chêne foncé, cire d’ébéniste mate',
    photos: [
      'images/banquette-angle-1.jpg', // couverture
      'images/banquette-angle-2.jpg',
      'images/banquette-angle-3.jpg',
    ],
  },
  {
    titre: 'Bibliothèque d’encadrement',
    materiaux: 'MDF peint blanc, vernis satiné',
    photos: [
      'images/bibliotheque-murale-1.jpg', // couverture
      'images/bibliotheque-murale-2.jpg',
      'images/bibliotheque-murale-3.jpg',
    ],
  },
  {
    titre: 'Commode à galerie',
    materiaux: 'Contreplaqué frêne, bande de chant, teinte chêne moyen, vernis brillant',
    photos: [
      'images/commode-sdb-1.jpg', // couverture
      'images/commode-sdb-2.jpg',
      'images/commode-sdb-3.jpg',
    ],
  },
  {
    titre: 'Fauteuil-lit',
    materiaux: 'Tissu natté coton et lin, toile de jute, métal',
    photos: [
      'images/fauteuil-convertible-1.jpg', // couverture
      'images/fauteuil-convertible-2.jpg',
      'images/fauteuil-convertible-3.jpg',
      'images/fauteuil-convertible-4.jpg',
      'images/fauteuil-convertible-5.jpg',
      'images/fauteuil-convertible-6.jpg',
    ],
  },
];

/* ===================================================================== */

const pad = (n) => String(n).padStart(2, '0');
const chevron = (d) =>
  `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="${d}"/></svg>`;

function creerPiece(piece, index) {
  const n = piece.photos.length;
  const article = document.createElement('article');
  article.className = 'piece';
  article.innerHTML = `
    <div class="slider">
      <div class="track" tabindex="0" aria-label="Photos de ${piece.titre}">
        ${piece.photos.map((src, k) => `
          <img src="${src}" alt="${piece.titre} — vue ${k + 1}"
               loading="${index < 3 && k === 0 ? 'eager' : 'lazy'}" draggable="false">`).join('')}
      </div>
      ${n > 1 ? `
        <button class="arrow prev" type="button" aria-label="Photo précédente">${chevron('M10 3 5 8l5 5')}</button>
        <button class="arrow next" type="button" aria-label="Photo suivante">${chevron('m6 3 5 5-5 5')}</button>` : ''}
    </div>
    <div class="caption">
      <div class="caption-text">
        <h3 class="title">${piece.titre}</h3>
        <p class="materials">${piece.materiaux}</p>
      </div>
      ${n > 1 ? `<span class="counter" aria-live="polite">01 / ${pad(n)}</span>` : ''}
    </div>`;

  if (n > 1) {
    const track = article.querySelector('.track');
    const counter = article.querySelector('.counter');
    const courant = () => Math.round(track.scrollLeft / track.clientWidth);
    const aller = (i) => track.scrollTo({ left: ((i + n) % n) * track.clientWidth });

    article.querySelector('.prev').addEventListener('click', () => aller(courant() - 1));
    article.querySelector('.next').addEventListener('click', () => aller(courant() + 1));
    track.addEventListener('click', () => aller(courant() + 1));
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') aller(courant() + 1);
      if (e.key === 'ArrowLeft') aller(courant() - 1);
    });
    track.addEventListener('scroll', () => {
      counter.textContent = `${pad(courant() + 1)} / ${pad(n)}`;
    }, { passive: true });
  }
  return article;
}

const grille = document.getElementById('grid');
REALISATIONS.forEach((p, i) => grille.appendChild(creerPiece(p, i)));
document.getElementById('count').textContent =
  `${REALISATIONS.length} pièce${REALISATIONS.length > 1 ? 's' : ''}`;

// Année du copyright, toujours à jour
const annee = document.getElementById('annee');
if (annee) annee.textContent = new Date().getFullYear();
