"use client";

import BottomSheet from "@/components/ui/BottomSheet";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { cn } from "@/lib/cn";

function FilterFields({ config, values, onChange }) {
  return <div className="grid gap-5">{config.map((field) => {
    const value = values[field.key] ?? field.defaultValue ?? "";
    if (field.type === "search") return <Input key={field.key} label={field.label} type="search" placeholder={field.placeholder} value={value} onChange={(event) => onChange(field.key, event.target.value)} leftIcon={field.icon} data-analytics-id={field.analyticsId || `filter-${field.key}`} />;
    if (field.type === "select") return <Select key={field.key} label={field.label} value={value} onChange={(event) => onChange(field.key, event.target.value)} data-analytics-id={field.analyticsId || `filter-${field.key}`}><option value={field.defaultValue ?? "all"}>{field.allLabel || `All ${field.label.toLowerCase()}`}</option>{field.options?.map((option) => { const item = typeof option === "object" ? option : { label: option, value: option }; return <option key={item.value} value={item.value}>{item.label}</option>; })}</Select>;
    if (field.type === "range") return <label key={field.key} className="grid gap-2"><span className="flex justify-between"><span className="title4 text-dark">{field.label}</span><span className="body4 text-accent">{field.format ? field.format(value) : value}</span></span><input type="range" min={field.min ?? 0} max={field.max ?? 100} step={field.step ?? 1} value={value} onChange={(event) => onChange(field.key, event.target.value)} data-analytics-id={field.analyticsId || `filter-${field.key}`} className="w-full accent-accent" /></label>;
    if (field.type === "chips") return <fieldset key={field.key} className="grid gap-2"><legend className="title4 text-dark">{field.label}</legend><div className="flex flex-wrap gap-2">{field.options?.map((option) => { const item = typeof option === "object" ? option : { label: option, value: option }; const current = Array.isArray(value) ? value : []; const selected = current.includes(item.value); return <Chip key={item.value} selected={selected} onClick={() => onChange(field.key, selected ? current.filter((entry) => entry !== item.value) : [...current, item.value])}>{item.label}</Chip>; })}</div></fieldset>;
    return null;
  })}</div>;
}

export default function FilterPanel({ config = [], values = {}, onChange = () => {}, onClear, className, mobile = false, open = false, onClose, title = "Filters", onApply, resultCount }) {
  const fields = <><FilterFields config={config} values={values} onChange={onChange} />{onClear && <Button variant="ghost" size="sm" data-analytics-id="filter-clear" onClick={onClear}>Clear all</Button>}</>;
  if (mobile) return <BottomSheet open={open} onClose={onClose} title={title} className={className}><div className="grid gap-5">{fields}{onApply && <Button variant="secondary" fullWidth onClick={onApply}>Show {resultCount ?? "results"}</Button>}</div></BottomSheet>;
  return <aside aria-label={title} className={cn("space-y-5 rounded-2xl border border-gray6 bg-white p-5", className)}><h2 className="title2 text-dark">{title}</h2>{fields}</aside>;
}
