// グリーティングシステム設定ファイル
// このファイルで設定を簡単に変更できます

// 基本設定
const GREETING_CONFIG = {
    USERNAME: 's9t',        // 表示するユーザー名
    UPDATE_INTERVAL: 1000,       // 時計更新間隔（ミリ秒）
    DATE_FORMAT: 'MM/dd/yyyy',   // 日付フォーマット
    TIME_FORMAT: 'HH:mm:ss'      // 時刻フォーマット
};

// 時間帯別メッセージ設定
const TIME_GREETINGS = {
    MORNING: { 
        start: 5, 
        end: 12, 
        text: "Good Morning", 
        emoji: "🌟" 
    },
    AFTERNOON: { 
        start: 12, 
        end: 18, 
        text: "Good Afternoon", 
        emoji: "☀️" 
    },
    EVENING: { 
        start: 18, 
        end: 22, 
        text: "Good Evening", 
        emoji: "🌅" 
    },
    NIGHT: { 
        start: 22, 
        end: 5, 
        text: "Good Night", 
        emoji: "🌙" 
    }
};

// 言語設定（日本語版）
const JAPANESE_GREETINGS = {
    MORNING: { 
        start: 5, 
        end: 12, 
        text: "おはようございます", 
        emoji: "🌟" 
    },
    AFTERNOON: { 
        start: 12, 
        end: 18, 
        text: "こんにちは", 
        emoji: "☀️" 
    },
    EVENING: { 
        start: 18, 
        end: 22, 
        text: "こんばんは", 
        emoji: "🌅" 
    },
    NIGHT: { 
        start: 22, 
        end: 5, 
        text: "お疲れ様でした", 
        emoji: "🌙" 
    }
};

// エクスポート（使いたい設定をコメントアウト）
window.GreetingConfig = {
    CONFIG: GREETING_CONFIG,
    GREETINGS: TIME_GREETINGS,      // 英語版
    // GREETINGS: JAPANESE_GREETINGS   // 日本語版（使いたい場合はこちらのコメントを外す）
};