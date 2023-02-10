const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  positiondiff,
  prevScrollLeft;
function showHideIcons() {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
}
function autoSlide() {
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;
  positiondiff = Math.abs(positiondiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positiondiff;
  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      positiondiff > firstImgWidth / 3 ? valDifference : -positiondiff);
  }
  carousel.scrollLeft -=
    positiondiff > firstImgWidth / 3 ? valDifference : -positiondiff;
  //   console.log(valDifference);
}
arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14;
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});
function dragStart(e) {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
}
function dragging(e) {
  if (!isDragStart) return;
  e.preventDefault();
  carousel.classList.add("dragging");
  isDragging = true;
  positiondiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positiondiff;
  showHideIcons();
}
function dragStop() {
  isDragStart = false;
  carousel.classList.remove("dragging");
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
