document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burgerMenu");
  const mobileMenu = document.querySelector(".mobileMenu");
  const body = document.body;

  burgerMenu.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    body.classList.toggle("no-scroll");
  });

  // Accordion functionality
  document.querySelectorAll(".menuAccordionHeader").forEach((header) => {
    header.addEventListener("click", function () {
      const accordion = this.closest(".menuAccordion");
      const content = accordion.querySelector(".menuAccordionContent");
      const arrow = this.querySelector(".accordionArrow");

      // Close all other accordions
      document.querySelectorAll(".menuAccordion").forEach((acc) => {
        if (acc !== accordion && acc.classList.contains("active")) {
          acc.classList.remove("active");
          acc.querySelector(".menuAccordionContent").style.maxHeight = null;
          acc.querySelector(".accordionArrow").style.transform = "rotate(0deg)";
        }
      });

      // Toggle the clicked accordion
      accordion.classList.toggle("active");

      if (accordion.classList.contains("active")) {
        arrow.style.transform = "rotate(180deg)";
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        arrow.style.transform = "rotate(0deg)";
        content.style.maxHeight = null;
      }
    });
  });

  document.querySelectorAll(".accordionHeader").forEach((header) => {
    header.addEventListener("click", function () {
      const accordion = this.closest(".accordion");
      const content = accordion.querySelector(".accordionContent");
      const arrow = this.querySelector(".accordionArrow");

      // Close all other accordions
      document.querySelectorAll(".accordion").forEach((acc) => {
        if (acc !== accordion && acc.classList.contains("active")) {
          acc.classList.remove("active");
          acc.querySelector(".accordionContent").style.maxHeight = null;
          acc.querySelector(".accordionArrow").style.transform = "rotate(0deg)";
        }
      });

      // Toggle the clicked accordion
      accordion.classList.toggle("active");

      if (accordion.classList.contains("active")) {
        arrow.style.transform = "rotate(180deg)";
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        arrow.style.transform = "rotate(0deg)";
        content.style.maxHeight = null;
      }
    });
  });
});
