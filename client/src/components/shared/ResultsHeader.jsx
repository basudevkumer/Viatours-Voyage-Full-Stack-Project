import Select from "@/components/ui/Select";
import { cn } from "@/lib/cn";

export default function ResultsHeader({ count, noun = "experiences", sortOptions = [], sortValue, onSortChange, className }) {
  return <div className={cn("mb-6 flex items-center justify-between gap-4", className)}><p className="body3 text-text-secondary"><span className="font-semibold text-dark">{count}</span> {noun} found</p>{sortOptions.length > 0 && <Select label={`Sort ${noun}`} labelClassName="sr-only" wrapperClassName="w-auto" value={sortValue} onChange={(event) => onSortChange?.(event.target.value)} data-analytics-id={`${noun}-sort`}>{sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</Select>}</div>;
}
