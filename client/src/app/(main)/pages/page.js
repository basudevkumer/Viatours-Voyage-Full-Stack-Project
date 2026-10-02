import { redirect } from "next/navigation";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Travel Guides | Viatours Voyage", description: "Travel guides and inspiration from Viatours Voyage.", path: "/pages" });

export default function LegacyPagesRoute() {
  redirect("/travel-guide");
}
