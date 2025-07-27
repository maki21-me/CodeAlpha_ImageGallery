const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const filterButtons = document.querySelectorAll(".filters-inner button");

let allImages = [];
let filteredImages = [];
let currentIndex = 0;

// 🔄 Generate 600 images dynamically with 3 categories
const categories = ["nature", "city", "people"];
for (let i = 0; i < 600; i++) {
  const cat = categories[i % categories.length];
  const id = 100 + i;
  const src = `https://picsum.photos/id/${id}/600/400`;
  allImages.push({ src, alt: `${cat} ${i + 1}`, category: cat });
}

// 🖼️ Render Images and Attach Events
function renderImages(images) {
  gallery.innerHTML = images.map((img, index) => `
    <div class="image ${img.category}" data-index="${index}">
      <img src="${img.src}" alt="${img.alt}" />
    </div>
  `).join("");
  attachLightboxEvents(); // 👈 reattach click handlers
}

// 🧠 Setup lightbox clicks
function attachLightboxEvents() {
  const imageDivs = document.querySelectorAll(".gallery .image");
  imageDivs.forEach((div, index) => {
    div.dataset.index = index; // reassign index after render
    div.addEventListener("click", () => {
      currentIndex = index;
      lightboxImg.src = filteredImages[currentIndex].src;
      lightbox.classList.add("show");
    });
  });
}

// 🎯 Filter Button Clicks
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filters-inner .active")?.classList.remove("active");
    button.classList.add("active");

    const filter = button.dataset.filter;
    filteredImages = filter === "all"
      ? [...allImages]
      : allImages.filter(img => img.category === filter);

    renderImages(filteredImages);
  });
});

// ⏪ ⏩ Lightbox Controls
prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
  lightboxImg.src = filteredImages[currentIndex].src;
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % filteredImages.length;
  lightboxImg.src = filteredImages[currentIndex].src;
};

closeBtn.onclick = () => lightbox.classList.remove("show");

// ✅ Initial Load
filteredImages = [...allImages];
renderImages(filteredImages);
