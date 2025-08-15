import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../components/Header";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        email,
        role,
        createdAt: serverTimestamp()
      });
      router.replace("/dashboard");
    } catch (err) {
      setError(err.message || "حدث خطأ");
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="container py-12">
        <div className="card max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center">إنشاء حساب</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="small block mb-1">البريد الإلكتروني</label>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="small block mb-1">كلمة المرور</label>
              <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            <div>
              <label className="small block mb-1">الدور</label>
              <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
                <option value="teacher">معلم</option>
                <option value="student">طالب</option>
                <option value="parent">ولي أمر</option>
              </select>
            </div>
            {error && <p className="text-red-600 small">{error}</p>}
            <button className="btn btn-primary w-full" disabled={loading} type="submit">{loading ? "جارٍ..." : "إنشاء حساب"}</button>
          </form>
          <p className="text-center mt-4 small">لديك حساب؟ <Link href="/auth/login"><a className="text-blue-600">تسجيل دخول</a></Link></p>
        </div>
      </div>
    </>
  );
    }
