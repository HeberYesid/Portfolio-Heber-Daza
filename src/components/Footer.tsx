import { Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-center flex items-center gap-2">
            Hecho con <Heart className="w-4 h-4 text-red-500 fill-red-500" /> por Heber Yesid Daza Toloza
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {currentYear} Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
