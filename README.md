#TypeScript Einführung   
Mein Typescript Programm ist eine Webscraper Anwendung für Framedata.

Ziel der Anwendung, ist es über den Server die HTML Elemente von https://wiki.supercombo.gg/w/Street_Fighter_6 + Charaktername zu lesen und an den Client zu senden.
Der Client Server formatiert diese Elemente dann und gibt sie an den Browser zurück.

um den Server zu starten:  
**npm install**  
**npm install puppeteer**  
**npm install express**  
**npm install axios**  
**node server.ts**  
Der Server sollte nun auf LocalHost:3009 laufen

um den Client zu starten:
**npm install**  
**npm start**  

Wichtig ist auch, dass CORS anfragen nicht vom Browser blockiert werden. Für das entwickeln habe ich dafür Firefox mit der Erweiterung "Allow CORS: Access-Control-Allow-Origin" gearbeitet ich habe auch gesehen, dass diese auch für Chrome verfügbar ist, wenn Ihnen Chrome lieber ist.

Wenn nun hoffentlich beide Server laufen kann man auf LocalHost:3000 gehen um in dem Client einen Namen einzugeben. Da die Anwendung die Framedata von Charakteren anzeigt ist es wichtig die Namen zu kennen.

Hier eine Liste mit den einzelnen Namen: 
**Cammy, Lily, Zangief, JP, Dee_Jay, Blanka, E.Honda, Juri, Ken, Ryu, Kimberly, Luke, Chun-Li, Guile, Marisa, Manon, Dhalsim, Jamie,**
