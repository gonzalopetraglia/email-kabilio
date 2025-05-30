import { Mail, MailOpen, Mails } from "lucide-react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { buildSearchParams, cn, getParamsBySearchParams } from "~/lib/utils";
import type { Account } from "~/types/types";

interface Props {
  isCollapsed: boolean;
  accounts: Account[];
}

export function AccountSwitcher({ isCollapsed, accounts }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    q: search,
    deleted,
    accountEmail
  } = getParamsBySearchParams(searchParams);

  const handleChange = (email: string) => {
    const query = buildSearchParams({
      accountEmail: email,
      deleted,
      q: search
    });
    navigate("/?" + query);
  };

  return (
    <Select
      defaultValue={accountEmail ?? accounts[0].email}
      onValueChange={handleChange}
    >
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          <Mails className="h-4 w-4" />
          <span className={cn("ml-2", isCollapsed && "hidden")}>
            {accountEmail}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.email} value={account.email}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              {account.email === accountEmail ? (
                <MailOpen className="h-4 w-4" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              {account.email}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
