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
import Image from "next/image";

function ProjectCard(project: Project) {
  return (
    <Card className="flex-col-reverse gap-2.5">
      <CardContentContainer className="justify-between">
        <CardPrimaryContentContainer>
          <CardPrimaryContent>
            <H2>{project.taglineEn}</H2>
          </CardPrimaryContent>
          <CardPrimaryContent>
            <H2>{project.taglineJa}</H2>
          </CardPrimaryContent>
        </CardPrimaryContentContainer>
        <CardFooter>
          <Link href={project.url}>{`${project.title}, ${project.year}`}</Link>
        </CardFooter>
      </CardContentContainer>
      <CardSecondaryContent>
        {project.image && (
          <div className="w-full relative aspect-video">
            <Image
              className=" object-cover"
              src={project.image}
              alt={project.title}
              fill
            />
          </div>
        )}
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
