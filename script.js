(() => {
  "use strict";

  const init = () => {
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [
      ...root.querySelectorAll(selector)
    ];

    // ========================================
    // REMOVE OLD SIGN-IN LOCK
    // ========================================

    document.body?.classList.remove("auth-locked");

    // ========================================
    // REMOVE DUPLICATE LISTEN TOGETHER ELEMENTS
    // ========================================

    [
      "listenTogetherBtn",
      "listenModal",
      "closeListenModal",
      "createRoomBtn",
      "joinRoomBtn",
      "roomCodeInput",
      "roomStatus"
    ].forEach(id => {
      const matches = $$(`#${id}`);
      matches.slice(1).forEach(element => element.remove());
    });

    // ========================================
    // PLAYER ELEMENTS
    // ========================================

    let audio = $("#audio");

    if (!audio) {
      audio = document.createElement("audio");
      audio.id = "audio";
      audio.preload = "metadata";
      audio.style.display = "none";
      document.body.appendChild(audio);
    }

    const playPause = $("#playPause");
    const previous = $("#previous");
    const next = $("#next");
    const shuffleBtn = $("#shuffleBtn");
    const repeatBtn = $("#repeatBtn");

    const progress = $("#progress");
    const volume = $("#volume");

    const currentTime = $("#currentTime");
    const duration = $("#duration");

    const songTitle = $("#songTitle");
    const artistName = $("#artistName");

    const albumCover = $("#albumCover");
    const albumDisc = $(".album");

    const visualizer = $("#visualizer");
    const playerCard = $("#playerCard");

    // ========================================
    // ALBUM BROWSER
    // ========================================

    const selectedAlbumCover = $("#selectedAlbumCover");
    const selectedAlbumTitle = $("#selectedAlbumTitle");
    const selectedAlbumArtist = $("#selectedAlbumArtist");
    const selectedAlbumCount = $("#selectedAlbumCount");
    const albumSongList = $("#albumSongList");

    // ========================================
    // LIKED SONGS
    // ========================================

    const likedSongsList = $("#likedSongsList");
    const likedCount = $("#likedCount");

    // ========================================
    // SEARCH
    // ========================================

    const searchToggle = $("#searchToggle");
    const musicSearch = $("#musicSearch");
    const musicSearchInput = $("#musicSearchInput");
    const searchResults = $("#searchResults");
    const searchClose = $("#searchClose");

    // ========================================
    // MINI PLAYER
    // ========================================

    const miniPlayer = $("#miniPlayer");
    const miniCover = $("#miniCover");
    const miniTitle = $("#miniTitle");
    const miniArtist = $("#miniArtist");

    const miniPlayPause = $("#miniPlayPause");
    const miniNext = $("#miniNext");
    const miniQueueBtn = $("#miniQueueBtn");
    const miniOpenPlayer = $("#miniOpenPlayer");

    // ========================================
    // QUEUE
    // ========================================

    const queuePanel = $("#queuePanel");
    const queueBackdrop = $("#queueBackdrop");
    const queueClose = $("#queueClose");
    const queueList = $("#queueList");
    const queueAlbumTitle = $("#queueAlbumTitle");
    const openQueueMain = $("#openQueueMain");

    const cards = $$(".song-card");

    // ========================================
    // SONG DATA
    // ========================================

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
            title: "songs1.1/The Breakup",
            artist: "Arijit Singh",
            audio: "songs1.1/Desi Heats-02.mp3"
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
          },
          {
             title: "Ainvayi Ainvayi",
             artist: "Sunidhi Chauhan",
            audio: "songs1.2/Desi-Heats-08.mp3"
          },
          {
             title: "Sweety Tera Drama",
             artist: "Rajkummar Tanishk Pawni",
            audio: "songs1.2/Desi-Heats-09.mp3"
          },
          {
             title: "Tumhi Ho Bandhu",
             artist: "Pritam",
            audio: "songs1.2/Desi-Heats-10.mp3"
          },
        ]   
      },

      {
        title: "Midnight City",
        artist: "Lunar",
        cover: "images/cover2.jpg",

        tracks: [
          {
            title: "BINDING LIGHTS",
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
            title: "positions",
            artist: "Ariana Grande",
            audio: "songs2/midnight-04.mp3"
          },
          {
            title: "Into It",
            artist: "Chase Atlantic",
            audio: "songs2.1/midnight-05.mp3"
          },
          {
            title: "SWIM",
            artist: "Chase Atlantic",
            audio: "songs2.1/midnight-06.mp3"
          },
          {
            title: "City Sleeps",
            artist: "Lunar",
            audio: "songs2.1/midnight-07.mp3"
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
            artist: "Maanu x Annural Khali",
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

    // ========================================
    // PLAYER STATE
    // ========================================

    let currentAlbum = 0;
    let currentSong = 0;
    let isPlaying = false;
    let shuffleEnabled = false;
    let repeatMode = "off";

    const modeTools = window.NovaPlayerModes;

    if (!modeTools) {
      throw new Error("NOVA: player-modes.js failed to load");
    }

    const getActiveAlbum = () => albums[currentAlbum];

    const getActiveTracks = () => {
      return getActiveAlbum().tracks;
    };

    // ========================================
    // TIME FORMAT
    // ========================================

    function formatTime(seconds) {
      const value = Number(seconds);

      if (!Number.isFinite(value) || value < 0) {
        return "0:00";
      }

      const minutes = Math.floor(value / 60);

      const secondsLeft = Math.floor(value % 60)
        .toString()
        .padStart(2, "0");

      return `${minutes}:${secondsLeft}`;
    }

    // ========================================
    // PLAYER UI
    // ========================================

    function setPlayingUI(state) {
      isPlaying = state;

      if (playPause) {
        playPause.textContent = state ? "❚❚" : "▶";
      }

      if (miniPlayPause) {
        miniPlayPause.textContent = state ? "❚❚" : "▶";
      }

      albumDisc?.classList.toggle(
        "playing",
        state
      );

      visualizer?.classList.toggle(
        "active",
        state
      );

      playerCard?.classList.toggle(
        "playing",
        state
      );

      miniPlayer?.classList.add("visible");
    }

    function updateModeUI() {
      if (shuffleBtn) {
        shuffleBtn.classList.toggle("active", shuffleEnabled);
        shuffleBtn.setAttribute("aria-pressed", String(shuffleEnabled));
        shuffleBtn.setAttribute(
          "aria-label",
          shuffleEnabled ? "Shuffle on" : "Shuffle off"
        );
        shuffleBtn.title = shuffleEnabled ? "Shuffle on" : "Shuffle off";
      }

      if (repeatBtn) {
        const repeatActive = repeatMode !== "off";
        repeatBtn.classList.toggle("active", repeatActive);
        repeatBtn.classList.toggle("repeat-one", repeatMode === "one");
        repeatBtn.setAttribute("aria-pressed", String(repeatActive));
        repeatBtn.textContent = repeatMode === "one" ? "🔂" : "🔁";
        repeatBtn.setAttribute(
          "aria-label",
          repeatMode === "one"
            ? "Repeat one"
            : repeatMode === "all"
              ? "Repeat all"
              : "Repeat off"
        );
        repeatBtn.title =
          repeatMode === "one"
            ? "Repeat one"
            : repeatMode === "all"
              ? "Repeat all"
              : "Repeat off";
      }
    }

    function goToNextTrack(fromEnded = false) {
      const tracks = getActiveTracks();
      const nextIndex = modeTools.getNextTrackIndex({
        currentIndex: currentSong,
        trackCount: tracks.length,
        shuffle: shuffleEnabled,
        repeatMode,
        fromEnded
      });

      if (nextIndex === null) {
        setPlayingUI(false);
        return false;
      }

      loadSong(nextIndex);
      playSong();
      return true;
    }

    function updateSelectedCard() {
      cards.forEach((card, index) => {
        card.classList.toggle(
          "selected",
          index === currentAlbum
        );
      });
    }

    function updateSelectedTrack() {
      $$(
        ".album-track",
        albumSongList || document
      ).forEach((row, index) => {
        row.classList.toggle(
          "active",
          index === currentSong
        );
      });
    }

    function updateMiniPlayer() {
      const activeAlbum = getActiveAlbum();
      const track =
        getActiveTracks()[currentSong];

      if (!track) {
        return;
      }

      if (miniCover) {
        miniCover.src =
          track.cover ||
          activeAlbum.cover;
      }

      if (miniTitle) {
        miniTitle.textContent =
          track.title;
      }

      if (miniArtist) {
        miniArtist.textContent =
          track.artist;
      }

      if (miniPlayPause) {
        miniPlayPause.textContent =
          isPlaying ? "❚❚" : "▶";
      }
    }

    // ========================================
    // LIKED SONGS
    // ========================================

    let likedSongIds = [];

    try {
      likedSongIds =
        JSON.parse(
          localStorage.getItem(
            "novaLikedSongs"
          )
        ) || [];
    } catch {
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

    function saveLikes() {
      localStorage.setItem(
        "novaLikedSongs",
        JSON.stringify(
          likedSongIds
        )
      );
    }

    function toggleLike(
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
            item => item !== id
          );
      } else {
        likedSongIds.push(id);
      }

      saveLikes();
      renderAlbumSongs();
      renderLikedSongs();
    }

    function renderLikedSongs() {
      if (!likedSongsList) {
        return;
      }

      const items =
        likedSongIds
          .map(id => {
            const [
              albumIndex,
              trackIndex
            ] =
              id
                .split(":")
                .map(Number);

            const activeAlbum =
              albums[albumIndex];

            const track =
              activeAlbum
                ?.tracks[
                  trackIndex
                ];

            if (
              !activeAlbum ||
              !track
            ) {
              return null;
            }

            return {
              albumIndex,
              trackIndex,
              album: activeAlbum,
              track
            };
          })
          .filter(Boolean);

      if (likedCount) {
        likedCount.textContent =
          `${items.length} ${
            items.length === 1
              ? "song"
              : "songs"
          }`;
      }

      if (!items.length) {
        likedSongsList.innerHTML = `
          <div class="liked-empty">
            <div class="liked-empty-heart">♡</div>
            <h3>No liked songs yet</h3>
            <p>
              Tap the heart beside a song
              and it will appear here.
            </p>
          </div>
        `;

        return;
      }

      likedSongsList.innerHTML =
        items
          .map(
            (item, index) => `
              <div
                class="liked-song"
                data-album-index="${item.albumIndex}"
                data-track-index="${item.trackIndex}"
              >
                <span class="liked-number">
                  ${String(index + 1).padStart(2, "0")}
                </span>

                <img
                  class="liked-cover"
                  src="${item.track.cover || item.album.cover}"
                  alt="${item.track.title}"
                >

                <span class="liked-song-info">
                  <strong>
                    ${item.track.title}
                  </strong>

                  <small>
                    ${item.track.artist}
                  </small>
                </span>

                <span class="liked-album-name">
                  ${item.album.title}
                </span>

                <button
                  class="liked-remove"
                  type="button"
                >
                  ♥
                </button>
              </div>
            `
          )
          .join("");
    }

    // ========================================
    // RENDER ALBUM SONGS
    // ========================================

    function renderAlbumSongs() {
      const activeAlbum =
        getActiveAlbum();

      const tracks =
        activeAlbum.tracks;

      if (selectedAlbumCover) {
        selectedAlbumCover.src =
          activeAlbum.cover;
      }

      if (selectedAlbumTitle) {
        selectedAlbumTitle.textContent =
          activeAlbum.title;
      }

      if (selectedAlbumArtist) {
        selectedAlbumArtist.textContent =
          activeAlbum.artist;
      }

      if (selectedAlbumCount) {
        selectedAlbumCount.textContent =
          `${tracks.length} TRACKS`;
      }

      if (!albumSongList) {
        return;
      }

      albumSongList.innerHTML =
        tracks
          .map((track, index) => {
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
                  ${String(index + 1).padStart(2, "0")}
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
          })
          .join("");
    }

    // ========================================
    // LOAD SONG
    // ========================================

    function loadSong(index) {
      const tracks =
        getActiveTracks();

      if (!tracks.length) {
        return;
      }

      currentSong =
        (
          index +
          tracks.length
        ) %
        tracks.length;

      const track =
        tracks[currentSong];

      const activeAlbum =
        getActiveAlbum();

      audio.pause();

      audio.src =
        track.audio;

      audio.load();

      if (songTitle) {
        songTitle.textContent =
          track.title;
      }

      if (artistName) {
        artistName.textContent =
          track.artist;
      }

      if (albumCover) {
        albumCover.src =
          track.cover ||
          activeAlbum.cover;

        albumCover.style.opacity =
          "1";
      }

      if (progress) {
        progress.value = 0;
      }

      if (currentTime) {
        currentTime.textContent =
          "0:00";
      }

      if (duration) {
        duration.textContent =
          "0:00";
      }

      setPlayingUI(false);

      updateSelectedCard();
      updateSelectedTrack();
      updateMiniPlayer();
      renderQueue();
    }

    // ========================================
    // PLAY / PAUSE
    // ========================================

    async function playSong() {
      try {
        await audio.play();

        setPlayingUI(true);

        return true;
      } catch (error) {
        setPlayingUI(false);

        console.info(
          "NOVA: audio could not play.",
          error
        );

        return false;
      }
    }

    function pauseSong() {
      audio.pause();
      setPlayingUI(false);
    }

    // ========================================
    // SELECT ALBUM
    // ========================================

    function selectAlbum(
      index,
      autoplay = false
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

      renderAlbumSongs();

      updateSelectedCard();

      loadSong(0);

      if (autoplay) {
        playSong();
      }
    }

    // ========================================
    // QUEUE
    // ========================================

    function renderQueue() {
      if (!queueList) {
        return;
      }

      const activeAlbum =
        getActiveAlbum();

      const tracks =
        getActiveTracks();

      if (queueAlbumTitle) {
        queueAlbumTitle.textContent =
          activeAlbum.title;
      }

      const order =
        tracks.map(
          (_, offset) =>
            (
              currentSong +
              offset
            ) %
            tracks.length
        );

      queueList.innerHTML =
        order
          .map(
            (
              trackIndex,
              position
            ) => {
              const track =
                tracks[
                  trackIndex
                ];

              return `
                <button
                  class="queue-item${
                    position === 0
                      ? " current"
                      : ""
                  }"
                  type="button"
                  data-track-index="${trackIndex}"
                >
                  <span class="queue-number">
                    ${String(trackIndex + 1).padStart(2, "0")}
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
                      position === 0
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

    // ========================================
    // SEARCH
    // ========================================

    let currentSearchResults = [];

    function closeSearch() {
      musicSearch
        ?.classList
        .remove("open");

      searchToggle
        ?.setAttribute(
          "aria-expanded",
          "false"
        );
    }

    function openSearch() {
      musicSearch
        ?.classList
        .add("open");

      searchToggle
        ?.setAttribute(
          "aria-expanded",
          "true"
        );

      setTimeout(
        () =>
          musicSearchInput
            ?.focus(),
        80
      );
    }

    function renderSearchResults() {
      if (!searchResults) {
        return;
      }

      if (
        !currentSearchResults.length
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
            ) => `
              <button
                class="search-result-item"
                type="button"
                data-search-index="${index}"
              >
                <img
                  class="search-result-cover"
                  src="${result.cover}"
                  alt=""
                >

                <span class="search-result-info">
                  <strong>
                    ${result.title}
                  </strong>

                  <small>
                    ${result.subtitle}
                  </small>
                </span>

                <span class="search-result-type">
                  ${result.type.toUpperCase()}
                </span>
              </button>
            `
          )
          .join("");
    }

    function searchMusic(query) {
      const term =
        query
          .trim()
          .toLowerCase();

      if (!term) {
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
          activeAlbum,
          albumIndex
        ) => {
          const albumText =
            `${activeAlbum.title} ${activeAlbum.artist}`
              .toLowerCase();

          if (
            albumText.includes(term)
          ) {
            results.push({
              type: "album",
              albumIndex,
              title:
                activeAlbum.title,
              subtitle:
                `${activeAlbum.artist} • Album`,
              cover:
                activeAlbum.cover
            });
          }

          activeAlbum
            .tracks
            .forEach(
              (
                track,
                trackIndex
              ) => {
                const trackText =
                  `${track.title} ${track.artist} ${activeAlbum.title}`
                    .toLowerCase();

                if (
                  trackText.includes(
                    term
                  )
                ) {
                  results.push({
                    type: "track",
                    albumIndex,
                    trackIndex,
                    title:
                      track.title,
                    subtitle:
                      `${track.artist} • ${activeAlbum.title}`,
                    cover:
                      track.cover ||
                      activeAlbum.cover
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

    // ========================================
    // PLAYER EVENTS
    // ========================================

    shuffleBtn
      ?.addEventListener(
        "click",
        () => {
          shuffleEnabled = !shuffleEnabled;
          updateModeUI();
        }
      );

    repeatBtn
      ?.addEventListener(
        "click",
        () => {
          repeatMode = modeTools.cycleRepeatMode(repeatMode);
          updateModeUI();
        }
      );

    playPause
      ?.addEventListener(
        "click",
        () => {
          if (isPlaying) {
            pauseSong();
          } else {
            playSong();
          }
        }
      );

    miniPlayPause
      ?.addEventListener(
        "click",
        () => {
          if (isPlaying) {
            pauseSong();
          } else {
            playSong();
          }
        }
      );

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
          goToNextTrack(false);
        }
      );

    miniNext
      ?.addEventListener(
        "click",
        () => {
          goToNextTrack(false);
        }
      );

    // ========================================
    // PROGRESS
    // ========================================

    progress
      ?.addEventListener(
        "input",
        () => {
          if (
            !Number.isFinite(
              audio.duration
            ) ||
            audio.duration <= 0
          ) {
            return;
          }

          audio.currentTime =
            (
              Number(
                progress.value
              ) /
              100
            ) *
            audio.duration;
        }
      );

    // ========================================
    // VOLUME
    // ========================================

    volume
      ?.addEventListener(
        "input",
        () => {
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

    audio.volume =
      Number(
        volume?.value
      ) ||
      0.7;

    // ========================================
    // AUDIO EVENTS
    // ========================================

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

        if (progress) {
          progress.value =
            (
              audio.currentTime /
              audio.duration
            ) *
            100;
        }

        if (currentTime) {
          currentTime.textContent =
            formatTime(
              audio.currentTime
            );
        }

        if (duration) {
          duration.textContent =
            formatTime(
              audio.duration
            );
        }
      }
    );

    audio.addEventListener(
      "loadedmetadata",
      () => {
        if (duration) {
          duration.textContent =
            formatTime(
              audio.duration
            );
        }
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
        goToNextTrack(true);
      }
    );

    audio.addEventListener(
      "error",
      () => {
        setPlayingUI(false);

        console.warn(
          "NOVA: audio file failed to load:",
          audio.currentSrc ||
          audio.src
        );
      }
    );

    // ========================================
    // ALBUM CARD EVENTS
    // ========================================

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

        card.addEventListener(
          "click",
          () => {
            selectAlbum(
              index,
              false
            );

            $("#album-tracks")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });
          }
        );

        $(".card-play", card)
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
                  behavior: "smooth",
                  block: "center"
                });
            }
          );
      }
    );

    // ========================================
    // ALBUM SONG CLICK / LIKE
    // ========================================

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

            const index =
              Number(
                likeButton
                  .dataset
                  .likeIndex
              );

            if (
              Number.isInteger(index)
            ) {
              toggleLike(
                currentAlbum,
                index
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
              row
                .dataset
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
              behavior: "smooth",
              block: "center"
            });
        }
      );

    // ========================================
    // LIKED SONG EVENTS
    // ========================================

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
              row
                .dataset
                .albumIndex
            );

          const trackIndex =
            Number(
              row
                .dataset
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

            toggleLike(
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
              behavior: "smooth",
              block: "center"
            });
        }
      );

    // ========================================
    // QUEUE EVENTS
    // ========================================

    queueList
      ?.addEventListener(
        "click",
        event => {
          const item =
            event.target.closest(
              ".queue-item"
            );

          if (!item) {
            return;
          }

          const index =
            Number(
              item
                .dataset
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
          } else {
            openQueue();
          }
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

    miniOpenPlayer
      ?.addEventListener(
        "click",
        () => {
          $("#player")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
        }
      );

    // ========================================
    // SEARCH EVENTS
    // ========================================

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
            closeSearch();
          } else {
            openSearch();
          }
        }
      );

    searchClose
      ?.addEventListener(
        "click",
        closeSearch
      );

    searchResults
      ?.addEventListener(
        "click",
        event => {
          const button =
            event.target.closest(
              ".search-result-item"
            );

          if (!button) {
            return;
          }

          const result =
            currentSearchResults[
              Number(
                button
                  .dataset
                  .searchIndex
              )
            ];

          if (!result) {
            return;
          }

          if (
            result.type ===
            "album"
          ) {
            selectAlbum(
              result.albumIndex,
              false
            );

            $("#album-tracks")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });
          } else {
            selectAlbum(
              result.albumIndex,
              false
            );

            loadSong(
              result.trackIndex
            );

            playSong();

            $("#player")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });
          }

          closeSearch();
        }
      );

    document.addEventListener(
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
          closeSearch();
        }
      }
    );

    document.addEventListener(
      "keydown",
      event => {
        if (
          event.key ===
          "Escape"
        ) {
          closeSearch();

          closeQueue();

          const modal =
            $("#listenModal");

          if (modal) {
            modal.style.display =
              "none";
          }
        }
      }
    );

    // ========================================
    // ACTIVE NAVIGATION
    // ========================================

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

    window.addEventListener(
      "scroll",
      updateNavigation,
      {
        passive: true
      }
    );

    // ========================================
    // STARS
    // ========================================

    const stars =
      $("#stars");

    if (
      stars &&
      !stars.children.length
    ) {
      const count =
        window
          .matchMedia(
            "(max-width: 900px)"
          )
          .matches
          ? 8
          : 18;

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const star =
          document
            .createElement(
              "span"
            );

        star.style.left =
          `${Math.random() * 100}%`;

        star.style.top =
          `${Math.random() * 100}%`;

        star.style
          .setProperty(
            "--star-speed",
            `${
              3.5 +
              Math.random() *
                5
            }s`
          );

        star.style
          .setProperty(
            "--star-delay",
            `${
              -Math.random() *
              6
            }s`
          );

        stars.appendChild(
          star
        );
      }
    }

    // ========================================
    // PARTICLES
    // ========================================

    const particles =
      $("#particles");

    if (
      particles &&
      !particles.children.length
    ) {
      const count =
        window
          .matchMedia(
            "(max-width: 900px)"
          )
          .matches
          ? 5
          : 10;

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const particle =
          document
            .createElement(
              "span"
            );

        particle.style.left =
          `${
            Math.random() *
            100
          }%`;

        particle.style.top =
          `${
            12 +
            Math.random() *
              88
          }%`;

        particle.style
          .setProperty(
            "--particle-size",
            `${
              1.6 +
              Math.random() *
                2.2
            }px`
          );

        particle.style
          .setProperty(
            "--particle-speed",
            `${
              9 +
              Math.random() *
                9
            }s`
          );

        particle.style
          .setProperty(
            "--particle-delay",
            `${
              -Math.random() *
              12
            }s`
          );

        particle.style
          .setProperty(
            "--particle-x",
            `${
              -38 +
              Math.random() *
                76
            }px`
          );

        particles.appendChild(
          particle
        );
      }
    }

    // ========================================
    // CURSOR GLOW
    // ========================================

    const cursorGlow =
      $("#cursorGlow");

    const cursorAllowed =
      window.matchMedia(
        "(hover:hover) and (pointer:fine)"
      );

    if (
      cursorGlow &&
      cursorAllowed.matches
    ) {
      window.addEventListener(
        "pointermove",
        event => {
          cursorGlow.style.opacity =
            "1";

          cursorGlow.style.transform =
            `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        },
        {
          passive: true
        }
      );

      document.addEventListener(
        "mouseleave",
        () => {
          cursorGlow.style.opacity =
            "0";
        }
      );
    }
    // ========================================
// LISTEN TOGETHER - TWO WAY CONTROL
// ========================================

let socket = null;
let currentRoom = null;
let applyingRemoteSync = false;
let socketListenersReady = false;
let lastServerVersion = 0;

const listenTogetherBtn = document.getElementById("listenTogetherBtn");
const listenModal = document.getElementById("listenModal");
const closeListenModal = document.getElementById("closeListenModal");
const createRoomBtn = document.getElementById("createRoomBtn");
const joinRoomBtn = document.getElementById("joinRoomBtn");
const roomCodeInput = document.getElementById("roomCodeInput");
const roomStatus = document.getElementById("roomStatus");
const syncIndicator = document.getElementById("syncIndicator");
const syncStatusText = document.getElementById("syncStatusText");
let hasConnectedOnce = false;

function setSyncIndicator(state, text) {
    if (!syncIndicator || !syncStatusText) {
        return;
    }

    syncIndicator.dataset.state = state;
    syncIndicator.classList.toggle(
        "visible",
        state !== "idle"
    );
    syncStatusText.textContent = text;
}

function setRoomStatus(message) {
    if (roomStatus) {
        roomStatus.innerHTML = message;
    }
}

function connectSocket() {
    if (typeof io === "undefined") {
        console.error("Socket.IO not loaded");
        setRoomStatus("Connection failed");
        return null;
    }

    if (!socket) {
        socket = io();
    }

    registerSocketListeners(socket);

    return socket;
}

function sendPlayerState() {
    if (
        applyingRemoteSync ||
        !currentRoom
    ) {
        return;
    }

    const activeSocket = connectSocket();

    if (!activeSocket) {
        return;
    }

    const state = {
        room: currentRoom,
        albumIndex: currentAlbum,
        songIndex: currentSong,
        currentTime:
            Number.isFinite(audio?.currentTime)
                ? audio.currentTime
                : 0,
        isPlaying:
            Boolean(
                isPlaying &&
                audio &&
                !audio.paused
            ),
        shuffle: shuffleEnabled,
        repeatMode
    };

    console.log("STATE SENT:", state);

    activeSocket.emit(
        "player-state",
        state
    );
}

async function applyRemoteState(data) {
    const albumIndex =
        Number(data.albumIndex);

    const songIndex =
        Number(data.songIndex);

    const remoteTime =
        Number(data.currentTime);

    shuffleEnabled = Boolean(data.shuffle);
    repeatMode = modeTools.normalizeRepeatMode(data.repeatMode);
    updateModeUI();

    const validTrack =
        Number.isInteger(albumIndex) &&
        Number.isInteger(songIndex) &&
        albums[albumIndex] &&
        albums[albumIndex].tracks[songIndex];

    if (!validTrack) {
        console.warn(
            "Invalid remote state:",
            data
        );

        return;
    }

    applyingRemoteSync = true;

    try {
        const songChanged =
            currentAlbum !== albumIndex ||
            currentSong !== songIndex;

        // ========================================
        // SYNC ALBUM + SONG
        // ========================================

        if (songChanged) {
            currentAlbum =
                albumIndex;

            document.body.dataset.theme =
                albums[currentAlbum].theme ||
                "default";

            renderAlbumSongs();
            updateSelectedCard();

            loadSong(songIndex);

            await new Promise(resolve => {
                if (
                    !audio ||
                    audio.readyState >= 1
                ) {
                    resolve();
                    return;
                }

                let finished = false;

                const finish = () => {
                    if (finished) {
                        return;
                    }

                    finished = true;

                    clearTimeout(timer);

                    resolve();
                };

                const timer =
                    setTimeout(
                        finish,
                        900
                    );

                audio.addEventListener(
                    "loadedmetadata",
                    finish,
                    {
                        once: true
                    }
                );
            });
        }

        // ========================================
        // SYNC TIME / SEEK / REWIND
        // ========================================

        if (
            audio &&
            Number.isFinite(remoteTime) &&
            remoteTime >= 0
        ) {
            const timeDifference =
                Math.abs(
                    audio.currentTime -
                    remoteTime
                );

            if (timeDifference > 0.35) {
                try {
                    audio.currentTime =
                        remoteTime;
                } catch (error) {
                    console.log(
                        "Remote seek failed:",
                        error
                    );
                }
            }
        }

        // ========================================
        // SYNC PLAY / PAUSE
        // ========================================

        if (data.isPlaying) {
            try {
                await playSong();
            } catch (error) {
                console.log(
                    "Remote play blocked:",
                    error
                );
            }
        } else {
            pauseSong();
        }
    } finally {
        setTimeout(() => {
            applyingRemoteSync =
                false;
        }, 200);
    }
}

function registerSocketListeners(activeSocket) {
    if (
        !activeSocket ||
        socketListenersReady
    ) {
        return;
    }

    socketListenersReady = true;

    activeSocket.on(
        "connect",
        () => {
            console.log(
                "Listen Together connected:",
                activeSocket.id
            );

            if (hasConnectedOnce && currentRoom) {
                activeSocket.emit(
                    "join-room",
                    currentRoom
                );
            }

            hasConnectedOnce = true;

            if (currentRoom) {
                setSyncIndicator(
                    "synced",
                    "Synced"
                );
            }
        }
    );

    activeSocket.on(
        "connect_error",
        error => {
            console.error(
                "Socket connection failed:",
                error
            );

            setRoomStatus(
                "Connection failed"
            );

            if (currentRoom) {
                setSyncIndicator(
                    "reconnecting",
                    "Reconnecting…"
                );
            }
        }
    );

    activeSocket.on(
        "disconnect",
        () => {
            console.log(
                "Listen Together disconnected"
            );

            if (currentRoom) {
                setSyncIndicator(
                    "reconnecting",
                    "Reconnecting…"
                );
            }
        }
    );

    activeSocket.on(
        "player-state",
        async data => {
            if (
                !currentRoom ||
                !data
            ) {
                return;
            }

            if (
                String(data.room)
                    .toUpperCase() !==
                currentRoom
            ) {
                return;
            }

            const version =
                Number(data.version) || 0;

            // Ignore old events
            if (
                version <=
                lastServerVersion
            ) {
                return;
            }

            lastServerVersion =
                version;

            // This is our own action returning from server.
            // No need to apply it again.
            if (
                data.sourceId ===
                activeSocket.id
            ) {
                return;
            }

            console.log(
                "STATE RECEIVED:",
                data
            );

            await applyRemoteState(
                data
            );
        }
    );
}

// ========================================
// OPEN MODAL
// ========================================

listenTogetherBtn?.addEventListener(
    "click",
    () => {
        if (listenModal) {
            listenModal.style.display =
                "flex";
        }
    }
);

// ========================================
// CLOSE MODAL
// ========================================

closeListenModal?.addEventListener(
    "click",
    () => {
        if (listenModal) {
            listenModal.style.display =
                "none";
        }
    }
);

listenModal?.addEventListener(
    "click",
    event => {
        if (
            event.target ===
            listenModal
        ) {
            listenModal.style.display =
                "none";
        }
    }
);

// ========================================
// CREATE ROOM
// ========================================

createRoomBtn?.addEventListener(
    "click",
    () => {
        const activeSocket =
            connectSocket();

        if (!activeSocket) {
            return;
        }

        currentRoom =
            `NOVA${
                Math.floor(
                    1000 +
                    Math.random() *
                    9000
                )
            }`;

        lastServerVersion = 0;

        setSyncIndicator(
            activeSocket.connected ? "synced" : "connecting",
            activeSocket.connected ? "Synced" : "Connecting…"
        );

        activeSocket.emit(
            "join-room",
            currentRoom
        );

        setRoomStatus(
            `Room created 🎧<br>
            <strong>${currentRoom}</strong><br>
            Both listeners can control playback`
        );

        // Save creator's current state
        setTimeout(
            sendPlayerState,
            150
        );
    }
);

// ========================================
// JOIN ROOM
// ========================================

joinRoomBtn?.addEventListener(
    "click",
    () => {
        const roomCode =
            roomCodeInput
                ?.value
                .trim()
                .toUpperCase();

        if (!roomCode) {
            setRoomStatus(
                "Enter a room code"
            );

            return;
        }

        const activeSocket =
            connectSocket();

        if (!activeSocket) {
            return;
        }

        currentRoom =
            roomCode;

        lastServerVersion = 0;

        setSyncIndicator(
            activeSocket.connected ? "synced" : "connecting",
            activeSocket.connected ? "Synced" : "Connecting…"
        );

        activeSocket.emit(
            "join-room",
            currentRoom
        );

        setRoomStatus(
            `Connected 🎧<br>
            <strong>${currentRoom}</strong><br>
            Both listeners can control playback`
        );
    }
);

// ========================================
// PLAY SYNC
// ========================================

audio?.addEventListener(
    "play",
    () => {
        if (!applyingRemoteSync) {
            setTimeout(
                sendPlayerState,
                20
            );
        }
    }
);

// ========================================
// PAUSE SYNC
// ========================================

audio?.addEventListener(
    "pause",
    () => {
        if (!applyingRemoteSync) {
            setTimeout(
                sendPlayerState,
                20
            );
        }
    }
);

// ========================================
// SEEK / REWIND SYNC
// ========================================

audio?.addEventListener(
    "seeked",
    () => {
        if (
            !applyingRemoteSync &&
            currentRoom
        ) {
            setTimeout(
                sendPlayerState,
                20
            );
        }
    }
);

// ========================================
// NEXT / PREVIOUS / SONG / ALBUM SYNC
// ========================================

const syncControls =
    "#shuffleBtn, " +
    "#repeatBtn, " +
    "#previous, " +
    "#next, " +
    "#miniNext, " +
    ".album-track, " +
    ".queue-item, " +
    ".liked-song, " +
    ".card-play, " +
    ".song-card";

document.addEventListener(
    "click",
    event => {
        if (
            applyingRemoteSync ||
            !currentRoom
        ) {
            return;
        }

        // Like button does not control playback
        if (
            event.target.closest(
                ".track-like, .liked-remove"
            )
        ) {
            return;
        }

        const control =
            event.target.closest(
                syncControls
            );

        if (!control) {
            return;
        }

        // Existing player click handler runs first.
        // Then send the updated state.
        setTimeout(
            sendPlayerState,
            120
        );
    });

    // ========================================
    // INITIAL LOAD
    // ========================================

    updateModeUI();
    selectAlbum(0, false);
    renderLikedSongs();
    renderQueue();
    updateNavigation();
    miniPlayer?.classList.add("visible");
  };

  // ========================================
  // START APP
  // ========================================

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
