import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import Contact from './Contact'
import Experience from './Experience'
import Education from './Education'
import Projects from './Projects'
import UpdatePassword from './UpdatePassword'
import Chatbot from './Chatbot'
import TechNews from './TechNews'
import { LogOut, Video, FileDown, Download } from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Dashboard Header */}
      <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium shadow-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-24 pb-12 space-y-12">
        {/* Welcome Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold mb-4">Bienvenido al Panel Privado</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Aquí tienes acceso a información exclusiva y medios de contacto directos.
          </p>
        </section>

        {/* CV Download Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <FileDown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Currículum Vitae</h2>
              <p className="opacity-90 text-sm md:text-base">Descarga mi perfil profesional detallado en formato PDF</p>
            </div>
          </div>
          <a
            href="/CV_Heber_Yesid_Daza.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-5 h-5" />
            Descargar CV
          </a>
        </section>

        {/* Tech News Aggregator */}
        <TechNews />

        {/* AI Chatbot Section */}
        <Chatbot />

        <UpdatePassword />

        {/* Detailed Experience & Education */}
        <Experience />
        <Projects />
        <Education />

        {/* Video Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <Video className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Video de Presentación</h2>
          </div>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-inner">
             {/* Replace this iframe with your actual video source */}
             <iframe 
                className="w-full h-full"
                src="LINK VIDEO YOUTUBE/" 
                title="Video Presentation" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Contact Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Contact />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
