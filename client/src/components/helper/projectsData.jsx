import allImages from "./imageProvider";

const {tikit,daimond,airBlaun} =  allImages
 
const navLinks = [
  { id: 1, label: "DESTINATIONS", path: "/destinations" },
  { id: 2, label: "TOURS", path: "/tours" },
  { id: 3, label: "EXPERIENCES", path: "/activities" },
  { id: 4, label: "TRAVEL GUIDE", path: "/pages" },
  { id: 5, label: "DEALS", path: "/tours" },
  { id: 6, label: "ABOUT", path: "/pages" },
  { id: 7, label: "CONTACT", path: "/contact" },
];

export const footerData = [
  {
    id: 1,
    title: "Company",
    links: [
      { label: "About Us", path: "" },
      { label: "Tourz Reviews", path: "" },
      { label: "Contact Us", path: "" },
      { label: "Travel Guides", path: "" },
      { label: "Data Policy", path: "" },
      { label: "Cookie Policy", path: "" },
      { label: "Legal", path: "" },
      { label: "Sitemap", path: "" },
    ],
  },
  {
    id: 2,
    title: "Support",
    links: [
      { label: "Get in Touch", path: "" },
      { label: "Help center", path: "" },
      { label: "Live chat", path: "" },
      { label: "How it works", path: "" },
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
