"use server";

import { EmailTemplate } from "@/components/contacts/EmailTemplate";
import { discord } from "@/lib/discord";
import { contactSpreadsheet } from "@/lib/google-apps-script";
import { resend } from "@/lib/resend";
import {
  companyFormSchema,
  studentFormSchema,
  CompanyFormData,
  StudentFormData,
  isCompanyContact,
} from "@/lib/schemas/contact";

export type ContactFormState =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: string;
    }
  | null;

const EMAIL_FROM = process.env.RESEND_EMAIL_FROM;

export async function submitContact(
  data: StudentFormData | CompanyFormData,
  token: string | null,
): Promise<ContactFormState> {
  if (!token) {
    return { success: false, error: "トークンが無効です。" };
  }

  const verifyRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
      headers: { "Content-Type": "application/json" },
    },
  );
  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return { success: false, error: "トークンの検証に失敗しました。" };
  }

  try {
    if (isCompanyContact(data)) {
      await companyFormSchema.validate(data);
    } else {
      await studentFormSchema.validate(data);
    }
  } catch (error) {
    return { success: false, error: "入力内容に不備があります。" };
  }

  try {
    await contactSpreadsheet.create(data);
  } catch (error) {
    console.error("Error saving to spreadsheet:", error);
    return { success: false, error: "お問い合わせの保存に失敗しました。" };
  }

  try {
    await resend.emails.send({
      from: `早稲田コンピューター研究会 WINC <${EMAIL_FROM}>`,
      to: data.email,
      subject: "お問い合わせを受け付けました",
      react: EmailTemplate({
        name: data.name,
        email: data.email,
        body: data.message,
      }),
    });

    await discord.notifyContactSubmission(data);
  } catch (error) {
    console.error("Failed post saving actions in contact submission:", error);
  }

  return { success: true, message: "お問い合わせを受け付けました。" };
}
