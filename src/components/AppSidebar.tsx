



import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  FileEdit, 
  Home, 
  CalendarCheck, 
  Settings, 
  LineChart, 
  Link,
  Laptop, 
  ChevronRight,
  BarChart,
  Users,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { icon: Home, label: "Home", path: "/", ariaLabel: "Navigate to Home" },
  { icon: FileEdit, label: "Articles", path: "/articles", ariaLabel: "Navigate to Articles" },
  { icon: BarChart, label: "Keywords", path: "/keywords", ariaLabel: "Navigate to Keywords" },
  { icon: Laptop, label: "Auto Blog", path: "/auto-blog", ariaLabel: "Navigate to Auto Blog" },
  { icon: Link, label: "Internal Links", path: "/internal-links", ariaLabel: "Navigate to Internal Links" },
  { icon: LineChart, label: "Integrations", path: "/integrations", ariaLabel: "Navigate to Integrations" },
  { icon: CalendarCheck, label: "Subscription", path: "/subscription", ariaLabel: "Navigate to Subscription" },
  { icon: Users, label: "Affiliate Program", path: "/affiliate", ariaLabel: "Navigate to Affiliate Program" },
  { icon: HelpCircle, label: "Help Center", path: "/help", ariaLabel: "Navigate to Help Center" },
  { icon: Settings, label: "Settings", path: "/settings", ariaLabel: "Navigate to Settings" },
];

const AppSidebar = () => {
  return (
    <Sidebar aria-label="Main Navigation">
      <SidebarHeader>
        <div className="flex items-center justify-center py-3">
          <h1 className="text-3xl pt-4 font-black tracking-tight">ABUN</h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="custom-scrollbar">
        <div className="px-3 py-2">
          <div className="relative">
            <button className="bg-muted rounded-md flex items-center px-3 py-2 w-full text-left hover:bg-muted/80 transition-colors" aria-label="Select website">
              <div className="w-6 h-6 rounded-full bg-[#E93D82] flex items-center justify-center text-white mr-2">
                <span className="text-xs">a</span>
              </div>
              <span className="text-sm font-normal text-muted-foreground flex-1 truncate">amazon.com</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"
                        )
                      }
                      aria-label={item.ariaLabel}
                    >
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t py-3">
        <div className="flex items-center justify-center">
          <span className="text-xs text-muted-foreground">© 2025 Abun</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
