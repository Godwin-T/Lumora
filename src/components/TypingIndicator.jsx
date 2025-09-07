export default function TypingIndicator() {
  return (
    <div className="flex items-start space-x-3">
      <div className="bg-slate-700 rounded-2xl px-4 py-3 max-w-xs">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
