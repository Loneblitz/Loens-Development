import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { products, formatPrice } from "@/lib/products";
import { BuyButton } from "@/components/buy-button";
export default async function ProductPage({params}:{params:Promise<{id:string}>}) {
 const {id}=await params; const product=products.find(p=>p.id===id); if(!product) notFound();
 return <main className="section min-h-[70vh]"><div className="container max-w-4xl"><Link href="/store" className="text-sm text-sky-300">← Back to store</Link><div className="panel mt-5 grid gap-8 p-7 md:grid-cols-2 md:p-10"><div className="grid min-h-64 place-items-center rounded-xl bg-[radial-gradient(#0ea5e933_1px,transparent_1px)] [background-size:16px_16px] bg-slate-900"><ShoppingCart size={76} className="text-sky-400"/></div><div><span className="text-xs font-bold uppercase tracking-widest text-sky-300">{product.category}</span><h1 className="my-3 text-3xl font-black">{product.name}</h1><p className="mb-5 text-slate-400">{product.description}</p><p className="mb-6 text-3xl font-extrabold">{formatPrice(product.price)}</p><div className="mb-7 space-y-2">{product.tags.map(t=><p key={t} className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={15} className="text-sky-400"/>{t}</p>)}</div><BuyButton productId={product.id}/><p className="mt-3 text-xs text-slate-500">Secure payment is processed by Stripe. You will need an account to purchase.</p></div></div></div></main>;
}
