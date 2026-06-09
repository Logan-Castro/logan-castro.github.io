---
title: "Bomb Disarming Robot"
description: "High school kit robot extended with a custom controller, a phone-streamed video feed, and an Arduino joystick relay to disarm a 'bomb' over wifi."
date: 2023-05-15
category: "class"
status: "completed"
tags: ["Raspberry Pi", "Arduino Leonardo", "Video Streaming", "CAD", "Robotics"]
featured: false
team: ["Joe Skubic"]
context: "High school class project — ~2023"
---

## Overview

A high school class project where every team started from the same kit — motors, drivers, and a frame. The challenge was the same for everyone; what you did on top of the kit was up to you. Joe Skubic and I went far enough that ours could be driven completely remotely, with no line of sight, off a wifi video feed — and used that to "disarm" a bomb with an attached grabber hand.

## What we built on top of the kit

The kit gave us a chassis we could drive. We added three pieces:

- **Custom controller housing.** I designed the housing for the controller — ergonomics around two joysticks and a few buttons, with internal mounts for Joe's electronics. Printed and assembled so it actually felt like a controller, not a breadboard on a stick.
- **Phone-as-camera, Pi-as-screen.** I set up an old cell phone as a live video source streaming to a Raspberry Pi with a small attached screen. That gave us a portable display we could carry around while operating the robot, instead of being tethered to a laptop.
- **Joystick-to-keyboard relay.** Joe built the input pipeline on an Arduino Leonardo (Leonardo because it can present itself as a HID keyboard natively). Analog joystick inputs → keyboard outputs → sent over the wifi link to the robot.

## The grabber

The kit didn't include any kind of manipulator, so we added a grabber hand to the front. Coarse but it worked — enough to pick up and move the "bomb" target.

## Outcome

A robot that could be driven through a wifi video feed, with a grabber hand for manipulation, controlled entirely off the line-of-sight. We disarmed our bomb. Lives in the "fun" bucket because the kit-base meant the engineering bar was low — but the on-top work was where the actual learning happened, and most of what I know about live video over a hobby network came from this project.
