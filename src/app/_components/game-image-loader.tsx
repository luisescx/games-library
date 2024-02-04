"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type GameImageLoaderProps = {
  className: string;
  loaderClassName?: string;
  src: string;
  alt: string;
  quality?: number;
  defaultLoaderBg?: boolean;
  defaultTag?: boolean;
  children?: React.ReactNode;
};

export function GameImageLoader({
  src,
  alt,
  className,
  loaderClassName = "",
  quality = 50,
  defaultLoaderBg = true,
  defaultTag = false,
  children,
}: GameImageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div
        className={clsx("relative h-full w-full", {
          "animate-pulse": !isLoaded,
        })}
      >
        {!!src &&
          (!!defaultTag ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={alt}
              src={src}
              className={clsx(
                className,
                { "opacity-100 transition-opacity duration-700": isLoaded },
                { "opacity-0": !isLoaded },
              )}
              onLoad={() => setIsLoaded(true)}
            />
          ) : (
            <Image
              src={src}
              fill
              alt={alt}
              sizes="100vw, 100vh"
              priority
              quality={quality}
              className={clsx(
                className,
                { "opacity-100 transition-opacity duration-700": isLoaded },
                { "opacity-0": !isLoaded },
              )}
              onLoad={() => setIsLoaded(true)}
            />
          ))}

        <div
          className={clsx(
            "h-full w-full",
            { "bg-slate-700": !!defaultLoaderBg },
            loaderClassName,
          )}
        />
      </div>

      {!!children && <>{children}</>}
    </>
  );
}
