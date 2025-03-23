
function getRandom(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

function updateStatus() {
  const modes = ['Fisso', 'Portatile', 'Simulazione'];
  const powers = ['USB', 'Batteria', 'Solare'];
  const conns = ['Wi-Fi', 'Hotspot', 'Offline'];
  const envs = ['Interno', 'Esterno', 'In movimento'];

  document.getElementById("mode").textContent = modes[Math.floor(Math.random() * modes.length)];
  document.getElementById("power").textContent = powers[Math.floor(Math.random() * powers.length)];
  document.getElementById("connection").textContent = conns[Math.floor(Math.random() * conns.length)];
  document.getElementById("environment").textContent = envs[Math.floor(Math.random() * envs.length)];
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

  updateStatus();
}
setInterval(updateData, 5000);
updateData();
