// Obsidian天気予報システム
// APIキー設定
const WEATHER_CONFIG = {
    API_KEY: '372629007a9f971ce4572717eb1aa390', // OpenWeatherMapのAPIキー
    CITY: 'Tokyo', // 都市名
    UNITS: 'metric', // celsius温度
    CACHE_DURATION: 10 * 60 * 1000, // 10分間キャッシュ
    CACHE_KEY: 'weather_data'
};

// 天気アイコンマッピング
const WEATHER_ICONS = {
    'clear': '☀️',
    'clouds': '☁️',
    'rain': '🌧️',
    'drizzle': '🌦️',
    'thunderstorm': '⛈️',
    'snow': '❄️',
    'mist': '🌫️',
    'fog': '🌫️',
    'haze': '🌫️'
};

// キャッシュ管理
function getCachedWeatherData() {
    const cached = localStorage.getItem(WEATHER_CONFIG.CACHE_KEY);
    if (!cached) return null;
    
    const data = JSON.parse(cached);
    const now = new Date().getTime();
    
    if (now - data.timestamp < WEATHER_CONFIG.CACHE_DURATION) {
        return data.weather;
    }
    
    return null;
}

function setCachedWeatherData(weatherData) {
    const cacheData = {
        weather: weatherData,
        timestamp: new Date().getTime()
    };
    localStorage.setItem(WEATHER_CONFIG.CACHE_KEY, JSON.stringify(cacheData));
}

// 天気アイコン取得
function getWeatherIcon(condition) {
    return WEATHER_ICONS[condition.toLowerCase()] || '🌤️';
}

// DataviewJS用: API失敗時の表示
function createApiFailureDisplay(dv) {
    console.log('API失敗表示を作成');
    const container = dv.el('div', '', {cls: 'weather-section'});
    container.createEl('div', {text: '--°C 🌤️', cls: 'weather-temp'});
    container.createEl('div', {text: 'APIの呼び出しに失敗しました', cls: 'weather-desc'});
    container.createEl('div', {text: '体感温度: --°', cls: 'weather-feel'});

    const details = container.createEl('div', {cls: 'weather-details'});
    const leftDiv = details.createEl('div', {cls: 'weather-left'});
    leftDiv.createEl('div', {text: '🌡️ 最低: --° | 最高: --°'});
    leftDiv.createEl('div', {text: '💨 風速: -- m/s'});

    const rightDiv = details.createEl('div', {cls: 'weather-right'});
    rightDiv.createEl('div', {text: '💧 湿度: --%'});
    rightDiv.createEl('div', {text: '🌅 日の出: -- | 🌇 日の入: --'});
}

// DataviewJS用: 実際の天気データ作成
function createRealWeatherData(dv, data) {
    console.log('実際の天気データ作成');
    const container = dv.el('div', '', {cls: 'weather-section'});
    
    const icon = getWeatherIcon(data.weather[0].main);
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const minTemp = Math.round(data.main.temp_min);
    const maxTemp = Math.round(data.main.temp_max);
    const humidity = data.main.humidity;
    const windSpeed = Math.round(data.wind.speed);
    const description = data.weather[0].description;
    
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    
    container.createEl('div', {text: `${temp}°C ${icon}`, cls: 'weather-temp'});
    container.createEl('div', {text: description, cls: 'weather-desc'});
    container.createEl('div', {text: `体感温度: ${feelsLike}°`, cls: 'weather-feel'});

    const details = container.createEl('div', {cls: 'weather-details'});
    const leftDiv = details.createEl('div', {cls: 'weather-left'});
    leftDiv.createEl('div', {text: `🌡️ 最低: ${minTemp}° | 最高: ${maxTemp}°`});
    leftDiv.createEl('div', {text: `💨 風速: ${windSpeed} m/s`});

    const rightDiv = details.createEl('div', {cls: 'weather-right'});
    rightDiv.createEl('div', {text: `💧 湿度: ${humidity}%`});
    rightDiv.createEl('div', {text: `🌅 日の出: ${sunrise} | 🌇 日の入: ${sunset}`});
}

// メイン天気予報処理
async function loadWeatherData(dv) {
    console.log('天気データ読み込み開始');
    
    // APIキーチェック
    if (WEATHER_CONFIG.API_KEY === 'YOUR_API_KEY_HERE') {
        console.log('APIキーが設定されていません。');
        createApiFailureDisplay(dv);
        return;
    }
    
    // キャッシュチェック
    const cachedData = getCachedWeatherData();
    if (cachedData) {
        console.log('キャッシュからデータを取得');
        createRealWeatherData(dv, cachedData);
        return;
    }
    
    // API呼び出し
    try {
        console.log('API呼び出し開始');
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CONFIG.CITY}&appid=${WEATHER_CONFIG.API_KEY}&units=${WEATHER_CONFIG.UNITS}&lang=ja`;
        console.log('リクエストURL:', url);
        
        const response = await fetch(url);
        console.log('APIレスポンス受信:', response.status);
        
        if (!response.ok) {
            console.warn(`API呼び出し失敗 (${response.status}).`);
            createApiFailureDisplay(dv);
            return;
        }
        
        const data = await response.json();
        console.log('APIデータ取得成功:', data);
        setCachedWeatherData(data);
        createRealWeatherData(dv, data);
        
    } catch (error) {
        console.error('API呼び出しでエラー発生:', error);
        createApiFailureDisplay(dv);
    }
}

// グローバルに公開（Obsidianで使用するため）
window.WeatherSystem = {
    loadWeatherData,
    createApiFailureDisplay,
    createRealWeatherData,
    WEATHER_CONFIG
};