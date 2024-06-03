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

function Navbar() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
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
      <nav className="fixed w-full px-7 pt-[1rem] flex justify-between border border-l-sky-950 border-t-0 border-x-0 pb-2 bg-background sm:hidden">
        <NavigationMenu>
          <NavigationMenuList className="gap-5">
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
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex gap-3 items-center">
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
