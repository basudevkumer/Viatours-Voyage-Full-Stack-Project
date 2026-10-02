import { createMetadata } from "@/lib/seo";
import WishlistPageContent from "@/components/layout/WishlistPageContent";

export const metadata = createMetadata({ title: "Wishlist | Viatours Voyage", description: "View the tours and experiences you have saved.", path: "/dashboards/wishlist", robots: { index: false, follow: false } });
export default function WishlistPage() {
  return <WishlistPageContent />;
}
