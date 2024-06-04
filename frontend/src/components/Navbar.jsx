import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import axios from "axios";
import { useQuery } from "react-query";
import { signOutUser } from "@/redux/user/userSlice";
import { useState } from "react";
import { Button } from "./ui/button";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const userLogOutApi = async () => {
    return await axios.post("/api/auth/logout");
  };

  const { refetch } = useQuery({
    queryKey: ["user_logout"],
    queryFn: () => userLogOutApi(),
    enabled: false,
  });

  function handleSignOut() {
    dispatch(signOutUser());
    refetch();
    navigate("/login");
  }

  return (
    <>
      <nav className="fixed w-full px-7 pt-[1rem] flex justify-between border border-l-sky-950 border-t-0 border-x-0 pb-2 bg-background ">
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-5">
            <Navlinks />
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex w-[75px] justify-end md:hidden">
          <Button variant="ghost" onClick={toggleNavbar}>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </Button>
        </div>

        {isOpen && (
          <NavigationMenu className="">
            <NavigationMenuList className="flex basis-full flex-col items-center gap-5">
              <Navlinks />
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <div className="flex gap-3 items-start">
          {user?.username ? (
            <div className="mr-[9px]">
              <DropdownMenu>
                <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{user?.username}</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    SignOUt
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <NavigationMenuItem
                className={navigationMenuTriggerStyle()}
                onClick={() => navigate("/login")}
              >
                Sign In
              </NavigationMenuItem>
              <NavigationMenuItem
                className={navigationMenuTriggerStyle()}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </NavigationMenuItem>
            </>
          )}
          <ModeToggle />
        </div>
      </nav>
    </>
  );
}
export default Navbar;

const Navlinks = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavigationMenuItem
        className={navigationMenuTriggerStyle()}
        onClick={() => navigate("/home")}
      >
        Home
      </NavigationMenuItem>
      <NavigationMenuItem
        className={navigationMenuTriggerStyle()}
        onClick={() => navigate("/")}
      >
        Create Todo
      </NavigationMenuItem>
      <NavigationMenuItem
        className={navigationMenuTriggerStyle()}
        onClick={() => navigate("/dashboard")}
      >
        Dashboard
      </NavigationMenuItem>
    </>
  );
};
