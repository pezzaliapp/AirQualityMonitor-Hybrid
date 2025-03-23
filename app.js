// Configurazione Firebase del tuo progetto
const firebaseConfig = {
  apiKey: "CHIAVE_API",
  authDomain: "tuo-progetto.firebaseapp.com",
  projectId: "tuo-progetto",
  storageBucket: "tuo-progetto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
  databaseURL: "https://tuo-progetto-default-rtdb.europe-west1.firebasedatabase.app"
};

let simulation = true;
document.getElementById("toggleMode").addEventListener("change", (e) => {
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

// Genera dati di simulazione
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

// Mostra i dati a schermo
function display(data) {
  const keys = ["pm25", "voc", "co2", "temp", "hum", "press", "light", "charge"];
  keys.forEach((k) => {
    const fixed = data.fisso?.[k] ?? "--";
    const mobile = data.mobile?.[k] ?? "--";
    document.getElementById(k)?.textContent = `${fixed} / ${mobile}`;
  });
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
    db.ref("/monitor").once("value").then((snapshot) => {
      const data = snapshot.val() || {};
      display(data);
    }).catch((error) => {
      console.error("Errore connessione:", error);
      document.getElementById("mode").textContent = "Errore connessione";
    });
  }
}

// Aggiorna i dati ogni 5 secondi
setInterval(fetchData, 5000);
fetchData();
