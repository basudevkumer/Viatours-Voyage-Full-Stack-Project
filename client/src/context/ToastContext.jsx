"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";
import IconButton from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

const ToastContext = createContext(null);
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const dismiss = useCallback((id) => setToasts((items) => items.filter((item) => item.id !== id)), []);
  const toast = useCallback((message, type = "info") => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((items) => [...items, { id, message, type }]);
    window.setTimeout(() => dismiss(id), 5000);
    return id;
  }, [dismiss]);
  const value = useMemo(() => ({ toasts, toast, success: (message) => toast(message, "success"), error: (message) => toast(message, "error"), info: (message) => toast(message, "info"), dismiss }), [toasts, toast, dismiss]);
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used within ToastProvider");
  return value;
}
export function Toaster() {
  const context = useContext(ToastContext);
  const toasts = context?.toasts || [];
  const dismiss = context?.dismiss || (() => {});
  const iconByType = { success: FiCheckCircle, error: FiAlertCircle, info: FiInfo };
  return <div aria-live="polite" aria-relevant="additions removals" className="fixed right-4 top-4 z-[100] grid w-[min(24rem,calc(100vw-2rem))] gap-3">{toasts.map(({ id, message, type }) => { const Icon = iconByType[type] || FiInfo; return <div key={id} role={type === "error" ? "alert" : "status"} className="flex items-center gap-3 rounded-xl border border-gray5 bg-white p-4 text-dark shadow-lg"><Icon aria-hidden="true" className={cn(type === "error" ? "text-error" : type === "success" ? "text-success" : "text-accent")} /><p className="body4 flex-1">{message}</p><IconButton icon={<FiX />} label="Dismiss notification" size="sm" variant="ghost" onClick={() => dismiss(id)} /></div>; })}</div>;
}
