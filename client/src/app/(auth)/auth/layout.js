import AuthCard from "@/components/layout/AuthCard";

export const metadata = { title: "Account Access | Viatours Voyage", robots: { index: false, follow: false } };
const AuthLayout = ({ children }) => <AuthCard>{children}</AuthCard>;

export default AuthLayout
