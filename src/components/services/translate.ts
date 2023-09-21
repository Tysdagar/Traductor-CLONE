import { type ToLanguage, type FromLanguage } from "../types";

interface Args {
  toLanguage: ToLanguage;
  fromLanguage: FromLanguage;
  textToTranslate: string;
}

export async function translate({
  toLanguage,
  fromLanguage,
  textToTranslate,
}: Args) {
  const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to=${toLanguage}&api-version=3.0&from=${fromLanguage}&profanityAction=NoAction&textType=plain`;

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key":  import.meta.env.VITE_API_KEY,
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
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

    const traduction = data[0].translations[0].text;
  
    console.log(data)

    return traduction;
  } catch (error) {
    console.error(error);
  }
}
