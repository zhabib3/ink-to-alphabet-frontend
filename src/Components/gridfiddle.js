const width = 400;
const height = 400;
const boxSize = 10;
const canvas = document.getElementById('tutorial');
let ctx = canvas.getContext('2d');

function draw() {

  ctx.strokeStyle = 'gray';
  for (let x = 0; x < width; x += boxSize) {
    for (let y = 0; y < height; y += boxSize) {
      ctx.strokeRect(x, y, boxSize, boxSize);
    }
  }

}

let xPos, yPos = 0;
canvas.addEventListener('mousemove', e => {
  if (e.buttons === 1) {
    xPos = Math.floor(e.offsetX / boxSize) * boxSize;
    yPos = Math.floor(e.offsetY / boxSize) * boxSize;
    fillGrid(xPos, yPos);
  }

});

canvas.addEventListener('mousedown', e => {
  if (e.buttons === 1) {
    xPos = Math.floor(e.offsetX / boxSize) * boxSize;
    yPos = Math.floor(e.offsetY / boxSize) * boxSize;
    fillGrid(xPos, yPos);
    /* console.log('x: ' + xPos + ' y: ' + yPos) */

  }
});

function fillGrid(x, y) {
  ctx.fillStyle = 'green';
  ctx.fillRect(x, y, boxSize, boxSize);
}
