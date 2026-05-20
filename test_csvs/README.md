# 異常系動作確認用テストCSV

脆弱性対応（4.1 / 4.4 / 4.7）の動作確認用ファイル。`index.html` の入力検証パスを確認するために使います。

## 1. test_locations_partial_invalid.csv

**目的**: 4.4 の「無効な座標行のスキップ警告」を確認

**内容**: 有効な4行 + 無効な4行（範囲外の緯度、範囲外の経度、地名欠落、数値以外）

**使い方**:
1. 通常の `sample_analysis.csv` を「Select Analysis CSV」で選択
2. このファイルを「Upload Location Data」で選択
3. **期待**: ステータスに `4 invalid location row(s) were skipped (...)` と表示される
4. Start Analysis を押すと、有効な4地点（Lagos, Ibadan, Abeokuta, London）だけがマップに表示される

## 2. test_locations_all_invalid.csv

**目的**: 4.4 の「全行無効時のガード」を確認（デフォルト座標を上書きしない）

**内容**: 4行全てが無効

**使い方**:
1. このファイルを「Upload Location Data」で選択
2. **期待**: `No valid locations found in the uploaded file...` と表示され、`Start Analysis` ボタンが**出ない**

## 3. test_analysis_empty.csv

**目的**: 4.7 の「パース失敗時にアップロード画面に戻る」を確認

**内容**: ヘッダーのみでデータ行が0件

**使い方**:
1. 通常の `sample_locations.csv` を Location 側に選択
2. このファイルを Analysis 側に選択 → 両方アップロードされた状態にする
3. Start Analysis を押す
4. **期待**: 解析画面に遷移せず、アップロード画面に戻り `Failed to parse CSV: ...` のエラーメッセージが表示される。`analysisFileUploaded` がリセットされ、再度ファイル選択できる状態になる

## 4. test_analysis_altcolumns.csv

**目的**: 4.1 のカラム名正規化を確認（`year` 小文字 + `publication_date` で動くか）

**内容**: 列名を `year` / `publication_date` にした3行のサンプル

**使い方**:
1. 通常の `sample_locations.csv` を Location 側に選択
2. このファイルを Analysis 側に選択
3. Start Analysis を押す
4. **期待**: マップに Lagos / Ibadan / Abeokuta のピンが立ち、Keyword Analysis タブで引用文に日付（1895/1898/1902）が表示される。修正前なら "Unknown date" になり、時系列フィルタからも除外されていたはずの挙動が改善されている
