import { PORTFOLIO_CONTEXT } from './portfolioContext';

function section(start: string, end: string) {
  return PORTFOLIO_CONTEXT.split(`${start}:\n`)[1]?.split(`\n${end}:`)[0]?.trim();
}

const projects = (section('Proyectos Destacados', 'Instrucciones para tus respuestas') ?? '')
  .split(/\n\s*\n/).flatMap(block => {
    const title = block.match(/^\d+\. (.*?)(?: \(Featured\))?:\n/);
    return title ? [{ name: title[1], details: block.slice(title[0].length)
      .replace(/^ +(?=- )/gm, '')
      .replace(/^- (GitHub|Demo): (https:\/\/\S+)$/gm, '- [$1]($2)') }] : [];
  });
const normalize = (text: string) => text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
const languages = section('Idiomas', 'Habilidades Técnicas (Hard Skills)');
const tools = section('Habilidades Técnicas (Hard Skills)', 'Habilidades Blandas (Soft Skills)')
  ?.split('\n').find(line => line.startsWith('- Herramientas, IA & Arquitectura:'))?.slice(2);

function hasTypo(words: string[], keyword: string, allowSubstitution = false) {
  return words.some(word => {
    if (word.length !== keyword.length) return false;
    const mismatches = [...keyword].flatMap((letter, index) => letter === word[index] ? [] : [index]);
    const [first, second] = mismatches;
    return (allowSubstitution && mismatches.length === 1)
      || (mismatches.length === 2 && second === first + 1 && word[first] === keyword[second] && word[second] === keyword[first]);
  });
}

export function answerLocally(question: string): string {
  const text = normalize(question);
  const project = projects.find(({ name }) => text.includes(normalize(name)));

  if (project) return `**${project.name}**\n\n${project.details}`;
  if (/\b(contact\w*|correo|email|linkedin|telefono|celular)\b/.test(text)) {
    return 'Puedes usar los canales publicados en la [sección de contacto](#contact).';
  }
  if (/\b(proyectos?|portafolio)\b/.test(text)) {
    return `Proyectos destacados:\n\n${projects.map(({ name }) => `- ${name}`).join('\n')}`;
  }
  if (tools && /\bherramientas?\b/.test(text)) return tools;
  const topics = [
    [/\b(habilidades?|tecnologias?|stack|lenguajes?|backend)\b/, 'Habilidades Técnicas (Hard Skills)', 'Habilidades Blandas (Soft Skills)'],
    [/\b(experiencia|laboral|excomin|empleos?)\b/, 'Experiencia Laboral', 'Educación'],
    [/\b(educacion|estudios?|universidad|graduacion|certificaciones?)\b/, 'Educación', 'Proyectos Destacados'],
    [/\b(idiomas?|ingles|espanol)\b/, 'Idiomas', 'Habilidades Técnicas (Hard Skills)'],
  ] as const;
  for (const [pattern, start, end] of topics) {
    const answer = pattern.test(text) && section(start, end);
    if (answer) return answer;
  }
  // Primero las coincidencias exactas; los errores de escritura solo se toleran en estos temas.
  const words = text.match(/\p{L}+/gu) ?? [];
  if (languages && hasTypo(words, 'idiomas')) return languages;
  if (tools && hasTypo(words, 'herramientas', true)) return tools;
  return 'No encontré ese dato en las respuestas del portafolio. Puedes preguntarme por proyectos, herramientas, idiomas, experiencia, estudios o [contactar a Heber](#contact).';
}
