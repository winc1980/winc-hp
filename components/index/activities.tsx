import ActivityArticle from "./activity-article";
import SectionHeading from "./section-heading";

export default function Activities() {
  return (
    <div className="divide-effect flex flex-col justify-center">
      <section className="border-t border-b border-foreground/10 w-full max-w-7xl py-32 flex flex-col gap-20">
        <SectionHeading titleEn="what we do" titleJa="主な活動内容" />
        <div>
          <div className="divide-effect">
            <div className="lg:grid lg:grid-cols-15 max-w-7xl">
              <ActivityArticle
                className="lg:col-span-9"
                imageSrc="/icons/coding-icon.svg"
                imageAlt="コーディング"
                titleEn="Coding"
                titleJa="コーディング"
                body={
                  <>
                    3~5人のチームで、実際の開発現場で使用される手法を用いて、最新技術によるアプリ開発を進めます。
                    <br />
                    用件定義、設計、実装、テスト、リリースの各工程を、ウォーターフォール開発またはアジャイル開発で進行します。
                    <br />
                    ネイティブアプリ開発ではFlutter、ウェブアプリ開発では主にNext.jsを使用しています。
                  </>
                }
              />
              <ActivityArticle
                className="lg:col-span-6"
                imageSrc="/icons/code-review-icon.svg"
                imageAlt="コードレビュー"
                titleEn="Code Reviewing"
                titleJa="コードレビュー"
                body={
                  <>
                    書籍の情報やインターンでの実務で得た経験をもとに、コードの可読性や保守性を考慮し、より良いコードを書くためのアドバイスを行います。
                    <br />
                    レビューを受けることで、他のメンバーの考え方や技術を学ぶことができるのは、個人開発では得られないメリットです。
                  </>
                }
              />
              <ActivityArticle
                className="lg:col-span-5"
                imageSrc="/icons/idea-icon.svg"
                imageAlt="アイデア出し"
                titleEn="Brainstorming"
                titleJa="アイデア出し"
                body={
                  <>
                    アプリ開発とウェブ制作の一番の違いは、提供するものがサービスだということ。
                    <br />
                    ミニビジコンのような形でアイデアを出し合い、検討します。
                    <br />
                  </>
                }
              />
              <ActivityArticle
                className="lg:col-span-6"
                imageSrc="/icons/definition-icon.svg"
                imageAlt="要件定義"
                titleEn="Requirements Definition"
                titleJa="要件定義"
                body={
                  <>
                    チームでの計画的なアプリ開発に欠かせないのが要件定義。
                    <br />
                    これから制作するアプリは、どんな人に、どんな価値を提供するのか。どんな機能を実装するのか。
                    <br />
                    最低限の機能を実装するMVPを考え、開発の指針とします。
                    <br />
                  </>
                }
              />
              <ActivityArticle
                className="lg:col-span-4"
                imageSrc="/icons/marketing-icon.svg"
                imageAlt="運営"
                titleEn="Management"
                titleJa="運営"
                body={
                  <>
                    作ったらおわりではないのがアプリ開発。
                    <br />
                    保守やマネタイズなど、継続的な価値提供のために知恵を絞り尽くします。
                    <br />
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
