# Skill: Add AI Feature

When adding a new AI-powered button/feature:

## Backend (API route)
1. Create `app/api/ai/<feature-name>/route.ts`
2. Import Gemini client from `@/lib/ai`
3. Accept POST with JSON body containing the text to process
4. Always validate input — reject empty strings
5. Return `{ result: string }` on success

## Frontend (component)
1. Add a button next to the relevant textarea
2. Button shows loading spinner while AI is running (`useState` for `isPolishing`)
3. On success, replace textarea value with AI result
4. On error, show a toast — never crash silently
5. Button text conventions:
   - User ticket form → "✨ Polish It"
   - Admin reply form → "✨ Polish Response"
   - Admin thread view → "📋 Summarize Thread"

## Prompt conventions for this project (AI LMS niche)
- Always mention context: "This is a support ticket for an AI-based tutoring platform"
- Polish Ticket prompt: structure into Title, Course/Issue Type, Description, Expected Outcome, Steps Tried
- Polish Response prompt: professional, empathetic, clear action items, signed off properly
- Summarize Thread: bullet points only, chronological, highlight resolution status
