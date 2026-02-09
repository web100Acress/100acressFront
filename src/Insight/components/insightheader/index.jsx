import React from "react";
import DesktopInsightHeader from "./desktopinsightheader";
import MobileInsightHeader from "./mobileinsightheader";

export default function InsightHeader() {
    return (
        <>
            {/* Desktop Header - Hidden on mobile */}
            <div className="hidden md:block">
                <DesktopInsightHeader />
            </div>

            {/* Mobile Header - Hidden on desktop */}
            <div className="block md:hidden">
                <MobileInsightHeader />
            </div>
        </>
    );
}
