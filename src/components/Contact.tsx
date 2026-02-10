import { Mail, Linkedin, Github, Phone } from 'lucide-react'

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'heberyesiddazatoloza@gmail.com',
      link: 'mailto:heberyesiddazatoloza@gmail.com',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: '(+57) 313 3331900',
      link: 'https://wa.me/+573133331900',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'Conecta conmigo',
      link: 'https://www.linkedin.com/in/heberyesid/',
      color: 'from-blue-600 to-blue-800',
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'Explora mis proyectos',
      link: 'https://github.com/HeberYesid',
      color: 'from-gray-700 to-gray-900',
    }
  ]

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Trabajemos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Juntos</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente o quieres colaborar? No dudes en contactarme. 
            Estoy abierto a nuevas oportunidades y desafíos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-950 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:scale-105 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-gradient-to-br ${method.color} rounded-lg`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{method.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h3>
            <p className="text-lg mb-8 opacity-90">
              Hablemos sobre cómo puedo contribuir a tu próximo proyecto
            </p>
            <a
              href="mailto:heberyesid@example.com"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
              Enviar Mensaje
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
