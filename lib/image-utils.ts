import sharp from "sharp";
import fs from "fs";
import path from "path";

export async function optimizeImage(imagePath: string) {
  const publicDir = path.join(process.cwd(), "public");
  const inputPath = path.join(publicDir, imagePath);
  const outputPath = path.join(publicDir, "optimized", imagePath);

  // Create output directory if it doesn't exist
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  await sharp(inputPath)
    .resize(1200, null, {
      // Max width 1200px, maintain aspect ratio
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 80,
      progressive: true,
    })
    .toFile(outputPath);

  return `/optimized${imagePath}`;
}
