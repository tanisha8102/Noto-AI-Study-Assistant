export const summarizeText = async (text: string) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Summarize this in simple terms:\n${text}` }],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API Error:", errorData);
    throw new Error(`OpenAI Error: ${response.status} - ${errorData.error?.message || 'Too Many Requests'}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
