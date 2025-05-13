
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <div className="mx-auto w-full max-w-md space-y-6">
        <h1 className="text-6xl font-bold text-navy-800">404</h1>
        <p className="text-xl text-gray-600">Oops! Page not found</p>
        <p className="text-gray-500">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700">
            <Home size={16} />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
