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

## Thesis, software registration and publications

In 2025, I completed my undergraduate thesis at MIET on developing a software module for monitoring and analysing Nginx server logs.

**NginxLogAnalyzerJava — an Nginx log-file analysis system** was entered in Russia’s Register of Computer Programs on 13 August 2025, registration certificate No. **2025681328**. I am listed as its author and rights holder.

I also wrote two articles on this work, both in Russian:

- [Developing a software module for monitoring and analysing Nginx server logs](https://moluch.ru/archive/576/125503) — Molodoy Ucheny, 2025, No. 25 (576), pp. 7–10.
- [Stream-based processing of Nginx logs in Kubernetes](https://naukaip.ru/wp-content/uploads/2025/07/K-803.pdf#page=13) — Best Scientific Work 2025 proceedings, pp. 13–17. The paper received second place in the Technical Sciences section of the competition organised by the Science and Education International Centre for Scientific Cooperation.

## Links

- [README](https://github.com/Therad445/nginx-log-analyzer/blob/main/README.md)
- [Source code](https://github.com/Therad445/nginx-log-analyzer/blob/main/src/main/java/io/github/therad445/loganalyzer/service/LogAnalysisService.java)
- [Source code](https://github.com/Therad445/nginx-log-analyzer/blob/main/src/main/java/io/github/therad445/loganalyzer/anomaly/AnomalyService.java)
