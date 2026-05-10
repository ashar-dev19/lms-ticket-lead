import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })
const MODEL = "gemini-2.5-flash"
  
async function generate(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({ model: MODEL, contents: prompt })
  return response.text ?? ""
}

const LMS_CONTEXT =
  "This is a support ticket system for an AI-based online learning platform where students interact with AI tutors across school subjects."

export async function polishTicket(rawBody: string): Promise<string> {
  const prompt = `${LMS_CONTEXT}

A student wrote this in rough, informal language:
"${rawBody}"

Rewrite it as a single, clear, professional paragraph (or two short paragraphs if needed). Keep all the original details and meaning — just make the language formal, descriptive, and easy for a support admin to understand. Do not add sections, headers, or bullet points. Do not invent any details not present in the original. Output only the rewritten description, nothing else.`

  return generate(prompt)
}

export async function polishResponse(rawReply: string, ticketContext: string): Promise<string> {
  const prompt = `${LMS_CONTEXT}

A support admin wrote this reply to a student ticket:
"${rawReply}"

The ticket context is:
"${ticketContext}"

Rewrite the admin's reply to be professional, empathetic, and action-oriented. Keep it concise (3-5 sentences max). Include:
- Acknowledge the student's issue
- Provide a clear answer or next steps
- Warm, supportive closing line

Output only the reply text. No markdown, no asterisks, no labels. Do not change the factual content. Do not add information not present in the original reply.`

  return generate(prompt)
}

export async function summarizeThread(
  ticketTitle: string,
  ticketBody: string,
  replies: Array<{ authorName: string; body: string; createdAt: Date }>
): Promise<string> {
  const thread = replies
    .map((r) => `${r.authorName} (${new Date(r.createdAt).toLocaleDateString()}): ${r.body}`)
    .join("\n\n")

  const prompt = `${LMS_CONTEXT}

Summarize this support ticket thread for a busy admin in bullet points.

**Original Ticket:** ${ticketTitle}
${ticketBody}

**Conversation:**
${thread || "No replies yet."}

Provide a concise plain-text summary (no markdown, no asterisks) with bullet points using • character:
• What the student's issue was
• What steps were taken or responses given
• Current status and any pending action items

Keep it under 8 bullet points. Be factual, no opinions. Output only the summary, nothing else.`

  return generate(prompt)
}
