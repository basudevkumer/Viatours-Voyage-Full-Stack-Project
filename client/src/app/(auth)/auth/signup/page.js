import { createMetadata } from "@/lib/seo";
import AuthForm from "@/components/shared/AuthForm";
export const metadata = createMetadata({ title: "Create account | Viatours Voyage", description: "Create your Viatours Voyage account.", path: "/auth/signup", robots: { index: false, follow: false } });
export default function Signup() { return <><h1 className="title1 mb-2 text-dark">Create your account</h1><p className="body4 mb-6 text-text-secondary">Save the trips you want to come back to.</p><AuthForm variant="signup" /></>; }
