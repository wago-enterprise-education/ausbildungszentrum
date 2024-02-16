# ausbildungszentrum
Das WAGO Ausbildungszentrum

Lageplan für den Tag der Ausbildung (TdA)

## Offene TODOs

- [ ] Update der Karte auf den finalen Stand
    - [ ] ungenutzte/nicht zugängliche Räume ausgrauen
    - [ ] Berufsfelder ergänzen
    - [ ] Zusätzliche Attraktionen (z. B. Gewinnspiel) ergänzen
- [ ] Anpassen der Koordinaten für die jeweiligen Berufsgruppen
- [ ] Farbige Schilder im Gebäude zur besseren Orientierung aufstellen (in den Farben der unterschiedlichen Bereiche)

*Optional*
- [ ] Verbesserung des Pinch-Zooms
- [ ] Anpassen der Animationen
- [ ] Ggf. Legende mit Erklärung der Farben unten auf der Website


## Vorgehen zum Aktualisieren

### Map / Karte

- In Powerpoint auf Folie 7 Änderungen vornehmen
- Alles markieren (Linksklick außerhalb und dann über die gesamte Map ziehen)
- Rechtsklick auf ein Element
- "Als Grafik speichern..."
- Als "Map" im SVG-Format im Ordner img speichern
- Lokal Änderungen sofort sichtbar (oder mit F5/STRG+R)
- Für globale Änderungen ist ein git push notwendig (pages erstellt einen neuen Deploy, das dauert ca. 10-20 Sekunden)

### Koordinaten bei Klick in der Seitenleiste

- Das Scrollen zu einem Beruf erfolgt mit der `zoom_to()`-Funktion.
- Zu jedem Beruf gibt es ein Kürzel mit einer in der `main.js` hinterlegten Koordinate (x,y)
- Durch intelligentes Probieren kann lassen sich die Koordinaten grob herausfinden und im Code hinterlegen
- Auch hier: für globale Änderungen ist ein git push mit anschließendem gh pages Deploy notwendig