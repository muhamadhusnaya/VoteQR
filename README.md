# FrontEnd Framework - VoteQR (Documentation)
---
## Configure your environment
- rename file `env` to `.env`
- key of `VITE_API_URL` adjust to your url

## Configure Vote Expired
- search file `src/components/Countdown.jsx`
- `const targetDate = new Date("2025-05-15T00:00:00");` replace date as you wish

## Additional Features
- Countdowns
- Use UseContext to save generalize Countdown Status
- Responsive