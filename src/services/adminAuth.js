// Admin Authentication Service
// Defines admin credentials and access control

export const ADMIN_CREDENTIALS = {
  email: 'Harshbh20102@gmail.com',
  password: 'Harsh123@'
}

// Check if user is admin
export function isAdmin(user) {
  if (!user || !user.email) return false
  return user.email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase()
}

// Check if user has admin access to dashboard
export function hasAdminAccess(user) {
  return isAdmin(user)
}

// Get admin user info
export function getAdminInfo() {
  return {
    email: ADMIN_CREDENTIALS.email,
    role: 'admin',
    permissions: ['dashboard', 'manage_participants', 'generate_certificates']
  }
}
