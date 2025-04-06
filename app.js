document.getElementById("connectBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  status.textContent = "";

  try {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    const decoder = new TextDecoder();
    const reader = port.readable.getReader();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      // Debug: stampa byte grezzi come esadecimale
      let hex = "";
      for (let i = 0; i < value.length; i++) {
        hex += value[i].toString(16).padStart(2, "0") + " ";
      }
      console.log("Raw data:", hex);
    }
  } catch (err) {
    status.textContent = "Errore: " + err.message;
  }
});
