---
title: "Foam CNC Boat"
description: "CNC-milled foam boat hull driven by mathematical curves in Mathematica. Threaded rods added for a high angle of vanishing stability."
date: 2025-02-22
category: "class"
status: "completed"
tags: ["CNC Router", "Mathematica", "Fusion CAM", "Hull Design", "Naval Architecture"]
featured: false
context: "Engineering + Fabrication — Boston College, Spring 2025"
---

## Overview

A small-scale foam-hulled boat — about 12 inches long — machined on the CNC router with a hull profile defined by a stack of mathematical functions. Used Mathematica to plot and tune the curves before exporting them into Fusion for CAM, then milled boats for the whole class. Added threaded rods inboard as ballast to push the angle of vanishing stability past what the bare hull could manage.

## Math first

The hull shape isn't an aesthetic decision — it's the integral of a few mathematical functions tuned for waterline, displacement, and roll behavior. I ran the curves in Mathematica because it makes it easy to slide parameters and watch the cross-sections update. Once the math was locked, the surface generation in Fusion was straightforward.

## Machining

CNC-milled from XPS foam blanks, two-sided with a flip jig. Foam is forgiving of tool entry but unforgiving of dust collection — half the calibration was getting the chip evacuation right so the next cut wasn't following stale paths.

## Threaded rod ballast

The bare hull rolled past vertical too easily. Adding threaded rods low and inboard moved the center of gravity down without changing the displacement signature — the boats stayed in their displacement waterline but couldn't be tipped past about 60° without snapping back upright. Cheap fix, very visible result.

## Outcome

Boats milled for the entire class. Got to do the hull math for the whole batch, which meant I had to defend every curve choice to a class full of skeptical peers. Better defense practice than any presentation.
