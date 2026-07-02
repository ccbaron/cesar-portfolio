import { describe, it, expect } from 'vitest'
import { formatMessage } from '../server/services/telegram'
import type { Lead } from '../app/types/lead'

const baseLead: Lead = {
  name: 'Carlos Ruiz',
  email: 'carlos@example.com',
  service: 'arquitectura',
  message: 'Quiero construir una casa.',
  ipHash: 'abc123hash',
  createdAt: new Date('2025-08-01T10:00:00Z'),
  notification: { telegram: 'skipped' },
}

describe('formatMessage — required fields', () => {
  it('includes the sender name', () => {
    const msg = formatMessage(baseLead)
    expect(msg).toContain('Carlos Ruiz')
  })

  it('includes the service label (human-readable, not slug)', () => {
    const msg = formatMessage(baseLead)
    expect(msg).toContain('Arquitectura')
    expect(msg).not.toContain('<b>Servicio:</b> arquitectura')
  })

  it('includes the message content', () => {
    const msg = formatMessage(baseLead)
    expect(msg).toContain('Quiero construir una casa.')
  })

  it('includes the heading', () => {
    const msg = formatMessage(baseLead)
    expect(msg).toContain('Nueva consulta')
    expect(msg).toContain('César Barón')
  })
})

describe('formatMessage — optional fields', () => {
  it('omits location line when location is absent', () => {
    const msg = formatMessage({ ...baseLead, location: undefined })
    expect(msg).not.toContain('Ubicación')
  })

  it('includes location when provided', () => {
    const msg = formatMessage({ ...baseLead, location: 'Bogotá, Colombia' })
    expect(msg).toContain('Bogotá, Colombia')
  })

  it('omits UTM line when no UTM params are present', () => {
    const msg = formatMessage(baseLead)
    expect(msg).not.toContain('UTM:')
  })

  it('includes UTM line when UTM params are present', () => {
    const msg = formatMessage({ ...baseLead, utmSource: 'instagram', utmMedium: 'social' })
    expect(msg).toContain('utm_source=instagram')
    expect(msg).toContain('utm_medium=social')
  })

  it('includes pagePath when provided', () => {
    const msg = formatMessage({ ...baseLead, pagePath: '/servicios/arquitectura' })
    expect(msg).toContain('/servicios/arquitectura')
  })

  it('omits pagePath line when absent', () => {
    const msg = formatMessage(baseLead)
    expect(msg).not.toContain('Página:')
  })
})

describe('formatMessage — HTML escaping (injection prevention)', () => {
  it('escapes < and > in user name', () => {
    const msg = formatMessage({ ...baseLead, name: '<script>alert(1)</script>' })
    expect(msg).toContain('&lt;script&gt;')
    expect(msg).not.toContain('<script>')
  })

  it('escapes & in user message', () => {
    const msg = formatMessage({ ...baseLead, message: 'Empresa A & empresa B quieren...' })
    expect(msg).toContain('&amp;')
    expect(msg).not.toMatch(/Empresa A & empresa B/)
  })

  it('escapes > in location', () => {
    const msg = formatMessage({ ...baseLead, location: '> aquí' })
    expect(msg).toContain('&gt; aquí')
    expect(msg).not.toContain('> aquí')
  })

  it('uses the human-readable label for known services (never raw slug)', () => {
    for (const [slug, label] of Object.entries({
      arquitectura: 'Arquitectura',
      remodelacion: 'Remodelación / Rehabilitación',
      topografia: 'Topografía',
      'energia-solar': 'Energía Solar',
    })) {
      const msg = formatMessage({ ...baseLead, service: slug })
      expect(msg).toContain(label)
    }
  })
})

describe('formatMessage — does not expose secrets', () => {
  it('does not include email in the formatted message', () => {
    // Email is intentionally excluded from Telegram notifications
    const msg = formatMessage({ ...baseLead, email: 'private@example.com' })
    expect(msg).not.toContain('private@example.com')
  })

  it('does not include phone in the formatted message', () => {
    const msg = formatMessage({ ...baseLead, phone: '+34600000000' })
    expect(msg).not.toContain('+34600000000')
  })

  it('does not include ipHash in the formatted message', () => {
    const msg = formatMessage({ ...baseLead, ipHash: 'super-secret-hash-xyz' })
    expect(msg).not.toContain('super-secret-hash-xyz')
  })
})
