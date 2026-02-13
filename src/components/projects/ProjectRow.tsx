'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ProjectWithClient } from '@/types/project.types'
import EditProjectModal from './EditProjectModal'
import DeleteProjectModal from './DeleteProjectModal'

type Props = {
  project: ProjectWithClient
  clients: { id: string; name: string }[]
}

const statusStyles: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-600 border-slate-200',
  in_progress: 'bg-amber-50 text-amber-700 border-amber-100',
  review: 'bg-blue-50 text-blue-700 border-blue-100',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  cancelled: 'bg-red-50 text-red-700 border-red-100',
}

const statusLabels: Record<string, string> = {
  draft: 'Draft',
  in_progress: 'In Progress',
  review: 'Review',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export default function ProjectRow({ project, clients }: Props) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <>
      <tr className="hover:bg-slate-50 transition-colors group">
        {/* Project Title */}
        <td className="px-6 py-4">
          <p className="text-sm font-medium text-slate-900">{project.title}</p>
        </td>

        {/* Client */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
              {project.clientName[0]?.toUpperCase() ?? '?'}
            </div>
            <span className="text-sm text-slate-600">{project.clientName}</span>
          </div>
        </td>

        {/* Status */}
        <td className="px-6 py-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[project.status]}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {statusLabels[project.status]}
          </span>
        </td>

        {/* Price */}
        <td className="px-6 py-4">
          <span className="text-sm font-medium text-slate-900">
            ${Number(project.price).toLocaleString()}
          </span>
        </td>

        {/* Created Date */}
        <td className="px-6 py-4">
          <p className="text-sm text-slate-600">{formatDate(project.created_at)}</p>
        </td>

        {/* Actions */}
        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setShowEditModal(true)}
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
              title="Edit project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </td>
      </tr>

      {/* Modals */}
      {typeof window !== 'undefined' && showEditModal && createPortal(
        <EditProjectModal
          project={project}
          clients={clients}
          onClose={() => setShowEditModal(false)}
        />,
        document.body
      )}
      {typeof window !== 'undefined' && showDeleteModal && createPortal(
        <DeleteProjectModal
          project={project}
          onClose={() => setShowDeleteModal(false)}
        />,
        document.body
      )}
    </>
  )
}