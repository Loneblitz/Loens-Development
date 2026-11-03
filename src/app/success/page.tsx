import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
export default function Success(){return <main className="section min-h-[70vh]"><div className="panel mx-auto max-w-lg p-10 text-center"><CheckCircle2 className="mx-auto mb-5 text-sky-400" size={58}/><h1 className="text-3xl font-black">Payment received</h1><p className="my-4 text-slate-400">Thanks for supporting Lones Development. Your purchase will appear in your account after Stripe confirms the payment.</p><Link href="/account" className="btn btn-primary">View my account</Link></div></main>}
