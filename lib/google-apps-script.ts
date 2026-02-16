import { CompanyFormData, StudentFormData } from "./schemas/contact";

const GAS_SCRIPT_URL = process.env.GAS_SCRIPT_URL;
const GAS_SECRET_TOKEN = process.env.GAS_SECRET_TOKEN;

if (!GAS_SCRIPT_URL) {
  throw new Error("GAS_SCRIPT_URL is not defined");
}

if (!GAS_SECRET_TOKEN) {
  throw new Error("GAS_SECRET_TOKEN is not defined");
}


const create = async (data: CompanyFormData | StudentFormData) => {
  const res = await fetch(GAS_SCRIPT_URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({token: GAS_SECRET_TOKEN, ...data}),
  });

  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to submit contact form");
  }
};

export const contactSpreadsheet = { create };