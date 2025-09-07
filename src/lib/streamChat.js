export async function streamChat({
  url = `${import.meta.env.VITE_API_URL || "/api"}/chat/stream/anonymous`,
  body,
  onChunk,
  onDone,
  onError,
  signal,
}) {
  try {
    console.log("[streamChat] Sending request to:", url, "with body:", body);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify(body),
      signal,
    });

    console.log("[streamChat] Response status:", res.status);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    if (!res.body) {
      throw new Error("ReadableStream not supported.");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log("[streamChat] Stream finished");
        break;
      }

      const chunkText = decoder.decode(value, { stream: true });
      console.log("[streamChat] Raw chunk:", JSON.stringify(chunkText));
      buffer += chunkText;

      // Try to parse SSE events (split by \n\n)
      const events = buffer.split("\n\n");
      buffer = events.pop() || ""; // keep incomplete part

      for (const evt of events) {
        if (!evt.trim() || evt.startsWith(":")) {
          continue; // ignore keep-alive / comments
        }

        const lines = evt.split("\n");
        const dataLines = lines
          .filter((l) => l.startsWith("data:"))
          .map((l) => l.replace(/^data:\s?/, ""));

        let payload;
        if (dataLines.length > 0) {
          // SSE format
          payload = dataLines.join("\n");
        } else {
          // plain text fallback
          payload = evt.trim();
        }

        console.log("[streamChat] Parsed payload:", payload);

        if (payload === "[DONE]" || payload === "__DONE__") {
          console.log("[streamChat] DONE signal received");
          onDone?.();
          return;
        }

        onChunk?.(payload);
      }
    }

    // Flush any remaining buffer as plain text
    if (buffer.trim()) {
      console.log("[streamChat] Flushing leftover buffer:", buffer);
      onChunk?.(buffer);
    }

    onDone?.();
  } catch (err) {
    console.error("[streamChat] Error:", err);
    onError?.(err);
  }
}
