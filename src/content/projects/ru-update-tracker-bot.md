---
lang: "ru"
slug: "update-tracker-bot"
title: "Update Tracker"
summary: "Два Java-сервиса для отслеживания ссылок: подписки, SQL/JPA и интеграционные тесты с PostgreSQL."
category: "Backend"
status: "Учебное приложение"
year: "2026"
order: 1
tags: ["Java","Spring Boot","PostgreSQL","Liquibase","Testcontainers"]
repo: "https://github.com/Therad445/update-tracker-bot"
branch: "master"
date: "2026-11-10"
featured: true
selection: "primary"
noteTitle: "Как устроен бот отслеживания обновлений"
---

Не хочется каждый день открывать одни и те же обсуждения, чтобы узнать, изменилось ли что-нибудь. Update Tracker хранит ссылки на GitHub и Stack Overflow, проверяет обновления и отправляет уведомления в Telegram.

## Что я реализовал

Разделил приложение на два Spring-сервиса. **Bot** принимает команды и управляет подписками пользователя. **Scrapper** хранит ссылки, периодически проверяет их и передаёт найденные обновления боту. Между сервисами — HTTP API.

В PostgreSQL хранятся подписки, теги и фильтры. Схема БД развивается через миграции Liquibase. Для работы с данными есть две реализации общего интерфейса: SQL и Spring Data JPA. Это позволяет сравнить подходы на одной прикладной задаче.

## Что здесь полезно посмотреть

- Разделение обработки пользовательских команд и фонового опроса.
- Репозиторный интерфейс и две реализации доступа к данным.
- Пакетную обработку ссылок планировщиком.
- Интеграционные тесты репозиториев с настоящим PostgreSQL в Testcontainers.

Результат — открытая реализация с тестовыми сценариями и конфигурацией запуска. PostgreSQL в тестах помогает проверить запросы и миграции на реальной СУБД.

## Статус и ограничения

Это учебное приложение. Для полного запуска нужны токены внешних API, собранные JAR и настройки связи между сервисами. Инструкция развёртывания требует уточнения. В конкурентном опросе остаётся задача убрать изменяемое общее состояние из checkers. Промышленную эксплуатацию и показатели нагрузки здесь не заявляю.

## Код

- [SQL-репозиторий](https://github.com/Therad445/update-tracker-bot/blob/a358a2bee37d4fbec2f54d07200522871aeb0c1d/scrapper/src/main/java/backend/academy/scrapper/repository/sql/SqlLinkRepository.java)
- [Тесты с PostgreSQL и Liquibase](https://github.com/Therad445/update-tracker-bot/blob/a358a2bee37d4fbec2f54d07200522871aeb0c1d/scrapper/src/test/java/backend/academy/scrapper/repository/sql/SqlLinkRepositoryTest.java)
- [Планировщик](https://github.com/Therad445/update-tracker-bot/blob/a358a2bee37d4fbec2f54d07200522871aeb0c1d/scrapper/src/main/java/backend/academy/scrapper/scheduler/LinkScraperScheduler.java)
