import Image from "next/image";

/** A screenshot with light and dark variants; the one matching the site theme shows. */
export function ThemedShot({ base, width, height, alt, sizes }: { base: string; width: number; height: number; alt: string; sizes: string }) {
  const img = "h-auto w-full rounded-lg border border-rule bg-paper";
  return (
    <>
      <Image src={`${base}-light.png`} alt={alt} width={width} height={height} sizes={sizes} className={`${img} dark:hidden`} />
      <Image src={`${base}-dark.png`} alt={alt} width={width} height={height} sizes={sizes} className={`${img} hidden dark:block`} />
    </>
  );
}
