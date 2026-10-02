"use client";
import Modal from "@/components/ui/Modal";
import { cn } from "@/lib/cn";
export default function BottomSheet({ open, onClose, title, children, className, ...props }) {
  return <Modal open={open} onClose={onClose} title={title} className={cn("fixed inset-x-0 bottom-0 top-auto max-h-[85dvh] max-w-none overflow-y-auto rounded-b-none rounded-t-3xl p-5 sm:relative sm:inset-auto sm:max-w-lg sm:rounded-2xl", className)} overlayClassName="items-end p-0 sm:items-center sm:p-4" {...props}>{children}</Modal>;
}
