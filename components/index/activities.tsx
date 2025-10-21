import { BasicSettingsType } from "@/types/basics";
import ActivityArticle from "./activity-article";
import SectionHeading from "./section-heading";

export default function Activities({basicSettings}: { basicSettings: BasicSettingsType }) {
  return (
    <div className="divide-effect flex flex-col justify-center">
      <section className="border-t border-b border-foreground/10 w-full max-w-7xl py-32 flex flex-col gap-20">
        <SectionHeading titleEn="activities" titleJa="主な活動内容" />
        <div>
          <div className="divide-effect">
            <div className="lg:grid lg:grid-cols-15 max-w-7xl">
              <ActivityArticle
                className="lg:col-span-9"
                activity={basicSettings.activity_1}
              />
              <ActivityArticle
                className="lg:col-span-6"
                activity={basicSettings.activity_2}
              />
              <ActivityArticle
                className="lg:col-span-5"
                activity={basicSettings.activity_3}
              />
              <ActivityArticle
                className="lg:col-span-6"
                activity={basicSettings.activity_4}
              />
              <ActivityArticle
                className="lg:col-span-4"
                activity={basicSettings.activity_5}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
