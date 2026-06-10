---
title: "Folding Nap Pod"
description: "Full-scale folding nap pod prototype built around NASA's neutral body position. 2nd place at the Making the Modern World Design Conference."
date: 2024-12-08
category: "class"
status: "completed"
tags: ["Fusion", "Slicer for Fusion 360", "Laser Cutter", "Foam Fabrication", "Ergonomics", "Human Factors"]
featured: true
team: ["John Slidell", "Alexander Dudgeon"]
context: "ENGR 1801: Making the Modern World — Boston College, Fall 2024"
cover: "/images/projects/folding-nap-pod/Cover_Team_Picture.webp"
---

## Overview
<!-- images: Final-Render1.webp -->

A folding, full-scale nap pod designed for sleep-deprived college students, specifically freshmen living off campus on Newton who had limited ability to return to their dorms between classes. The NapNest unfurls from a compact box into a four-section reclined lounger shaped around the NASA neutral body position, the joint angles a human body settles into in microgravity, which turn out to be close to what your spine actually wants when resting. Built from cardboard and foam, it was light enough to carry and compact enough to check out from a library desk. Took 2nd place across all sections of the Making the Modern World Design Conference and was widely recognized as the strongest physical prototype in the room.

## Research
<!-- images: NASA_Neutral_Body.webp -->

The problem was straightforward to establish: BC freshmen living off campus were sleep-deprived and had nowhere convenient to nap between classes. Commuting back to Newton just to sleep for an hour wasn't realistic. We interviewed students and a collegiate athlete, surveyed the literature on sleep deprivation in college populations, and found that 27% of students at a comparable university were at risk for sleep disorders with direct links to academic failure. NASA's neutral body position study set our joint-angle targets so the recline geometry was grounded in data rather than guesswork. It gave us exact angles for the head, torso, thigh, and leg sections, which drove how many sections we used (four) and their relative heights.

## Concept development
<!-- images: First_Prototype.webp, Hammock_Prototype.webp, Wall_Mounted_Lounger_Miniature.webp -->

We generated five initial concepts through sketching: a triangle foam block, a wall-mounted folding lounger, a box-folding hammock, a curtained enclosure, and a tall folding lounger. My three contributions were the triangle block (simple, few moving parts, good body support but rigid and potentially bulky), the wall-mounted folding lounger (space-efficient when stowed, uses locking hinge joints, but not portable and offered no padding solution), and the tall folding lounger (portable and easy to deploy, but no privacy and no cushioning).

We narrowed to three candidates for low-fidelity prototyping: the folding lounge chair, a taller version with better head support, and the box-hammock. We built the lounge chair iterations out of cardboard with a suspension system and the box-hammock out of modeling clay to quickly test the folding and unlatching mechanism. Testing involved measuring deployed volume, estimating materials cost, and running a survey rating each prototype on comfort and privacy from 1 to 10.

The weighted decision matrix weighted comfortability and size most heavily, with privacy as a strong secondary criterion. The triangle block concept won out, primarily because the lattice base could support body weight while keeping the whole thing light, and the four-section geometry naturally created side walls for privacy when deployed. We renamed it the NapNest, a nod to the BC Eagles that stuck.

## Design and CAD
<!-- images: Initial_Render_Closed.webp, Initial_Render_Open.webp, Initial_Render_Folding.webp -->

I modeled the NapNest in Fusion. The structure is four independent sections, each built from double-wall cardboard cut into a honeycomb-like lattice and stacked into a rigid load-bearing base. The lattice geometry came out of Slicer for Fusion 360, a program discontinued long enough ago that I had to use the Wayback Machine to download it. It distributes weight across the cross-section so the cardboard could support a person without compressing. Each section has a foam cushion on top wrapped in antimicrobial fabric, which in the final design was also intended to serve as the hinge connecting the sections and allowing them to fold into each other. The choice of cardboard and foam kept the whole thing light enough that a student could carry it across campus without much effort.

## Fabrication
<!-- images: Latice.webp, Cross-Section.webp -->

I designed and laser-cut the cardboard lattice structures for each of the four sections. The foam was cut to fit each section and wrapped. Due to material availability constraints at the time of the conference, we used duct tape as a stand-in hinge between sections rather than the antimicrobial fabric the design called for. The larger laser cutter was also broken during our build window, which required us to re-plan the cutting to work within the available machine's bed size. We built it full scale so judges could actually get in it, which turned out to matter.

## Challenges and learnings
<!-- images: TriangleChairDos_2__2024-Oct-29_06-49-28PM-000_CustomizedView24708993659_mp4__1_.gif -->

Material constraints hit us at the worst time. We didn't receive all of our intended materials before the conference, which meant the privacy walls we had designed never made it onto the prototype. The foam cutter also didn't fit our foam, so that process required improvisation. The duct tape hinge worked for the demo but is not the finished solution. Getting in and out of the NapNest was harder than expected due to its low-to-the-ground profile. A real deployment would need a grab bar or a raised platform, both of which create tradeoffs with portability and the fold-down size.

## Outcome
<!-- images: Final_Prorotype.webp -->

2nd place across all sections of the Making the Modern World Design Conference. The consistent feedback from judges was that the NapNest was the best physical prototype presented. The full deliverable included CAD renderings, a <a href="/documents/projects/folding-nap-pod/Nap_Pod_Technical_Brief.pdf" target="_blank" rel="noopener noreferrer">research-backed design report</a>, and the working prototype. Given more time, next steps were a fire-retardant coating for the cardboard, proper antimicrobial fabric hinges, and privacy walls on both sides.