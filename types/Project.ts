import { MicroCMSImage } from "microcms-js-sdk";
import { MemberType } from "./Member";

// export interface TechnologyType {
//     name: string;
//     icon: MicroCMSImage;
//   }

export type ProjectGenre = "web" | "app" | "other";

export interface ProjectType {
    id: string;
    title: string;
    description: string;
    images: MicroCMSImage[];
    technologies: string[];
    members: MemberType[];
    completeDate: Date;
    genre?: ProjectGenre[];
  }

export interface ParsedTechType {
  name: string;
  url: string;
  image: string;
}
