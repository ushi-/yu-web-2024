import type { Metadata } from "next";
import { compareDesc } from "date-fns";
import { allNotes, Note } from "contentlayer/generated";
import { MoveUpRight } from "lucide-react";

import { Link } from "@/components/ui/link";
import { P, H1 } from "@/components/ui/typography";
import Header from "@/components/header";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
  CardFooter,
} from "@/components/ui/card";
import { getDomain } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notes",
  openGraph: {
    title: "Notes | Yosuke Ushigome",
    url: "https://www.yosukeushigo.me/notes",
  },
};

function NoteCard(note: Note) {
  const externalLink = note.link ? (
    <div className="inline text-muted-foreground group-hover:text-primary/40 transition-colors">
      <span className="">{getDomain(note.link)}</span>
      <MoveUpRight strokeWidth={1.75} className="inline ml-0.5 w-4 h-4" />
    </div>
  ) : null;

  return (
    <Link
      href={note.link ? note.link : note.url}
      className="text-foreground group"
    >
      <Card>
        <CardContentContainer>
          <div className="flex flex-col gap-1">
            <CardPrimaryContentContainer>
              <CardPrimaryContent>
                {(note.language === "en" || note.language === "en+ja") && (
                  <H1>{note.titleEn}</H1>
                )}
              </CardPrimaryContent>
              <CardPrimaryContent>
                {(note.language === "ja" || note.language === "en+ja") && (
                  <H1>{note.titleJa}</H1>
                )}
              </CardPrimaryContent>
            </CardPrimaryContentContainer>
            {(note.subtitleEn || note.subtitleJa) && (
              <CardPrimaryContentContainer>
                <CardPrimaryContent>
                  {(note.language === "en" || note.language === "en+ja") &&
                    note.subtitleEn && (
                      <P className="inline mr-2">{note.subtitleEn}</P>
                    )}
                </CardPrimaryContent>
                <CardPrimaryContent>
                  {(note.language === "ja" || note.language === "en+ja") &&
                    note.subtitleJa && (
                      <P className="inline mr-2">{note.subtitleJa}</P>
                    )}
                </CardPrimaryContent>
              </CardPrimaryContentContainer>
            )}
            {externalLink ? (
              <CardPrimaryContentContainer>
                <CardPrimaryContent>
                  {(note.language === "en" || note.language === "en+ja") &&
                    externalLink}
                </CardPrimaryContent>
                <CardPrimaryContent>
                  {(note.language === "ja" || note.language === "en+ja") &&
                    externalLink}
                </CardPrimaryContent>
              </CardPrimaryContentContainer>
            ) : null}
          </div>
          <CardFooter className="group-hover:text-primary/70 transition-colors">
            {note.formattedDate}
          </CardFooter>
        </CardContentContainer>
        <CardSecondaryContent></CardSecondaryContent>
      </Card>
    </Link>
  );
}

export default function Home() {
  const notes = allNotes.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <main>
      <Header anchors={[{ label: "notes", href: "/notes" }]} />
      {notes.map((note, idx) => (
        <NoteCard key={idx} {...note} />
      ))}
    </main>
  );
}
