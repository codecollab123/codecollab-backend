export interface GenerateChatBody {
  message: string; // User input message to the chatbot
  history?: { role: string; parts: { text: string }[] }[]; // Optional conversation history for context
}
