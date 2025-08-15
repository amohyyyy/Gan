export default function Hero() {
  return (
    <section className="container py-12 grid lg:grid-cols-2 gap-6 items-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">منصة تعليمية حديثة — تعليم يواكب العصر</h1>
        <p className="text-slate-600 mb-6">منهج واضح، اختبارات ذكية، وتحليل أداء لحظة بلحظة. مناسب للمعلمين والطلاب وأولياء الأمور.</p>
        <div className="flex gap-3">
          <a href="/auth/signup" className="btn-primary header-btn">سجّل الآن</a>
          <a href="/courses" className="header-btn border">تصفح الدورات</a>
        </div>
      </div>
      <div className="card">
        <img src="/logo.svg" alt="illustration" className="mx-auto h-48" />
        <p className="text-center text-sm text-slate-600 mt-4">تصميم عصري، واجهة RTL، واستجابة ممتازة على المحمول.</p>
      </div>
    </section>
  );
    }
