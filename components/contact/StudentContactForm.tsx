import { RadioGroup } from "./RadioGroup";
import { TextArea } from "./TextArea";
import { TextInput } from "./TextInput";

function StudentContactForm({ className }: { className?: string }) {
  return (
    <form className={`flex flex-col items-center gap-8 ${className}`}>
      <div className="grid grid-cols-[200px_1fr] gap-8 my-4 w-full">
        <RadioGroup
          label="お問い合わせ種別"
          name="category"
          values={[
            { id: "circle", value: "circle", label: "サークルについて" },
            { id: "lp", value: "lp", label: "ホームページ制作について" },
            { id: "other", value: "other", label: "その他" },
          ]}
          required
        />
        <TextInput label="お名前" id="name" required />
        <TextInput label="メールアドレス" id="email" placeholder="example@winc.ne.jp" required />
        <TextInput label="所属" id="affiliation" />
        <TextArea label="お問い合わせ内容" id="message" required />
      </div>
      <button type="submit" className="flex gap-1 p-4 w-fit border-2 transition-colors duration-300 ease-in-out text-background button-slider from-blue-300 to-rose-300">
        この内容で送信
      </button>
    </form>
  );
}

export { StudentContactForm };
