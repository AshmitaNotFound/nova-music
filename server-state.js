
"use strict";

const VALID_REPEAT_MODES = new Set(["off", "all", "one"]);

function normalizePlayerState(data) {
  if (!data) return null;

  const albumIndex = Number(data.albumIndex);
  const songIndex = Number(data.songIndex);
  const currentTime = Number(data.currentTime);

  if (!Number.isInteger(albumIndex) || albumIndex < 0) return null;
  if (!Number.isInteger(songIndex) || songIndex < 0) return null;
  if (!Number.isFinite(currentTime) || currentTime < 0) return null;

  return {
    albumIndex,
    songIndex,
    currentTime,
    isPlaying: Boolean(data.isPlaying),
    shuffle: Boolean(data.shuffle),
    repeatMode: VALID_REPEAT_MODES.has(data.repeatMode)
      ? data.repeatMode
      : "off"
  };
}

module.exports = { normalizePlayerState };
