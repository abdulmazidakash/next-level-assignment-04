"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  items?: {
    title: string
    url: string
  }[]
}

export function NavMain({ items }: { items: NavItem[] }) {

  const pathname = usePathname()

  return (
    <SidebarGroup>

      <SidebarGroupLabel>
        Platform
      </SidebarGroupLabel>

      <SidebarMenu>

        {items.map((item) => {

          const isActive = pathname === item.url

          const isSubActive =
            item.items?.some((sub) => pathname === sub.url) ?? false

          // 🔹 Normal menu item
          if (!item.items) {
            return (
              <SidebarMenuItem key={item.title}>

                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={isActive}
                >

                  <Link href={item.url}>

                    {item.icon && <item.icon />}

                    <span>{item.title}</span>

                  </Link>

                </SidebarMenuButton>

              </SidebarMenuItem>
            )
          }

          // 🔹 Collapsible menu
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isSubActive}
              className="group/collapsible"
            >

              <SidebarMenuItem>

                <CollapsibleTrigger asChild>

                  <SidebarMenuButton tooltip={item.title}>

                    {item.icon && <item.icon />}

                    <span>{item.title}</span>

                    <ChevronRight
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />

                  </SidebarMenuButton>

                </CollapsibleTrigger>

                <CollapsibleContent>

                  <SidebarMenuSub>

                    {item.items.map((subItem) => {

                      const isSubItemActive = pathname === subItem.url

                      return (
                        <SidebarMenuSubItem key={subItem.title}>

                          <SidebarMenuSubButton
                            asChild
                            isActive={isSubItemActive}
                          >

                            <Link href={subItem.url}>

                              <span>{subItem.title}</span>

                            </Link>

                          </SidebarMenuSubButton>

                        </SidebarMenuSubItem>
                      )
                    })}

                  </SidebarMenuSub>

                </CollapsibleContent>

              </SidebarMenuItem>

            </Collapsible>
          )
        })}

      </SidebarMenu>

    </SidebarGroup>
  )
}