"use client";

import CreateRequestModal from "@/components/CreateRequestModal";
import Footer from "@/components/Footer";
import { createContext, useContext, useState } from "react";
import Navbar from "@/components/Navbar";

type LandingLayoutContextValue = {
    openRequestModal: () => void;
};

const LandingLayoutContext = createContext<LandingLayoutContextValue | null>(
    null,
);

export const useLandingLayout = () => {
    const context = useContext(LandingLayoutContext);

    if (!context) {
        throw new Error(
            "useLandingLayout must be used within the landing layout",
        );
    }

    return context;
};

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    return (
        <LandingLayoutContext.Provider
            value={{
                openRequestModal: () => setIsRequestModalOpen(true),
            }}
        >
            <CreateRequestModal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
            />
            <Navbar />
            {children}
            <Footer onRequestClick={() => setIsRequestModalOpen(true)} />
        </LandingLayoutContext.Provider>
    );
}
