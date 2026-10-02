"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { updateProfile } from "@/services/authService";

export default function ProfileForm({ initialValues = { name: "", email: "" } }) {
  const [values, setValues] = useState(initialValues);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const update = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));
  const submit = async (event) => { event.preventDefault(); setLoading(true); setMessage(""); try { const result = await updateProfile(values); setMessage(result.message); } catch (error) { setMessage(error.message || "Profile could not be updated."); } finally { setLoading(false); } };
  return <form onSubmit={submit} className="grid gap-5 rounded-2xl border border-gray6 bg-white p-5 sm:p-7"><h1 className="title1 text-dark">Profile</h1><Input label="Name" autoComplete="name" value={values.name} onChange={update("name")} /><Input label="Email address" type="email" autoComplete="email" value={values.email} onChange={update("email")} /><Button type="submit" loading={loading} data-analytics-id="profile-save">Save profile</Button>{message && <p role="status" className="body4 text-text-secondary">{message}</p>}</form>;
}
