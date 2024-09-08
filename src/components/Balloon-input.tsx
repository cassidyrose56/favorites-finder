import React, { forwardRef } from 'react';

type BalloonInputProps = {
  placeholder: string;
  label: string;
};

const BalloonInput = forwardRef<HTMLInputElement, BalloonInputProps>(
  ({ placeholder, label }, ref) => {
    return (
      <div className="relative inline-block">
        <input
          ref={ref}
          className="balloon-input"
          placeholder={placeholder}
        />
        <label className="absolute top-1/2 left-4 transform -translate-y-1/2 text-xs font-medium uppercase text-grey-900 transition-all duration-300 ease-in-out">
          {label}
        </label>
      </div>
    );
  }
);

export default BalloonInput;