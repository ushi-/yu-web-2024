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
    <Card>
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
