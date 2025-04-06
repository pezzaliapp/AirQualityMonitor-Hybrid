let port;
let keepReading = true;

// Inizializza il grafico con Chart.js
const ctx = document.getElementById('chart').getContext('2d');
const dataChart = {
  labels: [],
  datasets: [
    {
      label: 'PM2.5',
      data: [],
      borderColor: 'rgba(51,102,204,1)',
      backgroundColor: 'rgba(51,102,204,0.2)',
      fill: true,
    },
    {
      label: 'PM10',
      data: [],
      borderColor: 'rgba(220,57,18,1)',
      backgroundColor: 'rgba(220,57,18,0.2)',
      fill: true,
    }
  ]
};
const chart = new Chart(ctx, {
  type: 'line',
  data: dataChart,
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tempo'
        }
      },
      y: {
        title: {
          display: true,
          text: 'µg/m³'
        },
        beginAtZero: true,
      }
    }
  }
});

function updateChart(pm25, pm10) {
  const now = new Date();
  const timeLabel = now.toLocaleTimeString();
  dataChart.labels.push(timeLabel);
  dataChart.datasets[0].data.push(pm25);
  dataChart.datasets[1].data.push(pm10);
  // Manteniamo gli ultimi 20 dati
  if (dataChart.labels.length > 20) {
    dataChart.labels.shift();
    dataChart.datasets[0].data.shift();
    dataChart.datasets[1].data.shift();
  }
  chart.update();
}

async function connectSerial() {
  const status = document.getElementById("status");
  status.textContent = "";
  try {
    // Richiedi l'accesso alla porta seriale
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const reader = port.readable.getReader();
    let buffer = [];
    while (keepReading) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) {
        for (let i = 0; i < value.length; i++) {
          buffer.push(value[i]);
        }
        // Processa il buffer finché contiene almeno 10 byte (un pacchetto SDS011)
        while (buffer.length >= 10) {
          if (buffer[0] === 0xAA && buffer[1] === 0xC0 && buffer[9] === 0xAB) {
            const pm25 = (buffer[2] + buffer[3] * 256) / 10.0;
            const pm10 = (buffer[4] + buffer[5] * 256) / 10.0;
            document.getElementById("pm25").textContent = pm25.toFixed(1);
            document.getElementById("pm10").textContent = pm10.toFixed(1);
            updateChart(pm25, pm10);
            buffer.splice(0, 10);
          } else {
            buffer.shift();
          }
        }
      }
    }
    reader.releaseLock();
  } catch (err) {
    status.textContent = "Errore: " + err.message;
  }
}

document.getElementById("connectButton").addEventListener("click", connectSerial);
