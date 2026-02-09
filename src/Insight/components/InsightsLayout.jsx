import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DesktopInsightsSidebar, { useSidebarContext } from "./insightsidebar/desktopinsightsidebar";
import DesktopInsightsHeader from "./insightheader/desktopinsightheader";
import MobileInsightsSidebar from "./insightsidebar/mobileinsightsidebar";
import MobileInsightsHeader from "./insightheader/mobileinsightheader";
import { SidebarProvider } from "./insightsidebar/desktopinsightsidebar";
import { SidebarProvider as MobileSidebarProvider } from "./insightsidebar/SidebarContext";
import LocationPrompt from "./LocationPrompt";
import { LocationProvider } from "./LocationContext";

const DesktopLayoutContent = () => {
    const { collapsed } = useSidebarContext();
    const sidebarWidth = collapsed ? 72 : 240;

    return (
        <div
            className="flex-1 transition-all duration-300 min-w-0"
            style={{ marginLeft: `${sidebarWidth}px` }}
        >
            <DesktopInsightsHeader />
            <main className="pt-20 min-h-screen bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
};

export default function InsightsLayout() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <LocationProvider>
            <MobileSidebarProvider>
                <SidebarProvider>
                    {/* Desktop Layout */}
                    <div className="hidden md:flex">
                        <DesktopInsightsSidebar />
                        <DesktopLayoutContent />
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden">
                        <MobileInsightsHeader />
                        <MobileInsightsSidebar />
                        <main className="pt-32 min-h-screen bg-gray-50">
                            <LocationPrompt />
                            <Outlet />
                        </main>
                    </div>
                </SidebarProvider>
            </MobileSidebarProvider>
        </LocationProvider>
    );
}
