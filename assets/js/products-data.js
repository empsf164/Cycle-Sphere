/**
 * CYCLE SPHERE - Premium Bicycle E-Commerce Catalog Data
 * Demo specifications & realistic bicycle retail data
 */

const CYCLE_SPHERE_PRODUCTS = [
  {
    id: "aero-strada-pro-carbon",
    name: "Aero Strada Pro Carbon",
    category: "road",
    categoryLabel: "Road Bikes",
    price: 4399,
    originalPrice: 4899,
    rating: 4.9,
    reviewsCount: 42,
    badge: "sale",
    brand: "Strada Racing",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["S (51cm)", "M (54cm)", "L (56cm)", "XL (58cm)"],
    colors: [
      { name: "Forest Racing Green", hex: "#1B3B2B" },
      { name: "Stealth Matte Charcoal", hex: "#22252A" },
      { name: "Frozen Pearl White", hex: "#E8ECEF" }
    ],
    inStock: true,
    stockCount: 6,
    shortDescription: "Ultra-aerodynamic wind-tunnel engineered road bike with electronic shifting and hydraulic disc braking for uncompromising speed.",
    description: "Engineered in collaboration with elite aerodynamicists, the Aero Strada Pro Carbon cuts through headwinds with effortless efficiency. Constructed with premium Toray T800 high-modulus carbon fiber, the frame maximizes torsional stiffness through the bottom bracket while dampening road vibration over grueling distances. Equipped with Shimano Dura-Ace Di2 wireless electronic shifting and progressive hydraulic disc brakes, this machine sets a benchmark for competitive road cyclists seeking absolute speed and precision.",
    specifications: {
      frameMaterial: "Toray T800 Monocoque Carbon Fiber",
      frameType: "Integrated Aerodynamic Aero Road Profile",
      availableSizes: "S (51cm), M (54cm), L (56cm), XL (58cm)",
      wheelSize: "700c",
      gearSystem: "Shimano Dura-Ace Di2 Wireless Electronic",
      numberOfGears: "24-Speed (2 x 12)",
      brakeType: "Shimano Dura-Ace Hydraulic Disc (160mm/140mm)",
      suspensionType: "Rigid Aero Carbon Form",
      fork: "Full Carbon Monocoque 1-1/8 to 1-1/4 Tapered Steerer",
      tireType: "Vittoria Corsa Speed G2.0 700x28c Tubeless Ready",
      weight: "7.2 kg (15.8 lbs) in size M",
      intendedRidingStyle: "Road Racing, Fast Pace Pelotons, Criteriums"
    },
    keyFeatures: [
      "Truncated aerofoil tube profiles reduce drag by 14% at 45 km/h",
      "Full internal cockpit cable integration with one-piece carbon bar/stem",
      "Power meter ready crankset with ultra-stiff oversized bottom bracket shell",
      "Tubeless-ready 50mm deep-section carbon clincher wheelset included"
    ],
    warranty: "Lifetime frame warranty, 2-year component coverage",
    deliveryInfo: "Complimentary white-glove crate shipping. Ships fully calibrated within 24-48 business hours."
  },
  {
    id: "alpine-trail-apex-fs",
    name: "Alpine Trail Apex FS",
    category: "mountain",
    categoryLabel: "Mountain Bikes",
    price: 3750,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 38,
    badge: "bestseller",
    brand: "Apex Offroad",
    images: [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["S (15.5\")", "M (17.5\")", "L (19.5\")", "XL (21.5\")"],
    colors: [
      { name: "Pine Matte Forest", hex: "#183226" },
      { name: "Solar Performance Lime", hex: "#C5E838" },
      { name: "Basalt Black", hex: "#1A1A1D" }
    ],
    inStock: true,
    stockCount: 8,
    shortDescription: "Enduro-ready full suspension mountain bike with 160mm travel, SRAM Eagle AXS 12-speed, and aggressive trail geometry.",
    description: "Conquer treacherous rock gardens, high-alpine switchbacks, and steep technical descents. The Alpine Trail Apex FS pairs a Fox Factory 36 Kashima fork with a Float X2 rear shock, delivering 160mm of plush, predictable travel. SRAM Eagle AXS electronic shifting ensures crisp, instantaneous gear changes under heavy pedal loads, while 4-piston hydraulic disc brakes provide unrelenting stopping power across wet roots and loose granite.",
    specifications: {
      frameMaterial: "Hydroformed 6061-T6 Aluminum with Carbon Seatstays",
      frameType: "Horst-Link 4-Bar Full Suspension",
      availableSizes: "S (15.5\"), M (17.5\"), L (19.5\"), XL (21.5\")",
      wheelSize: "29\"",
      gearSystem: "SRAM GX Eagle AXS 12-Speed Wireless",
      numberOfGears: "12-Speed (1 x 12, 10-52T)",
      brakeType: "SRAM Code RSC 4-Piston Hydraulic Disc (200mm front/180mm rear)",
      suspensionType: "Full Suspension (160mm Front / 150mm Rear)",
      fork: "Fox Factory 36 Float FIT4 Kashima 160mm Boost 110x15",
      tireType: "Maxxis Minion DHF 29x2.5\" WT 3C MaxxTerra EXO+ TR",
      weight: "13.4 kg (29.5 lbs) in size M",
      intendedRidingStyle: "All-Mountain, Technical Enduro, Alpine Descents"
    },
    keyFeatures: [
      "Fox Factory Kashima coat suspension for minimal stiction and supreme sensitivity",
      "Integrated downtube armor and guided internal cable channeling",
      "Trunnion-mount rear shock with flip-chip adjustable frame geometry",
      "Internally routed Fox Transfer Factory dropper post with 175mm travel"
    ],
    warranty: "5-Year frame warranty, 2-year manufacturer suspension coverage",
    deliveryInfo: "Packaged in heavy-duty reinforced bike flight box with torque tools included."
  },
  {
    id: "metropolis-urban-commuter",
    name: "Metropolis Urban Commuter",
    category: "city",
    categoryLabel: "City Bikes",
    price: 1899,
    originalPrice: 2199,
    rating: 4.8,
    reviewsCount: 51,
    badge: "new",
    brand: "Cycle Sphere Atelier",
    images: [
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["S (50cm)", "M (54cm)", "L (58cm)"],
    colors: [
      { name: "Graphite Charcoal", hex: "#2A2E35" },
      { name: "Vintage British Green", hex: "#143125" },
      { name: "Brushed Raw Alloy", hex: "#C2C6CC" }
    ],
    inStock: true,
    stockCount: 12,
    shortDescription: "Clean belt-drive commuter with internal Shimano 8-speed hub, integrated dynamo lights, and all-weather hydraulic disc brakes.",
    description: "Designed for daily urban commuting without grease, mess, or frequent maintenance. The Metropolis Urban Commuter swaps a greasy chain for a silent Gates Carbon Drive belt system that lasts three times longer than standard chains. Housed in a lightweight double-butted aluminum chassis, it features an internal Shimano Alfine 8-speed hub, integrated Supernova hub-dynamo LED lighting, and full-coverage aluminum fenders to keep you clean in any weather.",
    specifications: {
      frameMaterial: "Custom Hydroformed 6061 Double-Butted Aluminum",
      frameType: "Upright Sport Geometry with Integrated Rack Mounts",
      availableSizes: "S (50cm), M (54cm), L (58cm)",
      wheelSize: "700c",
      gearSystem: "Shimano Alfine 8-Speed Internal Geared Hub with Gates CDX Belt",
      numberOfGears: "8-Speed Internal",
      brakeType: "Shimano Deore Hydraulic Disc (160mm)",
      suspensionType: "Rigid Alloy with Vibration Dampening Carbon Blades",
      fork: "Lightweight Alloy Monocoque with Lowrider Pannier Mounts",
      tireType: "Schwalbe Marathon Supreme 700x35c Puncture Protection",
      weight: "11.6 kg (25.5 lbs)",
      intendedRidingStyle: "Daily City Commute, Urban Fitness, Weekend Utility"
    },
    keyFeatures: [
      "Grease-free, rust-proof Gates Carbon CDX belt drive system",
      "Hub dynamo lighting system requires no batteries or charging ever",
      "Integrated rear pannier rack rated for 25 kg payload",
      "Reflective tire sidewalls and 360-degree night visibility accents"
    ],
    warranty: "Lifetime frame warranty, 2-year hub and belt guarantee",
    deliveryInfo: "Shipped 95% assembled with pedals and multi-tool included."
  },
  {
    id: "veloce-endurance-disc",
    name: "Veloce Endurance Disc",
    category: "road",
    categoryLabel: "Road Bikes",
    price: 2850,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 29,
    badge: "bestseller",
    brand: "Strada Racing",
    images: [
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["XS (49cm)", "S (52cm)", "M (54cm)", "L (56cm)", "XL (58cm)"],
    colors: [
      { name: "Deep Sage & Slate", hex: "#223E30" },
      { name: "Glacier Silver", hex: "#D6DCE2" }
    ],
    inStock: true,
    stockCount: 7,
    shortDescription: "All-day gran fondo performance bicycle offering compliance, 32mm tire clearance, and Shimano Ultegra 22-speed mechanical precision.",
    description: "The Veloce Endurance Disc redefines high-mileage road riding comfort. Featuring micro-suspension seatstay flex zones and an endurance geometry with a slightly taller headtube, fatigue is significantly mitigated on century rides and uneven asphalt. Fitted with Shimano Ultegra groupset and DT Swiss wheelsets, this bike handles steep climbs and high-speed valley descents with effortless confidence.",
    specifications: {
      frameMaterial: "Endurance Carbon Blend HMC-700",
      frameType: "Gran Fondo Endurance Comfort Geometry",
      availableSizes: "XS (49cm), S (52cm), M (54cm), L (56cm), XL (58cm)",
      wheelSize: "700c",
      gearSystem: "Shimano Ultegra R8000 Precision Mechanical",
      numberOfGears: "22-Speed (2 x 11, 50-34T compact, 11-34T cassette)",
      brakeType: "Shimano Ultegra Hydraulic Disc with Ice-Tech Rotors",
      suspensionType: "Micro-Flex Rear Triangle with Carbon Compliance Post",
      fork: "Full Carbon Thru-Axle 12x100mm",
      tireType: "Continental Grand Prix 5000 S TR 700x32c",
      weight: "8.1 kg (17.8 lbs)",
      intendedRidingStyle: "Long Distance Touring, Gran Fondos, Varied Pavement"
    },
    keyFeatures: [
      "Engineered seatstay compliance absorbs 20% more road vibration",
      "Generous tire clearance supporting up to 35mm widths for light gravel",
      "DT Swiss Endurance alloy wheelset with sealed cartridge bearings",
      "Ergonomic handlebar with 4-degree outward flare for wrist relief"
    ],
    warranty: "Lifetime warranty on carbon frameset",
    deliveryInfo: "Tracked courier delivery with custom protective packaging."
  },
  {
    id: "ridgeback-hardtail-pro",
    name: "Ridgeback Hardtail Pro",
    category: "mountain",
    categoryLabel: "Mountain Bikes",
    price: 1699,
    originalPrice: 1950,
    rating: 4.8,
    reviewsCount: 64,
    badge: "sale",
    brand: "Apex Offroad",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["S (16\")", "M (18\")", "L (20\")"],
    colors: [
      { name: "Military Olive Green", hex: "#263B2B" },
      { name: "Solar Lime Accent", hex: "#B9DB2C" }
    ],
    inStock: true,
    stockCount: 15,
    shortDescription: "Fast, responsive XC hardtail mountain bike with RockShox air fork, Shimano Deore 1x12 drivetrain, and 29-inch tubeless wheels.",
    description: "Built for pure climbing acceleration and nimble singletrack agility, the Ridgeback Hardtail Pro features triple-butted alloy construction and a 120mm RockShox Judy Silver air-sprung fork with remote lockout. Power transfer is immediate thanks to the Boost 148 thru-axle rear triangle, giving competitive cross-country racers and weekend trail warriors the edge they need.",
    specifications: {
      frameMaterial: "Triple-Butted 6061-X8 Performance Aluminum",
      frameType: "Cross-Country Hardtail with Boost 148 Spacing",
      availableSizes: "S (16\"), M (18\"), L (20\")",
      wheelSize: "29\"",
      gearSystem: "Shimano Deore M6100 1x12 Dynamic",
      numberOfGears: "12-Speed (1 x 12, 10-51T)",
      brakeType: "Shimano MT410 Hydraulic Disc (180mm front / 160mm rear)",
      suspensionType: "Front Suspension Hardtail (120mm)",
      fork: "RockShox Judy Silver TK Air, Remote Lockout, 120mm Travel",
      tireType: "Schwalbe Racing Ray / Racing Ralph 29x2.25\" Super Ground",
      weight: "12.1 kg (26.6 lbs)",
      intendedRidingStyle: "Cross Country, Fast Singletrack, Dirt Trails"
    },
    keyFeatures: [
      "Bar-mounted remote suspension lockout for snappy out-of-the-saddle climbs",
      "Wide-range 10-51T cassette handles 25%+ trail gradients",
      "Internal routing for optional stealth dropper seatpost upgrade",
      "Tubeless valves and rim tape pre-installed from factory"
    ],
    warranty: "Lifetime frame warranty, 2-year front fork warranty",
    deliveryInfo: "Ships within 24 hours. Pre-tuned and ready to ride in 15 minutes."
  },
  {
    id: "classic-porteur-city-cruiser",
    name: "Classic Porteur City Cruiser",
    category: "city",
    categoryLabel: "City Bikes",
    price: 1150,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 31,
    badge: null,
    brand: "Cycle Sphere Atelier",
    images: [
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["S (52cm)", "M (55cm)", "L (58cm)"],
    colors: [
      { name: "Heritage British Racing Green", hex: "#122A1E" },
      { name: "Oxford Navy", hex: "#1C2538" },
      { name: "Cream Ivory", hex: "#ECE7DC" }
    ],
    inStock: true,
    stockCount: 9,
    shortDescription: "Timeless steel porteur bicycle with front cargo deck, honey leather saddle, integrated 7-speed hub, and polished chrome accents.",
    description: "An homage to classic Parisian delivery bikes reimagined with modern components. The Classic Porteur features seamless 4130 Chromoly steel tubing for an incomparably smooth, springy ride. Fitted with a heavy-duty bamboo-inlaid front porteur rack, Brooks-style vegan honey leather saddle, and Shimano Nexus 7-speed hub with enclosed internal coaster and front roller brake.",
    specifications: {
      frameMaterial: "Lugged Double-Butted 4130 Chromoly Steel",
      frameType: "Classic Porteur Horizontal Top Tube Geometry",
      availableSizes: "S (52cm), M (55cm), L (58cm)",
      wheelSize: "700c",
      gearSystem: "Shimano Nexus 7-Speed Internal Geared Hub",
      numberOfGears: "7-Speed Internal Hub",
      brakeType: "Tektro Dual Pivot Front Caliper + Internal Rear Roller",
      suspensionType: "Rigid Steel Vibration Dampening",
      fork: "Lugged Crown Chromoly with Low-Rider Bosses",
      tireType: "Panaracer Pasela ProTite 700x32c Tan Wall",
      weight: "12.9 kg (28.4 lbs) with rack",
      intendedRidingStyle: "Urban Cruising, Coffee Runs, Market Deliveries"
    },
    keyFeatures: [
      "Front steel porteur rack with weather-sealed bamboo timber slats",
      "Twin-leg heavy-duty kickstand keeps bike stable during loading",
      "Full stainless steel polished fenders and bell included",
      "Internal cabling keeps classic silhouette impeccably clean"
    ],
    warranty: "10-Year steel frame warranty, 2-year parts warranty",
    deliveryInfo: "Shipped in custom wooden-braced crate with touch-up paint vial."
  },
  {
    id: "gravel-horizon-exploro",
    name: "Gravel Horizon Exploro",
    category: "road",
    categoryLabel: "Road Bikes",
    price: 3400,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 47,
    badge: "bestseller",
    brand: "Horizon Adventure",
    images: [
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["S (52cm)", "M (55cm)", "L (58cm)", "XL (61cm)"],
    colors: [
      { name: "Forest Camo Khaki", hex: "#2F3B2C" },
      { name: "Desert Sandstone", hex: "#C7B299" },
      { name: "Obsidian Charcoal", hex: "#1D2024" }
    ],
    inStock: true,
    stockCount: 10,
    shortDescription: "Go-anywhere carbon gravel adventure rig equipped with Shimano GRX 810 1x11, bikepacking mounts, and 45mm tire clearance.",
    description: "Blur the boundary between tarmac speed and backcountry gravel trails. The Horizon Exploro features an adventure-tuned carbon layup with asymmetric dropped chainstays, accommodating up to 700x45c or 650bx2.1\" tires. Loaded with three bottle mounts, top-tube bento bosses, and fork cage eyelets, it is the quintessential tool for multi-day bikepacking expeditions.",
    specifications: {
      frameMaterial: "High-Modulus Toray Carbon Gravel Monocoque",
      frameType: "Gravel Adventure Geometry with Dropped Chainstay",
      availableSizes: "S (52cm), M (55cm), L (58cm), XL (61cm)",
      wheelSize: "700c (650b Compatible)",
      gearSystem: "Shimano GRX RX810 Gravel-Specific 1x11",
      numberOfGears: "11-Speed (1 x 11, 40T front, 11-42T rear)",
      brakeType: "Shimano GRX Hydraulic Disc with Flat Mount 160mm",
      suspensionType: "Carbon Frame Vibration Dissipation",
      fork: "Carbon Adventure Fork with Triple Bosses and Dynamo Routing",
      tireType: "WTB Riddler 700x45c TCS Tubeless Dual DNA",
      weight: "8.6 kg (18.9 lbs)",
      intendedRidingStyle: "Gravel Grinding, Bikepacking, Rough Road Touring"
    },
    keyFeatures: [
      "14 frame and fork attachment points for custom frame bags and racks",
      "Flared 16-degree gravel drop bar for superior control in loose descents",
      "Integrated carbon downtube rock guard for stray stone impact protection",
      "Clutch-equipped rear derailleur eliminates chain slap completely"
    ],
    warranty: "Lifetime warranty on carbon frameset and fork",
    deliveryInfo: "Complimentary tubeless sealant kit and valve stems included."
  },
  {
    id: "summit-downhill-monster-29",
    name: "Summit Downhill Monster 29",
    category: "mountain",
    categoryLabel: "Mountain Bikes",
    price: 5400,
    originalPrice: 5900,
    rating: 4.9,
    reviewsCount: 19,
    badge: "sale",
    brand: "Apex Offroad",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["M (Medium)", "L (Large)", "XL (X-Large)"],
    colors: [
      { name: "Deep Forest & Neon Lime", hex: "#1C3626" },
      { name: "Gunmetal Smoke", hex: "#373E47" }
    ],
    inStock: true,
    stockCount: 4,
    shortDescription: "World Cup-level downhill racing machine with 200mm dual-crown travel, RockShox Boxxer, and heavy-duty 4-piston disc brakes.",
    description: "Built strictly for the gnarliest bike park lines, rock slabs, and World Cup downhill courses. The Summit Downhill Monster 29 pairs a 200mm dual-crown RockShox Boxxer Ultimate with a Super Deluxe Coil rear shock. Featuring a slack 63-degree head angle and ultra-durable alloy linkage, it eats giant drops and square-edge hits for breakfast.",
    specifications: {
      frameMaterial: "M5 Extreme-Duty Hydroformed Alloy Chassis",
      frameType: "Downhill Race Geometry with 4-Bar Horst Linkage",
      availableSizes: "M (Medium), L (Large), XL (X-Large)",
      wheelSize: "29\"",
      gearSystem: "SRAM GX DH 7-Speed Dedicated Downhill Drivetrain",
      numberOfGears: "7-Speed Downhill",
      brakeType: "SRAM Code RSC 4-Piston with 220mm Front / 200mm Rear Rotors",
      suspensionType: "Dual Crown Downhill Coil & Air (200mm Front / 200mm Rear)",
      fork: "RockShox Boxxer Ultimate Charger 2.1 RC2 29\" 200mm 20x110",
      tireType: "Maxxis Assegai 29x2.50\" DH Casing 3C MaxxGrip",
      weight: "16.2 kg (35.7 lbs)",
      intendedRidingStyle: "Downhill Racing, Freeride, Extreme Bike Park"
    },
    keyFeatures: [
      "200mm front and rear suspension soak up high-speed impacts effortlessly",
      "Oversized 220mm front rotor delivers immense fade-free deceleration",
      "Integrated fork bump stops protect frame during violent crashes",
      "Custom tuned coil spring with high- and low-speed rebound adjusters"
    ],
    warranty: "3-Year downhill competition warranty",
    deliveryInfo: "Shipped in reinforced steel-frame crate with shock pump and spare coil spring."
  },
  {
    id: "komorebi-minimalist-single-speed",
    name: "Komorebi Minimalist Fixie",
    category: "city",
    categoryLabel: "City Bikes",
    price: 890,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 58,
    badge: "new",
    brand: "Cycle Sphere Atelier",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["S (50cm)", "M (54cm)", "L (58cm)"],
    colors: [
      { name: "Matte Pine Green", hex: "#1C3627" },
      { name: "Raw Brushed Chrome", hex: "#D4D9DE" },
      { name: "Velvet Pitch Black", hex: "#111315" }
    ],
    inStock: true,
    stockCount: 18,
    shortDescription: "Ultra-clean track-inspired single-speed with 4130 chromoly frame, flip-flop rear hub, and minimalist aesthetic.",
    description: "Pure cycling essence stripped down to the absolute fundamentals. The Komorebi Fixie / Single-Speed features smooth TIG-welded 4130 chromoly tubing with a track geometry tuned for rapid city dodging. The flip-flop rear hub lets you easily toggle between freewheel coasting and fixed-gear connection, while dual-pivot rim calipers ensure dependable control.",
    specifications: {
      frameMaterial: "Double-Butted 4130 Chromoly Steel",
      frameType: "Track Geometry with Horizontal Dropouts",
      availableSizes: "S (50cm), M (54cm), L (58cm)",
      wheelSize: "700c",
      gearSystem: "Flip-Flop Hub (16T Freewheel / 16T Fixed Cog with 46T Crank)",
      numberOfGears: "Single Speed / Fixed",
      brakeType: "Tektro R315 Dual Pivot Alloy Calipers (Front & Rear)",
      suspensionType: "Rigid Steel",
      fork: "Straight-Blade 4130 Chromoly Fork 1-1/8 Threadless",
      tireType: "Thickslick Urban Race 700x28c",
      weight: "9.4 kg (20.7 lbs)",
      intendedRidingStyle: "City Sprinting, Fixed Gear, Flat Urban Commuting"
    },
    keyFeatures: [
      "Flip-flop hub offers instantaneous choice between single-speed & fixed gear",
      "Super-clean profile with removable cable clips and stealth decals",
      "Puncture-resistant Thickslick tires designed for concrete skid resistance",
      "Lightweight riser bar for commanding upright urban sightlines"
    ],
    warranty: "5-Year frame warranty, 1-year components",
    deliveryInfo: "Fully pre-assembled box. Simply install front wheel, pedals and handlebar."
  },
  {
    id: "aero-tt-chrono-tri-master",
    name: "Aero TT Chrono Tri-Master",
    category: "road",
    categoryLabel: "Road Bikes",
    price: 6200,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 14,
    badge: "new",
    brand: "Strada Racing",
    images: [
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["S (51cm)", "M (54cm)", "L (57cm)"],
    colors: [
      { name: "Stealth Carbon & Performance Lime", hex: "#16281E" },
      { name: "Titanium Matte Grey", hex: "#2E343B" }
    ],
    inStock: true,
    stockCount: 3,
    shortDescription: "Ultra-pure triathlon and time trial aerodynamic weapon with integrated hydration, electronic blip shifters, and deep carbon disc wheel.",
    description: "Shave crucial minutes off your Ironman bike split. The Aero TT Chrono was sculpted in the wind tunnel with computational fluid dynamics to cheat turbulent crosswinds. Features an integrated aerobar stem system, internal food storage bento, frame-matched front drinking reservoir, and SRAM Red eTap AXS electronic blips mounted directly on the aero extensions.",
    specifications: {
      frameMaterial: "High-Modulus Toray T1000 Carbon Monocoque",
      frameType: "UCI-Legal Time Trial / Triathlon Aerofoil",
      availableSizes: "S (51cm), M (54cm), L (57cm)",
      wheelSize: "700c",
      gearSystem: "SRAM Red eTap AXS 12-Speed Wireless with Aerobar Blip Shifters",
      numberOfGears: "24-Speed (2 x 12, 54-41T Aero Chainrings)",
      brakeType: "SRAM S-900 Aero HRD Hydraulic Disc",
      suspensionType: "Rigid Aero Carbon Form",
      fork: "Integrated Aero TT Carbon Fork with Hidden Brake Calipers",
      tireType: "Continental Grand Prix TT 700x25c",
      weight: "7.9 kg (17.4 lbs)",
      intendedRidingStyle: "Triathlon, Ironman, Time Trial Racing"
    },
    keyFeatures: [
      "Integrated 750ml aerodynamic front drink system with hands-free straw",
      "Carbon full-disc rear wheel included with 80mm deep front rim",
      "Multi-axis adjustable arm rest pads and extension poles for custom fit",
      "Integrated top-tube nutrition bento compartment flush with frame"
    ],
    warranty: "Lifetime frame warranty, 2-year electronics guarantee",
    deliveryInfo: "Shipped in hard-shell EVA flight case with precision torque wrenches."
  },
  {
    id: "aeroshield-carbon-mips-helmet",
    name: "AeroShield Carbon MIPS Helmet",
    category: "accessories",
    subcategory: "helmets",
    categoryLabel: "Accessories",
    price: 240,
    originalPrice: 280,
    rating: 4.9,
    reviewsCount: 88,
    badge: "bestseller",
    brand: "Cycle Sphere Essentials",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["Small (51-55cm)", "Medium (55-59cm)", "Large (59-63cm)"],
    colors: [
      { name: "Forest Matte", hex: "#1B3B2B" },
      { name: "High-Vis Lime", hex: "#C5E838" },
      { name: "Graphite Carbon", hex: "#22252A" }
    ],
    inStock: true,
    stockCount: 24,
    shortDescription: "Ultra-lightweight aerodynamic road and gravel helmet with integrated MIPS spherical rotational impact protection.",
    description: "Engineered for speed, ventilation, and top-tier cranial safety. The AeroShield Carbon features 18 channeled vents sculpted in wind tunnels to force cooling air over the scalp without creating air drag. The revolutionary MIPS spherical layer allows the outer shell to rotate independently around the inner liner during angled impacts, reducing rotational brain injury risk.",
    specifications: {
      frameMaterial: "Carbon-Reinforced Polycarbonate with In-Mold Dual-Density EPS",
      frameType: "Aero Road & Gravel Race Helmet",
      availableSizes: "Small (51-55cm), Medium (55-59cm), Large (59-63cm)",
      wheelSize: "N/A",
      gearSystem: "Fidlock Magnetic Chinstrap Buckle",
      numberOfGears: "N/A",
      brakeType: "N/A",
      suspensionType: "MIPS Spherical Impact Technology",
      fork: "N/A",
      tireType: "N/A",
      weight: "260g (Size M)",
      intendedRidingStyle: "Road Racing, Gravel, Performance Cycling"
    },
    keyFeatures: [
      "MIPS Spherical technology reduces rotational forces during crashes",
      "Fidlock one-handed magnetic buckle opens and closes even with thick gloves",
      "Integrated rubber sunglasses gripper ports hold eyewear securely",
      "Ionic+ antimicrobial sweat padding prevents odor buildup"
    ],
    warranty: "2-Year crash replacement discount policy + full warranty",
    deliveryInfo: "Includes microfiber helmet storage bag and spare padding set."
  },
  {
    id: "lumenpro-1800-smart-light-set",
    name: "LumenPro 1800 Smart Bike Light Set",
    category: "accessories",
    subcategory: "lights",
    categoryLabel: "Accessories",
    price: 160,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 73,
    badge: "bestseller",
    brand: "Cycle Sphere Essentials",
    images: [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["Universal Fit"],
    colors: [
      { name: "Anodized Black", hex: "#1C1D21" }
    ],
    inStock: true,
    stockCount: 30,
    shortDescription: "Ultra-bright 1800-lumen anti-glare front headlight paired with a smart decelerating accelerometer tail light.",
    description: "Light up the darkest country roads and singletrack trails with daylight confidence. The LumenPro 1800 features twin Cree LEDs with StVZO-inspired cutoff beam optics to prevent blinding oncoming traffic. The smart rear light senses braking deceleration and automatically flares to 100 lumens, warning following drivers instantly.",
    specifications: {
      frameMaterial: "CNC-Machined Aerospace 6061 Aluminum Shell",
      frameType: "IPX7 Submersible Waterproof Light Set",
      availableSizes: "Universal 25.4mm - 35mm Handlebar & Seatpost Clamps",
      wheelSize: "N/A",
      gearSystem: "USB-C Fast Charging (4800mAh Internal Battery)",
      numberOfGears: "6 Front Modes, 5 Smart Rear Modes",
      brakeType: "Deceleration Accelerometer Auto-Brake Light",
      suspensionType: "N/A",
      fork: "N/A",
      tireType: "N/A",
      weight: "185g (Front) + 42g (Rear)",
      intendedRidingStyle: "Night Trail Riding, Dark Road Training, Urban Safety"
    },
    keyFeatures: [
      "1800 Lumens peak output throws light up to 210 meters ahead",
      "Anti-glare beam cutoff prevents dazzling oncoming pedestrians and motorists",
      "Smart brake detection triggers bright warning flare when slowing down",
      "Fast USB-C charging delivers up to 18 hours run-time on endurance mode"
    ],
    warranty: "2-Year comprehensive warranty with 30-day trial",
    deliveryInfo: "Comes with quick-release aluminum bar mount and GoPro adapter."
  },
  {
    id: "titanium-foldsecure-d-lock",
    name: "Titanium FoldSecure D-Lock",
    category: "accessories",
    subcategory: "locks",
    categoryLabel: "Accessories",
    price: 125,
    originalPrice: 145,
    rating: 4.9,
    reviewsCount: 46,
    badge: "sale",
    brand: "Cycle Sphere Essentials",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["Standard 85cm Length"],
    colors: [
      { name: "Matte Slate & Lime", hex: "#22252A" }
    ],
    inStock: true,
    stockCount: 19,
    shortDescription: "Sold Secure Diamond certified compact folding lock with hardened steel alloy bars and anti-drill cylinder.",
    description: "Maximum bicycle security meets pocket-friendly portability. Constructed with 5.5mm specially hardened alloy plates coated in soft-touch silicone to prevent scratching premium bicycle paint. Certified Sold Secure Pedal Cycle Diamond, it resists angle-grinder attacks, freeze sprays, and 12-ton hydraulic bolt cutters.",
    specifications: {
      frameMaterial: "Hardened Manganese Steel Alloy Plates with Silicone Shell",
      frameType: "6-Link Compact Articulated Folding Architecture",
      availableSizes: "85cm Circumference",
      wheelSize: "N/A",
      gearSystem: "Disc Detainer Anti-Pick / Anti-Drill Cylinder",
      numberOfGears: "N/A",
      brakeType: "N/A",
      suspensionType: "N/A",
      fork: "N/A",
      tireType: "N/A",
      weight: "1.15 kg (2.5 lbs)",
      intendedRidingStyle: "High-Risk City Commuting, Campus, Outdoor Cafe Parking"
    },
    keyFeatures: [
      "Sold Secure Diamond certified protection against heavy theft attacks",
      "Rattle-free frame bracket mounts to standard water bottle cage bosses",
      "Includes 3 laser-cut keys plus coded key replacement card",
      "UV-resistant silicone outer jacket shields bicycle finish"
    ],
    warranty: "Lifetime anti-theft guarantee (up to $2,500 bike replacement value)",
    deliveryInfo: "Ships with bottle cage mounting holster and heavy-duty straps."
  },
  {
    id: "aeroflow-pro-bib-shorts-jersey",
    name: "AeroFlow Pro Bib Shorts & Jersey Kit",
    category: "accessories",
    subcategory: "apparel",
    categoryLabel: "Accessories",
    price: 185,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 52,
    badge: "new",
    brand: "Cycle Sphere Apparel",
    images: [
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Forest Racing Olive", hex: "#1C3829" },
      { name: "Deep Charcoal Black", hex: "#1E2024" }
    ],
    inStock: true,
    stockCount: 35,
    shortDescription: "Pro-peloton aerodynamic summer kit with Italian compressive Lycra, textured vortex sleeves, and Elastic Interface 7-hour chamois.",
    description: "Designed for intensive summer training and gran fondos. The AeroFlow kit pairs a featherlight aerodynamic jersey featuring dimpled vortex sleeve fabrics with compressive bib shorts crafted from dense Italian woven Lycra. The centerpiece is the dual-density Elastic Interface road chamois, dampening perineal vibrations on rides exceeding 7 hours.",
    specifications: {
      frameMaterial: "80% Recycled Polyamide, 20% Elastane Italian Fabric",
      frameType: "Race Aero Form Fit with Laser-Cut Seamless Grippers",
      availableSizes: "XS, S, M, L, XL, XXL",
      wheelSize: "N/A",
      gearSystem: "YKK Full-Length Auto-Locking Zipper",
      numberOfGears: "N/A",
      brakeType: "N/A",
      suspensionType: "Elastic Interface Ultra-Density 120kg/m3 Chamois",
      fork: "N/A",
      tireType: "N/A",
      weight: "280g total set",
      intendedRidingStyle: "Fast Road Training, Gran Fondos, Summer Club Rides"
    },
    keyFeatures: [
      "Coldblack fabric treatment reflects 80% of heat rays for active cooling",
      "Three reinforced rear cargo pockets plus zippered waterproof phone pocket",
      "Laser-cut flat elastic bib straps prevent shoulder pressure marks",
      "Reflective hem binding for 360-degree twilight visibility"
    ],
    warranty: "1-Year crash repair / replacement guarantee",
    deliveryInfo: "Shipped in biodegradable zip-lock garment pouch."
  },
  {
    id: "precision-carbon-floor-pump",
    name: "Precision Carbon Floor Pump",
    category: "accessories",
    subcategory: "tools",
    categoryLabel: "Accessories",
    price: 95,
    originalPrice: 110,
    rating: 4.8,
    reviewsCount: 33,
    badge: "sale",
    brand: "Cycle Sphere Essentials",
    images: [
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["Standard Shop Size"],
    colors: [
      { name: "Forest Satin & Walnut", hex: "#1A3325" }
    ],
    inStock: true,
    stockCount: 22,
    shortDescription: "High-pressure workshop floor track pump with top-mounted digital pressure gauge, CNC alloy barrel, and walnut wood handle.",
    description: "Inflate road tires up to 160 PSI or seat stubborn tubeless gravel tires effortlessly. Features a solid CNC-machined alloy barrel wrapped in subtle carbon weave, an ergonomic turned walnut wood handle, and a large top-mounted backlit digital gauge accurate to 0.5 PSI. The SmartSwitch chuck attaches securely to Presta or Schrader valves with an integrated micro-bleed button.",
    specifications: {
      frameMaterial: "CNC-Machined Aluminum Barrel with Turned Walnut Handle",
      frameType: "Workshop Track Floor Pump with Heavy Cast Iron Base",
      availableSizes: "Height 72cm (28.3\")",
      wheelSize: "N/A",
      gearSystem: "SmartSwitch Presta/Schrader Dual Head with Bleed Valve",
      numberOfGears: "Max Pressure 160 PSI (11 BAR)",
      brakeType: "N/A",
      suspensionType: "N/A",
      fork: "N/A",
      tireType: "Presta & Schrader Compatible",
      weight: "1.65 kg (3.6 lbs)",
      intendedRidingStyle: "Home Workshop, Pre-Ride Tire Calibration, Tubeless Seating"
    },
    keyFeatures: [
      "Top-mounted backlit LCD digital gauge reads PSI, BAR, and KPA with 0.5 PSI precision",
      "Extra-long 125cm braided steel hose easily reaches bikes mounted in workstands",
      "Cast iron tripod base ensures tip-free pumping stability",
      "Micro-bleed pressure release button for dialing in exact gravel and XC tire pressures"
    ],
    warranty: "5-Year workshop build quality warranty",
    deliveryInfo: "Batteries and ball/air mattress needle adapters included in handle cap."
  },
  {
    id: "thermoinsulated-magnetic-bidon",
    name: "ThermoInsulated Magnetic Bidon (Pack of 2)",
    category: "accessories",
    subcategory: "hydration",
    categoryLabel: "Accessories",
    price: 48,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 92,
    badge: "bestseller",
    brand: "Cycle Sphere Essentials",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["750ml (25 oz) Each"],
    colors: [
      { name: "Forest Moss", hex: "#1C3627" },
      { name: "Smoky Translucent", hex: "#424850" }
    ],
    inStock: true,
    stockCount: 40,
    shortDescription: "Double-wall insulated bottle set with magnetic cageless frame mounting system and high-flow self-sealing membrane cap.",
    description: "Forget rattling plastic cages that scratch your custom paint. This premium kit uses powerful neodymium magnetic studs that screw into standard frame mounts. The bottle snaps firmly into place with a satisfying twist-release motion, holding fast even on punishing downhill trails. Double-wall thermal insulation keeps ice water cold twice as long on hot summer rides.",
    specifications: {
      frameMaterial: "100% BPA/BPS-Free Food Grade Polypropylene with Aerogel Foil Insulation",
      frameType: "Magnetic Twist-Release Cageless System",
      availableSizes: "750ml (25 fl oz) per bottle",
      wheelSize: "N/A",
      gearSystem: "High-Flow Silicone Jet Valve Cap",
      numberOfGears: "N/A",
      brakeType: "N/A",
      suspensionType: "N/A",
      fork: "N/A",
      tireType: "N/A",
      weight: "110g per bottle + 16g magnetic base",
      intendedRidingStyle: "Road, Mountain, Gravel, Bikepacking"
    },
    keyFeatures: [
      "Fidlock-compatible neodymium magnetic lock holds up to 35kg pull force",
      "Aerogel thermal insulation keeps liquids ice cold for up to 4 hours in direct sun",
      "Dishwasher-safe, taste-free antibacterial lining eliminates plastic odors",
      "Leak-proof self-sealing Jet Valve cap prevents drips on bumpy terrain"
    ],
    warranty: "Lifetime magnetic base warranty, 2-year bottle guarantee",
    deliveryInfo: "Pack includes 2 bottles, 2 magnetic frame studs, and titanium bolts."
  }
];

// Export for browser script environments
if (typeof window !== "undefined") {
  window.CYCLE_SPHERE_PRODUCTS = CYCLE_SPHERE_PRODUCTS;
}

