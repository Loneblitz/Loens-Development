import Link from "next/link";
import { Cpu, ShoppingBag, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
export async function Navbar() {
  const supabase = await createClient();
  const { data:{ user } } = await supabase.auth.getUser();
  return <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#090d16]/90 backdrop-blur">
    <div className="container flex h-[76px] items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-300 shadow-[0_0_25px_#0ea5e955]"><Cpu size={23}/></span>
        <span className="font-extrabold tracking-widest">LONES <span className="text-sky-400">DEV</span><small className="block text-[9px] font-medium tracking-[.25em] text-slate-400">INNOVATION | INTEGRITY</small></span>
      </Link>
      <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
        <Link className="hover:text-sky-400" href="/store">Store</Link>
        <Link className="hover:text-sky-400" href="/requests">Custom Requests</Link>
        <Link className="hover:text-sky-400" href="/terms">Rules & TOS</Link>
      </nav>
      <div className="flex items-center gap-2">
        <Link className="btn btn-outline !px-3 !py-2 text-sm" href="/store"><ShoppingBag size={16}/><span className="hidden sm:inline">Store</span></Link>
        <Link className="btn btn-primary !px-3 !py-2 text-sm" href={user?"/account":"/login"}><UserRound size={16}/>{user?"Account":"Login"}</Link>
      </div>
    </div>
  </header>;
}
