const canvas = document.getElementById('tshirtCanvas');
const context = canvas.getContext('2d');
const tshirtImage = document.getElementById('tshirtImage');

let painting = false;

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  context.beginPath();
}

function draw(e) {
  if (!painting) return;
  context.lineWidth = 5;
  context.lineCap = 'round';
  context.strokeStyle = document.getElementById('colorPicker').value;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  context.lineTo(x, y);
  context.stroke();
  context.beginPath();
  context.moveTo(x, y);
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveImage() {
  const tempCanvas = document.createElement('canvas');
  const tempContext = tempCanvas.getContext('2d');

  tempCanvas.width = tshirtImage.width;
  tempCanvas.height = tshirtImage.height;

  tempContext.drawImage(tshirtImage, 0, 0);
  tempContext.drawImage(canvas, 0, 0);

  const imgData = tempCanvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = imgData;
  link.download = 'tshirt_design.png';
  link.click();
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
