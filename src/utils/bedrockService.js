import { BedrockRuntimeClient, ConverseStreamCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    }
});

export async function fetchBedrockChatStream(messages, onChunk) {
    try {
        const command = new ConverseStreamCommand({
            modelId: import.meta.env.VITE_BEDROCK_MODEL_ID,
            messages: messages.filter(m => m.role !== 'system').map(m => ({
                role: m.role,
                content: [{ text: m.content }]
            })),
            system: messages.filter(m => m.role === 'system').map(m => ({ text: m.content })),
            inferenceConfig: {
                temperature: 0.3
            }
        });

        const response = await client.send(command);

        for await (const item of response.stream) {
            if (item.contentBlockDelta) {
                onChunk(item.contentBlockDelta.delta?.text || "");
            }
        }
    } catch (err) {
        console.error("Bedrock Stream Error:", err);
        onChunk("\n\n*Error: Failed to fetch from AWS Bedrock using the provided keys.*");
    }
}
