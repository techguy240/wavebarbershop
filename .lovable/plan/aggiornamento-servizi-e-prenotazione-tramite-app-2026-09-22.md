# Aggiornamento servizi e prenotazione tramite app

## Modifiche
- Creare un unico catalogo configurato con i cinque servizi esatti, prezzo italiano e durata.
- Far leggere lo stesso catalogo a home, pagina Servizi e pagine delle sedi, senza attribuire disponibilità specifiche non confermate.
- Aggiornare le schede servizio per mostrare sempre nome, prezzo e durata, rimuovendo l’avviso sui prezzi mancanti.
- Sostituire il precedente collegamento di prenotazione con una finestra chiara “PRENOTA TRAMITE L’APP”, testo informativo e pulsante “PRENOTA NELL’APP”.
- Aggiungere `GOOGLE_PLAY_URL` e `APP_STORE_URL` nella configurazione centrale, lasciandoli vuoti finché non vengono forniti gli URL ufficiali.
- Se gli URL non sono ancora configurati, mantenere visibile la CTA ma disabilitare il collegamento senza mostrare messaggi demo o inventare destinazioni.
- Conservare in ogni flusso la scelta della sede e il pulsante “CHIAMA” con i numeri esistenti.
- Adeguare la sola sezione prenotazioni dell’account allo stesso flusso tramite app.

## Verifica
- Controllare testi, cinque prezzi, cinque durate e assenza dei vecchi avvisi relativi alla prenotazione.
- Verificare apertura della finestra da tutti i pulsanti “Prenota ora”, chiamate telefoniche e resa su mobile e desktop.
- Confermare che il progetto compili senza errori.

## Dettagli tecnici
- Il catalogo comune sostituirà gli array duplicati nelle sedi.
- Il selettore esistente verrà riutilizzato come finestra informativa dell’app e selettore telefonico.
- Nessun calendario, disponibilità, appuntamento, archivio o API di prenotazione verrà creato.
