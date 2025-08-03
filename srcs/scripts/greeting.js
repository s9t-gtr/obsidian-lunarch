// Obsidianグリーティングシステム
// 時間ベースの挨拶とリアルタイム時計

// グリーティング設定
const GREETING_CONFIG = {
    USERNAME: 's9t', // ユーザー名
    UPDATE_INTERVAL: 1000 // 時計更新間隔（ミリ秒）
};

// 時間帯別グリーティング設定
const TIME_GREETINGS = {
    MORNING: { start: 5, end: 12, text: "Good Morning", emoji: "🌟" },
    AFTERNOON: { start: 12, end: 18, text: "Good Afternoon", emoji: "☀️" },
    EVENING: { start: 18, end: 22, text: "Good Evening", emoji: "🌅" },
    NIGHT: { start: 22, end: 5, text: "Good Night", emoji: "🌙" }
};

// 現在時刻に基づいてグリーティングを取得
function getCurrentGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= TIME_GREETINGS.MORNING.start && hour < TIME_GREETINGS.MORNING.end) {
        return TIME_GREETINGS.MORNING;
    } else if (hour >= TIME_GREETINGS.AFTERNOON.start && hour < TIME_GREETINGS.AFTERNOON.end) {
        return TIME_GREETINGS.AFTERNOON;
    } else if (hour >= TIME_GREETINGS.EVENING.start && hour < TIME_GREETINGS.EVENING.end) {
        return TIME_GREETINGS.EVENING;
    } else {
        return TIME_GREETINGS.NIGHT;
    }
}

// グリーティング表示を作成
function createGreetingDisplay(dv) {
    console.log('グリーティング表示を作成');
    
    // グリーティングメッセージ
    const greeting = getCurrentGreeting();
    const greetingText = `${greeting.text}, ${GREETING_CONFIG.USERNAME}! ${greeting.emoji}`;
    dv.el("h2", greetingText, { cls: "" });
    
    // 日付・時刻コンテナ
    const container = dv.el("div", "", { cls: "date-time" });
    
    // 日付表示
    const todayEl = container.createDiv();
    const today = dv.date("today").toFormat("MM/dd/yyyy");
    todayEl.textContent = `Today is ${today}`;
    
    // 時刻表示セクション
    const progress = container.createDiv({ cls: "time-progress" });
    progress.createDiv({ cls: "time-label", text: "Current Time Progress:" });
    const timeDisplay = progress.createDiv({ cls: "time-display" });
    
    // リアルタイム時計更新
    function updateTime() {
        const currentTime = dv.date("now").toFormat("HH:mm:ss");
        timeDisplay.textContent = currentTime;
    }
    
    // 初回表示と定期更新
    updateTime();
    setInterval(updateTime, GREETING_CONFIG.UPDATE_INTERVAL);
}

// エラー時のフォールバック表示
function createGreetingFallback(dv) {
    console.log('グリーティングフォールバック表示');
    
    dv.el("h2", `Hello, ${GREETING_CONFIG.USERNAME}! 👋`, { cls: "" });
    
    const container = dv.el("div", "", { cls: "date-time" });
    container.createDiv({ text: "Today is --/--/----" });
    
    const progress = container.createDiv({ cls: "time-progress" });
    progress.createDiv({ cls: "time-label", text: "Current Time Progress:" });
    progress.createDiv({ cls: "time-display", text: "--:--:--" });
}

// メイングリーティング処理
async function loadGreetingSystem(dv) {
    console.log('グリーティングシステム開始');
    
    try {
        createGreetingDisplay(dv);
    } catch (error) {
        console.error('グリーティングシステムエラー:', error);
        createGreetingFallback(dv);
    }
}

// 3カラム内でのコンパクト表示
function createCompactGreeting(dv) {
    console.log('コンパクトグリーティング表示を作成');
    
    // グリーティングメッセージ
    const greeting = getCurrentGreeting();
    const greetingText = `${greeting.text}, ${GREETING_CONFIG.USERNAME}! ${greeting.emoji}`;
    dv.el("h4", greetingText, { cls: "" });
    
    // 日付表示
    const today = dv.date("today").toFormat("MM/dd");
    dv.paragraph(`📅 ${today}`);
    
    // 時刻表示
    const timeDisplay = dv.el('div', '', { cls: 'time-display' });
    
    // リアルタイム時計更新
    function updateTime() {
        const currentTime = dv.date("now").toFormat("HH:mm:ss");
        timeDisplay.textContent = currentTime;
    }
    
    // 初回表示と定期更新
    updateTime();
    setInterval(updateTime, GREETING_CONFIG.UPDATE_INTERVAL);
}

// エラー時のコンパクト表示
function createCompactFallback(dv) {
    console.log('コンパクトフォールバック表示');
    
    dv.el("h4", `👋 Hello, ${GREETING_CONFIG.USERNAME}!`, { cls: "" });
    dv.paragraph('📅 --/--');
    dv.el('div', '--:--:--', { cls: 'time-display' });
}

// グローバルに公開
window.GreetingSystem = {
    loadGreetingSystem,
    createGreetingDisplay,
    createGreetingFallback,
    createCompactGreeting,
    createCompactFallback,
    GREETING_CONFIG
};