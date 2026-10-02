import { cn } from "@/lib/cn";

export default function Stepper({ steps = [], currentStep = 0, className }) {
  return <ol aria-label="Checkout progress" className={cn("flex items-start", className)}>{steps.map((step, index) => <li key={step.label || index} aria-current={index === currentStep ? "step" : undefined} className={cn("flex flex-1 items-center gap-2", index < steps.length - 1 && "after:ml-2 after:h-px after:flex-1 after:bg-gray5") }><span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm", index <= currentStep ? "border-accent bg-accent text-white" : "border-gray5 text-text-secondary")}>{index + 1}</span><span className={cn("body5 hidden sm:inline", index === currentStep ? "text-dark" : "text-text-secondary")}>{step.label}</span></li>)}</ol>;
}
