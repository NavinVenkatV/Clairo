"use client";

const items = [
  { icon: "⚖️", label: "Legal & Compliance" },
  { icon: "🏥", label: "Healthcare Records" },
  { icon: "💼", label: "M&A Due Diligence" },
  { icon: "📊", label: "Financial Reports" },
  { icon: "🏛️", label: "Policy Documents" },
  { icon: "🔬", label: "Research Papers" },
  { icon: "📋", label: "HR Handbooks" },
  { icon: "🌍", label: "GDPR Compliant" },
  { icon: "🔒", label: "Privacy First" },
  { icon: "⚡", label: "Real-time Answers" },
];

// duplicate for infinite loop
const doubled = [...items, ...items];

export default function Carousel() {
  return (
    <div className="border-t border-b border-border py-5 overflow-hidden relative">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="carousel-track flex w-max">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-12 text-[13px] font-mono tracking-widest text-dim border-r border-border whitespace-nowrap hover:text-muted transition-colors duration-200 cursor-default"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
