"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { register } from "@/services/authService";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AuthForm({ variant = "login" }) {
  const isSignup = variant === "signup";
  const router = useRouter();
  const { login, status } = useAuth();
  const [values, setValues] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const update = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    const next = {};
    if (isSignup && !values.name.trim()) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (values.password.length < 8) next.password = "Use at least 8 characters.";
    if (isSignup && values.confirmPassword !== values.password) next.confirmPassword = "Passwords do not match.";
    setErrors(next); setMessage("");
    if (Object.keys(next).length) return;
    setLoading(true);
    try {
      const result = isSignup ? await register({ name: values.name, email: values.email, password: values.password }) : await login({ email: values.email, password: values.password });
      if (!result.success) { setMessage(result.message); return; }
      router.push("/dashboards/bookings");
    } catch (error) { setMessage(error.message || "Your request could not be completed."); }
    finally { setLoading(false); }
  };
  return <form onSubmit={submit} noValidate className="grid gap-5">
    {isSignup && <Input label="Name" autoComplete="name" value={values.name} onChange={update("name")} error={errors.name} required />}
    <Input label="Email address" type="email" autoComplete="email" value={values.email} onChange={update("email")} error={errors.email} required />
    <Input label="Password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} value={values.password} onChange={update("password")} error={errors.password} required />
    {isSignup && <Input label="Confirm password" type="password" autoComplete="new-password" value={values.confirmPassword} onChange={update("confirmPassword")} error={errors.confirmPassword} required />}
    {message && <p role="alert" className="body4 text-error">{message}</p>}
    <Button type="submit" loading={loading || (!isSignup && status === "loading")} data-analytics-id={isSignup ? "signup-submit" : "login-submit"}>{isSignup ? "Create account" : "Log in"}</Button>
    <p className="body4 text-center text-text-secondary">{isSignup ? <>Already registered? <Link href="/auth/login" className="text-accent hover:underline">Log in</Link></> : <>New to Viatours? <Link href="/auth/signup" className="text-accent hover:underline">Create an account</Link></>}</p>
  </form>;
}
