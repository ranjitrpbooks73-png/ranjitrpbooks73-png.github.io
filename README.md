# 📚 RP BOOKS — Website

A modern, responsive, static website for **RP BOOKS** — a trusted supplier of Indian and foreign books based in Kharagpur, West Bengal.

**Live URL:** `https://ranjitrpbooks73-png.github.io/`

---

## 🚀 How to Deploy on GitHub Pages

1. **Create a GitHub repository**
   - Go to [github.com](https://github.com) and sign in as `ranjitrpbooks73-png`.
   - Click **New Repository**.
   - Name it: `ranjitrpbooks73-png.github.io` (this makes it your main GitHub Pages site).
   - Set it to **Public** and click **Create repository**.

2. **Upload the files**
   - Click **"Upload files"** on the repository page.
   - Drag and drop all the project files:
     - `index.html`
     - `style.css`
     - `script.js`
     - `books.js`
     - `README.md`
     - `covers/` folder (if you have cover images)
   - Click **"Commit changes"**.

3. **Enable GitHub Pages**
   - Go to **Settings → Pages**.
   - Under **Source**, select **main** branch and **/ (root)**.
   - Click **Save**.
   - Your site will be live at: `https://ranjitrpbooks73-png.github.io/`

---

## 📖 How to Add or Update Books

1. Open the file **`books.js`** on GitHub (click the pencil icon to edit).
2. Add a new book entry inside the array. Copy this template:

```javascript
{
  "title": "Book Name Here",
  "author": "Author Name",
  "category": "Category",
  "price": "₹250 or Contact for price",
  "availability": "Available",
  "link": "",
  "note": "Optional short description",
  "cover": ""
}
```

3. Paste it **before** the closing `];` and add a comma after the previous entry.
4. Click **"Commit changes"** — the website updates automatically!

### Fields Explained

| Field          | Required? | Description |
|----------------|-----------|-------------|
| `title`        | ✅ Yes    | Name of the book |
| `author`       | Optional  | Author name |
| `category`     | Optional  | Category (e.g. Engineering, Fiction, Science) |
| `price`        | Optional  | Price or "Contact for price" |
| `availability` | Optional  | "Available", "Out of Stock", etc. |
| `link`         | Optional  | External link to the book |
| `note`         | Optional  | Short description or note |
| `cover`        | Optional  | Path to a cover image (e.g. `covers/mybook.jpg`) |

---

## 🎨 How Book Covers Work

- **With image:** If you provide a `"cover"` path (e.g. `"cover": "covers/physics.jpg"`), that image is displayed.
- **Without image:** If you leave `"cover"` empty or remove it, the website **automatically generates a stylish book cover** using the title, author, and a unique gradient colour. No image upload needed!

### To use your own cover images:
1. Create a folder called `covers/` in your repository.
2. Upload your cover images there (e.g. `covers/physics.jpg`).
3. In `books.js`, set `"cover": "covers/physics.jpg"` for that book.

---

## 📞 How to Update Contact Details

Open **`index.html`** and search for the contact section (`id="contact"`). Update the address, phone number, or email as needed. Also update the WhatsApp links in `script.js` (search for `919734529874`).

---

## 📁 Project Structure

```
├── index.html     → Main webpage
├── style.css      → All styling
├── script.js      → Catalogue logic, search, filters, animations
├── books.js       → Book data (edit this to update catalogue)
├── covers/        → Optional folder for book cover images
└── README.md      → This file
```

---

## ✨ Features

- 🎨 Modern dark-themed, vibrant design
- 📱 Fully responsive (mobile, tablet, desktop)
- 📚 Auto-generated book covers (no images needed)
- 🖼️ Optional real cover image support
- 🔍 Search by title, author, or category
- 🏷️ Category filter buttons
- 📱 WhatsApp "Order Now" button per book
- 📍 Google Maps integration
- ⬆️ Scroll-to-top button
- ✨ Smooth scroll and fade-in animations
- ⚡ Fast-loading static site (no backend)

---

**© 2024–2026 RP BOOKS. All rights reserved.**
