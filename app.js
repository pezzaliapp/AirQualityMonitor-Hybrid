document.getElementById("connectButton").addEventListener("click", async () => {
  const status = document.getElementById("status");
  status.textContent = "";
  try {
    // Richiede l'accesso alla porta seriale
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const reader = port.readable.getReader();
    let buffer = [];
    
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      // value è un Uint8Array: aggiungiamo ogni byte al buffer
      for (let i = 0; i < value.length; i++) {
        buffer.push(value[i]);
      }
      // Elaboriamo il buffer finché contiene almeno 10 byte (dimensione di un pacchetto SDS011)
      while (buffer.length >= 10) {
        // Verifichiamo se il pacchetto è valido:
        // Byte 0 = 0xAA, Byte 1 = 0xC0, Byte 9 = 0xAB
        if (buffer[0] === 0xAA && buffer[1] === 0xC0 && buffer[9] === 0xAB) {
          // Calcolo PM2.5 e PM10
          const pm25 = (buffer[2] + (buffer[3] << 8)) / 10.0;
          const pm10 = (buffer[4] + (buffer[5] << 8)) / 10.0;
          document.getElementById("pm25").textContent = pm25.toFixed(1);
          document.getElementById("pm10").textContent = pm10.toFixed(1);
          // Rimuoviamo i 10 byte appena elaborati dal buffer
          buffer.splice(0, 10);
        } else {
          // Se il pacchetto non è valido, rimuoviamo il primo byte e riproviamo
          buffer.shift();
        }
      }
    }
    reader.releaseLock();
  } catch (err) {
    status.textContent = "Errore: " + err.message;
  }
});
