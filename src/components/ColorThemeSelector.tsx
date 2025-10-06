import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

type ColorTheme = "blue" | "green" | "purple" | "orange" | "rose" | "maroon" | "yellow";

const themes = [
  { value: "blue", label: "Blue", color: "hsl(217 91% 60%)" },
  { value: "green", label: "Green", color: "hsl(142 76% 36%)" },
  { value: "purple", label: "Purple", color: "hsl(262 83% 58%)" },
  { value: "orange", label: "Orange", color: "hsl(24 94% 50%)" },
  { value: "rose", label: "Rose", color: "hsl(346 77% 50%)" },
  { value: "maroon", label: "Maroon", color: "hsl(340 82% 42%)" },
  { value: "yellow", label: "Yellow", color: "hsl(45 93% 47%)" },
] as const;

export function ColorThemeSelector() {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("maroon");

  useEffect(() => {
    const savedTheme = localStorage.getItem("color-theme") as ColorTheme;
    if (savedTheme) {
      setColorTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("maroon");
    }
  }, []);

  const applyTheme = (theme: ColorTheme) => {
    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove("theme-green", "theme-purple", "theme-orange", "theme-rose", "theme-maroon", "theme-yellow");

    // Add new theme class (blue is default, no class needed)
    if (theme !== "blue") {
      root.classList.add(`theme-${theme}`);
    }
  };

  const handleThemeChange = (theme: ColorTheme) => {
    setColorTheme(theme);
    applyTheme(theme);
    localStorage.setItem("color-theme", theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-popover z-50">
        <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => handleThemeChange(theme.value as ColorTheme)}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border"
                style={{ backgroundColor: theme.color }}
              />
              <span>{theme.label}</span>
              {colorTheme === theme.value && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
