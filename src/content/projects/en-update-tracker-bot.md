---
lang: "en"
slug: "update-tracker-bot"
title: "Update Tracker"
summary: "Two Java services for tracking links, with subscriptions, SQL/JPA repositories and PostgreSQL integration tests."
category: "Backend"
status: "Course application"
year: "2026"
order: 1
tags: ["Java","Spring Boot","PostgreSQL","Liquibase","Testcontainers"]
repo: "https://github.com/Therad445/update-tracker-bot"
branch: "master"
date: "2026-11-10"
featured: true
selection: "primary"
noteTitle: "Inside an update-tracking bot"
---

Update Tracker saves GitHub and Stack Overflow links, checks for changes and sends Telegram notifications, so users do not have to revisit the same discussions manually.

## What I implemented

I split the application into two Spring services. **Bot** handles commands and user subscriptions. **Scrapper** stores links, periodically checks them and passes updates to the bot over HTTP.

PostgreSQL holds subscriptions, tags and filters. Liquibase manages schema changes. Two implementations share a repository interface: SQL and Spring Data JPA, allowing both approaches to be compared within the same application.

## What to look at

- Separation of user commands and background polling.
- A repository interface with two data-access implementations.
- Batch processing in the scheduler.
- Repository integration tests using a real PostgreSQL instance in Testcontainers.

The public repository contains the implementation, test scenarios and launch configuration. Using PostgreSQL in tests helps check queries and migrations against the actual database engine.

## Status and limitations

This is a course application. A complete run requires external API tokens, built JARs and service connection settings; the deployment instructions need refinement. Concurrent polling still needs to remove shared mutable state from its checkers. Production use and throughput are not claimed.

## Code

- [SQL repository](https://github.com/Therad445/update-tracker-bot/blob/a358a2bee37d4fbec2f54d07200522871aeb0c1d/scrapper/src/main/java/backend/academy/scrapper/repository/sql/SqlLinkRepository.java)
- [PostgreSQL and Liquibase tests](https://github.com/Therad445/update-tracker-bot/blob/a358a2bee37d4fbec2f54d07200522871aeb0c1d/scrapper/src/test/java/backend/academy/scrapper/repository/sql/SqlLinkRepositoryTest.java)
- [Scheduler](https://github.com/Therad445/update-tracker-bot/blob/a358a2bee37d4fbec2f54d07200522871aeb0c1d/scrapper/src/main/java/backend/academy/scrapper/scheduler/LinkScraperScheduler.java)
