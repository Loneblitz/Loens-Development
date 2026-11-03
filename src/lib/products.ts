export type Product = {
  id: string; name: string; category: "script" | "mlo" | "vehicle";
  price: number; description: string; tags: string[];
};
export const products: Product[] = [
  { id:"banking-ui", name:"Lones Advanced Banking UI", category:"script", price:1999,
    description:"Full-featured banking system with society accounts, multi-character transfers, ATM animations, and sleek React UI.",
    tags:["QB-Core","ESX","ox_lib"] },
  { id:"syndicate-garage", name:"Underground Syndicate Garage", category:"mlo", price:3499,
    description:"High-end secret underground meet garage featuring custom lighting, vehicle lifts, office room, and acoustic sound zones.",
    tags:["Optimized","Custom Audio"] },
  { id:"response-pack", name:"Lones Response Vehicle Pack (5 Cars)", category:"vehicle", price:2999,
    description:"Pack of 5 custom emergency vehicles with realistic handling, dynamic lighting patterns, and customizable liveries.",
    tags:["Optimized Polys","Custom Sirens"] },
  { id:"crafting-system", name:"Lones Dynamic Crafting System", category:"script", price:2499,
    description:"Modular workbench and crafting progression script with recipe levels, blueprints, item degradation, and Discord logs.",
    tags:["Standalone","QB/ESX"] },
  { id:"penthouse", name:"Eclipse Tower Grand Penthouse", category:"mlo", price:3999,
    description:"Luxury penthouse with rooftop helipad, infinity pool, customized master suite, and panoramic city views.",
    tags:["Portal Occlusion","4K Textures"] },
  { id:"midnight-tuner", name:"Lones Midnight Tuner Pack (4 Cars)", category:"vehicle", price:2799,
    description:"Custom import street racers with bodykits, tuning parts, realistic engine sounds, and optimized file sizes.",
    tags:["Custom Tuner Parts","Low Resmon"] }
];
export const formatPrice = (cents:number) => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(cents/100);
