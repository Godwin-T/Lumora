import { MessageCircle, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ message }) {
  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div
      className={`flex items-start space-x-3 ${
        message?.isBot ? "" : "justify-end"
      }`}
    >
      {/* {message?.isBot && (
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-4 h-4 text-slate-900" />
        </div>
      )} */}

      <div
        className={`max-w-xs sm:max-w-md lg:max-w-lg ${
          message?.isBot ? "order-2" : "order-1"
        }`}
      >
        {/**UNCOMMENT if using stream chat */}
        {/* <div
          className={`rounded-2xl px-4 py-3 ${
            message?.isBot
              ? "bg-slate-700 text-gray-100"
              : "bg-emerald-500 text-slate-900 ml-auto"
          }`}
        >
          {message?.isBot ? (
            message?.isDone ? (
              // ✅ After streaming ends → render Markdown

              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                <ReactMarkdown>{message?.text || ""}</ReactMarkdown>
              </div>
            ) : (
              // ✅ While streaming → show plain text (typing effect)
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message?.text}
              </p>
            )
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message?.text}
            </p>
          )}
        </div> */}

        <div
          className={`rounded-2xl px-4 py-3 ${
            message?.isBot
              ? "bg-slate-700 text-gray-100"
              : "bg-emerald-500 text-slate-900 ml-auto"
          }`}
        >
          {/* <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message?.text}
          </p> */}
          <div
            className="text-sm leading-relaxed"
            components={{
              p: ({ node, ...props }) => (
                <p className="mb-1 last:mb-0" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc ml-4 mb-1 last:mb-0" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal ml-4 mb-1 last:mb-0" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-0.5 last:mb-0" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold" {...props} />
              ),
              em: ({ node, ...props }) => <em className="italic" {...props} />,
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code
                    className="px-1 py-0.5 rounded bg-slate-600 text-xs"
                    {...props}
                  />
                ) : (
                  <pre className="bg-slate-800 p-2 rounded text-xs overflow-x-auto">
                    <code {...props} />
                  </pre>
                ),
            }}
          >
            <ReactMarkdown>{message?.text || ""}</ReactMarkdown>
          </div>
        </div>

        <div
          className={`text-xs text-gray-500 mt-1 ${
            message?.isBot ? "text-left" : "text-right"
          }`}
        >
          {formatTime(message?.timestamp)}
        </div>
      </div>

      {/* {!message?.isBot && (
        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 order-3">
          <User className="w-4 h-4 text-gray-300" />
        </div>
      )} */}
    </div>
  );
}
