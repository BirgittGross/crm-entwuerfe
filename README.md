# CRM-Entwürfe

Klickbare Entwürfe für Unternehmen, Kandidaten und Projekte im CRM, zur Abstimmung mit der Entwicklung.

**Online ansehen:** https://birgittgross.github.io/crm-entwuerfe/

| Seite | Inhalt |
|---|---|
| `index.html` | Übersicht aller Entwürfe mit Änderungsliste |
| `unternehmen-weidner.html` | Unternehmen in der Akquisephase (ohne Projekt) |
| `unternehmen-brandtner.html` | Unternehmen mit hohem Potenzial und laufendem Projekt |
| `kandidat.html` | Kandidaten-Header mit Lifecycle, Interviewnotes sowie zugewiesenen und passenden Projekten als Kacheln |
| `projekt-assistenz.html` | Projekt mit Stelleninformationen, Stellenanzeigen sowie zugewiesenen und passenden Kandidaten als Kacheln |
| `projekt-fibu.html` | Zweites Projekt, gleicher Aufbau, zusätzlich mit den Reitern Historie und Wiedervorlage |

## Entwürfe ändern

Die Entwürfe werden mit Claude Desktop direkt auf dem Rechner geändert und dann zu GitHub hochgeladen. Wie man einen Rechner dafür einrichtet und wie der tägliche Ablauf aussieht, steht in der **[Anleitung](ANLEITUNG.md)**. Die Regeln, an die sich Claude dabei hält, stehen in [`CLAUDE.md`](CLAUDE.md).

## Fragen und Rückmeldungen

Bitte als [Issue](https://github.com/BirgittGross/crm-entwuerfe/issues/new) anlegen und im Titel den Entwurf nennen, z. B. „Projekt: Stellenanzeige – Kanäle“.

## Hinweise

- Alle Daten sind Beispieldaten.
- Kandidaten-Header und Projekt-Entwürfe merken sich Eingaben im eigenen Browser (Verschiebungen, Zuweisungen, Kommentare usw.). „Beispieldaten zurücksetzen“ stellt den Ausgangsstand wieder her. Andere Personen sehen immer die Beispieldaten.
- Die Seiten laufen ohne Server; `dc-lite.js` rendert die Entwurfs-Vorlagen mit React (Dateien `react*.min.js`).
