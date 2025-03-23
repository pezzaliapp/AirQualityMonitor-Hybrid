// ======================
// CONFIGURAZIONE FIREBASE
// ======================
const firebaseConfig = {
  apiKey: "CHIAVE_API",
  authDomain: "airqualitymonitor-hybrid.firebaseapp.com",
  projectId: "airqualitymonitor-hybrid",
  storageBucket: "airqualitymonitor-hybrid.appspot.com",
  messagingSenderId: "463381814233",
  appId: "1:463381814233:web:ab966b47b016f4c52a97c8",
  databaseURL: "https://airqualitymonitor-hybrid-default-rtdb.europe-west1.firebasedatabase.app"
};

// ======================
// MODALITÀ: SIMULAZIONE O FIREBASE
// ======================
let simulation = true;
document.getElementById("toggleMode").addEventListener("change", (e) => {
  simulation = !e.target.checked;
  document.getElementById("mode").textContent = simulation ? "Simulazione" : "Firebase Live";
});

// ======================
// VARIABILI FIREBASE
// ======================
let app; // istanza dell'app Firebase
let db;  // riferimento al Realtime Database

// Inizializza Firebase una sola volta
function initFirebase() {
  if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    console.log("Firebase inizializzato.");
  } else {
    app = firebase.app();
    db = firebase.database();
    console.log("Firebase già inizializzato, uso istanza esistente.");
  }
}

// ======================
// FUNZIONI DI SIMULAZIONE
// ======================
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

// ======================
// AGGIORNA IL DOM CON I DATI
// ======================
function display(data) {
  // Chiavi da mostrare
  const keys = ["pm25", "voc", "co2", "temp", "hum", "press", "light", "charge"];

  keys.forEach((k) => {
    const fixed = data.fisso?.[k] ?? "--";
    const mobile = data.mobile?.[k] ?? "--";
    document.getElementById(k).textContent = `${fixed} / ${mobile}`;
  });
}

// ======================
// RECUPERA DATI (SIMULAZIONE O FIREBASE)
// ======================
function fetchData() {
  if (simulation) {
    // Modalità SIMULAZIONE
    const simulatedData = updateSimulation();
    display(simulatedData);
  } else {
    // Modalità FIREBASE
    initFirebase(); // inizializza se non già fatto
    db.ref("/monitor").once("value")
      .then((snapshot) => {
        const data = snapshot.val() || {};
        display(data);
      })
      .catch((error) => {
        console.error("Errore connessione:", error);
        document.getElementById("mode").textContent = "Errore connessione";
      });
  }
}

// ======================
// AVVIO PERIODICO
// ======================
setInterval(fetchData, 5000);
fetchData();
