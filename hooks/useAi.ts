import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AiService } from "@/services/ai.service";

export function useImproveDescription() {
  return useMutation({
    mutationFn: AiService.improveDescription,
    onError: () => toast.error("AI is unavailable. Try again later."),
  });
}

/** No global toast: caller may fall back to offline SKU if this fails. */
export function useSuggestSku() {
  return useMutation({
    mutationFn: AiService.suggestSku,
  });
}

export function useSuggestInboxReplies() {
  return useMutation({
    mutationFn: AiService.suggestInboxReplies,
    onError: () => toast.error("Could not generate replies. Try again later."),
  });
}
