import { Dispatch, SetStateAction } from "react";

export async function typeWriterAppend(
  text: string,
  setDisplayedText: Dispatch<SetStateAction<string>>,
  delay = 50
) {
  for (let i = 0; i < text.length; i++) {
    setDisplayedText((prev) => prev + text[i]);
    await new Promise((res) => setTimeout(res, delay));
  }
}
