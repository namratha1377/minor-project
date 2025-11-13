// src/pages/MyOutfits.jsx
import { useEffect, useState } from 'react'
import { loadOutfits } from '../utils/storage'
import { useNavigate } from 'react-router-dom'

export default function MyOutfits() {
  const [outfits, setOutfits] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setOutfits(loadOutfits())
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-lavender/20 via-pastel-pink/20 to-pastel-peach/20 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/home')} className="btn-secondary">Back</button>
          <h1 className="text-3xl font-light text-gray-700">My Created Outfits</h1>
          <div />
        </div>

        {outfits.length === 0 ? (
          <div className="text-center card py-16">
            <h2 className="text-2xl text-gray-600 mb-4">No Outfits Yet</h2>
            <p className="text-gray-500 mb-6">Start by creating your first outfit from your wardrobe!</p>
            <button onClick={() => navigate('/create')} className="btn-primary px-6 py-3">Create Outfit</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {outfits.map((outfit, i) => (
              <div key={outfit.id || i} className="card overflow-hidden">
                <div className="aspect-square bg-white/40 rounded-2xl overflow-hidden mb-4">
                  <div className="grid grid-cols-2 gap-1 h-full">
                    {outfit.items.slice(0, 4).map((it, idx) => (
                      <img key={idx} src={it.frontPreview || it.url} alt={it.name} className="w-full h-full object-cover" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 font-medium">Outfit #{i + 1}</p>
                <p className="text-xs text-gray-500">{outfit.items.length} items</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
