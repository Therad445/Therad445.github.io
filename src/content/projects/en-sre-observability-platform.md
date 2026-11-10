---
lang: "en"
slug: "sre-observability-platform"
title: "SRE Observability Stack"
summary: "HTTP probes, Prometheus and service availability calculations in Kubernetes."
category: "SRE / Observability"
status: "Educational demo"
year: "2025–2026"
order: 6
tags: ["Python", "Prometheus", "Kubernetes", "Docker"]
repo: "https://github.com/Therad445/sre-observability-platform"
date: "2026-11-09"
featured: false
selection: "additional"
noteTitle: "A small observability setup"
---

This is a small course project: one component checks a service over HTTP, and another calculates the proportion of successful checks. Prometheus sits between them and stores the measurements.

The prober sends periodic GET requests. It records successes, failures and the duration of the latest probe. The components are written in Python, with Dockerfiles and Kubernetes manifests for deployment.

## Where the availability number comes from

The calculator queries Prometheus and uses `increase` over a rolling time window. Success and failure counters give the successful-probe ratio for that period.

The repository calls this metric SLA. “Availability as seen by the probes” is more precise. A probe sees only the request it makes. Another user journey can still be broken while that request succeeds.

The setup is a compact example of how an HTTP check becomes a metric and then a reported number. I do not present it as a production monitoring system.

## Links

- [README](https://github.com/Therad445/sre-observability-platform/blob/main/README.md)
- [Source code](https://github.com/Therad445/sre-observability-platform/blob/main/prober/prober.py)
- [Source code](https://github.com/Therad445/sre-observability-platform/blob/main/sla/sla_calculator.py)
