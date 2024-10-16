import Image from "next/image";
import type { Metadata } from "next";
import { compareDesc } from "date-fns";
import { allProjects, Project } from "contentlayer/generated";

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
  title: "Projects",
};

function ProjectCard(project: Project) {
  return (
    <Link href={project.url} className="group text-foreground">
      <Card className="p-0 lg:p-0 flex-col-reverse lg:flex-col-reverse gap-2.5 lg:gap-2.5">
        <CardContentContainer>
          <CardPrimaryContentContainer>
            <CardPrimaryContent>
              <P>{project.taglineEn}</P>
            </CardPrimaryContent>
            <CardPrimaryContent>
              <P>{project.taglineJa}</P>
            </CardPrimaryContent>
          </CardPrimaryContentContainer>
          <CardFooter className="group-hover:text-primary/70 transition-colors">{`${project.title}, ${project.year}`}</CardFooter>
        </CardContentContainer>
        <CardSecondaryContent>
          {(project.image || project.thumbnail) && (
            <div
              className={cn(
                "w-full relative overflow-hidden",
                project.thumbnailOrientation === "landscape" &&
                  "aspect-[16/10]",
                project.thumbnailOrientation === "portrait" && "aspect-[2/3]",
                project.thumbnailOrientation === "square" && "aspect-square"
              )}
            >
              <Image
                className=" object-cover group-hover:opacity-80 transition-opacity"
                src={project.thumbnail ? project.thumbnail : project.image}
                alt={
                  project.thumbnail
                    ? project.thumbnailAlt
                      ? project.thumbnailAlt
                      : project.title
                    : project.imageAlt
                    ? project.imageAlt
                    : project.title
                }
                fill
                placeholder="blur"
                blurDataURL={
                  project.thumbnail
                    ? project.thumbnailPlaceholderData
                    : project.imagePlaceholderData
                }
              />
            </div>
          )}
        </CardSecondaryContent>
      </Card>
    </Link>
  );
}

export default function Home() {
  const projects = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <>
      <Header anchors={[{ label: "projects", href: "/projects" }]} />
      <main>
        <div className="px-2.5 lg:px-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-start gap-10 lg:gap-x-5">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>
      </main>
    </>
  );
}
