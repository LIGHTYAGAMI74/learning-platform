"use client"
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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Wrench,
  Settings,
  WrenchIcon,
} from "lucide-react"   // ✅ import icons directly
import Link from "next/link"
import { usePathname } from "next/navigation"

import AddNewCourseDialog from "./AddNewCourseDialog"

const SideBarOptions = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/workspace",
  },
  {
    title: "Courses",
    icon: BookOpen,
    path: "/workspace/courses",
  },
  {
    title: "Student-learning",
    icon: Users,      
    path: "/workspace/students",
  },
  {
    title: "AI Tools",
    icon: WrenchIcon,       
    path: "/workspace/ai-tools",
  },
  {
    title: "Settings",
    icon: Settings,   
    path: "/workspace/settings",
  },
]

export function AppSidebar() {
  const path = usePathname()

  return (
    <Sidebar className="w-64 bg-black text-gray-300" >
      {/* Header with Logo */}
      <SidebarHeader className="p-6 flex items-center justify-center border-b border-gray-800">
        <h1
          className="text-2xl font-serif font-bold text-transparent bg-clip-text 
                     bg-gradient-to-r from-gray-300 via-white to-gray-400 
                     [background-size:200%] animate-[shine_3s_linear_infinite]"
        >
          Juniper and Co
        </h1>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {/* Create button */}
        <SidebarGroup>
          <AddNewCourseDialog>
            <Button className="w-full bg-gradient-to-r from-gray-500 to-gray-300 text-black font-semibold shadow-md hover:from-gray-400 hover:to-gray-200 transition">
              Create Course
            </Button>
          </AddNewCourseDialog>
        </SidebarGroup>
<br />


        {/* Menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((item, index) => {
                const isActive =
                  path === item.path ||
                  (item.path !== "/#" && path.startsWith(item.path))

                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.path}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-gray-600 to-gray-400 text-white font-semibold shadow-md scale-105 border border-gray-300"
                            : "text-gray-400 hover:text-white hover:bg-gray-800 hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                        }`}
                      >
                        <item.icon size={22} /> 
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 text-xs text-gray-500 border-t border-gray-800">
        © 2025 My App
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
