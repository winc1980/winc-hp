"use server";

import {
  companyFormSchema,
  studentFormSchema,
  CompanyFormData,
  StudentFormData,
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


export async function submitCompanyContact(
  data: CompanyFormData,
): Promise<ContactFormState> {
  try {
    await companyFormSchema.validate(data);
  } catch (error) {
    return { success: false, error: "入力内容に不備があります。" };
  }
  
  // todo: send email & save to DB

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, message: "お問い合わせを受け付けました。" };
}

export async function submitStudentContact(
  data: StudentFormData,
): Promise<ContactFormState> {
  try {
    await studentFormSchema.validate(data);
  } catch (error) {
    return { success: false, error: "入力内容に不備があります。" };
  }

  // todo: send email & save to DB
  
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, message: "お問い合わせを受け付けました。" };
}
