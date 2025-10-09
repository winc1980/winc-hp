import { TextArea } from "./TextArea";
import { TextInput } from "./TextInput";

function CompanyContactForm({ className }: { className?: string }) {
  return (
    <form className={`flex flex-col items-center gap-8 ${className}`}>
      <div className="grid grid-cols-[200px_1fr] gap-8 my-4 w-full">
        <TextInput label="法人・団体名" id="company" required />
        <TextInput label="所属部署名" id="affiliation" />
        <TextInput label="氏名" id="name" required />
        <TextInput label="メールアドレス" id="email" placeholder="example@winc.ne.jp" required />
        <TextArea label="お問い合わせ内容" id="message" required />
      </div>
      <button type="submit" className="flex gap-1 p-4 w-fit border-2 transition-colors duration-300 ease-in-out text-background button-slider from-blue-300 to-rose-300">
        この内容で送信
      </button>
    </form>
  );
}

export { CompanyContactForm }
