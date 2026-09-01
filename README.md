# Fleet Turnaround Time (TAT) Analysis - Backend API

## Problem
Logistics fleets lose money and reliability when routes silently run over their SLA
turnaround time. Averages alone hide *which* routes are breaching, *how often*, and
*why* - this API surfaces that in a form an ops team can act on.

## Approach
All analytical logic (SLA breach %, delay-reason breakdown, vehicle trend detection)
lives in parameterized Postgres functions in Supabase, not in application code. The
Express backend is a thin layer that calls these functions via Supabase RPC and
returns JSON. This keeps the business logic in one place and reusable across any
frontend or reporting tool.

## Key Finding
Route 3 (Mumbai -> Surat) breaches its 12-hour SLA target on **100% of trips**,
running 54.7% above the fleet-wide average TAT. Delay-reason analysis shows 51% of
these breaches are traffic-related, pointing to a dispatch-timing fix rather than a
vehicle or route capacity issue.

## Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/routes/summary?start_date=&end_date=` | Avg TAT and SLA breach % per route |
| GET | `/api/routes/:routeId/delay-reasons` | Delay cause breakdown for a route |
| GET | `/api/routes/vehicles/trend?min_trips=` | Per-vehicle TAT trend (early maintenance warning) |

## Setup

```bash
npm install
cp .env.example .env   # fill in your Supabase URL and key
npm run dev
```

## Tech Stack
Node.js, Express, Supabase (Postgres), Supabase RPC (stored procedures / DB functions)
