import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Lock } from 'lucide-react'

export default function UpdatePassword() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setErrorMsg('')

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      setErrorMsg(error.message)
    } else {
      setMessage('Contraseña actualizada exitosamente')
      setPassword('')
    }
    setLoading(false)
  }

  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Configurar Contraseña</h2>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Si fuiste invitado o deseas cambiar tu clave, ingrésala a continuación.
      </p>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {message}
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handlePasswordUpdate} className="max-w-md">
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="new-password">Nueva Contraseña</label>
            <input
              id="new-password"
              type="password"
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa nueva contraseña"
            />
        </div>
        <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
            {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
        </button>
      </form>
    </section>
  )
}
