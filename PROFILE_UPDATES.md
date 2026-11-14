# Profile updates

Save each Word CV revision as a new dated DOCX in `Curriculum_Vitae`. Export the public PDF to `Curriculum_Vitae/Anandkumar_CV_latest.pdf`, replacing that one file.

From the portfolio repository on `main`, run:

```powershell
python -m pip install openpyxl
python scripts/sync_profile.py --publish
```

Install openpyxl once. The script reads the tracker from `GoogleScholarPublications` and the PDF from `Curriculum_Vitae` in the OneDrive ProfileManager folder. For a checkout outside that folder structure, pass `--profile-root "path-to-ProfileManager"`.

The publish command exports public publication fields, updates the citation total, copies the PDF, commits changes to those three public assets, and pushes to GitHub Pages. Commit any other website changes before running it. For a local preview, omit `--publish` and run `npm run dev`. A plain Git push publishes the assets already in the commit because GitHub cannot read your local OneDrive folder.

In the GitHub repository, keep Settings → Pages → Source set to **GitHub Actions**. The Pages workflow builds and publishes the site on pushes to `main`.
