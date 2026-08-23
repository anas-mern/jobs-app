import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/login");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div style={{height:'100vh'}} className="bg-dark fullscreen-center items-center bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="p-8 rounded-2xl shadow-2xl text-center max-w-md animate-fadeIn">
        <h1 className="text-3xl font-bold text-white mb-4">
          You Need To Have An Account
        </h1>
        <p className="text-white mb-6">
          You Are Not Authenticated (Error 401) ❌
        </p>
      </div>
    </div>
  );
}
