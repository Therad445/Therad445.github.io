---
lang: "en"
slug: "historical-ocr"
title: "Evaluating OCR for historical texts"
summary: "Old Tatar epigraphy, transcription quality and OCR/VLM evaluation: the question, current work and limitations."
date: "2026-11-10"
status: "Reference preparation and protocol design"
updated: "2026-11-10"
---

## The question

How reliably can OCR and vision-language models recognise historical Old Tatar inscriptions in Arabic script? How do conclusions change with the reference transcription, normalisation rules or test composition?

A plausible answer is not enough for an old text. Damaged stone, historical spelling and competing readings make verification a research problem of its own. A model may confidently complete a word whose letters are no longer visible.

## My contribution

I work on data preparation and auditing, experiment organisation and error analysis. The current focus is Old Tatar epigraphy: matching photographs of gravestone inscriptions to published readings. I treat additional Arabic and Ottoman corpora separately when considering transfer between sources.

The recognition target is a transcription in the original Arabic script. Cyrillic transliteration and translation are useful to a reader, but they are different tasks and must not silently replace transcription in the evaluation.

## Work completed so far

- A course project explored ByT5 for correcting synthetic errors; transfer to real OCR errors was unstable.
- Working collections of historical texts were assembled, and external corpora underwent an initial technical review.
- Reference auditing became a separate task: checking provenance, image–text alignment, revisions and previous use of each example.
- A new evaluation plan separates historical experiments from a future independent test.

These are different stages of work. Having files and annotations does not mean a validated final benchmark is ready.

## Evaluation approach

1. Establish the source, language, visible region and origin of the reading for each fragment.
2. Mark damage, uncertain letters and editorial restorations separately. Do not expect OCR to guess invisible text.
3. Split by monument and document so related fragments cannot occur in both development and test data.
4. Freeze model versions and normalisation rules. Report CER/WER alongside error analysis and test coverage.
5. Separate comparisons of ready-made models from experiments on the benefit of additional training.

## Next step and limitations

Complete the review of an initial set of image–reading pairs and freeze the protocol before new final runs. I do not treat LLM outputs as independent ground truth. Findings on inscriptions will not automatically apply to books or periodicals.

There is no public paper or final results release yet. The illustration below shows historical script, but is not a test example. A transcription and error walkthrough will follow only after the reading and image publication rights have been checked.
