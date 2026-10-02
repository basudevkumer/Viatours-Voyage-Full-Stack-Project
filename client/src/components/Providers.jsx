"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider, Toaster } from "@/context/ToastContext";
import { WishlistProvider } from "@/context/WishlistContext";

export default function Providers({ children }) {
  return <AuthProvider><WishlistProvider><ToastProvider>{children}<Toaster /></ToastProvider></WishlistProvider></AuthProvider>;
}
