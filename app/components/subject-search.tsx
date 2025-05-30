import { useNavigate, useSearchParams } from "@remix-run/react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { buildSearchParams, getParamsBySearchParams } from "~/lib/utils";

export function SubjectSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    q: search,
    deleted,
    accountEmail
  } = getParamsBySearchParams(searchParams);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString() || "";
    const query = buildSearchParams({ accountEmail, deleted, q });
    navigate("/?" + query);
  };

  return (
    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            name="q"
            defaultValue={search || ""}
            placeholder="Search subject"
            className="pl-8"
          />
        </div>
      </form>
    </div>
  );
}
