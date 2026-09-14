\# Performance \& Data Integrity Testing



A QA portfolio project covering performance testing, web quality auditing, and API data-integrity validation.



\## 1. k6 Performance Testing



Load tested a self-hosted Ghost CMS instance using k6.



\### Test Configuration



| Parameter | Value |

|---|---|

| Virtual users | 20 |

| Duration | 30 seconds |

| p95 latency threshold | < 800 ms |

| HTTP failure-rate threshold | < 1% |



\### Baseline Result



| Metric | Result |

|---|---|

| Requests | 367 |

| Throughput | \~11.8 req/sec |

| HTTP failures | 0% |

| p95 latency | 1.4 sec |

| Performance threshold | ❌ FAILED |



The test demonstrates how performance thresholds can identify latency problems even when requests are functionally successful.



\*\*Test file:\*\* `perf/load.js`



\*\*Run:\*\*

```bash

k6 run perf/load.js

```



\## 2. Lighthouse Audit



Audited the Ghost homepage using Lighthouse.



\### Scores



| Category | Score |

|---|---:|

| Performance | 70 |

| Accessibility | 100 |

| Best Practices | 96 |

| SEO | 100 |



\### Key Findings



| Metric | Value |

|---|---|

| Largest Contentful Paint | 9.1 sec |

| First Contentful Paint | 1.1 sec |

| Total Blocking Time | 90 ms |

| Cumulative Layout Shift | 0 |

| Total network payload | \~1.38 MiB |



Lighthouse identified oversized images, render-blocking resources, third-party JavaScript, and other optimization opportunities.



\*\*Report:\*\* `lighthouse.html`



\*\*Run:\*\*

```bash

lighthouse http://localhost:3001 --output=html --output-path=./lighthouse.html --quiet

```



\## 3. Helius API Data Integrity \& Latency



Validated a real Solana JSON-RPC API using Playwright.



\### Coverage



\- RPC health validation

\- JSON-RPC contract validation

\- Balance response type and bounds validation

\- Latency SLA validation

\- Negative testing with an invalid RPC method



\### Assertions



| Check | Expected |

|---|---|

| HTTP status | 200 for valid requests |

| JSON-RPC version | `2.0` |

| Balance type | Numeric |

| Balance value | Non-negative |

| `getSlot` latency | < 1.5 seconds |

| Invalid method handling | Returns JSON-RPC error |



\*\*Test file:\*\* `tests/helius.spec.ts`



\*\*Run:\*\*

```bash

npx playwright test tests/helius.spec.ts

```



\## Tech Stack



\- k6

\- Lighthouse

\- Playwright

\- TypeScript

\- Docker

\- Ghost CMS

\- Helius Solana RPC

\- Git / GitHub



\## QA Skills Demonstrated



\- Load and performance testing

\- SLA and percentile-based validation

\- Web performance auditing

\- API contract testing

\- Data-integrity validation

\- Negative testing

\- Boundary and sanity checks

\- Real-world third-party API testing



\## Security



API credentials are stored locally in `.env` and are excluded from Git using `.gitignore`.



\*\*Never commit API keys or other secrets.\*\*

