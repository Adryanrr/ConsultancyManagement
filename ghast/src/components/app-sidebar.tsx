"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { items } from "@/lib/iconsSidebar";
import { Switch } from "@/components/ui/switch";
import { LogOutIcon, Moon, Sun, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function AppSidebar() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.title.toLowerCase() === "cadastrar" ? (
                    <Collapsible
                      open={isRegistrationOpen}
                      onOpenChange={setIsRegistrationOpen}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full justify-between">
                          <div className="flex items-center">
                            <item.icon className="mr-2" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown
                            className={`transition-transform duration-200 ${
                              isRegistrationOpen ? "rotate-180" : ""
                            }`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {["Cliente", "Consultor", "Contrato"].map((subItem) => (
                            <SidebarMenuItem key={subItem}>
                              <SidebarMenuButton asChild>
                                <a href={`/cadastrar/${subItem.toLowerCase()}`}>
                                  {subItem}
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="mr-2" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {theme === "dark" ? (
              <Sun className="text-yellow-500" />
            ) : (
              <Moon className="text-gray-600" />
            )}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={toggleDarkMode} />
        </div>
        <SidebarMenu>
          <SidebarMenuButton className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2 rounded">
            <LogOutIcon className="mr-2" />
            Logout
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}