// ---- Central data for Stayinn ----
// Swap the image URLs with real property/room photos when available.

export const PROPERTY = {
  name: "Stayinn Hotel & Suites",
  tagline: "Your calm escape in the heart of the city",
  description:
    "A boutique hotel blending modern comfort with warm hospitality. Thoughtfully designed rooms, attentive service,andy amenities that make every stay effortless.",
  location: "Gurung Basti, Siliguri",
  city: "Siliguri",
  lat: 26.723254091282257,
  lng: 88.42027521483578,
  rating: 4.8,
  reviewsCount: 1240,
  checkIn: "12:00",
  checkOut: "12:00",
  contact: { phone: "+1 (555) 010-4420", email: "stay@stayinn.com" },
hero: {
    url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1800&q=70",
    alt: "Exterior of the Stayinn hotel at dusk with warm lit windows",
mobile:
      "https://images.unsplash.com/photo-1611892479924-da07e41d9f4f?auto=format&fit=crop&w=900&q=70",
  },
};

export const PROPERTY_RULES = [
  { title: "Check-in & check-out", desc: "Check-in: 12 PM · Check-out: 12 PM" },
  { title: "Minimum age", desc: "The primary guest must be at least 18 years of age. " },
  { title: "Valid ID required", desc: "Guests must provide valid ID proof at check-in. This is mandatory for all guests." },
  { title: "Accurate details", desc: "Guests must ensure their profile and booking details are accurate." },
  { title: "Follow property rules", desc: "Please read and follow all property rules and guidelines during your stay." },
];

export const NEARBY = {
  landmarks:[
    { name: "Kali Mandir", dist: "1.8 km" },
    { name: "ISKCON Temple", dist: "4 km" },
    { name: "Neotia Getwel Multispecialty Hospital", dist: "4.1 km" },
  ],
  food: [
    { name: "Seth Srilal Market", dist: "1.4 km" },
    { name: "Hong Kong Market", dist: "1.6 km" },
    { name: "Bidhan Market", dist: "1.7 km" },
    { name: "Hill Cart Road", dist: "2.2 km" },
    { name: "Mallaguri Super Market", dist: "2.5 km" },
    { name: "City Center Mall", dist: "3.8 km" },
    { name: "Cosmos Mall", dist: "3.9 km" },
  ],
  transport: [
    { name: "Bagdogra Airport", dist: "15.7 km", sub: "Airport" },
    { name: "Bhadrapur Airport (BDP)", dist: "37.9 km", sub: "Airport" },
    { name: "Siliguri Railway Station", dist: "940 m", sub: "Railway Station" },
    { name: "Tenzing Norgay Bus Terminus", dist: "820 m", sub: "Bus Terminal" },
    { name: "Siliguri Town Railway Station", dist: "2.7 km", sub: "Transit" },
    { name: "New Jalpaiguri Railway Station", dist: "6 km", sub: "Transit" },
    { name: "New Jalpaiguri Junction", dist: "6 km", sub: "Transit" },
    { name: "Gulma Railway Station", dist: "10.5 km", sub: "Transit" },
    { name: "Darjeeling Joy Ride Railway Station", dist: "23.2 km", sub: "Transit" },
    { name: "Naksalbari Railway Station", dist: "24 km", sub: "Transit" },
    { name: "Chattar Hat Railway Station", dist: "27.3 km", sub: "Transit" },
    { name: "Mahanadi Railway Station", dist: "33.8 km", sub: "Transit" },
    { name: "Bagrakot Railway Station", dist: "36.8 km", sub: "Transit" },
    { name: "Adhikari Railway Station", dist: "37.1 km", sub: "Transit" },
  ],
};

export const FACILITIES = [
  { icon: "wifi", title: "Free high-speed Wi-Fi", desc: "Fast, reliable connection throughout the property" },
  { icon: "car", title: "Free parking", desc: "Secure on-site parking for guests" },
  { icon: "shield", title: "24/7 front desk", desc: "Real humans, ready to help at any hour" },
  { icon: "home", title: "Quiet neighbourhood", desc: "Peaceful setting in the heart of Gurung Basti" },
];

export const HIGHLIGHTS = [
  { title: "City-center location", desc: "Steps from the waterfront, dining and transport." },
  { title: "Flexible cancellation", desc: "Free cancellation on most rooms up to 48h before." },
  { title: "Best price guarantee", desc: "Book direct and save — always the lowest rate." },
  { title: "24/7 front desk", desc: "Real humans, ready to help at any hour." },
];

export const AMENITIES = [
  { id: "wifi", icon: "wifi", label: "Free Wi-Fi" },
  { id: "ac", icon: "ac", label: "Air conditioning" },
  { id: "tv", icon: "tv", label: "Smart TV" },
  { id: "minibar", icon: "minibar", label: "Minibar" },
  { id: "balcony", icon: "balcony", label: "Private balcony" },
  { id: "bathtub", icon: "bathtub", label: "Bathtub" },
{ id: "kitchen", icon: "kitchen", label: "Kitchenette" },
  { id: "workspace", icon: "desk", label: "Work desk" },
  { id: "view", icon: "view", label: "City view" },
  { id: "sofabed", icon: "sofa", label: "Sofa bed" },
  { id: "soundproof", icon: "sound", label: "Soundproofing" },
];

export const ROOMS = [
  {
    id: "cozy-double",
    name: "Cozy Double",
    type: "Standard",
    price: 120,
    capacity: 2,
    beds: "1 Double bed",
    size: 22,
    rating: 4.6,
    reviews: 210,
    popularity: 62,
    ac: false,
    status: "available",
    amenities: ["wifi", "tv", "workspace", "soundproof"],
    description:
      "A snug, well-appointed room designed for restful nights. Soft bedding, a dedicated work desk and blackout curtains make it ideal for both business and leisure.",
    image: "https://images.unsplash.com/photo-1611892479924-da07e41d9f4f?auto=format&fit=crop&w=900&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1611892479924-da07e41d9f4f?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=60",
    ],
  },
  {
    id: "deluxe-king",
    name: "Deluxe King",
    type: "Deluxe",
    price: 175,
    capacity: 2,
    beds: "1 King bed",
    size: 30,
    rating: 4.8,
    reviews: 318,
    popularity: 91,
    ac: true,
    status: "available",
    amenities: ["wifi", "ac", "tv", "minibar", "view", "workspace"],
    description:
      "A generous deluxe room with a plush king bed, city views and a lounge corner. priority turndown service.",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=60",
    ],
  },
  {
    id: "family-suite",
    name: "Family Suite",
    type: "Suite",
    price: 240,
    capacity: 4,
    beds: "1 King + 2 Single",
    size: 48,
    rating: 4.7,
    reviews: 142,
    popularity: 78,
    ac: true,
    status: "available",
    amenities: ["wifi", "ac", "tv", "minibar", "kitchen", "bathtub", "sofabed"],
    description:
      "A bright, flexible suite with a separate living area and room for the whole family. Fully equipped kitchenette and a large family bathroom.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=60",
    ],
  },
  {
    id: "premium-studio",
    name: "Premium Studio",
    type: "Studio",
    price: 200,
    capacity: 3,
    beds: "1 King + Sofa bed",
    size: 36,
    rating: 4.9,
    reviews: 96,
    popularity: 84,
    ac: true,
    status: "available",
    amenities: ["wifi", "ac", "tv", "minibar", "kitchen", "sofabed", "workspace", "view"],
    description:
      "An open-plan studio with everything you need for a longer stay — kitchenette, dining nook and a convertible sofa for a third guest.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=60",
    ],
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    type: "Suite",
    price: 280,
    capacity: 2,
    beds: "1 King bed",
    size: 44,
    rating: 4.9,
    reviews: 88,
    popularity: 88,
    ac: true,
    status: "available",
    amenities: ["wifi", "ac", "tv", "minibar", "bathtub", "workspace", "view", "soundproof"],
    description:
      "Our flagship executive suite with a separate lounge, soaking tub and floor-to-ceiling skyline views. Club floor access included.",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1551513460-51a4e1d3047f?auto=format&fit=crop&w=1200&q=60",
    ],
  },
  {
    id: "accessible-room",
    name: "Accessible Double",
    type: "Standard",
    price: 115,
    capacity: 2,
    beds: "1 Double bed",
    size: 24,
    rating: 4.7,
    reviews: 41,
    popularity: 55,
    ac: false,
    status: "available",
    amenities: ["wifi", "tv", "soundproof", "workspace"],
    description:
      "A ground-floor room designed for easy access with a roll-in shower, grab bars and wider doorways. Equally comfortable for all guests.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=60",
    ],
  },
  {
    id: "penthouse",
    name: "Penthouse Suite",
    type: "Suite",
    price: 420,
    capacity: 4,
    beds: "1 King + 2 Single",
    size: 72,
    rating: 5.0,
    reviews: 54,
    popularity: 95,
    ac: true,
    status: "available",
    amenities: ["wifi", "ac", "tv", "minibar", "balcony", "bathtub", "kitchen", "sofabed", "view", "workspace", "soundproof"],
    description:
      "The crown of Stayinn — a sprawling top-floor residence with a private terrace, outdoor hot tub and panoramic harbor views.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=60",
    ],
  },
];

export const REVIEWS = [
  {
    name: "Amelia Reyes",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=60",
    rating: 5,
    date: "March 2026",
    text: "Immaculate room and the best night's sleep I've had in months. The peaceful setting was a highlight of our trip.",
  },
  {
    name: "Daniel Okafor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=60",
    rating: 5,
    date: "February 2026",
    text: "Flawless check-in and a gorgeous king room with a view. Staff went out of their way to make our anniversary special.",
  },
  {
    name: "Sofia Lindqvist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=60",
    rating: 4,
    date: "January 2026",
    text: "Great value and spotlessly clean. The family suite had plenty of room for the kids. Would happily book again.",
  },
];

export const ROOM_TYPES = ["Standard", "Deluxe", "Suite", "Studio"];
export const BED_TYPES = ["Double", "Queen", "King", "Sofa bed", "Single"];
