"use client";

import { useEffect, useRef } from "react";
import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
import { toast } from "sonner";
import api from "@/lib/axios";
import { initFirebaseAppClient } from "@/lib/firebase-client";
import { useAuthStore } from "@/stores/useAuthStore";

/**
 * Registers the browser for FCM when a store owner is logged in (chat push).
 * Requires NEXT_PUBLIC_FIREBASE_* and NEXT_PUBLIC_FIREBASE_VAPID_KEY.
 */
export function FcmOwnerRegistrar() {
  const token = useAuthStore((s) => s.token);
  const role = useAuthStore((s) => s.user?.role);
  const fcmTokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (!token || role !== "OWNER") return;
    const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
    if (!vapidKey) return;

    let cancelled = false;
    let unsubscribeOnMessage: (() => void) | undefined;

    void (async () => {
      const supported = await isSupported().catch(() => false);
      if (!supported || cancelled) return;

      const app = initFirebaseAppClient();
      if (!app) return;

      try {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
          scope: "/",
        });
        await navigator.serviceWorker.ready;

        const messaging = getMessaging(app);
        const fcmToken = await getToken(messaging, {
          vapidKey,
          serviceWorkerRegistration: registration,
        });
        if (!fcmToken || cancelled) return;
        fcmTokenRef.current = fcmToken;
        await api.post("/notifications/push-tokens", { token: fcmToken });

        unsubscribeOnMessage = onMessage(messaging, (payload) => {
          const t = payload.notification?.title ?? "HerBizReach";
          const b = payload.notification?.body ?? "";
          toast.info(t, { description: b });
        });
      } catch (e) {
        console.warn("[FCM] registration failed", e);
      }
    })();

    return () => {
      cancelled = true;
      unsubscribeOnMessage?.();
    };
  }, [token, role]);

  useEffect(() => {
    if (token) return;
    const t = fcmTokenRef.current;
    if (!t) return;
    fcmTokenRef.current = null;
    void api.post("/notifications/push-tokens/unregister", { token: t }).catch(() => undefined);
  }, [token]);

  return null;
}
