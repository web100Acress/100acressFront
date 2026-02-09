import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleMobileSidebar = () => setIsMobileSidebarOpen(prev => !prev);
    const closeMobileSidebar = () => setIsMobileSidebarOpen(false);
    const openMobileSidebar = () => setIsMobileSidebarOpen(true);

    return (
        <SidebarContext.Provider
            value={{
                isMobileSidebarOpen,
                toggleMobileSidebar,
                closeMobileSidebar,
                openMobileSidebar
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
