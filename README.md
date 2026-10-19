# Cardio Gastro AI Research Website

A static research portfolio website for SLIIT project R26-IT-012. The site uses HTML, CSS, and JavaScript and has no package installation step.

## Run the project locally

From the repository root, open a terminal and run:

```powershell
cd R26-IT-012-Research-Website-V3
python -m http.server 8000
```

If `python` is not available on Windows, use `py -m http.server 8000` instead. Open <http://localhost:8000> in your browser. Stop the server with **Ctrl+C** in the terminal.

You can also open `R26-IT-012-Research-Website-V3/index.html` directly, but serving the folder over HTTP gives more consistent behavior for embedded content.

## Documents

Research reports and presentations are embedded from Google Drive. Every preview link must be accessible to visitors without sign-in. To add a document, upload it to Google Drive, set sharing to allow viewing, then add its name and preview URL to the `researchFiles` list in `R26-IT-012-Research-Website-V3/script.js` and the matching library button in `R26-IT-012-Research-Website-V3/index.html`.

## Project notes

- This is an informational research website, not the separate clinical application. The application link opens the external prototype.
- `advanced.css` contains the visual layer and responsive styles; `styles.css` contains the base styling. Both are in `R26-IT-012-Research-Website-V3/`.
- Some interface screenshots are anonymized. Do not publish patient-identifiable information.
- Check course submission requirements. The original guide states a maximum size of 20 MB and permits WordPress/HTML/CSS. Confirm whether JavaScript interactions are allowed.

## Project structure

```text
R26-IT-012-Research-Website-V3/
├── index.html       # Website content and page structure
├── styles.css       # Base layout and styling
├── advanced.css     # Visual effects and responsive styling
├── script.js        # Navigation, carousels, document viewer, and interactions
└── assets/          # Team photos, architecture image, and application screenshots
```

## Special features

- Responsive single-page research portfolio.
- Screenshot carousel with keyboard navigation and automatic playback.
- Research timeline with previous/next controls and automatic scrolling.
- Embedded Google Drive research reports and presentations.
- Accessibility support: skip navigation, keyboard focus, reduced-motion support, and descriptive image labels.

## Updating content

| Update                                                     | File or folder |
| ---------------------------------------------------------- | -------------- |
| Text, headings, team details, contact addresses, and links | `index.html`   |
| Base styling and page layout                               | `styles.css`   |
| Animations, effects, and responsive styling                | `advanced.css` |
| Carousel, timeline, document viewer, and interactions      | `script.js`    |
| Team photos and screenshots                                | `assets/`      |

## Adding a research document

1. Upload the file to Google Drive and allow visitors to view it without signing in.
2. Copy a preview URL in this format:

   ```text
   https://drive.google.com/file/d/FILE_ID/preview
   ```

3. Add the document name and `embedUrl` to `researchFiles` in `script.js`.
4. Add the matching `.library-item` button in `index.html` with the same zero-based `data-file` number.

The number of library buttons must always match the number of items in `researchFiles`.

## Before publishing

- Verify external links and Google Drive permissions.
- Keep all patient data anonymized; do not publish patient-identifiable images or documents.
- Optimize new images before adding them to `assets/` so the website remains fast and within submission-size requirements.

## Contact form setup

The Contact Us form sends messages to `it22116024@my.sliit.lk` through FormSubmit and sends an automatic confirmation to the visitor's email address. The confirmation includes the live project link: <https://cardio-gastro-ai.vercel.app/>.

1. Publish the updated website.
2. Submit the form once using a test message.
3. Open the FormSubmit activation email received at `it22116024@my.sliit.lk` and approve the form.

After this one-time activation, messages are delivered to the research team and the visitor receives the automatic reply. After a successful submission, FormSubmit returns the visitor to the live website and displays a confirmation message. Keep the default CAPTCHA enabled to reduce spam. To use a different receiving address, update the form `action` in `index.html` and complete activation for that address.
