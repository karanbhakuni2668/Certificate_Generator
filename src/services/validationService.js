// Simple heuristics + placeholder AI hook for name validation

export function sanitizeName(input) {
  if (!input) return ''
  const trimmed = String(input).trim().replace(/\s+/g, ' ')
  return trimmed
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

export function detectNameIssues(name) {
  const issues = []
  if (!name || name.length < 2) issues.push('Name too short')
  if (/\d/.test(name)) issues.push('Name contains numbers')
  if (/[^a-zA-Z\-\s'.]/.test(name)) issues.push('Name contains unusual characters')
  if (/\s{2,}/.test(name)) issues.push('Multiple consecutive spaces')
  return issues
}

// Placeholder AI validation that suggests sanitized name and a confidence score
export async function validateNameWithAI(name) {
  const sanitized = sanitizeName(name)
  const issues = detectNameIssues(name)
  const confidence = Math.max(0, 1 - issues.length * 0.15)
  return {
    original: name,
    suggestion: sanitized,
    issues,
    confidence, // 0..1
  }
}


