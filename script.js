(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

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

  // Album browser
  const selectedAlbumCover = $("#selectedAlbumCover");
  const selectedAlbumTitle = $("#selectedAlbumTitle");
  const selectedAlbumArtist = $("#selectedAlbumArtist");
  const selectedAlbumCount = $("#selectedAlbumCount");
  const albumSongList = $("#albumSongList");

  // ============================
// LIKED SONG ELEMENTS
// ============================

const likedSongsList =
    $("#likedSongsList");

const likedCount =
    $("#likedCount");

// ============================
// SEARCH ELEMENTS
// ============================

const searchToggle =
    $("#searchToggle");

const musicSearch =
    $("#musicSearch");

const musicSearchInput =
    $("#musicSearchInput");

const searchResults =
    $("#searchResults");

const searchClose =
    $("#searchClose");
  // Floating Now Playing
  const miniPlayer = $("#miniPlayer");
  const miniCover = $("#miniCover");
  const miniTitle = $("#miniTitle");
  const miniArtist = $("#miniArtist");
  const miniPlayPause = $("#miniPlayPause");
  const miniNext = $("#miniNext");
  const miniQueueBtn = $("#miniQueueBtn");
  const miniOpenPlayer = $("#miniOpenPlayer");

  // Queue
  const queuePanel = $("#queuePanel");
  const queueBackdrop = $("#queueBackdrop");
  const queueClose = $("#queueClose");
  const queueList = $("#queueList");
  const queueAlbumTitle = $("#queueAlbumTitle");
  const openQueueMain = $("#openQueueMain");

  const cards = $$(".song-card");

  // ============================
  // ALBUM + SONG DATA
  // ============================
  // Add/remove as many tracks as you want inside each album's "tracks" array.
  // Change title, artist and audio path for your real songs.

  const albums = [
    {
      title: "Desi Heats",
      artist: "Nova",
      cover: "images/cover1.jpg",
      tracks: [
        { title: "Pyaar hota kahi baar hai", artist: "Arijit Singh", audio: "songs/Desi Heats-01.mp3" },
        { title: "Afterglow", artist: "Nova", audio: "songs/Desi Heats-02.mp3" },
        { title: "Abhi Toh Party", artist: "Badsha", audio: "songs/Desi Heats-03.mp3" },
        { title: "Saree ka Falsa", artist: "Antara mitra", audio: "songs/Desi Heats-04.mp3" },
        { title: "Kala Chasma", artist: "Amar arshi", audio: "songs/Desi Heats-05.mp3" },
        { title: "Desi Girl", artist: "Vishal", audio: "songs/Desi Heats-06.mp3" },
        { title: "No LOve", artist: "Garry", audio: "songs/Desi Heats-07.mp3" }
      ]
    },
    {
      title: "Midnight City",
      artist: "Lunar",
      cover: "images/cover2.jpg",
      tracks: [
        { title: "Midnight City", artist: "The Weeknd", audio: "songs/song2.mp3" },
        { title: "Normal", artist: "BTS", audio: "songs/midnight-02.mp3" },
        { title: "Party All Night", artist: "HONEY SINGH", audio: "songs/midnight-03.mp3" },
        { title: "Party All Night", artist: "HONEY SINGH", audio: "songs/midnight-04.mp3" },
        { title: "Streetlights", artist: "Lunar", audio: "songs/midnight-05.mp3" },
        { title: "Violet Roads", artist: "Lunar", audio: "songs/midnight-06.mp3" },
        { title: "City Sleeps", artist: "Lunar", audio: "songs/midnight-07.mp3" }
      ]
    },
    {
      title: "Paradise",
      artist: "Echo",
      cover: "images/cover3.jpg",
      theme: "paradise",
      tracks: [
        { title: "Paradise", artist: "Echo", audio: "songs/song3.mp3" },
        { title: "Golden Air", artist: "Echo", audio: "songs/paradise-02.mp3" },
        { title: "Sunroom", artist: "Echo", audio: "songs/paradise-03.mp3" },
        { title: "Open Water", artist: "Echo", audio: "songs/paradise-04.mp3" },
        { title: "Daydream", artist: "Echo", audio: "songs/paradise-05.mp3" },
        { title: "Wildflower", artist: "Echo", audio: "songs/paradise-06.mp3" },
        { title: "Home Again", artist: "Echo", audio: "songs/paradise-07.mp3" }
      ]
    },
    {
      title: "Ocean Dreams",
      artist: "Aurora",
      cover: "images/cover4.jpg",
      tracks: [
        { title: "Ocean Dreams", artist: "Aurora", audio: "songs/song4.mp3" },
        { title: "Tidal Blue", artist: "Aurora", audio: "songs/ocean-02.mp3" },
        { title: "Drift", artist: "Aurora", audio: "songs/ocean-03.mp3" },
        { title: "Salt & Stars", artist: "Aurora", audio: "songs/ocean-04.mp3" },
        { title: "Deep Current", artist: "Aurora", audio: "songs/ocean-05.mp3" },
        { title: "Shoreline", artist: "Aurora", audio: "songs/ocean-06.mp3" },
        { title: "Into the Blue", artist: "Aurora", audio: "songs/ocean-07.mp3" }
      ]
    }
  ];

  let currentAlbum = 0;
  let currentSong = 0;
  let isPlaying = false;
  let demoProgress = 0;
  let demoTimer = null;

  const getActiveAlbum = () => albums[currentAlbum];
  const getActiveTracks = () => getActiveAlbum().tracks;

  // ==================================
// LIKED SONGS
// ==================================


let likedSongIds = [];


/*
    Load saved likes
    from browser storage
*/

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



/*
    Every song gets a unique key
    using album index + track index.

    Example:
    Paradise song 2 = "2:1"
*/

function getSongId(
    albumIndex,
    trackIndex
) {

    return `${albumIndex}:${trackIndex}`;

}



/*
    Check whether song
    is already liked
*/

function isSongLiked(
    albumIndex,
    trackIndex
) {

    const id =
        getSongId(
            albumIndex,
            trackIndex
        );


    return likedSongIds
        .includes(id);

}



/*
    Save likes
*/

function saveLikedSongs() {

    localStorage.setItem(

        "novaLikedSongs",

        JSON.stringify(
            likedSongIds
        )

    );

}



/*
    LIKE / UNLIKE
*/

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
        likedSongIds
            .includes(id)
    ) {

        likedSongIds =
            likedSongIds
                .filter(
                    item =>
                        item !== id
                );

    }

    else {

        likedSongIds.push(id);

    }


    saveLikedSongs();


    /*
        Refresh both:
        current album list
        +
        liked playlist
    */

    renderAlbumSongs();

    renderLikedSongs();

}



/*
    Convert stored IDs
    back into actual songs
*/

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


            const album =
                albums[albumIndex];


            const track =
                album
                    ?.tracks[
                        trackIndex
                    ];


            if (
                !album ||
                !track
            ) {

                return null;

            }


            return {

                albumIndex,

                trackIndex,

                album,

                track

            };

        })

        .filter(Boolean);

}



/*
    DISPLAY LIKED PLAYLIST
*/

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



    /*
        EMPTY PLAYLIST
    */

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



    /*
        SONG LIST
    */

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
  // ==================================
// MUSIC SEARCH
// ==================================

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



/* ==================================
   SEARCH SONGS / ARTISTS / ALBUMS
================================== */

function searchMusic(query) {

    const searchTerm =
        query
            .trim()
            .toLowerCase();


    if (!searchTerm) {

        currentSearchResults = [];

        searchResults.innerHTML = `
            <div class="search-placeholder">
                Start typing to discover music.
            </div>
        `;

        return;
    }



    const results = [];



    albums.forEach(
        (
            album,
            albumIndex
        ) => {



            /* SEARCH ALBUM */

            const albumText =
                `
                    ${album.title}
                    ${album.artist}
                `
                    .toLowerCase();



            if (
                albumText.includes(
                    searchTerm
                )
            ) {

                results.push({

                    type:
                        "album",

                    albumIndex,

                    title:
                        album.title,

                    artist:
                        album.artist,

                    cover:
                        album.cover

                });

            }



            /* SEARCH TRACKS */

            album.tracks.forEach(
                (
                    track,
                    trackIndex
                ) => {



                    const trackText =
                        `
                            ${track.title}
                            ${track.artist}
                            ${album.title}
                        `
                            .toLowerCase();



                    if (
                        trackText.includes(
                            searchTerm
                        )
                    ) {

                        results.push({

                            type:
                                "track",

                            albumIndex,

                            trackIndex,

                            title:
                                track.title,

                            artist:
                                track.artist,

                            album:
                                album.title,

                            cover:
                                track.cover ||
                                album.cover

                        });

                    }

                }
            );

        }
    );



    /* Limit dropdown size */

    currentSearchResults =
        results.slice(
            0,
            10
        );



    renderSearchResults();

}



/* ==================================
   DISPLAY RESULTS
================================== */

function renderSearchResults() {

    if (!searchResults) {
        return;
    }



    if (
        currentSearchResults.length ===
        0
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

                        result.type ===
                        "album"

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
                                    result.type ===
                                    "album"
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



/* ==================================
   SEARCH INPUT
================================== */

musicSearchInput
    ?.addEventListener(
        "input",
        event => {

            searchMusic(
                event.target.value
            );

        }
    );



/* ==================================
   OPEN SEARCH
================================== */

searchToggle
    ?.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            if (
                musicSearch
                    ?.classList
                    .contains(
                        "open"
                    )
            ) {

                closeMusicSearch();

            }

            else {

                openMusicSearch();

            }

        }
    );



/* ==================================
   CLOSE SEARCH
================================== */

searchClose
    ?.addEventListener(
        "click",
        closeMusicSearch
    );



/* ==================================
   CLICK SEARCH RESULT
================================== */

searchResults
    ?.addEventListener(
        "click",
        event => {

            const resultButton =

                event.target
                    .closest(
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



            /* ALBUM RESULT */

            if (
                result.type ===
                "album"
            ) {

                selectAlbum(
                    result.albumIndex,
                    false
                );


                closeMusicSearch();


                $("#album-tracks")
                    ?.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "center"

                    });

            }



            /* SONG RESULT */

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

                        behavior:
                            "smooth",

                        block:
                            "center"

                    });

            }

        }
    );



/* ==================================
   ESC KEY
================================== */

document
    .addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeMusicSearch();

            }

        }
    );



/* ==================================
   CLICK OUTSIDE
================================== */

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

  // ============================
  // BASIC FUNCTIONS
  // ============================

  function setText(element, text) {
    if (element) element.textContent = text;
  }

  function formatTime(seconds) {
    const value = Number(seconds);
    if (!Number.isFinite(value) || value < 0) return "0:00";

    const minutes = Math.floor(value / 60);
    const secondsLeft = Math.floor(value % 60).toString().padStart(2, "0");
    return `${minutes}:${secondsLeft}`;
  }

  // ============================
  // ALBUM / TRACK UI
  // ============================

  function updateMiniPlayer() {

    const activeAlbum =
        getActiveAlbum();

    const track =
        getActiveTracks()[currentSong];


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


    /*
        Queue starts from the current track,
        then wraps through the rest of the album.
    */

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
                        tracks[trackIndex];


                    const current =
                        position === 0;


                    return `
                        <button
                            class="queue-item${current ? " current" : ""}"
                            type="button"
                            data-track-index="${trackIndex}"
                        >
                            <span class="queue-number">
                                ${String(trackIndex + 1).padStart(2, "0")}
                            </span>

                            <span class="queue-song">
                                <strong>${track.title}</strong>
                                <small>${track.artist}</small>
                            </span>

                            <span class="queue-state">
                                ${current ? "PLAYING" : "NEXT"}
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


  function updateSelectedCard() {
    cards.forEach((card, index) => {
      card.classList.toggle("selected", index === currentAlbum);
    });
  }

  function updateSelectedTrack() {
    $$(".album-track", albumSongList || document).forEach((track, index) => {
      track.classList.toggle("active", index === currentSong);
    });
  }

 function renderAlbumSongs() {

    const activeAlbum =
        getActiveAlbum();

    const tracks =
        activeAlbum.tracks;


    if (selectedAlbumCover) {

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

                            class="
                                album-track
                                ${
                                    index ===
                                    currentSong

                                        ? "active"

                                        : ""
                                }
                            "

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

                                    class="
                                        track-like
                                        ${
                                            liked
                                                ? "liked"
                                                : ""
                                        }
                                    "

                                    type="button"

                                    data-like-index="${index}"

                                    aria-label="
                                        ${
                                            liked
                                                ? "Unlike"
                                                : "Like"
                                        }
                                        ${track.title}
                                    "

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

  function selectAlbum(index, autoplayFirstSong = false) {
    currentAlbum =
    (index + albums.length) %
    albums.length;

  currentSong = 0;

  document.body.dataset.theme =
      albums[currentAlbum].theme || "default";

  pauseSong();
  renderAlbumSongs();
  updateSelectedCard();
  loadSong(0);

  if (autoplayFirstSong) {
    playSong();
  }
  }

  // ============================
  // LOAD SONG
  // ============================

  function loadSong(index) {
    const tracks = getActiveTracks();
    currentSong = (index + tracks.length) % tracks.length;

    const track = tracks[currentSong];
    const activeAlbum = getActiveAlbum();

    setPlayingUI(false);
    setText(songTitle, track.title);
    setText(artistName, track.artist);

    if (albumCover) {
      albumCover.style.opacity = "1";
      albumCover.src = track.cover || activeAlbum.cover;
    }

    if (audio) {
      try {
        audio.pause();
        audio.src = track.audio;
        audio.load();
      } catch (error) {
        console.info("NOVA: audio unavailable. Prototype mode active.");
      }
    }

    demoProgress = 0;

    if (progress) progress.value = 0;
    setText(currentTime, "0:00");
    setText(duration, "3:30");

    updateSelectedCard();
    updateSelectedTrack();

    updateMiniPlayer();
    renderQueue();
  }

  // ============================
  // PLAYING UI
  // ============================

  function setPlayingUI(state) {
    isPlaying = state;
    setText(playPause, state ? "❚❚" : "▶");
    album?.classList.toggle("playing", state);
    visualizer?.classList.toggle("active", state);
    playerCard?.classList.toggle("playing", state);

    setText(
        miniPlayPause,
        state
            ? "❚❚"
            : "▶"
    );


    /*
        Once the user starts interacting with music,
        keep the floating player available even on pause.
    */

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

  // ============================
  // PLAY / PAUSE
  // ============================

  async function playSong() {
    setPlayingUI(true);

    if (!audio || !audio.src) return;

    try {
      await audio.play();
    } catch (error) {
      console.info("NOVA demo mode: audio could not play. Animations continue.");
    }
  }

  function pauseSong() {
    try {
      audio?.pause();
    } catch (error) {
      // ignore audio errors
    }
    setPlayingUI(false);
  }

  playPause?.addEventListener("click", () => {
    if (isPlaying) pauseSong();
    else playSong();
  });


  // ============================
  // FLOATING NOW PLAYING
  // ============================

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


  openQueueMain
    ?.addEventListener(
        "click",
        openQueue
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


  document
    .addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeQueue();

            }

        }
    );


  queueList
    ?.addEventListener(
        "click",
        event => {

            const row =
                event.target
                    .closest(
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
                !Number.isInteger(
                    index
                )
            ) {

                return;
            }


            loadSong(index);

            playSong();

            closeQueue();

        }
    );


  // ============================
  // PREVIOUS / NEXT
  // ============================

  previous?.addEventListener("click", () => {
    loadSong(currentSong - 1);
    playSong();
  });

  next?.addEventListener("click", () => {
    loadSong(currentSong + 1);
    playSong();
  });

  // ============================
  // PROGRESS
  // ============================

  progress?.addEventListener("input", () => {
    demoProgress = Number(progress.value) || 0;

    if (audio && Number.isFinite(audio.duration)) {
      try {
        audio.currentTime = (demoProgress / 100) * audio.duration;
      } catch (error) {
        // ignore
      }
    } else {
      setText(currentTime, formatTime((demoProgress / 100) * 210));
      setText(duration, "3:30");
    }
  });

  // ============================
  // VOLUME
  // ============================

  volume?.addEventListener("input", () => {
    if (!audio) return;
    audio.volume = Math.min(1, Math.max(0, Number(volume.value) || 0));
  });

  if (audio) audio.volume = 0.7;

  // ============================
  // REAL AUDIO PROGRESS
  // ============================

  if (audio) {
    audio.addEventListener("timeupdate", () => {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;

      const value = (audio.currentTime / audio.duration) * 100;
      if (progress) progress.value = value;

      setText(currentTime, formatTime(audio.currentTime));
      setText(duration, formatTime(audio.duration));
    });

    audio.addEventListener("ended", () => {
      loadSong(currentSong + 1);
      playSong();
    });

    audio.addEventListener("error", () => {
      setText(duration, "3:30");
    });
  }

  // ============================
  // DEMO PLAYER PROGRESS
  // ============================

  function startDemoProgress() {
    stopDemoProgress();

    demoTimer = window.setInterval(() => {
      if (
        audio &&
        Number.isFinite(audio.duration) &&
        !audio.paused
      ) {
        return;
      }

      demoProgress += 0.22;

      if (demoProgress >= 100) {
        loadSong(currentSong + 1);
        playSong();
        return;
      }

      if (progress) progress.value = demoProgress;
      setText(currentTime, formatTime((demoProgress / 100) * 210));
      setText(duration, "3:30");
    }, 120);
  }

  function stopDemoProgress() {
    if (demoTimer !== null) {
      clearInterval(demoTimer);
      demoTimer = null;
    }
  }

  // ============================
  // ALBUM CARD CLICK + 3D EFFECT
  // ============================

  cards.forEach((card, fallbackIndex) => {
    const parsed = Number(card.dataset.index);
    const index = Number.isInteger(parsed) ? parsed : fallbackIndex;
    const cardPlayButton = $(".card-play", card);

    // Card click: open album tracks
    card.addEventListener("click", () => {
      selectAlbum(index, false);

      $("#album-tracks")?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });

    // Round play button: play first track immediately
    cardPlayButton?.addEventListener("click", event => {
      event.stopPropagation();
      selectAlbum(index, true);

      $("#player")?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });

    // 3D cursor effect
    card.addEventListener("pointermove", event => {
      if (window.innerWidth < 900) return;

      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((y / rect.height) - 0.5) * -10;

      card.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-7px)
      `;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  // Click any track to play it
  // ==================================
// ALBUM TRACK CLICK + LIKE
// ==================================

albumSongList
    ?.addEventListener(
        "click",
        event => {


            /* =====================
               HEART CLICK
            ===================== */

            const likeButton =

                event.target
                    .closest(
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



            /* =====================
               SONG CLICK
            ===================== */

            const row =

                event.target
                    .closest(
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
                !Number.isInteger(
                    index
                )
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

    // ==================================
// LIKED SONG PLAY / UNLIKE
// ==================================

likedSongsList
    ?.addEventListener(
        "click",
        event => {


            const row =

                event.target
                    .closest(
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



            /* =====================
               UNLIKE BUTTON
            ===================== */

            if (
                event.target
                    .closest(
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



            /* =====================
               PLAY LIKED SONG
            ===================== */

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

  // ============================
  // TEAM CARD 3D EFFECT
  // ============================

  const teamCards =
    $$(".team-card");


  teamCards.forEach(
    card => {

      card.addEventListener(
        "pointermove",
        event => {

          if (
            window.innerWidth <
            900
          ) {

            return;

          }


          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          const rotateY =
            (
              (
                x /
                rect.width
              ) -
              0.5
            ) *
            7;


          const rotateX =
            (
              (
                y /
                rect.height
              ) -
              0.5
            ) *
            -7;


          card.style.transform =
            `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-5px)
            `;

        }
      );


      card.addEventListener(
        "pointerleave",
        () => {

          card.style.transform =
            "";

        }
      );

    }
  );


  // ============================
  // MAGNETIC BUTTONS
  // ============================

  const magneticItems =
    $$(
      ".magnetic-btn, .magnetic-social"
    );


  magneticItems.forEach(
    item => {

      item.addEventListener(
        "pointermove",
        event => {

          if (
            window.innerWidth <
            900
          ) {

            return;

          }


          const rect =
            item.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left -
            rect.width / 2;


          const y =
            event.clientY -
            rect.top -
            rect.height / 2;


          item.style.transform =
            `translate(
              ${x * 0.13}px,
              ${y * 0.13}px
            )`;

        }
      );


      item.addEventListener(
        "pointerleave",
        () => {

          item.style.transform =
            "";

        }
      );

    }
  );


  // ============================
  // CURSOR GLOW
  // ============================

  const cursorGlow =
    $("#cursorGlow");


  const orbs =
    $$(".orb");


  window.addEventListener(
    "pointermove",
    event => {

      if (cursorGlow) {

        cursorGlow.style.transform =
          `translate3d(
            ${event.clientX}px,
            ${event.clientY}px,
            0
          )`;

      }


      // background parallax

      const nx =
        event.clientX /
        window.innerWidth -
        0.5;


      const ny =
        event.clientY /
        window.innerHeight -
        0.5;


      orbs.forEach(
        (
          orb,
          index
        ) => {

          const strength =
            (
              index + 1
            ) *
            12;


          orb.style.setProperty(
            "--px",
            `${
              nx *
              strength
            }px`
          );


          orb.style.setProperty(
            "--py",
            `${
              ny *
              strength
            }px`
          );

        }
      );

    }
  );


  // ============================
  // HERO 3D EFFECT
  // ============================

  const heroVisual =
    $("#heroVisual");


  const musicCircle =
    $("#musicCircle");


  heroVisual?.addEventListener(
    "pointermove",
    event => {

      if (
        !musicCircle ||
        window.innerWidth <
        900
      ) {

        return;

      }


      const rect =
        heroVisual
          .getBoundingClientRect();


      const x =
        (
          event.clientX -
          rect.left
        ) /
        rect.width -
        0.5;


      const y =
        (
          event.clientY -
          rect.top
        ) /
        rect.height -
        0.5;


      musicCircle.style.transform =
        `
        perspective(800px)
        rotateX(${y * -8}deg)
        rotateY(${x * 8}deg)
        `;

    }
  );


  heroVisual?.addEventListener(
    "pointerleave",
    () => {

      if (musicCircle) {

        musicCircle.style.transform =
          "";

      }

    }
  );


  // ============================
  // CREATE STARS
  // ============================

  const stars =
    $("#stars");


  if (
    stars &&
    stars.children.length === 0
  ) {

    for (
      let i = 0;
      i < 42;
      i++
    ) {

      const star =
        document.createElement(
          "span"
        );


      star.style.left =
        `${
          Math.random() *
          100
        }%`;


      star.style.top =
        `${
          Math.random() *
          100
        }%`;


      star.style.animationDelay =
        `${
          Math.random() *
          5
        }s`;


      star.style.animationDuration =
        `${
          3 +
          Math.random() *
          5
        }s`;


      stars.appendChild(
        star
      );

    }

  }


  // ============================
  // SCROLL ANIMATION
  // ============================

  const revealSections =
    $$(".section-reveal");


  /*
    VERY IMPORTANT:
    Elements are visible by default.

    So even if this animation
    fails, page will NOT become blank.
  */

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
                !entry.isIntersecting
              ) {

                return;

              }


              entry.target
                .classList
                .remove(
                  "animate-in"
                );


              void entry.target
                .offsetWidth;


              entry.target
                .classList
                .add(
                  "animate-in"
                );


              observer.unobserve(
                entry.target
              );

            }
          );

        },

        {
          threshold: 0.12
        }
      );


    revealSections.forEach(
      section => {

        observer.observe(
          section
        );

      }
    );

  }


  // ============================
  // ACTIVE NAVIGATION
  // ============================

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
        document.getElementById(
          id
        )
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


  updateNavigation();


  // ============================
  // IMAGE ERROR FALLBACK
  // ============================

  $$("img").forEach(
    img => {

      img.addEventListener(
        "error",
        () => {

          /*
            Team image:
            hide it so initials
            underneath show.
          */

          if (
            img.classList.contains(
              "team-photo"
            )
          ) {

            img.style.display =
              "none";

          }

          else {

            /*
              Song covers:
              hide image and show
              gradient background.
            */

            img.style.opacity =
              "0";

          }

        }
      );

    }
  );


  // ============================
  // INITIAL LOAD
  // ============================

  selectAlbum(0, false);
  renderLikedSongs();

  miniPlayer?.classList.add("visible");

  // ==================================
// BACKGROUND PARTICLES
// ==================================

const particleContainer =
    document.getElementById("particles");

if (particleContainer) {

    for (let i = 0; i < 40; i++) {

        const particle =
            document.createElement("span");

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.animationDuration =
            `${6 + Math.random() * 8}s`;

        particle.style.animationDelay =
            `${Math.random() * 6}s`;

        particleContainer.appendChild(
            particle
        );
    }
}
// ==================================
// HEADER SCROLL ANIMATION
// ==================================

const siteHeader =
    document.querySelector(".site-header");


function updateHeader() {

    if (!siteHeader) return;


    if (window.scrollY > 60) {

        siteHeader.classList.add(
            "scrolled"
        );

    } else {

        siteHeader.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


updateHeader();
})();
