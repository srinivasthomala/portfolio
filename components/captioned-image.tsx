"use client";

import Image from "next/image";

interface CaptionedImageProps {
  src: string;
  alt: string;
  caption: string;
}

export default function CaptionedImage({
  src,
  alt,
  caption,
}: CaptionedImageProps) {
  return (
    <figure className="my-6">
      <div className="relative">
        <Image
          src={src}
          alt={alt}
          width={600}
          height={400}
          className="rounded-lg"
          quality={90}
          loading="lazy"
        />
      </div>
      <figcaption className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
        {caption}
      </figcaption>
    </figure>
  );
}
