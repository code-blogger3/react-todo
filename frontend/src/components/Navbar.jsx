import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="fixed w-full px-7 mt-[15px] flex justify-between border border-l-sky-950 border-t-0 border-x-0 pb-2 bg-background">
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
        </NavigationMenuList>
      </NavigationMenu>
      <ModeToggle />
    </nav>
  );
}
export default Navbar;
