import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from "./telegram.server";

const schema = z.object({
  name: z.string().trim().min(1, "Введите имя").max(80),
  contact: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Слишком коротко").max(2000),
  captchaA: z.number().int().min(0).max(20),
  captchaB: z.number().int().min(0).max(20),
  captchaAnswer: z.number().int(),
});

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export const sendSuggestion = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    if (data.captchaA + data.captchaB !== data.captchaAnswer) {
      return { ok: false as const, error: "Неверный ответ на капчу" };
    }

    const text =
      `🚀 <b>Liskeght Planet — новая заявка</b>\n\n` +
      `<b>Имя:</b> ${escapeHtml(data.name)}\n` +
      (data.contact ? `<b>Контакт:</b> ${escapeHtml(data.contact)}\n` : "") +
      `\n<b>Сообщение:</b>\n${escapeHtml(data.message)}`;

    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "HTML" }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("Telegram send failed", res.status, body);
      return { ok: false as const, error: "Не удалось отправить. Попробуйте позже." };
    }
    return { ok: true as const };
  });
