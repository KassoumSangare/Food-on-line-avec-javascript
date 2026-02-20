// =============================
// ICON HOVER ANIMATION
// =============================
const icons = document.querySelectorAll(".icon");

icons.forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    icon.classList.remove("iconAnimate");
    void icon.offsetWidth; // force reflow pour relancer l'animation
    icon.classList.add("iconAnimate");
  });
});

// =============================
// INTERSECTION OBSERVER
// =============================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const section = entry.target;

      // ABOUT SECTION
      if (section.classList.contains("about")) {
        const aboutLeft = section.querySelector(".about-left");
        const aboutRight = section.querySelector(".about-right");
        const img = aboutLeft?.querySelector("img");

        if (img) {
          img.classList.remove("about--image");

          // FIX : on rend aussi le parent visible (opacity: 0 → 1 via animate__animated)
          aboutLeft.classList.add("animate__animated");

          img.classList.add("animate__animated", "animate__backInLeft");

          img.addEventListener(
            "animationend",
            () => {
              img.classList.remove("animate__backInLeft");
              img.classList.add("about--image");
            },
            { once: true },
          );
        }

        if (aboutRight) {
          aboutRight.classList.add("animate__animated", "animate__backInRight");
        }
      }

      // HOME SECTION
      if (section.classList.contains("home")) {
        section.classList.add("animate__animated", "animate__fadeInDownBig");
      }

      // MENU
      if (section.classList.contains("menu")) {
        const boxs = document.querySelectorAll(".menu-box");
        boxs.forEach((box, index) =>
          setTimeout(() => {
            box.classList.add("animate__animated", "animate__fadeInUp");
          }, index * 200),
        );
      }

      // Gallary
      if (section.classList.contains("gallary")) {
        const cards = section.querySelectorAll(".gallary-box-1");
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("animate__animated", "animate__zoomIn");
            card.style.opacity = "1";
          }, index * 200);
        });
      }

      observer.unobserve(section);
    });
  },
  { threshold: 0.25 },
);

document
  .querySelectorAll("section")
  .forEach((section) => observer.observe(section));
