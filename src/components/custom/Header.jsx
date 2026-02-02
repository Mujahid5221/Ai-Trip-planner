import React, { useEffect, useState } from "react";
import axios from "axios";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LogOut,
  PlusCircle,
  MapPin,
  Menu,
  X,
} from "lucide-react";

function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResp) => getUserProfile(tokenResp),
    onError: (error) => console.log(error),
  });

  const getUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Google user data:", resp.data); // 🔍 debug

      localStorage.setItem("user", JSON.stringify(resp.data));
      setUser(resp.data);
      setOpenDialog(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
  };

  const profileImg = user?.picture
    ? `${user.picture}?t=${Date.now()}`
    : "/default-avatar.png";

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm border-b px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img src="./logo.svg" className="h-9 w-9" alt="Logo" />
        <h2 className="ml-2 text-xl font-bold">TrekTailor</h2>
      </a>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <>
            <a href="/create-trip">
              <Button>
                <PlusCircle size={18} /> Create Trip
              </Button>
            </a>

            <a href="/my-trips">
              <Button variant="outline">
                <MapPin size={18} /> My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={profileImg}
                  referrerPolicy="no-referrer"   // ✅ FIX
                  className="h-10 w-10 rounded-full border"
                  alt="Profile"
                />
              </PopoverTrigger>

              <PopoverContent>
                <div className="flex gap-3 items-center border-b pb-2">
                  <img
                    src={profileImg}
                    referrerPolicy="no-referrer" // ✅ FIX
                    className="h-10 w-10 rounded-full"
                    alt="Profile"
                  />
                  <div>
                    <p>{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-3 w-full text-red-600 flex gap-2"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Welcome to TrekTailor
            </DialogTitle>
            <DialogDescription className="text-center">
              Sign in with Google
            </DialogDescription>
          </DialogHeader>

          <Button onClick={login} className="w-full mt-4 flex gap-3">
            <FcGoogle size={22} /> Sign in with Google
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
