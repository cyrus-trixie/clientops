'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      // Check if email confirmation is required
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        // No email confirmation required, redirect immediately
        router.push('/dashboard')
        router.refresh()
      } else {
        // Email confirmation required
        setError('Check your email for a confirmation link!')
        setLoading(false)
      }
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center text-white text-lg font-bold">
          C
        </div>
        <span className="text-xl font-semibold text-slate-900">ClientOps</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Create an account</h1>
        <p className="text-sm text-slate-500">Get started with ClientOps today</p>
      </div>

      {/* Error/Success Message */}
      {error && (
        <div className={`mb-4 p-3 rounded-lg ${
          error.includes('Check your email') 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <p className={`text-sm ${
            error.includes('Check your email') ? 'text-green-600' : 'text-red-600'
          }`}>
            {error}
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="••••••••"
          />
          <p className="mt-1 text-xs text-slate-500">Must be at least 6 characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}