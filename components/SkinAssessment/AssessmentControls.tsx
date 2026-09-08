"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { Option } from "./assessmentData";

const COUNTRY_CODES = [
  { dial: "+91", flag: "🇮🇳", name: "India" },
  { dial: "+1", flag: "🇺🇸", name: "United States" },
  { dial: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { dial: "+971", flag: "🇦🇪", name: "UAE" },
  { dial: "+61", flag: "🇦🇺", name: "Australia" },
  { dial: "+65", flag: "🇸🇬", name: "Singapore" },
];

export const CheckboxMark = ({ checked }: { checked: boolean }) => (
  <span
    className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-200 ${
      checked ? "border-primary bg-primary" : "border-primary/30"
    }`}
  >
    {checked && <Check size={13} strokeWidth={3} className="text-white" />}
  </span>
);

export const ImageOptionGrid = ({
  options,
  selected,
  onToggle,
  contain = false,
}: {
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
  /** Show the whole image, uncropped, instead of covering the frame. */
  contain?: boolean;
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onToggle(option.value)}
            className={`-mr-px -mb-px flex cursor-pointer flex-col border text-left transition-colors duration-200 ${
              isSelected
                ? "border-primary bg-secondary/25"
                : "border-primary/30 hover:border-primary/50"
            }`}
          >
            {option.icon &&
              (contain ? (
                <span className="flex aspect-[4/3] w-full items-center justify-center p-6">
                  <Image
                    src={option.icon}
                    alt=""
                    width={96}
                    height={96}
                    className="h-24 w-24 object-contain"
                  />
                </span>
              ) : (
                <span className="flex aspect-4/2 w-full items-center justify-center p-6">
                  <Image
                    src={option.icon}
                    alt=""
                    width={96}
                    height={96}
                    className="h-full w-full object-cover aspect-4/2"
                  />
                </span>
              ))}
            <span className="flex items-center gap-2.5 px-4 py-2.5">
              <CheckboxMark checked={isSelected} />
              <span className="text-base text-primary">{option.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export const OptionList = ({
  options,
  selected,
  onToggle,
}: {
  options: { value: string; label: string; description?: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onToggle(option.value)}
            className={`flex w-full cursor-pointer items-center gap-3 border px-6 py-5 text-left transition-colors duration-200 ${
              isSelected
                ? "border-primary bg-secondary/25"
                : "border-primary/30 hover:border-primary/50"
            }`}
          >
            <CheckboxMark checked={isSelected} />
            <span className="flex-1">
              <span className="block text-sm text-primary">{option.label}</span>
              {option.description && (
                <span className="block text-xs text-[#525252]">{option.description}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export const PillOptionGroup = ({
  options,
  selected,
  onToggle,
}: {
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
}) => <OptionList options={options} selected={selected} onToggle={onToggle} />;

export const YesNoGroup = ({
  value,
  onChange,
}: {
  value: "yes" | "no" | null;
  onChange: (value: "yes" | "no") => void;
}) => (
  <OptionList
    options={[
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ]}
    selected={value ? [value] : []}
    onToggle={(v) => onChange(v as "yes" | "no")}
  />
);

export const SensitivityScale = ({
  value,
  onChange,
}: {
  value: number | "not-sure" | null;
  onChange: (value: number | "not-sure") => void;
}) => (
  <div>
    <div className="grid grid-cols-5 gap-4">
      {[1, 2, 3, 4, 5].map((n) => {
        const isSelected = value === n;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex h-16 cursor-pointer items-center justify-center border text-lg font-semibold text-primary transition-colors duration-200 ${
              isSelected
                ? "border-primary bg-secondary/25"
                : "border-primary/30 hover:border-primary/50"
            }`}
          >
            {n}
          </button>
        );
      })}
    </div>
    <div className="mt-3 flex justify-between text-sm text-[#525252]">
      <span>Least Sensitive</span>
      <span>Most sensitive</span>
    </div>

    <button
      type="button"
      onClick={() => onChange("not-sure")}
      className="mx-auto mt-6 flex cursor-pointer items-center gap-3 px-6 py-5"
    >
      <CheckboxMark checked={value === "not-sure"} />
      <span className="text-sm text-primary">I am not sure</span>
    </button>
  </div>
);

export const SegmentedOptions = ({
  options,
  selected,
  onToggle,
}: {
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
}) => (
  <div className="grid grid-cols-3">
    {options.map((option) => {
      const isSelected = selected.includes(option.value);
      return (
        <button
          key={option.value}
          type="button"
          onClick={() => onToggle(option.value)}
          className={`-mr-px flex cursor-pointer items-center gap-2 border px-4 py-4 text-left transition-colors duration-200 ${
            isSelected
              ? "border-primary bg-secondary/25"
              : "border-primary/30 hover:border-primary/50"
          }`}
        >
          <CheckboxMark checked={isSelected} />
          <span className="text-sm text-primary">{option.label}</span>
        </button>
      );
    })}
  </div>
);

export const TextField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  prefix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  prefix?: ReactNode;
}) => (
  <label className="block">
    <span className="mb-2 block text-lg text-primary font-medium">
      {label}
      {required && " *"}
    </span>
    <div className="relative flex items-center border border-primary/30 focus-within:border-primary">
      {prefix && (
        <span className="flex shrink-0 items-center gap-1.5 border-r border-primary/30 py-4 pl-5 pr-3 text-sm text-primary">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full py-4 text-base text-primary placeholder:text-primary/30 outline-none ${
          prefix ? "pl-3 pr-5" : "px-5"
        }`}
      />
    </div>
  </label>
);

export const PhoneField = ({
  label,
  value,
  onChange,
  countryDial,
  onCountryChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  countryDial: string;
  onCountryChange: (dial: string) => void;
  placeholder?: string;
  required?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [customCode, setCustomCode] = useState("");
  const selected = COUNTRY_CODES.find((c) => c.dial === countryDial);

  const applyCustomCode = () => {
    const trimmed = customCode.trim();
    if (!trimmed) return;
    onCountryChange(trimmed.startsWith("+") ? trimmed : `+${trimmed}`);
    setCustomCode("");
    setOpen(false);
  };

  return (
    <label className="block">
      <span className="mb-2 block text-lg font-medium text-primary">
        {label}
        {required && " *"}
      </span>
      <div className="relative flex items-center border border-primary/30 focus-within:border-primary">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 border-r border-primary/30 py-4 pl-5 pr-3 text-sm text-primary"
        >
          <span>{selected?.flag ?? "🌐"}</span>
          <span>{countryDial}</span>
          <ChevronDown size={14} strokeWidth={2} className={open ? "rotate-180" : ""} />
        </button>
        <input
          type="tel"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full py-4 pl-3 pr-5 text-base text-primary placeholder:text-primary/30 outline-none"
        />

        {open && (
          <>
            <button
              type="button"
              aria-label="Close country list"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-10 cursor-default"
            />
            <div className="absolute left-0 top-full z-20 mt-1 w-52 border border-primary/30 bg-white shadow-lg">
              {COUNTRY_CODES.map((c) => (
                <button
                  key={c.dial}
                  type="button"
                  onClick={() => {
                    onCountryChange(c.dial);
                    setOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center gap-2 border-l-2 px-4 py-2.5 text-left text-sm text-primary transition-colors duration-200 ${
                    c.dial === countryDial
                      ? "border-primary bg-secondary/25"
                      : "border-transparent hover:border-primary/40"
                  }`}
                >
                  <span>{c.flag}</span>
                  <span className="flex-1">{c.name}</span>
                  <span className="text-primary/60">{c.dial}</span>
                </button>
              ))}
              <div className="flex items-center gap-2 border-t border-primary/30 p-2">
                <input
                  type="text"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      applyCustomCode();
                    }
                  }}
                  placeholder="Country not listed? Type code, e.g. +33"
                  className="min-w-0 flex-1 border border-primary/30 px-3 py-2 text-sm text-primary placeholder:text-primary/30 outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={applyCustomCode}
                  disabled={!customCode.trim()}
                  className="shrink-0 cursor-pointer border border-primary/30 px-3 py-2 text-sm text-primary transition-colors duration-200 hover:border-primary disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Use
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </label>
  );
};
