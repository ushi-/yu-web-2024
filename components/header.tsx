import Link from "next/link";

import { H3 } from "@/components/ui/typography";
import {
  Card,
  CardContentContainer,
  CardFooter,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
} from "./ui/card";

interface Anchor {
  label: string;
  href: string;
}

export interface HeaderProps {
  anchors?: Anchor[];
}

const Header = ({ anchors }: HeaderProps) => {
  return (
    <header>
      <nav>
        <Card>
          <CardContentContainer>
            <CardPrimaryContentContainer>
              <CardPrimaryContent>
                <Link href="/">
                  <H3 className="inline font-bold">yosukeushigo.me</H3>
                </Link>
              </CardPrimaryContent>
              <CardPrimaryContent>
                {anchors && anchors.length > 0 && (
                  <Link href={anchors[0].href}>
                    <H3 className="inline font-bold">{anchors[0].label}</H3>
                  </Link>
                )}
              </CardPrimaryContent>
            </CardPrimaryContentContainer>
          </CardContentContainer>
          <CardSecondaryContent>
            {anchors && anchors.length > 1 && (
              <Link href={anchors[1].href}>
                <H3 className="inline font-bold">{anchors[1].label}</H3>
              </Link>
            )}
          </CardSecondaryContent>
        </Card>
      </nav>
    </header>
  );
};

export default Header;
