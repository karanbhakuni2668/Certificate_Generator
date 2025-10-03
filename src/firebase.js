import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Environment variables (prefixed with VITE_ for Vite to expose them)
const env = import.meta.env || {}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyC7fRh87BWz2fpyEMMqQW0s1T40enfH3Mo",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "eventeyeproject.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "eventeyeproject",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "eventeyeproject.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "757411556475",
  appId: env.VITE_FIREBASE_APP_ID || "1:757411556475:web:19970d445ae04e638546de",
  databaseURL: env.VITE_FIREBASE_DATABASE_URL || "https://eventeyeproject-default-rtdb.firebaseio.com/"
}

// Validation and warnings for missing environment variables
if (!env.VITE_FIREBASE_API_KEY) {
  console.warn('VITE_FIREBASE_API_KEY missing from .env; using default value')
}
if (!env.VITE_FIREBASE_PROJECT_ID) {
  console.warn('VITE_FIREBASE_PROJECT_ID missing from .env; using default "eventeyeproject"')
}
if (!env.VITE_FIREBASE_DATABASE_URL) {
  console.warn('VITE_FIREBASE_DATABASE_URL missing from .env; using default database URL')
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app)

// Export the app for other Firebase services
export { app }
