// src/pages/Home.jsx
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loadItems, removeItem, saveItems } from '../utils/storage'

export default function Home({ onLogout }) {
  const [clothes, setClothes] = useState(() => loadItems())
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onFocus = () => setClothes(loadItems())
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [])

  useEffect(() => {
    if (location.state && location.state.clearSelection) {
      // simple trigger to refresh after returning from add page
      setClothes(loadItems())
      navigate(location.pathname, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  async function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader()
      r.onload = () => resolve(r.result)
      r.onerror = reject
      r.readAsDataURL(file)
    })
  }

  const handleQuickUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    setIsUploading(true)
    const newItems = []
    for (const file of files) {
      try {
        const data = await fileToDataUrl(file)
        newItems.push({
          id: 'local-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9),
          name: file.name,
          frontPreview: data,
          backPreview: '',
          category: '',
          status: '',
          createdAt: new Date().toISOString(),
          uploadedToServer: false,
        })
      } catch (err) {
        console.error('file convert failed', err)
      }
    }
    setClothes(prev => {
      const next = [...newItems, ...prev]
      saveItems(next)
      return next
    })
    setIsUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDelete = (id) => {
    const item = clothes.find(c => c.id === id)
    if (!confirm(`Delete "${item?.name || 'this item'}"?`)) return
    const next = clothes.filter(c => c.id !== id)
    setClothes(next)
    removeItem(id)
  }

  const goToAdd = () => navigate('/add')
  const goToCreate = () => navigate('/create')
  const goToMyOutfits = () => navigate('/my-outfits')

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-lavender/20 via-pastel-pink/20 to-pastel-peach/20">
      {/* HEADER */}
      <header className="bg-white/60 backdrop-blur-md shadow-sm border-b border-white/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Brand / Logo (clickable) */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/home')}>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7l9 6 9-6M3 7l9 10 9-10" />
                </svg>
                <h1
                  className="text-3xl font-semibold text-gray-700 tracking-tight"
                  style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '0.5px' }}
                >
                  Style<span className="text-pastel-pink">Me</span>
                </h1>
              </div>
            </div>

            {/* Header actions: Quick Upload, Create Outfit, My Outfits, Logout */}
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleQuickUpload}
              />
              <button
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="btn-primary px-4 py-2"
                title="Quick upload images to your wardrobe"
              >
                {isUploading ? 'Uploading...' : 'Quick Upload'}
              </button>

              <button onClick={goToCreate} className="btn-secondary px-4 py-2">
                Create Outfit
              </button>

              <button onClick={goToMyOutfits} className="btn-secondary px-4 py-2">
                My Outfits
              </button>

              <button onClick={handleLogout} className="btn-secondary flex items-center gap-2 px-4 py-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-3 tracking-tight">
          Organize Your Style, Effortlessly
        </h1>

        <p
          className="text-2xl italic text-gray-700 mb-6 animate-slide-up"
          style={{ animationDelay: '240ms', fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
        >
          “Putting time into dressing than stressing”
        </p>

        <p className="text-md text-gray-500 mb-8 max-w-xl mx-auto">
          Keep track of your wardrobe, plan outfits & never forget what you own.
        </p>

        <div className="flex justify-center flex-wrap gap-4">
          <button onClick={goToAdd} className="btn-primary px-8 py-4 text-lg">
            Upload Items
          </button>
        </div>
      </section>

      {/* GALLERY */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-light text-gray-700 tracking-tight">Your Wardrobe</h2>
          <span className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-pastel-lavender/30 text-sm font-medium text-gray-600">
            {clothes.length} {clothes.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {clothes.length === 0 ? (
          <div className="card text-center py-20 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pastel-lavender/50 to-pastel-pink/50 rounded-3xl mb-6 border border-white/50">
                <svg className="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-gray-700 mb-3">Your wardrobe is empty</h3>
              <p className="text-gray-500 mb-6 text-lg font-light">Start building your digital wardrobe by uploading pieces from your closet.</p>
              <button onClick={goToAdd} className="btn-primary inline-flex items-center gap-2 text-lg px-8">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" /></svg>
                Upload Your First Item
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {clothes.map((item, i) => (
              <div
                key={item.id}
                className={`card relative overflow-hidden animate-fade-in`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="aspect-square bg-gradient-to-br from-pastel-lavender/20 to-pastel-pink/20 rounded-2xl overflow-hidden mb-4 relative border border-white/50">
                  <img
                    src={item.frontPreview || item.url || item.front || item.frontUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="mb-3 px-3">
                  <p className="text-sm font-medium text-gray-700 truncate">{item.name}</p>
                </div>

                <div className="px-3 pb-3 flex justify-end">
                  <button onClick={() => handleDelete(item.id)} className="btn-secondary text-xs px-3 py-1">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
