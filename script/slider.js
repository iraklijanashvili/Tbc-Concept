document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".gridTemplate");
  let isDown = false;
  let startX;
  let scrollLeft;
  let velocity = 0;
  let lastTime = null;
  let lastScrollLeft = slider.scrollLeft;
  let frame;

  const lerp = (start, end, factor) => start + (end - start) * factor;

  function updateScroll(timestamp) {
    if (!lastTime) {
      lastTime = timestamp;
      frame = requestAnimationFrame(updateScroll);
      return;
    }

    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if (!isDown) {
      velocity *= 0.95;
      if (Math.abs(velocity) > 0.1) {
        slider.scrollLeft += (velocity * deltaTime) / 16;
      }
    }

    slider.scrollLeft = lerp(
      slider.scrollLeft,
      Math.round(slider.scrollLeft),
      0.2
    );

    // Calculate new velocity
    const currentScrollLeft = slider.scrollLeft;
    velocity = (currentScrollLeft - lastScrollLeft) / (deltaTime / 16);
    lastScrollLeft = currentScrollLeft;

    frame = requestAnimationFrame(updateScroll);
  }

  function handleDragStart(e) {
    isDown = true;
    slider.style.cursor = "grabbing";
    startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  }

  function handleDragEnd() {
    isDown = false;
    slider.style.cursor = "grab";
  }

  function handleDragMove(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.2; // Slightly reduced for more precise control
    slider.scrollLeft = scrollLeft - walk;
  }

  function addListeners() {
    if (window.innerWidth < 768) {
      slider.addEventListener("mousedown", handleDragStart);
      slider.addEventListener("touchstart", handleDragStart, { passive: true });

      slider.addEventListener("mousemove", handleDragMove);
      slider.addEventListener("touchmove", handleDragMove, { passive: false });

      slider.addEventListener("mouseleave", handleDragEnd);
      slider.addEventListener("mouseup", handleDragEnd);
      slider.addEventListener("touchend", handleDragEnd);
    } else {
      slider.removeEventListener("mousedown", handleDragStart);
      slider.removeEventListener("touchstart", handleDragStart);

      slider.removeEventListener("mousemove", handleDragMove);
      slider.removeEventListener("touchmove", handleDragMove);

      slider.removeEventListener("mouseleave", handleDragEnd);
      slider.removeEventListener("mouseup", handleDragEnd);
      slider.removeEventListener("touchend", handleDragEnd);
    }
  }

  addListeners();
  frame = requestAnimationFrame(updateScroll);

  window.addEventListener("resize", addListeners);
});
