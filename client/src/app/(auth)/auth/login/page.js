import { createMetadata } from "@/lib/seo";
import AuthForm from "@/components/shared/AuthForm";
export const metadata = createMetadata({ title: "Log in | Viatours Voyage", description: "Log in to your Viatours Voyage account.", path: "/auth/login", robots: { index: false, follow: false } });
export default function Login() { return <><h1 className="title1 mb-2 text-dark">Welcome back</h1><p className="body4 mb-6 text-text-secondary">Log in to continue planning your trips.</p><AuthForm variant="login" /></>; }
