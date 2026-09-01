const express = require('express');
const router = express.Router();
const supabase = require('./supabaseClient');

/**
 * GET /api/routes/summary?start_date=2026-08-01&end_date=2026-08-30
 * Wraps get_route_tat_summary(start_date, end_date)
 * Returns avg TAT and SLA breach % per route.
 */
router.get('/summary', async (req, res) => {
  const { start_date, end_date } = req.query;

  const { data, error } = await supabase.rpc('get_route_tat_summary', {
    start_date: start_date || '2000-01-01',
    end_date: end_date || '2100-01-01',
  });

  if (error) {
    console.error('get_route_tat_summary error:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json({ data });
});

/**
 * GET /api/routes/:routeId/delay-reasons
 * Wraps get_route_delay_reasons(route_id)
 * Returns breakdown of delay causes for a specific route.
 */
router.get('/:routeId/delay-reasons', async (req, res) => {
  const routeId = parseInt(req.params.routeId, 10);

  if (Number.isNaN(routeId)) {
    return res.status(400).json({ error: 'routeId must be a number' });
  }

  const { data, error } = await supabase.rpc('get_route_delay_reasons', {
    p_route_id: routeId,
  });

  if (error) {
    console.error('get_route_delay_reasons error:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json({ data });
});

/**
 * GET /api/routes/vehicles/trend?min_trips=5
 * Wraps get_vehicle_trend(min_trips)
 * Returns per-vehicle trip-over-trip TAT trend (early maintenance warning).
 */
router.get('/vehicles/trend', async (req, res) => {
  const minTrips = req.query.min_trips ? parseInt(req.query.min_trips, 10) : 5;

  const { data, error } = await supabase.rpc('get_vehicle_trend', {
    min_trips: minTrips,
  });

  if (error) {
    console.error('get_vehicle_trend error:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json({ data });
});

module.exports = router;
