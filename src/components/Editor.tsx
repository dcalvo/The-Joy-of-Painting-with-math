import React, { useState } from "react"

type MultilineInputProps = {
  value: string
  onEdit: (newValue: string) => void
}

function MultilineInput({ value, onEdit: handleEdit }: MultilineInputProps) {
  return (
    <textarea
      className="flex-1 border rounded p-2 w-full h-full whitespace-nowrap"
      value={value}
      onChange={(e) => handleEdit(e.target.value)}
    />
  )
}

type EditorProps = {
  defaultSource: string
  onCompile: (source: string) => void
}

function Editor({ defaultSource, onCompile: handleCompile }: EditorProps) {
  const [input, setInput] = useState(defaultSource.trim())

  return (
    <div className="h-full flex flex-col justify-end">
      <div id="text-editor" className="flex-1 flex flex-col">
        <MultilineInput value={input} onEdit={setInput} />
        <div id="toolbar" className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-0 px-1"
            onClick={() => handleCompile(input)}
          >
            Run
          </button>
        </div>
      </div>
      <div id="ui-controls">
        <ol>
          <li>test</li>
          <li>test</li>
          <li>test</li>
          <li>test</li>
          <li>test</li>
          <li>test</li>
          <li>test</li>
        </ol>
      </div>
    </div>
  )
}

export default Editor
