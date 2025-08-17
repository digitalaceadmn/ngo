"use client";
import { LayoutProvider } from "@/contexts/LayoutContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return <LayoutProvider>{children}</LayoutProvider>;
}