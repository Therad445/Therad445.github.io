---
lang: "en"
slug: "nstep-sac-reproducibility"
title: "n-step Soft Actor-Critic"
summary: "Comparing n = 1, 3 and 5 in a reinforcement-learning course experiment."
category: "Reinforcement learning"
status: "Completed course experiment"
year: "2025–2026"
order: 5
tags: ["Python", "PyTorch", "Gymnasium", "MuJoCo"]
repo: "https://github.com/Therad445/nstep-sac-reproducibility"
date: "2026-11-09"
featured: false
noteTitle: "What n-step changes in SAC"
---

For a reinforcement-learning course project, I compared SAC with different return horizons: n = 1, 3 and 5. The code uses PyTorch, Gymnasium and MuJoCo, with experiments for Pendulum-v1 and HalfCheetah-v5.

## One recorded run

For HalfCheetah-v5, the result CSV contains the following final evaluation returns. All three configurations use seed 0.

| n | Return |
| --- | ---: |
| 1 | 4354.49 |
| 3 | 4578.91 |
| 5 | 764.49 |

In this run, the three-step version finished slightly above the one-step version, while the five-step version finished much lower. One seed is not enough to conclude that 3-step SAC is generally better. That would need further runs and an estimate of variability.

## What is available

The repository contains SAC with n-step replay, configurations, logs and a report. The figures above come from the recorded CSV; I do not claim independent reproduction here.

This is a completed course project, not a peer-reviewed paper. It is best read alongside the code and the limits of the experimental protocol.

## Links

- [README](https://github.com/Therad445/nstep-sac-reproducibility/blob/main/README.md)
- [Result CSV](https://github.com/Therad445/nstep-sac-reproducibility/blob/main/results/halfcheetah_summary.csv)
- [Source code](https://github.com/Therad445/nstep-sac-reproducibility/blob/main/src/rl/sac.py)
- [Report](https://github.com/Therad445/nstep-sac-reproducibility/blob/main/paper/final_report_en.pdf)
