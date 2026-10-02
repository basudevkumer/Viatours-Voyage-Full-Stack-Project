import Link from "next/link";
import UserMenu from "@/components/layout/UserMenu";
import Container from "@/components/shared/Container";

export default function DashboardTopbar() {
  return <header className="border-b border-gray6 bg-white"><Container className="flex min-h-16 items-center justify-between"><Link href="/" className="title3 text-dark">Viatours Voyage</Link><UserMenu /></Container></header>;
}
