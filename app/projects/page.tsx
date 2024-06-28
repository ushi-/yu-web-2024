import Image from "next/image";
import Link from "next/link";
import { compareDesc } from "date-fns";
import { allProjects, Project } from "contentlayer/generated";

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

function ProjectCard(project: Project) {
  return (
    <Card className="p-0 lg:p-0 flex-col-reverse lg:flex-col-reverse gap-2.5 lg:gap-2.5 group">
      <CardContentContainer>
        <CardPrimaryContentContainer>
          <CardPrimaryContent>
            <Link
              href={project.url}
              className="group-hover:text-primary/70 transition-colors"
            >
              <P>{project.taglineEn}</P>
            </Link>
          </CardPrimaryContent>
          <CardPrimaryContent>
            <Link
              href={project.url}
              className="group-hover:text-primary/70 transition-colors"
            >
              <P>{project.taglineJa}</P>
            </Link>
          </CardPrimaryContent>
        </CardPrimaryContentContainer>
        <CardFooter>
          <Link
            className="group-hover:text-primary/70 transition-colors"
            href={project.url}
          >{`${project.title}, ${project.year}`}</Link>
        </CardFooter>
      </CardContentContainer>
      <CardSecondaryContent>
        <Link href={project.url}>
          {project.image && (
            <div
              className={cn(
                "w-full relative overflow-hidden",
                ["aspect-square", "aspect-video"].at(
                  Math.floor(Math.random() * 2)
                )
              )}
            >
              <Image
                className=" object-cover group-hover:scale-105 transition-transform"
                src={project.image}
                alt={project.title}
                fill
              />
            </div>
          )}
        </Link>
      </CardSecondaryContent>
    </Card>
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
        <div className="px-2.5 lg:px-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-x-5">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>
      </main>
    </>
  );
}
