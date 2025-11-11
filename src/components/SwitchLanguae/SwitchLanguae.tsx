"use client";
import React, { useState } from "react";
import { Switch } from "@headlessui/react";

const SwitchLanguage = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center gap-3 p-1">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="relative inline-flex h-7 w-24 items-center rounded-full transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none"
      >
        {/* Background Gradient */}
        <span
          className="absolute inset-0 rounded-full transition-all duration-300"
          style={{
            background: enabled
              ? "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
              : "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
          }}
        />

        {/* Toggle Circle with Flag */}
        <span
          className={`absolute flex h-7 w-7 transform items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${
            enabled ? "translate-x-13" : "translate-x-[0px]"
          }`}
        >
          <div className="text-2xl">{enabled ? "🇬🇧" : "🇻🇳"}</div>
        </span>

        {/* Label Text */}
        <span
          className={`absolute text-xs font-semibold text-white transition-opacity duration-300 left-2 ${
            enabled ? "opacity-100" : "opacity-0"
          }`}
        >
          EN
        </span>
        <span
          className={`absolute text-xs font-semibold text-white transition-opacity duration-300 right-2 ${
            !enabled ? "opacity-100" : "opacity-0"
          }`}
        >
          VI
        </span>
      </Switch>
    </div>
  );
};

export default SwitchLanguage;
