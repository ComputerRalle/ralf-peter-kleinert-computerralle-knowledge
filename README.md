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

## Auffindbarkeit und strukturierte Daten

`node generate-html.mjs` ergänzt individuelle Seitenbeschreibungen, Open-Graph-Metadaten und die jeweils passende JSON-LD-Datei direkt im HTML. Die Startseite erhält einen automatisch aktualisierten Datenblock aus `person.json`, `organization.json` und einem `WebSite`-Datensatz. `profile.json` ist kein JSON-LD und wird nicht eingebettet. Den markierten Datenblock in `index.html` nicht von Hand pflegen.

Beschreibungen stehen zentral in `pageDescriptions` im HTML-Generator; neue Inhaltsseiten dort ergänzen. Inhalte zuerst in Markdown und den zuständigen JSON-Dateien pflegen, anschließend den Generator ausführen. Eingebettete Daten müssen zum sichtbaren Inhalt passen. Eine erfolgreiche Generierung bestätigt keine vollständige Schema.org-Prüfung oder Suchmaschinenaufnahme.

Bücher und Videos haben dauerhafte Direktziele in ihren Markdown-Quellen: `books.html#book-<bestehende Buch-ID>` und `videos.html#video-<YouTube-ID>`. Bei neuen Einträgen entsprechende Anker ergänzen, bestehende Anker und Entitäts-IDs erhalten. Die Inhaltsdaten behalten bei rein technischen Änderungen ihr bisheriges Aktualisierungsdatum.

## Unterstützer und Rückmeldungen

Die anonymisierte, vom Autor bereitgestellte Buy-Me-a-Coffee-Kopie steht in `unterstuetzer.md` und `unterstuetzer.html`. Der Originalprofil ist dort direkt verlinkt. Die angegebene Profilzahl (59) und die 62 übermittelten Listeneinträge werden getrennt ausgewiesen. Kommentare und Antworten bleiben unverändert; die Profilzahl wird nicht automatisch aktualisiert.

## Strukturierte Daten aktuell halten

Die Bereiche Dienstleistungen, Impressum und Unterstützer stehen jeweils als HTML, Markdown und JSON-LD bereit. `node generate-knowledge-data.mjs` erzeugt diese drei JSON-Dateien. `node generate-html.mjs` erzeugt anschließend die HTML-Seiten aus Markdown. Aktualisierungsdaten bei inhaltlichen Änderungen in den betroffenen Quellen und JSON-Dateien anpassen. Der HTML-Generator übernimmt das Datum aus jeder Markdown-Datei; das Startseitendatum separat pflegen. Fest hinterlegte Daten im JSON-Generator nur bei Änderungen seiner drei Ausgabebereiche abgleichen.

## Lehrgänge und Kurse

Das Verzeichnis steht unter /lehrgaenge-und-kurse.html, /lehrgaenge-und-kurse.md und /lehrgaenge-und-kurse.json bereit. Erfasst ist der kostenlose Proxmox-VE-Komplettlehrgang von Ralf-Peter Kleinert / ComputerRalle: zwei YouTube-Playlists und das vollständige Proxmox VE 8 Praxisbuch als kostenloses PDF. Der Eintrag enthält eine Kurzbeschreibung und verweist auf das Originalangebot unter https://blog.ralf-peter-kleinert.de/proxmox-virtual-environment/kostenloser-und-umfassender-proxmox-ve-lehrgang-proxmox-lernen-verstehen-und-nutzen/ . Der Blogartikel wird hier nicht reproduziert. Ein Kauf des separat angebotenen VE-9-Praxisbuchs ist nicht erforderlich.

Neue Einträge in Markdown und JSON-LD gemeinsam pflegen; Titel, Inhalte und offizielle Links nur nach vorliegenden Angaben ergänzen. `numberOfItems` mit der Liste abgleichen und anschließend HTML generieren.

### Bestehenden Lehrgang pflegen

- Kurzbeschreibung und Direktlinks in `lehrgaenge-und-kurse.md` und `lehrgaenge-und-kurse.json` gemeinsam aktualisieren. Der Blog bleibt die ausführliche Originalquelle; seinen Artikel und die Lektionen nicht kopieren.
- Kostenloses VE-8-PDF und beide YouTube-Playlists vom optionalen VE-9-Kaufbuch unterscheiden. Bestehende Buchverknüpfungen in `books.md` und `books.json` erhalten; das PDF nicht als zusätzliches Buch zählen.
- `lehrgaenge-und-kurse.json` wird manuell gepflegt. Anschließend `node generate-html.mjs` ausführen und Text, Linkziele, JSON-Listenzahlen sowie genau eine sichtbare Datumszeile prüfen.
- Veröffentlichung des Bereichs am 21.10.2026 vom Nutzer bestätigt. Spätere lokale Änderungen sind erst nach erneuter Veröffentlichung öffentlich.

## Transparenz

`transparenz.md`, `transparenz.html` und `transparenz.json` enthalten eine eigenständige Kurzfassung der Grundsätze zu Affiliate-Partnerschaften und unabhängigen Empfehlungen. Die ausführliche Erklärung bleibt im verlinkten Originalartikel. Markdown und JSON-LD manuell gemeinsam pflegen, anschließend HTML generieren. Partner, Beginn der Partnerschaften und Aussagen zur Arbeitsweise nur anhand bestätigter Angaben ändern. Keine Blog-Vollkopie und keine unbelegten Zusagen ergänzen.

Aktualisiert am: 21.10.2026
