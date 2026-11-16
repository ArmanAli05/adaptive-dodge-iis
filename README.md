# Adaptive Dodge — Dynamic Difficulty Adjustment

**README prose word count:** 864 (excludes code blocks and setup commands).

**Status — 16 November 2026:** Implemented browser-game prototype with player movement, falling obstacles, collision tracking, score, start/pause/restart, a deterministic dynamic difficulty controller, manual mode, player feedback, and labelled synthetic-input demonstration controls. The controller includes eleven automated tests. **The student play-tested the initial and revised games: the first version felt too easy and speed alone was insufficient; after increasing obstacle density and speed, level 5 felt challenging but level 4 still felt too easy. Level 4 has been adjusted again and awaits re-testing.** Do not interpret this prototype as proof that DDA improves enjoyment.

## What works

The player uses A/D or the arrow keys to dodge obstacles. Difficulty begins at level 2. Every 10 seconds of **active play**, the controller checks collisions. Two or more collisions reduce difficulty by one. Two consecutive zero-collision windows increase difficulty by one. Otherwise the level stays the same. Levels are bounded 1–5. Higher levels increase obstacle speed, spawn frequency and the number of obstacles per wave (1, 2, 3, 4, 4). Each wave occupies distinct positions among nine lanes, leaving at least five unblocked lanes. The interface explains the active parameters. Switching off DDA stops automatic changes and enables a fixed difficulty selector. Every decision is explained in the interface.

## Technology and AI

- **HTML/CSS:** accessible page structure, status display, settings and feedback.
- **JavaScript Canvas:** player, obstacles, scoring, collision detection and rendering.
- **JavaScript `difficulty.js`:** auditable, rule-based performance adaptation; **no machine learning model or LLM** is used at runtime.
- **Node.js:** built-in test runner; no external packages or API keys.
- **AI assistance:** ChatGPT generated the first code, test cases, architecture drawing and documentation from the student's literature review and assignment brief. The student must independently inspect and test this output, record corrections and state what was verified or changed before submission. Generated examples are not empirical evidence about real users.

## Run locally

Requires a recent desktop browser and a simple static server. In the repository directory run:

```bash
py -m http.server 8000
```

Or `python -m http.server 8000` on systems where `py` is unavailable. Visit `http://localhost:8000`, press **Start game**, and move with A/D or left/right arrows. Press **Space** to pause when a button is not focused. Do not open `index.html` through `file://`: JavaScript module loading may be blocked.

## Automated tests

Requires Node.js. Run:

```bash
npm test
```

Eleven controller tests cover difficulty increases and decreases, neutral windows, reset of consecutive success, fixed mode, level boundaries, parameter progression, wave density, distinct lanes and invalid input. Automated tests do **not** substitute for running the game in a browser.

## Architecture and interaction examples

- [Architecture diagram](assets/architecture.svg) — labels implemented components and **simulated input**.
- [Three interaction walkthroughs](assets/interaction-scenarios.svg) — illustrative, not recordings of real players.
- The buttons labelled **Simulate 2 collisions** and **Simulate 2 clean windows** inject artificial windows into the controller. Messages explicitly mark these inputs as simulated. No synthetic event is presented as a real player observation.

## Development record

| Date/stage | Change and rationale | Evidence |
|---|---|---|
| 16 Nov — Foundation | Added playable Canvas loop, controls, obstacles and collision tracking. This provides observable activity from which a difficulty decision can be made. | Initial source commits |
| 16 Nov — Adaptive logic | Separated `difficulty.js` from rendering, implemented 10-second thresholds and levels 1–5. Transparent rules make adaptation explainable and testable. | `difficulty.js`, eleven tests |
| 16 Nov — Agency | Added DDA toggle, manual difficulty and status/decision feedback. Responds to literature concerns about user control and predictability. | `index.html`, `game.js` |
| 16 Nov — Demonstration | Added labelled simulation controls and schematic interaction scenarios to demonstrate states without claiming real user evidence. | `assets/`, demo buttons |
| 16 Nov — Initial play-test and revision | The student reported that the initial game felt too easy and that increasing speed alone did not create a meaningful difficulty step. Revised obstacle speed, wave frequency and obstacles per wave at each level. Nine-lane selection prevents a single wave forming a full-width wall. Automated tests cover density and distinct lanes; effectiveness is not yet established. | `difficulty.js`, `game.js`, `tests/difficulty.test.js` |
| 16 Nov — Second play-test and level-4 refinement | Student retested the revised game and found level 5 challenging but level 4 still insufficiently difficult. Increased level-4 obstacles per wave from three to four, keeping speed (335 px/s), wave interval (0.77s) and level 5 unchanged. This isolates density as the changed variable; outcome awaits re-test. | `difficulty.js`, updated density test |
| **To complete — student re-test** | Test revised level 4 against levels 3 and 5; check perceived challenge, fairness and whether adaptation remains understandable. Record results and final submitted SHA. | **[ADD observations and commit]** |

## Limitations and future possibilities

No user study or self-reported enjoyment data, long-term player model, persistent profile, multiplayer or mobile touch controls. The numerical thresholds and revised obstacle profiles are design hypotheses, not experimentally validated optimal settings. A comparative user study of fixed vs automatic difficulty and reported agency is **planned only**, not implemented.

## Submission identifiers

- Repository: https://github.com/ArmanAli05/adaptive-dodge-iis
- README: https://github.com/ArmanAli05/adaptive-dodge-iis/blob/main/README.md
- Published game: **[Add GitHub Pages URL after verifying deployment]**
- Submitted revision/commit SHA: **[Add final full SHA before submission]**
- Report: submitted separately; link it here if included in the repository.
