"use client";

import Link from "next/link";
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
import { LogOutIcon, Moon } from "lucide-react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function AppSidebar() {
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
                    <Collapsible open={true}>
                      <SidebarMenuButton className="w-full justify-between">
                        <div className="flex items-center">
                          <item.icon className="mr-2" />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {["cliente", "consultor", "contrato"].map(
                            (subItem) => (
                              <SidebarMenuItem key={subItem}>
                                <SidebarMenuButton asChild>
                                  <Link
                                    href={`/dashboard/cadastrar/${subItem.toLowerCase()}`}
                                  >
                                    {subItem}
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            )
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <div className="flex items-center">
                          <item.icon className="mr-2" />
                          <span>{item.title}</span>
                        </div>
                      </Link>
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
              <>
                <Moon className="text-violet-500" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Moon className="text-black" />
                <span>Dark Mode</span>
              </>
            )}
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
