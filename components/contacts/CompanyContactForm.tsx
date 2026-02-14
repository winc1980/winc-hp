"use client";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { TextArea } from "./TextArea";
import { TextInput } from "./TextInput";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, useTransition } from "react";
import { companyFormSchema, CompanyFormData } from "@/lib/schemas/contact";
import { ContactFormState, submitCompanyContact } from "@/actions/contact";
import { LoaderIcon } from "lucide-react";

function CompanyContactForm({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const [serverState, setServerState] = useState<ContactFormState>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyFormData>({
    resolver: yupResolver(companyFormSchema) as Resolver<CompanyFormData>,
  });

  useEffect(() => {
    if (serverState?.success) {
      reset();
    }
  }, [serverState, reset]);

  const onSubmit = (data: CompanyFormData) => {
    if (data) {
      startTransition(() => {
        submitCompanyContact(data).then((result) => {
          setServerState(result);
        });
      });
    }
  };

  return (
    <form
      className={cn("flex flex-col items-center gap-8", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      {serverState && (
        <div
          className={cn(
            "w-full p-4 rounded-md text-sm",
            serverState.success
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          )}
        >
          {serverState.success ? serverState.message : serverState.error}
        </div>
      )}
      <div className="grid grid-cols-[200px_1fr] gap-8 my-4 w-full">
        <TextInput
          required
          label="法人・団体名"
          id="company"
          autoComplete="organization"
          errorMessage={errors.company?.message}
          {...register("company")}
        />
        <TextInput
          label="所属部署名"
          id="affiliation"
          autoComplete="on"
          errorMessage={errors.affiliation?.message}
          {...register("affiliation")}
        />
        <TextInput
          required
          label="氏名"
          id="name"
          autoComplete="name"
          errorMessage={errors.name?.message}
          {...register("name")}
        />
        <TextInput
          required
          label="メールアドレス"
          id="email"
          placeholder="example@winc.ne.jp"
          autoComplete="email"
          errorMessage={errors.email?.message}
          {...register("email")}
        />
        <TextArea
          required
          label="お問い合わせ内容"
          id="message"
          errorMessage={errors.message?.message}
          {...register("message")}
        />
      </div>
      <PrimaryButton type="submit" disabled={isPending}>
        {isPending ? (
          <div className="flex items-center">
            <LoaderIcon className="animate-spin mr-2" size={16} />
            送信しています...
          </div>
        ) : (
          "この内容で送信"
        )}
      </PrimaryButton>
    </form>
  );
}

export { CompanyContactForm };
