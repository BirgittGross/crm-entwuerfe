# Anleitung: CRM-Entwürfe mit Claude Desktop bearbeiten

Diese Anleitung richtet einen Büro-Rechner (Windows) so ein, dass Claude die Entwürfe direkt auf dem Rechner ändert und die Änderungen danach selbst zu GitHub hochlädt („pusht“). Nach ein bis zwei Minuten ist die neue Version dann online unter https://birgittgross.github.io/crm-entwuerfe/ zu sehen.

Die Einrichtung dauert etwa 20 Minuten und ist nur einmal nötig.

---

## Teil 1: Einmalige Einrichtung

### 1. Git installieren

Git ist das Programm, mit dem Änderungen zu GitHub übertragen werden.

1. https://git-scm.com/download/win öffnen. Der Download startet automatisch.
2. Die Datei ausführen und bei allen Fragen einfach **Weiter** bzw. **Next** klicken. Die Standardeinstellungen passen.

### 2. GitHub Desktop installieren und das Repository holen

GitHub Desktop übernimmt die Anmeldung bei GitHub und legt die Dateien auf den Rechner.

1. https://desktop.github.com öffnen, herunterladen und installieren.
2. Beim ersten Start **Sign in to GitHub.com** wählen und mit dem Konto **BirgittGross** anmelden.
3. **File › Clone repository** wählen, in der Liste **BirgittGross/crm-entwuerfe** anklicken.
4. Als Speicherort (Local path) den Vorschlag übernehmen, z. B. `C:\Users\<Name>\Documents\GitHub\crm-entwuerfe`, und **Clone** klicken.

Diesen Ordner merken: Hier liegen ab jetzt die Entwürfe.

### 3. Claude Desktop installieren

1. https://claude.ai/download öffnen, die Windows-Version herunterladen und installieren.
2. Claude Desktop starten und mit demselben Claude-Konto anmelden, das auch im Browser benutzt wird.

### 4. Den Ordner in Claude öffnen

1. In Claude Desktop zum Bereich **Code** wechseln. Das ist Claude Code: Damit kann Claude Dateien auf dem Rechner lesen, ändern und Befehle wie das Hochladen ausführen.
2. Als Arbeitsordner den Ordner `crm-entwuerfe` aus Schritt 2 auswählen.

Hinweis: Für den Code-Bereich braucht man ein passendes Claude-Abo. Falls er nicht auftaucht oder gesperrt ist, hilft https://support.claude.com weiter.

### 5. Kurzer Test

In Claude (Bereich Code, Ordner `crm-entwuerfe`) eintippen:

> Hol den neuesten Stand von GitHub und sag mir, welche Entwürfe es gibt.

Claude fragt vor jedem Befehl um Erlaubnis. Mit **Erlauben** bestätigen. Wenn eine Liste der Seiten erscheint, ist alles eingerichtet.

---

## Teil 2: Der tägliche Ablauf

Im Repository liegt eine Datei `CLAUDE.md`. Claude liest sie automatisch und hält sich an den Ablauf: erst den neuesten Stand holen, dann ändern, kurz prüfen, die Änderungsliste in `index.html` ergänzen, speichern und hochladen.

Es reicht also, die gewünschte Änderung in normalen Worten zu beschreiben, zum Beispiel:

> Im Projekt Finanzbuchhalter soll im Reiter Wiedervorlage zusätzlich eine Uhrzeit eingetragen werden können. Danach bitte pushen.

> Bei Unternehmen Weidner soll der Kommentar gelb hinterlegt sein. Push danach.

Danach:

1. Claude zeigt, was es ändert, und fragt vor dem Hochladen um Erlaubnis. Mit **Erlauben** bestätigen.
2. Ein bis zwei Minuten warten.
3. https://birgittgross.github.io/crm-entwuerfe/ öffnen und die Seite neu laden (Taste **F5**, notfalls **Strg + F5**).

Tipps:

- Möglichst eine Änderung pro Auftrag. Dann bleibt nachvollziehbar, was wann geändert wurde.
- Zum Ansehen vor dem Hochladen: „Zeig mir die Seite lokal, bevor du pushst.“ Claude öffnet die Datei dann im Browser.
- Etwas rückgängig machen: „Mach die letzte Änderung rückgängig und push das.“

---

## Wenn etwas nicht klappt

**„Authentication failed“ oder ein Anmeldefenster beim Hochladen**
Beim ersten Hochladen öffnet sich ein Browserfenster für die GitHub-Anmeldung. Mit **BirgittGross** anmelden und bestätigen. Danach merkt sich der Rechner die Anmeldung.

**„rejected“ oder „fetch first“**
Jemand hat in der Zwischenzeit von einem anderen Rechner aus etwas hochgeladen. Claude sagen: „Hol den neuesten Stand und versuch es noch einmal.“

**Die Seite online zeigt noch den alten Stand**
Ein paar Minuten warten und mit **Strg + F5** neu laden. Unter https://github.com/BirgittGross/crm-entwuerfe/actions sieht man, ob die Veröffentlichung noch läuft (gelber Punkt) oder fertig ist (grüner Haken).

**Claude kennt den Ordner nicht mehr**
Im Bereich Code den Ordner `crm-entwuerfe` erneut als Arbeitsordner auswählen.

---

## Gut zu wissen

- Die Entwürfe im Browser-Chat auf claude.ai (die Canvas-Artefakte) und die Dateien in diesem Repository sind getrennt. Was im Chat geändert wird, landet nicht automatisch hier und umgekehrt. Ab jetzt gilt: **Die Dateien in GitHub sind der aktuelle Stand.**
- Wird auf zwei Rechnern gearbeitet, immer zuerst den neuesten Stand holen. Das steht auch in `CLAUDE.md`, Claude macht es also von selbst.
- Alle Daten in den Entwürfen sind Beispieldaten. Keine echten Kandidaten- oder Kundendaten eintragen, denn das Repository und die Seiten sind öffentlich.
