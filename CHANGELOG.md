# Changelog

All notable changes to the Lagos Weekly Record Analysis Application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2025-11-16

### Added - Bilingual Support

#### Documentation
- **README.en.md** - Complete English documentation
  - Full translation of usage instructions
  - Data format requirements
  - Technical implementation details
  - License information in English

- **README.ja.md** - Complete Japanese documentation
  - Original Japanese content preserved
  - Comprehensive usage guide
  - Technical details in Japanese
  - License information in Japanese

- **README.md** - Language selection hub
  - Bilingual header (EN/JP)
  - Quick overview in both languages
  - Clear navigation to language-specific documentation

#### Application Features
- **Language Switcher UI**
  - Toggle button in header (English / 日本語)
  - Visual active state indicator
  - Accessible from all pages

- **Bilingual UI Text** (31+ elements translated)
  - Page title and description
  - File upload interface
  - Tab navigation (Geographic Analysis / Keyword Analysis)
  - Filter controls and labels
  - All button labels
  - Form inputs and placeholders
  - Error messages and notifications
  - Status messages
  - Legend labels

- **Dynamic Content Translation**
  - Keyword analysis section titles
    - "Mentions of {keyword} Over Time" / "{keyword} の経時的言及数"
    - "Main Themes Associated with {keyword}" / "{keyword} に関連する主要テーマ"
    - "Terms Frequently Appearing with {keyword}" / "{keyword} と共起する語句"
    - "Most Relevant Quotes about {keyword}" / "{keyword} に関する関連引用"
  - Chart modal titles and subtitles
  - Contextual button text (Show/Hide Quotes)

- **Language Persistence**
  - LocalStorage implementation
  - User preference saved across sessions
  - Default language: English (for academic/international use)

### Changed
- Default language set to English (removed browser auto-detection)
  - Ensures consistent experience for international academic use
  - Users can manually switch to Japanese as needed

- All keyword search results now properly translate
  - Section titles update dynamically
  - Chart labels respect language selection
  - Modal content translated

### Fixed
- **Keyword results not updating on language switch**
  - Added global variable to store current keyword analysis data
  - Language switcher now triggers re-rendering of keyword results
  - All dynamic keyword section titles now properly translate when switching languages

- **"(+ variations)" suffix translation**
  - English: "(+ variations)"
  - Japanese: "（複数形含む）"
  - Displays when multiple keywords are entered (e.g., "Yoruba, Yorubas")
  - Keeps the actual keyword in its original form

- **UI clarity to prevent auto-detection misconception**
  - Changed default input from "Yoruba, Yorubas" to "Yoruba" (single keyword)
  - Updated placeholder text to show single keyword example
  - Revised tip text to clarify that multiple variation search requires manual comma-separated input
  - Prevents users from mistakenly thinking plural forms or derivatives are auto-detected
  - Makes it clear that:
    - No automatic plural detection (e.g., "Lagos" does not auto-search "Lagoss")
    - No automatic derivative detection (e.g., "she" does not auto-search "her")
    - No automatic related word detection (e.g., "Japan" does not auto-search "Japanese")
    - Users must explicitly enter all variations they want to search

### Technical Details

#### Performance Impact
- File size increase: ~11KB (100KB → 111KB)
  - Translations object: ~5-6KB
  - Language switching logic: ~2-3KB
  - CSS styling: ~1KB
- Performance impact: Negligible (suitable for academic use)
- No impact on data processing or visualization performance

#### Implementation
- JavaScript translation object with 36 keys per language
- Data attribute-based translation system (`data-i18n`, `data-i18n-placeholder`)
- Dynamic content translation using string replacement
- Language initialization on page load
- Event listeners for language toggle buttons

#### Browser Compatibility
- LocalStorage API for persistence
- ES6+ JavaScript features
- Compatible with modern browsers (Chrome, Firefox, Safari, Edge)

### Files Modified
- `index.html` - Added language switcher and translations (+325 lines)
- `README.md` - Converted to language selection hub
- `README.en.md` - New file (English documentation)
- `README.ja.md` - New file (Japanese documentation)

### Commits
- `3c40890` - Add bilingual (English/Japanese) support to documentation and application
- `6d99b19` - Fix language switcher: default to English and translate keyword results
- `683e107` - Fix keyword results not updating on language switch
- `f40ff80` - Translate '(+ variations)' suffix in keyword display
- `798d38f` - Clarify keyword search UI to avoid misconception about auto-detection
- `e15e60a` - Add CHANGELOG.md to document bilingual implementation

---

## [1.0.0] - 2025-11-16 (Initial Release)

### Added
- Interactive geographic visualization using Leaflet.js
- CSV file upload and parsing (PapaParse)
- Geographic mentions analysis with world map display
- Keyword analysis with contextual patterns
- Time-series filtering (6 period divisions: 1891-1895, 1896-1900, 1901-1905, 1906-1910, 1911-1915, 1916-1921)
- Advanced context analysis for relevance scoring
- Quote extraction with 20-point scoring system
- Theme classification (Political, Cultural, Economic, Education, Social, Geographic, Colonial Relations)
- Related terms co-occurrence analysis
- Timeline charts with enlargeable modal view
- Responsive design for various screen sizes

### Technical Features
- Context-aware quote scoring algorithm
- Position-based importance weighting
- Local mention density analysis
- Theme-based vocabulary pattern recognition
- Year-based data filtering
- Interactive map markers with frequency visualization
- Clickable location details panel

### License
- Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)
- Academic and educational use permitted
- Commercial use prohibited

---

## Notes for Researchers

### Citation
When using this tool for academic purposes, please cite:

```
Sawada, Nozomi. (2025). Lagos Weekly Record Analysis Tool.
```

### Data Source
The Lagos Weekly Record data (1891-1921) used in this application was collected as part of research on early colonial media in Nigeria.

### Map Data
Map data and tiles provided by [OpenStreetMap](https://www.openstreetmap.org/).

---

## Future Considerations

Potential areas for future enhancement:
- Additional language support (French, Portuguese)
- Export functionality for analysis results
- Advanced filtering options
- Batch keyword analysis
- Network visualization for term relationships
- Timeline comparison views
