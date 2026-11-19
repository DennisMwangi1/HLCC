import { postPublic } from "@andishi/runtime";

/**
 * The site's Andishi connection, from the environment (see .env.example). Without a key the
 * site keeps its own content and its email route, so it still runs without Andishi.
 */
export const andishiConfig = {
  apiUrl: (import.meta.env.VITE_ANDISHI_API_URL as string | undefined) ?? "",
  siteKey: (import.meta.env.VITE_ANDISHI_SITE_KEY as string | undefined) ?? "",
  studioOrigin: (import.meta.env.VITE_ANDISHI_STUDIO_ORIGIN as string | undefined) || undefined,
};

export const andishiEnabled = andishiConfig.apiUrl !== "" && andishiConfig.siteKey !== "";

/** A form's answers as readable lines, for the message the studio's inbox shows. */
export function describeAnswers(data: Record<string, unknown>): string {
  return Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0))
    .map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
      const text = Array.isArray(value) ? value.join(", ") : value === true ? "Yes" : value === false ? "No" : String(value);
      return `${label}: ${text}`;
    })
    .join("\n");
}

/**
 * Sends a form to the studio's inbox (the Site API's contact form): the sender, a subject and the
 * answers as the message. The honeypot is the runtime's: left empty by a person.
 */
export async function sendToInbox(input: { name: string; email: string; subject: string; data: Record<string, unknown> }) {
  await postPublic("/site/v1/contact", {
    name: input.name.trim(),
    email: input.email.trim(),
    subject: input.subject.slice(0, 200),
    message: describeAnswers(input.data).slice(0, 5000),
    subscribe: false,
    honeypot: "",
  });
}
