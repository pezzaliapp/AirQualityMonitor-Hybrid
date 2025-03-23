// Configurazione Firebase del tuo progetto
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

// Variabili per Firebase, inizializzate solo quando necessario
let app;
let db;

/**
 * Inizializza Firebase una sola volta.
 * Se è già inizializzato, utilizza l'istanza esistente.
 */
function initFirebase() {
  if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    console.log("Firebase inizializzato correttamente.");
  } else {
    app = firebase.app();
    db = firebase.database();
    console.log("Firebase già inizializzato, uso l'istanza esistente.");
  }
}

function getRandom(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(1);
}

// Genera dati di simulazione
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

// Mostra i dati a schermo e aggiorna i grafici
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

// Recupera i dati (simulati o da Firebase)
function fetchData() {
  if (simulation) {
    // Dati casuali
    display(updateSimulation());
  } else {
    // Inizializza Firebase se non è già stato fatto
    initFirebase();
    // Leggi una volta i dati dal Realtime Database
    db.ref("/monitor").once("value").then(snapshot => {
      const data = snapshot.val() || {};
      display(data);
    }).catch((error) => {
      console.error("Errore connessione:", error);
      document.getElementById("mode").textContent = "Errore connessione";
    });
  }
}

// Configura i grafici con Chart.js
const labels = Array.from({length: 10}, (_, i) => `T-${9 - i}s`);

function createChart(id, label, colors) {
  return new Chart(document.getElementById(id).getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: label + " (Fisso)",
          data: Array(10).fill(null),
          borderColor: colors[0],
          backgroundColor: colors[0] + "33",
          fill: true
        },
        {
          label: label + " (Mobile)",
          data: Array(10).fill(null),
          borderColor: colors[1],
          backgroundColor: colors[1] + "33",
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Crea i 3 grafici
const chartPM = createChart("chartPM", "PM2.5", ["#3366cc", "#dc3912"]);
const chartTemp = createChart("chartTemp", "Temperatura", ["#109618", "#ff9900"]);
const chartCO2 = createChart("chartCO2", "CO₂ eq", ["#990099", "#0099c6"]);

// Aggiunge nuovi valori e rimuove i più vecchi
function shiftAndPush(chart, val1, val2) {
  chart.data.datasets[0].data.push(val1);
  chart.data.datasets[1].data.push(val2);
  chart.data.datasets[0].data.shift();
  chart.data.datasets[1].data.shift();
  chart.update();
}

// Aggiorna i dati ogni 5 secondi
setInterval(fetchData, 5000);
fetchData();
