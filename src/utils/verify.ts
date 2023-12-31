import fetch from "node-fetch";

export async function verify({ apiKey }: { apiKey: string }) {
  const options = {
    method: "POST",
    body: JSON.stringify({
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 5
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Return only true."
            }
          ]
        }
      ]
    })
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      options
    );

    if (!response.ok) {
      throw new Error("Invalid API Key");
    }

    return true;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
