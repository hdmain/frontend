"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;

    function setup() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      if (motion.matches) return;

      observer = new IntersectionObserver((entries) => {
        const entering = entries.filter((entry) => entry.isIntersecting);
        entering.forEach((entry, index) => {
          const animation = entry.target.animate(
            [
              { opacity: 0.65, transform: "translateY(12px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 560, delay: Math.min(index * 45, 135), easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.15 });

      document.querySelectorAll(
        "#why h2, #services h2, #offer h2, #protection h2, #faq h2, #why ol > li, #offer ul > li, [data-motion-reveal]",
      ).forEach((element) => {
        // Leave everything already visible on load still and immediately readable.
        if (element.getBoundingClientRect().top >= window.innerHeight) observer?.observe(element);
      });
    }

    setup();
    motion.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      motion.removeEventListener("change", setup);
    };
  }, [pathname]);

  return null;
}
