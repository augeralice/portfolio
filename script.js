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
// SYNC SCROLL COLONNES
// ===============================
function syncFromLeft() {
  if (window.innerWidth <= IPHONE_BREAKPOINT || isSyncing) return;
  isSyncing = true;
  rightCol.scrollTop = leftCol.scrollHeight - leftCol.scrollTop - leftCol.clientHeight;
  isSyncing = false;
}

function syncFromRight() {
  if (window.innerWidth <= IPHONE_BREAKPOINT || isSyncing) return;
  isSyncing = true;
  leftCol.scrollTop = leftCol.scrollHeight - rightCol.scrollTop - rightCol.clientHeight;
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
  } else syncFromLeft();
});

window.addEventListener('load', () => {
  if (window.innerWidth > IPHONE_BREAKPOINT) {
    rightCol.scrollTop = rightCol.scrollHeight - rightCol.clientHeight;
  }
});

// ===============================
// BOUTON LOGO → RETOUR ACCUEIL
// ===============================
function goHome() {
  leftCol.scrollTop = 0;
  rightCol.scrollTop = rightCol.scrollHeight - rightCol.clientHeight;
  mainContainer.classList.remove("hidden");
}

// ===============================
// PROJETS
// ===============================
const projects = {
  proj1: { 
    title: "GRAVURE SUR MESURE - DECANTEUR <i>MANBA</i>  RIEDEL", 
    subtitle: "Gravure", 
    desc: "Reproduction fidèle d’une signature originale, adaptée à la forme de l’objet grâce à un pochoir conçu sur mesure.",
    type: "CALLIGRAPHIE", 
    textImage: "image/client-calli(1).webp",
    images: ["image/client-logo(1).webp","image/anim-baton(1).webp","image/anim-baton(1).webp","image/client-logo(4).webp","image/client-logo(2).webp","image/anim-baton(1).webp","image/client-logo(4).webp"]
  },
  proj2: { 
    title: "PROJET 2", 
    subtitle: "Animation", 
    desc: "Description projet 2", 
    type: "Animation", 
    images: ["image/client-illu(1).webp","image/anim-baton(1).webp","image/client-illu(2).webp"]
  },
  proj3: { 
    title: "PROJET 3", 
    subtitle: "Calligraphie", 
    desc: "Description projet 3", 
    type: "Illustration", 
    images: ["image/client-logo(3).webp","image/client-logo(4).webp"]
  }
};

// ===============================
// NAVIGATION
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

  // Image texte
  const textImg = document.getElementById('project-text-image');
  if (project.textImage) {
    textImg.src = project.textImage;
    textImg.style.display = "block";
  } else textImg.style.display = "none";

  // Images droite – 2 par ligne
  imagesContainer.innerHTML = "";
  for (let i = 0; i < project.images.length; i += 2) {
    const row = document.createElement("div");
    row.className = "project-row";
    project.images.slice(i, i+2).forEach((src,j) => {
      const div = document.createElement("div");
      div.classList.add("project-img");
      div.classList.add((i+j)%4===0 ? "wide" : "square");
      div.innerHTML = `<img src="${src}" alt="">`;
      row.appendChild(div);
    });
    imagesContainer.appendChild(row);
  }

  document.getElementById('project-type-label').innerText = project.type;

  mainContainer.classList.add("hidden");
  currentProjectIndex = index;
}

// Back / Next
document.getElementById('prev-project').addEventListener('click', () => {
  const prev = (currentProjectIndex-1+projectKeys.length)%projectKeys.length;
  showProject(prev);
});
document.getElementById('next-project').addEventListener('click', () => {
  const next = (currentProjectIndex+1)%projectKeys.length;
  showProject(next);
});

// Click sur projet
document.querySelectorAll('.image-box').forEach(box => {
  box.addEventListener('click', () => {
    const key = box.dataset.project;
    const index = projectKeys.indexOf(key);
    if(index>=0) showProject(index);
  });
});
