// PageLoader.jsx
export default function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="flex space-x-2">
        <div
          className="w-2 h-12 bg-blue-500 animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-2 h-12 bg-blue-400 animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-12 bg-cyan-500 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-12 bg-indigo-500 animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="w-2 h-12 bg-sky-400 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
}
