export interface MenuItem {
  id: string;
  name: string;
  category: 'signature' | 'national' | 'shashlik' | 'salads' | 'beverages' | 'desserts';
  price: number;
  description: string;
  image: string;
  badge?: string;
  spicy?: boolean;
  cookTime: string;
  servings: string;
  ingredients: string[];
}

export const MENU_CATEGORIES = [
  { id: 'all', label: 'Barchasi', icon: 'Sparkles' },
  { id: 'signature', label: 'Oltin Jo‘ja (Signature)', icon: 'Flame' },
  { id: 'national', label: 'Milliy Taomlar', icon: 'Utensils' },
  { id: 'shashlik', label: 'Shashliklar', icon: 'Beef' },
  { id: 'salads', label: 'Salatlar', icon: 'Salad' },
  { id: 'beverages', label: 'Ichimliklar', icon: 'Coffee' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'oltin-joja-classic',
    name: "Axmad Oltin Jo‘ja (Klassik)",
    category: 'signature',
    price: 78000,
    description: "1990-yildan buyon o‘zgarmas maxfiy 12 xil tog‘ ziravorlari bilan marinadlangan, oltin rangda qarsildoq qovurilgan afsonaviy butun jo‘ja.",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller #1",
    cookTime: "18 daqiqa",
    servings: "2-3 kishilik",
    ingredients: ["Barra jo'ja", "Maxfiy 12 ziravor", "Maxsus oltin yog'", "Sarimsoqli sous"]
  },
  {
    id: 'tandir-joja',
    name: "Tandir Oltin Jo‘ja",
    category: 'signature',
    price: 85000,
    description: "An'anaviy tandir o'tida shaftoli o'tinida dudlangan, o'ta mayin va tillarang qisirlagan tovuq go'shti.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    badge: "O'tin Ta'mi",
    cookTime: "25 daqiqa",
    servings: "2-3 kishilik",
    ingredients: ["Jo'ja", "Shaftoli dudi", "Zira", "Kashnich urug'i"]
  },
  {
    id: 'tabaka-maxsus',
    name: "Axmad Maxsus Tabaka",
    category: 'signature',
    price: 75000,
    description: "Og'ir press ostida cho'yan tovada qovurilgan, o'tkir sarimsoq va yangi ko'katli qayla bilan tortiladigan tabaka.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    badge: "O'tkir & Qarsildoq",
    cookTime: "20 daqiqa",
    servings: "2 kishilik",
    ingredients: ["Jo'ja", "Tog' sarimsoqi", "Qizil qalampir", "Sariyog'"]
  },
  {
    id: 'toshkent-palov',
    name: "Toshkent To‘y Oshi (Devzira)",
    category: 'national',
    price: 51000,
    description: "Dumba yog'i, barra qo'y go'shti, sariq sabzi, kadi, mayiz va bedana tuxumi bilan dam yegan oliy navli osh.",
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    badge: "Milliy Meros",
    cookTime: "Tayyor",
    servings: "1 kishilik",
    ingredients: ["Devzira guruch", "Qo'y go'shti", "Sariq sabzi", "Mayiz", "No'xat", "Bedana tuxumi"]
  },
  {
    id: 'qozon-kabob',
    name: "Qozon Kabob (Barra Go'sht)",
    category: 'national',
    price: 110000,
    description: "Cho'yan qozonda erib pishgan barra qo'y qovurg'alari va tillarang qisirlagan butun kartoshkalar uyg'unligi.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    badge: "VIP Tanlov",
    cookTime: "Tayyor",
    servings: "1-2 kishilik",
    ingredients: ["Qo'y qovurg'asi", "Oltin kartoshka", "Zira", "Piyozli garnir"]
  },
  {
    id: 'manti-classic',
    name: "Axmad Xon Mantisi (5 dona)",
    category: 'national',
    price: 50000,
    description: "Yupqa ipakdek xamir ichida mayda to'g'ralgan barra go'sht, sarxil piyoz va dumba shirasining qaynoq portlashi.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80",
    cookTime: "15 daqiqa",
    servings: "1 kishilik",
    ingredients: ["Qo'lda yoyilgan xamir", "Mayin mol go'shti", "Piyoz", "Dumba"]
  },
  {
    id: 'beshbarmak-maxsus',
    name: "Beshbarmak (Ot go'shti va qazi)",
    category: 'national',
    price: 120000,
    description: "Qaynoq xushbo'y sho'rva, yupqa xamir varaqlari, yangi uzilgan qazi va mayin pishirilgan ot go'shti.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    badge: "To'yona",
    cookTime: "Tayyor",
    servings: "2 kishilik",
    ingredients: ["Ot go'shti", "Qazi", "Maxsus xamir", "Qaynoq sho'rva"]
  },
  {
    id: 'kiyevcha-shashlik',
    name: "Kiyevcha Oltin Shashlik",
    category: 'shashlik',
    price: 28000,
    description: "Sarxil tovuq filesi ichiga sariyog' va ko'katlar o'rab charxpalak qilib qo'rada pishirilgan betakror shashlik.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    cookTime: "12 daqiqa",
    servings: "1 six",
    ingredients: ["Tovuq filesi", "Golland sariyog'i", "Shivit", "Ziravorlar"]
  },
  {
    id: 'qoy-lulya',
    name: "Sharbatli Qo'y Go'shti Lulya",
    category: 'shashlik',
    price: 26000,
    description: "Ko'mir taftida pishgan, sershirvona va og'izda eruvchi mayin qo'y go'shti qiymasi.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80",
    cookTime: "10 daqiqa",
    servings: "1 six",
    ingredients: ["Qo'y qiymasi", "Dumba", "Kashnich", "Piyoz"]
  },
  {
    id: 'burrata-salat',
    name: "Burrata & Qovurilgan Jo'ja Salati",
    category: 'salads',
    price: 68000,
    description: "Italiya burrata pishlog'i, barra cherri pomidorlari, rukola va oltin jo'ja filesi bilan maxsus balzamiko sousida.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    badge: "Chef's Salad",
    cookTime: "8 daqiqa",
    servings: "1-2 kishilik",
    ingredients: ["Burrata", "Rukola", "Oltin jo'ja filesi", "Pesto sous"]
  },
  {
    id: 'firmenniy-limonad',
    name: "Oltin Jo‘ja Sitrus Marakuyya",
    category: 'beverages',
    price: 35000,
    description: "Tabiiy apelsin, laym, marakuyya va yalpiz barglaridan tayyorlangan muzdek chanqovbosti ichimlik.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    cookTime: "3 daqiqa",
    servings: "1 litr",
    ingredients: ["Marakuyya", "Laym", "Apelsin", "Yalpiz", "Muz"]
  }
];

export const BRANCHES = [
  {
    id: 'chilonzor',
    name: "Chilonzor Flagman Restorani",
    address: "Toshkent sh., Chilonzor tumani, Bunyodkor shox ko'chasi, 42-uy",
    landmark: "Mirzo Ulug'bek metrosi yaqinida",
    phone: "+998 71 200 26 06",
    hours: "09:00 - 23:30 (Har kuni)",
    features: ["VIP Zallar", "Bolalar maydonchasi", "Avtoturargoh", "Yozgi ayvon"]
  },
  {
    id: 'mirobod',
    name: "Mirobod Markaziy Filiali",
    address: "Toshkent sh., Mirobod tumani, Nukus ko'chasi, 88-uy",
    landmark: "Rossiya Mehmonxonasi ro'parasida",
    phone: "+998 71 200 26 06",
    hours: "10:00 - 02:00 (Tungi xizmat)",
    features: ["Jonli Musiqa", "Biznes tushliklar", "Terassa"]
  },
  {
    id: 'yunusobod',
    name: "Yunusobod Oila Maskani",
    address: "Toshkent sh., Yunusobod tumani, Amir Temur shox ko'chasi, 19-mavze",
    landmark: "Shahriston metrosi",
    phone: "+998 71 200 26 06",
    hours: "09:00 - 23:00",
    features: ["Oilaviy kabinetlar", "Banket zali", "Fast Delivery Hub"]
  }
];
