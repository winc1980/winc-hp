'use client';
import { useEffect, useRef, useState } from "react";
import Loading from "@/components/layout/loading";

export default function LoadingOrBg() {
  const [loaded, setLoaded] = useState(false);
  const [showLoadscreen, setShowLoadscreen] = useState(true);
  const vantaRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLoaded(true);
    const timeoutId = setTimeout(() => setShowLoadscreen(false), 500);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // スクリプトをページ表示後に動的ロード — LCP/FCP/TTI をブロックしない
    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.body.appendChild(script);
      });

    let vantaEffect: { destroy: () => void } | null = null;

    const init = async () => {
      if (window.innerWidth < 768) return;
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        );
        await loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
        );
        const VANTA = (window as unknown as { VANTA: { NET: (opts: Record<string, unknown>) => { destroy: () => void } } }).VANTA;
        vantaEffect = VANTA.NET({
          el: "#homepage-background",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x888888,
          backgroundColor: 0xf8efe0,
        });
      } catch {
        // Vanta読み込み失敗時はグラデーション背景にフォールバック
      }
    };

    // requestIdleCallback があればアイドル時に実行、なければ setTimeout で遅延
    if (typeof requestIdleCallback !== "undefined") {
      vantaRef.current = requestIdleCallback(init, { timeout: 3000 }) as unknown as ReturnType<typeof setTimeout>;
    } else {
      vantaRef.current = setTimeout(init, 200);
    }

    return () => {
      if (vantaRef.current) {
        if (typeof requestIdleCallback !== "undefined") {
          cancelIdleCallback(vantaRef.current as unknown as number);
        } else {
          clearTimeout(vantaRef.current);
        }
      }
      vantaEffect?.destroy();
    };
  }, []);

  return (
    <>
      {showLoadscreen ? <Loading disabled={loaded} /> : <></>}
      <div
        id="homepage-background"
        className="fixed h-[calc(100vh_+_200px)] w-full -z-1 top-[-100px]"
        aria-hidden="true"
      />
    </>
  );
}
