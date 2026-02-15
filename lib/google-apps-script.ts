import { CompanyFormData, StudentFormData } from "./schemas/contact";

const GAS_SCRIPT_URL = process.env.GAS_SCRIPT_URL;

if (!GAS_SCRIPT_URL) {
  throw new Error("GAS_SCRIPT_URL is not defined");
}


const create = async (data: CompanyFormData | StudentFormData) => {
  const res = await fetch(GAS_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to submit contact form");
  }
};

export const contactSpreadsheet = { create };