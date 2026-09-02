import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "cap-widget";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "cap-widget": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          required?: boolean;
          "data-cap-api-endpoint"?: string;
        },
        HTMLElement
      >;
    }
  }
}
