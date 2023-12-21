import Link from "next/link";

import { H3 } from "@/components/ui/typography";

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
      <div className="p-5 flex flex-row gap-5">
        <div className="flex-[2_2_20px] flex flex-row gap-5">
          <div className="flex-1 bg-slate-200">
            <Link href="/">
              <H3 className="inline">yosukeushigo.me</H3>
            </Link>
          </div>
          <div className="flex-1 bg-slate-400">
            {anchors && anchors.length > 0 && (
              <Link href={anchors[0].href}>
                <H3 className="inline">{anchors[0].label}</H3>
              </Link>
            )}
          </div>
        </div>
        <div className="hidden lg:block flex-[1_1_0%] bg-slate-600">
          {anchors && anchors.length > 1 && (
            <Link href={anchors[1].href}>
              <H3 className="inline">{anchors[1].label}</H3>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
