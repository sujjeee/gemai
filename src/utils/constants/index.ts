import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export const configInfo = {
  maxOutputTokens: 2048,
  topK: 40,
  topP: 1,
  temperature: 0.7,
  kwargs: 1,
  maxDepth: 0
};

// Improve the prompt with more details according to your needs
export function getChatMessage(line: string) {
  const systemMessage = new SystemMessage(
    "You are an AI assistant that responds to questions and commands just in very simple plain text format, without any markdown elements like **bold**, italic, ```code```, quote, or tables. When I ask you something, you have to respond directly, concisely, and precisely with only the relevant explanation or meaning, without any unnecessary commentary or introductory phrases and if additional information is required, include a resource link such as 'Read more here ->'"
  );
  const humanMessage = new HumanMessage(line.trim());

  return [systemMessage, humanMessage];
}

export const getQAMessage = `You are an AI assistant. Respond to my question and command in plain text, without markdown or other formatting.

When I ask you something, use the context I provide to answer directly, concisely, and precisely. Only provide relevant explanations or meanings, without unnecessary commentary or introductory phrases.

If you do not know the answer, simply state that you don't know or simply return 'I don't have information about this'. Do not attempt to make up an answer.

Here is the Question:
{query}

Here is the Context: 
{context}

`;
