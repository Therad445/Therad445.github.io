---
lang: "en"
slug: "ml-serving-monitoring"
title: "MLflow / FastAPI Service"
summary: "MLflow-backed inference with feature validation, model switching, metrics and data-drift monitoring."
category: "MLOps"
status: "Course service"
year: "2026"
order: 2
tags: ["Python","FastAPI","MLflow","Prometheus","Evidently"]
repo: "https://github.com/Therad445/testing_and_monitoring"
branch: "main"
date: "2026-11-10"
featured: true
selection: "primary"
noteTitle: "A model behind an API: errors, metrics and updates"
---

A trained model still needs a service that accepts valid inputs, reports failures and makes predictions observable. This project connects FastAPI, MLflow and monitoring tools.

## What I implemented

The service loads a model from an MLflow run. Its `/predict` endpoint validates input features and returns a class, probability and model identity. Missing features, unavailable models and inference failures have distinct API responses.

The `/updateModel` endpoint loads and validates a replacement before swapping the state under a lock. A failed load leaves the previous model in memory.

## Observability

Prometheus receives request, preprocessing, inference, prediction and model-update metrics. A separate component accumulates reference/current batches and builds Evidently data-drift reports.

These measurements help distinguish a slow service, slow inference and changes in input data. Drift alone does not establish a loss of prediction quality.

## What can be checked

The repository contains eight automated tests covering feature conversion, valid requests, missing models, update failures and the metrics endpoint. API tests use a dummy model; they do not replace integration checks with MLflow and Evidently.

## Limitations

A complete run requires MLflow, a saved model and an Evidently Workspace. The author's report describes Grafana dashboards and alerts, but their configurations are not included. Drift buffers live in memory; handling feature-schema changes and bounding metric cardinality need further work.

## Code and material

- [API and error handling](https://github.com/Therad445/testing_and_monitoring/blob/d8187937779cbc15d863971f2a636813cc55aed2/ml_service/app.py)
- [Model loading and replacement](https://github.com/Therad445/testing_and_monitoring/blob/d8187937779cbc15d863971f2a636813cc55aed2/ml_service/model.py)
- [Automated tests](https://github.com/Therad445/testing_and_monitoring/tree/d8187937779cbc15d863971f2a636813cc55aed2/tests)
