# Portfolio selection — 10 November 2026

This is an editorial selection for a software engineering / SRE / MLOps portfolio, not a ranking by stars, repository size or README claims.

The connected GitHub inventory contained 83 public repositories. The shortlist review inspected README files, repository trees, representative implementations, tests and saved results in 27 public repositories. Course archives, profile/site repositories, basic exercises and scaffolds were screened out at inventory level. Private repository contents were not used.

## Main selection

| Project | Why it belongs | Evidence and validation scope |
| --- | --- | --- |
| Nginx Log Analyzer | The most developed Java project tied to the owner's thesis and publications; separable parsing, analysis and reporting | Source and tests inspected. An actual CLI report from the earlier site revision remains available with its reproduction protocol. |
| Update Tracker | Two-service backend design, PostgreSQL, interchangeable SQL/JPA repositories and database integration tests | Source and Testcontainers tests inspected, not executed in this review. Shared mutable checker state and deployment documentation remain limitations. |
| MLflow / FastAPI Service | Directly relevant to MLOps: model lifecycle, input validation, failure handling, metrics and drift | API, model state, drift component and eight tests inspected. External MLflow/Evidently deployment and test suite not rerun. Dashboard/alert claims in the report are not treated as versioned configurations. |
| Text-to-Mask | A model integration taken through to a UI and documented examples | Grounding DINO → NMS → SAM code, Streamlit and five CSV cases inspected. Qualitative evaluation; confidence is not IoU/mAP. No new GPU run. |
| PageRank | A focused systems problem with explicit memory and concurrency decisions | Unmodified C++ compiled with g++ 14.2.0; four-node example matched the independent Python result at 20 iterations. No large-graph benchmark. |
| n-step SAC | Clear experimental question with modules, configuration, raw logs and report | Saved CSV results checked. One training seed per configuration; termination/truncation handling limits interpretation. No new training. |

The home page highlights Nginx, Update Tracker, MLflow/FastAPI and Text-to-Mask. PageRank and n-step SAC remain in the main Projects selection. The job-oriented PDF uses Nginx, Update Tracker and MLflow/FastAPI.

## Additional material

SRE Observability Stack and CUDA kNN keep their existing URLs and demonstrations under a compact additional-projects section. They are useful focused exercises, but have less depth or weaker saved performance evidence than the main selection.

MiniGrid world model is a substantive further research example, but adding a second RL project would duplicate the role of n-step SAC. Its negative result is not presented as a VLM improvement. RAG Knowledge Base is a team project whose personal contribution needs a clearer account before featuring it. RentSense has a useful skeleton, but its inference data path and missing result artifacts need work. RAG Release Regression Benchmark is a scaffold. Fractal generation lacks a reproducible performance comparison. These are selection decisions, not claims that the projects have no value.

## Source snapshots

- [Nginx](https://github.com/Therad445/nginx-log-analyzer/tree/d32a266722f59c1d75812bb505890fb6eb617aba)
- [Update Tracker](https://github.com/Therad445/update-tracker-bot/tree/a358a2bee37d4fbec2f54d07200522871aeb0c1d)
- [ML service](https://github.com/Therad445/testing_and_monitoring/tree/d8187937779cbc15d863971f2a636813cc55aed2)
- [Text-to-Mask](https://github.com/Therad445/text-to-mask-vision/tree/1bd96f26e4af1b40db3beab80998281264f91391)
- [PageRank](https://github.com/Therad445/graph_analytics_pagerank/tree/09df690199015931392c1e23f9bc9ba9c49647c7)
- [n-step SAC](https://github.com/Therad445/nstep-sac-reproducibility/tree/19f8e23642844700a2508782d13f769d11851a4e)

Implementation details were checked against code rather than inferred from technology lists. Tests present in a repository are distinguished from tests actually run. Website build/link/schema checks are separate from project execution checks.
