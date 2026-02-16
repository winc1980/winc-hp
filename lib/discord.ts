import { CompanyFormData, isCompanyContact, StudentFormData } from "./schemas/contact";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

if (!DISCORD_WEBHOOK_URL) {
  throw new Error("DISCORD_WEBHOOK_URL is not defined");
}

const notifyContactSubmission = async (
  data: CompanyFormData | StudentFormData,
) => {
  const content = [
    `**区分**: ${isCompanyContact(data) ? "法人・その他" : "学生"}`,
    isCompanyContact(data) && `**法人・団体名**: ${data.company}`,
    !isCompanyContact(data) && `**種別**: ${data.category}`,
    data.affiliation && `**所属**: ${data.affiliation}`,
    `**氏名**: ${data.name}`,
    `**連絡先**: ${data.email}`,
    `**内容**:\n${data.message}`,
  ]
    .filter(Boolean)
    .join("\n");
  const payload = {
    content: `🔔 **新規お問い合わせ**
-----------------------------------
${content}
-----------------------------------`,
  };

  const response = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.error(
      "Failed to send Discord notification:",
      await response.text(),
    );
    throw new Error("Failed to send to Discord");
  }
};

export const discord = { notifyContactSubmission };
