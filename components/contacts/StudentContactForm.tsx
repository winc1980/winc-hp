"use client";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { RadioGroup } from "./RadioGroup";
import { TextArea } from "./TextArea";
import { TextInput } from "./TextInput";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useEffect,
  useTransition,
  useState,
} from "react";
import { submitStudentContact, ContactFormState } from "@/actions/contact";
import {
  studentFormSchema,
  StudentFormData,
  ContactCategory,
} from "@/lib/schemas/contact";
import { LoaderIcon } from "lucide-react";

function StudentContactForm({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const [serverState, setServerState] = useState<ContactFormState>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentFormData>({
    resolver: yupResolver(studentFormSchema) as Resolver<StudentFormData>,
  });

  useEffect(() => {
    if (serverState?.success) {
      reset();
    }
  }, [serverState, reset]);

  const onSubmit = (data: StudentFormData) => {
    if (data) {
      startTransition(() => {
        submitStudentContact(data).then((result) => {
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
              : "bg-red-100 text-red-800 border border-red-300",
          )}
        >
          {serverState.success ? serverState.message : serverState.error}
        </div>
      )}
      <div className="grid grid-cols-[200px_1fr] gap-8 my-4 w-full">
        <RadioGroup<ContactCategory>
          required
          label="お問い合わせ種別"
          values={[
            { value: "circle", label: "サークルについて" },
            { value: "lp", label: "ホームページ制作について" },
            { value: "other", label: "その他" },
          ]}
          errorMessage={errors.category?.message}
          {...register("category")}
        />
        <TextInput
          required
          label="お名前"
          id="name"
          autoComplete="name"
          {...register("name")}
          errorMessage={errors.name?.message}
        />
        <TextInput
          required
          label="メールアドレス"
          id="email"
          placeholder="example@winc.ne.jp"
          autoComplete="email"
          {...register("email")}
          errorMessage={errors.email?.message}
        />
        <TextInput
          label="所属"
          id="affiliation"
          autoComplete="organization"
          {...register("affiliation")}
          errorMessage={errors.affiliation?.message}
        />
        <TextArea
          required
          label="お問い合わせ内容"
          id="message"
          {...register("message")}
          errorMessage={errors.message?.message}
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

export { StudentContactForm };
