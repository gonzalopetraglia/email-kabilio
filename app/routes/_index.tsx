import { useMemo, useState } from "react";
import {
  ActionFunction,
  type LoaderFunction,
  type MetaFunction
} from "@remix-run/node";
import { redirect, useLoaderData, useSearchParams } from "@remix-run/react";
import { Inbox, Trash } from "lucide-react";
import prisma from "../../lib/prisma";
import { AccountSwitcher } from "../components/account-switcher";
import { MailDisplay } from "../components/mail-display";
import { MailList } from "../components/mail-list";
import { Nav } from "../components/nav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "../components/ui/resizable";
import { Separator } from "../components/ui/separator";
import { SubjectSearch } from "../components/subject-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { TooltipProvider } from "../components/ui/tooltip";
import {
  buildSearchParams,
  cn,
  getParamsBySearchParams,
  getSearchParams
} from "../lib/utils";
import type { Email, User } from "../types/types";

const USER_ID = 1;

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = data?.emails?.some((e: Email) => e.deleted)
    ? "Trash - Email Kabilio"
    : "Inbox - Email Kabilio";
  return [
    { title },
    {
      name: "description",
      content: "Email client powered by Remix and Prisma."
    }
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { accountEmail, q, deleted } = getSearchParams(request.url);

  const user = await prisma.user.findUnique({
    where: { id: USER_ID },
    include: {
      accounts: true
    }
  });

  const accountsCount = user?.accounts?.length;

  if (!accountEmail && !accountsCount) {
    throw new Response("Not Found Accounts", { status: 400 });
  }

  if (!accountEmail && accountsCount) {
    const query = buildSearchParams({ accountEmail: user.accounts[0].email });
    return redirect("/?" + query);
  }

  const emails = await prisma.email.findMany({
    where: {
      account: { email: accountEmail },
      deleted: deleted,
      subject: {
        contains: q,
        mode: "insensitive"
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return { user, emails };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent")?.toString();
  const emailId = parseInt(formData.get("emailId")?.toString() || "");
  const tags = formData.get("tags")?.toString().split(",") || [];
  const query = formData.get("query")?.toString();

  if (!intent || isNaN(emailId))
    throw new Response("Not Found invalid intent or emailId", { status: 400 });

  const updateData: Record<string, unknown> = {};
  switch (intent) {
    case "markAsRead":
      updateData.read = true;
      break;
    case "markAsUnread":
      updateData.read = false;
      break;
    case "moveToTrash":
      updateData.deleted = true;
      break;
    case "moveToInbox":
      updateData.deleted = false;
      break;
    case "changeTags":
      updateData.labels = tags;
      break;
    default:
      throw new Response("Not Found intent", { status: 400 });
  }

  await prisma.email.update({ where: { id: emailId }, data: updateData });

  return redirect("/?" + query);
};

export default function Index() {
  const [searchParams] = useSearchParams();
  const {
    q: search,
    deleted,
    accountEmail
  } = useMemo(() => getParamsBySearchParams(searchParams), [searchParams]);

  const { user, emails } = useLoaderData<{ user: User; emails: Email[] }>();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | undefined>(
    emails[0]
  );

  const defaultLayout = [20, 32, 48];
  const readEmails = emails.filter((item) => !item.read);
  const readEmailsCount = readEmails.length.toString();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full max-h-[900px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={4}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => setIsCollapsed(true)}
          onResize={() => setIsCollapsed(false)}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <AccountSwitcher
              isCollapsed={isCollapsed}
              accounts={user.accounts}
            />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Inbox",
                label: readEmailsCount,
                icon: Inbox,
                to: `/?${buildSearchParams({ accountEmail, q: search })}`
              },
              {
                title: "Trash",
                label: readEmailsCount,
                icon: Trash,
                to: `/?${buildSearchParams({
                  accountEmail,
                  deleted: "true",
                  q: search
                })}`
              }
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">
                {deleted === "true" ? "Trash" : "Inbox"}
              </h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <SubjectSearch />
            <TabsContent value="all" className="m-0">
              <MailList
                items={emails}
                selected={selectedEmail}
                onChange={setSelectedEmail}
              />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList
                items={readEmails}
                selected={selectedEmail}
                onChange={setSelectedEmail}
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <MailDisplay email={selectedEmail} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
