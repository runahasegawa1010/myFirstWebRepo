import { differenceInMilliseconds } from "date-fns";
import { NEGLECT_THRESHOLD_MS } from "./config.js";

export function computeStage(totalLogs: number, lastFedAt: Date) {
  const ms = differenceInMilliseconds(new Date(), lastFedAt);

  if (ms > NEGLECT_THRESHOLD_MS) {
    return { stage: "Cooked", stageEmoji: "🍗", cooked: true };
  }

  if (totalLogs === 0) return { stage: "Egg", stageEmoji: "🥚", cooked: false };
  if (totalLogs <= 4) return { stage: "Hatching", stageEmoji: "🐣", cooked: false };
  if (totalLogs <= 14) return { stage: "Growing", stageEmoji: "🐥", cooked: false };
  return { stage: "Grown", stageEmoji: "🐓", cooked: false };
}