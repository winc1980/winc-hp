"use client";
import { InstagramPostType } from "@/types/Instagram";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";

export default function InstagramCard({ post }: { post: InstagramPostType }) {
  gsap.registerPlugin(ScrollTrigger);
  const scope = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "+=50%",
          scrub: true,
        },
      });
      tl.from(scope.current, {
        duration: 1,
        y: 60,
        autoAlpha: 0,
      });
    },
    { scope: scope }
  );

  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    setFormattedDate(
      new Date(post.posted_at).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, [post.posted_at]);

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      ref={scope}
    >
      <article className="bg-foreground/10 border border-foreground/10 p-2 h-full transition-all duration-300">
        <div className="flex flex-col bg-background hover:bg-foreground/80 hover:text-background transition-all duration-300 rounded-2xl overflow-hidden h-full">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={post.image.url}
              alt={post.caption?.slice(0, 50) ?? "Instagram投稿"}
              width={post.image.width ?? 640}
              height={post.image.height ?? 640}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
            {post.media_type === "VIDEO" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-3">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
            )}
          </div>
          <div className="p-4 flex flex-col gap-2">
            <p className="font-mono text-sm opacity-60">{formattedDate}</p>
            {post.caption && (
              <p className="text-sm line-clamp-2">{post.caption}</p>
            )}
          </div>
        </div>
      </article>
    </a>
  );
}
