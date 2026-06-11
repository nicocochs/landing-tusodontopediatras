/* ─────────────────────────────────────────────────────────
   /api/meta-capi  (POST)
   Deduplicación server-side — Meta Conversions API
   Eventos: servicio_confirmado + Purchase | Pixel: 2063502474604009
   ───────────────────────────────────────────────────────── */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event_id, purchase_event_id, event_source_url, fbp, fbc, test_event_code } = req.body || {};

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

  const eventTime = Math.floor(Date.now() / 1000);
  const sourceUrl = event_source_url || 'https://landing-tusodontopediatras.vercel.app/gracias347896';
  const userData  = {
    client_ip_address: ip,
    client_user_agent: ua,
    ...(fbp && { fbp }),
    ...(fbc && { fbc }),
  };
  const customData = { value: 35000, currency: 'CLP' };

  /* Evento 1: servicio_confirmado (custom) — deduplica con eventId del navegador */
  const data = [
    {
      event_name:       'servicio_confirmado',
      event_time:       eventTime,
      event_id:         event_id,
      event_source_url: sourceUrl,
      action_source:    'website',
      user_data:        userData,
      custom_data:      customData,
    },
  ];

  /* Evento 2: Purchase (estándar) — deduplica con purchaseEventId del navegador.
     Solo se agrega si el frontend mandó purchase_event_id (evita Purchase sin par). */
  if (purchase_event_id) {
    data.push({
      event_name:       'Purchase',
      event_time:       eventTime,
      event_id:         purchase_event_id,
      event_source_url: sourceUrl,
      action_source:    'website',
      user_data:        userData,
      custom_data:      customData,
    });
  }

  /* ⚠️ TEMPORAL — PRUEBA: código de test forzado. QUITAR DESPUÉS DE TESTEAR.
     Mientras esté esta línea, TODOS los eventos CAPI van a Test Events y NO
     cuentan como conversiones reales. Volver a: ...(test_event_code && { test_event_code }) */
  const test_code_forzado = test_event_code || 'TEST43461';

  const payload = {
    data,
    test_event_code: test_code_forzado,
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
