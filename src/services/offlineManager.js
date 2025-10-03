// Offline Data Manager for EventEye PWA
class OfflineManager {
  constructor() {
    this.dbName = 'EventEyeOfflineDB'
    this.version = 1
    this.db = null
    this.initDB()
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error)
        reject(request.error)
      }

      request.onsuccess = () => {
        this.db = request.result
        console.log('IndexedDB opened successfully')
        resolve(this.db)
      }

      request.onupgradeneeded = (event) => {
        const db = event.target.result

        // Create object stores
        if (!db.objectStoreNames.contains('pendingActions')) {
          const pendingStore = db.createObjectStore('pendingActions', { 
            keyPath: 'id', 
            autoIncrement: true 
          })
          pendingStore.createIndex('timestamp', 'timestamp', { unique: false })
        }

        if (!db.objectStoreNames.contains('cachedData')) {
          const cacheStore = db.createObjectStore('cachedData', { 
            keyPath: 'key' 
          })
          cacheStore.createIndex('type', 'type', { unique: false })
          cacheStore.createIndex('timestamp', 'timestamp', { unique: false })
        }

        if (!db.objectStoreNames.contains('userActions')) {
          const userStore = db.createObjectStore('userActions', { 
            keyPath: 'id', 
            autoIncrement: true 
          })
          userStore.createIndex('userId', 'userId', { unique: false })
          userStore.createIndex('timestamp', 'timestamp', { unique: false })
        }

        console.log('IndexedDB schema created')
      }
    })
  }

  // Store data for offline access
  async cacheData(key, data, type = 'general', ttl = 24 * 60 * 60 * 1000) {
    if (!this.db) await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['cachedData'], 'readwrite')
      const store = transaction.objectStore('cachedData')
      
      const cacheEntry = {
        key,
        data,
        type,
        timestamp: Date.now(),
        ttl,
        expiresAt: Date.now() + ttl
      }

      const request = store.put(cacheEntry)

      request.onsuccess = () => {
        console.log('Data cached successfully:', key)
        resolve(request.result)
      }

      request.onerror = () => {
        console.error('Failed to cache data:', request.error)
        reject(request.error)
      }
    })
  }

  // Retrieve cached data
  async getCachedData(key) {
    if (!this.db) await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['cachedData'], 'readonly')
      const store = transaction.objectStore('cachedData')
      const request = store.get(key)

      request.onsuccess = () => {
        const result = request.result
        
        if (result) {
          // Check if data has expired
          if (Date.now() > result.expiresAt) {
            // Data expired, remove it
            this.removeCachedData(key)
            resolve(null)
          } else {
            resolve(result.data)
          }
        } else {
          resolve(null)
        }
      }

      request.onerror = () => {
        console.error('Failed to get cached data:', request.error)
        reject(request.error)
      }
    })
  }

  // Remove cached data
  async removeCachedData(key) {
    if (!this.db) await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['cachedData'], 'readwrite')
      const store = transaction.objectStore('cachedData')
      const request = store.delete(key)

      request.onsuccess = () => {
        console.log('Cached data removed:', key)
        resolve()
      }

      request.onerror = () => {
        console.error('Failed to remove cached data:', request.error)
        reject(request.error)
      }
    })
  }

  // Queue action for when online
  async queueOfflineAction(action) {
    if (!this.db) await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['pendingActions'], 'readwrite')
      const store = transaction.objectStore('pendingActions')
      
      const offlineAction = {
        ...action,
        timestamp: Date.now(),
        retries: 0
      }

      const request = store.add(offlineAction)

      request.onsuccess = () => {
        console.log('Action queued for offline sync:', action.type)
        resolve(request.result)
      }

      request.onerror = () => {
        console.error('Failed to queue offline action:', request.error)
        reject(request.error)
      }
    })
  }

  // Get all pending actions
  async getPendingActions() {
    if (!this.db) await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['pendingActions'], 'readonly')
      const store = transaction.objectStore('pendingActions')
      const request = store.getAll()

      request.onsuccess = () => {
        resolve(request.result || [])
      }

      request.onerror = () => {
        console.error('Failed to get pending actions:', request.error)
        reject(request.error)
      }
    })
  }

  // Remove pending action after successful sync
  async removePendingAction(id) {
    if (!this.db) await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['pendingActions'], 'readwrite')
      const store = transaction.objectStore('pendingActions')
      const request = store.delete(id)

      request.onsuccess = () => {
        console.log('Pending action removed:', id)
        resolve()
      }

      request.onerror = () => {
        console.error('Failed to remove pending action:', request.error)
        reject(request.error)
      }
    })
  }

  // Store user action for analytics
  async storeUserAction(userId, action, metadata = {}) {
    if (!this.db) await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['userActions'], 'readwrite')
      const store = transaction.objectStore('userActions')
      
      const userAction = {
        userId,
        action,
        metadata,
        timestamp: Date.now()
      }

      const request = store.add(userAction)

      request.onsuccess = () => {
        console.log('User action stored:', action)
        resolve(request.result)
      }

      request.onerror = () => {
        console.error('Failed to store user action:', request.error)
        reject(request.error)
      }
    })
  }

  // Get user actions
  async getUserActions(userId, limit = 100) {
    if (!this.db) await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['userActions'], 'readonly')
      const store = transaction.objectStore('userActions')
      const index = store.index('userId')
      const request = index.getAll(userId)

      request.onsuccess = () => {
        const actions = (request.result || [])
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, limit)
        resolve(actions)
      }

      request.onerror = () => {
        console.error('Failed to get user actions:', request.error)
        reject(request.error)
      }
    })
  }

  // Clean up expired data
  async cleanupExpiredData() {
    if (!this.db) await this.initDB()

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['cachedData'], 'readwrite')
      const store = transaction.objectStore('cachedData')
      const request = store.getAll()

      request.onsuccess = () => {
        const allData = request.result || []
        const expiredKeys = allData
          .filter(item => Date.now() > item.expiresAt)
          .map(item => item.key)

        if (expiredKeys.length === 0) {
          resolve()
          return
        }

        const deletePromises = expiredKeys.map(key => 
          new Promise((deleteResolve, deleteReject) => {
            const deleteRequest = store.delete(key)
            deleteRequest.onsuccess = () => deleteResolve()
            deleteRequest.onerror = () => deleteReject(deleteRequest.error)
          })
        )

        Promise.all(deletePromises)
          .then(() => {
            console.log('Expired data cleaned up:', expiredKeys.length, 'items')
            resolve()
          })
          .catch(reject)
      }

      request.onerror = () => {
        console.error('Failed to cleanup expired data:', request.error)
        reject(request.error)
      }
    })
  }

  // Get storage usage info
  async getStorageInfo() {
    if (!this.db) await this.initDB()

    return new Promise((resolve) => {
      const transaction = this.db.transaction(['cachedData', 'pendingActions', 'userActions'], 'readonly')
      
      const cacheStore = transaction.objectStore('cachedData')
      const pendingStore = transaction.objectStore('pendingActions')
      const userStore = transaction.objectStore('userActions')

      const cacheRequest = cacheStore.count()
      const pendingRequest = pendingStore.count()
      const userRequest = userStore.count()

      let completed = 0
      const results = {}

      const handleComplete = () => {
        completed++
        if (completed === 3) {
          resolve(results)
        }
      }

      cacheRequest.onsuccess = () => {
        results.cachedItems = cacheRequest.result
        handleComplete()
      }

      pendingRequest.onsuccess = () => {
        results.pendingActions = pendingRequest.result
        handleComplete()
      }

      userRequest.onsuccess = () => {
        results.userActions = userRequest.result
        handleComplete()
      }
    })
  }
}

// Create singleton instance
const offlineManager = new OfflineManager()

export default offlineManager
