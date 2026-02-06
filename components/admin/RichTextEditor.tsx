'use client'

import { useEffect, useState, useRef } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: number
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start writing...',
  minHeight = 300,
}: RichTextEditorProps) {
  const editorRef = useRef<any>(null)
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [Editor, setEditor] = useState<any>(null)
  const [CKEditor, setCKEditor] = useState<any>(null)

  useEffect(() => {
    // Dynamically import CKEditor to avoid SSR issues
    const loadEditor = async () => {
      try {
        const ckeditorReact = await import('@ckeditor/ckeditor5-react')
        const ClassicEditor = (await import('@ckeditor/ckeditor5-build-classic')).default
        
        setCKEditor(() => ckeditorReact.CKEditor)
        setEditor(() => ClassicEditor)
        setEditorLoaded(true)
      } catch (error) {
        console.error('Error loading CKEditor:', error)
      }
    }

    loadEditor()
  }, [])

  if (!editorLoaded || !Editor || !CKEditor) {
    return (
      <div 
        className="border border-slate-300 rounded-lg bg-slate-50 animate-pulse"
        style={{ minHeight: `${minHeight}px` }}
      >
        <div className="h-10 bg-slate-200 rounded-t-lg" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
        </div>
      </div>
    )
  }

  return (
    <div className="ckeditor-wrapper">
      <style jsx global>{`
        .ckeditor-wrapper .ck-editor__editable {
          min-height: ${minHeight}px;
        }
        .ckeditor-wrapper .ck-editor__editable:focus {
          border-color: #f59e0b !important;
          box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2) !important;
        }
        .ckeditor-wrapper .ck.ck-editor {
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .ckeditor-wrapper .ck.ck-toolbar {
          background: #f8fafc !important;
          border-color: #e2e8f0 !important;
        }
        .ckeditor-wrapper .ck.ck-editor__main > .ck-editor__editable {
          background: white;
          border-color: #e2e8f0 !important;
        }
        .ckeditor-wrapper .ck.ck-button:not(.ck-disabled):hover,
        .ckeditor-wrapper .ck.ck-button.ck-on {
          background: #fef3c7 !important;
        }
        .ckeditor-wrapper .ck.ck-button.ck-on {
          color: #d97706 !important;
        }
        /* Source editing mode styling */
        .ckeditor-wrapper .ck-source-editing-area textarea {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 13px;
          line-height: 1.5;
          background: #1e293b !important;
          color: #e2e8f0 !important;
          border: none !important;
        }

        .ckeditor-wrapper * {
            margin: revert;
            padding: revert;
            list-style: revert;
            font-family: revert;
            font-size: revert;
            line-height: revert;
            color: black;
            background: revert;
            border: revert;
            font-weight: revert;
            font-style: revert;
        }

        .ckeditor-wrapper a {
            color: #0074BD;
        }

        .ckeditor-wrapper a:hover {
            cursor: pointer;
            text-decoration: underline;
        }
      `}</style>
      <CKEditor
        editor={Editor}
        data={value}
        config={{
          placeholder: placeholder,
          toolbar: {
            items: [
              'undo', 'redo',
              '|',
              'heading',
              '|',
              'bold', 'italic', 'underline', 'strikethrough',
              '|',
              'fontSize', 'fontColor', 'fontBackgroundColor',
              '|',
              'link', 'insertImage', 'insertTable', 'mediaEmbed',
              '|',
              'alignment',
              '|',
              'bulletedList', 'numberedList',
              '|',
              'outdent', 'indent',
              '|',
              'blockQuote', 'horizontalLine',
              '|',
              'removeFormat',
              '|',
              'sourceEditing',
            ],
            shouldNotGroupWhenFull: true,
          },
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
              { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            ],
          },
          fontSize: {
            options: ['tiny', 'small', 'default', 'big', 'huge'],
            supportAllValues: true,
          },
          image: {
            toolbar: [
              'imageTextAlternative',
              'toggleImageCaption',
              '|',
              'imageStyle:inline',
              'imageStyle:block',
              'imageStyle:side',
              '|',
              'resizeImage',
            ],
            insert: {
              type: 'auto',
            },
          },
          table: {
            contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells',
              'tableProperties',
              'tableCellProperties',
            ],
          },
          link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
          },
        }}
        onChange={(_event: any, editor: any) => {
          const data = editor.getData()
          onChange(data)
        }}
        onReady={(editor: any) => {
          editorRef.current = editor
        }}
      />
    </div>
  )
}
