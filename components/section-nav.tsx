"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sections = [
  { name: "Política", href: "/categoria/politica" },
  { name: "Economía", href: "/categoria/economia" },
  { name: "Deportes", href: "/categoria/deportes" },
  { name: "Cultura", href: "/categoria/cultura" },
  { name: "Mundo", href: "/categoria/mundo" },
  { name: "Opinión", href: "/categoria/opinion" },
  { name: "Tecnología", href: "/categoria/tecnologia" },
  { name: "Salud", href: "/categoria/salud" },
  { name: "Entretenimiento", href: "/categoria/entretenimiento" },
  { name: "Tendencias", href: "/categoria/tendencias" },
]

export function SectionNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-background border-b border-border sticky top-12 z-30">
      <div className="container mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-0">
          {sections.map((section) => {
            const isActive = pathname.includes(section.href.split("/").pop() || "")
            return (
              <Link
                key={section.href}
                href={section.href}
                className={cn(
                  "px-0 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2",
                  isActive
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                )}
              >
                {section.name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

