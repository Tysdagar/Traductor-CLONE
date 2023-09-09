export async function setAutoLanguage(textToTranslate: string, ) {
  const url =
    "https://microsoft-translator-text.p.rapidapi.com/Detect?api-version=3.0";
  const options = {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
    },
    body: JSON.stringify([
      {
        Text: textToTranslate,
      },
    ]),
  };

  try {
    const result = await fetch(url, options);
    const data = await result.json();
    const languageDetected = data[0].language;
    
    return languageDetected;
  } catch (error) {
    console.error(error);
  }
}
