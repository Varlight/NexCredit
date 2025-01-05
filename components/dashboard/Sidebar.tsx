import { BarChart3, FileText, Home, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Analysis",
    icon: BarChart3,
    href: "/analysis",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/documents",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 lg:block lg:w-60">
      <div className="flex h-full flex-col gap-2">
        <div className="flex-1 py-4">
          <nav className="grid items-start gap-1 px-2">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  item.href === "/" ? "bg-accent" : "transparent"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}