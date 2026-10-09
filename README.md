# Cardio Gastro AI Research Website

A static research portfolio website for SLIIT project R26-IT-012. The site uses HTML, CSS, and JavaScript and has no package installation step.

## Run locally

From the repository root, open a terminal and run:

```powershell
cd R26-IT-012-Research-Website-V3
python -m http.server 8000
```

If `python` is not available on Windows, use `py -m http.server 8000` instead. Open <http://localhost:8000> in your browser. Stop the server with **Ctrl+C** in the terminal.

You can also open `R26-IT-012-Research-Website-V3/index.html` directly, but serving the folder over HTTP gives more consistent behavior for embedded content.

## Documents

Research reports and presentations are embedded from OneDrive. The embed links must allow access from the browser viewing the website. If OneDrive asks visitors to sign in, update the file's sharing access or generate a new embed link. To add a document, upload it to OneDrive, generate an embed code, then add its name and embed URL to the `researchFiles` list in `R26-IT-012-Research-Website-V3/script.js` and add the matching item to `R26-IT-012-Research-Website-V3/index.html`.

## Project notes

- This is an informational research website, not the separate clinical application. The application link opens the external prototype.
- `advanced.css` contains the visual layer and responsive styles; `styles.css` contains the base styling. Both are in `R26-IT-012-Research-Website-V3/`.
- Some interface screenshots are anonymized. Do not publish patient-identifiable information.
- Check course submission requirements. The original guide states a maximum size of 20 MB and permits WordPress/HTML/CSS. Confirm whether JavaScript interactions are allowed.
