import SectionHeading from "./section-heading";
import Image from "next/image";

export default function Sponsors() {
    return (
        <>
            <div className="divide-effect flex flex-col">
                <section className="gsap-trigger border-t border-b border-foreground/10 w-full max-w-7xl py-16 lg:py-32 relative mx-auto">
                    <SectionHeading titleEn="Affiliated with" titleJa="スポンサー様" />

                    <div className="mt-12 flex flex-col items-center justify-center gap-12 md:flex-row md:gap-24">
                        <Image
                            src="/affiliates/gmo-pepabo.svg"
                            width={400}
                            height={62}
                            alt="GMOペパボ株式会社"
                            className="h-auto w-auto max-w-[300px] md:max-w-[400px] object-contain"
                        />
                        <Image
                            src="/affiliates/progate.png"
                            width={400} 
                            height={62}
                            alt="Progate株式会社"
                            className="h-auto w-auto max-w-[300px] md:max-w-[400px] object-contain"
                        />
                    </div>
                </section>
            </div>
        </>
    );
}