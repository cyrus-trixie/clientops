'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Client } from '@/types/client.types'
import EditClientModal from './EditClientModal'
import DeleteClientModal from './DeleteClientModal'

type Props = {
  client: Client
}

export default function ClientRow({ client }: Props) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <>
      <tr className="hover:bg-slate-50 transition-colors group">
        {/* Client Name */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm shrink-0">
              {client.name[0]?.toUpperCase() ?? '?'}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{client.name}</p>
            </div>
          </div>
        </td>

        {/* Contact Info */}
        <td className="px-6 py-4">
          <div className="space-y-1">
            {client.email && (
              <p className="text-sm text-slate-600">{client.email}</p>
            )}
            {client.phone && (
              <p className="text-xs text-slate-500">{client.phone}</p>
            )}
            {!client.email && !client.phone && (
              <p className="text-sm text-slate-400">No contact info</p>
            )}
          </div>
        </td>

        {/* Project Count */}
        <td className="px-6 py-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            {client.projectCount} {client.projectCount === 1 ? 'project' : 'projects'}
          </span>
        </td>

        {/* Date Added */}
        <td className="px-6 py-4">
          <p className="text-sm text-slate-600">{formatDate(client.created_at)}</p>
        </td>

        {/* Actions */}
        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setShowEditModal(true)}
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
              title="Edit client"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete client"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </td>
      </tr>

      {/* Modals - Rendered via Portal */}
      {typeof window !== 'undefined' && showEditModal && createPortal(
        <EditClientModal
          client={client}
          onClose={() => setShowEditModal(false)}
        />,
        document.body
      )}
      {typeof window !== 'undefined' && showDeleteModal && createPortal(
        <DeleteClientModal
          client={client}
          onClose={() => setShowDeleteModal(false)}
        />,
        document.body
      )}
    </>
  )
}