#!/usr/bin/env node

/**
 * CLI utility to convert OpenAI Whisper / WhisperX / Deepgram word-timestamp JSON
 * into the structured CaptionLine[] format required by Remotion CaptionRenderer.
 *
 * Usage:
 *   node convert_whisper_json.js --input whisper.json --output src/captions/captionData.json --maxWords 5
 */

const fs = require("fs");
const path = require("path");

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    input: null,
    output: null,
    maxWordsPerLine: 5,
    maxGapMs: 650, // Create a new line if silence between words is > 650ms
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--input" || args[i] === "-i") {
      options.input = args[++i];
    } else if (args[i] === "--output" || args[i] === "-o") {
      options.output = args[++i];
    } else if (args[i] === "--maxWords" || args[i] === "-w") {
      options.maxWordsPerLine = parseInt(args[++i], 10);
    } else if (args[i] === "--maxGap" || args[i] === "-g") {
      options.maxGapMs = parseInt(args[++i], 10);
    }
  }

  return options;
}

function normalizeRawWords(data) {
  // Support OpenAI Whisper verbose_json format: { words: [...] } or { segments: [ { words: [...] } ] }
  if (Array.isArray(data)) {
    return data;
  }
  if (Array.isArray(data.words)) {
    return data.words;
  }
  if (Array.isArray(data.segments)) {
    const words = [];
    for (const seg of data.segments) {
      if (Array.isArray(seg.words)) {
        words.push(...seg.words);
      } else if (seg.text) {
        // Fallback segment timing
        words.push({
          word: seg.text,
          start: seg.start,
          end: seg.end,
        });
      }
    }
    return words;
  }
  // Deepgram format
  if (data.results?.channels?.[0]?.alternatives?.[0]?.words) {
    return data.results.channels[0].alternatives[0].words.map((w) => ({
      word: w.punctuated_word || w.word,
      start: w.start,
      end: w.end,
    }));
  }
  throw new Error("Unrecognized transcription JSON structure.");
}

function convertToCaptionLines(rawWords, maxWordsPerLine = 5, maxGapMs = 650) {
  const lines = [];
  let currentTokens = [];
  let lineIndex = 1;

  for (let i = 0; i < rawWords.length; i++) {
    const item = rawWords[i];
    const text = (item.word || item.text || "").trim();
    if (!text) continue;

    const fromMs = Math.round((item.start || item.from || 0) * 1000);
    const toMs = Math.round((item.end || item.to || 0) * 1000);

    const token = {
      text,
      fromMs,
      toMs,
    };

    const prevToken = currentTokens[currentTokens.length - 1];
    const isPunctuationBreak = /[.!?]$/.test(prevToken ? prevToken.text : "");
    const isSilenceGap = prevToken ? fromMs - prevToken.toMs > maxGapMs : false;
    const isLineFull = currentTokens.length >= maxWordsPerLine;

    if (currentTokens.length > 0 && (isPunctuationBreak || isSilenceGap || isLineFull)) {
      lines.push({
        id: `line-${lineIndex++}`,
        startMs: currentTokens[0].fromMs,
        endMs: currentTokens[currentTokens.length - 1].toMs + 200,
        tokens: [...currentTokens],
        fullText: currentTokens.map((t) => t.text).join(" "),
      });
      currentTokens = [];
    }

    currentTokens.push(token);
  }

  if (currentTokens.length > 0) {
    lines.push({
      id: `line-${lineIndex++}`,
      startMs: currentTokens[0].fromMs,
      endMs: currentTokens[currentTokens.length - 1].toMs + 200,
      tokens: [...currentTokens],
      fullText: currentTokens.map((t) => t.text).join(" "),
    });
  }

  return lines;
}

function main() {
  const opts = parseArgs();

  if (!opts.input) {
    console.error("Usage: node convert_whisper_json.js --input <file.json> [--output <out.json>]");
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(path.resolve(opts.input), "utf-8"));
  const rawWords = normalizeRawWords(raw);
  const captionLines = convertToCaptionLines(rawWords, opts.maxWordsPerLine, opts.maxGapMs);

  const jsonOutput = JSON.stringify(captionLines, null, 2);

  if (opts.output) {
    const outPath = path.resolve(opts.output);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, jsonOutput, "utf-8");
    console.log(`✅ Successfully generated ${captionLines.length} caption lines -> ${opts.output}`);
  } else {
    console.log(jsonOutput);
  }
}

main();
