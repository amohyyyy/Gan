import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="container py-8">
          <div className="card grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold">دورات منظمة</h3>
              <p className="small text-slate-600">إنشاء دورات مع دروس ومواد قابلة للتحميل.</p>
            </div>
            <div>
              <h3 className="font-semibold">اختبارات ذكية</h3>
              <p className="small text-slate-600">مؤقت لكل سؤال وتحليل النتائج آليًا.</p>
            </div>
            <div>
              <h3 className="font-semibold">لوحات تحكم متقدمة</h3>
              <p className="small text-slate-600">لوحة لكل دور مع صلاحيات مخصصة.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer bg-white border-t">
        <div className="container">
          <p className="text-center small text-slate-500">© {new Date().getFullYear()} EduPlatform — جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </>
  );
    }
