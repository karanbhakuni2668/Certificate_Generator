// Advanced Service Worker for EventEye PWA
const CACHE_NAME = 'eventeye-v1.0.0'
const OFFLINE_URL = '/offline.html'

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/favicon.ico',
  '/offline.html'
]

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /^https:\/\/eventeyeproject-default-rtdb\.firebaseio\.com/,
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Service Worker: Installation complete')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activation complete')
        return self.clients.claim()
      })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Handle different types of requests
  if (request.destination === 'document') {
    // HTML pages - Network First with offline fallback
    event.respondWith(handleDocumentRequest(request))
  } else if (API_CACHE_PATTERNS.some(pattern => pattern.test(url.href))) {
    // API requests - Stale While Revalidate
    event.respondWith(handleAPIRequest(request))
  } else if (request.destination === 'image' || 
             request.destination === 'style' || 
             request.destination === 'script') {
    // Static assets - Cache First
    event.respondWith(handleStaticAssetRequest(request))
  } else {
    // Default - Network First
    event.respondWith(handleDefaultRequest(request))
  }
})

// Handle document requests (HTML pages)
async function handleDocumentRequest(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
      return networkResponse
    }
  } catch (error) {
    console.log('Service Worker: Network failed for document, trying cache')
  }

  // Try cache
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  // Fallback to offline page for navigation requests
  if (request.mode === 'navigate') {
    return caches.match(OFFLINE_URL)
  }

  // Return a generic offline response
  return new Response('Offline', { 
    status: 503, 
    statusText: 'Service Unavailable' 
  })
}

// Handle API requests
async function handleAPIRequest(request) {
  const cache = await caches.open(CACHE_NAME)
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Service Worker: Network failed for API, serving from cache')
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline response for API requests
    return new Response(
      JSON.stringify({ 
        error: 'Offline', 
        message: 'This data is not available offline' 
      }),
      { 
        status: 503, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
}

// Handle static assets
async function handleStaticAssetRequest(request) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Service Worker: Failed to fetch static asset', request.url)
    return new Response('Asset not available', { status: 404 })
  }
}

// Handle default requests
async function handleDefaultRequest(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    return cachedResponse || new Response('Offline', { status: 503 })
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag)
  
  if (event.tag === 'firebase-sync') {
    event.waitUntil(syncFirebaseData())
  }
})

// Sync Firebase data when back online
async function syncFirebaseData() {
  try {
    // Get pending offline actions from IndexedDB
    const pendingActions = await getPendingOfflineActions()
    
    for (const action of pendingActions) {
      try {
        await executeOfflineAction(action)
        await removePendingAction(action.id)
        console.log('Service Worker: Synced offline action', action.id)
      } catch (error) {
        console.error('Service Worker: Failed to sync action', action.id, error)
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed', error)
  }
}

// Get pending offline actions from IndexedDB
async function getPendingOfflineActions() {
  return new Promise((resolve) => {
    const request = indexedDB.open('EventEyeOfflineDB', 1)
    
    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction(['pendingActions'], 'readonly')
      const store = transaction.objectStore('pendingActions')
      const getAllRequest = store.getAll()
      
      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result || [])
      }
      
      getAllRequest.onerror = () => {
        resolve([])
      }
    }
    
    request.onerror = () => {
      resolve([])
    }
  })
}

// Execute a pending offline action
async function executeOfflineAction(action) {
  const response = await fetch(action.url, {
    method: action.method,
    headers: action.headers,
    body: action.body
  })
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }
  
  return response
}

// Remove a pending action after successful sync
async function removePendingAction(actionId) {
  return new Promise((resolve) => {
    const request = indexedDB.open('EventEyeOfflineDB', 1)
    
    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction(['pendingActions'], 'readwrite')
      const store = transaction.objectStore('pendingActions')
      const deleteRequest = store.delete(actionId)
      
      deleteRequest.onsuccess = () => resolve()
      deleteRequest.onerror = () => resolve()
    }
    
    request.onerror = () => resolve()
  })
}

// Message handling for skip waiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Push notification handling (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    
    const options = {
      body: data.body,
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      tag: data.tag,
      data: data.data,
      actions: data.actions || []
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  event.waitUntil(
    clients.openWindow('/')
  )
})
