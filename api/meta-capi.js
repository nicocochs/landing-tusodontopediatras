/* ─────────────────────────────────────────────────────────
   /api/meta-capi  (POST)
   Deduplicación server-side — Meta Conversions API
   Evento: servicio_confirmado | Pixel: 2063502474604009
   ───────────────────────────────────────────────────────── */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event_id, fbp, fbc, test_event_code } = req.body || {};

  /* IP real del visitante (Vercel pone la cadena en x-forwarded-for) */
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
             || req.socket?.remoteAddress
             || '';
  const ua = req.headers['user-agent'] || '';

  const token   = process.env.META_CAPI_TOKEN_TUSO;
  const pixelId = '2063502474604009';

  if (!token) {
    console.error('[meta-capi] META_CAPI_TOKEN_TUSO no configurado');
    return res.status(200).json({ ok: false, error: 'token missing' });
  }

  const payload = {
    data: [
      {
        event_name:       'servicio_confirmado',
        event_time:       Math.floor(Date.now() / 1000),
        event_id:         event_id,
        event_source_url: 'https://landing.tusodontopediatras.cl/gracias347896',
        action_source:    'website',
        user_data: {
          client_ip_address: ip,
          client_user_agent: ua,
          ...(fbp && { fbp }),
          ...(fbc && { fbc }),
        },
        custom_data: {
          value:    30000,
          currency: 'CLP',
        },
      },
    ],
    /* test_event_code va al nivel raíz (solo si viene del frontend) */
    ...(test_event_code && { test_event_code }),
  };

  console.log('[meta-capi] enviando →', JSON.stringify(payload));

  try {
    const resp = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      }
    );
    const data = await resp.json();
    console.log('[meta-capi] respuesta Meta ←', JSON.stringify(data));
    /* Siempre 200 al frontend para no romper el flujo */
    return res.status(200).json({ ok: true, meta: data });
  } catch (err) {
    console.error('[meta-capi] fetch error:', err.message);
    return res.status(200).json({ ok: false, error: err.message });
  }
}
