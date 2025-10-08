export const projects = [
  {
    title: "The Bike of Theseus",
    slug: "bike-of-theseus",
    summary: "Rebuild a beloved bike by fabricating every component myself until the entire machine is literally my handiwork.",
    category: "Flagship",
    status: "On the Horizon",
    featured: false,
    tags: ["Fabrication", "CNC", "Metrology", "Cycling"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Vision",
        paragraphs: [
          "Starting from a stock steel frame, I'll gradually replace every component - frame tubes, drivetrain, wheels, even hardware - with parts I model, machine, or fabricate myself while keeping the bike ride-ready the entire time."
        ],
      },
      {
        type: "list",
        title: "Build Roadmap",
        items: [
          "Reverse engineer the geometry in CAD and lock tolerances before cutting metal.",
          "Fabricate custom components using a blend of CNC milling, brazing, and additive tooling while matching original aesthetics.",
          "Instrument the bike after each swap to track how incremental changes affect ride feel and performance."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Fixture the frame jig, prototype a head tube and dropout set, then move on to drivetrain components once alignment checks out."
        ],
      },
    ],
  },
  {
    title: "Wildfire Topographic Map",
    slug: "wildfire-topographic-map",
    summary: "Laser-cut topographic map and acompanying website to visualize the impact of 2021's Caldor Fire in the Lake Tahoe area.",
    category: "Flagship",
    status: "Completed",
    featured: true,
    tags: ["ArcGIS", "Laser Cut", "HTML", "Python", "Illustrator"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Premise",
        paragraphs: [
          "During spring of my freshman year at Boston College, I joined in on MakeBC's annual 24-hour Make-a-Thon. The event had students enter in 1 of 3 categories: climate, education, or water. I arrived with no idea of what I was getting into, but I was determined to walk away with the Grand Prize."
        ],
      },
      {
        type: "text",
        title: "The Idea",
        subtitle: "10:30 AM - 12:30 PM",
        paragraphs: [
          "When choosing a category, I couldn't help but think of the the effects of climate change on my local community. I come from Santa Rosa, a city about an hour north of San Francisco. In 2017, Santa Rosa was hit by the Tubbs Fire, which was the most destructive wildfire ever to hit California at that time. I remember my neighbors knocking on my parents' bedroom door, frantically telling us that we needed to evacuate. I remember the orange glow on the horizon, the smell of smoke, and the ashes that blanketed every surface like snow.",
          "Perhaps more striking than this fact is that, since 2017, the Tubbs Fire has dropped to the 4th most destructive wildfire in the history of CA. This problem isn't getting better, it's getting worse. That's how I found my idea for this project. I wanted to visualize the kind of devistation these wildfires have on our communities and our environment.",
          "I chose to represent the Caldor Fire that hit the greater Lake Tahoe region in 2021. Lake Tahoe is a beautiful area in the Sierra-Nevada mountain range, and a popular spot for winter sports. My dad grew up skiing every year when he was a kid, and I still remember his reaction the first time he saw the destruction driving up HWY 50."
        ],
      },
      {
        type: "text",
        title: "Data Visualization",
        subtitle: "12:30 PM - 11:30 PM",
        layout: "split",
        paragraphs: [
          "I began by sourcing topographic and geospatial data using online resources like the California State Geoportal. After a lot of trial and error, I was able to import a highly detailed heightmap into ArcGIS, a comprehensive geographic information system used professionally to analyze geospacial data. From there, I extracted the contour lines and overlayed the road maps to output an SVG, where I had to manually separate each elevation level before pushing to the laser-cutter."
        ],
        media: [
          {
            src: "/images/projects/wildfire/AI-Caldor-Topo.png",
            alt: "Composite contour visualization from the Caldor Fire dataset",
            caption: "Elevation contours separated into artboards for laser-cutting, with road geospatial data overlaid. Red lines get cut, black lines get etched."
          }
        ],
      },
      {
        type: "text",
        title: "Fabrication",
        subtitle: "11:30 PM - 5:30 AM",
        layout: "split",
        paragraphs: [
          "I continued on into the early morning doing fabrication and making cardboard mockups. Each panel was about 9x12 in, with 9 layers of baltic birch contours, a 3 layer deep acrylic lake, and a small Lake Tahoe graphic in the top left. After so many hours learning new software, this felt easy."
        ],
        inlineMedia: [
          {
            src: "/images/projects/wildfire/Laser-Cut-Map.jpg",
            alt: "Laser-cut contour layers arranged with the acrylic lake inset",
            caption: "Fresh off the cutter, I glued up a couple of layers at a time with superglue and wood glue until it all came together."
          }
        ],
        media: [
          {
            src: "/images/projects/wildfire/Laser-Cutting.jpg",
            alt: "Logan running the laser cutter",
            caption: "Here's me running the laser cutter. Each layer took roughly 20-30 minutes once I got the process down."
          }
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Edge caching keeps contour redraws under 60 ms even on weak LTE.",
          "Offline sync stores sketches in IndexedDB and pushes them back once service returns.",
          "Export flow generates printable briefings the command trailer can sign off within minutes."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Wiring in VIIRS thermal feeds plus a red-lens friendly color scheme before the next burn-over drill."
        ],
      }
    ],
  },
  {
    title: "3D Printed Joystick",
    slug: "3d-printed-joystick",
    summary: "Custom low-force joystick with adjustable feedback for pilots with limited grip strength.",
    category: "Flagship",
    status: "Completed",
    featured: true,
    tags: ["Mechatronics", "3D Printing", "Human Factors"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "I designed a modular gimbal, printed in carbon-filled nylon, then tuned Hall-effect sensors so light touch inputs map cleanly to flight sim controls. The housing swaps spring cartridges in seconds for different resistance profiles."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Integrated calibration firmware zeroes axes at power-on to cut drift.",
          "Ergonomic grip shells swap via a bayonet mount for fast prototyping.",
          "Dual-sensor redundancy keeps feedback smooth even if one channel spikes."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Packaging a compact control board and rerouting the wiring harness for cleaner cable management."
        ],
      }
    ],
  },
  {
    title: "Robotic Arm",
    slug: "robotic-arm",
    summary: "Six-axis desktop arm exploring palletizing routines and machine vision pick-up accuracy.",
    category: "Flagship",
    status: "In Progress",
    featured: true,
    tags: ["Robotics", "Machine Vision", "Python"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "This in-progress build uses a belt-driven shoulder, harmonic reducers on the wrist, and a Jetson Nano to interpret fiducial markers. I'm balancing payload and jerk limits so it can hand off delicate prints without wobble."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Parameterized Fusion 360 joints make it easy to refit arms for new payload specs.",
          "OpenCV pipeline is already picking 20 mm targets within a 1.5 mm tolerance."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Close the loop on torque sensing so the gripper can detect contact and auto-release."
        ],
      }
    ],
  },
  {
    title: "Custom Catan Board",
    slug: "custom-catan-board",
    summary: "Hardwood Catan board with magnetic tiles and CNC-engraved topography.",
    category: "Flagship",
    status: "In Progress",
    featured: false,
    tags: ["CNC", "Woodworking", "Game Design"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "I'm carving a travel-friendly Catan set with walnut borders and interchangeable terrain hexes. Each tile nests magnets so the board self-aligns on uneven camp tables."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "CNC engraved elevation shading keeps resource tiles easy to read.",
          "Laser cut inlays spell out ports and victory-point trackers without paint."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Finish the oil/wax finish, then prototype a roll-up storage folio."
        ],
      }
    ],
  },
  {
    title: "Repurposed Sawblade Art",
    slug: "repurposed-sawblade-art",
    summary: "Retired sawblades cleaned, etched, and turned into wall-worthy silhouettes.",
    category: "Mini Project",
    status: "Completed",
    featured: false,
    tags: ["Metalwork", "Plasma Cutting", "Finishing"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "A batch of chipped sawblades became a series of plasma-cut ridge line murals. After grinding back the teeth I etched topo lines, then powder-coated each piece for a matte finish."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Set up a fixture that keeps warped blades flat during cutting.",
          "Used sodium bicarbonate blasting to prep the surface without gouging."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Experimenting with LED backlighting to float the pieces off the wall."
        ],
      }
    ],
  },
  {
    title: "Brass Coins",
    slug: "brass-coins",
    summary: "CNC-turned brass coins celebrating makerspace milestones.",
    category: "Mini Project",
    status: "Completed",
    featured: false,
    tags: ["Turning", "Metallurgy", "CNC"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "These commemorative coins were turned on the Tormach with two operations per side. I dialed in toolpaths for crisp lettering, then tumbled them in walnut shells for a satin sheen."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Custom soft jaws hold the blanks without marring the rim.",
          "Laser-etched serial numbers give each coin a traceable story."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Test a patina bath for a two-tone effect on the raised features."
        ],
      }
    ],
  },
  {
    title: "Foam CNC Boat",
    slug: "foam-cnc-boat",
    summary: "Scaled rescue hull milled from XPS foam for fluid dynamics analysis.",
    category: "Class Project",
    status: "Completed",
    featured: false,
    tags: ["CNC", "Fluid Dynamics", "Prototyping"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "For a fluids lab we machined a foam hull to validate drag coefficients before printing fiberglass molds. The CNC allowed quick iteration on chines and keel geometry."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Tabbed toolpaths kept the blank secure without overcutting the keel.",
          "Ran tow-tank tests and matched coefficients within 6% of the CFD model."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Vacuum-form a thin ABS skin to survive extended tow testing."
        ],
      }
    ],
  },
  {
    title: "Rabbit Cage Latch",
    slug: "rabbit-cage-latch",
    summary: "Quick-release latch retrofit that keeps curious rabbits from jailbreaking.",
    category: "Class Project",
    status: "Completed",
    featured: false,
    tags: ["CAD", "Injection Molding", "Testing"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "We reverse-engineered a finicky cage latch and replaced it with a snap-fit assembly printable in PETG. The design installs with one screw and keeps paws away from pinch points."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "FEA predicted failure at 38 lbf; the prototype lasted 44 lbf in bench tests.",
          "Chamfered ramp lets owners operate it one-handed while holding the carrier."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Exploring an overmolded silicone pad to quiet the close action."
        ],
      }
    ],
  },
  {
    title: "CNC Router Wood Experiments",
    slug: "cnc-router-wood-experiments",
    summary: "Documenting feeds, speeds, and bit wear for the campus CNC router lab.",
    category: "Mini Project",
    status: "Ongoing",
    featured: false,
    tags: ["CNC", "Documentation", "Materials"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "This notebook-style project lives in the makerspace. I cut a grid of test coupons across hardwoods and plywoods, logging tear-out, chip load, and cleanup time so new members can dial in settings fast."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Color-coded tool library shows when to switch between compression and downcut bits.",
          "Dust shoe redesign improved visibility without choking the vac system."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Add aluminum test passes once the spindle upgrade clears safety review."
        ],
      }
    ],
  },
  {
    title: "Queen of Hearts",
    slug: "queen-of-hearts",
    summary: "Playable wooden card sculpture with layered laser-cut filigree.",
    category: "Mini Project",
    status: "Completed",
    featured: false,
    tags: ["Laser Cutting", "Illustration", "Finishing"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "I stacked alternating maple and acrylic layers to build a large-format Queen of Hearts that doubles as decor. The laser-cuts interlock without glue so the piece disassembles for transport."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Registration pins keep 12 layers perfectly aligned during assembly.",
          "Translucent acrylic backfill glows when edge-lit for events."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Experimenting with metallic foils to accent the crown details."
        ],
      }
    ],
  },
  {
    title: "Folding Nap Pod",
    slug: "folding-nap-pod",
    summary: "Ergonomic nap pod concept that folds flat when class is back in session.",
    category: "Class Project",
    status: "Completed",
    featured: false,
    tags: ["Ergonomics", "Furniture", "CAD"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "In a design studio sprint we imagined a quiet recharge space for campus lounges. The pod pivots from lounge chair to full recline and nests into a 6-inch profile for storage."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Foam mock-ups confirmed lumbar angles before we cut the plywood ribs.",
          "Acoustic felt panels drop ambient noise by roughly 7 dB."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Source damped hinges to smooth the fold-up motion."
        ],
      }
    ],
  },
  {
    title: "Trashcan Backboard",
    slug: "trashcan-backboard",
    summary: "Add-on backboard that makes classroom trash tosses satisfyingly accurate.",
    category: "Mini Project",
    status: "Completed",
    featured: false,
    tags: ["3D Printing", "Installation", "Fun"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "A quick morale boost build: a polycarbonate backboard and rim that straps onto a standard 32-gallon bin. The whole rig tightens with cam straps so janitorial staff can remove it fast."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Flexible TPU rim survives the occasional dunk without cracking.",
          "Printed scoreboard clips track streaks during lab breaks."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Add a passive counterweight so the rim auto-levels after a slam."
        ],
      }
    ],
  },
  {
    title: "Waterbottle Stickers",
    slug: "waterbottle-stickers",
    summary: "Sticker packs celebrating the lab's inside jokes and safety wins.",
    category: "Mini Project",
    status: "Completed",
    featured: false,
    tags: ["Graphic Design", "Vinyl", "Branding"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "Designed vector art in Illustrator, then ran print-and-cut cycles on the Cricut so every team member left the semester with a sticker sheet. Laminated them for dishwashers because hydration goals matter."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Registration marks keep multi-color prints aligned across runs.",
          "Matte laminate doubles sticker longevity on dented bottles."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Expand the series with QR codes linking to lab SOP videos."
        ],
      }
    ],
  },
  {
    title: "Silverware Organizer",
    slug: "silverware-organizer",
    summary: "Custom drawer insert sized to mismatched thrift-store utensils.",
    category: "Mini Project",
    status: "Completed",
    featured: false,
    tags: ["Woodworking", "CNC", "Home"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "This quick win used a single sheet of baltic birch. I laser scanned the drawer interior, then milled slots sized for each utensil bundle so nothing chats around during drawer slam tests."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Finger-jointed corners drop into the drawer without fasteners.",
          "Cork lining keeps utensils quiet and absorbs the occasional drip."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Add a sliding secondary tray for bar tools."
        ],
      }
    ],
  },
  {
    title: "Man Cave Sign",
    slug: "man-cave-sign",
    summary: "Layered LED sign gift with routed lettering and diffused glow.",
    category: "Mini Project",
    status: "Completed",
    featured: false,
    tags: ["CNC", "Electronics", "Finishing"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "A family gift turned into a quick LED project. I routed letters into maple, lined the cavities with reflective vinyl, then embedded an LED strip with a hidden controller pocket on the rear."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Router template ensures consistent kerning across long words.",
          "Frosted acrylic diffuser softens hotspots from the LED strip."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Add a capacitive touch dimmer to the lower edge."
        ],
      }
    ],
  },
  {
    title: "Collegiate Coasters",
    slug: "collegiate-coasters",
    summary: "Resin-filled coasters featuring local college landmarks.",
    category: "Mini Project",
    status: "Completed",
    featured: false,
    tags: ["Casting", "Laser Engraving", "Finishing"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "Designed a set of coasters where each tile spotlights a campus building. Laser-etched the artwork into cherry, poured tinted resin, and sanded flat for a glass-smooth finish."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Made silicone molds so I can batch-pour four coasters at once.",
          "Used mica powders for subtle shimmer that still reads under a mug."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Bundle them with matching wall-mount plaques for the bookstore."
        ],
      }
    ],
  },
  {
    title: "Strandbeest Linkage",
    slug: "strandbeest-linkage",
    summary: "Scaled-down Theo Jansen linkage to teach kinematics and laser nesting.",
    category: "Mini Project",
    status: "Completed",
    featured: false,
    tags: ["Mechanisms", "Laser Cutting", "Kinematics"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "Built a dozen walking modules with students to demonstrate overconstrained linkages. The kit stores flat but assembles with shoulder bolts and nylon spacers in under ten minutes."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Parametric script recalculates rod lengths when we scale the model.",
          "Added quick-release crank to switch between hand power and a small motor."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Mount the linkage on a windy-day art installation at the makerspace lawn."
        ],
      }
    ],
  },
  {
    title: "Bomb-Disarming Robot",
    slug: "bomb-disarming-robot",
    summary: "Team built teleoperated robot with claw and camera for a mock EOD challenge.",
    category: "Class Project",
    status: "Completed",
    featured: false,
    tags: ["Robotics", "Controls", "Team Project"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "For our capstone we built a differential-drive robot with an IP65 chassis and manipulator claw. The control link rode on 5 GHz Wi-Fi with redundancies so we could clear obstacles in a maze course."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Swapped in modular grippers to handle both cut wires and valve turns.",
          "Latency stayed under 90 ms thanks to lightweight video compression."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Integrate depth sensing so the operator can trust auto-stopping before collisions."
        ],
      }
    ],
  },
  {
    title: "The Best Cheeseburger Fries",
    slug: "the-best-cheeseburger-fries",
    summary: "Weekend R&D session exploring the perfect smashburger-loaded fries recipe.",
    category: "Just For Fun",
    status: "Completed",
    featured: false,
    tags: ["Food Lab", "Iteration", "Fun"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "I treated game night snacks like a lab experiment: varied fry thickness, smashburger sear time, and cheese melt profile until the platter disappeared in record time. Data logging included crowd-sourced taste scores."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Batch fryer at 325 F then 375 F produced the best crunch retention.",
          "Blend of cheddar and American hit the nostalgia-to-stretch ratio sweet spot."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Prototype a backyard serving caddy with built-in dip warmers."
        ],
      }
    ],
  },
  {
    title: "Dunking",
    slug: "dunking",
    summary: "Biomechanics challenge to design and train toward a regulation rim dunk.",
    category: "Just For Fun",
    status: "Ongoing",
    featured: false,
    tags: ["Biomechanics", "Training", "Data Tracking"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "This personal engineering-meets-athletics project logs jump mechanics with IMU sensors and force-plate sessions. The goal: tailor strength blocks that get me above 10 feet with consistent form."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Python dashboard tracks knee flexion angles and peak velocity per session.",
          "3D-printed shin guards let me wear sensors without wrecking the data."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Integrate blood oxygen tracking to fine-tune recovery pacing."
        ],
      }
    ],
  },
  {
    title: "Baja SAE Kart",
    slug: "baja-sae-kart",
    summary: "Lightweight kart chassis pushing Baja SAE drivetrain experiments forward.",
    category: "Team Project",
    status: "Ongoing",
    featured: false,
    tags: ["Baja SAE", "Fabrication", "Telemetry"],
    image: null,
    imageAlt: null,
    body: [
      {
        type: "text",
        title: "Overview",
        paragraphs: [
          "I'm iterating on a kart-scale test mule that mirrors our Baja drivetrain. It lets us prototype CVT ratios, suspension travel, and dash telemetry without risking the competition car."
        ],
      },
      {
        type: "list",
        title: "Highlights",
        items: [
          "Laser cut tabs speed jig setup so we can weld a frame in under a day.",
          "Onboard microcontroller logs RPM, belt temp, and Gs to an SD card."
        ],
      },
      {
        type: "text",
        title: "Next Steps",
        paragraphs: [
          "Swap to adjustable shocks and correlate telemetry with driver feedback."
        ],
      }
    ],
  },
];
export function getProjectBySlug(slug) {
  return projects.find(project => project.slug === slug);
}
export function getProjectCategories() {
  return Array.from(new Set(projects.map(project => project.category))).sort();
}
export function getProjectStatuses() {
  return Array.from(new Set(projects.map(project => project.status))).filter(Boolean).sort();
}
export const featuredProjects = projects.filter(project => project.featured);















