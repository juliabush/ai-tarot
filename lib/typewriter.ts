export async function typeWriterAppend(
  text: string,
  setDisplayedText: (val: string) => void,
  delay = 50
) {
  for (let i = 0; i < text.length; i++) {
    setDisplayedText((prev) => prev + text[i]);
    await new Promise((res) => setTimeout(res, delay));
  }
}
