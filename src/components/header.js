import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  useEffect(() => {
    setIsLoggedIn(
      typeof window !== "undefined" && localStorage.getItem("isLoggedIn")
    );
  }, []);

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Index Watch</Link>
        </div>
        {isLoggedIn && (
          <p onClick={handleLogout} className="ml-4 cursor-pointer">
            Logout
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
