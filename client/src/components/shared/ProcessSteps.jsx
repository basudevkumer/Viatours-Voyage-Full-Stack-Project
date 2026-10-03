import { FiCheck } from "react-icons/fi";
import { cn } from "@/lib/cn";

export default function ProcessSteps({ steps = [], className }) {
  if (!steps || !steps.length) return null;

  return (
    <ol
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {steps.map((step) => (
        <li
          key={step.step}
          className="relative flex flex-col justify-between rounded-2xl border border-gray6 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="caption font-bold text-accent">{step.step}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-field text-xs font-semibold text-dark">
                STEP
              </span>
            </div>

            <h3 className="title2 mt-5 text-dark">{step.title}</h3>
            <p className="body4 mt-2 text-text-secondary">{step.text}</p>
          </div>

          {step.reassurance && (
            <div className="mt-6 flex items-start gap-2 border-t border-gray6 pt-4 text-dark/85">
              <FiCheck aria-hidden="true" className="mt-0.5 shrink-0 text-accent text-sm" />
              <p className="caption font-medium">{step.reassurance}</p>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
