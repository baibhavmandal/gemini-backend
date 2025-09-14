import axios from "axios";
import process from "process";
import dotenv from "dotenv";

dotenv.config();

export const generateGeminiContent = async (content) => {
  const default_content =
    "Write a short welcome message to user, as this API helps them connect with gemini API";
  try {
    const response = await axios.post(
      process.env.GEMINI_API_URI,
      {
        contents: [
          {
            parts: [
              {
                text: content || default_content,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const candidate = response.data?.candidates[0];
    const generatedText = candidate?.content?.parts[0]?.text;
    return generatedText;
  } catch (error) {
    console.error("Gemini API", error);
    throw error;
  }
};
