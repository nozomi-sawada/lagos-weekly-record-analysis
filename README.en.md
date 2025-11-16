# Lagos Weekly Record Geographic & Keyword Analysis Application

[日本語版はこちら](README.ja.md) | [Language Hub](README.md)

## Overview
This application is an interactive visualization tool designed to analyze geographic mention patterns and keywords in the "Lagos Weekly Record," a historical Nigerian newspaper published from 1891 to 1921. It is designed for historical researchers, linguists, and digital humanities specialists.

**Key Features**:
- Visualize geographic mentions from the text on a world map
- Automatically extract relevant quotations through advanced contextual analysis
- Time-series analysis and co-occurrence word analysis for keywords
- Filtering by six period divisions (1891-1895, 1896-1900, 1901-1905, 1906-1910, 1911-1915, 1916-1921)


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
| `Year` or `year` | Publication year (numeric) | Required |
| `Publication Date` or `Publication Date ` | Publication date | Optional |
| `no` or `id` | Article ID | Optional |

### Location Data CSV File
Please prepare a CSV file containing the following columns:

| Column Name | Description | Required |
|------------|-------------|----------|
| `placename` | Place name | Required |
| `latitude` | Latitude (decimal format, e.g., 6.4550) | Required |
| `longitude` | Longitude (decimal format, e.g., 3.3841) | Required |

> **Note**: Column names are recognized case-insensitively, but using the exact names above is recommended.

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
- The Lagos Weekly Record data used in this application was collected as part of research on early colonial media in Nigeria.
- Map data and tiles are provided by [OpenStreetMap](https://www.openstreetmap.org/).
