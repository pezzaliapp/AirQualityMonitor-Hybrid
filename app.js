
function getRandom(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}
function updateData() {
  document.getElementById("pm25").textContent = getRandom(5, 60);
  document.getElementById("voc").textContent = getRandom(0.2, 1.2);
  document.getElementById("co2").textContent = getRandom(400, 1200);
  document.getElementById("temp").textContent = getRandom(18, 30);
  document.getElementById("hum").textContent = getRandom(30, 70);
  document.getElementById("press").textContent = getRandom(990, 1025);
  document.getElementById("light").textContent = getRandom(100, 1000);
  document.getElementById("charge").textContent = Math.random() > 0.5 ? "Attiva" : "Inattiva";
}
setInterval(updateData, 5000);
updateData();
