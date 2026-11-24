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
  return 'No encontré ese dato en las respuestas del portafolio. Puedes preguntarme por proyectos, habilidades, experiencia, estudios o [contactar a Heber](#contact).';
}
