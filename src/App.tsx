import { useState } from 'react'
import CodeMirrorEditor from './components/CodeMirrorEditor'
import SearchComponent from './components/SearchComponent'
import GraphVisualization from './components/GraphVisualization'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'search' | 'graph'>('editor')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-obsidian-bg-primary flex">
      {/* Sidebar */}
      <aside className={`sidebar transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="sidebar-header">
          <div className="flex items-center justify-between">
            <h1 className={`text-xl font-bold text-obsidian-text-primary ${sidebarCollapsed ? 'hidden' : 'block'}`}>
              Story Line
            </h1>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-md hover:bg-obsidian-bg-hover transition-colors"
            >
              <svg className="w-5 h-5 text-obsidian-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
              </svg>
            </button>
          </div>
        </div>

        {!sidebarCollapsed && (
          <div className="p-4 space-y-2">
            <div className="text-xs uppercase text-obsidian-text-muted font-semibold mb-3">
              Files
            </div>
            <div className="file-item">
              <span className="text-lg">📄</span>
              <span>Welcome.md</span>
            </div>
            <div className="file-item active">
              <span className="text-lg">📄</span>
              <span>Chapter 1.md</span>
            </div>
            <div className="file-item">
              <span className="text-lg">📄</span>
              <span>Characters.md</span>
            </div>
            <div className="file-item">
              <span className="text-lg">📁</span>
              <span>Research</span>
            </div>
            <div className="file-item">
              <span className="text-lg">📁</span>
              <span>World Building</span>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-obsidian-bg-secondary border-b border-obsidian-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('editor')}
                className={`nav-item ${activeTab === 'editor' ? 'active' : ''}`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editor
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
              <button
                onClick={() => setActiveTab('graph')}
                className={`nav-item ${activeTab === 'graph' ? 'active' : ''}`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Graph
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="btn-secondary text-sm">
                💾 Save
              </button>
              <button className="btn-primary text-sm">
                ▶️ Preview
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-hidden">
          {activeTab === 'editor' && (
            <div className="h-full">
              <div className="card h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-obsidian-text-primary">
                    Chapter 1.md
                  </h2>
                  <div className="text-sm text-obsidian-text-secondary">
                    Last edited: 2 minutes ago
                  </div>
                </div>
                <CodeMirrorEditor />
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="h-full">
              <div className="card h-full">
                <h2 className="text-xl font-semibold text-obsidian-text-primary mb-4">
                  Search & Filter
                </h2>
                <SearchComponent />
              </div>
            </div>
          )}

          {activeTab === 'graph' && (
            <div className="h-full">
              <div className="card h-full">
                <h2 className="text-xl font-semibold text-obsidian-text-primary mb-4">
                  Story Graph
                </h2>
                <GraphVisualization />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App