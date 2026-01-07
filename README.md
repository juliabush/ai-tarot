# Ask Tarot Anything 🔮

A minimal, interactive Tarot reading web app built with **Next.js**, **React**, and **OpenAI**.  
Users ask a question, draw Tarot cards, and receive a streamed, typewriter-style response based on the cards drawn.

Any question on your mind you can get an answer for it!!!!

## Motivation

I love reading tarot cards in my free time and I wanted to combine a hobby of mine with something I also thoroughly enjoy, coding!

## Tech Stack

- **Next.js (App Router)**
- **React + TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **OpenAI API (streaming responses)**

### Key Technical Takeaways

Here are some interesting code snippets I want to explore further.

```Typescript
const stream = await client.responses.create({
  model: "gpt-4o-mini",
  stream: true,
  input: [
    { role: "system", content: "You are a tarot interpreter..." },
    { role: "user", content: question },
  ],
});
```

This snippet shows the constant `stream` being assigned to a call to the OpenAI Responses API using an initialized client. The `await` keyword pauses execution until the API establishes a response stream.

The `gpt-4o-mini` model is selected with server-side streaming enabled, which allows the model to send partial chunks of text as they are generated instead of waiting for the entire response to finish.

The system and user messages are then passed in to define the model’s behavior and provide the actual prompt.

This setup enables real-time AI responses with a streaming, typewriter-style effect, reducing perceived latency and significantly improving the user experience.

```Typescript
return new Response(stream.toReadableStream(), {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
```

This snippet starts by returning a newly created HTTP `Response` object.
`stream.toReadableStream()` converts the OpenAI response into a web-compatible readable stream, allowing the client to consume the output incrementally instead of waiting for a full response.

Next, HTTP headers are defined to control how the browser handles the response.

`Content-Type: text/event-stream` tells the browser that this response is a continuous stream of events rather than a single payload, which enables real-time streaming over one connection.

`Cache-Control` and `Connection` ensure the stream is not cached or modified and that the connection stays open, allowing data to continue flowing as it’s generated.

```Typescript
const reader = res.body.getReader();
const decoder = new TextDecoder();

while (!done) {
  const { value, done: doneReading } = await reader.read();
  ...
}
```

The first line in this code fragment assigns `reader` to a readable stream reader from the `response` body. This allows chunks of data to be read as they arrive. The `TextDecoder` instance is used to convert the raw binary data from the streamed response into readable text that can be displayed.

The `while (!done)` loop continues running until the stream is fully consumed. The line using object literal syntax, more accurately known as destructuring, extracts the `value` and `done` properties from the asynchronous `reader.read()` call. `value` contains the next chunk of data, while `done` is a boolean that signals when the stream has ended, which in turn causes the loop to stop running.

This gurantees that the whole data stream is read as well as ensuring good UX with a feeling that the response appears quickly, rather then having to noticeably wait seconds for the full response to appear.

```Typescript
const prompt = `Question: ${question.trim()}${
  question.trim().endsWith("?") ? "" : "?"
}
Tarot cards drawn: ${cardNames}. Include these cards in your answer.`;
```

In this snippet `prompt` is assigned to a template literal with an embedded question inside. The `trim()` method removes any leading or trailing whitespace. With the embedded tenary expression the question will be guranteed to end in a question mark without duplicate punctuation.

`CardNames` are imbedded into the system prompt making the reading feel random due to personalized cards being drawn every time. Not shown in this snippet is a loop selecting 3 of 78 cards, `{ "name": "The Fool", "url": "/tarot-res-images/00_Fool.jpg" },` in this format.

```Typescript
export function useTypewriterText(text: string, delay = 100) {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return displayedText;
}
```

The `useTypewriterText` function defines a custom React hook. It takes a string to display and an optional `delay` between characters, defaulting to `100` milliseconds.

The line `const [displayedText, setDisplayedText] = useState("")`
uses array destructuring to store the portion of the text that is currently visible, starting as an empty string.

`indexRef` creates a mutable ref that tracks the current character index. A ref is used instead of state so the value persists across renders without triggering additional re-renders on every character increment.

`useEffect` runs a side effect whenever `text` or `delay` changes. Inside it, a repeating timer is created using `setInterval`, which fires every delay milliseconds. On each tick, a conditional checks whether there are still characters left to reveal. If so, the next character is added to the displayed text and the index is advanced. Once the full text has been rendered, the interval is cleared.

The cleanup function returned from `useEffect` ensures the interval is cleared whenever the component unmounts or when the dependencies change, preventing memory leaks or overlapping timers.

Altogether, this hook creates a reusable typewriter effect that avoids unnecessary re-renders, works well with streamed or incremental content, and improves perceived performance by progressively revealing text.
