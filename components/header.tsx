import { allPages, Page } from "contentlayer/generated";

import { Link } from "@/components/ui/link";
import { H3 } from "@/components/ui/typography";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  currentUrl?: string;
}

const Header = ({ currentUrl = "/" }: HeaderProps) => {
  const pages = allPages
    .sort((a, b) => a.order - b.order)
    .filter((page) => page.slug !== "home" && page.slug !== "contact");
  return (
    <header>
      <nav>
        <Card>
          <CardContentContainer>
            <CardPrimaryContentContainer>
              <CardPrimaryContent>
                <Link
                  className={cn(
                    "text-foreground",
                    currentUrl === "/"
                      ? "pointer-events-none"
                      : "pointer-events-auto"
                  )}
                  href="/"
                >
                  <H3 className="inline font-bold">yosukeushigo.me</H3>
                </Link>
              </CardPrimaryContent>
              <CardPrimaryContent>
                {pages && pages.length > 0 && (
                  <div className="flex gap-4">
                    {pages.map((page) => (
                      <Link
                        key={page.slug}
                        className={cn(
                          "text-foreground",
                          currentUrl === page.url
                            ? "pointer-events-none"
                            : "pointer-events-auto"
                        )}
                        href={page.url}
                      >
                        <H3
                          className={cn(
                            "inline font-bold",
                            currentUrl === page.url && "text-muted-foreground"
                          )}
                        >
                          {page.title.toLowerCase()}
                        </H3>
                      </Link>
                    ))}
                  </div>
                )}
              </CardPrimaryContent>
            </CardPrimaryContentContainer>
          </CardContentContainer>
          <CardSecondaryContent />
        </Card>
      </nav>
    </header>
  );
};

export default Header;
