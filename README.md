# Solana Memecoin Screener

Screen trending, new and boosted Solana memecoins from the terminal. Filter by liquidity, market cap, volume, age, price change and buyers, sort by anything, and refresh on a loop.

![Node 22+](https://img.shields.io/badge/node-%E2%89%A522-5FA04E?logo=node.js&logoColor=white) ![Dependencies: 0](https://img.shields.io/badge/dependencies-0-2ea44f) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![Website](https://img.shields.io/badge/website-blixtrade.github.io-8b5cf6)](https://blixtrade.github.io/solana-memecoin-screener/)

> Free and open source, part of the [Blix Trade](https://github.com/blixtrade) toolkit. For the live version with AI ratings on every coin, wallet tracking and one-click trading at 0% fees, see **[BLIX, the Solana memecoin terminal](https://blixvip.com/solana-memecoin-screener?utm_source=github&utm_medium=readme&utm_campaign=solana-memecoin-screener)**.

## What it does

- Three sources: GeckoTerminal trending pools, GeckoTerminal new pools, and DexScreener boosted tokens.
- Filters for liquidity, market cap, 24h and 1h volume, age, 1h price change, unique buyers, DEX, pump.fun-only, and a name or ticker regex.
- Readable amounts and ages: `25k`, `1.5m`, `30m`, `6h`, `2d`.
- One row per token (its deepest pool), so the same coin never fills the list.
- `--watch 30` turns it into a live dashboard; `--json` for scripts.

## Quick start

You need [Node.js](https://nodejs.org) 22 or newer. There is nothing else to install: no dependencies, no API keys.

Run it straight from GitHub:

```bash
npx -y github:blixtrade/solana-memecoin-screener --min-liq 20k --max-mcap 5m --sort chg1h
```

Or clone it:

```bash
git clone https://github.com/blixtrade/solana-memecoin-screener.git
cd solana-memecoin-screener
node bin/screener.js --min-liq 20k --max-mcap 5m --sort chg1h
```

To get a `screener` command on your PATH, run `npm link` inside the folder.

## Example output

Real output from a run on 18 November 2026:

```text
Solana memecoin screener  ·  trending  ·  6 of 40 pools match  ·  17:35:54

Ticker        Age         Price       Mcap        Liq    Vol 24h        5m        1h        24h  Buys/Sells 1h  DEX        Mint
:3            32d    $0.0006101    $610.1K     $66.5K     $1.90M     -1.9%    +22.6%     +64.7%        190/215  pumpswap   FSkyjfqB26u6c2GSgpACrjbxp9yQAR8rutxprVNppump
WASTED        19d      $0.00117     $1.15M    $105.5K     $1.16M     -4.0%    +15.1%     -65.9%        320/361  pumpswap   GexThZHgaswpAQ7Fi8QrHFubjPimUNSYhJiAA7XZpump
Dacity        38d    $0.0002132    $209.3K     $79.6K    $799.2K     +3.6%     +9.0%     -72.1%        320/293  pumpswap   nxPqZ4F7ux8Vph5NFu25rEP6Kx9Gr1U6Fmj36Rjpump
SHIT          23h      $0.00255     $2.52M    $123.5K     $3.07M     +2.4%     +6.6%   +1969.6%      2152/2041  pumpswap   Fn95NtGXWPaJXc4N5y9rVkUq1NwZbjBNJzPVvNRLpump
CHAR           2d    $0.0001165    $116.5K     $27.3K    $313.3K     -1.5%     +5.8%     +81.9%          80/93  pumpswap   9k2nqjUrSh9p2ZBnWxNE3QRWYiLocrWZfoDm3Vdxpump
GATO          85d     $0.004106     $4.07M    $217.8K     $1.42M     -2.2%     +5.4%     -25.0%       1316/664  pumpswap   HsprHxBRgiVaQdRf3TnKNuZZtaX9JUSPgMFdAkk6pump
```

## Options

```text
solana-memecoin-screener: filter live Solana memecoins from the terminal

Usage:
  screener [options]

Source:
  --source <s>          trending (default), new, or boosted
  --pages <n>           Pages to scan, 20 pools each, 1 to 10 (default 2)

Filters (amounts take 25000, 25k, 1.5m; ages take 30m, 6h, 2d):
  --min-liq <usd>       Minimum liquidity          --max-liq <usd>
  --min-mcap <usd>      Minimum market cap         --max-mcap <usd>
  --min-vol <usd>       Minimum 24h volume         --min-vol-1h <usd>
  --min-age <age>       Older than                 --max-age <age>
  --min-change-1h <%>   1h price change at least this
  --min-buyers <n>      Unique buyers in the last hour at least this
  --dex <name>          Only one DEX: pumpswap, raydium, meteora, orca…
  --pump-only           Only pump.fun coins
  --search <regex>      Name or ticker matches

Output:
  --sort <key>          vol, vol1h, vol5m, liq, mcap, chg5m, chg1h, chg24h, buyers, age (default vol)
  --limit <n>           Rows to show (default 25)
  --watch <seconds>     Refresh on a loop (minimum 15)
  --json                Print rows as JSON
  --version             Print the installed version and exit
  --help                Show this help

Examples:
  screener --min-liq 20k --max-mcap 2m --sort chg1h
  screener --source new --max-age 30m --min-buyers 50 --pump-only
  screener --source boosted --min-vol 100k --watch 30
```

## How it works

- GeckoTerminal and DexScreener responses are normalised into one row shape, then filtered and sorted locally.
- Requests to GeckoTerminal are spaced out and rate limits are waited out automatically.

## Limits

- Results are as fresh as the free APIs, usually under a minute old.
- GeckoTerminal's free API allows about 30 requests a minute. Scanning many pages with `--watch` will slow down rather than fail.

## Development

```bash
npm test
```

Tests run offline against fixtures, so they never depend on a live API.

## Contributing

Pull requests are welcome, and first-timers are too. Pick an issue labelled [good first issue](https://github.com/blixtrade/solana-memecoin-screener/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) or [help wanted](https://github.com/blixtrade/solana-memecoin-screener/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22), comment that you are taking it, and read [CONTRIBUTING.md](CONTRIBUTING.md). No API keys needed: the tests run offline.

[![Contributors](https://contrib.rocks/image?repo=blixtrade/solana-memecoin-screener)](https://github.com/blixtrade/solana-memecoin-screener/graphs/contributors)

## More free Solana tools from Blix Trade

| Tool | What it does |
|---|---|
| [solana-bubble-map](https://github.com/blixtrade/solana-bubble-map) | Holder bubble map for any Solana or pump.fun token. |
| [pump-fun-tracker](https://github.com/blixtrade/pump-fun-tracker) | Every new pump.fun launch on Solana, live in your terminal, the moment it is created. |
| [solana-rug-checker](https://github.com/blixtrade/solana-rug-checker) | Rug pull scanner for Solana and pump.fun tokens. |
| [solana-wallet-tracker](https://github.com/blixtrade/solana-wallet-tracker) | Follow any Solana wallets and see every memecoin buy and sell they make: token, size in SOL and USD, and a Solscan link. |
| [solana-pnl-tracker](https://github.com/blixtrade/solana-pnl-tracker) | Profit and loss for any Solana wallet's memecoin trades, worked out from its on-chain transactions. |
| [solana-whale-tracker](https://github.com/blixtrade/solana-whale-tracker) | Big buys and sells on any Solana token: net whale flow, every large trade with a Solscan link, and leaderboards of the wallets buying and dumping the most. |
| [memecoin-paper-trading](https://github.com/blixtrade/memecoin-paper-trading) | Practise Solana memecoin trading with fake SOL at real prices. |
| [memecoin-alert-bot](https://github.com/blixtrade/memecoin-alert-bot) | pump.fun alerts in Telegram and Discord. |
| [pump-fun-mcp](https://github.com/blixtrade/pump-fun-mcp) | An MCP server that gives Claude, Cursor and other AI assistants six Solana memecoin research tools: token info, rug check, top holders, a screener, whale trades and wallet trades. |

Want all of this in one place, live, with AI on every coin? **[Open BLIX](https://blixvip.com/?utm_source=github&utm_medium=readme&utm_campaign=solana-memecoin-screener)**: the Solana memecoin terminal with 0% trading fees.

## Disclaimer

This is research software, not financial advice. Memecoins are extremely volatile and most go to zero. Never trade more than you can afford to lose. The data comes from free third-party APIs that can be wrong, late or unavailable.

## License

[MIT](LICENSE)
