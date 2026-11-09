---
lang: "ru"
slug: "nstep-sac-reproducibility"
title: "n-step Soft Actor-Critic"
summary: "Сравнение n = 1, 3 и 5 в учебном эксперименте по обучению с подкреплением."
category: "Reinforcement learning"
status: "Завершённый учебный эксперимент"
year: "2025–2026"
order: 3
tags: ["Python", "PyTorch", "Gymnasium", "MuJoCo"]
repo: "https://github.com/Therad445/nstep-sac-reproducibility"
date: "2026-11-09"
featured: false
noteTitle: "Что меняет n-step в SAC"
---

В учебном проекте по обучению с подкреплением я сравнивал SAC с разными горизонтами возврата: n = 1, 3 и 5. Код использует PyTorch, Gymnasium и MuJoCo; эксперименты есть для Pendulum-v1 и HalfCheetah-v5.

## Один сохранённый запуск

Для HalfCheetah-v5 в итоговом CSV записаны такие значения final evaluation return. Seed во всех трёх конфигурациях — 0.

| n | Return |
| --- | ---: |
| 1 | 4354.49 |
| 3 | 4578.91 |
| 5 | 764.49 |

В этом запуске вариант с тремя шагами оказался немного выше одношагового, а с пятью — заметно ниже. Но по одному seed нельзя уверенно заключить, что 3-step SAC лучше вообще. Для этого нужны дополнительные запуски и оценка разброса.

## Что можно посмотреть

В репозитории лежат реализация SAC с n-step replay, конфигурации, логи и отчёт. Числа выше взяты из сохранённого CSV; независимого повторения эксперимента здесь не заявляю.

Это завершённая учебная работа, а не рецензируемая научная публикация. Её полезно читать вместе с кодом и ограничениями протокола.

## Ссылки

- [README](https://github.com/Therad445/nstep-sac-reproducibility/blob/main/README.md)
- [CSV с результатами](https://github.com/Therad445/nstep-sac-reproducibility/blob/main/results/halfcheetah_summary.csv)
- [Исходный код](https://github.com/Therad445/nstep-sac-reproducibility/blob/main/src/rl/sac.py)
- [Отчёт](https://github.com/Therad445/nstep-sac-reproducibility/blob/main/paper/final_report_en.pdf)
