'use client'

import { SearchHistoryItem } from '@/lib/types'
import { BookOpenText, Clock3, Sparkles, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchHistoryPanelProps {
  history: SearchHistoryItem[]
  loading: boolean
  onDeleteOne: (id: number) => void
  onClearAll: () => void
  className?: string
}

export default function SearchHistoryPanel({
  history,
  loading,
  onDeleteOne,
  onClearAll,
  className,
}: SearchHistoryPanelProps) {
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  return (
    <section className={cn('w-full', className)}>
      <div className="overflow-hidden rounded-3xl border border-primary-100/70 bg-white/90 shadow-[0_18px_50px_-28px_rgba(79,70,229,0.45)] backdrop-blur-sm">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-[1px]">
          <div className="bg-white/95 px-4 py-4 sm:px-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1">
                  <Sparkles className="h-3.5 w-3.5 text-primary-600" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary-700">Quick Access</span>
                </div>
                <h3 className="mt-2 text-base font-semibold text-gray-900 sm:text-lg">Recent Searches</h3>
                <p className="text-xs text-gray-500 sm:text-sm">Your latest prompts, filters, and result counts.</p>
              </div>

              <button
                onClick={onClearAll}
                disabled={loading || history.length === 0}
                className="shrink-0 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          {history.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-4 py-6 text-center">
              <BookOpenText className="mx-auto mb-2 h-5 w-5 text-gray-400" />
              <p className="text-sm text-gray-600">No searches yet. Your activity appears here once you search.</p>
            </div>
          ) : (
            <div className="history-scroll space-y-2.5 max-h-[24rem] overflow-y-auto pr-1">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-200 hover:border-primary-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <Clock3 className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs font-medium text-gray-500">{formatDate(item.createdAt)}</span>
                      </div>
                      <p className="truncate text-sm font-semibold text-gray-900">{item.query || '(empty query)'}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-medium text-primary-700">
                          {item.category || 'All'}
                        </span>
                        <span className="rounded-full bg-secondary-50 px-2 py-0.5 text-[11px] font-medium text-secondary-700">
                          {item.tone || 'All'}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700">
                          {item.resultsCount} results
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteOne(item.id)}
                      disabled={loading}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Delete history item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

