# GAYMINX — Gaming Command Center

**GAYMINX** is a full‑stack gaming dashboard that helps you track your gaming sessions and discover new free‑to‑play games. Built from scratch with **Node.js**, **Express**, and **PostgreSQL**, it combines a personal session logger with a live game discovery engine powered by the FreeToGame API.

🔗 **Live Demo:** [gayminx.vercel.app](https://gayminx.vercel.app)

---

## Features

### Dashboard
- **Log sessions** — record game name, hours played, platform, date, rating, and notes
- **Live stats** — total hours, total sessions, most played game, average session length
- **Edit & delete** — update or remove any logged session
- **Game thumbnails** — automatically fetched from the FreeToGame API
- **Find Similar** — click a button to discover other games in the same genre

### Discover
- **Browse 400+ free‑to‑play games** — live catalog from the FreeToGame API
- **Filter by platform** — PC or Browser
- **Filter by genre** — dropdown with all available genres
- **Search** — find games by name
- **Game details modal** — view description, developer, publisher, release date
- **One‑click logging** — send any game straight to your Dashboard with metadata pre‑filled

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Node.js, Express |
| **Database** | PostgreSQL (hosted on Neon) |
| **Deployment** | Vercel |
| **Game API** | FreeToGame API |

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (local or cloud)

### Installation

```bash
# Clone the repository
git clone https://github.com/mahnoor1407/gayminx.git
cd gayminx

# Install dependencies
npm install

# Set up environment variables
# Create a .env file with:
# DATABASE_URL=your_postgres_connection_string

# Run the server locally
node server.js
