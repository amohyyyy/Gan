import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db, auth } from "../../lib/firebase";
import { doc, getDoc, collection, query, where, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import Header from "../../components/Header";

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      const snap = await getDoc(doc(db, "courses", id));
      if (snap.exists()) setCourse({ id: snap.id, ...snap.data() });
    })();
    const q = query(collection(db, "lessons"), where("courseId", "==", id));
    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      setLessons(list);
    });
    return () => unsub();
  }, [id]);

  async function addLesson(e) {
    e.preventDefault();
    if (!title) return;
    await addDoc(collection(db, "lessons"), { title, courseId: id, createdAt: serverTimestamp() });
    setTitle("");
  }

  if (!course) return <div className="container py-16"><div className="card text-center">جارِ التحميل…</div></div>;

  const isOwner = auth.currentUser && auth.currentUser.uid === course.owner;

  return (
    <>
      <Header />
      <div className="container py-8">
        <div className="card mb-4">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-slate-600">{course.description}</p>
        </div>

        {isOwner && (
          <div className="card mb-4">
            <h2 className="font-semibold mb-3">إضافة درس</h2>
            <form onSubmit={addLesson} className="flex gap-3">
              <input className="input" placeholder="عنوان الدرس" value={title} onChange={e=>setTitle(e.target.value)} />
              <button className="btn btn-primary">إضافة</button>
            </form>
          </div>
        )}

        <div className="card">
          <h2 className="font-semibold mb-3">الدروس</h2>
          <ul className="space-y-2">
            {lessons.map(l => (
              <li key={l.id} className="border rounded-md p-3 flex justify-between">
                <span>{l.title}</span>
                <a className="text-blue-600" href={`/lessons/${l.id}`}>فتح</a>
              </li>
            ))}
            {lessons.length === 0 && <p className="text-slate-600">لا توجد دروس بعد.</p>}
          </ul>
        </div>
      </div>
    </>
  );
}
