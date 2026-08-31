# A Little Surprise For Drodul ❤️

A private, romantic, interactive birthday website — a digital love letter disguised as a birthday surprise.

## 1. Project structure

```
drodul-birthday/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── images/       ← put photo1.jpg, photo2.jpg, photo3.jpg, photo4.jpg here
    └── music/         ← put birthday-song.mp3 here
```

The site works even if the photos/music are missing — broken images just hide themselves, and if the music file isn't found the music button quietly disables itself. Nothing breaks.

## 2. Personalize everything in one place

Open `script.js` and edit the `birthdayConfig` object at the very top:

- `name` — her name, used across the site
- `loveLetter`, `finalMessage` — the two big written messages (already filled in, edit freely)
- `reasons` — the list of "why you're special" cards (emoji + text)
- `photos` — array of `{ src, caption }`. Add or remove as many as you like — the memory timeline updates automatically
- `whispers` — the small romantic phrases that occasionally float up while scrolling
- `music` — path to your song file

You don't need to touch `index.html` or `style.css` for basic personalization.

## 3. Add your photos and music

1. Drop your photos into `assets/images/`, named `photo1.jpg`, `photo2.jpg`, etc. (or any name — just match it in `script.js`)
2. Drop your song into `assets/music/birthday-song.mp3`
3. Keep photos reasonably sized (under ~500KB each is plenty) so the site loads fast on her phone over WhatsApp's mobile browser

## 4. Test it on your computer

You need a local server (opening `index.html` directly can block some features in certain browsers).

**Option A — Python (usually preinstalled):**
```bash
cd drodul-birthday
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option B — VS Code:** install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server."

Test on your phone too if you can — open dev tools and use the device toolbar, or just visit the local server's network URL from your phone on the same Wi-Fi.

## 5. Deploy for free

### Netlify (drag-and-drop, easiest)
1. Go to https://app.netlify.com/drop
2. Drag the whole `drodul-birthday` folder into the browser window
3. Netlify gives you a live URL instantly (e.g. `https://random-name-123.netlify.app`)
4. Optional: in Site settings → Domain management, click "Options" → "Edit site name" to pick a nicer URL, like `for-drodul.netlify.app`

### GitHub Pages (if you already use GitHub)
1. Create a new repository, e.g. `drodul-birthday`
2. Push the project files:
   ```bash
   cd drodul-birthday
   git init
   git add .
   git commit -m "birthday site for Drodul"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/drodul-birthday.git
   git push -u origin main
   ```
3. In the repo, go to Settings → Pages → set Source to the `main` branch, root folder
4. Your site will be live at `https://YOUR_USERNAME.github.io/drodul-birthday/`

## 6. Send it to her

Once deployed, copy the final URL and send it to her on WhatsApp. Because of the Open Graph tags already in `index.html`, WhatsApp will show a nice preview card ("A Little Surprise For Drodul ❤️") without giving away the final message.

That's it — when she taps the link, it opens straight into the opening screen, ready for her to tap "Open My Surprise."
