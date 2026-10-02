"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { submitContact } from "@/services/contactService";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

const initial = { name: "", email: "", subject: "", message: "" };
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function mapErrors(errors = []) { return errors.reduce((result, item) => { if (item?.field) result[item.field] = item.message; return result; }, {}); }

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const toast = useToast();
  const update = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = "Enter your name.";
    if (!validEmail.test(values.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!values.subject) nextErrors.subject = "Choose a subject.";
    if (values.message.trim().length < 10) nextErrors.message = "Message must be at least 10 characters.";
    setErrors(nextErrors); setServerError(""); setSuccess("");
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    try {
      const result = await submitContact(values);
      if (!result.success) { setErrors(mapErrors(result.errors)); setServerError(result.message); toast.error(result.message); return; }
      setSuccess(result.message); setValues(initial); toast.success(result.message);
    } catch (error) { setServerError(error.message || "We could not send your message."); }
    finally { setLoading(false); }
  };
  return <form onSubmit={submit} noValidate className="grid gap-5" aria-describedby={serverError ? "contact-server-error" : success ? "contact-success" : undefined}>
    <Input label="Name" autoComplete="name" value={values.name} onChange={update("name")} error={errors.name} required />
    <Input label="Email address" type="email" autoComplete="email" value={values.email} onChange={update("email")} error={errors.email} required />
    <Select label="Subject" value={values.subject} onChange={update("subject")} error={errors.subject} required><option value="">Choose a subject</option><option value="booking">A booking question</option><option value="trip">Help planning a trip</option><option value="other">Something else</option></Select>
    <Textarea label="Message" value={values.message} onChange={update("message")} error={errors.message} rows={6} required />
    {serverError && <p id="contact-server-error" role="alert" className="body4 text-error">{serverError}</p>}
    {success && <p id="contact-success" role="status" className="body4 text-success">{success}</p>}
    <Button type="submit" loading={loading} data-analytics-id="contact-submit">Send message</Button>
  </form>;
}
