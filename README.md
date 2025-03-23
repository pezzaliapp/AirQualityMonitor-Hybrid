
## 🌱 AirQuality Monitor – DIY Edition

> **“L’aria è invisibile. Ma se la ignori, può fare rumore.”**  
> *AirQuality Monitor è il primo passo verso un ecosistema DIY consapevole, open-source, espandibile.*  
> Non misura solo i dati. **Misura il futuro che respiri.**

AirQuality Monitor è una Progressive Web App gratuita e open-source che si integra con sensori ambientali e microcontrollori ESP32 per monitorare la qualità dell’aria in tempo reale.

Progettato in puro stile DIY, il progetto fonde software e hardware, apprendimento e utilità pratica, tecnologia e coscienza ambientale. **Compatibile con ESP32, programmato in C++ da pezzaliAPP**, è stato sviluppato per offrire uno strumento pienamente conforme ai principi della **PWA 5.0**: intelligente, scalabile, accessibile offline, installabile, sicuro e connesso al cloud.

**Caratteristiche PWA 5.0 già predisposte**:
- ✅ Installabile su qualsiasi dispositivo (desktop o mobile)
- 🔁 Funzionamento offline garantito (grazie al service worker)
- ☁️ Connessione in tempo reale a **Firebase** per lo scambio e la memorizzazione dati
- 🔐 Sicurezza e struttura modulare
- 🧠 Simulazione attiva per ambienti scolastici o test senza hardware

**Dimensioni indicative**: tascabile nella versione mobile (entro 10×6×4 cm), stabile e modulabile nella versione fissa. Leggero, robusto, pronto all’uso in pochi minuti.

---

### 📊 Due modalità operative: Mobile & Fisso

#### 💻 Versione Fissa
- Alimentata da **pannello solare con sistema di tracking attivo** programmato in C++ (o da USB)
- Utilizza **4 sensori di luce ambientale** e **2 servocomandi DOF** per orientare il pannello verso la sorgente luminosa ottimale
- Include modulo di ricarica energetica, sensore di temperatura e umidità
- Progettata per **convertire l'energia solare in alimentazione continua** per la piattaforma monitoraggio
- **Interfacce IIC, UART, SPI** disponibili per l’estensione con ulteriori sensori e componenti
- Documentazione completa con **tutorial progressivi**, dalla base all’integrazione avanzata
- Ideale per ambienti interni o esterni in contesti professionali o educativi
- Collegata al Wi-Fi di rete o hotspot per invio dati continuo

#### 📱 Versione Mobile
- Alimentata da **batteria ricaricabile o pannello solare**
- Ottimizzata per ambienti **outdoor**, escursioni o uso in mobilità
- Connessione tramite **hotspot del cellulare o Wi-Fi libero**
- Ideale per confrontare zone diverse della città o della natura

🔄 I dati di entrambe le versioni vengono confrontati in tempo reale all'interno della PWA, offrendo all’utente una visione completa e comparata.

---

### ✨ Funzionalità principali
- ✅ Compatibile con **ESP32**, alimentazione solare o USB
- 🌫️ Misura **PM2.5**, VOC, CO₂eq, temperatura, umidità, pressione e luminosità
- 🌥️ **Indicatore visivo dinamico**: verde/giallo/rosso in base alla qualità dell'aria
- ☁️ **Firebase attivo** per ricezione e archiviazione dati in cloud
- ♻️ **Modalità Simulazione attiva**: test anche senza hardware
- 📱 Responsive: funziona perfettamente anche su **smartphone**
- 🛠️ Interfaccia semplice, installabile come App da browser

---

### 🏠 Pensato per:
- Makers, innovatori, appassionati di tecnologia
- Docenti e studenti per **esperimenti STEM e ambientali**
- Officine e spazi chiusi dove monitorare aria e ventilazione
- Camperisti, ciclisti, escursionisti che vogliono **sapere cosa respirano**

---

### 📍 Provalo ora:
- 💡 Versione ufficiale PWA: [www.alessandropezzali.it/AirQualityMonitor-Hybrid](https://www.alessandropezzali.it/AirQualityMonitor-Hybrid)

*🧪 Per docenti, studenti o sviluppatori: disponibile anche una versione test/laboratorio su GitHub Pages su richiesta.*

---

### 📄 Licenza
**MIT License**  
© **Alessandro Pezzali 2025**  
📍 *Piattaforma ufficiale*: [pezzaliapp.com](https://www.pezzaliapp.com)

> Il progetto è distribuito con licenza MIT per favorire la collaborazione, il riutilizzo aperto e lo sviluppo continuo da parte della community e di aziende interessate.  
📎 Tutti i file (sketch, PWA, risorse grafiche) sono pubblicati su GitHub e possono essere utilizzati liberamente per scopi educativi o applicazioni industriali.  
🛠️ Sviluppato “**in the garage**”, in puro stile DIY, ogni sera e nel fine settimana, con **passione e competenze multidisciplinari**.
