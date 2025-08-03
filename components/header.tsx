'use client';
import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useScrollStatus } from "@/hooks/scroll-status";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDirection, isScrollTop] = useScrollStatus();
  const onNavigate = () => setIsOpen(false);

  return (
    <>
      <div
        id="mobile-menu-bg"
        className={`${
          isOpen ? "opacity-100 z-5" : "opacity-0 -z-1"
        } h-screen w-screen fixed top-0 bg-background`}
      />
      <header
        className={`flex justify-center w-full top-0 px-4 z-10 border-b transition-all duration-300 ${
          isScrollTop
            ? "border-transparent bg-transparent"
            : "border-foreground/20 bg-background"
        } ${scrollDirection === "up" ? "fixed" : "absolute"}`}
      >
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } fixed h-screen w-screen z-20 bg-background`}
        >
          <div className="flex flex-col h-full justify-between pt-48 pb-24">
            <ul className="flex flex-col gap-4 text-xl font-medium px-8">
              <div className="font-mono">
                <Link onNavigate={onNavigate} href="/members">
                  <div>Members</div>
                </Link>
              </div>
              <div className="font-mono">
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSd77gukiHN_CpEvbhcMd7awd3VZqvx-f-I2g6kpYK2hUVhHxA/viewform">
                  <div>Contact</div>
                </Link>
              </div>
              <div className="font-mono">
                <Link onNavigate={onNavigate} href="/projects">
                  <div>Projects</div>
                </Link>
              </div>
              <div className="font-mono">
                <Link onNavigate={onNavigate} href="/news">
                  <div>News</div>
                </Link>
              </div>
            </ul>
            <footer className="flex flex-col text-zinc-500 text-xs px-8 my-8 gap-8">
              <div className="flex justify-center flex-wrap max-w-7xl gap-8">
                <Link href="https://x.com/WINC_waseda">
                  <Image
                    src="/external-assets/x-logo/logo-white.png"
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
        <div className="flex w-full justify-between items-center gap-3 max-w-7xl top-0 z-30 relative">
          <Link href="/" className="flex items-center">
            <Image
              src="/WINC-designs/black-logo.svg"
              width={380}
              height={24}
              alt="WINCアプリチーム"
              className="filter-invert object-cover hidden lg:block"
            />
            <Image
              src="/WINC-designs/Black Icon.svg"
              width={64}
              height={24}
              alt="WINCアプリチーム"
              className="filter-invert object-cover lg:hidden"
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
              <div className="hover:border-b-2">
                <Link href="/members">
                  <div>Members</div>
                </Link>
              </div>
              <div className="hover:border-b-2">
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSd77gukiHN_CpEvbhcMd7awd3VZqvx-f-I2g6kpYK2hUVhHxA/viewform">
                  <div>Contact</div>
                </Link>
              </div>
              <div className="hover:border-b-2">
                <Link href="/projects">
                  <div>Projects</div>
                </Link>
              </div>
              <div className="hover:border-b-2">
                <Link href="/news">
                  <div>News</div>
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
                  <div className="flex gap-1 p-4 w-fit border-2 transition-colors duration-300 ease-in-out text-background button-slider from-blue-300 to-rose-300">
                    新入生向け情報
                    <ArrowRight />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}