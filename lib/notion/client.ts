import { Client } from "@notionhq/client";

if (!process.env.NOTION_API_SECRET) {
  throw new Error("NOTION_API_SECRET is not defined");
}

export const notion = new Client({
  auth: process.env.NOTION_API_SECRET,
});

export const DATABASE_ID = process.env.NOTION_DATABASE_ID ?? "";
