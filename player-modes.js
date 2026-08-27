(function (root, factory) {
  const api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  if (root) {
    root.NovaPlayerModes = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const REPEAT_MODES = ["off", "all", "one"];

  function normalizeRepeatMode(mode) {
    return REPEAT_MODES.includes(mode) ? mode : "off";
  }

  function cycleRepeatMode(mode) {
    const normalized = normalizeRepeatMode(mode);
    const index = REPEAT_MODES.indexOf(normalized);
    return REPEAT_MODES[(index + 1) % REPEAT_MODES.length];
  }

  function getNextTrackIndex({
    currentIndex,
    trackCount,
    shuffle = false,
    repeatMode = "off",
    fromEnded = false,
    random = Math.random
  }) {
    const count = Number(trackCount);
    const current = Number(currentIndex);
    const repeat = normalizeRepeatMode(repeatMode);

    if (!Number.isInteger(count) || count <= 0) {
      return null;
    }

    if (!Number.isInteger(current) || current < 0 || current >= count) {
      return 0;
    }

    if (fromEnded && repeat === "one") {
      return current;
    }

    if (shuffle) {
      if (count === 1) {
        return fromEnded && repeat === "off" ? null : current;
      }

      const raw = Number(random());
      const safeRandom = Number.isFinite(raw)
        ? Math.min(0.999999999, Math.max(0, raw))
        : 0;
      let candidate = Math.floor(safeRandom * (count - 1));

      if (candidate >= current) {
        candidate += 1;
      }

      return candidate;
    }

    if (current + 1 < count) {
      return current + 1;
    }

    if (repeat === "all" || !fromEnded) {
      return 0;
    }

    return null;
  }

  return {
    REPEAT_MODES,
    normalizeRepeatMode,
    cycleRepeatMode,
    getNextTrackIndex
  };
});
