
const lineX = document.querySelector(".X");
const lineY = document.querySelector(".Y");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");

document.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;

  lineY.style.left= `${x}px`; 
  lineX.style.top = `${y}px`;

  target.style.left= `${x}px`; 
  target.style.top = `${y}px`;
  tag.style.left= `${x}px`; 
  tag.style.top = `${y}px`;

  tag.innerHTML = `${x}px ${y}px`
});