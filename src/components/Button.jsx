export default function Button({ className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={[
        "md:text-lg font-medium px-8 py-3 shadow-inner drop-shadow-md rounded-full",
        "hover:scale-[1.04] active:scale-[0.96] transition-all duration-200 ease-out",
        "flex items-center gap-2 will-change-transform",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  )
}
