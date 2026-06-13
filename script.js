// ===============================
// VARIABLES
// ===============================
// ===============================
// VARIABLES
// ===============================
const leftCol = document.getElementById('left-col');
const rightCol = document.getElementById('right-col');
const mainContainer = document.getElementById('main-container');
const imagesContainer = document.getElementById('project-images');

const IPHONE_BREAKPOINT = 680;
let isSyncing = false;

// ===============================
// SYNC SCROLL COLONNES (desktop)
// ===============================
function syncFromLeft() {
  if (window.innerWidth <= IPHONE_BREAKPOINT || isSyncing) return;
  isSyncing = true;

  const leftMax = leftCol.scrollHeight - leftCol.clientHeight;
  const rightMax = rightCol.scrollHeight - rightCol.clientHeight;
  const ratio = leftCol.scrollTop / leftMax;

  rightCol.scrollTop = rightMax - (ratio * rightMax);
  isSyncing = false;
}

function syncFromLeft() {
  if (window.innerWidth <= IPHONE_BREAKPOINT || isSyncing) return;
  isSyncing = true;

  const leftMax = leftCol.scrollHeight - leftCol.clientHeight;
  const rightMax = rightCol.scrollHeight - rightCol.clientHeight;
  const ratio = leftCol.scrollTop / leftMax;

  rightCol.scrollTop = rightMax - (ratio * rightMax);
  isSyncing = false;
}

function syncFromRight() {
  if (window.innerWidth <= IPHONE_BREAKPOINT || isSyncing) return;
  isSyncing = true;

  const leftMax = leftCol.scrollHeight - leftCol.clientHeight;
  const rightMax = rightCol.scrollHeight - rightCol.clientHeight;
  const ratio = rightCol.scrollTop / rightMax;

  leftCol.scrollTop = leftMax - (ratio * leftMax);
  isSyncing = false;
}

leftCol.addEventListener('scroll', syncFromLeft);
rightCol.addEventListener('scroll', syncFromRight);

// ===============================
// RESIZE / LOAD
// ===============================
window.addEventListener('resize', () => {
  if (window.innerWidth <= IPHONE_BREAKPOINT) {
    leftCol.scrollTop = 0;
    rightCol.scrollTop = 0;
  } else {
    syncFromLeft();
  }
});

window.addEventListener('load', () => {
  if (window.innerWidth > IPHONE_BREAKPOINT) {
    rightCol.scrollTop = rightCol.scrollHeight - rightCol.clientHeight;
  }
});

// ===============================
// RETOUR ACCUEIL
// ===============================
function goHome() {
  mainContainer.classList.remove("hidden");
  document.getElementById('project-container').scrollTop = 0;
  document.getElementById('project-media').scrollTop = 0;
  document.getElementById('project-text').scrollTop = 0;
   document.getElementById('burger').classList.remove('open');
  document.getElementById('main-nav').classList.remove('open');
  // Rétablit la position des colonnes
  leftCol.scrollTop = 0;
  if (window.innerWidth > IPHONE_BREAKPOINT) {
    rightCol.scrollTop = rightCol.scrollHeight - rightCol.clientHeight;
  }
}

// ===============================
// BURGER MENU
// ===============================
function toggleMenu() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('main-nav');
  burger.classList.toggle('open');
  nav.classList.toggle('open');
}

document.querySelectorAll('#main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('burger').classList.remove('open');
    document.getElementById('main-nav').classList.remove('open');
  });
});

// ===============================
// DONNÉES PROJETS
// ===============================
const projects = {
  proj1: {
    title: "GRAVURE SUR MESURE - DECANTEUR <i>MANBA</i> RIEDEL",
    subtitle: "Gravure",
    desc: "Reproduction fidèle d'une signature originale, adaptée à la forme de l'objet grâce à un pochoir conçu sur mesure.",
    type: "CALLIGRAPHIE",
    textImage: "image/client-calli(1).webp",
    images: ["image/client-logo(1).webp","image/anim-baton(1).webp","image/anim-baton(1).webp","image/client-logo(4).webp","image/client-logo(2).webp","image/anim-baton(1).webp","image/client-logo(4).webp"]
  },
  proj2: {
    title: "PROJET 2",
    subtitle: "Animation",
    desc: "Description projet 2",
    type: "Animation",
    textImage:"mon-site1/image/GLH-9.webp",
    images: ["image/client-illu(1).webp","image/anim-baton(1).webp","image/client-illu(2).webp"]
  },
  proj3: {
    title: "PROJET 3",
    subtitle: "Calligraphie",
    desc: "Description projet 3",
    type: "Illustration",
    images: ["image/client-logo(3).webp","image/client-logo(4).webp"]
  },
  // — À remplir plus tard —
  proj4: { title: "PROJET 4", subtitle: "", desc: "", type: "", images: ["image/jaaj4.webp"] },
  proj5: { title: "PROJET 5", subtitle: "", desc: "", type: "", images: ["image/jaaj4.webp"] },
  proj6: { title: "PROJET 6", subtitle: "", desc: "", type: "", images: ["image/anim-baton(1).webp"] },
  proj7: { title: "PROJET 7", subtitle: "", desc: "", type: "", images: ["image/client-logo(3).webp"] },
  proj8: { title: "PROJET 8", subtitle: "", desc: "", type: "", images: ["image/client-illu(4).webp"] }
};

// ===============================
// NAVIGATION PROJETS
// ===============================
const projectKeys = Object.keys(projects);
let currentProjectIndex = 0;

function showProject(index) {
  const key = projectKeys[index];
  const project = projects[key];
  if (!project) return;

  // Texte
  document.getElementById('project-title').innerHTML = project.title;
  document.getElementById('project-desc').innerHTML = project.desc;
  document.getElementById('project-subtitle').innerText = project.subtitle;
  document.getElementById('project-type-label').innerText = project.type;

  // Image texte (colonne gauche)
  const textImg = document.getElementById('project-text-image');
  if (project.textImage) {
    textImg.src = project.textImage;
    textImg.style.display = "block";
  } else {
    textImg.style.display = "none";
  }

  // Images droite — 2 par ligne
  imagesContainer.innerHTML = "";
  for (let i = 0; i < project.images.length; i += 2) {
    const row = document.createElement("div");
    row.className = "project-row";
    project.images.slice(i, i + 2).forEach((src, j) => {
      const div = document.createElement("div");
      div.classList.add("project-img");
      div.classList.add((i + j) % 4 === 0 ? "wide" : "square");
      div.innerHTML = `<img src="${src}" alt="">`;
      row.appendChild(div);
    });
    imagesContainer.appendChild(row);
  }

  // Remettre le scroll images à zéro
  document.getElementById('project-media').scrollTop = 0;
  document.getElementById('project-text').scrollTop = 0;

  // Cacher l'accueil
  mainContainer.classList.add("hidden");
  currentProjectIndex = index;
}

// Flèches prev / next
document.getElementById('prev-project').addEventListener('click', () => {
  const prev = (currentProjectIndex - 1 + projectKeys.length) % projectKeys.length;
  showProject(prev);
});

document.getElementById('next-project').addEventListener('click', () => {
  const next = (currentProjectIndex + 1) % projectKeys.length;
  showProject(next);
});

// Click sur une vignette de l'accueil
document.querySelectorAll('.image-box').forEach(box => {
  box.addEventListener('click', () => {
    const key = box.dataset.project;
    const index = projectKeys.indexOf(key);
    if (index >= 0) showProject(index);
  });
});
