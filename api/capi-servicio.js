/* ─────────────────────────────────────────────────────────
   /api/capi-servicio
   Respaldo server-side — Meta Conversions API
   Evento: servicio_confirmado (cuenta salud, sin Purchase)
   Pixel: 515349950052299
   ───────────────────────────────────────────────────────── */

export default async function handler(req, res) {
  const { event_id, fbp, fbc, order, test_event_code } = req.query;

  /* Solo disparar si hay order real */
  if (!order) {
    return res.status(400).json({ error: 'order requerido' });
  }

  const token   = process.env.META_CAPI_TOKEN_TUSO;
  const pixelId = '515349950052299';

  if (!token) {
    console.error('[capi-servicio] META_CAPI_TOKEN_TUSO no configurado');
    return res.status(200).json({ ok: false, error: 'token missing' });
  }

  /* Payload principal */
  const payload = {
    data: [
      {
        event_name:       'servicio_confirmado',
        event_time:       Math.floor(Date.now() / 1000),
        event_id:         event_id,
        event_source_url: 'https://landing.tusodontopediatras.cl/gracias347896',
        action_source:    'website',
        user_data: {
          ...(fbp && { fbp }),
          ...(fbc && { fbc }),
          client_user_agent: req.headers['user-agent'] || '',
        },
        custom_data: {
          value:    30000,
          currency: 'CLP',
          order_id: order,
        },
      },
    ],
    /* test_event_code va al nivel raíz — solo presente si viene en la query */
    ...(test_event_code && { test_event_code }),
  };

  console.log('[capi-servicio] enviando payload:', JSON.stringify(payload));

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
    console.log('[capi-servicio] respuesta Meta:', JSON.stringify(data));
    /* Siempre 200 al frontend aunque Meta haya devuelto error */
    return res.status(200).json({ ok: true, meta: data });
  } catch (err) {
    console.error('[capi-servicio] error fetch:', err.message);
    /* También 200 al frontend para no romper el flujo silencioso */
    return res.status(200).json({ ok: false, error: err.message });
  }
}
