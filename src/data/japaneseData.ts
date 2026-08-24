import { KanjiItem, VocabItem, ExamQuestion, JlptLevel } from '../types';

// ==================== KANJI DATABASE (N5 - N1) ====================
export const KANJI_DATABASE: KanjiItem[] = [
  // N5 Kanji
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
      { word: 'Mainichi', reading: 'まいにち', meaning: 'Mỗi ngày' },
      { word: '日曜日', reading: 'にちようび', meaning: 'Chủ nhật' }
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
      { word: '一月', reading: 'いちがつ', meaning: 'Tháng một' },
      { word: '今月', reading: 'こんげつ', meaning: 'Tháng này' }
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
      { word: '水', reading: 'みず', meaning: 'Nước uống' },
      { word: '海水', reading: 'かいすい', meaning: 'Nước biển' }
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
      { word: '火曜日', reading: 'かようび', meaning: 'Thứ ba' },
      { word: 'Consul', reading: 'Consul', meaning: 'Lửa' },
      { word: 'Consul', reading: 'Consul', meaning: 'Núi lửa' }
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
      { word: '木曜日', reading: 'もくようび', meaning: 'Thứ năm' },
      { word: 'Consul', reading: 'Consul', meaning: 'Cây cối' },
      { word: 'Consul', reading: 'Consul', meaning: 'Đồ gỗ' }
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
      { word: '富士山', reading: 'ふじさん', meaning: 'Núi Phú Sĩ' },
      { word: 'Consul', reading: 'Consul', meaning: 'Tỉnh Sơn Khẩu' },
      { word: 'Consul', reading: 'Consul', meaning: 'Leo núi' }
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
      { word: '川', reading: 'かわ', meaning: 'Dòng sông' },
      { word: 'Consul', reading: 'Consul', meaning: 'Bờ sông' }
    ],
    mnemonic: 'Ba dòng sông chảy song song qua thung lũng.'
  },

  // N4 Kanji
  {
    character: '旅',
    hanViet: 'LỮ',
    onyomi: ['リョ'],
    kunyomi: ['たび'],
    meanings: ['Du lịch', 'Chuyến đi'],
    jlpt: 'N4',
    strokeCount: 10,
    radicals: '方 (Phương)',
    examples: [
      { word: '旅行', reading: 'りょこう', meaning: 'Du lịch' },
      { word: 'Consul', reading: 'Consul', meaning: 'Hành khách' },
      { word: 'Consul', reading: 'Consul', meaning: 'Chuyến đi' }
    ],
    mnemonic: 'Đoàn người mang cờ và hành lý đi du lịch khắp bốn phương.'
  },
  {
    character: '館',
    hanViet: 'QUÁN',
    onyomi: ['カン'],
    kunyomi: ['やかた'],
    meanings: ['Tòa nhà', 'Bảo tàng', 'Đại sứ quán'],
    jlpt: 'N4',
    strokeCount: 16,
    radicals: '食 (Thực)',
    examples: [
      { word: '図書館', reading: 'としょかん', meaning: 'Thư viện' },
      { word: 'Consul', reading: 'Consul', meaning: 'Bảo tàng' },
      { word: 'Consul', reading: 'Consul', meaning: 'Đại sứ quán' }
    ],
    mnemonic: 'Tòa nhà lớn quy tụ nhiều tri thức và thức ăn tinh thần.'
  },

  // N3 Kanji
  {
    character: '愛',
    hanViet: 'ÁI',
    onyomi: ['アイ'],
    kunyomi: ['い・しい', 'めぐ・む'],
    meanings: ['Yêu thương', 'Tình yêu'],
    jlpt: 'N3',
    strokeCount: 13,
    radicals: '心 (Tâm)',
    examples: [
      { word: '愛情', reading: 'あいじょう', meaning: 'Tình yêu thương' },
      { word: 'Consul', reading: 'Consul', meaning: 'Yêu dấu' },
      { word: 'Consul', reading: 'Consul', meaning: 'Quái vật yêu thương' }
    ],
    mnemonic: 'Trái tim nằm ở trung tâm của hành động quan tâm và yêu thương người khác.'
  },
  {
    character: '義',
    hanViet: 'NGHĨA',
    onyomi: ['ギ'],
    kunyomi: [],
    meanings: ['Nghĩa khí', 'Ý nghĩa', 'Đạo lý'],
    jlpt: 'N3',
    strokeCount: 13,
    radicals: '羊 (Dương)',
    examples: [
      { word: '正義', reading: 'せいぎ', meaning: 'Chính nghĩa' },
      { word: 'Consul', reading: 'Consul', meaning: 'Nghĩa vụ' },
      { word: 'Consul', reading: 'Consul', meaning: 'Ý nghĩa' }
    ],
    mnemonic: 'Con cừu đại diện cho sự trong sạch và chính trực.'
  },

  // N2 Kanji
  {
    character: '響',
    hanViet: 'HƯỞNG',
    onyomi: ['キョウ'],
    kunyomi: ['ひび・く'],
    meanings: ['Vang vọng', 'Ảnh hưởng'],
    jlpt: 'N2',
    strokeCount: 20,
    radicals: '音 (Âm)',
    examples: [
      { word: '影響', reading: 'えいきょう', meaning: 'Ảnh hưởng' },
      { word: 'Consul', reading: 'Consul', meaning: 'Vang vọng' },
      { word: 'Consul', reading: 'Consul', meaning: 'Phản hưởng' }
    ],
    mnemonic: 'Âm thanh vang vọng xa xăm tác động đến tâm trí.'
  },

  // N1 Kanji
  {
    character: '覇',
    hanViet: 'BÁ',
    onyomi: ['ハ', 'ハク'],
    kunyomi: ['はたがしら'],
    meanings: ['Bá vương', 'Xưng bá', 'Thống trị'],
    jlpt: 'N1',
    strokeCount: 19,
    radicals: '覈 (Hạch)',
    examples: [
      { word: '制覇', reading: 'せいは', meaning: 'Chinh phục / Xưng bá' },
      { word: 'Consul', reading: 'Consul', meaning: 'Bá quyền' },
      { word: 'Consul', reading: 'Consul', meaning: 'Vua tiếng Nhật (Bá chủ)' }
    ],
    mnemonic: 'Vị vua đội vương miện thống trị cả thiên hạ.'
  }
];

// ==================== VOCABULARY DATABASE (N5 - N1) ====================
export const VOCAB_DATABASE: VocabItem[] = [
  // N5 Vocab
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
    pitchAccent: '0 (Heiban)',
    exampleSentence: {
      japanese: '友達と公園へ行きました。',
      reading: 'ともだちとこうえんへいきましました。',
      vietnamese: 'Tôi đã đi đến công viên với bạn.'
    }
  },

  // N4 Vocab
  {
    id: 'v-n4-1',
    word: '約束',
    reading: 'やくそく',
    romaji: 'yakusoku',
    hanViet: 'ƯỚC THÚC',
    meanings: ['Lời hứa', 'Cuộc hẹn'],
    jlpt: 'N4',
    type: 'Danh từ / Động từ Suru',
    pitchAccent: '0 (Heiban)',
    exampleSentence: {
      japanese: '友達と時間の約束をしました。',
      reading: 'ともだちとじかんのやくそくをしました。',
      vietnamese: 'Tôi đã có hẹn giờ với bạn.'
    }
  },
  {
    id: 'v-n4-2',
    word: '準備',
    reading: 'じゅんび',
    romaji: 'junbi',
    hanViet: 'CHUẨN BỊ',
    meanings: ['Chuẩn bị'],
    jlpt: 'N4',
    type: 'Danh từ / Động từ Suru',
    pitchAccent: '1 (Atamadaka)',
    exampleSentence: {
      japanese: '試験の準備はもう終わりましたか。',
      reading: 'しけんのじゅんびはもうおわりましたか。',
      vietnamese: 'Bạn đã chuẩn bị xong cho kỳ thi chưa?'
    }
  },

  // N3 Vocab
  {
    id: 'v-n3-1',
    word: '挑戦',
    reading: 'ちょうせん',
    romaji: 'chousen',
    hanViet: 'THIÊU CHIẾN',
    meanings: ['Thử thách', 'Chinh phục'],
    jlpt: 'N3',
    type: 'Danh từ / Động từ Suru',
    pitchAccent: '0 (Heiban)',
    exampleSentence: {
      japanese: '新しい目標に挑戦することは大切です。',
      reading: 'あたらしいもくひょうにちょうせんすることはたいせつです。',
      vietnamese: 'Thử thách với mục tiêu mới là rất quan trọng.'
    }
  },
  {
    id: 'v-n3-2',
    word: '発展',
    reading: 'はってん',
    romaji: 'hatten',
    hanViet: 'PHÁT TRIỂN',
    meanings: ['Phát triển', 'Mở rộng'],
    jlpt: 'N3',
    type: 'Danh từ / Động từ Suru',
    pitchAccent: '0 (Heiban)',
    exampleSentence: {
      japanese: 'AI技術は急速に発展しています。',
      reading: 'えーあいぎじゅつはきゅうそくにはってんしています。',
      vietnamese: 'Công nghệ AI đang phát triển nhanh chóng.'
    }
  },

  // N2 Vocab
  {
    id: 'v-n2-1',
    word: '影響',
    reading: 'えいきょう',
    romaji: 'eikyou',
    hanViet: 'ẢNH HƯỞNG',
    meanings: ['Ảnh hưởng', 'Tác động'],
    jlpt: 'N2',
    type: 'Danh từ / Động từ Suru',
    pitchAccent: '0 (Heiban)',
    exampleSentence: {
      japanese: '大雨が交通機関に大きな影響を与えた。',
      reading: 'おおあめがこうつうきかんにおおきなえいきょうをあたえた。',
      vietnamese: 'Mưa lớn đã gây ảnh hưởng nghiêm trọng tới giao thông.'
    }
  },

  // N1 Vocab
  {
    id: 'v-n1-1',
    word: '圧倒的',
    reading: 'あっとうてき',
    romaji: 'attouteki',
    hanViet: 'ÁP ĐẢO ĐÍCH',
    meanings: ['Áp đảo', 'Vượt trội hoàn toàn'],
    jlpt: 'N1',
    type: 'Tính từ đuôi Na',
    pitchAccent: '0 (Heiban)',
    exampleSentence: {
      japanese: '彼は圧倒的な実力で優勝を果たした。',
      reading: 'かれはあっとうてきなじつりょくでゆうしょうをはたした。',
      vietnamese: 'Anh ấy đã giành chức vô địch nhờ thực lực vượt trội hoàn toàn.'
    }
  }
];

// ==================== JLPT EXAM QUESTION BANK (N5 - N1) ====================
export const JLPT_EXAM_QUESTIONS: ExamQuestion[] = [
  // N5 Questions
  {
    id: 'q-n5-1',
    jlpt: 'N5',
    category: 'vocab',
    question: '「毎朝、パンを（　　）コーヒーを飲みます。」に入る最もよいものを一つ選びなさい。',
    options: ['食べて', '食て', '飲んで', '行きて'],
    correctAnswer: 0,
    explanation: 'Dùng thể Te (て) của động từ 食べる (たべる -> 食べて) để nối hai hành động liên tiếp: "Mỗi sáng ăn bánh mì rồi uống cà phê".',
    grammarPoint: 'Động từ thể Te (Vて) nối hành động theo thứ tự thời gian.'
  },
  {
    id: 'q-n5-2',
    jlpt: 'N5',
    category: 'grammar',
    question: '「昨日、図書館（　　）本を三冊借りました。」に入る trợ từ thích hợp:',
    options: ['で', 'に', 'へ', 'を'],
    correctAnswer: 0,
    explanation: 'Trợ từ で đi sau địa điểm diễn ra hành động (mượn sách ở thư viện).',
    grammarPoint: 'Trợ từ で biểu thị địa điểm diễn ra hành động.'
  },
  {
    id: 'q-n5-3',
    jlpt: 'N5',
    category: 'reading',
    question: 'Đoạn văn: 「田中さんは毎朝7時に起きます。朝ごはんを食べた後で、8時に会社へ行きます。日曜日には会社へ行きません。」\nHỏi: 田中さんは日曜日に何時に会社へ行きますか。',
    options: ['行きません', '7時に行きます', '8時に行きます', 'わかりません'],
    correctAnswer: 0,
    explanation: 'Đoạn văn ghi rõ: 「日曜日には会社へ行きません」 (Chủ nhật anh Tanaka không đến công ty).',
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
    grammarPoint: 'Luyện nghe đếm số tiền tiếng Nhật.'
  },

  // N4 Questions
  {
    id: 'q-n4-1',
    jlpt: 'N4',
    category: 'grammar',
    question: '「明日雨が（　　）、旅行は中止にします。」',
    options: ['降ったら', '降るなら', '降りても', '降れば'],
    correctAnswer: 0,
    explanation: 'Cấu trúc ~たら biểu thị giả định trong tương lai (Nếu mưa rơi thì sẽ hủy chuyến đi).',
    grammarPoint: 'Ngữ pháp N4: Vたら (Nếu... thì...).'
  },
  {
    id: 'q-n4-2',
    jlpt: 'N4',
    category: 'vocab',
    question: '「約束の時間を（　　）ように気をつけてください。」',
    options: ['間違えない', '間違わない', '忘れない', '遅れない'],
    correctAnswer: 0,
    explanation: '間違えないように (Để không nhầm lẫn giờ hẹn).',
    grammarPoint: 'V-nai + ように (Để không...)'
  },

  // N3 Questions
  {
    id: 'q-n3-1',
    jlpt: 'N3',
    category: 'grammar',
    question: '「どんなに大変（　　）、最後まであきらめない。」',
    options: ['であっても', 'であれ', 'とあって', 'にして'],
    correctAnswer: 0,
    explanation: 'どんなに + [Tính từ / Động từ thể て/であっても] = Dù cho có khó khăn đến mức nào đi nữa.',
    grammarPoint: 'Ngữ pháp N3: どんなに〜であっても'
  },
  {
    id: 'q-n3-2',
    jlpt: 'N3',
    category: 'reading',
    question: 'Đoạn văn ngắn: 「近年のAI技術の進歩に伴い、言語学習の効率は劇的に向上している。しかし、人間同士の心の通ったコミュニケーションの重要性が減るわけではない。」\nÝ chính của tác giả là gì?',
    options: [
      'Công nghệ AI giúp học ngôn ngữ hiệu quả hơn nhưng giao tiếp giữa người với người vẫn rất quan trọng.',
      'AI sẽ thay thế hoàn toàn giao tiếp giữa con người.',
      'Không nên dùng AI để học ngoại ngữ.',
      'Giao tiếp con người không còn quan trọng.'
    ],
    correctAnswer: 0,
    explanation: 'Tác giả dùng cấu trúc 「〜わけではない」 (Không có nghĩa là...) để nhấn mạnh dù AI phát triển thì giao tiếp con người vẫn giữ nguyên giá trị.',
    grammarPoint: 'Ngữ pháp N3: 〜わけではない'
  },

  // N2 Questions
  {
    id: 'q-n2-1',
    jlpt: 'N2',
    category: 'grammar',
    question: '「彼の努力（　　）、今回の成功はなかっただろう。」',
    options: ['なくしては', 'をもってしても', 'を皮切りに', 'にひきかえ'],
    correctAnswer: 0,
    explanation: 'Cấu trúc N + なくしては (Nếu không có... thì không thể...): "Nếu không có sự nỗ lực của anh ấy thì đã không có thành công lần này".',
    grammarPoint: 'Ngữ pháp N2: N + なくしては〜ない'
  },

  // N1 Questions
  {
    id: 'q-n1-1',
    jlpt: 'N1',
    category: 'grammar',
    question: '「新商品の発売（　　）、全社を挙げて大規模なキャンペーンを展開する。」',
    options: ['に際し', 'たるもの', 'ならではの', 'を余儀なくされ'],
    correctAnswer: 0,
    explanation: 'Cấu trúc N + に際し (Nhân dịp / Khi bắt đầu làm việc quan trọng): "Nhân dịp ra mắt sản phẩm mới, toàn công ty triển khai chiến dịch quy mô lớn".',
    grammarPoint: 'Ngữ pháp N1: に際し / に際して'
  }
];

// ==================== READABLE STORIES DATABASE ====================
export const JAPANESE_STORIES = [
  {
    id: 'story-1',
    title: '桃太郎 (Momotaro - Cậu bé Quả Đào)',
    jlpt: 'N5' as JlptLevel,
    content: '昔々、ある所にむかしむかし、おじいさんとおばあさんがいました。\nおじいさんは山へ芝刈りに、おばあさんは川へ洗濯に行きました。\nおばあさんが川で洗濯をしていると、大きな桃がどんぶらこ、どんぶらこと流れてきました。',
    vietnameseTranslation: 'Ngày xửa ngày xưa, ở một nơi nọ có một ông lão và một bà lão.\nÔng lão lên núi đốn củi, còn bà lão ra sông giặt quần áo.\nKhi bà lão đang giặt đồ ở sông, một quả đào khổng lồ trôi bồng bềnh bồng bềnh đến.',
    vocabList: [
      { word: '昔々', reading: 'むかしむかし', meaning: 'Ngày xửa ngày xưa' },
      { word: 'おじいさん', reading: 'おじいさん', meaning: 'Ông lão' },
      { word: 'おばあさん', reading: 'おばあさん', meaning: 'Bà lão' },
      { word: '桃', reading: 'もも', meaning: 'Quả đào' },
      { word: '川', reading: 'かわ', meaning: 'Dòng sông' }
    ]
  },
  {
    id: 'story-2',
    title: 'AIと日本の未来 (AI và Tương lai Nhật Bản)',
    jlpt: 'N3' as JlptLevel,
    content: '現在、日本では人工知能（AI）を活用した新しい学習サービスが広がっています。\n言葉の壁を越えて、世界中の人々が気軽に日本語を学べる時代が到来しました。\n「王様日本語」アプリは、その先駆的な存在として注目されています。',
    vietnameseTranslation: 'Hiện nay tại Nhật Bản, các dịch vụ học tập mới ứng dụng trí tuệ nhân tạo (AI) đang lan rộng.\nVượt qua rào cản ngôn ngữ, thời đại mà mọi người trên thế giới có thể thoải mái học tiếng Nhật đã đến.\nỨng dụng "Vua Tiếng Nhật" đang thu hút sự chú ý như một đại diện tiên phong.',
    vocabList: [
      { word: '人工知能', reading: 'じんこうちのう', meaning: 'Trí tuệ nhân tạo (AI)' },
      { word: '活用', reading: 'かつよう', meaning: 'Ứng dụng, tận dụng' },
      { word: '言葉の壁', reading: 'ことばのかべ', meaning: 'Rào cản ngôn ngữ' },
      { word: '先駆的', reading: 'せんくてき', meaning: 'Mang tính tiên phong' }
    ]
  }
];
