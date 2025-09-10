import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center px-4 gap-8 bg-gradient-to-b from-transparent to-background divide-effect">
      <section className="flex flex-col lg:flex-row justify-around items-center w-full max-w-7xl text-end py-6 border-b-2">
        <p className="text-sm font-semibold p-3 text-gray-600 w-[-webkit-fill-available] lg:w-auto font-mono">
          Affiliated with
        </p>

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
      <section
        className="flex items-center
          gap-8 justify-between w-full max-w-7xl pr-3"
      >
        <Link href="/">
          <Image
            src="/WINC-classic-designs/logo.svg"
            width={160}
            height={24}
            alt="WINC: アプリチーム"
          />
        </Link>
        <div className="flex max-w-7xl gap-8">
          <Link href="https://x.com/WINC_waseda">
            <Image
              src="/external-assets/x-logo/logo-black.png"
              width={31}
              height={31}
              alt="公式X - @WINC_waseda"
              className="p-0.5"
            />
          </Link>
          <Link href="https://www.instagram.com/waseda_winc/">
            <Image
              src="/external-assets/IG_brand_asset_pack_2023/01 Static Glyph/01 Gradient Glyph/Instagram_Glyph_Gradient.svg"
              width={33}
              height={33}
              alt="公式Instagram - waseda_winc"
            />
          </Link>
        </div>
      </section>
      <section className="flex flex-col items-start max-w-7xl w-full">
        <Link href="/news" className="p-2 text-sm font-semibold">
          ニュース
        </Link>
        <Link href="/members" className="p-2 text-sm font-semibold">
          メンバー紹介
        </Link>
        <Link href="/projects" className="p-2 text-sm font-semibold">
          プロジェクト
        </Link>
        <Link href="" className="p-3 text-sm font-semibold">
          プライバシーポリシー
        </Link>
      </section>
      <section className="flex justify-between items-center w-full max-w-7xl text-end py-6 border-t-2 border-gray-100">
        <p className="text-left text-sm text-gray-400 px-3 font-mono">
          Created and developed only by waseda students. <br />
          No other company, organization, or Waseda University is related.
        </p>
        <p className="text-sm font-semibold p-3 text-gray-600 w-[-webkit-fill-available] lg:w-auto font-mono">
          © 2025 WINC
        </p>
      </section>
    </footer>
  );
}