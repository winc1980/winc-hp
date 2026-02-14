import * as yup from "yup";

export const ContactCategories = ["circle", "lp", "other"] as const;
export type ContactCategory = (typeof ContactCategories)[number];
export const companyFormSchema = yup
  .object()
  .shape({
    company: yup.string().required("法人・団体名は必須です"),
    affiliation: yup.string(),
    name: yup.string().required("氏名は必須です"),
    email: yup
      .string()
      .email("有効なメールアドレスを入力してください")
      .required("メールアドレスは必須です"),
    message: yup.string().required("お問い合わせ内容は必須です"),
  })
  .required();
export type CompanyFormData = yup.InferType<typeof companyFormSchema>;


export const studentFormSchema = yup
  .object()
  .shape({
    category: yup
      .string()
      .oneOf(ContactCategories as readonly string[])
      .required("お問い合わせ種別は必須です"),
    name: yup.string().required("お名前は必須です"),
    email: yup
      .string()
      .email("有効なメールアドレスを入力してください")
      .required("メールアドレスは必須です"),
    affiliation: yup.string(),
    message: yup.string().required("お問い合わせ内容は必須です"),
  })
  .required();
export type StudentFormData = yup.InferType<typeof studentFormSchema>;