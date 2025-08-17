import React, { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

export default function AboutPage() {
    const { setTitle } = useLayout();

    useEffect(() => {
        setTitle("About");
    }, [setTitle]);

    return (
        <section>
            <h1>About</h1>
            <p>Simple example page to demonstrate navigation and shared layout state.</p>
        </section>
    );
}
