(() => {
  "use strict";

  // ============================================
  // RESPONSIVE / PERFORMANCE CAPABILITY SETUP
  // ============================================

  // Desktop-only heavy motion effects.
  // Phone/tablet par ye effects run nahi honge.
  const desktopMotionQuery = window.matchMedia(
    "(min-width: 901px) and (hover: hover) and (pointer: fine)"
  );

  // Viewport safety
  let viewportMeta = document.querySelector('meta[name="viewport"]');

  if (!viewportMeta) {
    viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    document.head.appendChild(viewportMeta);
  }

  viewportMeta.content =
    "width=device-width, initial-scale=1, viewport-fit=cover";

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

  // ============================
  // PLAYER ELEMENTS
  // ============================

  const audio = $("#audio");
  const playPause = $("#playPause");
  const previous = $("#previous");
  const next = $("#next");

  const progress = $("#progress");
  const volume = $("#volume");

  const currentTime = $("#currentTime");
  const duration = $("#duration");

  const songTitle = $("#songTitle");
  const artistName = $("#artistName");

  const albumCover = $("#albumCover");
  const album = $(".album");

  const visualizer = $("#visualizer");
  const playerCard = $("#playerCard");

  // ============================
  // ALBUM BROWSER
  // ============================

  const selectedAlbumCover = $("#selectedAlbumCover");
  const selectedAlbumTitle = $("#selectedAlbumTitle");
  const selectedAlbumArtist = $("#selectedAlbumArtist");
  const selectedAlbumCount = $("#selectedAlbumCount");

  const albumSongList = $("#albumSongList");

  // ============================
  // LIKED SONG ELEMENTS
  // ============================

  const likedSongsList = $("#likedSongsList");
  const likedCount = $("#likedCount");

  // ============================
  // SEARCH ELEMENTS
  // ============================

  const searchToggle = $("#searchToggle");
  const musicSearch = $("#musicSearch");
  const musicSearchInput = $("#musicSearchInput");
  const searchResults = $("#searchResults");
  const searchClose = $("#searchClose");

  // ============================
  // MINI PLAYER
  // ============================

  const miniPlayer = $("#miniPlayer");
  const miniCover = $("#miniCover");
  const miniTitle = $("#miniTitle");
  const miniArtist = $("#miniArtist");

  const miniPlayPause = $("#miniPlayPause");
  const miniNext = $("#miniNext");
  const miniQueueBtn = $("#miniQueueBtn");
  const miniOpenPlayer = $("#miniOpenPlayer");

  // ============================
  // QUEUE
  // ============================

  const queuePanel = $("#queuePanel");
  const queueBackdrop = $("#queueBackdrop");
  const queueClose = $("#queueClose");
  const queueList = $("#queueList");
  const queueAlbumTitle = $("#queueAlbumTitle");
  const openQueueMain = $("#openQueueMain");

  const cards = $$(".song-card");

  // ============================================
  // ALBUM + SONG DATA
  // ============================================

  const albums = [
    {
      title: "Desi Heats",
      artist: "Nova",
      cover: "images/cover1.jpg",

      tracks: [
        {
          title: "Pyaar hota kahi baar hai",
          artist: "Arijit Singh",
          audio: "songs1/Desi Heats-01.mp3"
        },

        {
          title: "Afterglow",
          artist: "Nova",
          audio: "songs1/Desi Heats-02.mp3"
        },

        {
          title: "Abhi Toh Party",
          artist: "Badsha",
          audio: "songs1/Desi Heats-03.mp3"
        },

        {
          title: "Saree ka Falsa",
          artist: "Antara mitra",
          audio: "songs1.1/Desi Heats-04.mp3"
        },

        {
          title: "Kala Chasma",
          artist: "Amar arshi",
          audio: "songs1.1/Desi Heats-05.mp3"
        },

        {
          title: "Desi Girl",
          artist: "Vishal",
          audio: "songs1.1/Desi Heats-06.mp3"
        },

        {
          title: "No LOve",
          artist: "Garry",
          audio: "songs1.1/Desi Heats-07.mp3"
        }
      ]
    },

    {
      title: "Midnight City",
      artist: "Lunar",
      cover: "images/cover2.jpg",

      tracks: [
        {
          title: "Midnight City",
          artist: "The Weeknd",
          audio: "songs2/song2.mp3"
        },

        {
          title: "Normal",
          artist: "BTS",
          audio: "songs2/midnight-02.mp3"
        },

        {
          title: "Party All Night",
          artist: "HONEY SINGH",
          audio: "songs2/midnight-03.mp3"
        },

        {
          title: "Party All Night",
          artist: "HONEY SINGH",
          audio: "songs2/midnight-04.mp3"
        },

        {
          title: "Streetlights",
          artist: "Lunar",
          audio: "songs2/midnight-05.mp3"
        },

        {
          title: "Violet Roads",
          artist: "Lunar",
          audio: "songs2/midnight-06.mp3"
        },

        {
          title: "City Sleeps",
          artist: "Lunar",
          audio: "songs2/midnight-07.mp3"
        }
      ]
    },

    {
      title: "Paradise",
      artist: "Echo",
      cover: "images/cover3.jpg",
      theme: "paradise",

      tracks: [
        {
          title: "SAMJHO NA ( NASAMAJH )",
          artist: "Aditya Rikhari",
          audio: "songs3/Paradise1.mp3"
        },

        {
          title: "Jhol",
          artist: "Maanu x Annural Khali ",
          audio: "songs3/Paradise2.mp3"
        },

        {
          title: "Woh ft. Sthiti",
          artist: "Khatth",
          audio: "songs3/Paradise3.mp3"
        },

        {
          title: "Bairan",
          artist: "Banjaare",
          audio: "songs3/Paradise4.mp3"
        },

        {
          title: "Preet Re",
          artist: "Triptii Dimri",
          audio: "songs3/Paradise5.mp3"
        },

        {
          title: "Wildflower",
          artist: "Echo",
          audio: "songs3.1/Paradise6.mp3"
        },

        {
          title: "Home Again",
          artist: "Echo",
          audio: "songs3.1/Paradise7.mp3"
        }
      ]
    },

    {
      title: "Ocean Dreams",
      artist: "Aurora",
      cover: "images/cover4.jpg",

      tracks: [
        {
          title: "Ocean Dreams",
          artist: "Aurora",
          audio: "songs/song4.mp3"
        },

        {
          title: "Tidal Blue",
          artist: "Aurora",
          audio: "songs/ocean-02.mp3"
        },

        {
          title: "Drift",
          artist: "Aurora",
          audio: "songs/ocean-03.mp3"
        },

        {
          title: "Salt & Stars",
          artist: "Aurora",
          audio: "songs/ocean-04.mp3"
        },

        {
          title: "Deep Current",
          artist: "Aurora",
          audio: "songs/ocean-05.mp3"
        },

        {
          title: "Shoreline",
          artist: "Aurora",
          audio: "songs/ocean-06.mp3"
        },

        {
          title: "Into the Blue",
          artist: "Aurora",
          audio: "songs/ocean-07.mp3"
        }
      ]
    }
  ];

  // ============================
  // PLAYER STATE
  // ============================

  let currentAlbum = 0;
  let currentSong = 0;

  let isPlaying = false;

  let demoProgress = 0;
  let demoTimer = null;

  const getActiveAlbum = () =>
    albums[currentAlbum];

  const getActiveTracks = () =>
    getActiveAlbum().tracks;

  // ============================================
  // LIKED SONGS
  // ============================================

  let likedSongIds = [];

  try {
    likedSongIds =
      JSON.parse(
        localStorage.getItem(
          "novaLikedSongs"
        )
      ) || [];
  }

  catch (error) {
    likedSongIds = [];
  }

  function getSongId(
    albumIndex,
    trackIndex
  ) {
    return `${albumIndex}:${trackIndex}`;
  }

  function isSongLiked(
    albumIndex,
    trackIndex
  ) {
    return likedSongIds.includes(
      getSongId(
        albumIndex,
        trackIndex
      )
    );
  }

  function saveLikedSongs() {
    try {
      localStorage.setItem(
        "novaLikedSongs",
        JSON.stringify(
          likedSongIds
        )
      );
    }

    catch (error) {
      console.info(
        "NOVA: likes could not be saved."
      );
    }
  }

  function toggleLikedSong(
    albumIndex,
    trackIndex
  ) {
    const id =
      getSongId(
        albumIndex,
        trackIndex
      );

    if (
      likedSongIds.includes(id)
    ) {
      likedSongIds =
        likedSongIds.filter(
          item =>
            item !== id
        );
    }

    else {
      likedSongIds.push(id);
    }

    saveLikedSongs();

    renderAlbumSongs();
    renderLikedSongs();
  }

  function getLikedSongs() {
    return likedSongIds
      .map(id => {
        const [
          albumIndex,
          trackIndex
        ] =
          id
            .split(":")
            .map(Number);

        const likedAlbum =
          albums[albumIndex];

        const track =
          likedAlbum
            ?.tracks[
              trackIndex
            ];

        if (
          !likedAlbum ||
          !track
        ) {
          return null;
        }

        return {
          albumIndex,
          trackIndex,
          album: likedAlbum,
          track
        };
      })
      .filter(Boolean);
  }

  function renderLikedSongs() {
    if (!likedSongsList) {
      return;
    }

    const songs =
      getLikedSongs();

    setText(
      likedCount,
      `${songs.length} ${
        songs.length === 1
          ? "song"
          : "songs"
      }`
    );

    if (
      songs.length === 0
    ) {
      likedSongsList.innerHTML = `
        <div class="liked-empty">

          <div class="liked-empty-heart">
            ♡
          </div>

          <h3>
            No liked songs yet
          </h3>

          <p>
            Tap the heart beside a song
            and it will appear here.
          </p>

        </div>
      `;

      return;
    }

    likedSongsList.innerHTML =
      songs
        .map(
          (
            item,
            index
          ) => {
            const {
              album,
              track,
              albumIndex,
              trackIndex
            } = item;

            return `
              <div
                class="liked-song"
                data-album-index="${albumIndex}"
                data-track-index="${trackIndex}"
              >

                <span class="liked-number">

                  ${
                    String(
                      index + 1
                    )
                      .padStart(
                        2,
                        "0"
                      )
                  }

                </span>

                <img
                  class="liked-cover"
                  src="${
                    track.cover ||
                    album.cover
                  }"
                  alt="${track.title}"
                  loading="lazy"
                  decoding="async"
                >

                <span class="liked-song-info">

                  <strong>
                    ${track.title}
                  </strong>

                  <small>
                    ${track.artist}
                  </small>

                </span>

                <span class="liked-album-name">
                  ${album.title}
                </span>

                <button
                  class="liked-remove"
                  type="button"
                  aria-label="Unlike ${track.title}"
                >
                  ♥
                </button>

              </div>
            `;
          }
        )
        .join("");
  }

  // ============================================
  // MUSIC SEARCH
  // ============================================

  let currentSearchResults = [];

  function openMusicSearch() {
    musicSearch
      ?.classList
      .add("open");

    searchToggle
      ?.setAttribute(
        "aria-expanded",
        "true"
      );

    setTimeout(
      () => {
        musicSearchInput
          ?.focus();
      },
      100
    );
  }

  function closeMusicSearch() {
    musicSearch
      ?.classList
      .remove("open");

    searchToggle
      ?.setAttribute(
        "aria-expanded",
        "false"
      );
  }

  function searchMusic(query) {
    const searchTerm =
      query
        .trim()
        .toLowerCase();

    if (!searchTerm) {
      currentSearchResults = [];

      if (searchResults) {
        searchResults.innerHTML = `
          <div class="search-placeholder">
            Start typing to discover music.
          </div>
        `;
      }

      return;
    }

    const results = [];

    albums.forEach(
      (
        searchAlbum,
        albumIndex
      ) => {
        const albumText =
          `
            ${searchAlbum.title}
            ${searchAlbum.artist}
          `
            .toLowerCase();

        if (
          albumText.includes(
            searchTerm
          )
        ) {
          results.push({
            type: "album",
            albumIndex,
            title:
              searchAlbum.title,
            artist:
              searchAlbum.artist,
            cover:
              searchAlbum.cover
          });
        }

        searchAlbum.tracks.forEach(
          (
            track,
            trackIndex
          ) => {
            const trackText =
              `
                ${track.title}
                ${track.artist}
                ${searchAlbum.title}
              `
                .toLowerCase();

            if (
              trackText.includes(
                searchTerm
              )
            ) {
              results.push({
                type: "track",

                albumIndex,
                trackIndex,

                title:
                  track.title,

                artist:
                  track.artist,

                album:
                  searchAlbum.title,

                cover:
                  track.cover ||
                  searchAlbum.cover
              });
            }
          }
        );
      }
    );

    currentSearchResults =
      results.slice(
        0,
        10
      );

    renderSearchResults();
  }

  function renderSearchResults() {
    if (!searchResults) {
      return;
    }

    if (
      currentSearchResults.length === 0
    ) {
      searchResults.innerHTML = `
        <div class="search-placeholder">
          No music found.
        </div>
      `;

      return;
    }

    searchResults.innerHTML =
      currentSearchResults
        .map(
          (
            result,
            index
          ) => {
            const subtitle =
              result.type === "album"

                ? `${result.artist} • Album`

                : `${result.artist} • ${result.album}`;

            return `
              <button
                class="search-result-item"
                type="button"
                data-search-index="${index}"
              >

                <img
                  class="search-result-cover"
                  src="${result.cover}"
                  alt=""
                  loading="lazy"
                  decoding="async"
                >

                <span class="search-result-info">

                  <strong>
                    ${result.title}
                  </strong>

                  <small>
                    ${subtitle}
                  </small>

                </span>

                <span class="search-result-type">

                  ${
                    result.type === "album"
                      ? "ALBUM"
                      : "TRACK"
                  }

                </span>

              </button>
            `;
          }
        )
        .join("");
  }

  musicSearchInput
    ?.addEventListener(
      "input",
      event => {
        searchMusic(
          event.target.value
        );
      }
    );

  searchToggle
    ?.addEventListener(
      "click",
      event => {
        event.stopPropagation();

        if (
          musicSearch
            ?.classList
            .contains("open")
        ) {
          closeMusicSearch();
        }

        else {
          openMusicSearch();
        }
      }
    );

  searchClose
    ?.addEventListener(
      "click",
      closeMusicSearch
    );

  searchResults
    ?.addEventListener(
      "click",
      event => {
        const resultButton =
          event.target.closest(
            ".search-result-item"
          );

        if (!resultButton) {
          return;
        }

        const resultIndex =
          Number(
            resultButton
              .dataset
              .searchIndex
          );

        const result =
          currentSearchResults[
            resultIndex
          ];

        if (!result) {
          return;
        }

        if (
          result.type === "album"
        ) {
          selectAlbum(
            result.albumIndex,
            false
          );

          closeMusicSearch();

          $("#album-tracks")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
        }

        else {
          selectAlbum(
            result.albumIndex,
            false
          );

          loadSong(
            result.trackIndex
          );

          closeMusicSearch();

          $("#player")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
        }
      }
    );

  document
    .addEventListener(
      "keydown",
      event => {
        if (
          event.key === "Escape"
        ) {
          closeMusicSearch();
          closeQueue();
        }
      }
    );

  document
    .addEventListener(
      "click",
      event => {
        if (
          !musicSearch
            ?.contains(
              event.target
            ) &&

          !searchToggle
            ?.contains(
              event.target
            )
        ) {
          closeMusicSearch();
        }
      }
    );

  // ============================================
  // BASIC FUNCTIONS
  // ============================================

  function setText(
    element,
    text
  ) {
    if (element) {
      element.textContent =
        text;
    }
  }

  function formatTime(
    seconds
  ) {
    const value =
      Number(seconds);

    if (
      !Number.isFinite(value) ||
      value < 0
    ) {
      return "0:00";
    }

    const minutes =
      Math.floor(
        value / 60
      );

    const secondsLeft =
      Math.floor(
        value % 60
      )
        .toString()
        .padStart(
          2,
          "0"
        );

    return `${minutes}:${secondsLeft}`;
  }

  // ============================================
  // MINI PLAYER
  // ============================================

  function updateMiniPlayer() {
    const activeAlbum =
      getActiveAlbum();

    const track =
      getActiveTracks()[
        currentSong
      ];

    if (
      !activeAlbum ||
      !track
    ) {
      return;
    }

    if (miniCover) {
      miniCover.src =
        track.cover ||
        activeAlbum.cover;
    }

    setText(
      miniTitle,
      track.title
    );

    setText(
      miniArtist,
      track.artist
    );

    setText(
      miniPlayPause,
      isPlaying
        ? "❚❚"
        : "▶"
    );
  }

  // ============================================
  // QUEUE
  // ============================================

  function renderQueue() {
    if (!queueList) {
      return;
    }

    const activeAlbum =
      getActiveAlbum();

    const tracks =
      getActiveTracks();

    setText(
      queueAlbumTitle,
      activeAlbum.title
    );

    const orderedIndexes =
      tracks.map(
        (_, offset) =>
          (
            currentSong +
            offset
          ) %
          tracks.length
      );

    queueList.innerHTML =
      orderedIndexes
        .map(
          (
            trackIndex,
            position
          ) => {
            const track =
              tracks[
                trackIndex
              ];

            const current =
              position === 0;

            return `
              <button
                class="queue-item${
                  current
                    ? " current"
                    : ""
                }"
                type="button"
                data-track-index="${trackIndex}"
              >

                <span class="queue-number">
                  ${
                    String(
                      trackIndex + 1
                    )
                      .padStart(
                        2,
                        "0"
                      )
                  }
                </span>

                <span class="queue-song">

                  <strong>
                    ${track.title}
                  </strong>

                  <small>
                    ${track.artist}
                  </small>

                </span>

                <span class="queue-state">
                  ${
                    current
                      ? "PLAYING"
                      : "NEXT"
                  }
                </span>

              </button>
            `;
          }
        )
        .join("");
  }

  function openQueue() {
    renderQueue();

    queuePanel
      ?.classList
      .add("open");

    queueBackdrop
      ?.classList
      .add("visible");

    queuePanel
      ?.setAttribute(
        "aria-hidden",
        "false"
      );

    queueBackdrop
      ?.setAttribute(
        "aria-hidden",
        "false"
      );
  }

  function closeQueue() {
    queuePanel
      ?.classList
      .remove("open");

    queueBackdrop
      ?.classList
      .remove("visible");

    queuePanel
      ?.setAttribute(
        "aria-hidden",
        "true"
      );

    queueBackdrop
      ?.setAttribute(
        "aria-hidden",
        "true"
      );
  }

  queueList
    ?.addEventListener(
      "click",
      event => {
        const row =
          event.target.closest(
            ".queue-item"
          );

        if (!row) {
          return;
        }

        const index =
          Number(
            row.dataset
              .trackIndex
          );

        if (
          !Number.isInteger(index)
        ) {
          return;
        }

        loadSong(index);
        playSong();
        closeQueue();
      }
    );

  queueClose
    ?.addEventListener(
      "click",
      closeQueue
    );

  queueBackdrop
    ?.addEventListener(
      "click",
      closeQueue
    );

  openQueueMain
    ?.addEventListener(
      "click",
      openQueue
    );

  miniQueueBtn
    ?.addEventListener(
      "click",
      () => {
        if (
          queuePanel
            ?.classList
            .contains("open")
        ) {
          closeQueue();
        }

        else {
          openQueue();
        }
      }
    );

  // ============================================
  // ALBUM UI
  // ============================================

  function updateSelectedCard() {
    cards.forEach(
      (
        card,
        index
      ) => {
        card.classList.toggle(
          "selected",
          index === currentAlbum
        );
      }
    );
  }

  function updateSelectedTrack() {
    $$(
      ".album-track",
      albumSongList ||
      document
    )
      .forEach(
        (
          track,
          index
        ) => {
          track.classList.toggle(
            "active",
            index === currentSong
          );
        }
      );
  }

  function renderAlbumSongs() {
    const activeAlbum =
      getActiveAlbum();

    const tracks =
      activeAlbum.tracks;

    if (
      selectedAlbumCover
    ) {
      selectedAlbumCover.src =
        activeAlbum.cover;
    }

    setText(
      selectedAlbumTitle,
      activeAlbum.title
    );

    setText(
      selectedAlbumArtist,
      activeAlbum.artist
    );

    setText(
      selectedAlbumCount,
      `${tracks.length} TRACKS`
    );

    if (!albumSongList) {
      return;
    }

    albumSongList.innerHTML =
      tracks
        .map(
          (
            track,
            index
          ) => {
            const liked =
              isSongLiked(
                currentAlbum,
                index
              );

            return `
              <div
                class="album-track${
                  index === currentSong
                    ? " active"
                    : ""
                }"
                data-track-index="${index}"
              >

                <span class="track-number">

                  ${
                    String(
                      index + 1
                    )
                      .padStart(
                        2,
                        "0"
                      )
                  }

                </span>

                <span class="track-main">

                  <strong>
                    ${track.title}
                  </strong>

                  <small>
                    ${track.artist}
                  </small>

                </span>

                <span class="track-actions">

                  <button
                    class="track-like${
                      liked
                        ? " liked"
                        : ""
                    }"
                    type="button"
                    data-like-index="${index}"
                    aria-label="${
                      liked
                        ? "Unlike"
                        : "Like"
                    } ${track.title}"
                  >

                    ${
                      liked
                        ? "♥"
                        : "♡"
                    }

                  </button>

                  <span class="track-play">
                    ▶
                  </span>

                </span>

              </div>
            `;
          }
        )
        .join("");
  }

  function selectAlbum(
    index,
    autoplayFirstSong = false
  ) {
    currentAlbum =
      (
        index +
        albums.length
      ) %
      albums.length;

    currentSong = 0;

    document.body.dataset.theme =
      albums[currentAlbum]
        .theme ||
      "default";

    pauseSong();

    renderAlbumSongs();

    updateSelectedCard();

    loadSong(0);

    if (
      autoplayFirstSong
    ) {
      playSong();
    }
  }

  // ============================================
  // LOAD SONG
  // ============================================

  function loadSong(index) {
    const tracks =
      getActiveTracks();

    currentSong =
      (
        index +
        tracks.length
      ) %
      tracks.length;

    const track =
      tracks[
        currentSong
      ];

    const activeAlbum =
      getActiveAlbum();

    setPlayingUI(false);

    setText(
      songTitle,
      track.title
    );

    setText(
      artistName,
      track.artist
    );

    if (albumCover) {
      albumCover.style.opacity =
        "1";

      albumCover.src =
        track.cover ||
        activeAlbum.cover;
    }

    if (audio) {
      try {
        audio.pause();

        audio.src =
          track.audio;

        audio.load();
      }

      catch (error) {
        console.info(
          "NOVA: audio unavailable."
        );
      }
    }

    demoProgress = 0;

    if (progress) {
      progress.value = 0;
    }

    setText(
      currentTime,
      "0:00"
    );

    setText(
      duration,
      "3:30"
    );

    updateSelectedCard();
    updateSelectedTrack();

    updateMiniPlayer();
    renderQueue();
  }

  // ============================================
  // PLAYING UI
  // ============================================

  function setPlayingUI(
    state
  ) {
    isPlaying = state;

    setText(
      playPause,
      state
        ? "❚❚"
        : "▶"
    );

    album
      ?.classList
      .toggle(
        "playing",
        state
      );

    visualizer
      ?.classList
      .toggle(
        "active",
        state
      );

    playerCard
      ?.classList
      .toggle(
        "playing",
        state
      );

    setText(
      miniPlayPause,
      state
        ? "❚❚"
        : "▶"
    );

    if (state) {
      miniPlayer
        ?.classList
        .add("visible");

      startDemoProgress();
    }

    else {
      stopDemoProgress();
    }
  }

  // ============================================
  // PLAY / PAUSE
  // ============================================

  async function playSong() {
    if (
      !audio ||
      !audio.src
    ) {
      return;
    }

    try {
      await audio.play();

      setPlayingUI(true);
    }

    catch (error) {
      setPlayingUI(false);

      console.info(
        "NOVA: audio could not play.",
        error
      );
    }
  }

  function pauseSong() {
    try {
      audio?.pause();
    }

    catch (error) {
      // ignore
    }

    setPlayingUI(false);
  }

  playPause
    ?.addEventListener(
      "click",
      () => {
        if (isPlaying) {
          pauseSong();
        }

        else {
          playSong();
        }
      }
    );

  // ============================================
  // MINI PLAYER BUTTONS
  // ============================================

  miniPlayPause
    ?.addEventListener(
      "click",
      () => {
        if (isPlaying) {
          pauseSong();
        }

        else {
          playSong();
        }
      }
    );

  miniNext
    ?.addEventListener(
      "click",
      () => {
        loadSong(
          currentSong + 1
        );

        playSong();
      }
    );

  miniOpenPlayer
    ?.addEventListener(
      "click",
      () => {
        $("#player")
          ?.scrollIntoView({
            behavior:
              "smooth",

            block:
              "center"
          });
      }
    );

  // ============================================
  // PREVIOUS / NEXT
  // ============================================

  previous
    ?.addEventListener(
      "click",
      () => {
        loadSong(
          currentSong - 1
        );

        playSong();
      }
    );

  next
    ?.addEventListener(
      "click",
      () => {
        loadSong(
          currentSong + 1
        );

        playSong();
      }
    );

  // ============================================
  // PROGRESS BAR
  // ============================================

  progress
    ?.addEventListener(
      "input",
      () => {
        demoProgress =
          Number(
            progress.value
          ) || 0;

        if (
          audio &&
          Number.isFinite(
            audio.duration
          ) &&
          audio.duration > 0
        ) {
          try {
            audio.currentTime =
              (
                demoProgress /
                100
              ) *
              audio.duration;
          }

          catch (error) {
            // ignore
          }
        }

        else {
          setText(
            currentTime,
            formatTime(
              (
                demoProgress /
                100
              ) *
              210
            )
          );

          setText(
            duration,
            "3:30"
          );
        }
      }
    );

  // ============================================
  // VOLUME
  // ============================================

  volume
    ?.addEventListener(
      "input",
      () => {
        if (!audio) {
          return;
        }

        audio.volume =
          Math.min(
            1,
            Math.max(
              0,
              Number(
                volume.value
              ) || 0
            )
          );
      }
    );

  if (audio) {
    audio.volume = 0.7;
  }

  // ============================================
  // REAL AUDIO PROGRESS
  // ============================================

  if (audio) {
    audio.addEventListener(
      "timeupdate",
      () => {
        if (
          !Number.isFinite(
            audio.duration
          ) ||
          audio.duration <= 0
        ) {
          return;
        }

        const value =
          (
            audio.currentTime /
            audio.duration
          ) *
          100;

        if (progress) {
          progress.value =
            value;
        }

        setText(
          currentTime,
          formatTime(
            audio.currentTime
          )
        );

        setText(
          duration,
          formatTime(
            audio.duration
          )
        );
      }
    );

    audio.addEventListener(
      "play",
      () => {
        setPlayingUI(true);
      }
    );

    audio.addEventListener(
      "pause",
      () => {
        if (!audio.ended) {
          setPlayingUI(false);
        }
      }
    );

    audio.addEventListener(
      "ended",
      () => {
        loadSong(
          currentSong + 1
        );

        playSong();
      }
    );

    audio.addEventListener(
      "error",
      () => {
        setPlayingUI(false);

        setText(
          duration,
          "3:30"
        );
      }
    );
  }

  // ============================================
  // DEMO PROGRESS FALLBACK
  // ============================================

  function startDemoProgress() {
    stopDemoProgress();

    demoTimer =
      window.setInterval(
        () => {
          if (
            audio &&
            Number.isFinite(
              audio.duration
            ) &&
            !audio.paused
          ) {
            return;
          }

          demoProgress +=
            0.22;

          if (
            demoProgress >= 100
          ) {
            demoProgress = 0;
            return;
          }

          if (progress) {
            progress.value =
              demoProgress;
          }

          setText(
            currentTime,
            formatTime(
              (
                demoProgress /
                100
              ) *
              210
            )
          );

          setText(
            duration,
            "3:30"
          );
        },
        120
      );
  }

  function stopDemoProgress() {
    if (
      demoTimer !== null
    ) {
      clearInterval(
        demoTimer
      );

      demoTimer = null;
    }
  }

  // ============================================
  // ALBUM CARDS
  // ============================================

  cards.forEach(
    (
      card,
      fallbackIndex
    ) => {
      const parsed =
        Number(
          card.dataset.index
        );

      const index =
        Number.isInteger(
          parsed
        )
          ? parsed
          : fallbackIndex;

      const cardPlayButton =
        $(
          ".card-play",
          card
        );

      card.addEventListener(
        "click",
        () => {
          selectAlbum(
            index,
            false
          );

          $("#album-tracks")
            ?.scrollIntoView({
              behavior:
                "smooth",

              block:
                "center"
            });
        }
      );

      cardPlayButton
        ?.addEventListener(
          "click",
          event => {
            event.stopPropagation();

            selectAlbum(
              index,
              true
            );

            $("#player")
              ?.scrollIntoView({
                behavior:
                  "smooth",

                block:
                  "center"
              });
          }
        );

      // Lightweight hover motion is handled by CSS.
    }
  );

  // ============================================
  // ALBUM TRACK CLICK + LIKE
  // ============================================

  albumSongList
    ?.addEventListener(
      "click",
      event => {
        const likeButton =
          event.target.closest(
            ".track-like"
          );

        if (likeButton) {
          event.stopPropagation();

          const trackIndex =
            Number(
              likeButton
                .dataset
                .likeIndex
            );

          if (
            Number.isInteger(
              trackIndex
            )
          ) {
            toggleLikedSong(
              currentAlbum,
              trackIndex
            );
          }

          return;
        }

        const row =
          event.target.closest(
            ".album-track"
          );

        if (!row) {
          return;
        }

        const index =
          Number(
            row.dataset
              .trackIndex
          );

        if (
          !Number.isInteger(index)
        ) {
          return;
        }

        loadSong(index);
        playSong();

        $("#player")
          ?.scrollIntoView({
            behavior:
              "smooth",

            block:
              "center"
          });
      }
    );

  // ============================================
  // LIKED SONG PLAY / UNLIKE
  // ============================================

  likedSongsList
    ?.addEventListener(
      "click",
      event => {
        const row =
          event.target.closest(
            ".liked-song"
          );

        if (!row) {
          return;
        }

        const albumIndex =
          Number(
            row.dataset
              .albumIndex
          );

        const trackIndex =
          Number(
            row.dataset
              .trackIndex
          );

        if (
          !Number.isInteger(
            albumIndex
          ) ||

          !Number.isInteger(
            trackIndex
          )
        ) {
          return;
        }

        if (
          event.target.closest(
            ".liked-remove"
          )
        ) {
          event.stopPropagation();

          toggleLikedSong(
            albumIndex,
            trackIndex
          );

          return;
        }

        selectAlbum(
          albumIndex,
          false
        );

        loadSong(
          trackIndex
        );

        playSong();

        $("#player")
          ?.scrollIntoView({
            behavior:
              "smooth",

            block:
              "center"
          });
      }
    );

  // ============================================
  // LIGHTWEIGHT HOVER ELEMENTS
  // ============================================

  const teamCards = $$(".team-card");
  const magneticItems = $$(".magnetic-btn, .magnetic-social");

  // Expensive pointer-position 3D/magnetic tracking removed.
  // CSS hover transitions keep the interaction lightweight.

  // ============================================
  // HERO VISUAL
  // ============================================

  const heroVisual = $("#heroVisual");
  const musicCircle = $("#musicCircle");

  // CSS pulse/equalizer animation remains. Pointer-position 3D tracking
  // was removed to avoid repeated layout reads while moving the mouse.

  // ============================================
  // RESPONSIVE STARS + PARTICLES
  // ============================================

  const stars = $("#stars");
  const particleContainer = $("#particles");

  if (stars && stars.children.length === 0) {
    const starCount = desktopMotionQuery.matches ? 18 : 8;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("span");
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty("--star-speed", `${3.5 + Math.random() * 5}s`);
      star.style.setProperty("--star-delay", `${-Math.random() * 6}s`);
      stars.appendChild(star);
    }
  }

  if (particleContainer && particleContainer.children.length === 0) {
    const particleCount = desktopMotionQuery.matches ? 10 : 5;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("span");
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${12 + Math.random() * 88}%`;
      particle.style.setProperty("--particle-size", `${1.6 + Math.random() * 2.2}px`);
      particle.style.setProperty("--particle-speed", `${9 + Math.random() * 9}s`);
      particle.style.setProperty("--particle-delay", `${-Math.random() * 12}s`);
      particle.style.setProperty("--particle-x", `${-38 + Math.random() * 76}px`);
      particleContainer.appendChild(particle);
    }
  }

  // ============================================
  // SCROLL REVEAL
  // ============================================

  const revealSections =
    $$(".section-reveal");

  if (
    "IntersectionObserver"
    in window
  ) {
    const observer =
      new IntersectionObserver(
        entries => {
          entries.forEach(
            entry => {
              if (
                !entry
                  .isIntersecting
              ) {
                return;
              }

              entry.target
                .classList
                .add(
                  "animate-in"
                );

              observer
                .unobserve(
                  entry.target
                );
            }
          );
        },

        {
          threshold: 0.1,
          rootMargin:
            "0px 0px -30px 0px"
        }
      );

    revealSections
      .forEach(
        section => {
          observer.observe(
            section
          );
        }
      );
  }

  // ============================================
  // ACTIVE NAVIGATION
  // ============================================

  const navLinks =
    $$(".nav-link");

  const sections = [
    "home",
    "songs",
    "player",
    "team"
  ]
    .map(
      id =>
        document
          .getElementById(id)
    )
    .filter(Boolean);

  let navFrame = null;

  function updateNavigation() {
    let activeId =
      "home";

    sections.forEach(
      section => {
        if (
          section
            .getBoundingClientRect()
            .top <
          window.innerHeight *
          0.45
        ) {
          activeId =
            section.id;
        }
      }
    );

    navLinks.forEach(
      link => {
        link.classList.toggle(
          "active",

          link.getAttribute(
            "href"
          ) ===
            `#${activeId}`
        );
      }
    );
  }

  function requestNavUpdate() {
    if (navFrame) {
      return;
    }

    navFrame =
      requestAnimationFrame(
        () => {
          navFrame = null;

          updateNavigation();
        }
      );
  }

  window.addEventListener(
    "scroll",
    requestNavUpdate,
    {
      passive: true
    }
  );

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================

  const siteHeader =
    $(".site-header");

  let headerFrame = null;

  function updateHeader() {
    if (!siteHeader) {
      return;
    }

    siteHeader
      .classList
      .toggle(
        "scrolled",
        window.scrollY > 60
      );
  }

  function requestHeaderUpdate() {
    if (headerFrame) {
      return;
    }

    headerFrame =
      requestAnimationFrame(
        () => {
          headerFrame = null;
          updateHeader();
        }
      );
  }

  window.addEventListener(
    "scroll",
    requestHeaderUpdate,
    {
      passive: true
    }
  );

  // ============================================
  // IMAGE ERROR FALLBACK
  // ============================================

  document.addEventListener(
    "error",
    event => {
      const target =
        event.target;

      if (
        !(target instanceof HTMLImageElement)
      ) {
        return;
      }

      if (
        target.classList
          .contains(
            "team-photo"
          )
      ) {
        target.style.display =
          "none";
      }

      else {
        target.style.opacity =
          "0";
      }
    },
    true
  );

  // ============================================
  // TOUCH / MOBILE OPTIMIZATION
  // ============================================

  if (
    !desktopMotionQuery.matches
  ) {
    document
      .documentElement
      .classList
      .add(
        "nova-touch-device"
      );

    // Remove transforms that may have been
    // applied before resize/orientation change.
    [
      ...cards,
      ...teamCards,
      ...magneticItems
    ]
      .forEach(
        element => {
          element.style.transform =
            "";
        }
      );

    if (musicCircle) {
      musicCircle.style.transform =
        "";
    }
}

  // ============================================
  // VISIBILITY PERFORMANCE
  // ============================================

  document.addEventListener(
    "visibilitychange",
    () => {
      document.documentElement.classList.toggle("nova-page-hidden", document.hidden);
      if (
        document.hidden
      ) {
        stopDemoProgress();
      }

      else if (
        isPlaying
      ) {
        startDemoProgress();
      }
    }
  );

  // ============================================
  // INITIAL LOAD
  // ============================================

  selectAlbum(
    0,
    false
  );

  renderLikedSongs();

  updateNavigation();
  updateHeader();

  miniPlayer
    ?.classList
    .add(
      "visible"
    );
// ============================================
// SOFT CURSOR + BACKGROUND PARALLAX
// Single event-driven RAF. No idle animation loop.
// ============================================

const cursorGlow = document.getElementById("cursorGlow");
const touchGlow = document.getElementById("touchGlow");
const cursorAllowed = window.matchMedia("(hover: hover) and (pointer: fine)");
const backgroundOrbs = $$(".orb");
const backgroundRings = $$(".graphic-ring");

if (cursorGlow && cursorAllowed.matches) {
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let cursorFrame = 0;

  window.addEventListener("pointermove", event => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursorGlow.style.opacity = "1";

    if (cursorFrame) return;

    cursorFrame = requestAnimationFrame(() => {
      cursorFrame = 0;
      cursorGlow.style.transform =
        `translate3d(${pointerX}px, ${pointerY}px, 0)`;

      const nx = pointerX / window.innerWidth - 0.5;
      const ny = pointerY / window.innerHeight - 0.5;

      backgroundOrbs.forEach((orb, index) => {
        const strength = 7 + index * 5;
        orb.style.setProperty("--px", `${nx * strength}px`);
        orb.style.setProperty("--py", `${ny * strength}px`);
      });

      backgroundRings.forEach((ring, index) => {
        const strength = 4 + index * 3;
        ring.style.setProperty("--rx", `${nx * strength}px`);
        ring.style.setProperty("--ry", `${ny * strength}px`);
      });
    });
  }, { passive: true });

  document.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0";
  });
}

if (touchGlow && !cursorAllowed.matches) {
  window.addEventListener("pointerdown", event => {
    touchGlow.classList.remove("active");
    touchGlow.style.transform =
      `translate3d(${event.clientX}px, ${event.clientY}px, 0) scale(.45)`;

    requestAnimationFrame(() => {
      touchGlow.classList.add("active");
    });
  }, { passive: true });
}

// ============================================
// MANDATORY ENTRY SIGN IN
// ============================================

const novaAuthOverlay = document.getElementById("novaAuthOverlay");
const novaAuthForm = document.getElementById("novaAuthForm");
const novaUsername = document.getElementById("novaUsername");
const novaPassword = document.getElementById("novaPassword");
const novaAuthMessage = document.getElementById("novaAuthMessage");

function unlockNova() {
  document.body.classList.remove("auth-locked");
  novaAuthOverlay?.classList.remove("open", "leaving");
  novaAuthOverlay?.setAttribute("aria-hidden", "true");
}

function lockNova() {
  document.body.classList.add("auth-locked");
  novaAuthOverlay?.classList.add("open");
  novaAuthOverlay?.classList.remove("leaving");
  novaAuthOverlay?.setAttribute("aria-hidden", "false");

  setTimeout(() => novaUsername?.focus(), 120);
}

const savedNovaUser = sessionStorage.getItem("novaUser");

if (savedNovaUser) {
  unlockNova();
} else {
  lockNova();
}

novaAuthForm?.addEventListener("submit", event => {
  event.preventDefault();

  const username = novaUsername?.value.trim();
  const password = novaPassword?.value.trim();

  if (!username || !password) {
    if (novaAuthMessage) {
      novaAuthMessage.textContent = "Enter username and password.";
    }
    return;
  }

  // Prototype session only. Password is intentionally never stored.
  sessionStorage.setItem("novaUser", username);

  if (novaAuthMessage) {
    novaAuthMessage.textContent = `Welcome, ${username}!`;
  }

  if (novaPassword) {
    novaPassword.value = "";
  }

  novaAuthOverlay?.classList.add("leaving");

  window.setTimeout(() => {
    unlockNova();
    if (novaAuthMessage) novaAuthMessage.textContent = "";
  }, 430);
});

})();
