/*
 * Replace these empty strings when the real shop and social URLs are ready.
 * Example: etsyUrl: "https://www.etsy.com/shop/YourShopName"
 */
const siteConfig = Object.freeze({
  etsyUrl: "",
  instagramUrl: "https://www.instagram.com/marykathrineart",
});

/*
 * Gallery manifest: replace the SVG paths, titles, and alt text with real work.
 * `ratio` controls the card shape and `objectPosition` can adjust an image crop.
 */
const galleryItems = Object.freeze([
  {
    src: "assets/artwork/meadow-song.svg",
    title: "Meadow Song",
    alt: "Abstract placeholder artwork of blush wildflowers beneath a warm sun",
    ratio: "4 / 5",
    width: "30vw",
    objectPosition: "center",
  },
  {
    src: "assets/artwork/blue-hour.svg",
    title: "Blue Hour",
    alt: "Abstract placeholder landscape in lavender and blue with small field flowers",
    ratio: "5 / 4",
    width: "39vw",
  },
  {
    src: "assets/artwork/gathered-light.svg",
    title: "Gathered Light",
    alt: "Abstract placeholder artwork with golden light and delicate meadow stems",
    ratio: "3 / 4",
    width: "27vw",
  },
  {
    src: "assets/artwork/quiet-bloom.svg",
    title: "Quiet Bloom",
    alt: "Abstract placeholder artwork of a single cream flower against soft sage",
    ratio: "4 / 5",
    width: "30vw",
  },
  {
    src: "assets/artwork/lavender-path.svg",
    title: "Lavender Path",
    alt: "Abstract placeholder landscape with lavender hills and winding cream path",
    ratio: "5 / 4",
    width: "39vw",
  },
  {
    src: "assets/artwork/poppy-studies.svg",
    title: "Poppy Studies",
    alt: "Abstract placeholder study of coral poppies on warm paper",
    ratio: "1 / 1",
    width: "32vw",
  },
  {
    src: "assets/artwork/garden-after-rain.svg",
    title: "Garden After Rain",
    alt: "Abstract placeholder artwork of blue-green leaves and tiny rain-washed flowers",
    ratio: "3 / 4",
    width: "27vw",
  },
  {
    src: "assets/artwork/wild-at-heart.svg",
    title: "Wild at Heart",
    alt: "Abstract placeholder meadow filled with loose colorful wildflowers",
    ratio: "5 / 4",
    width: "39vw",
  },
]);

const linkKeys = {
  etsy: "etsyUrl",
  instagram: "instagramUrl",
};

const configuredLinks = document.querySelectorAll("[data-link]");

configuredLinks.forEach((link) => {
  const configKey = linkKeys[link.dataset.link];
  const configuredUrl = siteConfig[configKey];

  if (configuredUrl) {
    link.href = configuredUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.setAttribute("aria-disabled", "true");
    link.setAttribute("title", "Link coming soon");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("[data-link-status]")?.scrollIntoView({ block: "center" });
    });
  }
});

document.querySelector("[data-current-year]").textContent = new Date().getFullYear();

const header = document.querySelector("[data-site-header]");
const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const menuToggle = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const mobileNavigation = window.matchMedia("(max-width: 900px)");

const setMenuOpen = (isOpen) => {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  siteNav.classList.toggle("is-open", isOpen);
};

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

mobileNavigation.addEventListener("change", () => setMenuOpen(false));
document.documentElement.classList.add("nav-ready");

const track = document.querySelector("[data-gallery-track]");

const galleryMarkup = galleryItems.map((item, index) => `
  <li class="gallery-card" style="--card-ratio: ${item.ratio}; --card-width: ${item.width}">
    <button class="gallery-card__button" type="button" data-gallery-item="${index}" aria-label="Open ${item.title} in artwork viewer">
      <span class="gallery-card__image-wrap">
        <img src="${item.src}" alt="${item.alt}" ${index > 1 ? 'loading="lazy"' : ""} draggable="false" style="object-position: ${item.objectPosition || "center"}">
      </span>
      <span class="gallery-card__caption">
        <span>
          <span class="gallery-card__title">${item.title}</span>
          <span class="gallery-card__status">Studio placeholder</span>
        </span>
        <span class="gallery-card__number">${String(index + 1).padStart(2, "0")} / ${String(galleryItems.length).padStart(2, "0")}</span>
      </span>
    </button>
  </li>
`).join("");

track.innerHTML = galleryMarkup;

const galleryPrevious = document.querySelector("[data-gallery-previous]");
const galleryNext = document.querySelector("[data-gallery-next]");

const updateGalleryControls = () => {
  const maxScroll = track.scrollWidth - track.clientWidth;
  galleryPrevious.disabled = track.scrollLeft <= 2;
  galleryNext.disabled = track.scrollLeft >= maxScroll - 2;
};

const scrollGallery = (direction) => {
  track.scrollBy({ left: direction * track.clientWidth * 0.78, behavior: "smooth" });
};

galleryPrevious.addEventListener("click", () => scrollGallery(-1));
galleryNext.addEventListener("click", () => scrollGallery(1));
track.addEventListener("scroll", updateGalleryControls, { passive: true });
window.addEventListener("resize", updateGalleryControls);
requestAnimationFrame(updateGalleryControls);

track.addEventListener("wheel", (event) => {
  if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

  const maxScroll = track.scrollWidth - track.clientWidth;
  const canScrollForward = event.deltaY > 0 && track.scrollLeft < maxScroll - 2;
  const canScrollBackward = event.deltaY < 0 && track.scrollLeft > 2;

  if (canScrollForward || canScrollBackward) {
    event.preventDefault();
    track.scrollLeft += event.deltaY;
  }
}, { passive: false });

let pointerStartX = 0;
let pointerStartScroll = 0;
let isDragging = false;
let dragMoved = false;

track.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "touch") return;
  isDragging = true;
  dragMoved = false;
  pointerStartX = event.clientX;
  pointerStartScroll = track.scrollLeft;
  track.classList.add("is-dragging");
  track.setPointerCapture(event.pointerId);
});

track.addEventListener("pointermove", (event) => {
  if (!isDragging) return;
  const distance = event.clientX - pointerStartX;
  if (Math.abs(distance) > 5) dragMoved = true;
  track.scrollLeft = pointerStartScroll - distance;
});

const stopDragging = (event) => {
  if (!isDragging) return;
  isDragging = false;
  track.classList.remove("is-dragging");
  if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
  setTimeout(() => {
    dragMoved = false;
  }, 0);
};

track.addEventListener("pointerup", stopDragging);
track.addEventListener("pointercancel", stopDragging);

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxCount = document.querySelector("[data-lightbox-count]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const lightboxPrevious = document.querySelector("[data-lightbox-previous]");
const lightboxNext = document.querySelector("[data-lightbox-next]");

let activeArtworkIndex = 0;
let lastArtworkTrigger = null;

const renderLightboxArtwork = (index) => {
  activeArtworkIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeArtworkIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxTitle.textContent = item.title;
  lightboxCount.textContent = `${activeArtworkIndex + 1} of ${galleryItems.length}`;
};

const openLightbox = (index, trigger) => {
  lastArtworkTrigger = trigger;
  renderLightboxArtwork(index);
  document.body.classList.add("lightbox-open");
  lightbox.showModal();
  lightboxClose.focus();
};

track.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-gallery-item]");
  if (!trigger || dragMoved) {
    dragMoved = false;
    return;
  }
  openLightbox(Number(trigger.dataset.galleryItem), trigger);
});

lightboxClose.addEventListener("click", () => lightbox.close());
lightboxPrevious.addEventListener("click", () => renderLightboxArtwork(activeArtworkIndex - 1));
lightboxNext.addEventListener("click", () => renderLightboxArtwork(activeArtworkIndex + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    renderLightboxArtwork(activeArtworkIndex - 1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    renderLightboxArtwork(activeArtworkIndex + 1);
  }
});

lightbox.addEventListener("close", () => {
  document.body.classList.remove("lightbox-open");
  lastArtworkTrigger?.focus();
});

const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -4%" });

  revealElements.forEach((element) => observer.observe(element));
}
