// components/dashboard/settings/theme-settings.tsx
'use client'

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Moon, Sun, Check } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const THEME_COLORS = ["theme-zinc", "theme-rose", "theme-blue"];

export function ThemeSettings() {
    const { setTheme } = useTheme()
    const [activeColor, setActiveColor] = useState("theme-zinc");

    // Effect to set the initial theme from localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem("app-color-theme") || "theme-zinc";
        applyTheme(storedTheme);
    }, []);

    const applyTheme = (themeName: string) => {
        // Remove any existing theme classes
        document.body.classList.remove(...THEME_COLORS);
        // Add the new theme class
        document.body.classList.add(themeName);
        // Store the preference
        localStorage.setItem("app-color-theme", themeName);
        setActiveColor(themeName);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>โหมด</Label>
                <p className="text-sm text-muted-foreground">
                    เลือกธีมสว่างหรือธีมมืดสำหรับแดชบอร์ด
                </p>
                <div className="flex items-center space-x-2 pt-2">
                    <Button variant="outline" size="lg" onClick={() => setTheme('light')} className="w-full justify-start gap-2">
                        <Sun className="h-4 w-4" />
                        สว่าง
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setTheme('dark')} className="w-full justify-start gap-2">
                        <Moon className="h-4 w-4" />
                        มืด
                    </Button>
                </div>
            </div>
            
            <div className="space-y-2">
                <Label>สี</Label>
                <p className="text-sm text-muted-foreground">
                    เลือกชุดสีหลักของแดชบอร์ด
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                    <div
                        onClick={() => applyTheme("theme-zinc")}
                        className={cn(
                            "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-zinc-500",
                            activeColor === "theme-zinc" && "ring-2 ring-offset-2 ring-offset-background"
                        )}
                    >
                        {activeColor === "theme-zinc" && <Check className="h-5 w-5 text-white" />}
                    </div>
                    <div
                        onClick={() => applyTheme("theme-rose")}
                        className={cn(
                            "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-rose-500",
                            activeColor === "theme-rose" && "ring-2 ring-offset-2 ring-offset-background"
                        )}
                    >
                         {activeColor === "theme-rose" && <Check className="h-5 w-5 text-white" />}
                    </div>
                    <div
                        onClick={() => applyTheme("theme-blue")}
                        className={cn(
                            "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-500",
                            activeColor === "theme-blue" && "ring-2 ring-offset-2 ring-offset-background"
                        )}
                    >
                         {activeColor === "theme-blue" && <Check className="h-5 w-5 text-white" />}
                    </div>
                </div>
            </div>
        </div>
    )
}
