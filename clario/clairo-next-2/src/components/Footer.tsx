export default function Footer() {
  return (
    <>
      {/* CTA */}
      <section className="py-28 px-12 text-center border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
        </div>
        <h2 className="relative font-display font-bold text-white tracking-tighter mb-6"
          style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.04em" }}>
          Stop reading.<br />Start asking.
        </h2>
        <p className="text-[16px] text-muted mb-12">Upload your first document in 30 seconds.</p>
        <a
          href="#demo"
          className="inline-block px-9 py-4 bg-white text-black text-[16px] font-semibold rounded-lg hover:opacity-85 transition-opacity"
        >
          Get started free
        </a>
      </section>

      {/* footer */}
      <footer className="px-12 py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display font-bold text-white text-[15px] tracking-tight">Clairo.</div>
        <div className="text-[12px] font-mono text-dim">© 2026 EPITA · M.Sc. Computer Science</div>
        <div className="flex gap-6">
          {["GitHub", "Docs", "Research"].map(link => (
            <a key={link} href="#" className="text-[12px] text-dim hover:text-muted transition-colors">{link}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
