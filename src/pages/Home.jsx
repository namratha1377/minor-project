import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Home Page Component
 * Main dashboard where users can upload and view their clothes
 */
function Home({ onLogout }) {
  const [clothes, setClothes] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    
    if (files.length === 0) return

    setIsUploading(true)

    // Simulate file processing delay
    setTimeout(() => {
      files.forEach(file => {
        // Create a local URL for the image
        const imageUrl = URL.createObjectURL(file)
        
        // Add to clothes array with metadata
        const newClothing = {
          id: Date.now() + Math.random(), // Simple ID generation
          name: file.name,
          url: imageUrl,
          uploadedAt: new Date().toISOString(),
        }
        
        setClothes(prev => [...prev, newClothing])
      })
      
      setIsUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }, 500)
  }

  // Handle delete clothing item
  const handleDelete = (id) => {
    const item = clothes.find(c => c.id === id)
    if (item && item.url) {
      // Revoke the object URL to free memory
      URL.revokeObjectURL(item.url)
    }
    setClothes(prev => prev.filter(c => c.id !== id))
  }

  // Handle logout
  const handleLogout = () => {
    // Clean up object URLs before logout
    clothes.forEach(item => {
      if (item.url) {
        URL.revokeObjectURL(item.url)
      }
    })
    onLogout()
    navigate('/login')
  }

  // Handle Create Outfit button (placeholder)
  const handleCreateOutfit = () => {
    alert('Create Outfit feature coming soon! This will be implemented by the backend team.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-lavender/20 via-pastel-pink/20 to-pastel-peach/20">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-md shadow-sm border-b border-white/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pastel-lavender to-pastel-pink rounded-2xl flex items-center justify-center shadow-sm border border-white/50">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-light text-gray-700 tracking-tight">
                  AI Stylish Wardrobe
                </h1>
                <p className="text-sm text-gray-500 font-light">Manage your wardrobe</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Action Buttons Section */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4">
          {/* Upload Button */}
          <div className="flex-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              multiple
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Upload Clothes
                </>
              )}
            </label>
          </div>

          {/* Create Outfit Button */}
          <button
            onClick={handleCreateOutfit}
            className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Create Outfit
          </button>
        </div>

        {/* Clothes Gallery */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-light text-gray-700 tracking-tight">
              Your Wardrobe
            </h2>
            <div className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-pastel-lavender/30">
              <span className="text-sm font-medium text-gray-600">
                {clothes.length} {clothes.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          {clothes.length === 0 ? (
            // Empty State
            <div className="card text-center py-16 animate-fade-in">
              <div className="max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pastel-lavender/50 to-pastel-pink/50 rounded-3xl mb-6 border border-white/50">
                  <svg
                    className="w-12 h-12 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-gray-700 mb-3">Your wardrobe is empty</h3>
                <p className="text-gray-500 mb-6 text-lg font-light">
                  Start building your digital wardrobe by uploading pictures of your favorite clothes
                </p>
                <label
                  htmlFor="file-upload"
                  className="btn-primary inline-flex items-center gap-2 cursor-pointer text-lg px-8"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Upload Your First Item
                </label>
              </div>
            </div>
          ) : (
            // Grid Gallery
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {clothes.map((item, index) => (
                <div
                  key={item.id}
                  className="card group relative overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Container */}
                  <div className="aspect-square bg-gradient-to-br from-pastel-lavender/20 to-pastel-pink/20 rounded-2xl overflow-hidden mb-4 relative border border-white/50">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Delete button on hover */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="absolute top-3 right-3 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-sm text-gray-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 shadow-sm border border-white/50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Item Info */}
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 truncate mb-1">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(item.uploadedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home

