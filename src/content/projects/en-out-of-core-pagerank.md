---
lang: "en"
slug: "out-of-core-pagerank"
title: "PageRank"
summary: "PageRank with edges stored on disk and parallel processing without locks during rank accumulation."
category: "Systems / Graphs"
status: "Technical assignment implementation"
year: "2026"
order: 4
tags: ["C++17","Multithreading","External memory"]
repo: "https://github.com/Therad445/graph_analytics_pagerank"
branch: "main"
date: "2026-11-10"
featured: false
selection: "primary"
noteTitle: "PageRank: edges on disk, ranks in memory"
---

When an edge list exceeds available memory, a conventional graph representation becomes inconvenient. For a technical assignment, I implemented PageRank in C++17 with binary edge partitions on disk and vertex arrays in RAM.

## The main decision

The program makes two passes over the input CSV: one to determine the graph size, another to count out-degrees and partition edges by destination-vertex ranges.

On each iteration, workers read different partitions sequentially. Each accumulates contributions into its own range of the rank array, removing the need for atomic additions or locks in this phase. Dangling vertices are handled separately to preserve total rank mass.

## What was checked

On 10 November 2026, the code was compiled directly with g++ 14.2.0 using C++17, `-O3` and `-pthread`. The repository example has four vertices and four edges. It ran for 20 iterations with two threads and four partitions.

The repository's independent Python calculation matched: maximum absolute error **0**, rank sum **1**. This verifies a small example; large-graph performance was not measured here.

[Result and reproduction commands](/data/project-demos/pagerank/verification.txt).

## Limitations

Array sizes depend on the maximum vertex ID, so sparse identifiers require remapping. Vertex arrays must still fit in memory. Uneven partitions reduce parallel load balance. The memory parameter is an advance estimate, not a hard process limit.

## Code

- [Implementation](https://github.com/Therad445/graph_analytics_pagerank/blob/09df690199015931392c1e23f9bc9ba9c49647c7/src/main.cpp)
- [Python verification](https://github.com/Therad445/graph_analytics_pagerank/blob/09df690199015931392c1e23f9bc9ba9c49647c7/scripts/verify_small.py)
- [Design decisions and limitations](https://github.com/Therad445/graph_analytics_pagerank/blob/09df690199015931392c1e23f9bc9ba9c49647c7/docs/report.md)
