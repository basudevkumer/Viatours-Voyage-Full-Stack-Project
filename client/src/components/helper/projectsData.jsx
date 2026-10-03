import allImages from "./imageProvider";

const {tikit,daimond,airBlaun} =  allImages
 
const navLinks = [
  { id: 1, label: "DESTINATIONS", path: "/destinations" },
  { id: 2, label: "TOURS", path: "/tours" },
  { id: 3, label: "EXPERIENCES", path: "/activities" },
  { id: 4, label: "TRAVEL GUIDE", path: "/travel-guide" },
  { id: 5, label: "DEALS", path: "/deals" },
  { id: 6, label: "ABOUT", path: "/about" },
  { id: 7, label: "CONTACT", path: "/contact" },
];

export const footerData = [
  {
    id: 1,
    title: "Company",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Special Deals", path: "/deals" },
      // TODO(routes): Add a reviews page before linking this item.
      { label: "Viatours Reviews", path: "#" },
      { label: "Contact Us", path: "/contact" },
      { label: "Travel Guides", path: "/travel-guide" },
      // TODO(routes): Add a data policy page before linking this item.
      { label: "Data Policy", path: "#" },
      // TODO(routes): Add a cookie policy page before linking this item.
      { label: "Cookie Policy", path: "#" },
      // TODO(routes): Add a legal page before linking this item.
      { label: "Legal", path: "#" },
      // TODO(routes): Add a sitemap page before linking this item.
      { label: "Sitemap", path: "#" },
    ],
  },
  {
    id: 2,
    title: "Support",
    links: [
      { label: "Get in Touch", path: "/contact" },
      // TODO(routes): Add a help center page before linking this item.
      { label: "Help center", path: "#" },
      // TODO(routes): Add live chat before linking this item.
      { label: "Live chat", path: "#" },
      // TODO(routes): Add a how it works page before linking this item.
      { label: "How it works", path: "#" },
    ],
  },
];

const tourfeature = [
  {
    title: "Ultimate flexibility",
    img: tikit, 
    description: "You're in control, with free cancellation and payment.",
  },
  {
    title: "Memorable experiences",
    img: airBlaun,
    description: "Browse and book tours and activities so incredible.",
  },
  {
    title: "Quality at our core",
    img: daimond,
    description: "High quality standards. Millions of reviews.",
  },
];

export { navLinks, tourfeature };
