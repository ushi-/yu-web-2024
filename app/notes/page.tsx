import Image from "next/image";
import type { Metadata } from "next";
import { compareDesc } from "date-fns";
import { allNotes, Note } from "contentlayer/generated";
import { MoveUpRight } from "lucide-react";

import { Link } from "@/components/ui/link";
import { P } from "@/components/ui/typography";
import Header from "@/components/header";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notes",
};

function NoteCard(note: Note) {
  return (
    <Link
      href={note.link ? note.link : note.url}
      className="text-foreground group"
    >
      <Card>
        <CardContentContainer>
          <CardPrimaryContentContainer>
            <CardPrimaryContent>
              <P className="inline">{note.titleEn}</P>
              {note.link && (
                <MoveUpRight
                  size={16}
                  strokeWidth={1.75}
                  className="inline ml-0.5"
                />
              )}
            </CardPrimaryContent>
            <CardPrimaryContent>
              <P className="inline">{note.titleJa}</P>
              {note.link && (
                <MoveUpRight
                  size={16}
                  strokeWidth={1.75}
                  className="inline ml-0.5"
                />
              )}
            </CardPrimaryContent>
          </CardPrimaryContentContainer>
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
