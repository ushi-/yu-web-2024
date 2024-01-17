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
    <Card>
      <CardContentContainer>
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
      <CardSecondaryContent />
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
