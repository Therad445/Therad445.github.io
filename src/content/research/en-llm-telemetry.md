---
lang: "en"
slug: "llm-telemetry"
title: "What LLM-serving telemetry can tell us"
summary: "An LLM-serving testbed: temporal resolution, export volume and the limits of tenant attribution."
date: "2026-11-10"
status: "Experiments complete · methodological revision"
updated: "2026-11-10"
---

## The question

How do measurement frequency and telemetry export volume affect what we can recover about the workloads of different users of an LLM service?

My interest is practical: diagnosis needs sufficient evidence, while collecting, transmitting and storing it also consumes resources. A useful comparison starts by defining the task the telemetry is meant to solve.

## My contribution and completed work

The work includes trace-based experiments and a controlled live vLLM testbed, aggregation variants and methods for recovering assigned workload classes. Raw results, recomputation code and a working manuscript have been assembled. Some later series have undergone computational checks using the saved data.

Recomputation checks the processing of results. It does not replace a new run on independent hardware or establish that findings transfer to production services.

## What the audit changed

Four tasks need to be separated:

- recovering a label assigned by a workload generator;
- detecting service degradation;
- identifying an individual user’s causal contribution;
- measuring telemetry overhead.

Recovering an artificial label does not by itself mean that a system found the cause of an incident. A decoder’s error also does not establish information loss through aggregation: another decoder may recover the answer from the same data.

This is the main methodological limitation of the current work. I therefore do not claim a universal temporal-resolution boundary or a production incident-diagnosis method.

## Next step

Narrow the manuscript into a reproducible engineering case study: define the target and unit of analysis, make export accounting consistent, check simple baselines and distinguish planned tests from findings discovered after inspecting the data.

Evaluation on new workloads should follow a frozen protocol. JSON size is not the full cost of observability; collection resources, networking and storage require separate measurements.

## Status

Experiments have been run; methods and interpretation are being revised. The work is not published or peer reviewed. Numerical comparisons are withheld from this site until review is complete; internal traces and the manuscript are not distributed here.
