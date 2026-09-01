#!/usr/bin/env node

/**
 * 🪐 PLANET IN PIXEL - 1-STEP TRANSCRIBE & CAPTION CLI
 * Transcribes a video file and formats word timestamps into Remotion captions.
 *
 * Usage:
 *   node scripts/transcribe_and_caption.js input_video.mp4
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const videoFile = process.argv[2];

if (!videoFile) {
  console.log(`
🪐 Planet in Pixel Captions - Video Transcription CLI
-----------------------------------------------------
Usage:
  node scripts/transcribe_and_caption.js <video_file.mp4>

Example:
  node scripts/transcribe_and_caption.js interview.mp4
`);
  process.exit(1);
}

const resolvedVideoPath = path.resolve(videoFile);
if (!fs.existsSync(resolvedVideoPath)) {
  console.error(`❌ Error: File not found at ${resolvedVideoPath}`);
  process.exit(1);
}

const baseName = path.basename(videoFile, path.extname(videoFile));
const outputDir = path.resolve("./transcriptions");
const jsonOutputFile = path.join(outputDir, `${baseName}.json`);
const targetCaptionFile = path.resolve("./src/pip-captions/captionData.json");

console.log(`\n🎙️ Step 1: Transcribing "${path.basename(videoFile)}" with word-level timestamps...`);

try {
  fs.mkdirSync(outputDir, { recursive: true });

  // Run OpenAI Whisper
  execSync(
    `whisper "${resolvedVideoPath}" --model base --word_timestamps True --output_format json --output_dir "${outputDir}"`,
    { stdio: "inherit" }
  );

  console.log(`\n🔄 Step 2: Converting Whisper timestamps to Planet in Pixel caption lines...`);

  const converterScript = path.join(__dirname, "convert_whisper_json.js");
  execSync(
    `node "${converterScript}" --input "${jsonOutputFile}" --output "${targetCaptionFile}" --maxWords 5`,
    { stdio: "inherit" }
  );

  console.log(`\n✅ SUCCESS!`);
  console.log(`📁 Captions saved to: ${targetCaptionFile}`);
  console.log(`\n🚀 NEXT STEPS:`);
  console.log(`  1. Preview in Studio:  npx remotion studio --port=8081`);
  console.log(`  2. Render final MP4:   npx remotion render CaptionedVideo out.mp4 --props='{"styleId": 1}'`);
  console.log(`\n🪐 Enjoy editing with Planet in Pixel!\n`);
} catch (error) {
  console.error(`\n❌ Error during transcription:`, error.message);
  console.log(`\n💡 Note: Make sure OpenAI Whisper is installed: pip install openai-whisper\n`);
  process.exit(1);
}
