---
lang: "en"
slug: "cuda-rentsense-knn"
title: "CUDA RentSense kNN"
summary: "Three distance implementations, and why kernel time is not the whole job."
category: "GPU computing"
status: "Educational implementation"
year: "2025–2026"
order: 7
tags: ["C++", "CUDA", "CMake", "Python"]
repo: "https://github.com/Therad445/cuda-rentsense-knn"
date: "2026-11-09"
featured: false
selection: "additional"
noteTitle: "kNN on the CPU and GPU"
---

In this course project, I compare three ways to calculate distances for kNN: sequential C++, a simple CUDA kernel and a shared-memory kernel.

The task comes from kNN regression on tabular data. Computing distances is only part of the work: data must move to the GPU and back, and neighbours must then be selected.

## What to time

The code has separate measurements for data transfers, kernel execution and CPU post-processing. This distinction matters. A faster kernel does not necessarily make the complete program faster by the same amount.

The repository includes data preparation, CSV timing output and profiling scripts. It does not contain a saved set of benchmark results, so I do not quote a specific speedup here.

## Limits of this implementation

Neighbour selection still runs on the CPU. The program also stores the full distance matrix: Q queries against N objects require O(QN) memory. This needs attention before increasing the input size.

The code provides implementations to compare. Any speedup claim needs to specify the hardware, data size and complete computation path.

## Links

- [README](https://github.com/Therad445/cuda-rentsense-knn/blob/main/README.md)
- [Source code](https://github.com/Therad445/cuda-rentsense-knn/blob/main/src/knn_cuda.cu)
- [Benchmark script](https://github.com/Therad445/cuda-rentsense-knn/blob/main/scripts/run_bench.sh)
