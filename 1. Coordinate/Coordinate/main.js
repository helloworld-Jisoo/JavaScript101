
const lineX = document.querySelector(".X");
const lineY = document.querySelector(".Y");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");
const targetRect = target.getBoundingClientRect();
const targetHalfWidth = targetRect.width/2;
const targetHalfHeight = targetRect.height/2;

document.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;

  lineY.style.transform = `translateX(${x}px)`
  lineX.style.transform = `translateY(${y}px)`
  target.style.transform = `translate(${ x - targetHalfWidth}px, ${ y - targetHalfHeight}px)`
  tag.style.transform = `translate(${x}px, ${y}px)`

  tag.innerHTML = `${x}px ${y}px`
});