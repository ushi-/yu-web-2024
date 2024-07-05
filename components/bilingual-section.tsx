import * as React from "react";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
} from "./ui/card";
import { cn } from "@/lib/utils";

type BilingualSectionProps = {
  children: React.ReactNode;
  padded?: boolean;
  className?: string;
  mono?: boolean;
};

const BilingualSection = ({
  children,
  padded = false,
  className = "",
  mono = false,
}: BilingualSectionProps) => {
  const [firstContent, secondContent, thirdContent] =
    React.Children.toArray(children);
  return (
    <Card
      className={cn([
        !padded &&
          "px-0 lg:px-0 pt-0 lg:pt-0 last-of-type:pb-0 last-of-type:lg:pb-0",
        className,
      ])}
    >
      <CardContentContainer>
        <CardPrimaryContentContainer>
          <CardPrimaryContent>{firstContent}</CardPrimaryContent>
          {!mono && <CardPrimaryContent>{secondContent}</CardPrimaryContent>}
        </CardPrimaryContentContainer>
      </CardContentContainer>
      <CardSecondaryContent className="font-condensed">
        {!mono ? thirdContent : secondContent}
      </CardSecondaryContent>
    </Card>
  );
};

export default BilingualSection;
