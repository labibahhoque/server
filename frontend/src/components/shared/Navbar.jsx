import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg">
      <div className="flex items-center justify-between px-8 h-20 max-w-full">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold">
            Edu<span className="text-orange-500">Track</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-12">
          <ul className="flex gap-8 text-lg">
            <li className="hover:text-orange-500 cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-orange-500 cursor-pointer">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="hover:text-orange-500 cursor-pointer">
              <Link to="/courses">Courses</Link>
            </li>
          </ul>

          {/* User Actions */}
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-10 h-10 rounded-full">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname || "User"}
                    className="rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 shadow-lg rounded-lg bg-white text-gray-800">
                <div className="flex gap-4 items-center">
                  <Avatar className="w-12 h-12 rounded-full">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname || "User"}
                      className="rounded-full"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600 mt-4">
                  {user && user.role === "Job Seeker" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer mt-2">
                      <button className="text-gray-600 hover:text-blue-600">
                        <Link to="/profile">View Profile</Link>
                      </button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer mt-2">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" className="border-white text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
