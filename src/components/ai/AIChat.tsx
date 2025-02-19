
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

interface AIChatProps {
  moduleTitle: string;
}

export function AIChat({ moduleTitle }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      text: `Welcome! I'm here to help you with the "${moduleTitle}" module. What would you like to know?`,
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "user" },
    ]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: `I can help you understand concepts from the "${moduleTitle}" module. What specific topic would you like to explore?`,
          sender: "ai",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col p-4">
      <ScrollArea className="flex-1 pr-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block max-w-[85%] px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="flex gap-2 mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about the ${moduleTitle} module...`}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1"
        />
        <Button onClick={handleSend}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
