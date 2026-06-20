# The Six List

A Toronto events aggregator that pulls real-time events from multiple sources and lets you search and filter by category, date, and keyword — all in one clean, editorial-style interface.

**Live site:** [the-six-list.vercel.app](https://the-six-list.vercel.app)

![The Six List preview](./assets/preview.png)

## About

Toronto has events happening constantly, scattered across a dozen different platforms. The Six List brings them into one place — concerts, sports, comedy shows, markets, community events, and more — so you can actually find out what's going on without checking five different apps.

## Features

- **Multi-source aggregation** — combines event data from the Ticketmaster Discovery API and the PredictHQ Events API into one unified feed
- **Live search** — debounced keyword search that queries both APIs directly, so results stay relevant without hammering rate limits
- **Category filtering** — filter by event type (Music, Sports, Comedy, Arts & Theatre, and more)
- **Date filtering** — filter by Today, This Week, or any of the next 6 calendar months
- **Graceful fallback handling** — events missing images, venues, or links degrade cleanly instead of breaking the layout
- **Responsive card grid** — clean, editorial-inspired dark UI built from scratch

## Tech Stack

- **React** (Vite) — component architecture and state management
- **JavaScript (ES6+)** — async/await, Promise.all for concurrent API calls, array methods for filtering/mapping
- **CSS** — custom design system, no UI framework
- **Ticketmaster Discovery API** — concerts, sports, theatre
- **PredictHQ Events API** — community events, festivals, nightlife, and more
- **Vercel** — deployment and hosting

## How It Works

Search, category, and date filters are passed directly into both API calls rather than filtering client-side. This means:

- Results are always fresh and relevant to the exact query
- The app scales to thousands of events without loading them all into memory
- Each API's filtering quirks are normalized into one consistent event shape before reaching the UI

Since Ticketmaster and PredictHQ return wildly different data structures (and PredictHQ doesn't provide images or public ticket links at all), each service module transforms its raw response into a shared format before it ever reaches a component:

```js
{
  id,
  name,
  dates: { start: { localDate } },
  images: [{ url }],
  url,
  classifications: [{ segment: { name } }],
  _embedded: { venues: [{ name }] },
  source
}
```

This keeps `EventCard` and the rest of the UI completely unaware of which API an event came from.

## Running Locally

```bash
git clone https://github.com/Victoriaecai/The-Six-List.git
cd The-Six-List
npm install
```

Create a `.env` file in the root with your own API keys:

```
VITE_TICKETMASTER_API_KEY=your_key_here
VITE_PREDICTHQ_API_KEY=your_key_here
```

Then run:

```bash
npm run dev
```

## What I'd Add Next

- Pagination / "load more" for deeper result sets
- Additional event sources
- Click-through detail view per event
- Saved/favorited events
