"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export type SortOption = "default" | "price-asc" | "price-desc";

interface SortDropdownProps {
  currentSort: SortOption;
  onChange: (val: SortOption) => void;
}

const sortLabels: Record<SortOption, string> = {
  default: "ডিফল্ট",
  "price-asc": "দাম: কম থেকে বেশি",
  "price-desc": "দাম: বেশি থেকে কম",
};

export default function SortDropdown({ currentSort, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: SortOption) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="flex items-center space-x-2.5 text-sm" ref={dropdownRef}>
      <span className="text-gray-500 text-[17px] font-normal">সাজান</span>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-between space-x-2 bg-white border border-gray-200/80 rounded-lg px-3.5 py-1.5 text-gray-800 text-xs sm:text-sm font-medium hover:border-gray-300 focus:outline-none transition-colors shadow-2xs"
          aria-expanded={open}
        >
          <span>{sortLabels[currentSort]}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 shrink-0" />
        </button>

        {open && (
          <div className="absolute right-0 mt-1.5 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in slide-in-from-top-1">
            {(["default", "price-asc", "price-desc"] as SortOption[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors ${
                  currentSort === opt
                    ? "bg-emerald-50 text-emerald-800 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {sortLabels[opt]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}