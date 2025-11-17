        // Security utility functions
        function escapeHTML(s) {
            return String(s).replace(/[&<>"']/g, ch =>
                ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
        }

        function escapeRegExp(s) {
            return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        function highlightTermsSafe(rawText, terms) {
            const escaped = escapeHTML(rawText);
            if (!terms || terms.length === 0) return escaped;
            const termsArray = Array.isArray(terms) ? terms : [terms];
            const pattern = termsArray.map(t => `\\b${escapeRegExp(t)}\\b`).join('|');
            return escaped.replace(new RegExp(pattern, 'gi'), m => `<strong>${m}</strong>`); // Fixed: Avoid double-escaping
        }

        // Language translations
        const translations = {
            en: {
                title: "Lagos Weekly Record Keyword Analysis (1891-1921)",
                description: "Advanced analysis of keywords and themes in Lagos Weekly Record editorials, with focus on geographic mentions and contextual relationships. Upload your CSV file to begin analysis.",
                uploadText: "Upload your CSV files to analyze Lagos Weekly Record data",
                selectAnalysisCSV: "Select Analysis CSV",
                uploadLocationData: "Upload Location Data",
                startAnalysis: "Start Analysis",
                tabGeographic: "Geographic",
                tabKeywordAnalysis: "Keyword Analysis",
                filterByTimePeriod: "Filter by Time Period:",
                showAllYears: "Show All Years",
                topGeographicMentions: "Top Geographic Mentions",
                topNLocations: "Top N Locations",
                frequencyThreshold: "Frequency Threshold",
                mentions: "Mentions",
                articles: "Articles",
                showQuotes: "Show Quotes",
                hideQuotes: "Hide Quotes",
                sampleQuotes: "Sample Quotes",
                keywordPlaceholder: "Enter keyword (e.g., Yoruba)",
                analyze: "Analyze",
                keywordTip: 'To search multiple variations, separate with commas (e.g., "Yoruba, Yorubas")',
                keywordInstructions: 'Enter a keyword and click "Analyze" to see contextual patterns and related themes.<br><br>Try "Yoruba" to see detailed analysis of its usage in Lagos Weekly Record.',
                mentionFrequency: "Mention Frequency",
                legendHigh: "300+ mentions",
                legendMediumHigh: "150-300 mentions",
                legendMedium: "50-150 mentions",
                legendLow: "<50 mentions",
                processingData: "Processing Data...",
                errorReadingLocation: "Error reading location file!",
                errorLocationColumns: "Error: Location CSV must contain 'placename', 'latitude', and 'longitude' columns.",
                failedParseLocation: "Failed to parse location CSV:",
                errorReadingAnalysis: "Error reading analysis file",
                failedParseCSV: "Failed to parse CSV:",
                analysisFileLoaded: "Analysis file loaded successfully!",
                locationFileLoaded: "Location file loaded successfully!",
                bothFilesReady: "Both files loaded. Ready to start analysis!",
                filteringYears: "Filtering:",
                yearTo: "to",
                allYears: "(all years)",
                mentionsOverTime: 'Mentions of "{keyword}" Over Time',
                mainThemesAssociated: 'Main Themes Associated with "{keyword}"',
                termsFrequentlyAppearing: 'Terms Frequently Appearing with "{keyword}"',
                mostRelevantQuotes: 'Most Relevant Quotes about "{keyword}"',
                clickToEnlarge: "Click on chart to view enlarged version",
                totalMentions: "Total {total} mentions from {start} to {end} (Max: {max})",
                withVariations: "(+ variations)"
            },
            ja: {
                title: "ラゴス・ウィークリー・レコード キーワード分析 (1891-1921)",
                description: "ラゴス・ウィークリー・レコード社説のキーワードとテーマの高度な分析。地理的言及と文脈的関係に焦点を当てています。CSVファイルをアップロードして分析を開始してください。",
                uploadText: "ラゴス・ウィークリー・レコードのデータを分析するためにCSVファイルをアップロードしてください",
                selectAnalysisCSV: "分析用CSVを選択",
                uploadLocationData: "位置データをアップロード",
                startAnalysis: "分析を開始",
                tabGeographic: "地理的分析",
                tabKeywordAnalysis: "キーワード分析",
                filterByTimePeriod: "期間でフィルタリング:",
                showAllYears: "すべての年を表示",
                topGeographicMentions: "地理的言及トップ",
                topNLocations: "上位N件の地域",
                frequencyThreshold: "頻度の閾値",
                mentions: "言及数",
                articles: "記事数",
                showQuotes: "引用を表示",
                hideQuotes: "引用を非表示",
                sampleQuotes: "サンプル引用",
                keywordPlaceholder: "キーワードを入力 (例: Yoruba)",
                analyze: "分析",
                keywordTip: "複数のバリエーションを検索する場合は、カンマ区切りで入力してください (例: \"Yoruba, Yorubas\")",
                keywordInstructions: "キーワードを入力して「分析」をクリックすると、文脈パターンと関連テーマが表示されます。<br><br>「Yoruba」を試して、ラゴス・ウィークリー・レコードでの使用状況の詳細な分析をご覧ください。",
                mentionFrequency: "言及頻度",
                legendHigh: "300回以上",
                legendMediumHigh: "150-300回",
                legendMedium: "50-150回",
                legendLow: "50回未満",
                processingData: "データ処理中...",
                errorReadingLocation: "位置情報ファイルの読み込みエラー！",
                errorLocationColumns: "エラー: 位置情報CSVには 'placename'、'latitude'、'longitude' 列が必要です。",
                failedParseLocation: "位置情報CSVの解析に失敗しました:",
                errorReadingAnalysis: "分析ファイルの読み込みエラー",
                failedParseCSV: "CSVの解析に失敗しました:",
                analysisFileLoaded: "分析ファイルが正常に読み込まれました！",
                locationFileLoaded: "位置情報ファイルが正常に読み込まれました！",
                bothFilesReady: "両方のファイルが読み込まれました。分析を開始する準備ができました！",
                filteringYears: "フィルタリング中:",
                yearTo: "から",
                allYears: "(すべての年)",
                mentionsOverTime: '"{keyword}" の経時的言及数',
                mainThemesAssociated: '"{keyword}" に関連する主要テーマ',
                termsFrequentlyAppearing: '"{keyword}" と共起する語句',
                mostRelevantQuotes: '"{keyword}" に関する関連引用',
                clickToEnlarge: "グラフをクリックして拡大表示",
                totalMentions: "合計{total}回の言及 ({start}年から{end}年、最大: {max}回)",
                withVariations: "（複数形含む）"
            }
        };

        // Current language (default to English or browser language)
        let currentLanguage = 'en';

        // Store current keyword analysis data for re-rendering on language switch
        let currentKeywordData = null;

        // Function to switch language
        function switchLanguage(lang) {
            currentLanguage = lang;
            localStorage.setItem('preferredLanguage', lang);

            // Update language buttons
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
            });

            // Update all translatable elements
            updateTranslations();
        }

        // Function to update all translations
        function updateTranslations() {
            const t = translations[currentLanguage];

            // Keys that contain HTML markup (only these should use innerHTML)
            const htmlKeys = new Set(['keywordInstructions']);

            // Update elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (t[key]) {
                    // Use innerHTML only for keys that contain HTML markup
                    // All others use textContent for XSS safety
                    if (htmlKeys.has(key)) {
                        element.innerHTML = t[key];
                    } else {
                        element.textContent = t[key];
                    }
                }
            });

            // Update placeholders
            document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                if (t[key]) {
                    element.placeholder = t[key];
                }
            });

            // Update select options
            const displayMode = document.getElementById('display-mode');
            if (displayMode) {
                displayMode.options[0].text = t.topNLocations;
                displayMode.options[1].text = t.frequencyThreshold;
            }

            // Update dynamic content if it exists
            if (typeof updateFilterInfo === 'function') {
                updateFilterInfo();
            }

            // Update quote button if quotes section is visible
            const quoteSection = document.getElementById('quote-section');
            const toggleBtn = document.getElementById('toggle-quotes-btn');
            if (quoteSection && toggleBtn) {
                if (quoteSection.style.display === 'block') {
                    toggleBtn.textContent = t.hideQuotes;
                } else {
                    toggleBtn.textContent = t.showQuotes;
                }
            }

            // Re-render keyword results if they exist
            if (currentKeywordData) {
                updateKeywordResults(
                    currentKeywordData.keyword,
                    currentKeywordData.quotes,
                    currentKeywordData.relatedTerms,
                    currentKeywordData.themes,
                    currentKeywordData.yearlyMentions
                );
            }
        }

        // Initialize language on page load
        function initializeLanguage() {
            // Version control for language settings - increment when default behavior changes
            const LANG_SETTINGS_VERSION = '4';  // Incremented to force English default
            const storedVersion = localStorage.getItem('langSettingsVersion');

            // If version mismatch or first visit, reset to English
            if (storedVersion !== LANG_SETTINGS_VERSION) {
                localStorage.setItem('langSettingsVersion', LANG_SETTINGS_VERSION);
                localStorage.setItem('preferredLanguage', 'en');
                currentLanguage = 'en';
            } else {
                // Check for stored preference
                const stored = localStorage.getItem('preferredLanguage');
                if (stored && (stored === 'en' || stored === 'ja')) {
                    currentLanguage = stored;
                } else {
                    // Default to English for academic/international use
                    currentLanguage = 'en';
                }
            }

            switchLanguage(currentLanguage);
        }

        // Note: initializeLanguage is called from DOMContentLoaded listener at the end of the file
        // Do not call it here to avoid duplicate execution

        // Here we changed from 'const' to 'let'
        // Known locations with coordinates
        let locationCoordinates = {
            "Lagos": [6.4550, 3.3841],
            "Yoruba": [8.1574, 4.6123],
            "Africa": [9.0000, 18.0000],
            "West Africa": [8.0000, 0.0000],
            "Abeokuta": [7.1583, 3.3481],
            "Ibadan": [7.3775, 3.9470],
            "England": [52.3555, -1.1743],
            "Niger": [9.0820, 8.6753],
            "Ilorin": [8.5000, 4.5500],
            "Egba": [7.1583, 3.3481],
            "Europe": [48.0000, 10.0000],
            "Sierra Leone": [8.4606, -11.7799],
            "Oyo": [7.8500, 3.9333],
            "Gold Coast": [5.5500, -0.2000],
            "America": [37.0902, -95.7129],
            "London": [51.5074, -0.1278],
            "Benin": [6.3350, 5.6037],
            "Liberia": [6.4281, -9.4295],
            "Britain": [54.0000, -2.0000],
            "Porto Novo": [6.4969, 2.6283],
            "Ijebu": [6.8156, 3.9277],
            "Accra": [5.5600, -0.2057],
            "Ondo": [7.0960, 4.8305],
            "Dahomey": [8.0000, 2.0000],
            "Egypt": [26.8206, 30.8025],
            "France": [46.2276, 2.2137],
            "Togo": [8.6195, 0.8248],
            "India": [20.5937, 78.9629],
            // Adding more locations that might be relevant for 1891-1921 period
            "Germany": [51.1657, 10.4515],
            "United States": [37.0902, -95.7129],
            "South Africa": [-30.5595, 22.9375],
            "Nigeria": [9.0820, 8.6753],
            "Cape Coast": [5.1053, -1.2466],
            "Calabar": [4.9757, 8.3417],
            "Cameroon": [7.3697, 12.3547],
            "Belgian Congo": [-4.0383, 21.7587], // Now Democratic Republic of Congo
            "Sudan": [12.8628, 30.2176],
            "Ethiopia": [9.1450, 40.4897],
            "Kenya": [0.0236, 37.9062],
            "Senegal": [14.4974, -14.4524],
            "Gambia": [13.4432, -15.3101],
            "Freetown": [8.4657, -13.2317],
            "Kano": [12.0000, 8.5167],
            "Zaria": [11.0850, 7.7199],
            "Sokoto": [13.0667, 5.2333],
            "Warri": [5.5167, 5.7500]
        };

        // List of words to search for in the text
        let locationKeywords = Object.keys(locationCoordinates);

        // Pre-compile location patterns for performance
        let escapedLocationPatterns = {};
        if (locationKeywords && Array.isArray(locationKeywords)) {
            locationKeywords.forEach(k => {
                escapedLocationPatterns[k] = new RegExp('\\b' + escapeRegExp(k) + '\\b', 'gi');
            });
        }

        // Important contextual keywords that might indicate relevance
        const importantKeywords = [
            "important", "significant", "key", "major", "critical", "essential", "crucial",
            "notable", "remarkable", "prominent", "leading", "main", "principal", "chief",
            "central", "vital", "primary", "foremost", "dominant", "distinguished", "renowned",
            "eminent", "paramount", "preeminent", "notable", "famous", "capital", "government",
            "trade", "colonial", "development", "policy", "administration", "political", "economic",
            "social", "cultural", "historical", "traditional", "native", "indigenous", "foreign",
            "imperial", "commercial", "industrial", "agricultural", "educational", "religious",
            "military", "naval", "diplomatic", "strategic", "geographic", "demographic"
        ];

        // Words to exclude from related terms/themes (stop words)
        const stopWords = [
            "the", "and", "a", "an", "in", "on", "at", "to", "for", "with", "by", "of", "that",
            "this", "as", "from", "be", "been", "being", "was", "were", "is", "are", "am", "have",
            "has", "had", "will", "would", "shall", "should", "may", "might", "must", "can", "could",
            "it", "its", "it's", "they", "them", "their", "we", "us", "our", "you", "your", "he",
            "him", "his", "she", "her", "hers", "which", "who", "whom", "whose", "what", "where",
            "when", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other",
            "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very"
        ];

        // Variables to keep track of data and UI state
        let map;
        let allLocations = []; // Will store all processed locations data
        let filteredLocations = []; // Will store filtered locations
        let selectedLocation = null;
        let markers = {};
        let rawData = []; // Store original CSV data
        let availableYears = []; // Store unique years from data
        let selectedPeriod = null; // Current selected time period
        let displayMode = "top"; // 'top' or 'threshold'
        let displayValue = 30; // Default to show top 30 locations

        // Global variable to track upload status
        let analysisFileUploaded = false;
        let locationFileUploaded = false;
        let customLocationData = null; // Will store the uploaded location data

        // Handle location file upload
        function handleLocationFileUpload(files) {
            if (files.length === 0) return;

            const file = files[0];
            document.getElementById('location-file-name').textContent = file.name;

            // Show loading notification
            document.getElementById('upload-status').textContent = "Reading location data...";

            // Read and process the file
            const reader = new FileReader();
            reader.onload = function(e) {
                console.log("[DEBUG] FileReader onload triggered for location file");
                const csvData = e.target.result;
                processLocationCSV(csvData);
            };
            reader.onerror = function(error) {
                console.error("[DEBUG] FileReader error:", error);
                document.getElementById('upload-status').textContent = translations[currentLanguage].errorReadingLocation;
            };
            console.log("[DEBUG] Starting to read location file:", file.name);
            reader.readAsText(file);
        }

        // Process location CSV data
        function processLocationCSV(csvData) {
            console.log("[DEBUG] processLocationCSV called, data length:", csvData ? csvData.length : 0);

            // Parse CSV using PapaParse
            Papa.parse(csvData, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                worker: true,
                complete: function(results) {
                    console.log("[DEBUG] Papa.parse complete callback triggered");
                    console.log("[DEBUG] Parsed rows:", results.data ? results.data.length : 0);
                    // Log the column names to debug
                    console.log("Location CSV Headers:", results.meta.fields);

                    // Check if the CSV has the required columns
                    const fields = results.meta.fields.map(field => field.toLowerCase());
                    if (!fields.includes('placename') || !fields.includes('latitude') || !fields.includes('longitude')) {
                        document.getElementById('upload-status').textContent =
                            translations[currentLanguage].errorLocationColumns;
                        return;
                    }

                    // Process and store the location data
                    customLocationData = processLocationData(results.data);

                    // Update status
                    const locationCount = Object.keys(customLocationData).length;
                    document.getElementById('upload-status').textContent =
                        translations[currentLanguage].locationFileLoaded + (analysisFileUploaded ? ` ${translations[currentLanguage].bothFilesReady}` : "");

                    locationFileUploaded = true;
                    updateStartButtonVisibility();
                },
                error: function(error) {
                    console.error("[DEBUG] Papa.parse error:", error);
                    document.getElementById('upload-status').textContent = `${translations[currentLanguage].failedParseLocation} ${error.message}`;
                }
            });

            console.log("[DEBUG] Papa.parse initiated");
        }

        // Process location data from CSV to format needed by application
        function processLocationData(data) {
            const locations = {};

            data.forEach(row => {
                // Get column names (accounting for case insensitivity)
                const placenameKey = Object.keys(row).find(
                    key => key.toLowerCase() === 'placename');
                const latKey = Object.keys(row).find(
                    key => key.toLowerCase() === 'latitude');
                const lngKey = Object.keys(row).find(
                    key => key.toLowerCase() === 'longitude');

                if (placenameKey && latKey && lngKey) {
                    const placename = row[placenameKey];
                    const lat = parseFloat(row[latKey]);
                    const lng = parseFloat(row[lngKey]);

                    // Only add if we have valid coordinates
                    if (placename && !isNaN(lat) && !isNaN(lng)) {
                        locations[placename] = [lat, lng];
                    }
                }
            });

            return locations;
        }

        // Modified version of existing handleFileUpload function
        function handleFileUpload(files) {
            if (files.length === 0) return;

            const file = files[0];
            document.getElementById('file-name').textContent = file.name;

            // Just store the file reference, don't process yet
            window.analysisFile = file;
            analysisFileUploaded = true;

            // Update status
            document.getElementById('upload-status').textContent =
                translations[currentLanguage].analysisFileLoaded + (locationFileUploaded ? ` ${translations[currentLanguage].bothFilesReady}` : "");

            updateStartButtonVisibility();
        }

        // Update visibility of the start button
        function updateStartButtonVisibility() {
            const startContainer = document.getElementById('start-analysis-container');
            if (analysisFileUploaded && locationFileUploaded) {
                startContainer.style.display = 'block';
            } else {
                startContainer.style.display = 'none';
            }
        }

        // Start the analysis with both files
        function startAnalysis() {
            // Show loading spinner
            document.getElementById('loading').style.display = 'flex';

            // Hide file upload container and show visualization container
            document.getElementById('file-upload-container').style.display = 'none';
            document.getElementById('visualization-container').style.display = 'flex';

            // Replace the default locationCoordinates with our custom data
            locationCoordinates = customLocationData;

            // Update the locationKeywords array from the new data
            locationKeywords = Object.keys(locationCoordinates);

            // Pre-compile location patterns for performance
            let escapedLocationPatterns = {};
            if (locationKeywords && Array.isArray(locationKeywords)) {
                locationKeywords.forEach(k => {
                    escapedLocationPatterns[k] = new RegExp('\\b' + escapeRegExp(k) + '\\b', 'gi');
                });
            }

            // Process the analysis file
            const reader = new FileReader();
            reader.onload = function(e) {
                const csvData = e.target.result;
                processCSVData(csvData);
            };
            reader.onerror = function() {
                showError(translations[currentLanguage].errorReadingAnalysis);
            };
            reader.readAsText(window.analysisFile);
        }

        // Define periods for filtering
        const timePeriods = [
            { label: "1891-1895", start: 1891, end: 1895 },
            { label: "1896-1900", start: 1896, end: 1900 },
            { label: "1901-1905", start: 1901, end: 1905 },
            { label: "1906-1910", start: 1906, end: 1910 },
            { label: "1911-1915", start: 1911, end: 1915 },
            { label: "1916-1921", start: 1916, end: 1921 }
        ];

        // Tab switching functionality — data-tab based (no inline dependency)
        function switchTab(tabId) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));

            // Toggle active state on tab buttons using data-tab
            document.querySelectorAll('.nav-tab').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === tabId);
            });

            // Show selected tab
            const target = document.getElementById(tabId);
            if (target) target.classList.add('active');
        }

        // Process CSV data
        function processCSVData(csvData) {
            console.log("[DEBUG] processCSVData called, data length:", csvData ? csvData.length : 0);

            // Parse CSV using PapaParse
            Papa.parse(csvData, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                worker: true,
                complete: function(results) {
                    console.log("[DEBUG] Analysis CSV Papa.parse complete callback triggered");
                    console.log("[DEBUG] Parsed rows:", results.data ? results.data.length : 0);
                    // Log the column names to debug
                    console.log("CSV Headers:", results.meta.fields);

                    // Store raw data
                    rawData = results.data;

                    // Extract available years
                    extractYears();

                    // Setup period filter buttons
                    setupPeriodFilters();

                    // Process the data
                    initializeMap();
                    allLocations = processText(rawData);
                    filteredLocations = [...allLocations]; // Initial state is unfiltered
                    populateLocationsList();
                    addMarkersToMap();

                    // Hide loading spinner
                    document.getElementById('loading').style.display = 'none';

                    // Select first location
                    if (filteredLocations.length > 0) {
                        showLocationDetails(filteredLocations[0]);
                    }

                    // Update filter info
                    updateFilterInfo();

                    // Analyze the default keyword (Yoruba)
                    analyzeKeyword();
                },
                error: function(error) {
                    console.error("[DEBUG] Analysis CSV Papa.parse error:", error);
                    showError(translations[currentLanguage].failedParseCSV + " " + error.message);
                }
            });

            console.log("[DEBUG] Analysis CSV Papa.parse initiated");
        }

        // Extract unique years from the data
        function extractYears() {
            const yearSet = new Set();

            rawData.forEach(article => {
                // Try to get year from different possible column names
                const year = article.Year || article.year;
                if (year) {
                    yearSet.add(year);
                }
            });

            availableYears = Array.from(yearSet).sort();
            console.log("Available years:", availableYears);
        }

        // Setup period filter buttons
        function setupPeriodFilters() {
            const periodsContainer = document.getElementById('periods-container');
            periodsContainer.innerHTML = '';

            timePeriods.forEach(period => {
                const button = document.createElement('button');
                button.className = 'period-button';
                button.textContent = period.label;
                button.addEventListener('click', function() {
                    applyPeriodFilter(period);
                });
                periodsContainer.appendChild(button);
            });
        }

        // Apply period filter
        function applyPeriodFilter(period) {
            selectedPeriod = period;

            // Update UI for active period
            document.querySelectorAll('.period-button').forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent === period.label) {
                    btn.classList.add('active');
                }
            });

            // Filter data to selected period
            const filteredData = rawData.filter(article => {
                const year = article.Year || article.year;
                return year >= period.start && year <= period.end;
            });

            // Reprocess text with filtered data
            filteredLocations = processText(filteredData);

            // Update map and list
            updateVisualization();

            // Update filter info
            updateFilterInfo();
        }

        // Reset all filters
        function resetFilters() {
            selectedPeriod = null;

            // Reset UI
            document.querySelectorAll('.period-button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Use all data
            filteredLocations = [...allLocations];

            // Update map and list
            updateVisualization();

            // Update filter info
            updateFilterInfo();
        }

        // Update filter info text
        function updateFilterInfo() {
            const filterInfo = document.getElementById('filter-info');
            if (selectedPeriod) {
                filterInfo.textContent = `${translations[currentLanguage].filteringYears} ${selectedPeriod.start} ${translations[currentLanguage].yearTo} ${selectedPeriod.end}`;
            } else {
                filterInfo.textContent = `${translations[currentLanguage].filteringYears} ${translations[currentLanguage].allYears}`;
            }
        }

        // Update visualization after filter change
        function updateVisualization() {
            // Clear existing markers
            for (const key in markers) {
                map.removeLayer(markers[key]);
            }
            markers = {};

            // Update the list and add new markers
            populateLocationsList();
            addMarkersToMap();

            // Select first location or clear details if empty
            if (filteredLocations.length > 0) {
                showLocationDetails(filteredLocations[0]);
            } else {
                document.getElementById('details-container').style.display = 'none';
            }
        }

        // Initialize map with OpenStreetMap standard tiles
        function initializeMap() {
            map = L.map('map').setView([15, 10], 2);

            // Use OpenStreetMap standard tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19
            }).addTo(map);
        }

        // Functions for styling markers
        function getMarkerColor(count) {
            if (count > 300) return "#08306b"; // Very dark blue
            if (count > 150) return "#2171b5";
            if (count > 100) return "#4292c6";
            if (count > 50) return "#6baed6";
            if (count > 25) return "#9ecae1";
            return "#c6dbef"; // Light blue
        }

        function getMarkerRadius(count) {
            const c = Math.max(1, Number(count) || 0);
            return Math.min(25, Math.max(8, Math.log(c) * 3.5));
        }

        // Process the raw text to find and count locations
        // [FIXED] Performance improvement: use pre-compiled regex patterns
        function processText(textData) {
            const locationMentions = {};
            const locationArticles = {};
            const locationQuotes = {};
            const locationYears = {}; // Track mentions by year

            // [FIXED] Ensure compiled patterns exist (fallback re-compilation)
            if (!escapedLocationPatterns || Object.keys(escapedLocationPatterns).length === 0) {
                console.error("Location patterns not compiled! Re-compiling...");
                escapedLocationPatterns = {};
                if (locationKeywords && Array.isArray(locationKeywords)) {
                    locationKeywords.forEach(k => {
                        escapedLocationPatterns[k] = new RegExp('\\b' + escapeRegExp(k) + '\\b', 'gi');
                    });
                }
            }

            textData.forEach(article => {
                const text = article.text || "";

                // Handle publication date
                let publicationDate = article["Publication Date"] || article["Publication Date "] || "";

                // Get year
                const year = article.Year || article.year;

                // Track locations found in this article to count unique articles
                const locationsInThisArticle = new Set();

                // Search for each location in the text
                for (const location of locationKeywords) {
                    // [FIXED] Use pre-compiled regex pattern (major performance improvement)
                    const regex = escapedLocationPatterns[location];

                    // Skip if pattern not found
                    if (!regex) {
                        continue;
                    }

                    let matches = [];
                    let match;

                    // [CRITICAL] Reset lastIndex for global regex reuse
                    regex.lastIndex = 0;

                    // Find all matches and collect their positions
                    while ((match = regex.exec(text)) !== null) {
                        matches.push({
                            index: match.index,
                            text: match[0]
                        });
                    }

                    if (matches.length > 0) {
                        // Count mentions
                        locationMentions[location] = (locationMentions[location] || 0) + matches.length;

                        // Track mentions by year
                        if (year) {
                            if (!locationYears[location]) {
                                locationYears[location] = {};
                            }
                            locationYears[location][year] = (locationYears[location][year] || 0) + matches.length;
                        }

                        // Mark this article as containing this location
                        locationsInThisArticle.add(location);

                        // Find the best quotes for this location using improved algorithm
                        if (!locationQuotes[location]) {
                            locationQuotes[location] = [];
                        }

                        // Only find quotes if we need more for this location
                        if (locationQuotes[location].length < 3) { // Store up to 3 quotes for diversity
                            // Score all mentions and find the best ones
                            const scoredMentions = matches.map(match => {
                                const score = evaluateMentionImportance(text, match.index, location);
                                return {
                                    index: match.index,
                                    score: score
                                };
                            });

                            // Sort by score, highest first
                            scoredMentions.sort((a, b) => b.score - a.score);

                            // Select best mention with diversity consideration
                            const selectedMentions = selectDiverseMentions(scoredMentions, text, locationQuotes[location]);

                            // Process selected mentions into quotes
                            selectedMentions.forEach(mention => {
                                const quote = extractQuoteWithSentenceBoundaries(text, mention.index, location);

                                locationQuotes[location].push({
                                    quote: quote,
                                    date: publicationDate,
                                    year: year,
                                    score: mention.score,
                                    articleId: article.no || article.id || 0
                                });
                            });
                        }
                    }
                }

                // Count unique articles for each location
                locationsInThisArticle.forEach(location => {
                    locationArticles[location] = (locationArticles[location] || 0) + 1;
                });
            });

            // Sort quotes by relevance score
            Object.keys(locationQuotes).forEach(location => {
                locationQuotes[location].sort((a, b) => b.score - a.score);
                // Keep top 3 quotes maximum
                locationQuotes[location] = locationQuotes[location].slice(0, 3);
            });

            // Combine the data
            let locationsData = Object.keys(locationMentions).map(name => ({
                name,
                count: locationMentions[name],
                articleCount: locationArticles[name] || 0,
                coordinates: locationCoordinates[name],
                quotes: locationQuotes[name] || [],
                yearData: locationYears[name] || {}
            }));

            // Sort by count (most mentions first)
            locationsData.sort((a, b) => b.count - a.count);

            // Apply display filter (top N or threshold)
            if (displayMode === "top") {
                return locationsData.slice(0, displayValue);
            } else {
                // Threshold mode - show all locations with count >= threshold
                return locationsData.filter(loc => loc.count >= displayValue);
            }
        }

        // Evaluate the importance of a location mention based on its context
        function evaluateMentionImportance(text, index, location) {
            let score = 0;

            // 1. Position-based importance
            const positionRatio = index / text.length;

            // Beginning of text (introduction) - high importance
            if (positionRatio < 0.2) {
                score += 4;
            }
            // End of text (conclusion) - high importance
            else if (positionRatio > 0.8) {
                score += 3;
            }
            // Middle of text - context-dependent importance
            else {
                score += 1;
            }

            // 2. Context-based importance: check for important keywords nearby
            const contextWindow = 100; // Look 100 chars before and after
            const contextStart = Math.max(0, index - contextWindow);
            const contextEnd = Math.min(text.length, index + contextWindow);
            const context = text.substring(contextStart, contextEnd).toLowerCase();

            // Check for important contextual keywords
            importantKeywords.forEach(keyword => {
                if (context.includes(keyword.toLowerCase())) {
                    score += 2;
                }
            });

            // 3. Density-based importance: Check if location is mentioned multiple times nearby
            const localDensity = countOccurrences(context, location.toLowerCase());
            score += Math.min(3, localDensity - 1); // Add up to 3 points for multiple mentions

            // 4. Look for indicators of a focused discussion about the location
            if (context.includes(location.toLowerCase() + " is") ||
                context.includes(location.toLowerCase() + " was") ||
                context.includes(location.toLowerCase() + " has") ||
                context.includes(location.toLowerCase() + " had") ||
                context.includes("in " + location.toLowerCase()) ||
                context.includes("at " + location.toLowerCase()) ||
                context.includes("of " + location.toLowerCase())) {
                score += 3;
            }

            // 5. Check if it's at the beginning of a paragraph/sentence
            const prevNewline = text.lastIndexOf('\n', index);
            const prevPeriod = text.lastIndexOf('.', index);
            if ((prevNewline > -1 && index - prevNewline < 50) ||
                (prevPeriod > -1 && index - prevPeriod < 20)) {
                score += 2;
            }

            return score;
        }

        // Helper function to count occurrences of a substring
        function countOccurrences(text, substr) {
            let count = 0;
            let pos = text.indexOf(substr);

            while (pos !== -1) {
                count++;
                pos = text.indexOf(substr, pos + 1);
            }

            return count;
        }

        // Select diverse mentions to avoid redundancy
        function selectDiverseMentions(scoredMentions, text, existingQuotes) {
            if (scoredMentions.length === 0) return [];

            const maxToSelect = 3 - existingQuotes.length;
            if (maxToSelect <= 0) return [];

            const selected = [];
            const existingTexts = existingQuotes.map(q => q.quote.toLowerCase());

            // Always take the highest scored mention first
            selected.push(scoredMentions[0]);

            // Then, add other mentions that are diverse enough
            for (let i = 1; i < scoredMentions.length && selected.length < maxToSelect; i++) {
                const candidateContext = extractContext(text, scoredMentions[i].index, 100);

                // Check if this candidate is similar to already selected mentions
                let isDiverse = true;

                // Check against existing quotes
                for (const existingText of existingTexts) {
                    const similarity = calculateSimilarity(candidateContext.toLowerCase(), existingText);
                    if (similarity > 0.5) { // More than 50% similar, skip this
                        isDiverse = false;
                        break;
                    }
                }

                // Check against already selected mentions in this round
                for (const selectedMention of selected) {
                    const selectedContext = extractContext(text, selectedMention.index, 100);
                    const similarity = calculateSimilarity(candidateContext.toLowerCase(), selectedContext.toLowerCase());
                    if (similarity > 0.5) {
                        isDiverse = false;
                        break;
                    }
                }

                if (isDiverse) {
                    selected.push(scoredMentions[i]);
                }
            }

            return selected;
        }

        // Helper function to extract context around an index
        function extractContext(text, index, windowSize) {
            const start = Math.max(0, index - windowSize);
            const end = Math.min(text.length, index + windowSize);
            return text.substring(start, end);
        }

        // Simple text similarity measure (Jaccard similarity on words)
        function calculateSimilarity(text1, text2) {
            const words1 = new Set(text1.split(/\s+/).filter(w => w.length > 3));
            const words2 = new Set(text2.split(/\s+/).filter(w => w.length > 3));

            if (words1.size === 0 || words2.size === 0) return 0;

            // Find intersection
            let intersection = 0;
            for (const word of words1) {
                if (words2.has(word)) {
                    intersection++;
                }
            }

            // Jaccard similarity: size of intersection / size of union
            const union = words1.size + words2.size - intersection;
            return intersection / union;
        }

        // Extract quote with proper sentence boundaries
        function extractQuoteWithSentenceBoundaries(text, mentionIndex, location) {
            // Define sentence endings
            const sentenceEndings = ['. ', '! ', '? ', '.\n', '!\n', '?\n'];
            const maxSentences = 3; // Maximum number of sentences to include

            // Find the start of the sentence containing the mention
            let sentenceStart = 0;
            for (let i = mentionIndex - 1; i >= 0; i--) {
                if (sentenceEndings.some(ending => text.substring(i - 1, i + 1) === ending)) {
                    sentenceStart = i + 1;
                    break;
                }
            }

            // Find previous sentence starts for context
            let contextStart = sentenceStart;
            let sentencesBeforeCount = 0;
            for (let i = sentenceStart - 2; i >= 0 && sentencesBeforeCount < Math.floor(maxSentences / 2); i--) {
                if (sentenceEndings.some(ending => text.substring(i - 1, i + 1) === ending)) {
                    contextStart = i + 1;
                    sentencesBeforeCount++;
                }
            }

            // Find the end of the sentence containing the mention
            let sentenceEnd = text.length;
            for (let i = mentionIndex; i < text.length; i++) {
                if (sentenceEndings.some(ending => text.substring(i, i + 2) === ending)) {
                    sentenceEnd = i + 1;
                    break;
                }
            }

            // Find next sentence ends for context
            let contextEnd = sentenceEnd;
            let sentencesAfterCount = 0;
            for (let i = sentenceEnd + 1; i < text.length && sentencesAfterCount < Math.floor(maxSentences / 2); i++) {
                if (sentenceEndings.some(ending => text.substring(i, i + 2) === ending)) {
                    contextEnd = i + 1;
                    sentencesAfterCount++;
                }
            }

            // Extract the quote with proper context
            let quote = text.substring(contextStart, contextEnd).trim();

            // Add ellipsis if we're not at the beginning or end of the text
            if (contextStart > 0) quote = "..." + quote;
            if (contextEnd < text.length) quote = quote + "...";

            // For multiple keywords, highlight all possible variants using safe function
            if (typeof location === 'string') {
                // Single keyword case (backward compatibility)
                quote = highlightTermsSafe(quote, location);
            } else if (Array.isArray(location)) {
                // Multiple keywords case
                quote = highlightTermsSafe(quote, location);
            } else {
                // Just highlight the term as-is if we received unexpected type
                quote = highlightTermsSafe(quote, location);
            }

            return quote;
        }

        // Toggle quotes visibility
        function toggleQuotes() {
            const quoteSection = document.getElementById('quote-section');
            const toggleBtn = document.getElementById('toggle-quotes-btn');

            if (quoteSection.style.display === 'none') {
                quoteSection.style.display = 'block';
                toggleBtn.textContent = translations[currentLanguage].hideQuotes;
            } else {
                quoteSection.style.display = 'none';
                toggleBtn.textContent = translations[currentLanguage].showQuotes;
            }
        }

        // Function to show location details
        function showLocationDetails(location) {
            selectedLocation = location;

            // Update the details container
            document.getElementById('details-title').textContent = location.name;
            document.getElementById('details-mentions').textContent = location.count;
            document.getElementById('details-articles').textContent = location.articleCount;

            // Reset quotes toggle button
            document.getElementById('toggle-quotes-btn').textContent = 'Show Quotes';
            document.getElementById('quote-section').style.display = 'none';

            // Show the details container
            document.getElementById('details-container').style.display = 'block';

            // Prepare quotes (but don't show them yet)
            const quotesContainer = document.getElementById('quotes-container');
            quotesContainer.innerHTML = '';

            if (location.quotes && location.quotes.length > 0) {
                // Filter quotes by selected period if needed
                let displayQuotes = location.quotes;
                if (selectedPeriod) {
                    displayQuotes = location.quotes.filter(quote =>
                        quote.year >= selectedPeriod.start && quote.year <= selectedPeriod.end
                    );
                }

                if (displayQuotes.length > 0) {
                    displayQuotes.forEach(quote => {
                        const quoteElement = document.createElement('div');
                        const formattedDate = quote.date ? quote.date : (quote.year ? quote.year.toString() : 'Unknown date');

                        // Calculate a percentage for the visual meter (normalize score to 0-100%)
                        const relevancePercent = Math.min(100, Math.round((quote.score / 20) * 100));

                        // Create detailed score breakdown for tooltip
                        const scoreDetails = `
                            Raw Score: ${quote.score} / 20
                            Relevance: ${relevancePercent}%

                            Factors that may have contributed:
                            - Position in text
                            - Important keywords nearby
                            - Multiple mentions in same context
                            - Sentence structure and completeness
                            - Paragraph position
                        `;

                        // quote.quote already contains safe HTML from highlightTermsSafe (in extractQuoteWithSentenceBoundaries)
                        const blockquote = document.createElement('blockquote');
                        blockquote.innerHTML = String(quote.quote ?? "");
                        quoteElement.appendChild(blockquote);

                        const quoteSource = document.createElement('div');
                        quoteSource.className = 'quote-source';
                        quoteSource.textContent = `Source: ${formattedDate ?? "Unknown date"}`;
                        quoteElement.appendChild(quoteSource);

                        const quoteRelevance = document.createElement('div');
                        quoteRelevance.className = 'quote-relevance';
                        quoteRelevance.setAttribute('title', escapeHTML(scoreDetails));
                        quoteRelevance.innerHTML = `
                            Relevance: <span class="relevance-score">${Number(quote.score)||0}/20</span>
                            <div class="relevance-meter" title="${escapeHTML(scoreDetails)}">
                                <div class="relevance-fill" style="width: ${relevancePercent}%"></div>
                            </div>
                        `;
                        quoteElement.appendChild(quoteRelevance);

                        quotesContainer.appendChild(quoteElement);
                    });
                } else {
                    quotesContainer.innerHTML = '<p>No quotes available for this location in the selected time period.</p>';
                }
            } else {
                quotesContainer.innerHTML = '<p>No quotes available for this location.</p>';
            }

            // Highlight the selected location in the list
            document.querySelectorAll('.location-item').forEach(item => {
                item.classList.remove('active');
            });

            const selectedElement = document.querySelector(`.location-item[data-name="${location.name}"]`);
            if (selectedElement) {
                selectedElement.classList.add('active');

                // Ensure the selected item is visible in the list
                selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            // Center map on location
            if (location.coordinates) {
                map.setView(location.coordinates, 4);
                if (markers[location.name]) {
                    markers[location.name].openTooltip();
                }
            }
        }

        // Function to populate the locations list
        function populateLocationsList() {
            const locationList = document.getElementById('location-list');
            locationList.innerHTML = '';

            filteredLocations.forEach((location, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'location-item';
                listItem.setAttribute('data-name', location.name);

                // Create location details div
                const detailsDiv = document.createElement('div');
                detailsDiv.className = 'location-details';

                // Create location name div
                const nameDiv = document.createElement('div');
                nameDiv.className = 'location-name';
                nameDiv.textContent = `${index + 1}. ${location.name}`;

                // Create location count div
                const countDiv = document.createElement('div');
                countDiv.className = 'location-count';
                countDiv.textContent = `Mentioned in ${location.articleCount} articles`;

                // Append to details div
                detailsDiv.appendChild(nameDiv);
                detailsDiv.appendChild(countDiv);

                // Create count badge
                const badge = document.createElement('div');
                badge.className = 'count-badge';
                badge.textContent = location.count;

                // Append to list item
                listItem.appendChild(detailsDiv);
                listItem.appendChild(badge);

                listItem.addEventListener('click', () => {
                    showLocationDetails(location);
                });

                locationList.appendChild(listItem);
            });
        }

        // Function to add markers to the map
        function addMarkersToMap() {
            filteredLocations.forEach(location => {
                if (!location.coordinates) return;

                const markerRadius = getMarkerRadius(location.count);
                const markerColor = getMarkerColor(location.count);

                const circleMarker = L.circleMarker(location.coordinates, {
                    radius: markerRadius,
                    fillColor: markerColor,
                    color: '#fff',
                    weight: 1,
                    opacity: 0.8,
                    fillOpacity: 0.7
                }).addTo(map);

                // Create tooltip with period-specific info if a period is selected
                let tooltipContent = `
                    <div>
                        <strong>${escapeHTML(location.name)}</strong>
                        <div>${location.count} mentions in ${location.articleCount} articles</div>
                    </div>
                `;

                if (selectedPeriod) {
                    tooltipContent = `
                        <div>
                            <strong>${escapeHTML(location.name)}</strong>
                            <div>${location.count} mentions in ${location.articleCount} articles (${selectedPeriod.start}-${selectedPeriod.end})</div>
                        </div>
                    `;
                }

                circleMarker.bindTooltip(tooltipContent);

                circleMarker.on('click', () => {
                    showLocationDetails(location);
                });

                markers[location.name] = circleMarker;
            });
        }

        // Show error message
        function showError(message) {
            const loading = document.getElementById('loading');
            // XSS-safe: Use textContent instead of innerHTML
            loading.textContent = "";  // Clear existing content
            const errDiv = document.createElement('div');
            errDiv.className = 'error';
            errDiv.textContent = String(message ?? "Error");  // Safely set as text
            loading.appendChild(errDiv);
            loading.style.display = 'flex';
        }

        // Function to change display mode (top N or threshold)
        function changeDisplayMode() {
            displayMode = document.getElementById('display-mode').value;

            // Adjust label and placeholder based on mode
            const inputEl = document.getElementById('display-value');
            if (displayMode === "top") {
                inputEl.placeholder = "Number";
                inputEl.min = "5";
                inputEl.max = "100";
                if (displayValue > 100) displayValue = 100;
                if (displayValue < 5) displayValue = 5;
            } else {
                inputEl.placeholder = "Minimum";
                inputEl.min = "1";
                inputEl.max = "1000";
                if (displayValue < 1) displayValue = 1;
            }

            // Update value display
            inputEl.value = displayValue;

            // Update header text
            updateHeaderText();

            // Refilter and update visualization
            updateDisplaySetting();
        }

        // Function to update display setting (N or threshold value)
        function updateDisplaySetting() {
            const newValue = parseInt(document.getElementById('display-value').value);
            if (!isNaN(newValue) && newValue > 0) {
                displayValue = newValue;

                // Update header text
                updateHeaderText();

                // Reprocess with current time filter
                if (selectedPeriod) {
                    const filteredData = rawData.filter(article => {
                        const year = article.Year || article.year;
                        return year >= selectedPeriod.start && year <= selectedPeriod.end;
                    });
                    filteredLocations = processText(filteredData);
                } else {
                    filteredLocations = processText(rawData);
                }

                // Update visualization
                updateVisualization();
            }
        }

        // Update header text based on current settings
        function updateHeaderText() {
            const headerEl = document.getElementById('location-header-text');
            if (displayMode === "top") {
                headerEl.textContent = `Top ${displayValue} Geographic Mentions`;
            } else {
                headerEl.textContent = `Geographic Mentions (${displayValue}+ occurrences)`;
            }
        }

        // Function to analyze a specific keyword
        function analyzeKeyword() {
            // Show loading spinner
            document.getElementById('loading').style.display = 'flex';

            // Get the keywords from input (may include multiple comma-separated values)
            const keywordInput = document.getElementById('keyword-input').value.trim();

            if (!keywordInput) {
                document.getElementById('loading').style.display = 'none';
                return;
            }

            // Split input by commas and trim each keyword
            const keywords = keywordInput.split(',').map(k => k.trim()).filter(k => k.length > 0);

            if (keywords.length === 0) {
                document.getElementById('loading').style.display = 'none';
                return;
            }

            // Process the keyword analysis
            setTimeout(() => {
                // Extract the most relevant quotes for these keywords
                const bestQuotes = extractBestQuotesForMultipleKeywords(keywords, 10);

                // Find related terms (using the first keyword as primary, but searching in contexts of all)
                const relatedTerms = findRelatedTermsForMultipleKeywords(keywords);

                // Identify themes (using the primary keyword for display but analyzing all)
                const themes = identifyThemesForMultipleKeywords(keywords);

                // Get year-by-year mentions for all keywords combined
                const yearlyMentions = getYearlyMentionsForMultipleKeywords(keywords);

                // Update results display (using first keyword for display titles)
                const t = translations[currentLanguage];
                const displayKeyword = keywords.length > 1 ?
                                      `${keywords[0]} ${t.withVariations}` :
                                      keywords[0];

                updateKeywordResults(displayKeyword, bestQuotes, relatedTerms, themes, yearlyMentions);

                // Hide loading spinner
                document.getElementById('loading').style.display = 'none';
            }, 100);
        }

        // Function to extract the best quotes for multiple keywords
        function extractBestQuotesForMultipleKeywords(keywords, numberOfQuotes = 10) {
            const allQuotes = [];

            // [FIXED] Pre-compile regex patterns for all keywords (performance improvement)
            const keywordPatterns = {};
            keywords.forEach(keyword => {
                keywordPatterns[keyword] = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, 'gi');
            });

            // Process all articles
            rawData.forEach(article => {
                const text = article.text || "";
                const publicationDate = article["Publication Date"] || article["Publication Date "] || "";
                const year = article.Year || article.year;

                // Check for each keyword
                for (const keyword of keywords) {
                    // [FIXED] Use pre-compiled regex pattern
                    const regex = keywordPatterns[keyword];
                    regex.lastIndex = 0; // Reset for reuse
                    let match;

                    while ((match = regex.exec(text)) !== null) {
                        // Score this mention
                        const score = evaluateMentionImportance(text, match.index, keyword);

                        // Extract quote with proper sentence boundaries
                        const quote = extractQuoteWithSentenceBoundaries(text, match.index, keyword);

                        // Add to quotes collection
                        allQuotes.push({
                            quote: quote,
                            keyword: keyword,
                            date: publicationDate,
                            year: year,
                            score: score,
                            articleId: article.no || article.id || 0
                        });
                    }
                }
            });

            // Sort by score (highest first)
            allQuotes.sort((a, b) => b.score - a.score);

            // Select diverse quotes to avoid redundancy
            return selectDiverseQuotes(allQuotes, numberOfQuotes);
        }

        // Select diverse quotes from a collection of quotes
        function selectDiverseQuotes(quotes, maxQuotes) {
            if (quotes.length <= maxQuotes) return quotes;

            const selected = [quotes[0]]; // Always take highest scored quote

            for (let i = 1; i < quotes.length && selected.length < maxQuotes; i++) {
                let isDiverse = true;

                // Check similarity with already selected quotes
                for (const selectedQuote of selected) {
                    const similarity = calculateSimilarity(
                        quotes[i].quote.toLowerCase(),
                        selectedQuote.quote.toLowerCase()
                    );

                    if (similarity > 0.5) { // More than 50% similar
                        isDiverse = false;
                        break;
                    }
                }

                if (isDiverse) {
                    selected.push(quotes[i]);
                }
            }

            return selected;
        }

        // Find terms related to multiple keywords
        function findRelatedTermsForMultipleKeywords(keywords) {
            // Context window size (characters on either side of keyword)
            const contextWindowSize = 100;

            // Collect all words within context windows
            const wordCounts = {};
            const wordProximity = {}; // Average distance from keyword

            // [FIXED] Pre-compile regex patterns for all keywords (performance improvement)
            const keywordPatterns = {};
            keywords.forEach(keyword => {
                keywordPatterns[keyword] = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, 'gi');
            });

            rawData.forEach(article => {
                const text = article.text || "";

                // For each keyword in the list
                for (const keyword of keywords) {
                    // [FIXED] Use pre-compiled regex pattern
                    const regex = keywordPatterns[keyword];
                    regex.lastIndex = 0; // Reset for reuse
                    let match;

                    while ((match = regex.exec(text)) !== null) {
                        const keywordPos = match.index;

                        // Extract context around keyword
                        const contextStart = Math.max(0, keywordPos - contextWindowSize);
                        const contextEnd = Math.min(text.length, keywordPos + keyword.length + contextWindowSize);
                        const context = text.substring(contextStart, contextEnd);

                        // Extract words from context
                        const words = context.match(/\b[a-zA-Z]{3,}\b/g) || [];

                        // Count words and calculate proximity
                        words.forEach(word => {
                            word = word.toLowerCase();

                            // Skip all keywords in the list and stop words
                            if (keywords.some(k => k.toLowerCase() === word) || stopWords.includes(word)) {
                                return;
                            }

                            // Count occurrence
                            wordCounts[word] = (wordCounts[word] || 0) + 1;

                            // Calculate proximity (word position relative to keyword in this context)
                            const wordPos = context.toLowerCase().indexOf(word);
                            const distance = Math.abs(wordPos - (keywordPos - contextStart));

                            if (!wordProximity[word]) {
                                wordProximity[word] = { totalDistance: 0, count: 0 };
                            }

                            wordProximity[word].totalDistance += distance;
                            wordProximity[word].count += 1;
                        });
                    }
                }
            });

            // Calculate final proximity scores
            Object.keys(wordProximity).forEach(word => {
                wordProximity[word] = wordProximity[word].totalDistance / wordProximity[word].count;
            });

            // Create array of related terms with their counts
            const relatedTerms = Object.keys(wordCounts).map(word => ({
                term: word,
                count: wordCounts[word],
                proximity: wordProximity[word]
            }));

            // Sort by count (highest first), then by proximity (closest first)
            relatedTerms.sort((a, b) => {
                if (b.count !== a.count) {
                    return b.count - a.count;
                }
                return a.proximity - b.proximity;
            });

            // Return top 30 terms
            return relatedTerms.slice(0, 30);
        }

        // Identify themes related to multiple keywords
        function identifyThemesForMultipleKeywords(keywords) {
            // Extract the top 100 related terms
            const relatedTerms = findRelatedTermsForMultipleKeywords(keywords).slice(0, 100);

            // Define theme categories
            const themeCategories = {
                "Political": ["government", "administration", "political", "policy", "governor", "colony", "colonial", "rule", "ruling", "power", "authority", "council", "chief", "chiefs", "leadership"],
                "Cultural": ["tradition", "traditional", "culture", "language", "customs", "ritual", "ceremonies", "religion", "religious", "spiritual", "heritage", "identity", "beliefs", "practices"],
                "Economic": ["trade", "commercial", "market", "economic", "economy", "business", "commerce", "industry", "industrial", "money", "financial", "goods", "export", "import", "wealth"],
                "Education": ["education", "school", "training", "literacy", "college", "university", "teaching", "learning", "students", "scholars", "knowledge", "educational", "academic"],
                "Social": ["community", "social", "society", "family", "families", "marriage", "women", "men", "children", "youth", "elders", "home", "domestic", "urban", "rural"],
                "Geographic": ["land", "territory", "region", "area", "country", "city", "town", "village", "settlement", "coast", "river", "forest", "north", "south", "east", "west"],
                "Colonial Relations": ["british", "european", "foreign", "governor", "administration", "imperial", "empire", "crown", "colonial", "colonizer", "colonized", "native", "indigenous", "resistance", "control"]
            };

            // Count terms in each theme
            const themeCounts = {};
            const themeTerms = {};

            relatedTerms.forEach(item => {
                const term = item.term.toLowerCase();
                let foundTheme = false;

                for (const [theme, keywords] of Object.entries(themeCategories)) {
                    if (keywords.includes(term)) {
                        themeCounts[theme] = (themeCounts[theme] || 0) + item.count;
                        if (!themeTerms[theme]) {
                            themeTerms[theme] = [];
                        }
                        themeTerms[theme].push(term);
                        foundTheme = true;
                    }
                }

                // Terms that don't fit predefined categories
                if (!foundTheme) {
                    themeCounts["Other"] = (themeCounts["Other"] || 0) + item.count;
                    if (!themeTerms["Other"]) {
                        themeTerms["Other"] = [];
                    }
                    themeTerms["Other"].push(term);
                }
            });

            // Sort themes by count
            const sortedThemes = Object.keys(themeCounts)
                .map(theme => ({
                    theme,
                    count: themeCounts[theme],
                    terms: [...new Set(themeTerms[theme])].slice(0, 5) // Take 5 unique terms
                }))
                .sort((a, b) => b.count - a.count);

            return sortedThemes;
        }

        // Get yearly mentions of multiple keywords
        function getYearlyMentionsForMultipleKeywords(keywords) {
            const yearlyMentions = {};

            // [FIXED] Pre-compile regex patterns for all keywords (performance improvement)
            const keywordPatterns = {};
            keywords.forEach(keyword => {
                keywordPatterns[keyword] = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, 'gi');
            });

            rawData.forEach(article => {
                const text = article.text || "";
                const year = article.Year || article.year;

                if (!year) return;

                // Initialize count for this article
                let articleCount = 0;

                // Count mentions of each keyword
                for (const keyword of keywords) {
                    // [FIXED] Use pre-compiled regex pattern
                    const regex = keywordPatterns[keyword];
                    regex.lastIndex = 0; // Reset for reuse
                    const matches = text.match(regex);
                    if (matches) {
                        articleCount += matches.length;
                    }
                }

                // Add to yearly totals
                if (articleCount > 0) {
                    yearlyMentions[year] = (yearlyMentions[year] || 0) + articleCount;
                }
            });

            // Convert to array format
            return Object.keys(yearlyMentions)
                .map(year => ({
                    year: parseInt(year),
                    count: yearlyMentions[year]
                }))
                .sort((a, b) => a.year - b.year);
        }

        // Update the keyword analysis results display
        function updateKeywordResults(keyword, quotes, relatedTerms, themes, yearlyMentions) {
            // Store data for re-rendering on language switch
            currentKeywordData = { keyword, quotes, relatedTerms, themes, yearlyMentions };

            const resultsContainer = document.getElementById('keyword-results');
            resultsContainer.innerHTML = '';

            // 1. Create timeline chart
            const timelineSection = document.createElement('div');
            timelineSection.className = 'keyword-section';
            const t = translations[currentLanguage];
            timelineSection.innerHTML = `
                <div class="keyword-section-title">${t.mentionsOverTime.replace('{keyword}', keyword)}</div>
                <div class="timeline-chart" id="timeline-chart"></div>
                <div style="text-align: center; font-size: 12px; color: #555; margin-top: 5px;">
                    ${t.clickToEnlarge}
                </div>
            `;
            resultsContainer.appendChild(timelineSection);

            // Populate timeline chart
            createTimelineChart('timeline-chart', yearlyMentions);

            // 2. Create themes section
            const themesSection = document.createElement('div');
            themesSection.className = 'keyword-section';
            themesSection.innerHTML = `
                <div class="keyword-section-title">${t.mainThemesAssociated.replace('{keyword}', keyword)}</div>
                <div class="theme-container" id="theme-container"></div>
            `;
            resultsContainer.appendChild(themesSection);

            // Populate themes
            const themeContainer = document.getElementById('theme-container');
            themes.slice(0, 6).forEach(theme => {
                const themeCard = document.createElement('div');
                themeCard.className = 'theme-card';
                themeCard.innerHTML = `
                    <div class="theme-title">${theme.theme}</div>
                    <div class="theme-words">${theme.terms.join(', ')}</div>
                `;
                themeContainer.appendChild(themeCard);
            });

            // 3. Create related terms section
            const termsSection = document.createElement('div');
            termsSection.className = 'keyword-section';
            termsSection.innerHTML = `
                <div class="keyword-section-title">${t.termsFrequentlyAppearing.replace('{keyword}', keyword)}</div>
                <div class="related-terms" id="related-terms"></div>
            `;
            resultsContainer.appendChild(termsSection);

            // Populate related terms
            const termsContainer = document.getElementById('related-terms');
            relatedTerms.slice(0, 25).forEach(term => {
                const termTag = document.createElement('div');
                termTag.className = 'term-tag';
                termTag.innerHTML = `
                    ${term.term}
                    <span class="term-count">${term.count}</span>
                `;
                termsContainer.appendChild(termTag);
            });

            // 4. Create quotes section
            const quotesSection = document.createElement('div');
            quotesSection.className = 'keyword-section';
            quotesSection.innerHTML = `
                <div class="keyword-section-title">${t.mostRelevantQuotes.replace('{keyword}', escapeHTML(keyword))}</div>
                <div id="keyword-quotes-container"></div>
            `;
            resultsContainer.appendChild(quotesSection);

            // Populate quotes
            const quotesContainer = document.getElementById('keyword-quotes-container');
            if (quotes.length > 0) {
                quotes.forEach(quote => {
                    const quoteElement = document.createElement('div');
                    const formattedDate = quote.date ? quote.date : (quote.year ? quote.year.toString() : 'Unknown date');

                    // Calculate a percentage for the visual meter
                    const relevancePercent = Math.min(100, Math.round((quote.score / 20) * 100));

                    // Create detailed score breakdown for tooltip
                    const scoreDetails = `
                        Raw Score: ${quote.score} / 20
                        Relevance: ${relevancePercent}%

                        Factors that may have contributed:
                        - Position in text
                        - Important keywords nearby
                        - Multiple mentions in context
                        - Sentence structure and completeness
                        - Paragraph position
                    `;

                    // Highlighted, but still safe: only highlightTermsSafe supplies HTML (<strong>); user data is escaped inside it.
                    const blockquote = document.createElement('blockquote');
                    const terms = String(document.getElementById('keyword-input').value || "")
                        .split(',')
                        .map(s => s.trim())
                        .filter(Boolean);
                    blockquote.innerHTML = highlightTermsSafe(String(quote.quote ?? ""), terms);
                    quoteElement.appendChild(blockquote);

                    const quoteSource = document.createElement('div');
                    quoteSource.className = 'quote-source';
                    quoteSource.textContent = `Source: ${formattedDate ?? "Unknown date"}`;
                    quoteElement.appendChild(quoteSource);

                    const quoteRelevance = document.createElement('div');
                    quoteRelevance.className = 'quote-relevance';
                    quoteRelevance.setAttribute('title', escapeHTML(scoreDetails));
                    quoteRelevance.innerHTML = `
                        Relevance: <span class="relevance-score">${Number(quote.score)||0}/20</span>
                        <div class="relevance-meter" title="${escapeHTML(scoreDetails)}">
                            <div class="relevance-fill" style="width: ${relevancePercent}%"></div>
                        </div>
                    `;
                    quoteElement.appendChild(quoteRelevance);

                    quotesContainer.appendChild(quoteElement);
                });
            } else {
                quotesContainer.innerHTML = '<p>No quotes available for this keyword.</p>';
            }
        }

        // Create a timeline chart for yearly mentions
        function createTimelineChart(containerId, yearData) {
            const container = document.getElementById(containerId);
            container.innerHTML = '';

            if (yearData.length === 0) {
                container.innerHTML = '<p>No yearly data available for this keyword.</p>';
                return;
            }

            // Find maximum count for scaling
            const maxCount = Math.max(...yearData.map(d => d.count));

            // Create bar container
            const barContainer = document.createElement('div');
            barContainer.className = 'bar-container';
            container.appendChild(barContainer);

            // Create bars for each year
            yearData.forEach(yearItem => {
                const height = (yearItem.count / maxCount * 100);

                const bar = document.createElement('div');
                bar.className = 'year-bar';
                bar.style.height = `${height}%`;

                const yearLabel = document.createElement('div');
                yearLabel.className = 'year-label';
                yearLabel.textContent = yearItem.year;

                const countLabel = document.createElement('div');
                countLabel.className = 'count-label';
                countLabel.textContent = yearItem.count;

                bar.appendChild(yearLabel);
                bar.appendChild(countLabel);

                barContainer.appendChild(bar);
            });

            // Make the chart clickable to show enlarged view
            container.style.cursor = 'pointer';
            container.setAttribute('title', 'Click to enlarge');
            container.addEventListener('click', () => {
                showEnlargedChart(yearData);
            });
        }

        // Show enlarged chart in modal - 強化修正版
        function showEnlargedChart(yearData) {
            if (!yearData || yearData.length === 0) {
                console.error("No data provided to showEnlargedChart");
                return;
            }

            try {
                // Get the current keyword for the title
                const keyword = document.getElementById('keyword-input').value.trim();
                const t = translations[currentLanguage];

                // Set modal title
                document.getElementById('modal-chart-title').textContent = t.mentionsOverTime.replace('{keyword}', keyword);

                // Calculate total counts and find max value
                let totalCount = 0;
                let maxCount = 0;
                yearData.forEach(item => {
                    const count = item.count || 0;
                    totalCount += count;
                    maxCount = Math.max(maxCount, count);
                });

                const startYear = yearData[0].year;
                const endYear = yearData[yearData.length-1].year;
                document.getElementById('modal-chart-subtitle').textContent =
                    t.totalMentions
                        .replace('{total}', totalCount)
                        .replace('{start}', startYear)
                        .replace('{end}', endYear)
                        .replace('{max}', maxCount);

                // Clear previous chart
                const container = document.getElementById('enlarged-chart');
                if (!container) {
                    console.error("Could not find enlarged-chart container");
                    return;
                }
                container.innerHTML = '';

                // Create bar container with fixed width based on number of years
                const barContainer = document.createElement('div');
                barContainer.className = 'enlarged-bar-container';

                // Important: Set width based on number of bars
                // Each bar is 30px wide with 2px margin on each side
                const containerWidth = yearData.length * 34; // 30px + 2px margin on each side

                // If data points are few (chart is narrow), use auto width for centering
                // Otherwise, set explicit width for scrolling
                if (containerWidth < container.clientWidth) {
                    barContainer.style.width = 'auto';
                } else {
                    barContainer.style.width = `${containerWidth}px`;
                }

                container.appendChild(barContainer);

                // Scale factor to ensure we don't exceed the container height (with some padding)
                // Reserve 50px at the top for labels
                const maxHeight = 350; // Maximum height for bars in pixels
                const scaleFactor = maxHeight / maxCount;

                // Create bars for each year
                yearData.forEach(yearItem => {
                    // Safety check for valid count
                    const count = yearItem.count || 0;

                    // Calculate pixel height (scaled to fit)
                    const heightPixels = Math.max(1, count * scaleFactor);

                    // Create bar element with fixed height in pixels
                    const bar = document.createElement('div');
                    bar.className = 'enlarged-year-bar';
                    bar.style.height = `${heightPixels}px`;

                    // Year label below bar
                    const yearLabel = document.createElement('div');
                    yearLabel.className = 'enlarged-year-label';
                    yearLabel.textContent = yearItem.year;

                    // Count label above bar
                    const countLabel = document.createElement('div');
                    countLabel.className = 'enlarged-count-label';
                    countLabel.textContent = count;

                    // Add labels to bar
                    bar.appendChild(yearLabel);
                    bar.appendChild(countLabel);

                    // Add bar to container
                    barContainer.appendChild(bar);
                });

                // Show the modal
                const modal = document.getElementById('chart-modal');
                if (modal) {
                    modal.style.display = 'block';

                    // 1. barContainer (子) の中身を中央揃え
                    barContainer.style.display = 'flex';
                    barContainer.style.justifyContent = 'center';

                    // 2. container (親) で barContainer 自体を中央揃え
                    const parentWidth = container.clientWidth;

                    if (containerWidth < parentWidth) {
                        // データが少ない時は、親(container)が子(barContainer)を中央揃え
                        container.style.justifyContent = 'center';
                    } else {
                        // データが多い時は、スクロールのため左揃えに戻す
                        container.style.justifyContent = 'flex-start';
                    }

                    // スクロールの位置を左端に設定
                    setTimeout(() => {
                        barContainer.scrollLeft = 0;
                    }, 100);
                }
            } catch (error) {
                console.error("Error in showEnlargedChart:", error);
            }
        }

        // Close the modal - 修正版
        function closeModal() {
            const modal = document.getElementById('chart-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        }

        // Modal outside click handler - 修正版
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('chart-modal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Initialize the file upload functionality
        document.addEventListener('DOMContentLoaded', () => {
            // Set initial values
            document.getElementById('display-mode').value = displayMode;
            document.getElementById('display-value').value = displayValue;
            updateHeaderText();

            // Set up enter key in keyword search
            document.getElementById('keyword-input').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    analyzeKeyword();
                }
            });
        });



// Event binding - all inline event handlers converted to addEventListener
document.addEventListener('DOMContentLoaded', function() {
    // Language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchLanguage(this.getAttribute('data-lang'));
        });
    });

    // CSV file upload button (triggers hidden file input)
    const csvUploadBtn = document.querySelector('[data-i18n="selectAnalysisCSV"]');
    if (csvUploadBtn) {
        csvUploadBtn.addEventListener('click', function() {
            document.getElementById('csv-file').click();
        });
    }

    // CSV file input change handler
    const csvFileInput = document.getElementById('csv-file');
    if (csvFileInput) {
        csvFileInput.addEventListener('change', function() {
            handleFileUpload(this.files);
        });
    }

    // Location CSV upload button
    const locationUploadBtn = document.querySelector('[data-i18n="uploadLocationData"]');
    if (locationUploadBtn) {
        locationUploadBtn.addEventListener('click', function() {
            document.getElementById('location-csv-file').click();
        });
    }

    // Location CSV file input change handler
    const locationFileInput = document.getElementById('location-csv-file');
    if (locationFileInput) {
        locationFileInput.addEventListener('change', function() {
            handleLocationFileUpload(this.files);
        });
    }

    // Start analysis button
    const startBtn = document.querySelector('[data-i18n="startAnalysis"]');
    if (startBtn) {
        startBtn.addEventListener('click', startAnalysis);
    }

    // Tab navigation — use explicit data-tab attribute (decoupled from i18n)
    document.querySelectorAll('.nav-tab').forEach(tab => {
        const targetId = tab.dataset.tab; // e.g., "geo-tab" / "keyword-tab"
        if (targetId) {
            tab.addEventListener('click', () => switchTab(targetId));
        }
    });
    // Initialize to the active tab if present
    const active = document.querySelector('.nav-tab.active');
    if (active && active.dataset.tab) {
        switchTab(active.dataset.tab);
    }

    // Reset filter button
    const resetBtn = document.querySelector('.reset-filter');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }

    // Display mode selector
    const displayMode = document.getElementById('display-mode');
    if (displayMode) {
        displayMode.addEventListener('change', changeDisplayMode);
    }

    // Display value input
    const displayValue = document.getElementById('display-value');
    if (displayValue) {
        displayValue.addEventListener('change', updateDisplaySetting);
    }

    // Toggle quotes button
    const toggleQuotesBtn = document.getElementById('toggle-quotes-btn');
    if (toggleQuotesBtn) {
        toggleQuotesBtn.addEventListener('click', toggleQuotes);
    }

    // Keyword analyze button
    const analyzeBtn = document.querySelector('.keyword-search-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeKeyword);
    }

    // Modal close button
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Initialize language on load
    initializeLanguage();
});
