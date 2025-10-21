'use client';
import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useScrollStatus } from "@/hooks/scroll-status";
import { PrimaryButton } from "./buttons/PrimaryButton";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDirection, isScrollTop] = useScrollStatus();
  const onNavigate = () => setIsOpen(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div onMouseLeave={() => setExpanded(false)}>
      <div
        id="mobile-menu-bg"
        className={`${isOpen ? "opacity-100 z-5" : "opacity-0 -z-1"
          } h-screen w-screen fixed top-0 bg-background`}
      />
      <header
        className={`flex justify-center w-full top-0 px-4 z-20 border-b transition-all duration-300 ${isScrollTop
          ? "border-transparent bg-transparent"
          : "border-foreground/20 bg-background"
          } ${scrollDirection === "up" ? "fixed" : "absolute"}`}
      >
        <div
          className={`${isOpen ? "block" : "hidden"
            } fixed h-screen w-screen z-20 bg-background`}
        >
          <div className="flex flex-col h-full justify-between pt-48 pb-24">
            <ul className="flex flex-col gap-4 text-sm font-medium px-8">
              <li className="font-bold text-muted-foreground mt-4">プロジェクト</li>
              <ul className="pl-4 space-y-2">
                <li>
                  <Link onNavigate={onNavigate} href="/projects#apps">
                    アプリ開発
                  </Link>
                </li>
                <li>
                  <Link onNavigate={onNavigate} href="/projects#web">
                    ホームページ制作
                  </Link>
                </li>
              </ul>
            </ul>
            <footer className="flex flex-col text-zinc-500 text-xs px-8 my-8 gap-8">
              <div className="flex justify-center flex-wrap max-w-7xl gap-8">
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
              <section className="flex flex-wrap gap-3">
                <Link onNavigate={onNavigate} href="">
                  プライバシーポリシー
                </Link>
                <Link onNavigate={onNavigate} href="">
                  利用規約
                </Link>
              </section>
              <section className="w-full max-w-7xl text-end">
                <p>© 2025 WINC</p>
              </section>
            </footer>
          </div>
        </div>
        <div className="flex w-full justify-between items-center gap-3 max-w-7xl top-0 z-30 relative py-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/WINC-classic-designs/logo.svg"
              width={160}
              height={24}
              alt="WINCアプリチーム"
              className="filter-invert object-cover hidden lg:block"
            />
            <Image
              src="/WINC-classic-designs/icon.svg"
              width={56}
              height={56}
              alt="WINCアプリチーム"
              className="filter-invert object-cover lg:hidden p-2"
            />
          </Link>
          {isOpen ? (
            <X className="h-6 lg:hidden" onClick={() => setIsOpen(!isOpen)} />
          ) : (
            <Menu
              className="h-6 lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
          <div className="hidden lg:block">
            <div className="flex gap-6 items-center uppercase font-bold">
              <div className="hover:border-b-2 border-foreground transition-all" onMouseEnter={() => setExpanded(true)}>
                <Link href="/projects">
                  <div>プロジェクト・制作実績</div>
                </Link>
              </div>
              <div className="hover:border-b-2 border-foreground transition-all" onMouseEnter={() => setExpanded(false)}>
                <Link href="/contacts">
                  <div>お問い合わせ</div>
                </Link>
              </div>
              <div>
                <Link href="https://x.com/WINC_waseda">
                  <div>
                    <Image
                      src="/external-assets/x-logo/logo-black.png"
                      width={24}
                      height={24}
                      alt="公式X - @WINC_waseda"
                      className="p-0.5"
                    />
                  </div>
                </Link>
              </div>
              <div>
                <Link href="https://www.instagram.com/waseda_winc/">
                  <div>
                    <Image
                      src="/external-assets/IG_brand_asset_pack_2023/01 Static Glyph/03 Black Glyph/Instagram_Glyph_Black.svg"
                      width={24}
                      height={24}
                      alt="公式Instagram - waseda_winc"
                    />
                  </div>
                </Link>
              </div>
              <div className="min-w-[166px]">
                <Link href="https://secure.register.winc.ne.jp/">
                  <PrimaryButton>
                    秋入会受付中
                    <ArrowRight />
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={`fixed hidden md:block top-0 left-0 w-full border-b-4 p-8 transition-all duration-500 ${expanded ? "h-[50vh] border-foreground bg-background" : "h-0 border-transparent bg-transparent"}`}>
          {expanded && (
            <div className="w-full max-w-7xl mx-auto h-full flex gap-8 pt-16">
              <Link href="/projects#apps" className="grow-3 bg-black/10 rounded-xl h-full grow flex items-center p-8 bg-cover hover:bg-  bg-[url(/test-images/Gemini_Generated_Image_b0pgxyb0pgxyb0pg.png)]">
                <p className="w-fit text-2xl font-semibold bg-background p-2 rounded">アプリ開発</p>
              </Link>
              <Link href="/projects#web" className="grow-2 bg-black/10 rounded-xl h-full grow flex items-center p-8 bg-cover bg-[url(/test-images/Gemini_Generated_Image_b0pgxyb0pgxyb0pg.png)]">
                <p className="w-fit text-2xl font-semibold bg-background p-2 rounded">ホームページ制作</p>
              </Link>
            </div>)}
        </div>
      </header>
    </div>
  );
}
