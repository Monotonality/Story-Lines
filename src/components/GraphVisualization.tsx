import { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'

const GraphVisualization = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cyRef = useRef<cytoscape.Core | null>(null)
  const [selectedNode, setSelectedNode] = useState<any>(null)
  const [layoutType, setLayoutType] = useState<'cose' | 'circle' | 'grid'>('cose')

  // Sample graph data
  const graphData = {
    nodes: [
      // Documents
      { id: 'chapter1', label: 'Chapter 1', type: 'document', size: 40, color: '#3b82f6' },
      { id: 'chapter2', label: 'Chapter 2', type: 'document', size: 35, color: '#3b82f6' },
      { id: 'worldbuilding', label: 'World Building', type: 'document', size: 30, color: '#3b82f6' },
      
      // Characters
      { id: 'sarah', label: 'Sarah Johnson', type: 'character', size: 35, color: '#8b5cf6' },
      { id: 'stranger', label: 'The Stranger', type: 'character', size: 30, color: '#8b5cf6' },
      { id: 'mentor', label: 'The Mentor', type: 'character', size: 25, color: '#8b5cf6' },
      
      // Locations
      { id: 'coffeeshop', label: 'Coffee Shop', type: 'location', size: 28, color: '#10b981' },
      { id: 'hiddenworld', label: 'Hidden World', type: 'location', size: 32, color: '#10b981' },
      { id: 'academy', label: 'Magic Academy', type: 'location', size: 30, color: '#10b981' },
      
      // Concepts
      { id: 'magic', label: 'Magic System', type: 'concept', size: 25, color: '#f59e0b' },
      { id: 'prophecy', label: 'Ancient Prophecy', type: 'concept', size: 22, color: '#f59e0b' },
    ],
    edges: [
      // Document connections
      { source: 'chapter1', target: 'chapter2', relationship: 'follows' },
      { source: 'chapter1', target: 'worldbuilding', relationship: 'references' },
      { source: 'chapter2', target: 'worldbuilding', relationship: 'references' },
      
      // Character relationships
      { source: 'sarah', target: 'stranger', relationship: 'meets' },
      { source: 'sarah', target: 'mentor', relationship: 'trained_by' },
      { source: 'stranger', target: 'mentor', relationship: 'knows' },
      
      // Character-location connections
      { source: 'sarah', target: 'coffeeshop', relationship: 'visits' },
      { source: 'stranger', target: 'coffeeshop', relationship: 'appears_at' },
      { source: 'sarah', target: 'hiddenworld', relationship: 'discovers' },
      { source: 'sarah', target: 'academy', relationship: 'studies_at' },
      
      // Document-character connections
      { source: 'chapter1', target: 'sarah', relationship: 'features' },
      { source: 'chapter1', target: 'stranger', relationship: 'introduces' },
      { source: 'chapter2', target: 'sarah', relationship: 'features' },
      { source: 'chapter2', target: 'mentor', relationship: 'introduces' },
      
      // Concept connections
      { source: 'magic', target: 'sarah', relationship: 'affects' },
      { source: 'magic', target: 'hiddenworld', relationship: 'governs' },
      { source: 'prophecy', target: 'sarah', relationship: 'about' },
      { source: 'prophecy', target: 'stranger', relationship: 'known_by' },
    ]
  }

  useEffect(() => {
    if (containerRef.current && !cyRef.current) {
      cyRef.current = cytoscape({
        container: containerRef.current,
        elements: [
          // Nodes
          ...graphData.nodes.map(node => ({
            data: {
              id: node.id,
              label: node.label,
              type: node.type,
              size: node.size,
              color: node.color
            }
          })),
          // Edges
          ...graphData.edges.map((edge, index) => ({
            data: {
              id: `edge-${index}`,
              source: edge.source,
              target: edge.target,
              relationship: edge.relationship
            }
          }))
        ],
        style: [
          {
            selector: 'node',
            style: {
              'background-color': 'data(color)',
              'border-color': '#45475a',
              'border-width': 2,
              'label': 'data(label)',
              'color': '#e5e7eb',
              'text-valign': 'center',
              'text-halign': 'center',
              'font-size': '12px',
              'font-family': 'Inter, system-ui, sans-serif',
              'font-weight': '500',
              'text-outline-width': 2,
              'text-outline-color': '#1e1e2e',
              'width': 'data(size)',
              'height': 'data(size)',
              'overlay-opacity': 0,
            }
          },
          {
            selector: 'node[type="document"]',
            style: {
              'shape': 'round-rectangle',
            }
          },
          {
            selector: 'node[type="character"]',
            style: {
              'shape': 'ellipse',
            }
          },
          {
            selector: 'node[type="location"]',
            style: {
              'shape': 'diamond',
            }
          },
          {
            selector: 'node[type="concept"]',
            style: {
              'shape': 'triangle',
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 2,
              'line-color': '#45475a',
              'target-arrow-color': '#45475a',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
              'arrow-scale': 1,
              'opacity': 0.8,
            }
          },
          {
            selector: 'node:hover',
            style: {
              'border-width': 3,
              'border-color': '#8b5cf6',
              'overlay-opacity': 0.1,
              'overlay-color': '#8b5cf6',
            }
          },
          {
            selector: 'edge:hover',
            style: {
              'width': 3,
              'line-color': '#8b5cf6',
              'target-arrow-color': '#8b5cf6',
              'opacity': 1,
            }
          },
          {
            selector: 'node:selected',
            style: {
              'border-width': 4,
              'border-color': '#f59e0b',
              'overlay-opacity': 0.2,
              'overlay-color': '#f59e0b',
            }
          }
        ],
        layout: {
          name: layoutType,
          fit: true,
          padding: 30,
        }
      })

      // Event listeners
      cyRef.current.on('tap', 'node', (event) => {
        const node = event.target
        const connectedEdges = node.connectedEdges()
        setSelectedNode({
          id: node.id(),
          label: node.data('label'),
          type: node.data('type'),
          connections: connectedEdges.length,
          neighbors: connectedEdges.connectedNodes().map((n: any) => n.data('label')).join(', ')
        })
      })

      cyRef.current.on('tap', (event) => {
        if (event.target === cyRef.current) {
          setSelectedNode(null)
        }
      })
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy()
        cyRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.layout({
        name: layoutType,
        fit: true,
        padding: 30,
        randomize: layoutType === 'cose',
      }).run()
    }
  }, [layoutType])

  const resetView = () => {
    if (cyRef.current) {
      cyRef.current.fit()
      cyRef.current.center()
    }
  }

  const exportImage = () => {
    if (cyRef.current) {
      const png = cyRef.current.png({ scale: 2 })
      const link = document.createElement('a')
      link.href = png
      link.download = 'story-graph.png'
      link.click()
    }
  }

  return (
    <div className="h-full flex">
      {/* Graph Container */}
      <div className="flex-1 relative">
        <div 
          ref={containerRef} 
          className="graph-container w-full h-full"
          style={{ minHeight: '400px' }}
        />
        
        {/* Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <select
            value={layoutType}
            onChange={(e) => setLayoutType(e.target.value as 'cose' | 'circle' | 'grid')}
            className="input text-xs py-1 px-2"
          >
            <option value="cose">Force Layout</option>
            <option value="circle">Circle Layout</option>
            <option value="grid">Grid Layout</option>
          </select>
          
          <button
            onClick={resetView}
            className="btn-secondary text-xs px-3 py-2"
            title="Reset View"
          >
            🎯 Reset
          </button>
          
          <button
            onClick={exportImage}
            className="btn-secondary text-xs px-3 py-2"
            title="Export as Image"
          >
            📷 Export
          </button>
        </div>
      </div>

      {/* Info Panel */}
      <div className="w-80 bg-obsidian-bg-secondary border-l border-obsidian-border p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold text-obsidian-text-primary mb-4">
          Graph Details
        </h3>
        
        {selectedNode ? (
          <div className="space-y-4">
            <div className="bg-obsidian-bg-tertiary rounded-lg p-4">
              <h4 className="text-md font-medium text-obsidian-text-primary mb-2">
                {selectedNode.label}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-obsidian-text-secondary">Type:</span>
                  <span className="text-obsidian-text-primary capitalize">{selectedNode.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-obsidian-text-secondary">Connections:</span>
                  <span className="text-obsidian-text-primary">{selectedNode.connections}</span>
                </div>
              </div>
            </div>

            {selectedNode.neighbors && (
              <div>
                <h5 className="text-sm font-medium text-obsidian-text-primary mb-2">
                  Connected to:
                </h5>
                <p className="text-sm text-obsidian-text-secondary">
                  {selectedNode.neighbors}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-obsidian-text-muted">
            <p className="mb-4">Click on a node to see details.</p>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-obsidian-text-primary">Legend:</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-2 bg-blue-500 rounded-sm"></div>
                  <span>Documents</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Characters</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 transform rotate-45"></div>
                  <span>Locations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 border-transparent border-b-yellow-500"></div>
                  <span>Concepts</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-obsidian-border">
          <h4 className="text-sm font-medium text-obsidian-text-primary mb-2">
            Graph Statistics
          </h4>
          <div className="space-y-1 text-xs text-obsidian-text-secondary">
            <div className="flex justify-between">
              <span>Total Nodes:</span>
              <span>{graphData.nodes.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Edges:</span>
              <span>{graphData.edges.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Documents:</span>
              <span>{graphData.nodes.filter(n => n.type === 'document').length}</span>
            </div>
            <div className="flex justify-between">
              <span>Characters:</span>
              <span>{graphData.nodes.filter(n => n.type === 'character').length}</span>
            </div>
            <div className="flex justify-between">
              <span>Locations:</span>
              <span>{graphData.nodes.filter(n => n.type === 'location').length}</span>
            </div>
            <div className="flex justify-between">
              <span>Concepts:</span>
              <span>{graphData.nodes.filter(n => n.type === 'concept').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GraphVisualization