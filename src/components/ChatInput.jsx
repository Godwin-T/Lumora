import { useEffect } from "react";
import MessageBubble from "./ChatMessage";
import { useRef } from "react";
import FileUpload from "./FileUpload";
import { Send } from "lucide-react";

export default function ChatInput({
  inputText,
  setInputText,
  onSendMessage,
  onFileSelect,
  isLoading,
  user,
}) {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!inputText.trim() || isLoading) return;
      onSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputText]);

  return (
    <div className="w-full">
      <div className="flex bg-slate-700 rounded-4xl items-center gap-1 md:gap-3 px-3 md:py-2">
        {user?.isPremium && (
          <FileUpload onFileSelect={onFileSelect} variant="icon" />
        )}
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me about Nigerian tax laws..."
          className="w-full px-1 py-5 md:px-3 md:py-5 resize-none transition-all placeholder-gray-400 border-none outline-none text-sm leading-6 scrollbar-custom-width"
          rows={1}
          style={{ minHeight: "36px", maxHeight: "100px" }}
        />
        <button
          onClick={onSendMessage}
          disabled={(!inputText.trim() && !isLoading) || isLoading}
          className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
            inputText.trim() && !isLoading
              ? "bg-[#4ade80] text-[#1f2937] hover:bg-[#30c522]"
              : "bg-slate-600 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 bg-slate-600 border-3 border-[#30c522] border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5 " />
          )}
        </button>
      </div>
    </div>
  );
}
