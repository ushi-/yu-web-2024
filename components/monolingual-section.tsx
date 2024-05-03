import * as React from "react";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
} from "./ui/card";

const monolingualSection = ({ children }: { children: React.ReactNode }) => {
  const [primaryContent, secondaryContent] = React.Children.toArray(children);
  return (
    <Card className="[&:not(:first-child)]:mt-5 py-0 lg:py-0">
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
