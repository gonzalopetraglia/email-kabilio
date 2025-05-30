import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "@remix-run/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { buttonVariants } from "./ui/button";
import { cn } from "~/lib/utils";

interface Props {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    to: string;
  }[];
}

export function Nav({ links, isCollapsed }: Props) {
  const { pathname, search } = useLocation();
  const location = pathname + search;

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  replace={false}
                  to={link.to}
                  className={cn(
                    buttonVariants({
                      variant: link.to === location ? "default" : "ghost",
                      size: "icon"
                    }),
                    "h-9 w-9"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                <span>{link.title}</span>
                {link.label && link.to === location && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              replace={false}
              to={link.to}
              className={cn(
                buttonVariants({
                  variant: link.to === location ? "default" : "ghost",
                  size: "sm"
                }),
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              <span>{link.title}</span>
              {link.label && link.to === location && (
                <span className="ml-auto">{link.label}</span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
