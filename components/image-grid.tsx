"use client";

import Image from "next/image";

interface ImageGridProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <Image
            src={image.src}
            alt={image.alt}
            width={600}
            height={400}
            className="rounded-lg"
            quality={90}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
