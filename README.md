# 🎧 NOVA Music

NOVA Music is a modern, responsive music player web experience built with **HTML, CSS, JavaScript, Node.js, Express, and Socket.IO**.

It combines a polished animated interface with practical music-player features such as playlists, search, liked songs, queue management, shuffle/repeat modes, and real-time **Listen Together** synchronization across devices.

---

## ✨ Features

- 🎵 Multi-album music player
- ▶️ Play / Pause / Previous / Next controls
- ⏱️ Interactive progress and seek bar
- 🔊 Volume control
- 🔀 Shuffle mode
- 🔁 Repeat All mode
- 🔂 Repeat One mode
- ❤️ Liked Songs
- ☷ Song Queue
- 🔎 Search by song, artist, or album
- 🎧 Listen Together rooms
- 🔄 Real-time playback synchronization using Socket.IO
- 📱 Responsive mobile and desktop layout
- 🎚️ Animated music visualizer
- 💿 Animated album / vinyl interface
- 🌌 Dynamic NOVA-themed visual background
- 🟢 Connection / sync status for collaborative listening

---

## 🎧 Listen Together

NOVA includes a real-time collaborative listening mode.

One listener can create a room and another listener can join using the same room code. Playback actions are synchronized between connected devices.

### Synced actions

- Play
- Pause
- Next track
- Previous track
- Song selection
- Album selection
- Seeking / rewinding
- Shuffle mode
- Repeat mode

The most recent action is reflected for everyone connected to the same room.

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript

### Backend

- Node.js
- Express.js
- Socket.IO

### Storage

- Browser `localStorage` for client-side preferences such as liked songs

---

## 📁 Project Structure

```text
NOVA-Music/
│
├── index.html
├── style.css
├── script.js
├── player-modes.js
├── server.js
├── package.json
├── package-lock.json
│
├── images/
│
├── songs1/
├── songs1.1/
├── songs2/
├── songs3/
├── songs3.1/
│
└── README.md
```

Your local project may contain additional song folders depending on the tracks used in the website.

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/nova-music.git
```

### 2. Open the project folder

```bash
cd nova-music
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node server.js
```

### 5. Open NOVA

Open:

```text
http://localhost:3000
```

Keep the terminal running while using the website.

---

## 📱 Test on a Phone

Make sure the laptop and phone are connected to the **same Wi-Fi network**.

Find the laptop's IPv4 address:

```cmd
ipconfig
```

Then open this on the phone:

```text
http://YOUR-LAPTOP-IP:3000
```

Example:

```text
http://192.168.1.7:3000
```

The Node.js server must remain running on the laptop.

---

## 🎧 Testing Listen Together

1. Open NOVA on two devices or browser tabs.
2. On Device A, select **Listen Together → Create Room**.
3. Copy the generated room code.
4. On Device B, select **Listen Together → Join Room**.
5. Enter the same room code.
6. Test playback controls from both devices.

Both listeners can control playback.

---

## 🌐 Deployment

NOVA requires a Node.js server because the **Listen Together** feature uses Socket.IO.

Because of this, the complete application cannot run using GitHub Pages alone.

GitHub can be used for source-code hosting, while the Node.js application can be deployed on a backend-capable hosting platform.

---

## 📸 Screenshots

Add your project screenshots here after uploading them to the repository.

```md
![NOVA Home](screenshots/home.png)

![NOVA Player](screenshots/player.png)

![Listen Together](screenshots/listen-together.png)
```

---

## ⚠️ Media Notice

Audio tracks and album artwork should only be publicly distributed when you have the appropriate rights or permission to use them.

For a public GitHub repository, copyrighted audio files can be excluded while keeping the source code available.

---

## 💡 Project Goal

NOVA was created to explore how a traditional music-player interface can become more immersive and collaborative through motion design, responsive UI, real-time synchronization, and modern web technologies.

---

## 👩‍💻 Developer

Built as a UI/UX and web-development project.

**Project:** NOVA Music  
**Focus:** Frontend Design • Music Experience • Real-Time Web Interaction

---

## ⭐ Support

If you like the project, consider starring the repository on GitHub.
