"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
export function BuyButton({productId}:{productId:string}) {
 const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const router=useRouter();
 async function buy(){setBusy(true);setError("");try{const res=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({productId})});const data=await res.json();if(res.status===401){router.push("/login?next="+encodeURIComponent("/store/"+productId));return;}if(!res.ok)throw new Error(data.error||"Unable to start checkout.");window.location.assign(data.url);}catch(e){setError(e instanceof Error?e.message:"Checkout failed.");setBusy(false);}}
 return <div><button onClick={buy} disabled={busy} className="btn btn-primary w-full disabled:opacity-50"><CreditCard size={17}/>{busy?"Preparing checkout…":"Purchase securely"}</button>{error&&<p className="mt-3 text-sm text-red-400">{error}</p>}</div>;
}
