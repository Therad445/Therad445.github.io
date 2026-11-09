---
lang: "ru"
slug: "nginx-log-analyzer"
title: "Nginx Log Analyzer"
summary: "Java-сервис, который читает логи Nginx, считает метрики и собирает отчёты."
category: "Software engineering"
status: "Реализация и документация"
year: "2025–2026"
order: 0
tags: ["Java", "Spring Boot", "Kafka", "Maven"]
repo: "https://github.com/Therad445/nginx-log-analyzer"
date: "2026-11-09"
featured: true
noteTitle: "Разбираем логи Nginx"
---

Журнал запросов сам по себе мало что объясняет. В нём есть адреса, коды ответов, время и размер запросов, но читать всё это построчно неудобно. В этом проекте я собираю из логов Nginx показатели, по которым можно заметить ошибки и необычную активность.

Анализатор написан на Java. Он читает Combined Log, разбирает строки, считает метрики и формирует отчёт. Результат можно получить в JSON, Markdown или PDF; для работы с сервисом есть REST API.

## Что считается

В коде есть оконные агрегаты, частота запросов по IP и поиск отклонений с помощью Z-score и EWMA. Это способы выделить то, что стоит проверить внимательнее. Сами по себе они не объясняют причину отклонения: всплеск запросов может иметь несколько объяснений.

Чтение, разбор, анализ и подготовка отчёта разделены на части. Благодаря этому можно смотреть на конкретный этап, не разбирая каждый раз весь сервис.

## Что есть в репозитории

Исходники, тесты, документация и инфраструктурные файлы. Это учебный инженерный проект. Показатели промышленной нагрузки здесь не привожу: для них нужны отдельные воспроизводимые измерения.

## Ссылки

- [README](https://github.com/Therad445/nginx-log-analyzer/blob/main/README.md)
- [Исходный код](https://github.com/Therad445/nginx-log-analyzer/blob/main/src/main/java/io/github/therad445/loganalyzer/service/LogAnalysisService.java)
- [Исходный код](https://github.com/Therad445/nginx-log-analyzer/blob/main/src/main/java/io/github/therad445/loganalyzer/anomaly/AnomalyService.java)
