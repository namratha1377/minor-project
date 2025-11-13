// src/utils/storage.js
// Utilities for reading/writing wardrobe and outfits to localStorage

const WARDROBE_KEY = 'localWardrobe'
const OUTFITS_KEY = 'localOutfits'

export function loadItems() {
  try {
    return JSON.parse(localStorage.getItem(WARDROBE_KEY) || '[]')
  } catch (e) {
    console.warn('loadItems failed', e)
    return []
  }
}

export function saveItem(item) {
  try {
    const arr = loadItems()
    arr.unshift(item)
    localStorage.setItem(WARDROBE_KEY, JSON.stringify(arr))
  } catch (e) {
    console.warn('saveItem failed', e)
  }
}

export function saveItems(items) {
  try {
    localStorage.setItem(WARDROBE_KEY, JSON.stringify(items))
  } catch (e) {
    console.warn('saveItems failed', e)
  }
}

export function removeItem(id) {
  try {
    const arr = loadItems()
    const next = arr.filter(i => i.id !== id)
    localStorage.setItem(WARDROBE_KEY, JSON.stringify(next))
  } catch (e) {
    console.warn('removeItem failed', e)
  }
}

export function loadOutfits() {
  try {
    return JSON.parse(localStorage.getItem(OUTFITS_KEY) || '[]')
  } catch (e) {
    console.warn('loadOutfits failed', e)
    return []
  }
}

export function saveOutfit(outfit) {
  try {
    const arr = loadOutfits()
    arr.unshift(outfit)
    localStorage.setItem(OUTFITS_KEY, JSON.stringify(arr))
  } catch (e) {
    console.warn('saveOutfit failed', e)
  }
}
