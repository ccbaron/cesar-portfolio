import type { Lead } from '~~/app/types/lead'

const SERVICE_LABELS: Record<string, string> = {
  arquitectura: 'Arquitectura',
  remodelacion: 'Remodelación / Rehabilitación',
  planimetria: 'Planimetría / Levantamiento',
  topografia: 'Topografía',
  dron: 'Dron / Fotogrametría',
  'modelado-3d': 'Modelado 3D',
  'energia-solar': 'Energía Solar',
  otro: 'Otro',
}

function escape(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Exported for unit testing — does not call any external services
export function formatMessage(lead: Lead): string {
  const service = SERVICE_LABELS[lead.service] ?? escape(lead.service)
  const lines = [
    `<b>Nueva consulta — César Barón</b>`,
    '',
    `<b>Nombre:</b> ${escape(lead.name)}`,
    `<b>Servicio:</b> ${service}`,
    lead.location ? `<b>Ubicación:</b> ${escape(lead.location)}` : null,
    '',
    `<b>Mensaje:</b>`,
    escape(lead.message),
    '',
  ].filter((l) => l !== null)

  const utmParts = [
    lead.utmSource ? `utm_source=${escape(lead.utmSource)}` : null,
    lead.utmMedium ? `utm_medium=${escape(lead.utmMedium)}` : null,
    lead.utmCampaign ? `utm_campaign=${escape(lead.utmCampaign)}` : null,
  ].filter(Boolean)

  if (utmParts.length > 0) {
    lines.push(`<i>UTM: ${utmParts.join(' | ')}</i>`)
  }
  if (lead.pagePath) {
    lines.push(`<i>Página: ${escape(lead.pagePath)}</i>`)
  }

  return lines.join('\n')
}

export async function sendTelegramNotification(lead: Lead): Promise<boolean> {
  const config = useRuntimeConfig()
  const token = config.telegramBotToken
  const chatId = config.telegramChatId

  if (!token || !chatId) {
    // Telegram not configured — skip silently
    return false
  }

  const text = formatMessage(lead)

  try {
    const result = await $fetch<{ ok: boolean }>(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      },
    })
    return result.ok === true
  }
  catch {
    return false
  }
}
