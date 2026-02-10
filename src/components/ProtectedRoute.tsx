import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../supabaseClient'

const ProtectedRoute = () => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">Cargando...</div>
    }

    if (!session) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute
