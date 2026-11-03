import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
export async function POST(request:Request){
 const signature=request.headers.get("stripe-signature");if(!signature)return NextResponse.json({error:"Missing signature"},{status:400});
 let event:Stripe.Event;
 try{event=stripe.webhooks.constructEvent(await request.text(),signature,process.env.STRIPE_WEBHOOK_SECRET!);}
 catch(err){return NextResponse.json({error:`Webhook signature verification failed: ${err instanceof Error?err.message:"unknown error"}`},{status:400});}
 if(event.type==="checkout.session.completed"){
  const session=event.data.object as Stripe.Checkout.Session;
  const userId=session.metadata?.user_id;const productId=session.metadata?.product_id;
  if(userId&&productId){
   const admin=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!);
   const {error}=await admin.from("purchases").upsert({
    stripe_session_id:session.id,user_id:userId,product_id:productId,
    product_name:session.metadata?.product_name||"Digital product",
    amount_paid:session.amount_total||0,currency:session.currency||"usd",status:"paid"
   },{onConflict:"stripe_session_id"});
   if(error){console.error("Purchase record error:",error);return NextResponse.json({error:"Could not record purchase"},{status:500});}
  }
 }
 return NextResponse.json({received:true});
}
