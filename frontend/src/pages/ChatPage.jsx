import { useAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
  const { logout } = useAuthStore();
  function handleClick(e) {
    e.preventDefault();
    logout();
  }
  return (
    <div className="z-10 flex flex-col gap-4">
      ChatPage
      <button className="btn btn-error text-white" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};

export default ChatPage;
