document.getElementById("connectBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  status.textContent = "";

  if (!("serial" in navigator)) {
    status.textContent = "Web Serial API non supportata in questo browser.";
    return;
  }

  try {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const reader = port.readable.getReader();
    let buffer = [];

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      for (let byte of value) {
        buffer.push(byte);
        if (buffer.length >= 10) {
          if (buffer[0] === 0xAA && buffer[1] === 0xC0 && buffer[9] === 0xAB) {
            const pm25 = ((buffer[2] + buffer[3] * 256) / 10.0).toFixed(1);
            const pm10 = ((buffer[4] + buffer[5] * 256) / 10.0).toFixed(1);
            document.getElementById("pm25").textContent = pm25;
            document.getElementById("pm10").textContent = pm10;
          }
          buffer = [];
        }
      }
    }
  } catch (err) {
    status.textContent = "Errore: " + err.message;
  }
});
