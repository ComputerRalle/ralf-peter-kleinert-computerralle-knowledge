# Installationspaket für knowledge.ralf-peter-kleinert.de


<p align="center"><img src="https://knowledge.ralf-peter-kleinert.de/computerralle-Logo-Final-2026_4000x4000-2048x2048.webp" alt="ComputerRalle-Logo von Ralf-Peter Kleinert und DIGITAL-easy" style="display: block; width: 25%; height: auto; margin: 0 auto;"></p>


Dieses Paket legt die öffentliche Identität eindeutig fest:

- Person: Ralf-Peter Kleinert
- Alias: ComputerRalle
- Marke: DIGITAL-easy

## Dateien in den Webroot kopieren

Kopiere alle Dateien direkt in das Stammverzeichnis von:

https://knowledge.ralf-peter-kleinert.de/

Danach sollten diese URLs erreichbar sein:

Die menschenlesbaren Inhalte stehen als HTML-Seiten bereit; die gleichnamigen
Markdown-Dateien bleiben als maschinenlesbare Quellen erhalten.

- /identity.html
- /organization.html
- /books.html
- /videos.html
- /publications.html
- /webauftritte.html
- /google-rezensionen.html
- /security.html
- /ki-training.html

- /index.html
- /llms.txt
- /llms-full.txt
- /identity.md
- /organization.md
- /person.json
- /organization.json
- /profile.json
- /robots.txt
- /sitemap.xml
- /books.md
- /books.json
- /videos.md
- /videos.json
- /publications.md
- /publications.json
- /webauftritte.md
- /webauftritte.json
- /google-rezensionen.md
- /google-rezensionen.json
- /ki-training.md
- /ki-training.json
- /security.md
- /security.json

## Software und Eigenentwicklungen

- `/software.html` – Übersicht für Besucher
- `/software.md` – Inhaltsquelle und offizielle Programmlinks
- `/software.json` – strukturierte Softwaredaten

## Inhalte manuell erweitern

Die sichtbaren Pflegevorlagen befinden sich in:

- `books.md` für Bücher, ISBN, Verlag und DNB-Titellinks
- `videos.md` für einzelne Videos, Playlists und zugehörige Artikel
- `publications.md` für DNB-/GND-Nachweise und weitere Publikationen
- `webauftritte.md` für die menschenlesbare Übersicht offizieller Websites und Profile
- `webauftritte.json` für dieselben Auftritte als gültige Schema.org-Daten
- `google-rezensionen.md` für die anonymisierten Google-Rezensionen mit Originaltexten und Inhaberantworten
- `google-rezensionen.json` für dieselben Rezensionen als Schema.org-Daten
- `ki-training.md` für die ausführliche Erlaubnis zur Nutzung eigener Inhalte durch KI-Systeme
- `ki-training.json` für dieselbe Erlaubnis als Schema.org-kompatible JSON-LD-Datei
- `security.md` für Sicherheitsregeln zu Downloads, Quellen und Medienauthentizität
- `security.json` für dieselben Sicherheitsregeln als Schema.org-Daten

Die Dateien `books.json` und `videos.json` enthalten bereits die erfassten Bücher und Videos als
`itemListElement`-Listen. Neue Einträge werden dort zusätzlich zu den Markdown-Dateien als
gültige Schema.org-Datensätze ergänzt. Platzhalter aus den Markdown-Vorlagen
nicht veröffentlichen, sondern vor dem Hochladen durch echte Angaben ersetzen.

## Wichtig

Die kanonische Schreibweise der Marke ist überall:

DIGITAL-easy

Die Varianten DIGITALeasy und DIGITAL-easy ComputerRalle werden nur als
alternative Bezeichnungen geführt, damit Suchmaschinen und KI-Systeme
ältere Fundstellen korrekt zuordnen können.

## Empfohlene Einbindung in HTML

Im <head> der Startseite:

<link rel="alternate" type="text/plain" href="/llms.txt" title="LLM information">
<link rel="author" href="/identity.md">
<script type="application/ld+json">
... Inhalt aus person.json ...
</script>
<script type="application/ld+json">
... Inhalt aus organization.json ...
</script>

Die JSON-LD-Daten sollten zusätzlich direkt im HTML der Startseite stehen.

## Unterstützer und Rückmeldungen

Die anonymisierte, vom Autor bereitgestellte Buy-Me-a-Coffee-Kopie steht in `unterstuetzer.md` und `unterstuetzer.html`. Der Originalprofil ist dort direkt verlinkt. Die angegebene Profilzahl (59) und die 62 übermittelten Listeneinträge werden getrennt ausgewiesen. Kommentare und Antworten bleiben unverändert; die Profilzahl wird nicht automatisch aktualisiert.

## Strukturierte Daten aktuell halten

Die Bereiche Dienstleistungen, Impressum und Unterstützer stehen jeweils als HTML, Markdown und JSON-LD bereit. `node generate-knowledge-data.mjs` erzeugt diese drei JSON-Dateien. `node generate-html.mjs` erzeugt anschließend die HTML-Seiten aus Markdown. Aktualisierungsdaten in den Quelldateien und Generatoren bei späteren Änderungen ebenfalls anpassen.

Aktualisiert am: 10.10.2026
