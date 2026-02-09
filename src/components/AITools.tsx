import React from 'react';

const AITools = () => {
  return (
    <section id="ai-tools" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Herramientas de IA Utilizadas
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Para la construcción y optimización de este portafolio, me apoyé en las siguientes tecnologías de Inteligencia Artificial:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white dark:bg-gray-700 px-6 py-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-600">
              <span className="font-semibold text-gray-800 dark:text-white">GitHub Copilot</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Asistencia en código y refactorización</p>
            </div>
            {/* Add more tools if known, for now just Copilot as requested/confirmed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITools;
