import * as React from "react";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
} from "./ui/card";

const BilingualSection = ({ children }: { children: React.ReactNode }) => {
  const [englishContent, japaneseContent, secondaryContent] =
    React.Children.toArray(children);
  return (
    <Card>
      <CardContentContainer>
        <CardPrimaryContentContainer>
          <CardPrimaryContent>{englishContent}</CardPrimaryContent>
          <CardPrimaryContent>{japaneseContent}</CardPrimaryContent>
        </CardPrimaryContentContainer>
      </CardContentContainer>
      <CardSecondaryContent className="font-condensed">
        {secondaryContent}
      </CardSecondaryContent>
    </Card>
  );
};

export default BilingualSection;
