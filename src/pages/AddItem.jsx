// src/pages/AddItem.jsx
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveItem } from '../utils/storage'

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function AddItem() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('available')
  const [frontPreview, setFrontPreview] = useState('')
  const [backPreview, setBackPreview] = useState('')
  const [frontFile, setFrontFile] = useState(null)
  const [backFile, setBackFile] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const frontRef = useRef(null)
  const backRef = useRef(null)

  const resetForm = () => {
    setName('')
    setCategory('')
    setStatus('available')
    setFrontPreview('')
    setBackPreview('')
    setFrontFile(null)
    setBackFile(null)
    if (frontRef.current) frontRef.current.value = ''
    if (backRef.current) backRef.current.value = ''
  }

  const handleFrontChange = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFrontFile(f)
    try {
      const data = await fileToDataUrl(f)
      setFrontPreview(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleBackChange = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setBackFile(f)
    try {
      const data = await fileToDataUrl(f)
      setBackPreview(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleUseCameraFront = () => {
    if (frontRef.current) {
      frontRef.current.setAttribute('capture', 'environment')
      frontRef.current.click()
    }
  }

  const handleUseCameraBack = () => {
    if (backRef.current) {
      backRef.current.setAttribute('capture', 'environment')
      backRef.current.click()
    }
  }

  const handleCancel = () => navigate('/home')

  const handleSave = async (e) => {
    e.preventDefault()
    if (!name.trim()) return alert('Please enter a name.')
    if (!category) return alert('Please select a category.')
    if (!frontPreview) return alert('Please add a front photo (required).')

    setIsSaving(true)

    // Ensure front/back are data URLs
    let frontData = frontPreview
    let backData = backPreview
    if (frontFile && !frontPreview) frontData = await fileToDataUrl(frontFile)
    if (backFile && !backPreview) backData = await fileToDataUrl(backFile)

    const id = 'local-' + Date.now() + '-' + Math.random().toString(36).slice(2,9)
    const item = {
      id,
      name: name.trim(),
      category,
      status,
      frontPreview: frontData || '',
      backPreview: backData || '',
      createdAt: new Date().toISOString(),
      uploadedToServer: false,
    }

    saveItem(item)

    setTimeout(() => {
      setIsSaving(false)
      resetForm()
      navigate('/home', { state: { clearSelection: true } })
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-lavender/20 via-pastel-pink/20 to-pastel-peach/20 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleCancel} className="btn-secondary inline-flex items-center gap-2">
            ← Back
          </button>
          <h1 className="text-2xl font-light text-gray-700">Add New Item</h1>
          <div />
        </div>

        <form onSubmit={handleSave} className="glass-card p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Item Name *</label>
            <input value={name} onChange={e => setName(e.target.value)} className="input-field" placeholder="Blue Denim Jacket" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Category *</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="input-field">
                <option value="">Select category</option>
                <option value="top">Top / Shirt</option>
                <option value="bottom">Bottom / Pants / Skirt</option>
                <option value="dress">Dress</option>
                <option value="accessory">Accessory</option>
                <option value="footwear">Shoes / Footwear</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className="input-field">
                <option value="available">Available</option>
                <option value="in-wash">In Wash</option>
                <option value="ironed">Ironed</option>
                <option value="damaged">Damaged</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Front View *</label>
              <div className="border rounded-xl p-4 text-center">
                {frontPreview ? (
                  <img src={frontPreview} className="mx-auto w-48 h-48 object-cover rounded-md" alt="front" />
                ) : (
                  <div className="h-48 flex items-center justify-center text-gray-400">No front photo</div>
                )}
                <div className="mt-4 flex items-center justify-center gap-3">
                  <input ref={frontRef} type="file" accept="image/*" onChange={handleFrontChange} className="hidden" />
                  <button type="button" onClick={() => frontRef.current && frontRef.current.click()} className="btn-primary px-4 py-2">Choose Photo</button>
                  <button type="button" onClick={handleUseCameraFront} className="btn-secondary px-4 py-2">Use Camera</button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Back View (optional)</label>
              <div className="border rounded-xl p-4 text-center">
                {backPreview ? (
                  <img src={backPreview} className="mx-auto w-48 h-48 object-cover rounded-md" alt="back" />
                ) : (
                  <div className="h-48 flex items-center justify-center text-gray-400">No back photo</div>
                )}
                <div className="mt-4 flex items-center justify-center gap-3">
                  <input ref={backRef} type="file" accept="image/*" onChange={handleBackChange} className="hidden" />
                  <button type="button" onClick={() => backRef.current && backRef.current.click()} className="btn-primary px-4 py-2">Choose Photo</button>
                  <button type="button" onClick={handleUseCameraBack} className="btn-secondary px-4 py-2">Use Camera</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button type="button" onClick={handleCancel} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary px-6 py-3" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Add to Wardrobe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
