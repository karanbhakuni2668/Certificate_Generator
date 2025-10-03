import './App.css'
import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import FillForm from './pages/FillForm'
import Testimonials from './pages/Testimonials'
import HelpCenter from './pages/HelpCenter'
import Support from './pages/Support'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import PWAUpdateNotification from './components/PWAUpdateNotification'
import OfflineIndicator from './components/OfflineIndicator'
import { auth } from './auth'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { isAdmin, hasAdminAccess } from './services/adminAuth'
import offlineManager from './services/offlineManager'

function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('loading') // add loading state
  const [selectedPage, setSelectedPage] = useState('home')
  const [isUserAdmin, setIsUserAdmin] = useState(false)

  // ✅ Listen for auth state changes (keeps user logged in across refreshes)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u)
        const adminStatus = isAdmin(u)
        setIsUserAdmin(adminStatus)
        setView('app')
        
        // Store user login action for offline analytics
        offlineManager.storeUserAction(u.uid, 'login', {
          email: u.email,
          timestamp: Date.now()
        })
        
        // If user tries to access dashboard but is not admin, redirect to home
        if (selectedPage === 'dashboard' && !adminStatus) {
          setSelectedPage('home')
        }
      } else {
        setUser(null)
        setIsUserAdmin(false)
        setView('login')
      }
    })
    return () => unsubscribe()
  }, [selectedPage])

  // PWA and offline management
  useEffect(() => {
    // Initialize offline manager
    offlineManager.initDB().then(() => {
      console.log('Offline manager initialized')
      
      // Clean up expired data on app start
      offlineManager.cleanupExpiredData()
      
      // Store last sync time
      localStorage.setItem('lastSync', Date.now().toString())
    })

    // Register service worker for updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        console.log('Service Worker ready:', registration)
      })
    }

    // Handle online/offline events
    const handleOnline = () => {
      console.log('App is online')
      // Trigger background sync if available
      if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        navigator.serviceWorker.ready.then((registration) => {
          return registration.sync.register('firebase-sync')
        })
      }
    }

    const handleOffline = () => {
      console.log('App is offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleAuthSuccess = (u) => {
    setUser(u)
    const adminStatus = isAdmin(u)
    setIsUserAdmin(adminStatus)
    setView('app')
    
    // If admin logs in, go to dashboard, otherwise go to home
    if (adminStatus) {
      setSelectedPage('dashboard')
    } else {
      setSelectedPage('home')
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
    setIsUserAdmin(false)
    setView('login')
    setSelectedPage('home')
  }

  const handleNavigation = (page) => {
    // Check admin access for dashboard
    if (page === 'dashboard' && !isUserAdmin) {
      console.warn('Access denied: Dashboard requires admin privileges')
      return
    }
    setSelectedPage(page)
  }

  if (view === 'loading') {
    return <p>Loading...</p> // optional loader
  }

  return (
    <>
      {/* PWA Components */}
      <PWAInstallPrompt />
      <PWAUpdateNotification />
      <OfflineIndicator />

      {view === 'app' && (
        <NavBar 
          user={user} 
          isAdmin={isUserAdmin}
          onLogout={handleLogout} 
          onNavigate={handleNavigation} 
        />
      )}
      {view === 'app' && <div style={{ height: 72 }} />}

      {view === 'login' && (
        <Login onSuccess={handleAuthSuccess} onSignup={() => setView('signup')} onForgot={() => setView('forgot')} />
      )}
      {view === 'signup' && (
        <Signup onSuccess={handleAuthSuccess} onLogin={() => setView('login')} />
      )}
      {view === 'forgot' && <ForgotPassword onBack={() => setView('login')} />}

      {view === 'app' && (
        <>
          {selectedPage === 'dashboard' && isUserAdmin && <Dashboard />}
          {selectedPage === 'home' && <Home />}
          {selectedPage === 'about' && <About />}
          {selectedPage === 'contact' && <Contact />}
          {selectedPage === 'fill-form' && <FillForm />}
          {selectedPage === 'testimonials' && <Testimonials />}
          {selectedPage === 'help-center' && <HelpCenter />}
          {selectedPage === 'support' && <Support />}
          
          {/* Show access denied message if non-admin tries to access dashboard */}
          {selectedPage === 'dashboard' && !isUserAdmin && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '50vh',
              color: 'white',
              textAlign: 'center'
            }}>
              <div>
                <h2>🔒 Access Denied</h2>
                <p>Dashboard access requires admin privileges.</p>
                <p>Please contact your administrator.</p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default App
