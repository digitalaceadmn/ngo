import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

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

    // Keep the document title in sync
    useEffect(() => {
        if (typeof document !== "undefined") document.title = title;
    }, [title]);

    const value = useMemo<LayoutContextValue>(() => ({
        title,
        setTitle,
        sidebarOpen,
        toggleSidebar: () => setSidebarOpen((s) => !s),
        theme,
        setTheme,
        toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
    }), [title, sidebarOpen, theme]);

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export const useLayout = () => {
    const ctx = useContext(LayoutContext);
    if (!ctx) throw new Error("useLayout must be used within a LayoutProvider");
    return ctx;
};
