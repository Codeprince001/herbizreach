import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import type { AuthUser } from "@/types/auth.types";

function postLoginRedirect(user: AuthUser, router: ReturnType<typeof useRouter>) {
  if (user.role === "ADMIN") {
    router.replace("/admin");
    return;
  }
  if (user.role === "OWNER") {
    router.replace("/dashboard");
    return;
  }
  router.replace("/");
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      AuthService.login(email, password),
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      postLoginRedirect(data.user, router);
    },
    onError: () => toast.error("Invalid email or password."),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => AuthService.forgotPassword(email),
    onSuccess: (data) => {
      toast.success("Check your email", {
        description: data.message,
      });
    },
    onError: (err: unknown) => {
      const msg =
        err && typeof err === "object" && "response" in err
          ? String(
              (err as { response?: { data?: { message?: string | string[] } } }).response?.data
                ?.message ?? "",
            )
          : "";
      toast.error(typeof msg === "string" && msg ? msg : "Could not send reset email.");
    },
  });
}

export function useResetPassword() {
  const router = useRouter();
  return useMutation({
    mutationFn: AuthService.resetPassword,
    onSuccess: (data) => {
      toast.success("Password updated", { description: data.message });
      router.replace("/login");
    },
    onError: (err: unknown) => {
      const raw =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string | string[] } } }).response?.data
              ?.message
          : undefined;
      const msg = Array.isArray(raw) ? raw[0] : raw;
      toast.error(typeof msg === "string" && msg ? msg : "Reset failed. Try again or request a new code.");
    },
  });
}

export function useRegisterOwner() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();
  return useMutation({
    mutationFn: AuthService.registerOwner,
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      router.replace("/dashboard");
    },
    onError: (err: unknown) => {
      const msg =
        err && typeof err === "object" && "response" in err
          ? String(
              (err as { response?: { data?: { message?: string } } }).response?.data
                ?.message ?? "",
            )
          : "";
      toast.error(msg || "Registration failed.");
    },
  });
}
