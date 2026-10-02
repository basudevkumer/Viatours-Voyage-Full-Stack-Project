import { createMetadata } from "@/lib/seo";
import ProfileForm from "@/components/shared/ProfileForm";
export const metadata = createMetadata({ title: "Profile | Viatours Voyage", description: "Manage your Viatours Voyage profile.", path: "/dashboards/profile", robots: { index: false, follow: false } });

export default function Profile() { return <ProfileForm />; }
