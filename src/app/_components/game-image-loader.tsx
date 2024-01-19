"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type GameImageLoaderProps = {
  className: string;
  src: string;
  alt: string;
};

export function GameImageLoader({ src, alt, className }: GameImageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={clsx("relative h-full w-full", { "animate-pulse": !isLoaded })}
    >
      {!!src && (
        <Image
          src={src}
          fill
          alt={alt}
          sizes="100vw, 100vh"
          priority
          quality={50}
          className={clsx(
            className,
            { "opacity-100 transition-opacity duration-700": isLoaded },
            { "opacity-0": !isLoaded },
          )}
          onLoad={() => setIsLoaded(true)}
        />
      )}

      <div className="h-full w-full bg-slate-700" />
    </div>
  );
}
