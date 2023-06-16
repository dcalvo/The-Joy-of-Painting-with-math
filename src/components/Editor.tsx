import React, { useState } from "react"

function MultilineInput({ defaultValue = "", className }: { defaultValue?: string; className?: string }) {
  const [value, setValue] = useState(defaultValue.trim())

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return (
    <textarea
      className={`${className} border rounded p-2 w-full h-full whitespace-nowrap`}
      value={value}
      onChange={handleChange}
    />
  )
}

function Editor({ source }: { source: string }) {
  return (
    <div className="h-full flex flex-col justify-end">
      <div id="text-editor" className="flex-1 flex flex-col">
        <MultilineInput defaultValue={source} className="flex-1" />
        <div id="toolbar" className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-0 px-1">
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
