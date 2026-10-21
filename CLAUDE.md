# Hinweise für Claude

Dieses Repository enthält klickbare CRM-Entwürfe (Unternehmen, Kandidaten, Projekte) einer Personalvermittlung. Es wird über GitHub Pages veröffentlicht: https://birgittgross.github.io/crm-entwuerfe/

Die Nutzerin ist keine Entwicklerin. Antworte auf Deutsch, kurz und ohne Fachjargon, und erkläre Fehler in einfachen Worten.

## Ablauf bei jeder Änderung

1. Zuerst `git pull` ausführen, damit der neueste Stand da ist.
2. Nur das ändern, worum gebeten wurde.
3. Prüfen, dass die Seite noch funktioniert: Der Inhalt von `<script id="dc-tree">` muss gültiges JSON sein, der Inhalt von `<script id="dc-logic">` gültiges JavaScript.
4. Die Änderungsliste beim passenden Entwurf in `index.html` um einen kurzen Punkt ergänzen.
5. Commit mit einer kurzen deutschen Nachricht, die den Entwurf nennt, z. B. „Projekt Fibu: Uhrzeit bei Wiedervorlage“.
6. `git push` auf `main`, sobald die Nutzerin um einen Push gebeten hat. Danach den Link zur betroffenen Seite nennen und darauf hinweisen, dass die Veröffentlichung ein bis zwei Minuten dauert.

Schlägt der Push mit „rejected“ fehl: `git pull --rebase`, dann erneut pushen. Bei Konflikten nichts überschreiben, sondern nachfragen.

## Aufbau der Seiten

- Jede Entwurfsseite (`unternehmen-*.html`, `kandidat.html`, `projekt-*.html`) ist eigenständig und läuft ohne Server.
- `<script id="dc-tree" type="application/json">` enthält das Layout als JSON-Baum: jeder Knoten ist `[tag, {attribute}, [kinder]]`, Text ist ein String. Attributnamen sind kleingeschrieben (`onclick`, `viewbox`, `maxlength`), Styles stehen als CSS-Text im Attribut `style`.
- Platzhalter `{{name}}` verweisen auf Werte aus `renderVals()`. `sc-if` (Attribut `value`) blendet ein oder aus, `sc-for` (Attribute `list`, `as`) wiederholt.
- `<script id="dc-logic" type="text/plain">` enthält `class Component extends DCLogic { renderVals() { … } }` mit Zustand (`this.state`, `this.setState`) und allen Daten und Klick-Funktionen.
- `<script id="dc-props">` enthält die Einstellwerte (z. B. Akzentfarbe).
- `dc-lite.js`, `react.production.min.js` und `react-dom.production.min.js` rendern die Seiten. Diese drei Dateien nicht ändern.
- `index.html` ist die Übersicht aller Entwürfe mit Änderungslisten. Neue Entwürfe dort und in der Tabelle in `README.md` eintragen.

## Regeln

- Nur Beispieldaten verwenden, keine echten Namen, Telefonnummern oder E-Mail-Adressen von Kandidaten oder Kunden. Das Repository ist öffentlich.
- Keine externen Bibliotheken oder Skripte von anderen Servern einbinden, außer Google Fonts.
- Farben, Schriften und Abstände der bestehenden Seiten beibehalten.
- Dateinamen ohne Leerzeichen und Klammern. Taucht beim Hochladen eine Datei wie `name (1).html` auf, nachfragen, ob sie die gleichnamige Datei ersetzen soll.
