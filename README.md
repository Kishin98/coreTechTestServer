### Progettazione
Il progetto consiste in 2 applicazione mobile scritti tramite Expo React Native e un server express js che interagisce con un database mysql.
L'applicaione client permette di compilare un form per una candidatura di lavoro, e di allegare il proprio cv.
L'applicazione admin permette di vedere la lista di candidati, di filtrarli e di scaricare il loro cv (questa ultima funzionalità non è stata implementata in modo ottimale)
Il server express js ha 3 API endpoints, uno per ricevere la lista dei candidati, uno per ricevere un file specifico e uno per creare un nuovo candidato e salvare il file in allegato.

### Eseguire il server
Basterà esegire (avendo node js installato sula macchina)
```
node server.js
```
Nella cartella src c'è il file db.js che contiene i dati di condigurazione di mysql, bisogna sostituirli a quelli della propria configurazione.
Il file tablesModel.txt contiene la query Sql per creare la tabella utilizzata dal server
