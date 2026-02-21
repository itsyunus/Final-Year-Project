import { BedrockRuntimeClient, ConverseStreamCommand } from "@aws-sdk/client-bedrock-runtime";

export async function fetchBedrockChatStream(messages, apiKeys, onChunk) {
    try {
        let accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
        let secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
        let region = import.meta.env.VITE_AWS_REGION || "us-east-1";
        let modelId = import.meta.env.VITE_BEDROCK_MODEL_ID || "meta.llama3-3-70b-instruct-v1:0";

        if (apiKeys) {
            if (apiKeys.awsAccess) accessKeyId = apiKeys.awsAccess;
            if (apiKeys.awsSecret) secretAccessKey = apiKeys.awsSecret;
            if (apiKeys.awsRegion) region = apiKeys.awsRegion;
            if (apiKeys.awsModelId) modelId = apiKeys.awsModelId;
        }

        if (!accessKeyId || !secretAccessKey) {
            onChunk("\n\n*Error: Missing AWS Bedrock Credentials. Please open the API Configuration panel in the sidebar to enter them.*");
            return;
        }

        const client = new BedrockRuntimeClient({
            region: region,
            credentials: { accessKeyId, secretAccessKey }
        });

        const command = new ConverseStreamCommand({
            modelId: modelId,
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
