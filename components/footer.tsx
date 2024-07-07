import Link from "next/link";

import { H3 } from "@/components/ui/typography";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
} from "./ui/card";

const Footer = () => (
  <footer>
    <Card>
      <CardContentContainer>
        <CardPrimaryContentContainer>
          <CardPrimaryContent className="text-muted-foreground">
            © Yosuke Ushigome
          </CardPrimaryContent>
          <CardPrimaryContent />
        </CardPrimaryContentContainer>
      </CardContentContainer>
      <CardSecondaryContent />
    </Card>
  </footer>
);

export default Footer;
