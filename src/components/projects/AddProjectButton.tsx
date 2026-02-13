'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import AddProjectModal from './AddProjectModal'

type Props = {
  clients: { id: string; name: string }[]
}

export default function AddProjectButton({ clients }: Props) {
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
        Add Project
      </button>

      {typeof window !== 'undefined' && showModal && createPortal(
        <AddProjectModal clients={clients} onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  )
}