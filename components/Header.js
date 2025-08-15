import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container flex items-center justify-between h-16">
        <Link href="/">
          <a className="flex items-center gap-3">
            <img src="/logo.svg" alt="logo" className="h-8 w-8" />
            <span className="font-semibold text-lg">EduPlatform</span>
          </a>
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/courses"><a className="text-sm text-slate-700">الدورات</a></Link>
          <Link href="/auth/login"><a className="text-sm text-slate-700">دخول</a></Link>
          <Link href="/auth/signup"><a className="header-btn btn-primary text-white">ابدأ الآن</a></Link>
        </nav>
      </div>
    </header>
  );
}
