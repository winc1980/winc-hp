'use client';
import Script from "next/script";
import { useEffect, useState } from "react";
import Loading from "@/components/layout/loading";



export default function LoadingOrBg() {
  const [loaded, setLoaded] = useState(false);
  const [showLoadscreen, setShowLoadscreen] = useState(true);


  useEffect(() => {
    setLoaded(true);
    const timeoutId = setTimeout(() => {
      setShowLoadscreen(false)
    }, 500)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])
  return <>

    {showLoadscreen ? <Loading disabled={loaded} /> : <></>}
    <div
      id="homepage-background"
      className="fixed h-[calc(100vh_+_200px)] w-full -z-1 top-[-100px] mix-blend-screen invert"
    ></div>
    <Script id="script">
      {`VANTA.NET({
              el: "#homepage-background",
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0xffffff,
              backgroundColor: 0x0
            });`}
    </Script>
  </>
}