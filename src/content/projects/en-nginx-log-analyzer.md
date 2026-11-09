---
lang: "en"
slug: "nginx-log-analyzer"
title: "Nginx Log Analyzer"
summary: "A Java service that reads Nginx logs, calculates metrics and produces reports."
category: "Software engineering"
status: "Implementation and documentation"
year: "2025–2026"
order: 0
tags: ["Java", "Spring Boot", "Kafka", "Maven"]
repo: "https://github.com/Therad445/nginx-log-analyzer"
date: "2026-11-09"
featured: true
noteTitle: "Making sense of Nginx logs"
---

A request log does not explain much by itself. It contains addresses, status codes, timestamps and request sizes, but reading it line by line is awkward. This project turns Nginx logs into metrics that can help identify errors and unusual activity.

The analyser is written in Java. It reads Combined Log entries, parses them, calculates metrics and produces a report. Output is available as JSON, Markdown or PDF, and the service has a REST API.

## What it measures

The code includes windowed aggregates, request frequency by IP and deviation detection using Z-score and EWMA. These can flag something worth investigating. They do not explain why it happened: a traffic spike can have several causes.

Reading, parsing, analysis and reporting are separate parts of the code. That makes it possible to look at one stage without going through the whole service.

## What is in the repository

Source code, tests, documentation and infrastructure files. This is an educational engineering project. I do not quote production throughput here; that would require separate, reproducible measurements.

## Links

- [README](https://github.com/Therad445/nginx-log-analyzer/blob/main/README.md)
- [Source code](https://github.com/Therad445/nginx-log-analyzer/blob/main/src/main/java/io/github/therad445/loganalyzer/service/LogAnalysisService.java)
- [Source code](https://github.com/Therad445/nginx-log-analyzer/blob/main/src/main/java/io/github/therad445/loganalyzer/anomaly/AnomalyService.java)
