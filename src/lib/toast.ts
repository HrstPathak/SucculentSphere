export function showSuccessToast(message: string) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("app-toast", {
      detail: { message },
    })
  );
}
