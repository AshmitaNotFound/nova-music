<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:05050d,35:24104f,70:2457ff,100:00d9ff&height=220&section=header&text=NOVA%20MUSIC&fontSize=48&fontColor=FFFFFF&animation=fadeIn&fontAlignY=38&desc=MUSIC%20%E2%80%A2%20MOTION%20%E2%80%A2%20MOOD&descAlignY=58&descSize=17" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&duration=2600&pause=700&color=9B7BFF&center=true&vCenter=true&width=820&lines=Discover+Music+%E2%86%92+Build+a+Mood;Play+%E2%86%92+Like+%E2%86%92+Queue+%E2%86%92+Repeat;Create+Room+%E2%86%92+Invite+%E2%86%92+Listen+Together;Two+Devices.+One+Playback." alt="NOVA typing animation" />

<br/>

![Status](https://img.shields.io/badge/status-live-7C5CFF?style=for-the-badge&labelColor=080812)
![Responsive](https://img.shields.io/badge/responsive-desktop%20%2B%20mobile-00D9FF?style=for-the-badge&labelColor=080812)
![Realtime](https://img.shields.io/badge/realtime-Socket.IO-9B7BFF?style=for-the-badge&labelColor=080812&logo=socketdotio&logoColor=white)

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:7C5CFF,100:00D9FF&height=3" width="82%"/>

</div>

> **NOVA Music** is an immersive, responsive music experience built around discovery, motion, mood, and real-time shared listening.
>
> It combines a polished music-player interface with search, liked songs, queue management, shuffle/repeat modes, and a Socket.IO-powered **Listen Together** experience.

---

## 🎧 The NOVA Experience

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=18&duration=1900&pause=450&color=00D9FF&center=true&vCenter=true&width=850&lines=DISCOVER+%E2%86%92+PLAY+%E2%86%92+LIKE+%E2%86%92+QUEUE;CREATE+ROOM+%E2%86%92+JOIN+%E2%86%92+SYNC+%E2%86%92+LISTEN" alt="NOVA journey"/>

</div>

### ✨ Experience Highlights

| # | Feature | What it does |
|---|---|---|
| 01 | **Music Discovery** | Browse albums and songs through a visual, responsive interface |
| 02 | **Smart Player** | Play, pause, previous, next, seek, volume, and live progress |
| 03 | **Search** | Find tracks, artists, and albums quickly |
| 04 | **Liked Songs** | Save favourite tracks locally for easy access |
| 05 | **Queue** | View and manage upcoming tracks |
| 06 | **Shuffle** | Randomize playback without leaving the player flow |
| 07 | **Repeat Modes** | Switch between Repeat Off, Repeat All, and Repeat One |
| 08 | **Listen Together** | Create a room and synchronize playback between connected devices |
| 09 | **Responsive UI** | Optimized layouts for laptop, tablet, and mobile |
| 10 | **Motion Design** | Animated album art, visualizer, gradients, and interactive UI effects |

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=transparent&color=gradient&customColorList=6,11,20&height=60&section=header&animation=twinkling" width="62%"/>
</div>

---

## 🌐 Listen Together

The signature NOVA feature is real-time synchronized listening.

```text
┌──────────────────┐
│     DEVICE A     │
│   Create Room    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Node.js Server  │
│   + Socket.IO    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     DEVICE B     │
│    Join Room     │
└──────────────────┘

PLAY • PAUSE • SEEK • NEXT • PREVIOUS
SHUFFLE • REPEAT • SONG CHANGE
                ⇅
          REAL-TIME SYNC
```

### Synced actions

- ▶️ Play
- ⏸️ Pause
- ⏮️ Previous
- ⏭️ Next
- ⏱️ Seek / rewind
- 🎵 Song selection
- 💿 Album selection
- 🔀 Shuffle state
- 🔁 Repeat state

The latest valid room action is reflected across connected listeners.

---

## 🎛️ Player Modes

| Mode | Behaviour |
|---|---|
| 🔀 **Shuffle** | Chooses tracks in randomized order |
| 🔁 **Repeat All** | Continues looping through the active album |
| 🔂 **Repeat One** | Replays the current track |
| 🎧 **Listen Together** | Shares playback state across connected devices |
| ❤️ **Liked Songs** | Stores favourites using browser local storage |
| ☷ **Queue** | Shows upcoming tracks in the current listening flow |

---

## 🛠️ Tech Stack

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-663399?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-111111?style=for-the-badge&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

</div>

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js + Express
- **Real-time communication:** Socket.IO
- **Client-side persistence:** `localStorage`
- **Responsive design:** CSS media queries and mobile-specific optimizations
- **Playback state:** shared room state synchronized through the server

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=rect&color=0:7C5CFF,100:00D9FF&height=3" width="82%"/>
</div>

---

## 🧠 Architecture

```text
                    ┌──────────────────────┐
                    │      NOVA UI         │
                    │ HTML • CSS • JS      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express Server     │
                    │     server.js        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Socket.IO       │
                    │   real-time rooms    │
                    └───────┬───────┬──────┘
                            │       │
                            ▼       ▼
                     Listener A   Listener B
```

---

## 📁 Project Structure

```text
nova-music/
│
├── index.html
├── style.css
├── script.js
├── player-modes.js
├── server.js
├── server-state.js
├── package.json
├── package-lock.json
├── README.md
│
├── images/
│
└── songs.../
```

> Song folders may vary depending on the local media structure used in the project.

---

## 📱 Responsive Experience

NOVA is designed to work across:

<div align="center">

![Desktop](https://img.shields.io/badge/Desktop-Optimized-7C5CFF?style=flat-square)
![Tablet](https://img.shields.io/badge/Tablet-Responsive-5F7CFF?style=flat-square)
![Mobile](https://img.shields.io/badge/Mobile-Optimized-00D9FF?style=flat-square)

</div>

Mobile layouts use reduced rendering cost where possible while preserving the visual identity of the desktop experience.

---

## 🚀 Live Experience

<div align="center">

<a href="https://nova-music-k6av.onrender.com/">
<img src="https://img.shields.io/badge/OPEN%20NOVA%20MUSIC-LIVE%20DEMO-7C5CFF?style=for-the-badge&logo=render&logoColor=white"/>
</a>

</div>

> Replace `YOUR_RENDER_URL_HERE` with your deployed Render URL.

For the complete Listen Together experience, use the **Render deployment**, not GitHub Pages, because the application requires the Node.js + Socket.IO backend.

---

## 💻 Run Locally

```bash
# Clone the repository
git clone https://github.com/AshmitaNotFound/nova-music.git

# Open the project folder
cd nova-music

# Install dependencies
npm install

# Start the Node.js server
node server.js
```

Open:

```text
http://localhost:3000
```

---

## 📲 Test on Another Device

Make sure both devices are connected to the same Wi-Fi network.

Find the laptop's IPv4 address:

```cmd
ipconfig
```

Then open:

```text
http://YOUR_LAPTOP_IP:3000
```

Example:

```text
http://192.168.1.7:3000
```

For internet-based testing across different networks, use the deployed Render URL.

---

## 🎧 Test Listen Together

1. Open NOVA on Device A.
2. Select **Listen Together → Create Room**.
3. Copy the generated room code.
4. Open NOVA on Device B.
5. Select **Listen Together → Join Room**.
6. Enter the same room code.
7. Test play, pause, next, previous, seek, shuffle, and repeat from both devices.

---

## 📸 Screenshots

Create a `screenshots/` folder in the repository and add your project images.

```md
![NOVA Home](screenshots/home.png)
![NOVA Player](screenshots/player.png)
![Listen Together](screenshots/listen-together.png)
```

A polished README gets significantly better once the actual interface is visible. GitHub apparently enjoys pictures almost as much as humans do.

---

## 👩‍💻 Creator

<div align="center">

<img src="https://img.shields.io/badge/✦-UI%2FUX%20%26%20Web%20Developer-7C5CFF?style=for-the-badge&labelColor=080812"/>

### Ashmita Choudhury

**UI/UX • Frontend Development • Real-Time Web Interaction**

<br/>

<a href="https://nova-music-k6av.onrender.com/">
<img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
</a>
<a href="https://github.com/AshmitaNotFound">
<img src="https://img.shields.io/badge/GitHub-Profile-181717?style=flat-square&logo=github&logoColor=white"/>
</a>

</div>

---

## ⚠️ Media Notice

Audio tracks and album artwork should only be publicly distributed when you have the appropriate rights or permission to use them.

For a public repository, copyrighted audio assets can be excluded while keeping the application source code available.

---

## 💜 Project Vision

NOVA explores how a traditional music player can become more immersive and collaborative through motion, responsive interface design, and real-time synchronization.

<div align="center">

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=17&duration=3200&pause=950&color=9B7BFF&center=true&vCenter=true&width=700&lines=One+room.+Two+devices.+Same+moment.;Feel+the+Sound.;MUSIC+%E2%80%A2+MOTION+%E2%80%A2+MOOD" alt="NOVA closing line"/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00D9FF,45:2457ff,75:24104f,100:05050d&height=140&section=footer" width="100%"/>

</div>
