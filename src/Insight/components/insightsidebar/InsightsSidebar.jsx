import React from "react";
import DesktopInsightsSidebar from "./desktopinsightsidebar";
import MobileInsightsSidebar from "./mobileinsightsidebar";

export default function InsightsSidebar() {
  return (
    <>
      <DesktopInsightsSidebar />
      <MobileInsightsSidebar />
    </>
  );
}