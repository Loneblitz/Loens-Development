import Link from "next/link";
import { ArrowRight, Code2, Cpu, Home as HomeIcon, Car, ShieldCheck, Zap } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
export default function Home(){
 const featured=products.slice(0,3);
 return <>
  <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#0ea5e926,transparent_60%)] py-24 sm:py-32">
   <div className="container relative text-center">
    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-slate-900 px-4 py-2 text-xs font-semibold text-sky-300"><span className="h-2 w-2 animate-pulse rounded-full bg-sky-400"/> Next-Gen FiveM Development Assets</div>
    <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">Elevate Your Server With <span className="bg-gradient-to-r from-sky-400 to-cyan-200 bg-clip-text text-transparent">Lones Dev</span></h1>
    <p className="mx-auto mb-9 max-w-2xl text-lg leading-8 text-slate-400">Premium MLO interiors, optimized scripts, and high-performance custom vehicle packs crafted for roleplay communities.</p>
    <div className="flex flex-col justify-center gap-3 sm:flex-row"><Link className="btn btn-primary" href="/store"> <Zap size={18}/> Browse Storefront</Link><Link className="btn btn-outline" href="/requests"><Code2 size={18}/> Request Custom Work</Link></div>
    <div className="panel mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 bg-slate-900/70 p-7 md:grid-cols-4">{[["50+","Scripts"],["25+","Custom MLOs"],["Secure","Checkout"],["Support","Development"]].map(([n,l])=><div key={l}><b className="text-3xl">{n}</b><p className="mt-1 text-xs uppercase tracking-wider text-slate-400">{l}</p></div>)}</div>
   </div>
  </section>
  <section className="section"><div className="container"><div className="mb-10 text-center"><h2 className="text-3xl font-bold">Our Specializations</h2><p className="mt-2 text-sm text-slate-400">Engineered for performance, aesthetics, and reliability.</p></div><div className="grid gap-5 md:grid-cols-3">{[[TerminalIcon,"Optimized Scripts","Framework-friendly scripts for your roleplay server."],[HomeIcon,"Custom MLO Interiors","Immersive interiors and custom environments."],[Car,"Vehicle Packs","Custom vehicles, handling, lighting, and liveries."]].map(([I,t,d]:any)=><div className="panel card-hover p-7" key={t}><I className="mb-5 text-sky-400" size={34}/><h3 className="mb-2 text-xl font-bold">{t}</h3><p className="text-sm leading-6 text-slate-400">{d}</p></div>)}</div></div></section>
  <section className="section"><div className="container"><div className="mb-9 flex items-end justify-between"><div><h2 className="text-3xl font-bold">Featured Storefront</h2><p className="mt-2 text-sm text-slate-400">Browse scripts, interiors, and vehicle packs.</p></div><Link className="text-sm font-semibold text-sky-300" href="/store">View all <ArrowRight className="inline" size={15}/></Link></div><div className="grid gap-6 md:grid-cols-3">{featured.map(p=><ProductCard key={p.id} product={p}/>)}</div></div></section>
  <section className="section"><div className="container"><div className="panel flex flex-col items-center justify-between gap-5 p-8 text-center sm:flex-row sm:text-left"><div><h2 className="text-2xl font-bold">Have a custom project in mind?</h2><p className="mt-2 text-sm text-slate-400">Tell us what you want built for your server.</p></div><Link href="/requests" className="btn btn-primary">Submit a request <ArrowRight size={16}/></Link></div></div></section>
 </>;
}
function TerminalIcon(props:any){return <Cpu {...props}/>}
