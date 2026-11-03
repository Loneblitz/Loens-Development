import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export default async function Admin(){
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/login");
 const allowed=(process.env.ADMIN_USER_IDS||"").split(",").map(x=>x.trim()).filter(Boolean);
 if(!allowed.includes(user.id))redirect("/account");
 const {data:requests}=await supabase.from("custom_requests").select("*").order("created_at",{ascending:false});
 const {data:purchases}=await supabase.from("purchases").select("*").order("created_at",{ascending:false}).limit(50);
 return <main className="section min-h-[70vh]"><div className="container"><h1 className="mb-8 text-3xl font-black">Admin dashboard</h1><h2 className="mb-4 text-xl font-bold">Custom requests</h2><div className="panel mb-9 overflow-x-auto p-5">{requests?.length?requests.map(r=><div key={r.id} className="border-b border-slate-800 py-4"><b>{r.title}</b><p className="text-sm text-slate-400">{r.discord_username} · {r.framework}</p><p className="mt-2 whitespace-pre-wrap text-sm">{r.details}</p></div>):<p className="text-sm text-slate-400">No requests yet.</p>}</div><h2 className="mb-4 text-xl font-bold">Recent purchases</h2><div className="panel overflow-x-auto p-5">{purchases?.length?purchases.map(p=><div key={p.id} className="flex justify-between gap-4 border-b border-slate-800 py-3 text-sm"><span>{p.product_name}</span><span className="text-sky-300">{(p.amount_paid/100).toFixed(2)} {p.currency.toUpperCase()}</span></div>):<p className="text-sm text-slate-400">No purchases yet.</p>}</div></div></main>;
}
