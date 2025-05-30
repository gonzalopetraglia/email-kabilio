import { useMemo } from "react";
import { useFetcher, useSearchParams } from "@remix-run/react";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  buildSearchParams,
  cn,
  formatDate,
  getParamsBySearchParams
} from "~/lib/utils";
import type { Email } from "~/types/types";

interface Props {
  items: Email[];
  selected?: Email;
  onChange: (email: Email) => void;
}

export function MailList({ items, selected, onChange }: Props) {
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();
    const { q, deleted, accountEmail } = useMemo(
      () => getParamsBySearchParams(searchParams),
      [searchParams]
    );
  const tags = ["work", "meeting", "important"];

  const handleEmailClick = (email: Email) => {
    if (!email.read) {
      const query = buildSearchParams({ accountEmail, deleted, q });
      fetcher.submit(
        { intent: "markAsRead", emailId: email.id, query },
        {
          method: "post",
          action: "."
        }
      );
    }
    onChange(email);
  };

  const handleTagClick = (email: Email, tag: string) => {
    let tags = email.labels;
    if (tags.includes(tag)) {
      tags = tags.filter((item) => item !== tag);
    } else {
      tags.push(tag);
    }
    const query = buildSearchParams({ accountEmail, deleted, q });
    fetcher.submit(
      { intent: "changeTags", emailId: email.id, tags: tags, query },
      {
        method: "post",
        action: "."
      }
    );
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              selected?.id === item.id && "bg-muted"
            )}
            onClick={() => handleEmailClick(item)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.from}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    selected?.id === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDate(item.createdAt)}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.text.substring(0, 300)}
            </div>
            <div className="flex items-center gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={item.labels.includes(tag) ? "default" : "outline"}
                  onClick={() => handleTagClick(item, tag)}
                >
                  <span className="capitalize">{tag}</span>
                </Badge>
              ))}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
