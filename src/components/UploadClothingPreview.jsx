// src/components/UploadClothingPreview.jsx
import { useEffect, useState } from 'react'

export default function UploadClothingPreview({ file, onRemove }) {
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    // if file is a File object, createObjectURL; if it's already a URL string then use it directly
    if (typeof file === 'string') {
      setPreview(file)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => {
      try { URL.revokeObjectURL(url) } catch {}
    }
  }, [file])

  if (!file) return null

  return (
    <div className="relative group">
      <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/40 bg-white/40">
        <img src={preview} alt="preview" className="w-full h-full object-cover" />
      </div>
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-white/90 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow"
        title="Remove"
      >
        ✕
      </button>
    </div>
  )
}
