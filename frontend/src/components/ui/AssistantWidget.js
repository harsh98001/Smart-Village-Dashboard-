import React, { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import usePageMeta from "../../hooks/usePageMeta";
import { formatTime } from "../../utils/formatters";
import apiClient from "../../api/client";

const quickQuestions = [
  "What does this page do?",
  "How do I view village data?",
  "What analytics are available?"
];

const buildFallbackAnswer = (question, pageMeta, villageCount) => {
  const normalized = question.toLowerCase();

  if (normalized.includes("what does this page")) {
    return `You are currently viewing the ${pageMeta.title} page. ${pageMeta.description}`;
  }

  if (normalized.includes("village data")) {
    return "Use the village cards on the landing page or the Search & Filter module to open a village detail view with full metrics.";
  }

  if (normalized.includes("analytics")) {
    return "The dashboard includes cards, tables, and Chart.js visualisations for growth, literacy, irrigation, water, infrastructure, energy, health, and education indicators.";
  }

  return `I can guide you through ${pageMeta.title} and help explain the ${villageCount} village records currently prepared in the dashboard.`;
};

const AssistantWidget = () => {
  const { villages } = useData();
  const pageMeta = usePageMeta();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "greeting",
      role: "assistant",
      text: "Hello. I’m your Smart Village assistant. Open me anytime for page guidance, navigation help, or quick analytics explanations.",
      time: new Date().toISOString()
    }
  ]);

  useEffect(() => {
    setMessages((currentMessages) => {
      const lastMessage = currentMessages[currentMessages.length - 1];
      if (lastMessage?.pageKey === pageMeta.key) {
        return currentMessages;
      }

      return currentMessages.concat({
        id: `${pageMeta.key}-${Date.now()}`,
        role: "assistant",
        text: `You are currently viewing the ${pageMeta.title} page. ${pageMeta.description}`,
        time: new Date().toISOString(),
        pageKey: pageMeta.key
      });
    });
  }, [pageMeta.description, pageMeta.key, pageMeta.title]);

  const submitQuestion = async (question) => {
    const prompt = question.trim();
    if (!prompt) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: prompt,
      time: new Date().toISOString()
    };

    setMessages((currentMessages) => currentMessages.concat(userMessage));
    setInput("");
    setLoading(true);

    try {
      const response = await apiClient.post("/assistant/query", {
        routeKey: pageMeta.key === "village-detail" ? "dashboard" : pageMeta.key,
        question: prompt,
        villages: villages.slice(0, 30).map((village) => ({
          name: village.name,
          state: village.state
        }))
      });

      setMessages((currentMessages) =>
        currentMessages.concat({
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: response.data?.answer || buildFallbackAnswer(prompt, pageMeta, villages.length),
          time: new Date().toISOString()
        })
      );
    } catch (_error) {
      setMessages((currentMessages) =>
        currentMessages.concat({
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: buildFallbackAnswer(prompt, pageMeta, villages.length),
          time: new Date().toISOString()
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return <div className="assistant-widget">
  {open
        ? <div key="panel" className="assistant-panel">
    <div key="header" className="assistant-header">
      <div key="titleBlock" className="assistant-header-copy">
        <strong key="title">Smart AI Assistant</strong>
        <span key="subtitle">
          {pageMeta.title}
        </span>
      </div>
      <button key="close" type="button" className="assistant-close" onClick={() => setOpen(false)}>×</button>
    </div>
    <div key="messages" className="assistant-messages">
      {messages.map((message) =>
                    <div key={message.id} className={`assistant-message ${message.role}`}>
        <p key="text">
          {message.text}
        </p>
        <span key="time" className="assistant-time">
          {formatTime(message.time)}
        </span>
      </div>
                  ).concat(
                    loading
                      ? [
                          <div key="typing" className="assistant-message assistant typing">
        <p key="dots">Typing...</p>
      </div>
                        ]
                      : []
                  )}
    </div>
    <div key="chips" className="assistant-chips">
      {quickQuestions.map((question) =>
                    <button key={question} type="button" className="assistant-chip" onClick={() => submitQuestion(question)}>
        {question}
      </button>
                  )}
    </div>
    <form key="form" className="assistant-form" onSubmit={(event) => {
                    event.preventDefault();
                    submitQuestion(input);
                  }}>
      <input key="input" className="form-control" placeholder="Ask about the current page or dashboard..." value={input} onChange={(event) => setInput(event.target.value)} />
      <button key="send" type="submit" className="btn btn-smart-primary">Send</button>
    </form>
  </div>
        : null}
  <button key="trigger" type="button" className="assistant-trigger" onClick={() => setOpen((currentState) => !currentState)}>🤖</button>
</div>;
};

export default AssistantWidget;

