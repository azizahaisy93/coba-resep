
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateRecipe(ingredients: string[]): Promise<string> {
  const model = "gemini-2.5-flash";
  const ingredientsString = ingredients.join(', ');

  const prompt = `
    Anda adalah seorang koki ahli dari Indonesia yang kreatif dan handal. 
    Tugas Anda adalah membuat resep masakan yang lezat dan mudah diikuti hanya dengan menggunakan bahan-bahan yang diberikan.
    
    Bahan-bahan yang tersedia: ${ingredientsString}.

    Tolong buatkan satu resep masakan. Jika bahan yang diberikan sangat sedikit, berkreasilah semaksimal mungkin atau sarankan resep yang paling sederhana.
    
    Struktur respons harus sebagai berikut, dalam format markdown:
    # [Nama Resep yang Menarik]
    ## Bahan-bahan
    - [Daftar semua bahan yang dibutuhkan, termasuk yang sudah diberikan dan tambahan sederhana seperti garam, gula, air, atau minyak jika mutlak diperlukan. Berikan takaran yang jelas.]
    ## Instruksi
    1. [Langkah pertama]
    2. [Langkah kedua]
    3. [dan seterusnya...]

    Pastikan seluruh respons dalam Bahasa Indonesia.
    `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating recipe with Gemini API:", error);
    throw new Error("Failed to communicate with the recipe AI.");
  }
}
