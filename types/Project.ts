import { MicroCMSImage } from "microcms-js-sdk";
import { MemberType } from "./Member";

export interface TechnologyType {
    name: string;
    icon: MicroCMSImage;
  }

export interface ProjectType {
    id: string;
    title: string;
    description: string;
    images: MicroCMSImage[];
    technologies: TechnologyType[];
    members: MemberType[];
    completeDate: Date;
  }

export interface ParsedTechType {
  name: string;
  url: string;
  image: string;
}
