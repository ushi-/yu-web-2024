import Image from "next/image";
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
import { cn, getDomain } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notes",
};

function NoteCard(note: Note) {
  const externalLink = note.link ? (
    <div className="inline opacity-40">
      <span>{getDomain(note.link)}</span>
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
          <div className="flex flex-col gap-2.5">
            <CardPrimaryContentContainer>
              <CardPrimaryContent>
                <H1>{note.titleEn}</H1>
              </CardPrimaryContent>
              <CardPrimaryContent>
                <H1>{note.titleJa}</H1>
              </CardPrimaryContent>
            </CardPrimaryContentContainer>
            {note.subtitleEn && note.subtitleJa ? (
              <CardPrimaryContentContainer>
                <CardPrimaryContent>
                  <P className="inline mr-2">{note.subtitleEn}</P>
                  {externalLink}
                </CardPrimaryContent>
                <CardPrimaryContent>
                  <P className="inline mr-2">{note.subtitleJa}</P>
                  {externalLink}
                </CardPrimaryContent>
              </CardPrimaryContentContainer>
            ) : externalLink ? (
              <CardPrimaryContentContainer>
                <CardPrimaryContent>{externalLink}</CardPrimaryContent>
                <CardPrimaryContent>{externalLink}</CardPrimaryContent>
              </CardPrimaryContentContainer>
            ) : null}
          </div>
          <CardFooter>{note.formattedDate}</CardFooter>
        </CardContentContainer>
        <CardSecondaryContent>
          {note.image && (
            <div
              className={cn("w-full relative overflow-hidden aspect-square")}
            >
              <Image
                className=" object-cover group-hover:opacity-80 transition-opacity"
                src={note.image}
                alt={note.titleEn}
                fill
              />
            </div>
          )}
        </CardSecondaryContent>
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
