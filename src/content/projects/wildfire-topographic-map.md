---
title: "Wildfire Topographic Map"
description: "Laser-cut layered topographic map of Tahoe showing Caldor Fire burn scars, paired with a Raspberry Pi running an interactive before/after slider."
date: 2025-04-10
category: "fabrication"
status: "completed"
tags: ["ArcGIS", "Illustrator", "Laser Cut", "Raspberry Pi", "Python", "HTML"]
featured: true
cover: "/images/projects/wildfire/Laser-Cut-Map.webp"
coverAlt: "Laser-cut contour layers of the Caldor Fire region with an acrylic Lake Tahoe inset."
context: "MakeBC 24-Hour Make-a-Thon — Boston College, Spring 2025"
imageDir: "wildfire"
---

## Overview
<!-- images: Presentation.webp -->

A 24-hour build that pulled together GIS data extraction, laser-cut topographic fabrication, and a hands-on Raspberry Pi demo to show what the 2021 Caldor Fire did to the Lake Tahoe region. The map itself reads one moment in time; the Pi slider lets the audience drag between before and after satellite and ground imagery of the burn scar. Took home both the Grand Prize and the Climate Track prize.

## Data extraction
<!-- images: GIS-Overlay.webp, AI-Caldor-Topo.webp -->

I sourced elevation rasters and road geospatial data from the California State Geoportal, then imported them into ArcGIS to crop the Caldor footprint and extract contour lines at a usable spacing. The output was an SVG with each elevation band on its own layer. After cleanup in Illustrator, every layer became one panel ready for the laser.

## Laser cutting and assembly
<!-- images: Laser-Cutting.webp -->

Each panel was about 9×12 in: nine layers of baltic birch contours, a three-layer acrylic inset for Lake Tahoe, and a small Tahoe graphic in the corner. I glued two or three layers at a time with cyanoacrylate plus wood glue for working time. Once I had the cut process dialed, each layer ran 20–30 minutes on the laser.

## Interactive demo
<!-- images: Raspberry-Pi-Python.webp -->

The Pi served a simple HTML page locally with a slider that crossfaded before/after satellite tiles of the burn area. Connecting it to the physical map turned a static fabrication piece into something visitors actually interacted with, taking the project to another level.

## Challenges and learnings
<!-- images: Showing-Off.webp -->

The hardest part was data gathering and cleanup. I struggled for several hours just trying to find the right datasets to merge the roads and contours together. California and Nevada had separate processes, and California in particular required many different layers to get the full picture. But I perservered, and it was well worth it in the end.

## Outcome

Grand Prize and Climate Track winner. I'd been wanting to play with GIS for awhile, and I was happy to walk away with much more knowledge than I entered with. Plus, after I'd finished, I had a little over an hour to spare before the presentation. This was a great chance to test out the [Nap Pod](/projects/folding-nap-pod/), and I'm happy to say it was very comfortable.
