import { MicroCMSImage } from "microcms-js-sdk";

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export interface InstagramPostType {
  id: string;
  media_type: InstagramMediaType;
  image: MicroCMSImage;
  caption: string;
  permalink: string;
  posted_at: string;
  instagram_id: string;
}
