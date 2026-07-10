// import config from "../../config";

// export class EmbeddingService {
//     private apikey: string;
//     private apiUrl: string = "https://openrouter.ai/api/v1"
//     private embeddingModel: string;

//     constructor() {
//         // console.log("Config API Key:", config.openRouterApiKey);

//         this.apikey = config.openRouterApiKey || "";
//         this.embeddingModel =
//             config.openRouterEmbeddingModel ||
//             "nvidia/llama-nemotron-embed-vl-1b-v2:free";

//         if (!this.apikey) {
//             throw new Error("OPEN ROUTER API KEY is not set in .env");
//         }
//     }

//     async generateEmbedding(text: string) {
//         try {
//             const response = await fetch(`${this.apiUrl}/embeddings`, {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${this.apikey}`,
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     input: text,
//                     model: this.embeddingModel,
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error(`Open Router API Error: ${response.status}`);
//             };

//             const data = await response.json();

//             if (!data.data || data.data.length === 0) {
//                 throw new Error("No embedding data returned");
//             };

//             return data.data[0].embedding;

//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

import config from "../../config";

export class EmbeddingService {
    private apikey: string;
    private apiUrl: string = "https://openrouter.ai/api/v1";
    private embeddingModel: string;

    constructor() {
        this.apikey = config.openRouterApiKey || "";
        
        // Use a strong model that supports 2048 dimensions
        this.embeddingModel = config.openRouterEmbeddingModel || 
            "text-embedding-3-large";

        if (!this.apikey) {
            throw new Error("OPENROUTER_API_KEY is not set in .env");
        }
    }

    async generateEmbedding(text: string): Promise<number[]> {
        try {
            const response = await fetch(`${this.apiUrl}/embeddings`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.apikey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    input: text,
                    model: this.embeddingModel,
                    dimensions: 2048          // ← This is the key
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`OpenRouter API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                throw new Error("No embedding returned from API");
            }

            return data.data[0].embedding;

        } catch (error) {
            console.error("❌ Embedding Generation Failed:", error);
            throw error;
        }
    }
}