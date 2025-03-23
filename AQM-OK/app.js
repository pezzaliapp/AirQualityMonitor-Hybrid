const firebaseConfig = {
  apiKey: "AIzaSyApWxpeL4qR3YXyTLqYEykaRSvN7n_ZFFQ",
  authDomain: "airqualitymonitor-hybrid.firebaseapp.com",
  projectId: "airqualitymonitor-hybrid",
  storageBucket: "airqualitymonitor-hybrid.firebasestorage.app",
  messagingSenderId: "463381814233",
  appId: "1:463381814233:web:ab966b47b016f4c52a97c8",
  databaseURL: "https://airqualitymonitor-hybrid-default-rtdb.europe-west1.firebasedatabase.app"
};

let simulation = true;
document.getElementById("toggleMode").addEventListener("change", e => {
  simulation = !e.target.checked;
  document.getElementById("mode").textContent = simulation ? "Simulazione" : "Firebase Live";
});

function getRandom(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(1);
}

function updateSimulation() {
  return {
    fisso: {
      pm25: getRandom(10, 40),
      voc: getRandom(0.2, 0.6),
      co2: getRandom(400, 800),
      temp: getRandom(20, 26),
      hum: getRandom(40, 60),
      press: getRandom(990, 1020),
      light: getRandom(100, 600),
      charge: "Attiva"
    },
    mobile: {
      pm25: getRandom(15, 55),
      voc: getRandom(0.4, 1.0),
      co2: getRandom(600, 1200),
      temp: getRandom(21, 29),
      hum: getRandom(30, 70),
      press: getRandom(995, 1025),
      light: getRandom(300, 900),
      charge: "Solare"
    }
  };
}

function display(data) {
  const keys = ["pm25", "voc", "co2", "temp", "hum", "press", "light", "charge"];
  keys.forEach(k => {
    const fixed = data.fisso?.[k] ?? "--";
    const mobile = data.mobile?.[k] ?? "--";
    document.getElementById(k)?.textContent = `${fixed} / ${mobile}`;
  });

  shiftAndPush(chartPM, data.fisso?.pm25 || 0, data.mobile?.pm25 || 0);
  shiftAndPush(chartTemp, data.fisso?.temp || 0, data.mobile?.temp || 0);
  shiftAndPush(chartCO2, data.fisso?.co2 || 0, data.mobile?.co2 || 0);
}

function fetchData() {
  if (simulation) {
    display(updateSimulation());
  } else {
    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    db.ref("/monitor").once("value").then(snapshot => {
      const data = snapshot.val() || {};
      display(data);
    }).catch(() => {
      document.getElementById("mode").textContent = "Errore connessione";
    });
  }
}

const labels = Array.from({length: 10}, (_, i) => `T-${9 - i}s`);
function createChart(id, label, colors) {
  return new Chart(document.getElementById(id).getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        { label: label + " (Fisso)", data: Array(10).fill(null), borderColor: colors[0], backgroundColor: colors[0] + "33", fill: true },
        { label: label + " (Mobile)", data: Array(10).fill(null), borderColor: colors[1], backgroundColor: colors[1] + "33", fill: true }
      ]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });
}
const chartPM = createChart("chartPM", "PM2.5", ["#3366cc", "#dc3912"]);
const chartTemp = createChart("chartTemp", "Temperatura", ["#109618", "#ff9900"]);
const chartCO2 = createChart("chartCO2", "CO₂ eq", ["#990099", "#0099c6"]);

function shiftAndPush(chart, val1, val2) {
  chart.data.datasets[0].data.push(val1);
  chart.data.datasets[1].data.push(val2);
  chart.data.datasets[0].data.shift();
  chart.data.datasets[1].data.shift();
  chart.update();
}

setInterval(fetchData, 5000);
fetchData();