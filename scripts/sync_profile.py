"""Export public publication fields and the latest CV for GitHub Pages."""
import argparse
import json
from pathlib import Path
import shutil
import subprocess

from openpyxl import load_workbook


SITE = Path(__file__).resolve().parents[1]
MEDIA = SITE / "Media"
SHEETS = {
    "Journal Publications": "Journal Publications",
    "Conference Publications": "Conference Publications",
    "Other Publications": "Other",
}


def synchronize(profile):
    pdf = profile / "Curriculum_Vitae/Anandkumar_CV_latest.pdf"
    with pdf.open("rb") as source:
        if source.read(5) != b"%PDF-":
            raise ValueError(f"Invalid PDF: {pdf}")
    workbook = load_workbook(
        profile / "GoogleScholarPublications/Publication_Tracker.xlsx",
        data_only=True,
    )
    total = workbook["Summary"]["L7"].value
    if type(total) is not int or total < 0:
        raise ValueError("The tracker Summary needs a valid total citation count in L7.")
    destination = MEDIA / "Publications.json"
    old = {p["title"].casefold(): p for p in json.loads(destination.read_text(encoding="utf-8"))}
    publications = []
    seen = set()
    for name, kind in SHEETS.items():
        sheet = workbook[name]
        columns = {cell.value: cell.column for cell in sheet[5]}
        for row in range(6, sheet.max_row + 1):
            def cell(field):
                return sheet.cell(row, columns[field])

            title = cell("Title").value
            if not title or cell("Include in unique total").value != "Yes":
                continue
            identifier = cell("Publication ID").value
            if not identifier or identifier in seen:
                raise ValueError(f"Missing or repeated publication ID: {title}")
            seen.add(identifier)
            doi = cell("DOI").value
            link = None
            for field in ("Publisher URL", "Scholar URL"):
                source = cell(field)
                candidate = source.hyperlink.target if source.hyperlink else source.value
                if isinstance(candidate, str) and candidate.startswith("https://"):
                    link = candidate
                    break
            if doi:
                link = "https://doi.org/" + str(doi).removeprefix("https://doi.org/")
            # The SSRN record uses a revised title and year for the same Scholar entry.
            year = cell("Year").value
            if identifier == "8V5C3E8AAAAJ:_FxGoFyzp5QC" and title.startswith("From Literature to Classifier"):
                title = "Prior-Detect: Zero-Shot Expertise-Agnostic Process Monitoring Under Site-to-Site Concept Drift"
                year, link = 2026, "https://doi.org/10.2139/ssrn.6458658"
            if not link or not cell("Authors").value:
                raise ValueError(f"Missing public citation details: {title}")
            publications.append({
                "kind": kind, "title": title, "authors": cell("Authors").value,
                "conference": cell("Venue").value, "year": year,
                "citations": cell("Citations").value,
                "abstract": old.get(title.casefold(), {}).get("abstract", ""),
                "link": link,
            })
    if not publications:
        raise ValueError("The tracker contains no publishable entries.")
    metrics_path = MEDIA / "ProfessionalAchievements.json"
    achievements = json.loads(metrics_path.read_text(encoding="utf-8"))
    matches = [item for item in achievements if item["label"] == "Citations"]
    if len(matches) != 1:
        raise ValueError("Expected one Citations entry in ProfessionalAchievements.json.")
    matches[0]["value"] = total
    for path, data in ((destination, publications), (metrics_path, achievements)):
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    shutil.copyfile(pdf, MEDIA / pdf.name)
    print(f"Synced {len(publications)} publications, {total} citations, and {pdf.name}.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--profile-root", type=Path, default=SITE.parent.parent)
    parser.add_argument("--publish", action="store_true", help="Commit changed public assets and push main.")
    args = parser.parse_args()

    def git(*command, **kwargs):
        return subprocess.run(["git", *command], cwd=SITE, check=True, **kwargs)

    if args.publish:
        branch = git("branch", "--show-current", capture_output=True, text=True).stdout.strip()
        if branch != "main":
            parser.error("--publish requires the main branch")
    synchronize(args.profile_root)
    if args.publish:
        files = ["Media/Publications.json", "Media/ProfessionalAchievements.json",
                 "Media/Anandkumar_CV_latest.pdf"]
        git("add", "--", *files)
        changes = git("diff", "--cached", "--name-only", "--", *files, capture_output=True, text=True)
        if changes.stdout.strip():
            git("commit", "--only", "-m", "Sync publication tracker and latest CV", "--", *files)
        git("push", "origin", "main")


if __name__ == "__main__":
    main()
