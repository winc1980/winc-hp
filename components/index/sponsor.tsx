import SectionHeading from "./section-heading";
import Image from "next/image";


export default function Sponsors() {
    return (
        <>
            <div className="divide-effect flex flex-col" >
                <section className="gsap-trigger border-t border-b border-foreground/10 w-full max-w-7xl py-16 lg:py-32 relative">
                    <SectionHeading titleEn="Affiliated with" titleJa="スポンサー様" />

                    <Image
                        src="/affiliates/gmo-pepabo.svg"
                        width={200}
                        height={31}
                        alt="GMOペパボ株式会社"
                        className="p-0.5"
                    />
                    <Image
                        src="/affiliates/progate.png"
                        width={200}
                        height={31}
                        alt="Progate株式会社"
                        className="p-0.5"
                    />
                </section>
            </div>
        </>
    );
}