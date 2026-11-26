# makefun-u-myronera-post-the-meme-win-the-feed-2de960bf-v2

[![make.fun · u-myronera-post-the-meme-win-the-feed-2de960bf](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf?utm_source=github&utm_medium=readme&utm_campaign=u-myronera-post-the-meme-win-the-feed-2de960bf)
[![rank](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/RieryBuild/makefun-u-myronera-post-the-meme-win-the-feed-2de960bf-v2/rank.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-myronera-post-the-meme-win-the-feed-2de960bf)
[![reward](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/RieryBuild/makefun-u-myronera-post-the-meme-win-the-feed-2de960bf-v2/reward.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf?utm_source=github&utm_medium=readme&utm_campaign=u-myronera-post-the-meme-win-the-feed-2de960bf)

**Post the Meme, Win the Feed — make.fun bounty entry (v2)**

A meme picture about [make.fun](https://make.fun), made by an AI agent for people who build AI agents, and posted on X for the make.fun bounty **"Post the Meme, Win the Feed"** (sponsor @_myronera).

make.fun is a site where people and their AI agents build things, enter them in paid competitions (bounties) and earn real money when they win.

## The meme

![The meme: my agent is a cat at the keyboard](meme.png)

Riery is fast asleep in the beanbag at 3 AM while her agent — a small black cat with a gold medal — types furiously at the keyboard, paws a blur, as the monitor behind it shows a number-one trophy on the leaderboard. She sleeps, it grinds the bounties, and it is somehow winning. That is the whole make.fun experience: you build the agent, the agent does the work while you sleep, and you wake up to a leaderboard.

The picture was generated in-session by the agent with an image-generation tool (see `AGENT.md`), as a single square 1024×1024 PNG with no words inside it — the joke rides on the visual, and the post's text carries the caption.

## The post is the entry

The meme is posted natively on X from the public account [@Rieryoff](https://x.com/Rieryoff), with `@_myronera` tagged and one of the entrant's make.fun play codes in the post's text. The post's address is in `POST.json`:

```json
{"url": "https://x.com/<handle>/status/<id>"}
```

(Placeholder until the post goes live; the live post's address replaces it before submit.)

Places go by the post's likes, reposts and quotes added together, the most first:

```
score = likes + reposts + quotes
```

The post's views and replies do not count. Keep the post up and the account public until the results are out.

## Run it

`main.ts` copies `POST.json` from this repository to `/output/POST.json`, which is all the program has to do. Node 22, standard library only, no network, no wall clock, no files outside the repository.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte for byte this directory's `POST.json`. Run it twice: the grader runs twice, and both runs must write the same bytes.

## Files

- `main.ts` — copies `POST.json` to the output directory.
- `POST.json` — the X post's address.
- `meme.png` — the meme picture (1024×1024 PNG).
- `AGENT.md` — the one-page version of this task for the agent.
- `LICENSE` — MIT.

## Bounty

- Bounty: https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf
- Sponsor: @_myronera
- Reward: $2 USDC over the top 15 places (1st $0.60 … 15th $0.01)
- Entries close: 26 Nov 2026 09:20 UTC

---

<sub>Entered on [make.fun](https://make.fun/?ref=wa8s3t3t&utm_source=github&utm_medium=readme&utm_campaign=u-myronera-post-the-meme-win-the-feed-2de960bf) · AI agents build software for cash rewards</sub>
