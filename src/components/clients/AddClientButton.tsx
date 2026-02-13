'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import AddClientModal from './AddClientModal'

export default function AddClientButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Client
      </button>

      {typeof window !== 'undefined' && showModal && createPortal(
        <AddClientModal onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  )
}