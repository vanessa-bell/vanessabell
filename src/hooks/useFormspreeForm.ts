import { useState } from "react";

export type FormspreeStatus = "idle" | "sending" | "sent" | "error";

export function useFormspreeForm(url: string) {
  const [status, setStatus] = useState<FormspreeStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(url, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return { status, handleSubmit };
}
