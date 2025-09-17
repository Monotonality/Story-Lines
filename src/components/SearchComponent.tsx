import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'

interface Document {
  id: string
  title: string
  content: string
  tags: string[]
  lastModified: string
  type: 'document' | 'character' | 'location' | 'note'
}

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'documents' | 'characters' | 'locations'>('all')

  // Sample data
  const documents: Document[] = [
    {
      id: '1',
      title: 'Chapter 1: The Beginning',
      content: 'The hero\'s journey starts in the most unexpected place - a quiet coffee shop on the corner of Maple Street. Sarah had always been an ordinary person, or so she thought.',
      tags: ['chapter', 'beginning', 'sarah', 'coffee-shop'],
      lastModified: '2 minutes ago',
      type: 'document'
    },
    {
      id: '2',
      title: 'Sarah Johnson',
      content: 'Protagonist of our story. Age 28, works as a graphic designer. Has a mysterious past that she\'s unaware of.',
      tags: ['character', 'protagonist', 'main'],
      lastModified: '1 hour ago',
      type: 'character'
    },
    {
      id: '3',
      title: 'The Stranger',
      content: 'Mysterious figure who approaches Sarah in the coffee shop. Wears a dark coat and seems to know more than they let on.',
      tags: ['character', 'mysterious', 'antagonist'],
      lastModified: '1 hour ago',
      type: 'character'
    },
    {
      id: '4',
      title: 'Maple Street Coffee Shop',
      content: 'A cozy coffee shop where the story begins. Has vintage decorations and serves the best latte in town.',
      tags: ['location', 'coffee-shop', 'beginning'],
      lastModified: '3 hours ago',
      type: 'location'
    },
    {
      id: '5',
      title: 'World Building Notes',
      content: 'The story takes place in a world where certain people have hidden abilities. Magic exists but is kept secret from the general population.',
      tags: ['worldbuilding', 'magic', 'abilities'],
      lastModified: '1 day ago',
      type: 'note'
    }
  ]

  // Configure Fuse.js
  const fuse = useMemo(() => {
    const options = {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'content', weight: 0.3 },
        { name: 'tags', weight: 0.3 }
      ],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true,
    }
    return new Fuse(documents, options)
  }, [])

  // Filter and search
  const filteredResults = useMemo(() => {
    let results = documents

    // Apply type filter
    if (selectedFilter !== 'all') {
      const typeMap = {
        'documents': 'document',
        'characters': 'character',
        'locations': 'location'
      }
      results = documents.filter(doc => doc.type === typeMap[selectedFilter as keyof typeof typeMap])
    }

    // Apply search
    if (!searchTerm.trim()) {
      return results.map(doc => ({ item: doc, score: 0, matches: [] }))
    }

    const searchResults = fuse.search(searchTerm)
    return searchResults.filter(result => {
      if (selectedFilter === 'all') return true
      const typeMap = {
        'documents': 'document',
        'characters': 'character',
        'locations': 'location'
      }
      return result.item.type === typeMap[selectedFilter as keyof typeof typeMap]
    })
  }, [searchTerm, selectedFilter, fuse])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return '📄'
      case 'character': return '👤'
      case 'location': return '📍'
      case 'note': return '📝'
      default: return '📄'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'text-obsidian-blue'
      case 'character': return 'text-obsidian-purple'
      case 'location': return 'text-obsidian-green'
      case 'note': return 'text-obsidian-yellow'
      default: return 'text-obsidian-text-secondary'
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-obsidian-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search documents, characters, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(['all', 'documents', 'characters', 'locations'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
              selectedFilter === filter
                ? 'bg-obsidian-purple text-white'
                : 'bg-obsidian-bg-hover text-obsidian-text-secondary hover:bg-obsidian-bg-tertiary hover:text-obsidian-text-primary'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredResults.length > 0 ? (
          <>
            <div className="text-sm text-obsidian-text-muted mb-4">
              {searchTerm 
                ? `${filteredResults.length} result${filteredResults.length === 1 ? '' : 's'} for "${searchTerm}"`
                : `${filteredResults.length} item${filteredResults.length === 1 ? '' : 's'}`
              }
            </div>

            {filteredResults.map(({ item, score }) => (
              <div
                key={item.id}
                className="bg-obsidian-bg-secondary border border-obsidian-border rounded-lg p-4 hover:bg-obsidian-bg-hover transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{getTypeIcon(item.type)}</span>
                    <div>
                      <h3 className="text-lg font-medium text-obsidian-text-primary group-hover:text-obsidian-purple-light transition-colors">
                        {item.title}
                      </h3>
                      <span className={`text-xs uppercase font-semibold ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                  {score > 0 && (
                    <span className="text-xs text-obsidian-text-muted bg-obsidian-bg-tertiary px-2 py-1 rounded-full">
                      {Math.round((1 - score) * 100)}% match
                    </span>
                  )}
                </div>

                <p className="text-obsidian-text-secondary text-sm mb-3 line-clamp-2">
                  {item.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-obsidian-purple bg-opacity-20 text-obsidian-purple-light rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-obsidian-bg-tertiary text-obsidian-text-muted rounded-full">
                        +{item.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-obsidian-text-muted">
                    {item.lastModified}
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-obsidian-text-muted">
            <svg className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.084-2.334"/>
            </svg>
            <p className="text-lg mb-2">No results found</p>
            <p className="text-sm">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchComponent