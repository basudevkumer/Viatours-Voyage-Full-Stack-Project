import React from 'react'
import { createMetadata } from "@/lib/seo";
export const metadata = createMetadata({ title: "Log in | Viatours Voyage", description: "Log in to your Viatours Voyage account.", path: "/auth/login", robots: { index: false, follow: false } });
const Login = () => {
  return (
    <div>This is Login pages</div>
  )
}

export default Login;
