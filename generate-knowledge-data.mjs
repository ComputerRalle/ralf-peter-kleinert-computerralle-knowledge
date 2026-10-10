import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const base = 'https://knowledge.ralf-peter-kleinert.de/';
const date = '2026-10-10';
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const save = (file, data) => fs.writeFileSync(path.join(root, file), JSON.stringify(data, null, 2) + '\n');
const person = { '@id': base + '#ralf-peter-kleinert' };
const address = { '@type': 'PostalAddress', streetAddress: 'Schönfließer Straße 78', postalCode: '16548', addressLocality: 'Glienicke /Nordbahn', addressCountry: 'DE' };
const contact = { telephone: '+491632204923', email: 'digitaleasy@ralf-peter-kleinert.de' };
const sections = read('dienstleistungen.md').split(/^## /m).slice(1)
  .map(section => ({ name: section.split(/\r?\n/)[0], text: section.slice(section.indexOf('\n') + 1).trim() }))
  .filter(section => !['Kundenstimmen und Wertschätzung meiner Arbeit', 'So erreichen Sie mich', 'Kontakt'].includes(section.name));
const services = sections.map((section, i) => ({ '@type': 'Service', '@id': base + 'dienstleistungen.html#leistung-' + (i + 1), name: section.name, description: section.text, provider: person, url: base + 'dienstleistungen.html' }));
save('dienstleistungen.json', {
  '@context': 'https://schema.org', '@type': 'WebPage', '@id': base + 'dienstleistungen.html',
  name: 'Dienstleistungen von Ralf-Peter Kleinert / ComputerRalle / DIGITAL-easy', dateModified: date, inLanguage: 'de', url: base + 'dienstleistungen.html',
  description: 'IT-Beratung, Computerreparatur, Datenrettung, Installation, Datensicherung und lokale KI-Systeme ohne Cloudzwang für Privatpersonen und kleine Unternehmen.',
  mainEntity: { '@type': 'OfferCatalog', name: 'Dienstleistungen', numberOfItems: services.length, itemListElement: services.map(service => ({ '@type': 'Offer', itemOffered: service })) },
  relatedLink: [base + 'google-rezensionen.html', base + 'unterstuetzer.html', 'https://maps.app.goo.gl/waQU48hJMvz6kLyK8', 'https://buymeacoffee.com/computerralle'],
  author: { '@type': 'Person', ...person, name: 'Ralf-Peter Kleinert', ...contact, address, contactPoint: { '@type': 'ContactPoint', ...contact, contactType: 'Anfragen zu Dienstleistungen; auch über Signal und WhatsApp', url: 'https://wa.me/491632204923' } }
});
save('impressum.json', {
  '@context': 'https://schema.org', '@type': 'AboutPage', '@id': base + 'impressum.html', url: base + 'impressum.html', name: 'Impressum', dateModified: date, inLanguage: 'de',
  mainEntity: { '@type': 'Person', ...person, name: 'Ralf-Peter Kleinert', alternateName: 'ComputerRalle', brand: { '@id': base + '#digital-easy', name: 'DIGITAL-easy' }, address, ...contact }
});
const blocks = [...read('unterstuetzer.md').matchAll(/^### (\d+)\. (.+)\r?\n([\s\S]*?)(?=^### \d+\. |\nAktualisiert am:|$(?![\s\S]))/gm)];
if (blocks.length !== 62) throw new Error('62 Unterstützer-Einträge erwartet');
const items = blocks.map((match, i) => {
  const body = match[3];
  const quotes = [...body.matchAll(/^> (.*)$/gm)].map(quote => quote[1].replace(/\r$/, ''));
  const hasInitialComment = /^> /m.test(body.split('**Antwort:**')[0]);
  let quoteIndex = 0;
  const item = { '@type': 'CreativeWork', name: 'Unterstützer-Eintrag ' + match[1] + ': ' + match[2].trim(), author: { '@type': 'Person', name: match[2].trim() }, url: 'https://buymeacoffee.com/computerralle' };
  if (hasInitialComment) item.text = quotes[quoteIndex++];
  if (body.includes('Monatliche Unterstützung.')) item.description = 'Monatliche Unterstützung laut bereitgestellter Kopie.';
  if (body.includes('Ohne Kommentar.')) item.description = 'Ohne Kommentar laut bereitgestellter Kopie.';
  const comments = [];
  if (body.includes('**Antwort:**')) comments.push({ '@type': 'Comment', author: person, text: quotes[quoteIndex++] });
  if (body.includes('**Rückmeldung')) comments.push({ '@type': 'Comment', author: item.author, text: quotes[quoteIndex++] });
  if (comments.length) item.comment = comments;
  if (quoteIndex !== quotes.length) throw new Error('Nicht zugeordnete Texte in Eintrag ' + match[1]);
  return { '@type': 'ListItem', position: i + 1, item };
});
save('unterstuetzer.json', {
  '@context': 'https://schema.org', '@type': ['ItemList', 'CreativeWork'], '@id': base + 'unterstuetzer.json', url: base + 'unterstuetzer.html', name: 'Unterstützer und Rückmeldungen auf Buy Me a Coffee',
  dateModified: date, inLanguage: 'de', numberOfItems: 62,
  description: 'Vom Autor am 10.10.2026 bereitgestellte anonymisierte Kopie mit 62 Einträgen. Die Profilübersicht nennt 59 Unterstützer; beide Zahlen sind getrennte Momentaufnahmen. Kommentare, Antworten und Rückmeldungen werden unverändert übernommen. Keine Sternebewertung und kein automatisch aktualisierter Zähler.',
  isBasedOn: { '@type': 'ProfilePage', url: 'https://buymeacoffee.com/computerralle' }, about: person,
  additionalProperty: { '@type': 'PropertyValue', name: 'Unterstützerzahl laut bereitgestellter Profilübersicht', value: 59 }, itemListElement: items
});
console.log('Dienstleistungen, Impressum und 62 Unterstützer-Einträge als JSON erzeugt.');
