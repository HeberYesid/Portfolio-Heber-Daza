import { Code2, Database, Cloud, Shield, Wrench } from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: 'Backend & Frameworks',
      skills: ['Python', 'Django', 'FastAPI', 'TypeScript', 'NodeJS','ExpressJS', 'API REST', 'OpenAPI / Swagger'],
    },
    {
      icon: Database,
      title: 'Bases de Datos',
      skills: ['PostgreSQL', 'MySQL'],
    },
    {
      icon: Cloud,
      title: 'DevOps & Cloud',
      skills: ['CI/CD', 'AWS', 'Google Cloud', 'Git', 'GitHub'],
    },
    {
      icon: Shield,
      title: 'Seguridad & Testing',
      skills: ['JWT', 'Pytest', 'Vitest', 'OWASP 10'],
    },
    {
      icon: Wrench,
      title: 'Otras Habilidades',
      skills: ['Principios SOLID', 'DRY', 'KISS', 'Patrones de Diseño', 'Scrum', 'Trello', 'Jira', 'VS Code','Github Copilot','OpenCode'],
    },
  ]

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Tecnologías y <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Herramientas</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
            Mi stack tecnológico y áreas de especialización
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-950 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:scale-105 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
                    <category.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
