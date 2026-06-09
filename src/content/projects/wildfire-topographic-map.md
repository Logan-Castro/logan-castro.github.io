---
title: "Wildfire Topographic Map"
description: "Laser-cut layered topographic map of Tahoe showing Caldor Fire burn scars, paired with a Raspberry Pi running an interactive before/after slider."
date: 2025-04-10
category: "fabrication"
status: "completed"
tags: ["ArcGIS", "Illustrator", "Laser Cut", "Raspberry Pi", "Python", "HTML"]
featured: true
cover: "/images/projects/wildfire/Laser-Cut-Map.jpg"
coverAlt: "Laser-cut contour layers of the Caldor Fire region with an acrylic Lake Tahoe inset."
context: "MakeBC 24-Hour Make-a-Thon — Boston College, Spring 2025"
---

## Overview

A 24-hour build that pulled together GIS data extraction, laser-cut topographic fabrication, and a hands-on Raspberry Pi demo to show what the 2021 Caldor Fire did to a Lake Tahoe drainage. The map itself reads one moment in time; the Pi slider lets the audience drag between before and after satellite imagery of the burn scar. Took home both the Grand Prize and the Climate Track prize.

## Data extraction

I sourced elevation rasters and road geospatial data from the California State Geoportal, then imported them into ArcGIS to crop the Caldor footprint and extract contour lines at a usable spacing. The output was an SVG with each elevation band on its own layer. After cleanup in Illustrator, every layer became one panel ready for the laser.

## Laser cutting and assembly

Each panel was about 9×12 in: nine layers of baltic birch contours, a three-layer acrylic inset for Lake Tahoe, and a small Tahoe graphic in the corner. I glued two or three layers at a time with cyanoacrylate plus wood glue for working time. Once I had the cut process dialed, each layer ran 20–30 minutes on the laser.

## Interactive demo

The Pi served a simple HTML page locally with a slider that crossfaded before/after satellite tiles of the burn area. Connecting it to the physical map turned a static fabrication piece into something visitors actually interacted with — dragging the slider over a hillside in the wood and watching the same hillside turn black in the screen above.

## Challenges and learnings

The hardest part was data cleanup. ArcGIS will happily export thousands of overlapping contour fragments and missing one corrupts a whole layer at the laser. I also under-budgeted the glue-up — nine layers compound alignment errors fast, and even 0.5 mm off shows as a visible step. Next time I'd jig the stack with registration pins from the start.

## Outcome

Grand Prize and Climate Track winner. The bigger win was the documented pipeline — a friend has since used the same ArcGIS → laser flow for a separate watershed.
