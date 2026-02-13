'use client'

import { useState } from 'react'
import { Client } from '@/types/client.types'
import ClientRow from './ClientRow'

type Props = {
  clients: Client[]
}

export default function ClientsTable({ clients }: Props) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone?.includes(searchQuery)
  )

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Search Bar */}
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search clients by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm outline-none placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {filteredClients.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Added
                </th>
                <th className="px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-6 py-16 text-center">
          <p className="text-sm text-slate-400">
            {searchQuery ? 'No clients found matching your search.' : 'No clients yet.'}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50">
        <p className="text-xs text-slate-500">
          Showing {filteredClients.length} of {clients.length} client{clients.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}