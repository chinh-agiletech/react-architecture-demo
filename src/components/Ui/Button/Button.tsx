import React from "react";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  loading,
  className,
  disabled,
  children,
}) => {
  return (
    <div className="">
      <button className={className} onClick={onClick} disabled={disabled}>
        {label || children}
      </button>
    </div>
  );
};

export default Button;
