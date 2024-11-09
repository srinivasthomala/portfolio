import { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export type VerticalElementType = {
  title: string;
  description: string;
  date: string;
  icon: React.FunctionComponentElement<any>;
};

export type Article = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  tags: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  tags: string[];
};
