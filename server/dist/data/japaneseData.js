"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JLPT_EXAM_QUESTIONS = exports.VOCAB_DATABASE = exports.KANJI_DATABASE = void 0;
exports.KANJI_DATABASE = [
    {
        character: '日',
        hanViet: 'NHẬT',
        onyomi: ['ニチ', 'ジツ'],
        kunyomi: ['ひ', 'か'],
        meanings: ['Mặt trời', 'Ngày', 'Nhật Bản'],
        jlpt: 'N5',
        strokeCount: 4,
        radicals: '日 (Nhật)',
        examples: [
            { word: '日本', reading: 'にほん', meaning: 'Nhật Bản' },
            { word: 'Mainichi', reading: 'まいにち', meaning: 'Mỗi ngày' }
        ],
        mnemonic: 'Hình ảnh khung cửa sổ rọi ánh nắng mặt trời rực rỡ buổi sáng.'
    },
    {
        character: '月',
        hanViet: 'NGUYỆT',
        onyomi: ['ゲツ', 'ガツ'],
        kunyomi: ['つき'],
        meanings: ['Mặt trăng', 'Tháng'],
        jlpt: 'N5',
        strokeCount: 4,
        radicals: '月 (Nguyệt)',
        examples: [
            { word: '月曜日', reading: 'げつようび', meaning: 'Thứ hai' },
            { word: '一月', reading: 'いちがつ', meaning: 'Tháng một' }
        ],
        mnemonic: 'Hình dáng lưỡi liềm mỏng manh của mặt trăng trên bầu trời đêm.'
    },
    {
        character: '水',
        hanViet: 'THỦY',
        onyomi: ['スイ'],
        kunyomi: ['みず'],
        meanings: ['Nước'],
        jlpt: 'N5',
        strokeCount: 4,
        radicals: '水 (Thủy)',
        examples: [
            { word: '水曜日', reading: 'すいようび', meaning: 'Thứ tư' },
            { word: '水', reading: 'みず', meaning: 'Nước uống' }
        ],
        mnemonic: 'Dòng nước suối chảy xiết vượt qua các gờ đá ở giữa núi.'
    },
    {
        character: '火',
        hanViet: 'HỎA',
        onyomi: ['カ'],
        kunyomi: ['ひ'],
        meanings: ['Lửa'],
        jlpt: 'N5',
        strokeCount: 4,
        radicals: '火 (Hỏa)',
        examples: [
            { word: '火曜日', reading: 'かようび', meaning: 'Thứ ba' }
        ],
        mnemonic: 'Ngọn lửa trại bùng cháy với hai tia lửa bắn ra xung quanh.'
    },
    {
        character: '木',
        hanViet: 'MỘC',
        onyomi: ['モク', 'ボク'],
        kunyomi: ['き'],
        meanings: ['Cây', 'Gỗ'],
        jlpt: 'N5',
        strokeCount: 4,
        radicals: '木 (Mộc)',
        examples: [
            { word: '木曜日', reading: 'もくようび', meaning: 'Thứ năm' }
        ],
        mnemonic: 'Cây xanh đứng thẳng với cành lá tán rộng 2 bên và rễ đâm sâu vào đất.'
    },
    {
        character: '山',
        hanViet: 'SƠN',
        onyomi: ['サン', 'セン'],
        kunyomi: ['やま'],
        meanings: ['Núi'],
        jlpt: 'N5',
        strokeCount: 3,
        radicals: '山 (Sơn)',
        examples: [
            { word: '富士山', reading: 'ふじさん', meaning: 'Núi Phú Sĩ' }
        ],
        mnemonic: 'Ba đỉnh núi trùng điệp vươn cao lên bầu trời.'
    },
    {
        character: '川',
        hanViet: 'XUYÊN',
        onyomi: ['セン'],
        kunyomi: ['かわ'],
        meanings: ['Sông'],
        jlpt: 'N5',
        strokeCount: 3,
        radicals: '川 (Xuyên)',
        examples: [
            { word: '川', reading: 'かわ', meaning: 'Dòng sông' }
        ],
        mnemonic: 'Ba dòng sông chảy song song qua thung lũng.'
    }
];
exports.VOCAB_DATABASE = [
    {
        id: 'v-n5-1',
        word: '日本語',
        reading: 'にほんご',
        romaji: 'nihongo',
        hanViet: 'NHẬT BẢN NGỮ',
        meanings: ['Tiếng Nhật'],
        jlpt: 'N5',
        type: 'Danh từ',
        pitchAccent: '0 (Heiban)',
        exampleSentence: {
            japanese: '私は毎日日本語を勉強します。',
            reading: 'わたしはまいにちにほんごをべんきょうします。',
            vietnamese: 'Tôi học tiếng Nhật mỗi ngày.'
        }
    },
    {
        id: 'v-n5-2',
        word: '勉強',
        reading: 'べんきょう',
        romaji: 'benkyou',
        hanViet: 'MIỄN CƯỜNG',
        meanings: ['Học tập', 'Nghiên cứu'],
        jlpt: 'N5',
        type: 'Danh từ / Động từ Suru',
        pitchAccent: '0 (Heiban)',
        exampleSentence: {
            japanese: '日本語の勉強はとても面白いです。',
            reading: 'にほんごのべんきょうはとてもおもしろいです。',
            vietnamese: 'Học tiếng Nhật rất là thú vị.'
        }
    },
    {
        id: 'v-n5-3',
        word: '食べる',
        reading: 'たべる',
        romaji: 'taberu',
        hanViet: 'THỰC',
        meanings: ['Ăn'],
        jlpt: 'N5',
        type: 'Động từ nhóm 2',
        pitchAccent: '2 (Nakadaka)',
        exampleSentence: {
            japanese: '一緒にラーメンを食べましょう！',
            reading: 'いっしょにらーめんをたべましょう！',
            vietnamese: 'Cùng nhau ăn Ramen nhé!'
        }
    },
    {
        id: 'v-n5-4',
        word: '友達',
        reading: 'ともだち',
        romaji: 'tomodachi',
        hanViet: 'HỮU ĐẠT',
        meanings: ['Bạn bè'],
        jlpt: 'N5',
        type: 'Danh từ',
        pitchAccent: '0 (Heiban)'
    }
];
exports.JLPT_EXAM_QUESTIONS = [
    {
        id: 'q-n5-1',
        jlpt: 'N5',
        category: 'vocab',
        question: '「毎朝、パンを（　　）コーヒーを飲みます。」に入る最もよいものを一つ選びなさい。',
        options: ['食べて', '食て', '飲んで', '行きて'],
        correctAnswer: 0,
        explanation: 'Dùng thể Te (て) của động từ 食べる (たべる -> 食べて) để nối hai hành động liên tiếp.',
        grammarPoint: 'Động từ thể Te (Vて) nối hành động.'
    },
    {
        id: 'q-n5-2',
        jlpt: 'N5',
        category: 'grammar',
        question: '「昨日、図書館（　　）本を三冊借りました。」に入る trợ từ thích hợp:',
        options: ['で', 'に', 'へ', 'を'],
        correctAnswer: 0,
        explanation: 'Trợ từ で đi sau địa điểm diễn ra hành động (mượn sách ở thư viện).',
        grammarPoint: 'Trợ từ で chỉ địa điểm hành động.'
    },
    {
        id: 'q-n5-3',
        jlpt: 'N5',
        category: 'reading',
        question: 'Đoạn văn: 「田中さんは毎朝7時に起きます。日曜日には会社へ行きません。」\nHỏi: 田中さんは日曜日に何時に会社へ行きますか。',
        options: ['行きません', '7時に行きます', '8時に行きます', 'わかりません'],
        correctAnswer: 0,
        explanation: 'Đoạn văn ghi rõ: 「日曜日には会社へ行きません」 (Chủ nhật không đến công ty).',
        grammarPoint: 'Đọc hiểu cơ bản N5.'
    },
    {
        id: 'q-n5-4',
        jlpt: 'N5',
        category: 'listening',
        question: '🔊 Audio bài nghe đàm thoại:\nNam: 「すみません、この時計はいくらですか。」\nNữ: 「それは三千円です。」\nHỏi: 時計はいくらですか。',
        options: ['3000円', '300円', '30000円', '3500円'],
        correctAnswer: 0,
        explanation: '三千円 (さんぜんえん) = 3000 Yên.',
        grammarPoint: 'Đếm số tiền tiếng Nhật.'
    }
];
