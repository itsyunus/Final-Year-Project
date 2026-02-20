const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL = "llama-3.3-70b-versatile"; // Fast, conversational model

export async function fetchGroqChatStream(messages, onChunk) {
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: MODEL,
                messages,
                temperature: 0.3,
                stream: true
            })
        });

        if (!response.ok) {
            throw new Error(`Groq Error: ${response.status} - ${await response.text()}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    if (line === 'data: [DONE]') return;
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.substring(6));
                            if (data.choices && data.choices[0].delta.content) {
                                onChunk(data.choices[0].delta.content);
                            }
                        } catch (err) {
                            // Ignore partial JSON blocks during stream
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error("Groq Stream Error:", error);
        onChunk("\n\n*Error generating response from AI. Please try again.*");
    }
}
