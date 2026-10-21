# Arbeitsanleitung für diese Knowledge Base

Diese Datei vor Änderungen lesen. Sie dokumentiert Projektkonventionen und den Stand vom **21.10.2026**. Bei strukturellen Änderungen und neuen Pflegewegen ebenfalls aktualisieren. Nutzeranweisungen haben Vorrang. Fakten bei Bedarf anhand der aktuellen Dateien prüfen; die folgenden Zahlen sind Bestandsangaben, keine dauerhaften Vorgaben.

## Zweck und Identität

Statische, deutschsprachige Knowledge Base für Menschen, Suchmaschinen und KI-Systeme. Veröffentlichung über GitHub Pages unter `https://knowledge.ralf-peter-kleinert.de/`; `CNAME` enthält diese Domain. Alle öffentlichen Dateien liegen im Repository-Stamm. Kein Framework, kein Backend und derzeit kein `package.json`.

- Person: **Ralf-Peter Kleinert**; öffentlicher Alias: **ComputerRalle**.
- Kanonische Marke: **DIGITAL-easy**. Andere Schreibweisen nur als historische Alternativen oder innerhalb unveränderter Zitate.
- Stabile Personen-ID: `https://knowledge.ralf-peter-kleinert.de/#ralf-peter-kleinert`.
- Stabile Marken-ID: `https://knowledge.ralf-peter-kleinert.de/#digital-easy`.
- Hauptwebsite: `https://ralf-peter-kleinert.de/`.
- GND: `1361273895`.

## Grundregeln

1. Inhaltliche Änderungen grundsätzlich in **Markdown, HTML und den betroffenen JSON-Dateien** konsistent umsetzen. Nicht allein die sichtbare HTML-Seite ändern.
2. Quellen und Tatsachen nicht erfinden. Nutzerangaben und vom Nutzer persönlich geprüfte Quellen als solche akzeptieren. Ein blockierter KI-Abruf bedeutet nicht, dass die Quelle ungeprüft oder ungültig ist.
3. Fehlende Titel oder Metadaten nicht erfinden; neutrale Bezeichnungen sind zulässig. Originaltexte, Rezensionen und Antworten nicht eigenmächtig verbessern, kürzen oder inhaltlich verändern.
4. Bestehende Nutzeränderungen erhalten. Vor der Arbeit `git status --short` und betroffene Dateien lesen. Nur erforderliche Änderungen; keine pauschale Neuformatierung großer JSON-Dateien.
5. Keine automatischen Commits, Pushes oder Veröffentlichungen ohne entsprechenden Auftrag. Am Ende klar zwischen lokal gespeichert, geprüft und veröffentlicht unterscheiden. Nicht pauschal behaupten, alles sei vollständig geprüft, wenn nur Syntax geprüft wurde.
6. UTF-8 verwenden. Keine privaten Zugangsdaten in Dateien oder Ausgaben. Öffentliche Kontaktdaten unten sind vom Nutzer ausdrücklich zur Veröffentlichung bereitgestellt.
7. `AGENTS.md` ist eine Arbeitsdatei: **keine HTML-Fassung, kein Navigationseintrag, kein Eintrag in Sitemap oder LLM-Verzeichnis**. Der HTML-Generator schließt sie aus. Bei GitHub Pages kann die Rohdatei dennoch erreichbar sein; hier keine Geheimnisse ablegen.

## Dateien und Zuständigkeiten

| Bereich | Quellen / strukturierte Daten | HTML |
|---|---|---|
| Startseite, zentrales CSS und Navigation | `index.html` direkt bearbeiten | `index.html` |
| Person und Identität | `identity.md`, `person.json` | `identity.html` |
| Marke | `organization.md`, `organization.json` (Typ `Brand`) | `organization.html` |
| Gesamtprofil, Kontakt, Verzeichnisse | `profile.json` (eigenes Format, kein JSON-LD) | keine eigene Seite |
| Lehrgänge und Kurse | `lehrgaenge-und-kurse.md`, `lehrgaenge-und-kurse.json` (manuell) | `lehrgaenge-und-kurse.html` |
| Bücher | `books.md`, `books.json` | `books.html` |
| Videos | `videos.md`, `videos.json` | `videos.html` |
| DNB und weitere Veröffentlichungen | `publications.md`, `publications.json` | `publications.html` |
| Offizielle Websites und Profile | `webauftritte.md`, `webauftritte.json` | `webauftritte.html` |
| Google-Rezensionen | `google-rezensionen.md`, `google-rezensionen.json` | `google-rezensionen.html` |
| Software | `software.md`, `software.json` | `software.html` |
| Dienstleistungen | `dienstleistungen.md`, generierte `dienstleistungen.json` | `dienstleistungen.html` |
| Impressum | `impressum.md`, generierte `impressum.json` | `impressum.html` |
| Buy Me a Coffee | `unterstuetzer.md`, generierte `unterstuetzer.json` | `unterstuetzer.html` |
| Sicherheit / KI-Nutzung | `security.md/.json`, `ki-training.md/.json` | gleichnamige HTML-Seiten |
| Pflegeanleitung | `README.md` | `README.html` |

Zusätzlich pflegen: `llms.txt` (Kurzfassung), `llms-full.txt` (ausführlicher Kontext), `sitemap.xml` (URLs). `robots.txt` erlaubt Crawler und nennt die Sitemap. Google-Verifikationsdatei `google056792c0a7eded57.html`, `CNAME` und Logo nicht beiläufig verändern.

## Generatoren und ihre Grenzen

### HTML: `node generate-html.mjs`

Erzeugt aus allen Markdown-Dateien außer `AGENTS.md` die gleichnamigen HTML-Dateien. Übernimmt CSS und Hauptnavigation aus `index.html`. Ergänzt kanonische URL, Markdown-Link und Footer mit Dienstleistungen, Impressum und Aktualisierungsdatum.

- `index.html` wird nicht generiert; dort Navigation, CSS und Footer direkt pflegen.
- Projektpfad ist seit dieser Sitzung relativ zum Skript über `fileURLToPath` bestimmt. Der frühere feste Desktop-Pfad wurde entfernt.
- **Abhängigkeit:** `marked` wird noch über einen absoluten lokalen Pfad unter `C:/Users/konta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/marked/lib/marked.esm.js` importiert. Vor Ausführung auf einem anderen Rechner Verfügbarkeit prüfen bzw. Portabilität gezielt herstellen. Keine zusätzliche Installation auf Verdacht.
- Seit 21.10.2026 liest der Generator das Aktualisierungsdatum jeder Markdown-Datei aus und übernimmt es in den Footer. Fehlende Datumszeilen führen zum Abbruch. Das Datum in `index.html` separat pflegen. Genau eine sichtbare Datumszeile je Inhaltsseite sicherstellen.
- Generatorlauf ist keine visuelle Prüfung und keine Schema.org-Validierung.

### JSON: `node generate-knowledge-data.mjs`

Erzeugt **nur** `dienstleistungen.json`, `impressum.json` und `unterstuetzer.json`. Andere JSON-Dateien werden manuell gepflegt.

- Dienstleistungen: `##`-Abschnitte aus Markdown werden als `Service` in einem `OfferCatalog` übernommen. Die Abschnitte `Kundenstimmen und Wertschätzung meiner Arbeit`, `So erreichen Sie mich` und `Kontakt` sind ausdrücklich ausgeschlossen. Bei neuen Überschriften prüfen, ob sie eine Leistung darstellen; Ausschlussliste ggf. anpassen.
- Kontaktdaten, Anschrift, Datum und einige Beschreibungstexte sind im Skript fest hinterlegt. Änderungen an diesen Angaben auch dort vornehmen, sonst überschreibt der nächste Lauf die korrigierte JSON-Datei.
- Unterstützer: Parser erwartet derzeit **62** Blöcke mit `### Nummer. Kürzel`. Kommentarzeilen beginnen mit `> `; Antworten sind mit `**Antwort:**`, Rückmeldungen mit `**Rückmeldung …:**` markiert. `Monatliche Unterstützung.` und `Ohne Kommentar.` werden gesondert erkannt.
- Der Parser erwartet derzeit einen einzeiligen Zitatblock pro Kommentar/Antwort/Rückmeldung. Für mehrzeilige oder zusätzliche Antworten Parser zuerst erweitern und Textgleichheit prüfen, statt Zeilen zu verlieren.
- Zahl 62, Profilzahl 59, Datum und Beschreibungen stehen mehrfach fest im Generator. Bei neuer Kopie sämtliche betroffenen Stellen und die Markdown-Einleitung abgleichen. Nicht künstlich an alten Zahlen festhalten.
- Schema-Typen: Dienstleistungen `WebPage` mit `OfferCatalog`/`Service`; Impressum `AboutPage` mit Person; Unterstützer `ItemList`/`CreativeWork`, Antworten `Comment`. Unterstützungen nicht als Sternebewertungen modellieren.

### YouTube: `generate-videos.ps1`

Optionaler Metadatenimport mit expliziten Parametern `-PythonPath` und `-YtDlpPath`; benötigt Python und `yt_dlp`. Fragt Videos/Shorts ab und **überschreibt** `videos.md` und `videos.json`.

Nicht als allgemeinen Buildschritt ausführen. Vorher manuell ergänzte Videos und Nutzertexte sichern/abgleichen. Danach Logo, Quellenlinks, Datumszeile, Identität und Listenanzahlen kontrollieren. Der bisherige Linktextfehler (Steuerzeichen statt `videos.json`, verursacht durch PowerShell-Backticks) wurde im Inhalt korrigiert; die entsprechende Zeichenfolge im Importskript bleibt eine bekannte Fehlerquelle. Importskript bei Bedarf korrigieren, bevor erneut importiert wird.

## Aktualisierungsablauf

1. Auftrag und Quellen lesen; betroffene Markdown-, JSON- und Generator-Dateien bestimmen. Bei bereitgestellten Anhängen Inhalte einlesen, nicht bloß auf die Datei verlinken.
2. Markdown aktualisieren. Generierte JSON-Quellen und fest hinterlegte Generatorangaben gemeinsam ändern; sonst betreffende JSON-Dateien direkt pflegen.
3. Listenpositionen, `numberOfItems`, stabile `@id`-Werte und Verknüpfungen prüfen. Aufrufzahlen nur mit belegtem Stand; keine dauerhaft aktuellen Zähler behaupten.
4. Datum konsistent pflegen. Das Aktualisierungsdatum gilt je Datei (Bestand 10.10.2026, zuletzt ergänzte Inhalte 21.10.2026); nicht durch bloßen Generatorlauf, neue Navigation oder Prüfungen ein neues Inhaltsdatum behaupten. Bei inhaltlicher Aktualisierung an einem späteren Datum den neuen Stand konsistent setzen, sofern der Nutzer kein Datum vorgibt.
5. Bei neuen Bereichen/Angeboten prüfen: `profile.json.contentDirectories`, `person.json.subjectOf`, Kontaktfelder, `llms.txt`, `llms-full.txt`, `README.md`, Startseiteninhalt und Navigation in `index.html`.
6. Falls betroffen zuerst `node generate-knowledge-data.mjs`, danach `node generate-html.mjs`. HTML niemals ausschließlich manuell ändern, wenn es beim nächsten Lauf überschrieben würde.
7. Sitemap bei neuen/entfernten öffentlichen Dateien aktualisieren; dann Prüfungen unten durchführen und die Änderungen kurz zusammenfassen.

### Datumsfelder

- Öffentliche Markdown-Dateien: genau eine Zeile `Aktualisiert am: TT.MM.JJJJ` am Ende.
- HTML: Datum einmal im Footer als `<time datetime="JJJJ-MM-TT">TT.MM.JJJJ</time>`.
- JSON-LD-Dokumente: `dateModified`. Reine `ItemList`-Dokumente sind zusätzlich `CreativeWork`, wenn sie ein Dokumentdatum tragen.
- `profile.json`: `updatedAt`.
- `person.json`: Datum an der `WebPage` in `mainEntityOfPage`.
- `organization.json`: Datum an der verknüpften `WebPage` in `subjectOf`.
- Historische Erfassungsdaten, Veröffentlichungsdaten und relative Zeitangaben nicht durch das Bearbeitungsdatum ersetzen.

### Sitemap-Regeln

Kanonische Start-URL `https://knowledge.ralf-peter-kleinert.de/` genau einmal; nicht zusätzlich `/index.html`. Danach öffentliche `.html`, `.md`, `.json` und Inhalts-`.txt` im Stamm, alphabetisch und ohne Duplikate. Ausschließen: `AGENTS.md`, `robots.txt`, Google-Verifikationsdatei, Skripte, `.git`, Logo und Sitemap selbst. Keine externen URLs. Keine erfundenen `lastmod`-Daten.

PowerShell-Beispiel zum Neuerzeugen:

```powershell
$baseUrl = 'https://knowledge.ralf-peter-kleinert.de/'
$urls = @($baseUrl)
$urls += Get-ChildItem -File | Where-Object {
    $_.Extension -in @('.html','.md','.json','.txt') -and
    $_.Name -notin @('index.html','AGENTS.md','robots.txt','google056792c0a7eded57.html')
} | Sort-Object Name | ForEach-Object { $baseUrl + [uri]::EscapeDataString($_.Name) }
$lines = @('<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
$lines += $urls | ForEach-Object { '  <url><loc>' + $_ + '</loc></url>' }
$lines += '</urlset>'
[IO.File]::WriteAllText((Join-Path $PWD 'sitemap.xml'), ($lines -join "`n") + "`n", [Text.UTF8Encoding]::new($false))
```

## Inhaltliche Festlegungen und bisherige Änderungen

### Bücher, Videos und Calaméo

- Ausgangsbestand: 25 Bucheinträge, 135 Videos/Shorts, 15 DNB-Publikationen und 16 Webauftritte. Die README-Aussage über leere Bücher-/Videolisten wurde berichtigt; tatsächlich gab es keine leeren Dateien.
- Video `8Yvj72rAU-Q`: früherer Platzhalter am 21.10.2026 anhand direkt abgerufener YouTube-Metadaten vervollständigt. Zusätzlich `3Kx-Jq7NR5E`, `DZC4bONOJaY` und `hygALG9lJcg` ergänzt. Stand: 139 Videoeinträge. Originaltitel, Upload-Datum, Dauer und unveränderte Videobeschreibungen dieser vier Videos sind in Markdown/HTML und JSON erfasst. Keine laufenden Aufrufzahlen ergänzt. Affiliate-Hinweise in der SABRENT-Beschreibung erhalten; enthaltene Preise und Leistungsangaben sind Aussagen aus der Videobeschreibung, keine aktuellen Angebote oder unabhängigen Messungen.
- Acht Calaméo-Links in `publications.md/.json`: Präfix `https://www.calameo.com/read/007590640`, Endungen `1c8b9e7d51fe`, `495f980ba2e0`, `2c5e582d41c1`, `3665ed90500b`, `3c34b0bdd0ba`, `45b736311bfa`, `80f0f740328a`, `e09e8c81f9b8`.
- Calaméo blockiert KI-Zugriff; der Nutzer hat die Dokumente persönlich geprüft. Alte Hinweise „noch nicht geprüft“ wurden entfernt. Neutrale nummerierte Bezeichnungen bleiben, bis Originaltitel vorliegen. Keine Vermutung, ob Volltext oder Leseprobe. Calaméo-Einträge getrennt von den 15 DNB-Nachweisen halten; Gesamtverzeichnis aktuell 23 Einträge. Bei später eindeutig zugeordneten Leseproben zusätzlich am passenden Buch verlinken, nicht als neues Buch zählen.

### Paperless Backup Programm

Eigene Softwareseite mit `SoftwareApplication`-Daten; erleichtert Menschen ohne tiefgehende Docker-/Kommandozeilenkenntnisse den Einstieg in Paperless-ngx unter Windows mit Docker Desktop. Funktionen: Installation, Aktualisierung, Sicherung, Wiederherstellung und Migration. Keine pauschale Kompatibilität mit beliebigen Linux-/NAS-Installationen behaupten. Programmdateien selbst wurden in diesem Repository nicht geändert.

- Beschreibung/Changelog: `https://downloads.ralf-peter-kleinert.de/software/paperless-backup-programm.html`
- Download: `https://downloads.ralf-peter-kleinert.de/download/paperless-backup-program`
- Anleitung: `https://ralf-peter-kleinert.de/paperless-backup-programm-anleitung/Anleitung-Paperless-Backup-Programm.pdf`
- Archiv: `https://downloads.ralf-peter-kleinert.de/download-category/paperless-backup-programm-archiv`

### Google-Rezensionen

- Maßgeblich ist die **zuletzt bereitgestellte ungeglättete Originalfassung**, nicht die zuvor gelieferte sprachlich geglättete Datei und nicht der alte Bestand vom 29.07.2026.
- 18 Fünf-Sterne-Bewertungen: 17 Texte, eine reine Sternebewertung; vier Inhaberantworten (Einträge 8, 9, 12, 16).
- Namen der Rezensenten nicht veröffentlichen; `[Kunde]` innerhalb der gelieferten Texte erhalten. Nennungen des Dienstleisters Ralf-Peter Kleinert bleiben im Originaltext.
- Texte, Tippfehler, Zeichensetzung und Antworten unverändert übernehmen. Antworten gehören in eigene Abschnitte bzw. JSON-`comment`, nicht in `reviewBody`. „Vor einem Jahr“ ist eine relative Angabe aus der Kopie, kein ableitbares Veröffentlichungsdatum.
- Sichtbarer Hinweis: **„Die Echtheit der Rezensionen kann über diesen Link geprüft werden“**, mit `https://maps.app.goo.gl/waQU48hJMvz6kLyK8`.
- HTML, Markdown und JSON müssen denselben Bestand enthalten. Keine erfundenen Autorennamen oder aktuellen Google-Gesamtzahlen ergänzen.

### Buy Me a Coffee

- Originalprofil: `https://buymeacoffee.com/computerralle`; prominent verlinken.
- Nutzerbestätigte authentische, anonymisierte Kopie: **59 Supporters in der Übersicht, 62 übermittelte Listeneinträge**. Abweichung offen erklären; weder auf 59 Einträge kürzen noch die Profilzahl eigenmächtig auf 62 ändern.
- 77 Kommentar-/Antwort-/Rückmeldungstexte in der aktuellen Kopie. Kürzel dürfen mehrfach vorkommen; nicht als dieselbe Person zusammenführen. Monatliche Unterstützung nur dort ausweisen, wo angegeben.
- Originalwortlaut samt Emojis erhalten; Kommentare, Inhaberantworten und Rückmeldungen trennen. Keine Glättung, keine Umdeutung zu einer Sternebewertung. Nutzer bestätigt Echtheit; kein automatischer Live-Abgleich.
- Profil ist als 17. offizieller Webauftritt erfasst. Dienstleistungen und Software verweisen auf die Unterstützerseite; deren Rückmeldungen betreffen auch Bücher, Videos und freie Inhalte, nicht ausschließlich bezahlte Dienstleistungen.

### Dienstleistungen und Kontakt

Leistungsbereiche: telefonische IT-/Sicherheitsberatung, Computerprobleme, Social-Media-Kontoschutz und offizielle Wiederherstellungswege, Reparatur in eigener Werkstatt, Hardwaretausch, Datenrettung, Betriebssystem-/Softwareinstallation, Systemumzug, Fernwartung nach Zustimmung, Datensicherung sowie lokale KI-Systeme.

Lokale KI: Planung, Hardwareauswahl und Aufbau, Installation, Inbetriebnahme und Einweisung; Beispiele NVIDIA-GPU/VRAM, LM Studio, geeignete lokale Modelle, optional abgesicherter Zugriff im eigenen Netzwerk. Lokale Verarbeitung ohne Cloudzwang erklären. Downloads/Updates können Internet benötigen; Offlinebetrieb erst mit lokal vorhandener geeigneter Software und Modellen. Keine pauschalen Leistungs-, Datenschutz-, Wiederherstellungs- oder Erfolgsversprechen. Technische Quellen auf der Seite: `https://lmstudio.ai/docs/app/offline` und `/docs/app/system-requirements`.

Google-Rezensionen und Buy Me a Coffee sind als Kundenstimmen bzw. Zeichen der Wertschätzung intern und mit Originalquellen verlinkt. Keine Aussage, diese Rückmeldungen bewiesen bereits die Zufriedenheit mit der neu angebotenen KI-Dienstleistung.

Öffentliche Angaben aus dem Nutzerauftrag:

```text
Ralf-Peter Kleinert
ComputerRalle
DIGITAL-easy
Schönfließer Straße 78
16548 Glienicke /Nordbahn
Telefon: 0163 220 492 3
E-Mail: digitaleasy@ralf-peter-kleinert.de
```

Telefon-Link: `tel:+491632204923`. Signal und WhatsApp unter derselben Nummer; WhatsApp-Link `https://wa.me/491632204923`. Werkstattbesuch nach Terminvereinbarung. Impressum auf allen Inhaltsseiten im Footer verlinkt. Keine rechtliche Vollständigkeit des Impressums behaupten oder weitere Anbieterangaben erfinden.

## Abschlussprüfung bei Änderungen

- Alle JSON-Dateien parsen; `numberOfItems` mit tatsächlichen Einträgen vergleichen, auch verschachtelten Dienstleistungskatalog prüfen. Schema.org-Typen/Beziehungen separat beurteilen; syntaktisch gültiges JSON ist nicht automatisch korrektes JSON-LD.
- Textgleichheit zwischen Quellen und JSON prüfen, insbesondere alle Rezensionen, Antworten und Unterstützerkommentare. Keine alten Rezensentennamen oder überholten Glättungshinweise stehen lassen.
- HTML-/Markdown-Links auf vorhandene lokale Ziele prüfen; `https:`, `mailto:`, `tel:` und Anker entsprechend behandeln. Navigation und Footer auf jeder Inhaltsseite vorhanden, Datum genau einmal. Verifikationsdatei aus Inhaltsseitenprüfungen ausnehmen.
- Sitemap als XML parsen, lokale Ziele und Ausschlüsse prüfen. Aktueller Stand: **51 URLs**, 17 HTML-Inhaltsseiten, 16 öffentliche Markdown-Dateien; `AGENTS.md` wird nicht mitgezählt. Zahlen bei Erweiterung neu bestimmen.
- Bei Layoutänderungen bzw. neuen Seitentypen auch Browserdarstellung prüfen. Keine unbelegten Aussagen über visuelle Qualität.
- `git diff --stat` und relevante Diffs kontrollieren. Keine angehängten Quelldateien aus `.codex/attachments` als Abhängigkeit voraussetzen: Inhalte müssen dauerhaft im Projekt liegen.
- Restpunkte offen benennen: ursprüngliche Calaméo-Titel fehlen weiterhin; die Startseite bindet die in der README empfohlenen Personen-/Marken-JSON-LD-Skripte bislang nicht direkt ein. Nicht als bereits erledigt darstellen.

## Ergänzung vom 21.10.2026: Lehrgänge und Kurse

Eigener Bereich `lehrgaenge-und-kurse.md/.html/.json`, in Navigation, Startseite, Gesamtprofil, Person, LLM-Verzeichnissen und Sitemap verknüpft. Aktuell ein Eintrag: kostenloser Proxmox-VE-Komplettlehrgang (zwei Playlists und vollständiges VE-8-Praxisbuch als kostenloses PDF), laut vom Autor bereitgestelltem Blogtext vom 21.10.2026. Nur kurze eigenständige Verzeichnisbeschreibung und Link zum Originalartikel übernehmen, keinen Blog-Volltext oder Lektionenkatalog duplizieren. 27 bezeichnet Playlist-Einträge mit Überschneidungen, nicht unterschiedliche Videos. Das separat angebotene VE-9-Buch ist kein Bestandteil des kostenlosen Angebots. Keine Kurstitel, Preise, Termine oder Abschlüsse erfinden. Neue Einträge manuell in Markdown und JSON-LD (`itemListElement`, `numberOfItems`) gemeinsam pflegen, danach HTML generieren. Aktualisierungsdaten gelten je Datei; unveränderte Inhalte behalten ihren bisherigen Stand.

Die sieben vom Nutzer gelieferten Direktlinks zu PDF, beiden Playlists, ergänzenden Anleitungen, VE-9-Amazon-Angebot, YouTube-Kanal und Blog sind im Kurseintrag und JSON-LD erfasst. Bücherverzeichnis und Kurs sind gegenseitig verknüpft; keine zusätzliche Buchzählung für das kostenlose PDF.

### Veröffentlichungsstand und Pflege des Lehrgangs

- Der Nutzer hat am 21.10.2026 bestätigt, dass der ergänzte Bereich mit seinen Verknüpfungen funktioniert und öffentlich ist. Dies ist eine Nutzerbestätigung, kein eigener Live-Abruf.
- Bei Änderungen am Angebot alle Direktlinks in `lehrgaenge-und-kurse.md/.json` gemeinsam pflegen; Bücherbezüge in `books.md/.json` abgleichen. Stabile Buch-IDs und die Zahl der Bucheinträge erhalten.
- JSON-LD führt den Lehrgang als `Course` mit Person als Anbieter, `isAccessibleForFree: true` und einem Angebot zu 0 EUR. Kostenlose Materialien stehen unter `hasPart`, ergänzende Anleitungen und das optionale VE-9-Kaufbuch unter `isRelatedTo`. Den Kaufpreis des VE-9-Buchs nicht als 0 EUR ausweisen.
- Keine Vollkopie des Blogartikels, keine Verdoppelung der Lektionen oder bestehender Bücher-/Videoeinträge anlegen. Kurze eigene Zusammenfassung und Original- sowie Materiallinks genügen.
- Die jetzt folgende Pflege der Anleitungen ist lokal; die Nutzerbestätigung zum veröffentlichten Kurs ist keine Erlaubnis zu weiteren automatischen Pushes.

## Ergänzung vom 21.10.2026: Transparenz

Eigener Bereich `transparenz.md/.html/.json`, in Navigation, Startseite, Gesamtprofil, Person, LLM-Verzeichnissen, README und Sitemap verknüpft. Eigenständige Kurzfassung des vom Nutzer gelieferten Affiliate-Artikels (Originalstand 20.10.2026), keine Vollkopie. Kernaussagen: Meinung nicht käuflich; hilfreiche und geeignete Produkte statt provisionsgetriebener Verkäufe; eigene Tests von recherchierten Angaben unterscheiden; Affiliate-Links und Kooperationen offenlegen. Partnerstand: pCloud und eRecht24 seit 15.10.2024, Amazon seit 20.10.2026. Markdown und manuelle WebPage-JSON-LD gemeinsam pflegen, danach HTML generieren. Originalartikel als ausführliche Quelle erhalten; keine rechtliche Prüfung der Werbekennzeichnung behaupten.
