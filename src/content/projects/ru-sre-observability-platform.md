---
lang: "ru"
slug: "sre-observability-platform"
title: "SRE Observability Stack"
summary: "HTTP-пробы, Prometheus и расчёт доступности сервиса в Kubernetes."
category: "SRE / Observability"
status: "Учебный стенд"
year: "2025–2026"
order: 6
tags: ["Python", "Prometheus", "Kubernetes", "Docker"]
repo: "https://github.com/Therad445/sre-observability-platform"
date: "2026-11-09"
featured: false
selection: "additional"
noteTitle: "Небольшой стенд наблюдаемости"
---

Это небольшой учебный стенд: один компонент проверяет сервис по HTTP, другой считает долю успешных проверок. Между ними — Prometheus, который хранит измерения.

Пробер периодически отправляет GET-запросы. Он записывает успехи, ошибки и длительность последней пробы. Компоненты написаны на Python; для запуска есть Dockerfile и манифесты Kubernetes.

## Откуда берётся доступность

Калькулятор обращается к Prometheus и использует `increase` на скользящем временном окне. По счётчикам успешных и неуспешных проверок получается доля успехов за выбранный период.

В репозитории этот показатель назван SLA. Здесь точнее говорить о доступности по результатам проб. Такая проверка видит только тот запрос, который отправляет пробер. У пользователя может не работать другой сценарий, даже если этот запрос проходит.

Стенд полезен как компактный пример связи между HTTP-проверкой, метрикой и расчётом показателя. Готовой промышленной системой мониторинга я его не называю.

## Ссылки

- [README](https://github.com/Therad445/sre-observability-platform/blob/main/README.md)
- [Исходный код](https://github.com/Therad445/sre-observability-platform/blob/main/prober/prober.py)
- [Исходный код](https://github.com/Therad445/sre-observability-platform/blob/main/sla/sla_calculator.py)
