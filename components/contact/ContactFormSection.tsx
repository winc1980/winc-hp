import { ContactForm } from "./ContactForm";

function ContactFormSection() {
  return (
    <section className="w-full flex flex-col items-center divide-effect bg-background">
      <div className="w-full max-w-[1440px] flex flex-row items-stretch relative">
        <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
        <div className="w-full max-w-7xl">
          <div className="min-h-[80vh] flex flex-col justify-start py-16">
            <ContactForm />
          </div>
        </div>
        <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
      </div>
    </section>
  );
}

export { ContactFormSection };
