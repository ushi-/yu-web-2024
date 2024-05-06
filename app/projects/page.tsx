import Image from "next/image";
import Link from "next/link";
import { compareDesc } from "date-fns";
import { allProjects, Project } from "contentlayer/generated";

import { H2 } from "@/components/ui/typography";
import Header from "@/components/header";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
  CardFooter,
} from "@/components/ui/card";

function ProjectCard(project: Project) {
  return (
    <Card className="flex-col-reverse gap-2.5 group">
      <CardContentContainer className="justify-between">
        <CardPrimaryContentContainer>
          <CardPrimaryContent>
            <Link
              href={project.url}
              className="group-hover:text-primary/70 transition-colors"
            >
              <H2>{project.taglineEn}</H2>
            </Link>
          </CardPrimaryContent>
          <CardPrimaryContent>
            <Link
              href={project.url}
              className="group-hover:text-primary/70 transition-colors"
            >
              <H2>{project.taglineJa}</H2>
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
            <div className="w-full relative aspect-video overflow-hidden">
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
      {projects.map((project, idx) => (
        <ProjectCard key={idx} {...project} />
      ))}
    </>
  );
}
