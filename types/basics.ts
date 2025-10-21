import { MicroCMSImage } from "microcms-js-sdk";

type ActivityType = {
  fieldId: "activity_card";
  title: string;
  title_en: string;
  icon: MicroCMSImage;
  body: string;
};

type BasicSettingsType = {
  hero_images: MicroCMSImage[];
  about_image: MicroCMSImage;
  about_description: string;
  join_heading: string;
  join_body: string;
  activity_1: ActivityType;
  activity_2: ActivityType;
  activity_3: ActivityType;
  activity_4: ActivityType;
  activity_5: ActivityType;
};

export type { ActivityType, BasicSettingsType };