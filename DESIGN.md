# AlfaHost visual direction

Cinematic dark hosting storefront. Preserve existing English, Polish and Russian content, currency selection, product availability and offer routes.

Use near-black charcoal surfaces, warm off-white text and a focused crimson accent. Syne is the display voice; Manrope handles reading and controls. Large, balanced headings and generous section spacing establish hierarchy. The existing data-centre photograph is the hero's visual anchor, desaturated with crimson lighting and a dark directional scrim. Photography is illustrative; it does not certify a specific facility.

Motion stays minimal: retain the hero entrance, reveal below-the-fold headings and selected cards once with a 12px rise over 560ms, and use short transitions for navigation, button arrows and the mobile menu. Keep content visible without JavaScript and disable added movement for reduced-motion preferences. Benefits and infrastructure details use open layouts and fine separators. Product cards retain game imagery, pricing and clear availability. Buttons follow the existing shadcn/Base UI contract and use CSS Modules to match this project's styling pipeline.

Default to dark. Retain the user's explicit light-theme preference and the theme toggle. Ensure visible keyboard focus, responsive layouts, readable contrast and accessible disclosure controls.

The light theme uses cool off-white backgrounds, white cards, slate text and deep crimson actions. Keep photography crisp on service cards; use a separate pale directional scrim for the hero. Logos stay dark and legible, availability badges use a pale green surface, and the footer wordmark retains visible contrast. Initialize the saved theme before hydration and match the browser theme color.

Navigation uses three grouped disclosures: hosting offers, company/infrastructure and support. Product links lead to dedicated localized game-server, NAT VPS and VPS pages; infrastructure, DDoS and FAQ also have standalone routes. Keep native links, visible current-page states, click-outside dismissal and Escape/Tab/ArrowDown keyboard access. On small screens the same groups expand inside the mobile navigation. Preserve catalog availability and the existing live package pricing on product pages.

The homepage presents service categories with links to their dedicated offers; product catalog cards belong on the product pages. The games catalog also includes Discord bot hosting. State explicitly that all servers are currently located in Warsaw, Poland.
