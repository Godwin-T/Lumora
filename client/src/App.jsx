import { useEffect, useState } from "react";
import ChatbotComponent from "./components/ChatbotComponent";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Settings from "./components/Settings";

import {
  getAllSessions,
  saveSession,
  deleteSession as dbDeleteSession,
} from "./lib/db";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const [currentView, setCurrentView] = useState("chat");
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, error, handleLogin, handleSignup, handleLogout, setError } =
    useAuth(setCurrentView);

  const selectSession = (session) => {
    setCurrentSession(session);
    setCurrentView("chat");
  };

  const createNewSession = () => {
    if (!user?.isPremium && chatSessions.length > 0) return;

    const newCount =
      chatSessions.filter((s) => s && s.title?.startsWith("New Conversation"))
        .length + 1;

    const newSession = {
      id: Date.now().toString(),
      title: user?.isPremium ? `New Conversation ${newCount}` : "Free Chat",
      lastMessage: "",
      timestamp: new Date(),
      messages: [],
      userId: user?.id || "free",
    };

    setChatSessions((prev) => [newSession, ...prev]);
    setCurrentSession(newSession);

    if (user?.isPremium) {
      saveSession(newSession);
    } else {
      localStorage.setItem("freeUserChat", JSON.stringify([]));
    }

    setCurrentView("chat");
  };

  const updateSession = (updatedSession) => {
    if (!updatedSession) return;

    const sessionToSave = {
      ...updatedSession,
      timestamp: new Date(),
    };

    if (sessionToSave.messages.length > 0) {
      const lastMsg = sessionToSave.messages[sessionToSave.messages.length - 1];
      sessionToSave.lastMessage = lastMsg.text;

      if (sessionToSave.title?.startsWith("New Conversation")) {
        const firstMsg = sessionToSave.messages[0]?.text || "Untitled";
        sessionToSave.title = `Chat about: ${firstMsg.slice(0, 30)}`;
      }
    }

    if (user?.isPremium) {
      setChatSessions((prev) =>
        prev
          .map((s) => (s.id === sessionToSave.id ? sessionToSave : s))
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      );
      setCurrentSession(sessionToSave);
      saveSession(sessionToSave);
    } else {
      localStorage.setItem(
        "freeUserChat",
        JSON.stringify(sessionToSave.messages || [])
      );
      setCurrentSession(sessionToSave);
      setChatSessions([sessionToSave]);
    }
  };

  const deleteSession = async (sessionId) => {
    if (!sessionId) return;

    if (user?.isPremium) {
      setChatSessions((prev) => prev.filter((s) => s?.id !== sessionId));
      if (currentSession?.id === sessionId) setCurrentSession(null);
      try {
        await dbDeleteSession(sessionId);
      } catch (err) {
        console.error("Failed to delete session from IndexedDB:", err);
      }
    } else {
      localStorage.removeItem("freeUserChat");
      setChatSessions([]);
      setCurrentSession(null);
    }
  };

  useEffect(() => {
    if (user?.isPremium) {
      getAllSessions(user.id).then((sessions) => setChatSessions(sessions));
    } else {
      const saved = localStorage.getItem("freeUserChat");
      if (saved) {
        const messages = JSON.parse(saved);
        const defaultSession = {
          id: "free-session",
          title: "Free Chat",
          messages,
          timestamp: new Date(),
        };
        setCurrentSession(defaultSession);
        setChatSessions([defaultSession]);
      } else {
        setCurrentSession(null);
        setChatSessions([]);
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header
        user={user}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onCreateNewSession={createNewSession}
        canCreateNew={!!user?.isPremium}
      />

      <main className="container mx-auto px-4 pt-2 md:py-8 max-w-6xl">
        {currentView === "chat" && (
          <ChatbotComponent
            user={user}
            currentSession={currentSession}
            onUpdateSession={updateSession}
            onLogin={() => setCurrentView("login")}
          />
        )}

        {currentView === "login" && (
          <LoginForm
            onLogin={async (data) => {
              const newUser = await handleLogin(data);
              if (newUser) setCurrentView("dashboard");
            }}
            onSwitchToSignup={() => setCurrentView("signup")}
            onCancel={() => setCurrentView("chat")}
            error={error}
            setError={setError}
          />
        )}

        {currentView === "signup" && (
          <SignupForm
            onSignup={async (data) => {
              const newUser = await handleSignup(data);
              if (newUser) setCurrentView("dashboard");
            }}
            onSwitchToLogin={() => setCurrentView("login")}
            onCancel={() => setCurrentView("chat")}
            error={error}
            setError={setError}
          />
        )}

        {currentView === "dashboard" && user?.isPremium && (
          <Dashboard
            user={user}
            chatSessions={chatSessions}
            onSelectSession={selectSession}
            onCreateNewSession={createNewSession}
            onDeleteSession={deleteSession}
          />
        )}

        {currentView === "settings" && user && <Settings user={user} />}
      </main>
    </div>
  );
};

export default App;
