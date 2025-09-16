import React from "react";

interface FlagProps {
  country: "vi" | "en";
  className?: string;
}

const Flag: React.FC<FlagProps> = ({ country, className = "w-6 h-4" }) => {
  if (country === "vi") {
    return (
      <div className={`${className}  relative overflow-hidden rounded-sm`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/Flag_vietnam.png" alt="Vietnam Flag" className="w-5 h-5" />
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${className} relative overflow-hidden rounded-sm`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/flag_england.png" alt="USA Flag" className="w-5 h-5" />
        </div>
      </div>
    );
  }
};

export default Flag;
