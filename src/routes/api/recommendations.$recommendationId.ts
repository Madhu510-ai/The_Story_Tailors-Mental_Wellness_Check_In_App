import { createFileRoute } from "@tanstack/react-router";

/**
 * GET /api/recommendations/{recommendationId}
 * Requires a logged-in user token (Authorization: Bearer <token>).
 * 401 unauthorised · 403 recommendation does not belong to user · 404 not found
 */

type Recommendation = {
  recommendationId: string;
  ownerId: string;
  detectedMood: string;
  activityName: string;
  recommendationText: string;
  instructions: string[];
};

const RECOMMENDATIONS: Recommendation[] = [
  {
    recommendationId: "rec_meditation_calm",
    ownerId: "demo-user",
    detectedMood: "Uneasy",
    activityName: "Meditation",
    recommendationText:
      "Your check-in points to tension building through the day. A short guided meditation lowers arousal quickly and makes the rest of the evening easier.",
    instructions: [
      "Sit somewhere quiet and set a 5 minute timer.",
      "Close your eyes and follow your breath without changing it.",
      "When your mind wanders, name the thought and return to the breath.",
      "Finish by noticing one thing that feels lighter.",
    ],
  },
  {
    recommendationId: "rec_journaling_evening",
    ownerId: "demo-user",
    detectedMood: "Neutral",
    activityName: "Journaling",
    recommendationText:
      "Evening reflection is the habit most strongly linked to your better days. Ten minutes of writing helps you spot what actually moved your mood.",
    instructions: [
      "Write the three moments that stood out today.",
      "For each one, note the feeling in a single word.",
      "Add one sentence on what you would repeat tomorrow.",
    ],
  },
  {
    recommendationId: "rec_reflection_mood",
    ownerId: "demo-user",
    detectedMood: "Good",
    activityName: "Reflection",
    recommendationText:
      "You are in a steady, positive place. A brief reflection locks in what is working so it carries into the week.",
    instructions: [
      "Recall the highest point of your day.",
      "Ask what conditions made it possible.",
      "Choose one of those conditions to recreate tomorrow.",
    ],
  },
  {
    recommendationId: "rec_breathing_reset",
    ownerId: "demo-user",
    detectedMood: "Low",
    activityName: "Breathing",
    recommendationText:
      "Stress is the strongest signal in your latest check-in. A three minute breathing reset is the fastest way to bring it down.",
    instructions: [
      "Breathe in through your nose for 4 counts.",
      "Hold gently for 4 counts.",
      "Breathe out slowly for 6 counts.",
      "Repeat for 3 minutes, then re-check how your body feels.",
    ],
  },
];

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

function readToken(request: Request): string | null {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header.trim());
  return match?.[1]?.trim() || null;
}

export const Route = createFileRoute("/api/recommendations/$recommendationId")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const token = readToken(request);
        if (!token) return json({ error: "unauthorised" }, 401);

        const recommendation = RECOMMENDATIONS.find(
          (r) => r.recommendationId === params.recommendationId,
        );
        if (!recommendation) return json({ error: "recommendation not found" }, 404);

        if (recommendation.ownerId !== token) {
          return json({ error: "recommendation does not belong to user" }, 403);
        }

        const { ownerId: _ownerId, ...payload } = recommendation;
        return json(payload, 200);
      },
    },
  },
});
