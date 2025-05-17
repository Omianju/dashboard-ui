
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import DashboardLayout from "./layouts/DashboardLayout";
import Articles from "./pages/Articles";
import NotFound from "./pages/NotFound";

// Create lazy loaded routes for better performance
const Keywords = lazy(() => import("./pages/Keywords"));



const App = () => (

    <TooltipProvider delayDuration={300}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/articles" replace />} />
              <Route path="articles" element={
                <Suspense fallback={<PageLoader />}>
                  <Articles />
                </Suspense>
              } />
              <Route path="keywords" element={
                <Suspense fallback={<PageLoader />}>
                  <Keywords />
                </Suspense>
              } />
              {/* Placeholders for other routes from the sidebar */}
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>

);

export default App;
