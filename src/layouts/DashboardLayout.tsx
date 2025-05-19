import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import PageLoader from "@/components/PageLoader";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DashboardLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const { open } = useSidebar();

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex w-full overflow-hidden bg-background font-montserrat">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b h-14 flex items-center px-4 md:px-6 sticky top-0 bg-background z-30">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle sidebar">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Toggle Sidebar</p>
            </TooltipContent>
          </Tooltip>
          <span className="font-semibold text-lg ml-3 md:ml-4">Dashboard</span>
          <div className="ml-auto flex items-center gap-2 md:gap-4">
            {/* Placeholder for user profile, notifications, etc */}
          </div>
        </header>
        <main className="flex-1 p-3 md:p-4 lg:p-6 ">
          <div
            className={`${
              isMobile ? "px-0" : "px-2"
            } max-w-7xl p-4 mx-auto w-[90vw] md:${open ? "w-[75vw]" : "w-[90vw]"} `}
          >
            {isLoading ? <PageLoader /> : <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
