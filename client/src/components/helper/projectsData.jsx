import allImages from "./imageProvider";

const {tikit,daimond,airBlaun} =  allImages
 
const navLinks = [
  {
    id: 1,
    label: "Home",
    path: "/",
  },
  {
    id: 2,
    label: "Tour",
    path: "",
    children: [
      { label: "Tour List", path: "/tour/list" },
      { label: "Tour Details", path: "/tour/details" },
    ],
  },
  {
    id: 3,
    label: "Destination",
    path: "",
  },
  {
    id: 4,
    label: "Activities",
    path: "",
  },
  {
    id: 5,
    label: "Pages",
    path: "",
    children: [
      { label: "About", path: "" },
      { label: "FAQ", path: "" },
    ],
  },
  {
    id: 6,
    label: "Contact",
    path: "",
  },
];

const navLinksleft = [
  { id: 1, label: "USD", href: "/currency" },
  { id: 2, label: "Sign up", href: "/signup" },
  { id: 3, label: "Log in", href: "/login" },
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

export { navLinks, navLinksleft, footerData, tourfeature };
