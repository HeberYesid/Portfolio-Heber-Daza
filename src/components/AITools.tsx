const AITools = () => {
  return (
    <section id="ai-tools" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Herramientas de IA Utilizadas
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Para la construcción y optimización de este portafolio y mis proyectos, me apoyé en las siguientes tecnologías de Inteligencia Artificial:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white dark:bg-gray-700 px-6 py-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-600">
              <span className="font-semibold text-gray-800 dark:text-white">Claude Code</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Desarrollo asistido por IA con SDD</p>
            </div>
            <div className="bg-white dark:bg-gray-700 px-6 py-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-600">
              <span className="font-semibold text-gray-800 dark:text-white">OpenCode</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Agente de codificación de IA de código abierto</p>
            </div>
            <div className="bg-white dark:bg-gray-700 px-6 py-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-600">
              <span className="font-semibold text-gray-800 dark:text-white">OpenSpec</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Diseño guiado por especificaciones</p>
            </div>
            <div className="bg-white dark:bg-gray-700 px-6 py-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-600">
              <span className="font-semibold text-gray-800 dark:text-white">MCP</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Model Context Protocol</p>
            </div>
            <div className="bg-white dark:bg-gray-700 px-6 py-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-600">
              <span className="font-semibold text-gray-800 dark:text-white">Skills</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Habilidades y capacidades de la IA</p>
            </div>
            <div className="bg-white dark:bg-gray-700 px-6 py-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-600">
              <span className="font-semibold text-gray-800 dark:text-white">VS Code</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Editor de código</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITools;
