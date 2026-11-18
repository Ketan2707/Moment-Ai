export async function callGeminiStructured<T>(
  prompt: string,
  fallbackData: T
): Promise<T> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return fallbackData;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      console.warn(`[Gemini API] Request returned status ${response.status}. Using fallback.`);
      return fallbackData;
    }

    const jsonResponse: any = await response.json();
    const candidateText =
      jsonResponse.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return fallbackData;
    }

    const parsed = JSON.parse(candidateText) as T;
    return parsed;
  } catch (err) {
    console.warn('[Gemini API] Error during generation, using fallback:', err);
    return fallbackData;
  }
}
