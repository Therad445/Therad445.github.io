---
lang: "en"
slug: "text-to-mask-vision"
title: "Text-to-Mask"
summary: "Text-prompted segmentation: Grounding DINO → NMS → SAM, a user interface and five documented examples."
category: "Computer vision"
status: "Course prototype with results"
year: "2026"
order: 3
tags: ["Python","Grounding DINO","SAM","Streamlit"]
repo: "https://github.com/Therad445/text-to-mask-vision"
branch: "main"
date: "2026-11-10"
featured: true
selection: "primary"
noteTitle: "From a text prompt to an object mask"
---

An object in an image can be located by naming it. I built a prototype where a user uploads an image, enters a prompt and receives masks for the detected objects.

## How it works

Grounding DINO proposes bounding boxes from the text prompt. NMS removes some overlapping detections. The boxes are passed to SAM to produce masks. The pipeline also handles empty detection results.

My contribution is the integration of pretrained models, coordinate transfer, filtering and a Streamlit interface. Users can adjust prompts and thresholds, inspect masks and view the detection table.

## Saved examples

The repository contains five qualitative cases using three source images. The numbers below count output detections; they are not accuracy scores.

| Prompt | Before NMS | After NMS |
| --- | ---: | ---: |
| `bear .` | 8 | 5 |
| `bear cub .` | 5 | 4 |
| `bus . person .` | 5 | 5 |
| `person .` | 2 | 2 |
| `small animal .` | 5 | 5 |

The final prompt was applied to a scene with a bus and people. The prototype still returned detections, illustrating why a plausible-looking mask does not establish a semantic match to the prompt.

## Limits of the evidence

The models are used without training my own versions. There is no manual ground truth for IoU or mAP evaluation. SAM confidence is not measured accuracy. Prompts and settings both vary across cases, so these are behavioural examples rather than a controlled single-factor experiment.

## Code and results

- [Pipeline](https://github.com/Therad445/text-to-mask-vision/blob/1bd96f26e4af1b40db3beab80998281264f91391/src/text_to_mask_pipeline.py)
- [Streamlit](https://github.com/Therad445/text-to-mask-vision/blob/1bd96f26e4af1b40db3beab80998281264f91391/app.py)
- [Source CSV](https://github.com/Therad445/text-to-mask-vision/blob/1bd96f26e4af1b40db3beab80998281264f91391/report/experiments/03_gallery_results.csv)
- [Results gallery](https://github.com/Therad445/text-to-mask-vision/tree/1bd96f26e4af1b40db3beab80998281264f91391/report/figures/gallery)
