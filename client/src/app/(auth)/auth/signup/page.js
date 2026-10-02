import React from "react";
import { createMetadata } from "@/lib/seo";
export const metadata = createMetadata({ title: "Create account | Viatours Voyage", description: "Create your Viatours Voyage account.", path: "/auth/signup", robots: { index: false, follow: false } });
const Signin = () => {
  return <div>This is Signup pages</div>;
};

export default Signin;
