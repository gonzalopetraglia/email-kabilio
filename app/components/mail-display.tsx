import { useMemo } from "react";
import { Inbox, Trash2, User } from "lucide-react";
import { useFetcher, useSearchParams } from "@remix-run/react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  buildSearchParams,
  formatDate,
  getParamsBySearchParams
} from "~/lib/utils";
import type { Email } from "~/types/types";

interface MailDisplayProps {
  email?: Email;
}

export function MailDisplay({ email }: MailDisplayProps) {
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();

  const { q, deleted, accountEmail } = useMemo(
    () => getParamsBySearchParams(searchParams),
    [searchParams]
  );

  const submitAction = (intent: string) => {
    if (!email) return;
    const query = buildSearchParams({ accountEmail, deleted, q });
    fetcher.submit(
      { intent, emailId: email.id, query },
      { method: "post", action: "." }
    );
  };

  const handleMarkAsUnreadClick = () => submitAction("markAsUnread");
  const handleMoveToTrashClick = () => submitAction("moveToTrash");
  const handleMoveToInboxClick = () => submitAction("moveToInbox");

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="ml-auto flex items-center gap-2">
          {email && (
            <>
              {email.deleted ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleMoveToInboxClick()}
                      variant="ghost"
                      size="icon"
                    >
                      <Inbox className="h-4 w-4" />
                      <span className="sr-only">Move to Inbox</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Move to Inbox</TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleMoveToTrashClick()}
                      variant="ghost"
                      size="icon"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Move to trash</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Move to trash</TooltipContent>
                </Tooltip>
              )}
              <Button
                onClick={() => handleMarkAsUnreadClick()}
                size="sm"
                className="ml-auto"
                variant="outline"
              >
                Mark as unread
              </Button>
            </>
          )}
        </div>
      </div>
      <Separator />
      {email ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={email.from} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{email.name}</div>
                <div className="line-clamp-1 text-xs">{email.subject}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span> {email.from}
                </div>
              </div>
            </div>

            <div className="ml-auto text-xs text-muted-foreground">
              {formatDate(email.createdAt)}
            </div>
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {email.text}
          </div>
          <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${email.from}...`}
                />
                <div className="flex items-center">
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
