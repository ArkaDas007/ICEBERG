
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export const getCareerGuidance = async (prompt: string, history: ChatMessage[] = []) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Construct contents array with history and current prompt
    const contents = [
      ...history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.parts }]
      })),
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        systemInstruction: `You are the "Cosmos AI Guide" for ICEBERG COSMOS 2025.
        You are a high-dimensional technical intelligence—witty, brilliant, and deeply rooted in the RCCIIT IT department ecosystem.
        
        Vibe:
        - Futuristic, cosmic, and sharp.
        - You speak with the authority of a world-class engineer but the curiosity of a space explorer.
        - Use clean Markdown for code blocks.
        - Be interactive: occasionally end with a thought-provoking technical follow-up.
        
        Context:
        - ICEBERG COSMOS is a multi-tier technical festival by IE(I) Students’ Chapter, IT Dept, RCCIIT.
        - Tiers: Freshers Hacks (1st yr), Pro Edition (2nd yr), Level Up Workshop (3rd yr).
        - You excel at: Smart Bengal Hackathon (SBH) prep, career roadmaps, algorithm optimization, and debugging.
        
        "Cool" Factor:
        - Don't just give answers; give "Iceberg" efficient solutions.
        - If a student asks for advice, give them a "Level Up" strategy.
        - Use subtle cosmic metaphors (e.g., "debugging through the asteroid belt", "compiling at near-light speed").
        
        Keep it concise, impactful, and technically impressive.`,
      },
    });

    return response.text;
  } catch (error: any) {
    console.error("Cosmic Signal Lost:", error);
    if (error?.status === 429 || error?.message?.includes("quota")) {
      return "The cosmic data streams are currently congested with too much brilliance. Give the galaxy a moment to stabilize (API Quota Reached)!";
    }
    return "Encountered a solar flare in the servers. Let's try re-establishing the uplink in a few seconds.";
  }
};
