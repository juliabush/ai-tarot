# Ask Tarot Anything 🔮

A minimal, interactive Tarot reading web app built with **Next.js**, **React**, and **OpenAI**.  
Users ask a question, draw Tarot cards, and receive a streamed, typewriter-style response based on the cards drawn.

The project is intentionally designed to be **modular, readable, and easy to extend**.

---

## Motivation

I love reading tarot cards in my free time and I wanted to combine a hobby of mine with something I also thoroughly enjoy, coding!

## Tech Stack

- **Next.js (App Router)**
- **React + TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **OpenAI API (streaming responses)**

---

## Project Structure

```txt
.
├── app
│   ├── api              # API routes (OpenAI proxy)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── container.tsx
│   ├── response_modal.tsx
│   ├── tarot_card_display.tsx
│   ├── tarot_input.tsx
│   └── video_card.tsx
├── lib
│   ├── askTarot.ts              # OpenAI streaming + prompt logic
│   ├── formatTarotResponse.tsx  # Response parsing / formatting
│   ├── tarot_utils.ts           # Card selection helpers
│   ├── typewriter.ts            # Typewriter utilities
│   ├── types.ts                 # Shared TypeScript types
│   └── useTarot.ts              # Core Tarot state + orchestration
├── public
│   ├── main-page-vids
│   └── tarot-res-images
├── tarot-json
│   └── tarot-loop.json
└── README.md
```
