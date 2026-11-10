---
lang: "en"
slug: "logs-and-claims"
title: "What a log report does — and does not — tell us"
summary: "Why error counts are not service availability, and why demonstration data needs a clear label."
date: "2026-11-10"
kind: "Technical note"
---

A log analyser is easy to show through a few numbers: total requests, errors and frequently requested paths. Explaining what those numbers actually answer takes more care.

## Start with the boundaries of the log

In my Nginx Log Analyzer, reading, parsing, analysis and reporting are separate. This makes it possible to trace a metric back to a log line and check each stage independently.

A log only contains what reached it. Missing files and unrecognised lines remain missing evidence even when the report looks tidy. Keeping the input set, time period and processing rules beside the output makes the result easier to check.

## An HTTP error is not the same as downtime

The share of 5xx responses describes recorded requests. It excludes a request that never reached the server and does not automatically measure time unavailable. A 404 can also be a normal part of an application’s behaviour. A metric’s meaning depends on the question.

I find it useful to start with a few specific lines before moving to aggregates. This makes mistaken assumptions about formats, status codes or units easier to notice.

## A demonstration should remain a demonstration

A small synthetic log is useful for a public example: it shows checkable behaviour without exposing work data. But it only exercises a particular processing path. It does not establish load tolerance or prove production use.

[The project walkthrough](/en/projects/nginx-log-analyzer/) brings together the implementation, demonstration and limitations. [The source code](https://github.com/Therad445/nginx-log-analyzer) provides the details.
