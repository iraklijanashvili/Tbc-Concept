function initializeSlider(container) {
  const slider = container.querySelector(".offersSlider");
  const leftArrow = container.querySelector(".leftArrow");
  const rightArrow = container.querySelector(".rightArrow");
  const scrollbarLine = container.querySelector(".customScrollbar");
  const scrollbarThumb = container.querySelector(".scrollbarThumb");

  let isDragging = false;
  let startX;
  let scrollLeft;

  function updateScrollbar() {
    const scrollPercent =
      slider.scrollLeft / (slider.scrollWidth - slider.clientWidth);
    scrollbarThumb.style.left = `${
      scrollPercent * (scrollbarLine.clientWidth - scrollbarThumb.clientWidth)
    }px`;
    checkArrows();
  }

  function checkArrows() {
    leftArrow.classList.toggle("arrowDisabled", slider.scrollLeft === 0);
    rightArrow.classList.toggle(
      "arrowDisabled",
      slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 1
    );
  }

  slider.addEventListener("scroll", updateScrollbar);

  scrollbarThumb.addEventListener("mousedown", function (event) {
    const initialX = event.clientX;
    const initialLeft = scrollbarThumb.offsetLeft;

    function onMouseMove(event) {
      const deltaX = event.clientX - initialX;
      const newLeft = Math.min(
        Math.max(initialLeft + deltaX, 0),
        scrollbarLine.clientWidth - scrollbarThumb.clientWidth
      );
      scrollbarThumb.style.left = `${newLeft}px`;
      const scrollPercent =
        newLeft / (scrollbarLine.clientWidth - scrollbarThumb.clientWidth);
      slider.scrollLeft =
        scrollPercent * (slider.scrollWidth - slider.clientWidth);
      checkArrows();
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  leftArrow.addEventListener("click", function () {
    slider.scrollBy({
      left: -slider.clientWidth / 2,
      behavior: "smooth",
    });
  });

  rightArrow.addEventListener("click", function () {
    slider.scrollBy({
      left: slider.clientWidth / 2,
      behavior: "smooth",
    });
  });

  container.addEventListener("mousedown", function (event) {
    isDragging = true;
    startX = event.pageX - container.offsetLeft;
    scrollLeft = slider.scrollLeft;
    container.style.cursor = "grabbing";
    event.preventDefault();
  });

  container.addEventListener("mouseleave", function () {
    isDragging = false;
    container.style.cursor = "grab";
  });

  container.addEventListener("mouseup", function () {
    isDragging = false;
    container.style.cursor = "grab";
  });

  container.addEventListener("mousemove", function (event) {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
    updateScrollbar();
  });

  updateScrollbar();
  checkArrows();
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".sliderContainer").forEach(initializeSlider);
});
