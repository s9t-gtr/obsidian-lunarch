// 天気予報設定ファイル
// このファイルでAPIキーや都市を変更できます

window.WEATHER_CONFIG = {
    // OpenWeatherMap APIキー（https://openweathermap.org/api で取得）
    API_KEY: '372629007a9f971ce4572717eb1aa390',
    
    // 表示する都市名
    CITY: 'Tokyo',
    
    // 温度単位（metric = 摂氏、imperial = 華氏）
    UNITS: 'metric',
    
    // キャッシュ時間（ミリ秒）
    CACHE_DURATION: 10 * 60 * 1000, // 10分
    
    // 言語設定
    LANGUAGE: 'ja',
    
    // デバッグモード
    DEBUG: true
};