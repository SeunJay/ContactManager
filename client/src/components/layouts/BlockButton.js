import React from 'react'

export default function BlockButton({type, value, className}) {
  return (
    <div>
      <input
        type={type}
        value={value}
        className={className}
      />
    </div>
  );
}
