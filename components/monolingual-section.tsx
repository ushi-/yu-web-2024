import * as React from "react";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
} from "./ui/card";

import { cn } from "@/lib/utils";

type MonolingualSectionProps = {
  children: React.ReactNode;
  padded?: boolean;
};

const monolingualSection = ({
  children,
  padded = false,
}: MonolingualSectionProps) => {
  const [primaryContent, secondaryContent] = React.Children.toArray(children);
  return (
    <Card
      className={cn([
        !padded &&
          "px-0 lg:px-0 pt-0 lg:pt-0 last-of-type:pb-0 last-of-type:lg:pb-0",
      ])}
    >
      <CardContentContainer>
        <CardPrimaryContentContainer>
          <CardPrimaryContent>{primaryContent}</CardPrimaryContent>
        </CardPrimaryContentContainer>
      </CardContentContainer>
      <CardSecondaryContent className="font-condensed">
        {secondaryContent}
      </CardSecondaryContent>
    </Card>
  );
};

export default monolingualSection;
