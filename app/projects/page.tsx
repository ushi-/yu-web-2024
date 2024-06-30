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
    <Link href={project.url} className="group">
      <Card className="p-0 lg:p-0 flex-col-reverse lg:flex-col-reverse gap-2.5 lg:gap-2.5">
        <CardContentContainer>
          <CardPrimaryContentContainer>
            <CardPrimaryContent>
              <P className="group-hover:text-primary/70 transition-colors">
                {project.taglineEn}
              </P>
            </CardPrimaryContent>
            <CardPrimaryContent>
              <P className="group-hover:text-primary/70 transition-colors">
                {project.taglineJa}
              </P>
            </CardPrimaryContent>
          </CardPrimaryContentContainer>
          <CardFooter className="group-hover:text-primary/70 transition-colors">
            {`${project.title}, ${project.year}`}
          </CardFooter>
        </CardContentContainer>
        <CardSecondaryContent>
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
                className=" object-cover group-hover:opacity-80 transition-opacity"
                src={project.image}
                alt={project.title}
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
