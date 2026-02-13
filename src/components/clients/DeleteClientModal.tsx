'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Client } from '@/types/client.types'

type Props = {
  client: Client
  onClose: () => void
}

export default function DeleteClientModal({ client, onClose }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async () => {
    setError(null)
    setLoading(true)

    const { error: deleteError } = await supabase
      .from('clients')
      .delete()
      .eq('id', client.id)

    if (deleteError) {
      setError(deleteError.message)
      setLoading(false)
    } else {
      router.refresh()
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Delete Client</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <p className="text-sm text-slate-600 mb-4">
            Are you sure you want to delete <span className="font-semibold text-slate-900">{client.name}</span>?
          </p>

          {client.projectCount > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
              <p className="text-sm text-amber-800">
                This client has {client.projectCount} {client.projectCount === 1 ? 'project' : 'projects'}. 
                Deleting this client will also delete all associated projects and payments.
              </p>
            </div>
          )}

          <p className="text-sm text-slate-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Deleting...' : 'Delete Client'}
          </button>
        </div>
      </div>
    </div>
  )
}