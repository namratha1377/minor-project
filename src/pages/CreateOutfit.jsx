// src/pages/CreateOutfit.jsx
import { useEffect, useState } from 'react'
import { loadItems, saveOutfit, removeItem } from '../utils/storage'
import { useNavigate } from 'react-router-dom'

export default function CreateOutfit() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(new Set())
  const [showPreview, setShowPreview] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setItems(loadItems())
  }, [])

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleDelete = (id) => {
    if (!confirm('Delete this item?')) return
    removeItem(id)
    setItems(loadItems())
    setSelected(prev => {
      const p = new Set(prev)
      p.delete(id)
      return p
    })
  }

  const handlePreview = () => {
    if (selected.size === 0) return alert('Select items to preview.')
    setShowPreview(true)
  }

  const validateAndSave = () => {
    // Must select at least 1 Top AND (1 Bottom OR 1 Dress), at least 1 Accessory, at least 1 Footwear
    const selIds = Array.from(selected)
    const selItems = items.filter(i => selIds.includes(i.id))

    const hasTop = selItems.some(i => (i.category || '').toLowerCase() === 'top')
    const hasBottom = selItems.some(i => (i.category || '').toLowerCase() === 'bottom')
    const hasDress = selItems.some(i => (i.category || '').toLowerCase() === 'dress')
    const hasAccessory = selItems.some(i => (i.category || '').toLowerCase() === 'accessory')
    const hasFootwear = selItems.some(i => (i.category || '').toLowerCase() === 'footwear')

    const missing = []
    if (!hasTop) missing.push('1 Top')
    if (!(hasBottom || hasDress)) missing.push('1 Bottom or 1 Dress')
    if (!hasAccessory) missing.push('1 Accessory')
    if (!hasFootwear) missing.push('1 Shoes/Footwear')

    if (missing.length) {
      alert('Please add: ' + missing.join(', '))
      return
    }

    // Save outfit
    const outfit = {
      id: 'outfit-' + Date.now() + '-' + Math.random().toString(36).slice(2,9),
      createdAt: new Date().toISOString(),
      items: selItems,
    }
    saveOutfit(outfit)
    setSelected(new Set())
    alert('Outfit saved locally to My Outfits.')
    navigate('/my-outfits')
  }

  const back = () => navigate('/home')

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-lavender/20 via-pastel-pink/20 to-pastel-peach/20 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={back} className="btn-secondary">Back</button>
          <h1 className="text-2xl font-light text-gray-700">Create Outfit — Select Items</h1>
          <div />
        </div>

        <div className="glass-card p-6 mb-6">
          <p className="text-sm text-gray-600">Select items for your outfit.</p>
          <div className="mt-4 flex gap-3 justify-end">
            <button onClick={handlePreview} className="btn-primary">Preview Selected ({selected.size})</button>
            <button onClick={validateAndSave} className="btn-secondary">Create Outfit</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(it => {
            const isSel = selected.has(it.id)
            return (
              <div key={it.id} className={`card p-3 relative ${isSel ? 'ring-4 ring-primary-100' : ''}`}>
                <div className="absolute top-3 left-3">
                  <label className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${isSel ? 'bg-primary-200 text-white' : 'bg-white/90 text-gray-600'}`}>
                    <input type="checkbox" checked={isSel} onChange={() => toggle(it.id)} className="sr-only" />
                    <span className="text-sm">{isSel ? '✓' : ''}</span>
                  </label>
                </div>

                <div className="h-56 w-full mb-3 overflow-hidden rounded-xl bg-white/40 border">
                  <img src={it.frontPreview || it.url} alt={it.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-700">{it.name}</p>
                    <p className="text-xs text-gray-500">Category: {it.category || 'Unspecified'}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => handleDelete(it.id)} className="btn-secondary text-xs px-3 py-1">Delete</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-4xl w-full relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Preview Selected Items</h3>
              <button onClick={() => setShowPreview(false)} className="btn-secondary">Close</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {items.filter(i => selected.has(i.id)).map(it => {
                const checked = selected.has(it.id)
                return (
                  <div key={it.id} className="rounded-xl overflow-hidden border relative p-2 bg-white/80">
                    <div className="absolute top-2 left-2 z-10">
                      <label className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${checked ? 'bg-primary-300 text-white' : 'bg-white/80 text-gray-600'}`}>
                        <input type="checkbox" checked={checked} onChange={() => toggle(it.id)} className="sr-only" />
                        <span className="text-sm">{checked ? '✓' : ''}</span>
                      </label>
                    </div>

                    <img src={it.frontPreview || it.url} alt={it.name} className="w-full h-40 object-cover rounded-lg" />
                    <div className="pt-2">
                      <p className="text-sm font-medium text-gray-700 truncate">{it.name}</p>
                      <p className="text-xs text-gray-500">{it.category || 'Unspecified'}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowPreview(false)} className="btn-secondary">Close</button>
              <button onClick={validateAndSave} className="btn-primary">Create Outfit (Save)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
