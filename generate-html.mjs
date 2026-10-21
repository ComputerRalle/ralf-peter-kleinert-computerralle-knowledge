import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "file:///C:/Users/konta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/marked/lib/marked.esm.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const files = fs.readdirSync(root).filter((name) => name.toLowerCase().endsWith(".md") && name.toLowerCase() !== "agents.md");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const siteStyles = indexHtml.match(/<style>([\s\S]*?)<\/style>/i)?.[1] ?? "";
const siteNavigation = indexHtml.match(/<nav class="main-nav"[\s\S]*?<\/nav>/i)?.[0] ?? "";
const pageDescriptions = {
  "identity": "Ralf-Peter Kleinert, bekannt als ComputerRalle: IT-Praktiker, Fachbuchautor und Softwareentwickler. Identität, Fachgebiete und offizielle Profile.",
  "organization": "DIGITAL-easy ist die offizielle Marke von Ralf-Peter Kleinert / ComputerRalle für IT-Fachbücher, Tutorials, Software und Dienstleistungen.",
  "books": "Bücher von Ralf-Peter Kleinert zu Proxmox, IT-Sicherheit, Cloud und Computertechnik: Titel, Ausgaben, bibliografische Angaben und Bezugsquellen.",
  "videos": "Videos und Shorts von ComputerRalle zu Proxmox, Backup, Paperless-ngx und IT-Sicherheit mit Originalbeschreibungen und YouTube-Links.",
  "publications": "Veröffentlichungen von Ralf-Peter Kleinert: DNB-Nachweise, GND-Zuordnung und ergänzende Calaméo-Veröffentlichungen mit Quellenlinks.",
  "webauftritte": "Offizielle Websites und Profile von Ralf-Peter Kleinert / ComputerRalle und DIGITAL-easy: bestätigte Quellen und öffentliche Internetauftritte.",
  "google-rezensionen": "Anonymisierte Google-Rezensionen zu Ralf-Peter Kleinert / DIGITAL-easy mit unveränderten Bewertungstexten, Inhaberantworten und Originalquelle.",
  "software": "Paperless Backup Programm von ComputerRalle: Paperless-ngx unter Windows installieren, aktualisieren, sichern, wiederherstellen und migrieren.",
  "dienstleistungen": "IT-Beratung, Computerreparatur, Datenrettung, Datensicherung und lokale KI-Systeme von Ralf-Peter Kleinert / DIGITAL-easy in Glienicke /Nordbahn.",
  "impressum": "Anbieter- und Kontaktangaben zu Ralf-Peter Kleinert / ComputerRalle / DIGITAL-easy: Anschrift, Telefonnummer und E-Mail-Adresse.",
  "unterstuetzer": "Unterstützung für ComputerRalle auf Buy Me a Coffee: anonymisierte Kommentare, Antworten und Rückmeldungen mit Link zum Originalprofil.",
  "lehrgaenge-und-kurse": "Kostenloser Proxmox-VE-Lehrgang von ComputerRalle mit Video-Playlists und vollständigem VE-8-Praxisbuch als PDF. Übersicht und Materiallinks.",
  "security": "Sicherheits- und Authentizitätshinweise von ComputerRalle: offizielle Downloadquellen, Quellenprüfung und Umgang mit manipulierten Medien.",
  "ki-training": "Erklärung von Ralf-Peter Kleinert zur Nutzung eigener öffentlicher Inhalte für KI-Training, Evaluierung, Suchsysteme und RAG mit Bedingungen.",
  "transparenz": "ComputerRalle über Affiliate-Partnerschaften, Werbekennzeichnung und unabhängige Produktempfehlungen: Meine Meinung ist nicht käuflich.",
  "README": "Pflegeanleitung der Knowledge Base von Ralf-Peter Kleinert: Inhaltsquellen, strukturierte Daten, HTML-Generierung und Aktualisierungsabläufe."
};
const baseUrl = "https://knowledge.ralf-peter-kleinert.de/";
const siteName = "ComputerRalle – Knowledge Base";
const logoUrl = baseUrl + "computerralle-Logo-Final-2026_4000x4000-2048x2048.webp";
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, name), "utf8"));
const jsonScript = (data, id = "") => `<script${id ? ` id="${id}"` : ""} type="application/ld+json">${JSON.stringify(data).replaceAll("<", "\\u003c")}</script>`;

marked.setOptions({ gfm: true, breaks: false });

for (const file of files) {
  const sourcePath = path.join(root, file);
  const targetName = file.replace(/\.md$/i, ".html");
  const targetPath = path.join(root, targetName);
  let markdown = fs.readFileSync(sourcePath, "utf8");
  const dateMatch = markdown.match(/^Aktualisiert am: (\d{2})\.(\d{2})\.(\d{4})\s*$/m);
  if (!dateMatch) throw new Error(`Aktualisierungsdatum fehlt: ${file}`);
  const displayDate = `${dateMatch[1]}.${dateMatch[2]}.${dateMatch[3]}`;
  const isoDate = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
  markdown = markdown.replace(/^Aktualisiert am: \d{2}\.\d{2}\.\d{4}\s*$/gm, "");

  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : file.replace(/\.md$/i, "");
  const styleMatch = markdown.match(/<style>[\s\S]*?<\/style>/i);
  if (styleMatch) {
    markdown = markdown.replace(styleMatch[0], "");
  }
  markdown = markdown.replace(/<nav class="main-nav"[\s\S]*?<\/nav>/i, "");

  let body = await marked.parse(markdown);
  if (siteNavigation) {
    const logoParagraph = /(<p align="center"><img[^>]+computerralle-Logo-Final-2026[^>]*><\/p>)/i;
    body = logoParagraph.test(body)
      ? body.replace(logoParagraph, `$1\n${siteNavigation}`)
      : `${siteNavigation}\n${body}`;
  }
  const canonical = "https://knowledge.ralf-peter-kleinert.de/" + encodeURIComponent(targetName).replace(/%2F/gi, "/");
  const markdownUrl = "https://knowledge.ralf-peter-kleinert.de/" + encodeURIComponent(file).replace(/%2F/gi, "/");
  const stem = file.replace(/\.md$/i, "");
  const description = pageDescriptions[stem];
  if (!description) throw new Error(`Seitenbeschreibung fehlt: ${file}`);
  const jsonName = stem === "identity" ? "person.json" : `${stem}.json`;
  const hasJson = stem !== "README" && fs.existsSync(path.join(root, jsonName));
  const structuredData = hasJson ? jsonScript(readJson(jsonName)) : "";

  const html = `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index, follow">
  <title>${escapeHtml(title)} – Ralf-Peter Kleinert / ComputerRalle</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" type="text/markdown" href="${markdownUrl}" title="Markdown-Quelle">
  <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM information">
  <link rel="author" href="${baseUrl}identity.html">
${hasJson ? `  <link rel="alternate" type="application/ld+json" href="${baseUrl}${jsonName}" title="Strukturierte Daten">` : ""}
  <meta property="og:type" content="website">
  <meta property="og:locale" content="de_DE">
  <meta property="og:site_name" content="${escapeHtml(siteName)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${logoUrl}">
  ${structuredData}
  <style>
${siteStyles}
    main {
      display: block;
    }

    footer {
      margin-top: 3rem;
      padding-top: 1rem;
      border-top: 1px solid color-mix(in srgb, currentColor 25%, transparent);
      color: GrayText;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <main>
${body.trim()}
  </main>
  <footer>
    <p><a href="dienstleistungen.html">Dienstleistungen</a> · <a href="impressum.html">Impressum</a></p>
    <p>Aktualisiert am: <time datetime="${isoDate}">${displayDate}</time></p>
    <p>Ralf-Peter Kleinert / ComputerRalle / DIGITAL-easy · <a href="${markdownUrl}">Markdown-Quelle</a></p>
  </footer>
</body>
</html>
`;
  fs.writeFileSync(targetPath, html, { encoding: "utf8" });
  process.stdout.write(`Erzeugt: ${targetName}\n`);
}

const homeData = {
  "@context": "https://schema.org",
  "@graph": [
    ...["person.json", "organization.json"].map((name) => {
      const { "@context": context, ...entity } = readJson(name);
      return entity;
    }),
    { "@type": "WebSite", "@id": baseUrl + "#website", "url": baseUrl,
      "name": siteName, "inLanguage": "de", "publisher": { "@id": baseUrl + "#ralf-peter-kleinert" } }
  ]
};
const homeBlock = `<!-- BEGIN GENERATED KNOWLEDGE DATA -->
${jsonScript(homeData, "knowledge-data")}
<!-- END GENERATED KNOWLEDGE DATA -->`;
const managedBlock = /<!-- BEGIN GENERATED KNOWLEDGE DATA -->[\s\S]*?<!-- END GENERATED KNOWLEDGE DATA -->/;
const updatedIndex = managedBlock.test(indexHtml)
  ? indexHtml.replace(managedBlock, () => homeBlock)
  : indexHtml.replace("</head>", () => `${homeBlock}\n</head>`);
fs.writeFileSync(path.join(root, "index.html"), updatedIndex, "utf8");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
