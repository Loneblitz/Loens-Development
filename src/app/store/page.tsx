"use client";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
export default function Store(){
 const [category,setCategory]=useState("all");
 const shown=useMemo(()=>products.filter(p=>category==="all"||p.category===category),[category]);
 return <main className="section min-h-[70vh]"><div className="container"><h1 className="text-4xl font-black">Storefront</h1><p className="mb-8 mt-2 text-slate-400">Find the right assets for your FiveM community.</p><div className="mb-8 flex flex-wrap gap-2">{["all","script","mlo","vehicle"].map(c=><button key={c} onClick={()=>setCategory(c)} className={`rounded-xl border px-4 py-2 text-sm font-semibold capitalize ${category===c?"border-sky-500 bg-sky-500 text-white":"border-slate-700 bg-slate-900 text-slate-400"}`}>{c==="all"?"All products":c==="mlo"?"MLOs":c==="vehicle"?"Vehicles":"Scripts"}</button>)}</div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{shown.map(p=><ProductCard key={p.id} product={p}/>)}</div></div></main>;
}
