export const PHONE_NUMBER = "8585854853";
export const WHATSAPP_NUMBER = "918585854853";
export const PHONE_HREF = `tel:${PHONE_NUMBER}`;
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Properties", href: "#properties" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const PROPERTIES = [
  {
    id: 1,
    name: "LINK by Raghava",
    location: "Kokapet",
    type: "3 BHK Premium",
    area: "1,798 – 2,388 Sq.Ft.",
    price: "₹7,500/Sq.Ft.++",
    possession: "4 Years",
    rera: true,
    payment: "OTP Available",
    badge: "Premium",
    highlight: "Gated Community",
    tag: "Kokapet",
    image: "/properties/link-raghava.png",
  },
  {
    id: 2,
    name: "Prestige Golden Groove",
    location: "Tellapur",
    type: "2, 3 & 4 BHK",
    area: "1,169 – 3,013 Sq.Ft.",
    price: "Call for Price",
    possession: "5 Years",
    rera: true,
    payment: "Loan Available",
    badge: "New Launch",
    highlight: "Premium Township",
    tag: "Tellapur",
    image: "/properties/prestige-golden.png",
  },
  {
    id: 3,
    name: "Rajpushpa Prestinia",
    location: "Kokapet",
    type: "2 & 3 BHK",
    area: "1,380 – 2,300 Sq.Ft.",
    price: "₹8,999/Sq.Ft.++",
    possession: "2.5 Years",
    rera: true,
    payment: "One Time Payment",
    badge: "Hot Deal",
    highlight: "1.1 Cr onwards",
    tag: "Kokapet",
    image: "/properties/rajpushpa-prestinia.png",
  },
  {
    id: 4,
    name: "SSI Fortune Grande",
    location: "Neopolis",
    type: "3.5 & 4 BHK",
    area: "2,850 – 3,910 Sq.Ft.",
    price: "₹8,699/Sq.Ft.+PLC",
    possession: "3.5 Years",
    rera: true,
    payment: "OTP / Loan",
    badge: "Luxury",
    highlight: "Ultra Spacious",
    tag: "Neopolis",
    image: "/properties/ssi-fortune.png",
  },
  {
    id: 5,
    name: "Trilight Residences",
    location: "Kokapet",
    type: "3 & 4 BHK",
    area: "2,888 – 5,777 Sq.Ft.",
    price: "₹11,600/Sq.Ft.+++",
    possession: "2.5 Years",
    rera: true,
    payment: "Loan Available",
    badge: "Ultra Luxury",
    highlight: "Sky Villas",
    tag: "Kokapet",
    image: "/properties/trilight.png",
  },
  {
    id: 6,
    name: "Anvita High9",
    location: "Tellapur",
    type: "2 & 3 BHK",
    area: "1,360 – 2,610 Sq.Ft.",
    price: "₹6,499/Sq.Ft.+FR",
    possession: "2.5 Years",
    rera: true,
    payment: "One Time Payment",
    badge: "Value Buy",
    highlight: "Smart Homes",
    tag: "Tellapur",
    image: "/properties/anvita-high9.png",
  },
  {
    id: 7,
    name: "DSR Altitude",
    location: "Tellapur",
    type: "3 BHK",
    area: "2,277 Sq.Ft.",
    price: "₹5,999/Sq.Ft.",
    possession: "3.5 Years",
    rera: false,
    payment: "One Time Payment",
    badge: "Best Value",
    highlight: "1.36 Cr onwards",
    tag: "Tellapur",
    image: "/properties/dsr-altitude.png",
  },
  {
    id: 8,
    name: "Saanvi Prelaunch",
    location: "Kokapet",
    type: "3 BHK",
    area: "2,100 – 2,500 Sq.Ft.",
    price: "₹6,200/Sq.Ft.",
    possession: "2.5 Years",
    rera: false,
    payment: "One Time Payment",
    badge: "Pre-Launch",
    highlight: "1.2 Cr onwards",
    tag: "Kokapet",
    image: "/properties/saanvi-prelaunch.png",
  },
];

export const SERVICES = [
  {
    title: "Buy Landlord Share Flat",
    description:
      "Access exclusive landlord-share flats at competitive prices. We verify every document so you can buy with complete confidence and clarity.",
    icon: "Building2",
    color: "from-emerald-500/20 to-emerald-600/5",
    accentColor: "text-emerald-400",
  },
  {
    title: "Sell Your Property",
    description:
      "List your landlord-share or builder floor property with us and connect with thousands of verified, serious buyers instantly.",
    icon: "TrendingUp",
    color: "from-blue-500/20 to-blue-600/5",
    accentColor: "text-blue-400",
  },
  {
    title: "Document Verification",
    description:
      "Our experts verify RERA registration, title deeds, encumbrance certificates, and all legal documents before you sign.",
    icon: "ShieldCheck",
    color: "from-purple-500/20 to-purple-600/5",
    accentColor: "text-purple-400",
  },
  {
    title: "Investment Consulting",
    description:
      "Get personalized investment advice from experienced real estate consultants who understand Hyderabad's micro-markets.",
    icon: "LineChart",
    color: "from-amber-500/20 to-amber-600/5",
    accentColor: "text-amber-400",
  },
  {
    title: "Home Loan Assistance",
    description:
      "We partner with leading banks to help you secure the best home loan rates with minimal documentation and fast approval.",
    icon: "Banknote",
    color: "from-rose-500/20 to-rose-600/5",
    accentColor: "text-rose-400",
  },
  {
    title: "Wealth Building",
    description:
      "Build long-term wealth through strategic real estate investments. We identify high-ROI opportunities across Hyderabad.",
    icon: "Gem",
    color: "from-cyan-500/20 to-cyan-600/5",
    accentColor: "text-cyan-400",
  },
];

export const FAQS = [
  {
    question: "What exactly is a landlord share flat?",
    answer:
      "In a joint development agreement (JDA), the landowner provides land and the builder constructs apartments. The landowner receives a fixed percentage of flats as their share. These flats, called 'landlord share flats,' are sometimes sold by the landowner directly to buyers, often at slightly lower prices than builder units in the same project.",
  },
  {
    question: "Are landlord share flats legally safe to buy?",
    answer:
      "Yes, when purchased through a verified channel like LandlordShares, they are completely safe. We verify the title deed, JDA agreement, RERA registration, building plan approval, and encumbrance certificate before listing any property. Our legal team ensures you get a clean title.",
  },
  {
    question: "Are these flats RERA approved?",
    answer:
      "Most properties we list are RERA approved. We clearly mark RERA status on every listing. For properties under pre-launch, we advise on the approval timeline and associated risks so you can make an informed decision.",
  },
  {
    question: "Can I get a home loan for a landlord share flat?",
    answer:
      "Yes! Most nationalized banks and leading private banks offer home loans for landlord share flats, provided the project has RERA approval and clean documents. We have partnerships with leading banks to help you secure the best loan rates with minimal documentation.",
  },
  {
    question: "How is the price different from a regular builder flat?",
    answer:
      "Landlord share flats are often 10–20% below the builder's market rate because landowners prioritize liquidity over maximum profit. However, prices vary by project and negotiation. We always ensure you get a fair market deal.",
  },
  {
    question: "What areas in Hyderabad do you cover?",
    answer:
      "We specialize in high-growth corridors including Kokapet, Financial District, Tellapur, Neopolis, Narsingi, Gandipet, Manikonda, and Gachibowli. We are continuously expanding our portfolio across Hyderabad.",
  },
  {
    question: "Do I need to pay any brokerage or service fee?",
    answer:
      "We operate on a transparent, zero-hidden-cost model. Our consultation is completely free. Any applicable service charges are disclosed clearly before you proceed. There are no surprise fees at any stage.",
  },
  {
    question: "How long does the entire purchase process take?",
    answer:
      "The timeline varies by project, but typically: Property shortlisting takes 1–3 days, legal verification takes 3–7 days, loan approval takes 7–15 days, and registration takes 1–3 days after loan disbursement. Our team tracks every step for you.",
  },
  {
    question: "Can NRIs buy landlord share properties through you?",
    answer:
      "Absolutely. We have a dedicated NRI desk that handles digital document verification, video consultations, power-of-attorney arrangements, and remote transaction management. Many of our happy clients are NRIs based in the US, UK, UAE, and Australia.",
  },
  {
    question: "What documents do I need to buy a landlord share flat?",
    answer:
      "Standard documents include Aadhaar card, PAN card, income proof (salary slips or ITR), bank statements (6 months), and passport-size photos. For NRIs, passport and visa copies are additionally required. Our team will guide you through the complete checklist.",
  },
];

export const PARTNERS = [
  "Prestige Group",
  "SSI Developers",
  "Rajpushpa Properties",
  "DSR Infrastructure",
  "Anvita Projects",
  "Raghava Constructions",
  "My Home Constructions",
  "Aparna Constructions",
];

export const AREAS = ["All", "Kokapet", "Tellapur", "Neopolis"];
