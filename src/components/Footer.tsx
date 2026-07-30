import { Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const contactPins = [
    { label: 'GND', color: 'border-via-ring/40' },
    { label: 'VCC', color: 'border-led-green/60' },
    { label: 'TX', color: 'border-trace/60' },
    { label: 'RX', color: 'border-trace/60' },
    { label: 'RST', color: 'border-led-red/40' },
  ]

  return (
    <footer className="bg-plane-ground border-t border-trace/10 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trace/20 to-transparent" />
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            {contactPins.map((pin) => (
              <div key={pin.label} className="flex flex-col items-center gap-1">
                <div className={`w-3 h-6 rounded-pad ${pin.color} bg-substrate`} />
                <span className="font-mono text-[0.5rem] text-silkscreen-dim tracking-[0.2em]">
                  {pin.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm text-silkscreen-dim flex items-center gap-2">
            Hecho con <Heart className="w-3.5 h-3.5 text-led-red" /> por Heber Yesid Daza Toloza
          </p>

          <p className="font-mono text-xs text-silkscreen-dim tracking-wider">
            © {currentYear} · REV 1.0 · TODOS LOS DERECHOS RESERVADOS
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
