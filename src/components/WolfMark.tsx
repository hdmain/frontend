import { asset } from "@/lib/basePath";

type Props = {
  className?: string;
  /** Width in px when not sized by CSS. Prefer CSS for responsive max sizing. */
  size?: number;
};

/** Brand mark from /icon.svg — color via currentColor (CSS). */
export default function WolfMark({ className, size }: Props) {
  const src = asset("/icon.svg");

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        flexShrink: 0,
        aspectRatio: "473 / 412",
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...(size
          ? { width: size, height: size * (412 / 473) }
          : undefined),
      }}
      aria-hidden
    />
  );
}
