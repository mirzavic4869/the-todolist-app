import React from 'react'

export default function Button({ name, ...props }) {
  return (
    <div data-cy="button">
      <button
        {...props}
        className="text-white rounded-3xl bg-[#16ABF8] md:py-3 md:px-6 px-4 py-2 font-semibold"
      >
        {name}
      </button>
    </div>
  )
}
