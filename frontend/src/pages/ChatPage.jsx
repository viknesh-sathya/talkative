import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative w-full max-w-6xl h-[90%]">
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden absolute top-4 left-4 z-50 text-cyan-500"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <BorderAnimatedContainer>
        {/* LEFT SIDE */}
        <div
          className={`
            w-80 bg-slate-800 backdrop-blur-sm flex flex-col h-full z-40
            absolute pt-8 lg:pt-0 lg:relative transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? (
              <ChatsList setIsSidebarOpen={setIsSidebarOpen} />
            ) : (
              <ContactList setIsSidebarOpen={setIsSidebarOpen} />
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-1 flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
