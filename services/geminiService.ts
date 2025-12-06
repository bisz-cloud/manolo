import { GoogleGenAI } from "@google/genai";

export const generatePhotoTip = async (topic: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Write a short, professional, and creative photography tip or idea related to: "${topic}".
      Target audience: Families or individuals looking for professional photography in Israel.
      Language: Hebrew.
      Tone: Friendly, expert, encouraging.
      Length: About 50-80 words.
      Do not use markdown formatting.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a senior photographer with 20 years of experience running a studio in Kfar Saba.",
        temperature: 0.7,
      }
    });

    return response.text || "לא הצלחנו ליצור טיפ כרגע, נסה שוב מאוחר יותר.";
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "אירעה שגיאה בעת יצירת התוכן. אנא נסה שנית.";
  }
};