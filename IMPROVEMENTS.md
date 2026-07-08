# 今後の改善候補 / Future Improvement Candidates

2026-07-08 のデバッグ・UI改善作業(v1.5.0)の際に確認した、未着手の改善候補の記録です。
優先度や実施の要否はメンテナー(作者)の判断に委ねます。

This is a record of improvement candidates identified during the debugging /
UI-improvement work of 2026-07-08 (v1.5.0). None of these have been implemented
yet; prioritization is left to the maintainer.

---

## 1. コードの分割 / Splitting the single-file structure

- 現状、`index.html` が CSS・JavaScript・翻訳データを含む 3,000 行超の単一ファイルです。
- `styles.css` / `app.js` / `translations.js` などに分割すると、差分の確認やレビュー、
  今回のようなレイアウト修正が格段にやりやすくなります。
- GitHub Pages 等での公開形態は変わりません(参照パスを変えるだけ)。

Currently `index.html` is a single 3,000+ line file containing CSS, JavaScript,
and translation data. Splitting it into `styles.css` / `app.js` /
`translations.js` would make diffs, reviews, and layout fixes much easier,
without changing how the page is hosted.

## 2. ライブラリの同梱(オフライン対応)/ Vendoring libraries for offline use

- Leaflet と PapaParse を CDN (cdnjs) から読み込んでいるため、オフライン環境や
  CDN がブロックされるネットワークでは動作しません。
- `vendor/` ディレクトリにライブラリを同梱してそこから読み込めば、完全に
  スタンドアロンで動作します(CSP の許可リストも `'self'` だけに絞れます)。

Leaflet and PapaParse are loaded from cdnjs, so the app does not work offline
or on networks that block the CDN. Vendoring the libraries into a `vendor/`
directory would make the app fully standalone and allow tightening the CSP.

## 3. "Yoruba" の集計上の扱い / How "Yoruba" is counted

- デフォルトの地名データで "Yoruba" が座標付きの「場所」として扱われていますが、
  紙面での用法は民族・言語名としてのものが大半と考えられます。
- 地図上の1地点として集計すると解釈を誤らせる可能性があるため、地名リストから
  外す、または「民族・集団名」という別カテゴリで集計するなどの検討の余地があります。
- 同様の問題は "Egba" "Ijebu" などにも当てはまる可能性があります。

In the default location data, "Yoruba" is treated as a place with coordinates,
but most occurrences in the newspaper are likely ethnonym/language uses.
Counting it as a single map point may mislead interpretation. It could be
removed from the gazetteer or counted under a separate "peoples/groups"
category. The same may apply to e.g. "Egba" and "Ijebu".

## 4. 自動テストの追加 / Automated smoke tests

- 現在、自動テストがなく、今回修正したような UI の回帰(グラフのはみ出し・
  ラベルの重なりなど)は目視でしか検出できません。
- v1.5.0 の検証で使った Playwright スクリプト(サンプル CSV をアップロード →
  分析実行 → キーワードタブ → 拡大モーダルの表示確認)を `tests/` に整備して
  CI (GitHub Actions) で回すと、最小限の回帰防止になります。

There are no automated tests, so UI regressions (chart overflow, label
collisions) can only be caught by eye. The Playwright script used to verify
v1.5.0 (upload sample CSVs → run analysis → keyword tab → enlarged modal)
could be added under `tests/` and run in CI as a minimal regression guard.

## 5. その他の小さな候補 / Smaller candidates

- ツールチップ: 現在はネイティブの `title` 属性によるもので表示が地味かつ遅延が
  あります。カスタムツールチップにすると視認性が上がります。
  (Tooltips currently use the native `title` attribute, which is plain and
  slow to appear; a custom tooltip layer would be more readable.)
- 引用の関連度スコア: `score / 20` を上限 100% とする経験的な正規化のままです。
  スコア分布に基づく正規化にすると意味が明確になります。
  (Quote relevance is normalized by an ad-hoc `score / 20` cap; normalizing
  against the actual score distribution would be more meaningful.)
- キーワード入力が空のまま「分析」を押した場合などの入力フィードバックが
  ありません(現在は何も起きない)。メッセージを出すと親切です。
  (Pressing "Analyze" with an empty keyword silently does nothing; a brief
  message would help.)

## 6. アップロード時の事前検証 / Early validation of uploaded files

2026-05-20 の Takumi Guard 診断報告書(対象コミット `49f7fe1`)の残存2項目
(指摘 4.2 の一部・4.7 の一部)に対応するものです。診断の指摘 7 件のうち
5 件は v1.4.1 (PR #6) で対応済みであることを 2026-07-08 に照合確認しました。
本アプリは完全クライアントサイド(サーバー・認証・セッションなし)のため、
これらはセキュリティ上の緊急性は低く、実質的には操作ミスに早く気づける
ようにする UX 改善です。

- ファイル選択時に拡張子(.csv)を確認し、違う場合は即座にメッセージを表示する
- 分析用 CSV も選択時にヘッダー行だけ先読みし、必要な列(`text`, `Year`)の
  有無を確認してから「準備完了」フラグを立てる(現在はファイル選択の時点で
  フラグが立ち、中身の検証は「Start Analysis」後まで行われない)
- 注意: MIME タイプ(`file.type === 'text/csv'`)による判定は、環境によって
  CSV が `application/vnd.ms-excel` 等になるため誤検知しやすく、推奨しない

These address the two residual items (parts of findings 4.2 and 4.7) from the
2026-05-20 Takumi Guard assessment (audited commit `49f7fe1`); the other five
findings were confirmed on 2026-07-08 to have been fixed in v1.4.1 (PR #6).
Since the app is fully client-side (no server, auth, or sessions), these are
low-urgency and are effectively UX improvements that surface file-selection
mistakes earlier: check the .csv extension on selection, pre-read the analysis
CSV header to confirm required columns (`text`, `Year`) before enabling Start
Analysis. Note: MIME-type checks are unreliable for CSV (often
`application/vnd.ms-excel`) and are not recommended.
