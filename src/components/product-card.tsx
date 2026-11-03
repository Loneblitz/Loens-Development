import Link from "next/link";
import { Car, Home, Terminal, ShoppingCart } from "lucide-react";
import { type Product, formatPrice } from "@/lib/products";
export function ProductCard({product}:{product:Product}) {
  const Icon=product.category==="script"?Terminal:product.category==="mlo"?Home:Car;
  return <article className="panel card-hover flex flex-col overflow-hidden">
    <div className="relative grid h-44 place-items-center overflow-hidden bg-[radial-gradient(#0ea5e933_1px,transparent_1px)] [background-size:16px_16px] bg-slate-900">
      <Icon className="text-sky-400" size={62}/>
      <span className="absolute left-4 top-4 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[10px] font-bold uppercase text-sky-300">{product.category}</span>
      <b className="absolute right-4 top-4 rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-1">{formatPrice(product.price)}</b>
    </div>
    <div className="flex flex-1 flex-col p-6">
      <h3 className="mb-2 font-bold">{product.name}</h3><p className="mb-5 flex-1 text-sm leading-6 text-slate-400">{product.description}</p>
      <div className="mb-5 flex flex-wrap gap-2">{product.tags.map(t=><span key={t} className="rounded-md bg-slate-800 px-2.5 py-1 text-[10px] text-slate-300">{t}</span>)}</div>
      <Link className="btn btn-primary w-full text-sm" href={`/store/${product.id}`}><ShoppingCart size={16}/> View product</Link>
    </div>
  </article>;
}
