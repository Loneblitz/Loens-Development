import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/products";
export async function POST(request:Request){
 try{
  const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();
  if(!user)return NextResponse.json({error:"Please log in before purchasing."},{status:401});
  const {productId}=await request.json();const product=products.find(p=>p.id===productId);
  if(!product)return NextResponse.json({error:"Product not found."},{status:404});
  const base=process.env.NEXT_PUBLIC_SITE_URL||new URL(request.url).origin;
  const session=await stripe.checkout.sessions.create({
   mode:"payment",customer_email:user.email||undefined,
   line_items:[{price_data:{currency:"usd",unit_amount:product.price,product_data:{name:product.name,description:product.description}},quantity:1}],
   success_url:`${base}/success?session_id={CHECKOUT_SESSION_ID}`,
   cancel_url:`${base}/store/${product.id}`,
   metadata:{user_id:user.id,product_id:product.id,product_name:product.name}
  });
  return NextResponse.json({url:session.url});
 }catch(error){console.error("Checkout error:",error);return NextResponse.json({error:"Checkout could not be started. Check your Stripe configuration."},{status:500});}
}
