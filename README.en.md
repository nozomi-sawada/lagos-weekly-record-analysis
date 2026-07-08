# Lagos Weekly Record Geographic & Keyword Analysis Application

[日本語版はこちら](README.ja.md) | [Language Hub](README.md)

## Overview
This application is an interactive visualization tool designed to analyze geographic mention patterns and keywords in the "Lagos Weekly Record," a historical Nigerian newspaper published from 1891 to 1921. It is designed for historical researchers, linguists, and digital humanities specialists.

**Key Features**:
- Visualize geographic mentions from the text on a world map
- Automatically extract relevant quotations through advanced contextual analysis
- Time-series analysis and co-occurrence word analysis for keywords
- Filtering by six period divisions (1891-1895, 1896-1900, 1901-1905, 1906-1910, 1911-1915, 1916-1921)

## 🌐 Try the Application

**<a href="https://nozomi-sawada.github.io/lagos-weekly-record-analysis/" target="_blank">Launch Web Application</a>**

**Sample Files:**
- <a href="sample_analysis.csv" target="_blank">Sample Analysis CSV</a> - Example article data with fictional text
- <a href="sample_locations.csv" target="_blank">Sample Location CSV</a> - Example location coordinates

> **Note:** The sample files contain fictional data for demonstration purposes only. They are designed to help you understand the required data format and test the application's functionality.

## 💻 Running Locally (Offline Use)

If you want to use the tool without an internet connection, or run it on your own PC, follow these steps. **No installation or additional software is required.**

1. Click the green **"Code" button → "Download ZIP"** at the top of this page
2. Extract the ZIP file
3. **Double-click `index.html`** inside the extracted folder to open it in your browser

> **Important:** `index.html` loads `style.css`, `app.js`, and `vendor/` from the same folder.
> **Copying or emailing `index.html` alone will not work** — always keep the folder together.
> When offline, only the map background tiles (OpenStreetMap) will be missing; all analysis features still work.

### File Structure

| File / Folder | Role |
|---|---|
| `index.html` | Page skeleton (open this one) |
| `style.css` | Styling and layout |
| `app.js` | The analysis, map, and chart logic |
| `vendor/` | Bundled libraries: Leaflet (map) and PapaParse (CSV parsing) |
| `sample_analysis.csv` / `sample_locations.csv` | Sample data for testing |
| `tests/` | Automated tests for developers (not needed for use) |

## Usage

### 1. Data Upload
To use the application, you need two types of CSV files.

1. **Analysis CSV File**: A file containing article text data
   - Click the "Select Analysis CSV" button to upload

2. **Location Data File**: A file containing place names and coordinate information
   - Click the "Upload Location Data" button to upload

Once both files are uploaded, the "Start Analysis" button will appear.

### 2. Geographic Analysis
- The map displays markers sized and colored according to mention frequency (frequency is represented by blue intensity)
- The sidebar displays a list of place names in order of mention frequency
- Clicking on any place name displays detailed information and zooms to the corresponding marker on the map
- Clicking the "Show Quotes" button displays up to three representative quotations related to that place name
- Each quotation displays a relevance score (out of 20 points) and a visual meter

### 3. Period-based Filtering
- Click on the period division buttons at the top (e.g., "1891-1895") to display data for only that specific period
- Use the "Show All Years" button to return to data for the entire period

### 4. Keyword Analysis
- Click the "Keyword Analysis" tab
- Enter the word(s) you want to analyze in the keyword input field (for multiple words, use comma separation, e.g., "Yoruba, Yorubas")
- Click the "Analyze" button
- The results will display:
  - Graph of keyword mentions by year (clickable to enlarge)
  - Related major themes and representative words
  - List of words with high co-occurrence frequency with the keyword
  - Representative quotations with relevance scores

## Data Format Requirements

### Analysis CSV File
Please prepare a CSV file containing the following columns:

| Column Name | Description | Required |
|------------|-------------|----------|
| `text` | Article body text | Required |
| `Year` / `year` | Publication year (numeric) | Required |
| `Publication Date` / `Publication Date ` / `publication_date` / `publication date` / `Pub Date` / `pubdate` | Publication date (any of these aliases is accepted) | Optional |
| `no` or `id` | Article ID | Optional |

### Location Data CSV File
Please prepare a CSV file containing the following columns:

| Column Name | Description | Required |
|------------|-------------|----------|
| `placename` | Place name | Required |
| `latitude` | Latitude (decimal format in the range **-90 to 90**, e.g., 6.4550) | Required |
| `longitude` | Longitude (decimal format in the range **-180 to 180**, e.g., 3.3841) | Required |

> **Note**: Column names are recognized case-insensitively, but using the exact names above is recommended. Rows with a missing place name or out-of-range coordinates are skipped, and the number of skipped rows is reported in the upload status message.

> **Methodological note (ethnonyms and group names)**: The sample location
> data includes terms such as "Yoruba", "Egba", and "Ijebu" with coordinates,
> even though in the newspaper these words are often used as names of peoples
> or languages rather than places. The tool counts every term registered in
> the location CSV as a single coordinate point, so ethnonym uses are also
> mapped to one location. Please keep this in mind when interpreting results
> and when building your own location CSV; to exclude such terms from the
> geographic aggregation, simply omit them from your location CSV.

## Technical Details

### Libraries Used
- **Leaflet.js**: Interactive map display
- **PapaParse**: CSV file parsing
- **Other Technologies**: HTML5, CSS3, JavaScript (ES6+)

### Key Feature Implementation Details

#### Contextual Analysis
Evaluates the importance of place names/keywords in text based on the following elements:
- Position in text (higher importance for beginning/conclusion sections)
- Proximity to important keywords
- Local mention density
- Structural position in sentences and paragraphs

#### Quotation Scoring
Uses a 0-20 point scoring system to evaluate the relevance of quotations and automatically extracts the most important quotes.

#### Theme Classification
Analyzes vocabulary patterns around keywords and automatically classifies into the following theme categories:
- Political
- Cultural
- Economic
- Education
- Social
- Geographic
- Colonial Relations

## License

Copyright © 2025 Nozomi Sawada

This application is provided under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).

- Use for academic research, education, and personal learning purposes is permitted
- Commercial use is not permitted
- Please provide appropriate credit when using

Detailed license terms can be found [here](https://creativecommons.org/licenses/by-nc/4.0/).

Academic Use License

This software is provided for academic and educational purposes only.
Commercial use, redistribution, or any use for profit is strictly prohibited.

When using this software for academic purposes, proper attribution must be given
to the original author by citing:

Sawada, Nozomi. (2025). Lagos Weekly Record Analysis Tool.

## Acknowledgments
- This application was developed as part of research on media in early colonial Nigeria.
- This work was supported by JSPS KAKENHI Grant Number JP19K13372.

### Open-Source Libraries
This tool uses the following open-source libraries (bundled in the `vendor/` directory, so the app works offline except for map tile loading):

- [Leaflet](https://leafletjs.com/) 1.9.4 — BSD-2-Clause License
- [PapaParse](https://www.papaparse.com/) 5.4.1 — MIT License

### Map Data
- Map data © [OpenStreetMap](https://www.openstreetmap.org/) contributors, available under the [Open Database License (ODbL)](https://opendatacommons.org/licenses/odbl/).
- Map tiles © OpenStreetMap contributors, available under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).
