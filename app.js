let port;
let reader;
let keepReading = true;

async function connectSerial() {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const decoder = new TextDecoderStream();
    const inputDone = port.readable.pipeTo(decoder.writable);
    const inputStream = decoder.readable;

    reader = inputStream.getReader();

    document.getElementById("status").textContent = "Sensore connesso!";

    while (keepReading) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) parseData(value);
    }

    reader.releaseLock();
  } catch (err) {
    alert("Errore di connessione: " + err);
  }
}

function parseData(data) {
  // SDS011 invia 10 byte binari. Cerchiamo quelli giusti nel testo decodificato.
  const bytes = Array.from(data).map(c => c.charCodeAt(0));
  for (let i = 0; i < bytes.length - 9; i++) {
    if (bytes[i] === 0xAA && bytes[i + 1] === 0xC0 && bytes[i + 9] === 0xAB) {
      const pm25 = (bytes[i + 2] + bytes[i + 3] * 256) / 10.0;
      const pm10 = (bytes[i + 4] + bytes[i + 5] * 256) / 10.0;

      document.getElementById("pm25").textContent = pm25.toFixed(1);
      document.getElementById("pm10").textContent = pm10.toFixed(1);
    }
  }
}

document.getElementById("connectButton").addEventListener("click", connectSerial);
