import * as React from "react";
import BilingualSection from "./bilingual-section";

type MonolingualSectionProps = {
  children: React.ReactNode;
  padded?: boolean;
  className?: string;
};

const monolingualSection = ({
  children,
  padded = false,
  className = "",
}: MonolingualSectionProps) => {
  return (
    <BilingualSection mono padded={padded} className={className}>
      {children}
    </BilingualSection>
  );
};

export default monolingualSection;
