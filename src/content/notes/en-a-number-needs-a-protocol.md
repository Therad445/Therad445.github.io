---
lang: "en"
slug: "a-number-needs-a-protocol"
title: "A number needs a protocol"
summary: "A lesson from a course n-step SAC experiment: keep the configuration, seed and limitations beside the result."
date: "2026-11-10"
kind: "Technical note"
---

A course experiment can have a convenient ending: one row in the table is higher than the others. It makes an easy headline. First, however, it is worth asking what was compared and how many times the comparison was repeated.

## An example from my work

In [n-step Soft Actor-Critic](/en/projects/nstep-sac-reproducibility/), I compared several return horizons. The open results contain one seed per configuration. The chart shows real saved values, but it does not estimate a stable advantage of one method.

Repeated evaluation episodes for one trained model and independent training runs answer different questions. The former describe a particular model’s behaviour; the latter help establish how much the result depends on randomness in training.

## What belongs beside a chart

- The configuration and code version.
- Seeds and the number of independent runs.
- The metric definition and evaluation point.
- The raw results used to construct the figure.
- A boundary for the conclusion: what was tested and what remains an assumption.

The same applies to simpler comparisons. CUDA speedup depends on problem size, hardware, warm-up and whether data transfers are included. Without a consistent protocol, two attractive numbers may describe different workloads.

For my portfolio, I would rather keep a result that can be examined closely than make a small experiment look like a finished proof.
