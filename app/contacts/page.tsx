import { ContactFormSection } from "@/components/contacts/ContactFormSection";
import PageHeader from "@/components/page-header";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <PageHeader
        titleJa="お問い合わせ"
        titleEn="contact"
        desc="活動についてのご質問や制作案件のご依頼など、お気軽にお問い合わせください。"
      />
      <ContactFormSection />
    </main>
  );
}
