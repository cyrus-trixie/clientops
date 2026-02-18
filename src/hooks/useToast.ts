'use client'

import { useState, useCallback } from 'react'

type ToastType = 'success' | 'error' | 'info'

type ToastState = {
  message: string
  type: ToastType
  id: number
} | null

export function useToast() {
  const [toast, setToast] = useState<ToastState>(null)

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    setToast({ message, type, id: Date.now() })
  }, [])

  const hideToast = useCallback(() => {
    setToast(null)
  }, [])

  return {
    toast,
    showToast,
    hideToast,
    success: (message: string) => showToast(message, 'success'),
    error: (message: string) => showToast(message, 'error'),
    info: (message: string) => showToast(message, 'info'),
  }
}