import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  const navLinks = [];
  /*
{ to: "/", label: "Home" }
  */

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 shadow-md bg-white">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <NavLink to="/" className="mr-6 hidden lg:flex">
            <img src="./logo.png" alt="Just Todo It Icon" />
            <span className="sr-only">Just Todo It</span>
          </NavLink>
          <div className="grid gap-2 py-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={`flex w-full items-center py-2 text-lg font-semibold transition-all ${
                  activeLink === link.to
                    ? "text-blue-600 font-bold"
                    : "text-gray-900"
                }`}
                onClick={() => handleClick(link.to)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Logo */}
      <NavLink to="/" className="mr-6 hidden lg:flex">
        <div className="h-[60px] w-[60px]">
          <img
            src="./logo.png"
            alt="Just Todo It Icon"
            className="object-contain"
          />
        </div>
        <span className="ml-5 font-semibold flex items-center text-xl">
          Just Todo It
        </span>
      </NavLink>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden lg:flex gap-6">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors
              hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none
              disabled:pointer-events-none disabled:opacity-50 
              ${
                isActive
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "bg-white dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              }`
            }
            onClick={() => handleClick(link.to)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
