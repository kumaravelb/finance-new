import { 
  LayoutDashboard, 
  TrendingUp, 
  CreditCard, 
  Settings, 
  Wallet,
  ChevronDown,
  PieChart,
  BarChart3,
  LineChart,
  ArrowUpDown,
  ArrowDownUp,
  History,
  Database,
  Users,
  Building2,
  Package,
  Truck,
  Layers,
  LayoutGrid
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import logoFull from "@/assets/logo-full.png";
import logoIcon from "@/assets/logo-icon.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const menuItems = [
  { 
    title: "Way to Start", 
    icon: LayoutDashboard,
    subItems: [
      { title: "Approach 1", url: "/setup", icon: Layers },
      { title: "Approach 2", url: "/setup/approach2", icon: LayoutGrid },
    ]
  },
  { title: "Overview", url: "/overview", icon: LayoutDashboard },
  { 
    title: "Analytics",
    icon: TrendingUp,
    subItems: [
      { title: "Portfolio Growth", url: "/analytics", icon: PieChart },
      { title: "Charts", url: "/analytics", icon: BarChart3 },
      { title: "Trends", url: "/analytics", icon: LineChart },
    ]
  },
  { 
    title: "Transactions", 
    icon: CreditCard,
    subItems: [
      { title: "All Transactions", url: "/transactions", icon: History },
      { title: "Income", url: "/transactions", icon: ArrowDownUp },
      { title: "Expenses", url: "/transactions", icon: ArrowUpDown },
    ]
  },
  { 
    title: "Master Setup", 
    icon: Database,
    subItems: [
      { title: "Customer Master", url: "/master/customers", icon: Users },
      { title: "Account Master", url: "/master/accounts", icon: Building2 },
      { title: "Product Master", url: "/master/products", icon: Package },
      { title: "Vendor Master", url: "/master/vendors", icon: Truck },
    ]
  },
  { title: "Wallet", url: "/wallet", icon: Wallet },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const [openMenus, setOpenMenus] = useState<string[]>(["Analytics"]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="px-3 py-4 mb-2">
            {open ? (
              <img src={logoFull} alt="ANOUD TECHNOLOGIES" className="w-full h-auto" />
            ) : (
              <img src={logoIcon} alt="ANOUD" className="w-8 h-8 mx-auto" />
            )}
          </div>
          <SidebarGroupLabel className="text-sm font-semibold text-primary">
            Finance Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const hasSubItems = "subItems" in item && item.subItems;
                const isMenuOpen = openMenus.includes(item.title);

                if (hasSubItems) {
                  return (
                    <Collapsible
                      key={item.title}
                      open={isMenuOpen && open}
                      onOpenChange={() => toggleMenu(item.title)}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className="hover:bg-sidebar-accent/50"
                            tooltip={item.title}
                          >
                            <item.icon className="h-4 w-4" />
                            {open && (
                              <>
                                <span>{item.title}</span>
                                <ChevronDown
                                  className={`ml-auto h-4 w-4 transition-transform ${
                                    isMenuOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </>
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <NavLink
                                    to={subItem.url}
                                    className={({ isActive }) =>
                                      isActive
                                        ? "bg-sidebar-accent text-sidebar-primary font-medium"
                                        : ""
                                    }
                                  >
                                    <subItem.icon className="h-4 w-4" />
                                    <span>{subItem.title}</span>
                                  </NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-sidebar-accent text-sidebar-primary font-medium"
                            : "hover:bg-sidebar-accent/50"
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {open && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
