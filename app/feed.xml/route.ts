import RSS from "rss";
import { compareDesc } from "date-fns";

import { allNotes, allProjects, Note, Project } from "contentlayer/generated";

const feed = new RSS({
  title: "Notes by Yosuke Ushigome",
  description: "",
  site_url: "https://yosukeushigo.me",
  feed_url: `https://yosukeushigo.me/feed.xml`,
  copyright: `${new Date().getFullYear()} Yosuke Ushigome`,
  language: "en",
  pubDate: new Date(),
});

const allPosts = [...allNotes, ...allProjects];

allPosts
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  .map((post) => {
    if (post.url.includes("/notes/")) {
      const note = post as Note;
      feed.item({
        title: note.titleEn ? note.titleEn : note.titleJa ? note.titleJa : "",
        guid: `https://yosukeushigo.me/${note.url}`,
        url: `https://yosukeushigo.me/${note.url}`,
        date: note.date,
        description: note.subtitleEn
          ? note.subtitleEn
          : note.subtitleJa
          ? note.subtitleJa
          : "",
        author: "Yosuke Ushigome",
        categories: [],
      });
    }
    if (post.url.includes("/projects/")) {
      const project = post as Project;
      feed.item({
        title: project.title,
        guid: `https://yosukeushigo.me/projects/${project.slug}`,
        url: `https://yosukeushigo.me/projects/${project.slug}`,
        date: project.date,
        description: project.taglineEn,
        author: "Yosuke Ushigome",
        categories: [],
      });
    }
  });

export async function GET() {
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
