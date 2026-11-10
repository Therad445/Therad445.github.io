---
lang: "en"
slug: "graph-learning"
title: "Communities in graphs of legal entities"
summary: "Master’s research on adapting graph methods for community detection without training labels."
date: "2026-11-10"
status: "Master’s thesis · experiment formulation"
updated: "2026-11-10"
---

## The task

Detect communities in graphs of legal entities using graph neural networks and compare them with classical methods, including Louvain. This is the direction of my master’s thesis at MIPT.

Individual links between organisations do not provide an easy-to-read description of the whole structure. Communities may help explore it, but an algorithmic group is not automatically a real holding company or a legally established relationship.

## Approach and my contribution

The work focuses on adapting existing methods to the task, rather than claiming a fundamentally new algorithm. My role is to formulate the experiment, implement comparisons and examine what graph representation learning adds.

There are no community labels for training. Quality therefore cannot be assessed solely by agreement with known correct answers. Evaluation will need several kinds of evidence: structural properties, stability and domain interpretation.

## What has been established

- The thesis topic and applied problem.
- The absence of training labels.
- Comparison with classical community-detection algorithms.
- Adaptation of existing approaches as the main nature of the work.

This is a research formulation, not a finished result. No public comparative measurements are available yet.

## Next stages

1. Define the meaning of nodes, edges and the communities of interest.
2. Select baselines and evaluation criteria that do not require known labels.
3. Prepare a reproducible comparison protocol for graph models.
4. Check the stability of the detected groups and their practical usefulness.

The intended practical output is an implementation. A paper remains a possibility if the work produces a sufficient independent contribution; it is not a completed achievement.

## Disclosure boundaries

Organisational data, internal graphs and work materials are not published. Any future demonstration should use permitted open data or an explicitly synthetic graph. Novelty and effectiveness have not yet been established.
