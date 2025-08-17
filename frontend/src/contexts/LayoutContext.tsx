
// contexts/LayoutContext.tsx
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

type Theme = "light" | "dark";

export type LayoutContextValue = {
    title: string;
    setTitle: (t: string) => void;
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    theme: Theme;
    setTheme: (t: Theme) => void;
    toggleTheme: () => void;
};

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

export const LayoutProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [title, setTitle] = useState<string>("My App");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [theme, setTheme] = useState<Theme>("light");

    // Load theme from localStorage on mount (only on client side)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("app-theme") as Theme;
            if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
                setTheme(savedTheme);
            }
        }
    }, []);

    // Save theme to localStorage and update document title
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("app-theme", theme);
            document.title = title;
            // Update document class for global theming
            document.documentElement.setAttribute("data-theme", theme);
        }
    }, [theme, title]);

    // Create dynamic MUI theme based on current theme
    const muiTheme = useMemo(() => createTheme({
        palette: {
            mode: theme,
            primary: { 
                main: theme === "dark" ? "#90caf9" : "#1976d2" 
            },
            secondary: { 
                main: theme === "dark" ? "#ce93d8" : "#9c27b0" 
            },
            background: {
                default: theme === "dark" ? "#0b0b0b" : "#ffffff",
                paper: theme === "dark" ? "#1e1e1e" : "#ffffff",
            },
        },
    }), [theme]);

    const value = useMemo<LayoutContextValue>(() => ({
        title,
        setTitle,
        sidebarOpen,
        toggleSidebar: () => setSidebarOpen((s) => !s),
        theme,
        setTheme,
        toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
    }), [title, sidebarOpen, theme]);

    return (
        <LayoutContext.Provider value={value}>
            <ThemeProvider theme={muiTheme}>
                {children}
            </ThemeProvider>
        </LayoutContext.Provider>
    );
};

export const useLayout = () => {
    const ctx = useContext(LayoutContext);
    if (!ctx) {
        // In development, warn about missing provider
        if (process.env.NODE_ENV === 'development') {
            console.warn("useLayout must be used within a LayoutProvider");
        }
        
        // Return default values to prevent crashes
        return {
            title: "My App",
            setTitle: () => {},
            sidebarOpen: false,
            toggleSidebar: () => {},
            theme: "light" as Theme,
            setTheme: () => {},
            toggleTheme: () => {},
        };
    }
    return ctx;
};
