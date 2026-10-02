import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardTopbar from "@/components/layout/DashboardTopbar";

export const metadata = { title: "Your Account | Viatours Voyage", robots: { index: false, follow: false } };
const DashboardLayout = ({ children }) => <div className="min-h-screen bg-bg-grey"><DashboardTopbar /><div className="mx-auto grid max-w-[1320px] gap-6 px-4 py-8 md:grid-cols-[240px_1fr] md:py-12"><DashboardSidebar /><main className="min-w-0">{children}</main></div></div>;

export default DashboardLayout;
