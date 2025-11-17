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

### Security Hardening

#### XSS (Cross-Site Scripting) Prevention
- **Added security utility functions**
  - `escapeHTML()` - Escapes HTML special characters (&, <, >, ", ')
  - `escapeRegExp()` - Escapes RegExp special characters
  - `highlightTermsSafe()` - Safely highlights search terms with HTML escaping

- **Fixed innerHTML vulnerabilities** (5 instances)
  - Replaced innerHTML with safe DOM manipulation (createElement + textContent) in location list rendering
  - Escaped location names in Leaflet tooltips and popups
  - Escaped user data in quote display elements (dates, scores)
  - Escaped keyword in keyword analysis section titles
  - All CSV-derived data now properly escaped before DOM insertion

#### RegExp Injection Prevention
- **Fixed 7 instances of unsafe regex construction**
  - Location keyword search in processText()
  - Keyword search in analyzeKeyword() (multiple instances)
  - Keyword search in getYearlyMentions()
  - All RegExp() calls now use escapeRegExp() wrapper
  - Prevents ReDoS (Regular Expression Denial of Service) attacks
  - Prevents regex syntax errors from user input

#### Content Security Policy (CSP)
- **Added CSP meta tag** to restrict content sources
  - Scripts: 'self', 'unsafe-inline', cdnjs.cloudflare.com only
  - Images: 'self', data URIs, OpenStreetMap tiles only
  - Styles: 'self', 'unsafe-inline', cdnjs.cloudflare.com only
  - Prevents loading of malicious external resources

#### Subresource Integrity (SRI)
- **Added integrity hashes to all CDN resources**
  - Leaflet CSS (1.9.4): SHA-384 hash
  - PapaParse (5.4.1): SHA-512 hash
  - Leaflet JS (1.9.4): SHA-512 hash
  - Added crossorigin="anonymous" attributes
  - Prevents CDN compromise attacks

#### Additional Logic Fixes
- **Fixed period.end reference error**
  - Changed `period.end` to `selectedPeriod.end` in filter logic
  - Prevents runtime errors during time period filtering

- **Fixed getMarkerRadius zero handling**
  - Added `Math.max(1, Number(count) || 0)` to prevent Math.log(0)
  - Prevents -Infinity radius values
  - Handles NaN cases gracefully

#### Performance Improvements
- **Pre-compiled RegExp patterns**
  - Added `escapedLocationPatterns` cache
  - Pre-compiles location search patterns once
  - Significantly improves search performance for large datasets

#### UI/UX Improvements
- **Fixed chart alignment in enlarged modal**
  - Set barContainer width to 'auto' when data points are few
  - Applied dual-level centering: barContainer elements + parent container
  - Child level: barContainer uses display: flex and justifyContent: center
  - Parent level: container uses justifyContent: center for sparse data, flex-start for abundant data
  - Charts with few data points now perfectly display centered
  - Improves visual appearance for small datasets

- **Fixed language default behavior**
  - Added language settings version control to force English default
  - Current version: LANG_SETTINGS_VERSION = '3'
  - Prevents localStorage from overriding English default on updates
  - User language preferences are preserved within same settings version
  - Version incremented to '3' to reset all users to English default

- **Fixed CSV loading freeze issue**
  - Modified CSP to allow Web Workers (worker-src 'self' blob:; child-src 'self' blob:)
  - Enabled Papa.parse worker mode (worker: true) for better performance with large datasets
  - Prevents UI freezing when processing large CSV files
  - Resolves "Reading location data..." freeze issue while maintaining high performance

### Commits
- `3c40890` - Add bilingual (English/Japanese) support to documentation and application
- `6d99b19` - Fix language switcher: default to English and translate keyword results
- `683e107` - Fix keyword results not updating on language switch
- `f40ff80` - Translate '(+ variations)' suffix in keyword display
- `798d38f` - Clarify keyword search UI to avoid misconception about auto-detection
- `e15e60a` - Add CHANGELOG.md to document bilingual implementation
- `e0423e0` - Apply comprehensive security fixes and bug fixes
- `82a3461` - Update CHANGELOG.md with comprehensive security fixes documentation
- `fbccf73` - Fix chart alignment in enlarged modal view
- `353aa1f` - Fix critical CSV loading freeze issue
- `7285212` - Add comprehensive debug logging for CSV loading
- `18e68f2` - Fix CSV loading freeze by disabling Papa.parse Web Workers (temporary fix)
- `c3371a3` - Enable Papa.parse Web Workers with CSP modification for large datasets
- `b50a309` - Update CHANGELOG.md with latest commit hash
- `23bba2b` - Fix enlarged chart alignment by adding display: flex (incorrect approach)
- `11d03ff` - Fix chart alignment and language default issues (language ✅, chart ❌)
- `7246d05` - Update CHANGELOG.md with chart and language fixes
- `67b1fec` - Correct chart alignment by applying flex to barContainer (still incorrect)
- `489e452` - Update CHANGELOG.md with corrected chart alignment fix
- `39cb101` - Fix chart centering by using auto width and parent justifyContent (partial fix)
- `cf68f71` - Update CHANGELOG.md with correct chart centering fix
- `a267923` - Apply dual-level centering for chart alignment (complete fix ✅)
- `d79b0f9` - Update CHANGELOG.md with dual-level centering fix
- `3920d9e` - Increment language settings version to force English default

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
