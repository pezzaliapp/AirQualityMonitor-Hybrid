let port;
let reader;

document.getElementById("connect").addEventListener("click", async () => {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const decoder = new TextDecoderStream();
    const inputDone = port.readable.pipeTo(decoder.writable);
    const inputStream = decoder.readable;

    reader = inputStream.getReader();
    let buffer = [];

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      for (let char of value) {
        buffer.push(char.charCodeAt(0));
        if (buffer.length >= 10) {
          if (buffer[0] === 0xAA && buffer[1] === 0xC0 && buffer[9] === 0xAB) {
            let pm25 = (buffer[2] + buffer[3] * 256) / 10.0;
            let pm10 = (buffer[4] + buffer[5] * 256) / 10.0;
            document.getElementById("pm25").textContent = pm25.toFixed(1);
            document.getElementById("pm10").textContent = pm10.toFixed(1);
          }
          buffer = [];
        }
      }
    }
  } catch (err) {
    alert("Errore: " + err);
  }
});
