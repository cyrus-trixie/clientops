'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

type ToastType = 'success' | 'error' | 'info'

type Props = {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

const toastStyles: Record<ToastType, { bg: string; icon: string; iconColor: string }> = {
  success: {
    bg: 'bg-emerald-50 border-emerald-200',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconColor: 'text-emerald-600',
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconColor: 'text-red-600',
  },
  info: {
    bg: 'bg-blue-50 border-blue-200',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    iconColor: 'text-blue-600',
  },
}

export default function Toast({ message, type, onClose, duration = 3000 }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const styles = toastStyles[type]

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (typeof window === 'undefined') return null

  return createPortal(
    <div className="fixed top-4 right-4 z-[100] pointer-events-none">
      <div
        className={`
          pointer-events-auto
          flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg
          ${styles.bg}
          transform transition-all duration-300 ease-out
          ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
      >
        <svg className={`w-5 h-5 ${styles.iconColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={styles.icon} />
        </svg>
        <p className="text-sm font-medium text-slate-900">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="text-slate-400 hover:text-slate-600 ml-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  )
}