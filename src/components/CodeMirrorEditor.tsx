import { useRef, useEffect, useState } from 'react'
import { EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { basicSetup } from 'codemirror'

const CodeMirrorEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const [content, setContent] = useState(`# Chapter 1: The Beginning

The hero's journey starts in the most unexpected place - a quiet coffee shop on the corner of **Maple Street**. Sarah had always been an *ordinary* person, or so she thought.

## The Discovery

As she sipped her morning latte, something extraordinary happened:

1. The newspaper headlines began to shift and change
2. The other customers seemed frozen in time
3. A mysterious figure approached her table

> "You've been chosen," the stranger whispered, "and there's no going back."

### The Choice

Sarah had two options:
- Follow the stranger into the unknown
- Pretend nothing happened and continue her normal life

But deep down, she knew that normal was no longer an option.

\`\`\`javascript
// The magic began with a simple line of code
const destiny = await chooseYourPath();
\`\`\`

---

*What would you choose?*

[Continue to Chapter 2 →](#chapter-2)
`)

  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const state = EditorState.create({
        doc: content,
        extensions: [
          basicSetup,
          markdown(),
          oneDark,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              setContent(update.state.doc.toString())
            }
          }),
          EditorView.theme({
            '&': {
              height: '100%',
              fontSize: '14px',
            },
            '.cm-content': {
              padding: '20px',
              minHeight: '100%',
            },
            '.cm-focused': {
              outline: 'none',
            },
            '.cm-editor': {
              borderRadius: '8px',
            },
            '.cm-scroller': {
              fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
              lineHeight: '1.6',
            },
            '.cm-gutters': {
              backgroundColor: '#1e1e2e',
              borderRight: '1px solid #45475a',
            },
            '.cm-activeLineGutter': {
              backgroundColor: '#25273a',
            },
          }),
        ],
      })

      viewRef.current = new EditorView({
        state,
        parent: editorRef.current,
      })
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy()
        viewRef.current = null
      }
    }
  }, [])

  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length
  const charCount = content.length

  return (
    <div className="h-full flex flex-col">
      {/* Editor Stats */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-obsidian-border">
        <div className="flex items-center space-x-6 text-sm text-obsidian-text-secondary">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{wordCount} words</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m0 0v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4m0 0h10" />
            </svg>
            <span>{charCount} characters</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="btn-secondary text-xs px-3 py-1">
            📊 Stats
          </button>
          <button className="btn-secondary text-xs px-3 py-1">
            🔍 Find
          </button>
          <button className="btn-secondary text-xs px-3 py-1">
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex-1 editor-container">
        <div 
          ref={editorRef} 
          className="h-full"
        />
      </div>
    </div>
  )
}

export default CodeMirrorEditor