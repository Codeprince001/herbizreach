import { NextResponse } from "next/server";

/** Keep in sync with the `firebase` package version in package.json (compat CDN). */
const FIREBASE_JS_CDN_VERSION = "11.9.0";

export const dynamic = "force-dynamic";

function webConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
  };
}

/**
 * Service worker for Firebase Cloud Messaging (background notifications).
 * Served at /firebase-messaging-sw.js — same config as the client must be used here.
 */
export async function GET() {
  const config = webConfig();
  const body = `
importScripts('https://www.gstatic.com/firebasejs/${FIREBASE_JS_CDN_VERSION}/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/${FIREBASE_JS_CDN_VERSION}/firebase-messaging-compat.js');
firebase.initializeApp(${JSON.stringify(config)});
firebase.messaging().onBackgroundMessage(function (payload) {
  var title = (payload.notification && payload.notification.title) || 'HerBizReach';
  var bodyText = (payload.notification && payload.notification.body) || '';
  return self.registration.showNotification(title, { body: bodyText });
});
`;
  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
