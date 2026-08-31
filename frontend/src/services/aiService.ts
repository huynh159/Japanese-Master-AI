import { KaiwaMessage, KaiwaTone, JlptLevel } from '../types';

export class AiService {
  /**
   * Generates AI Kaiwa response with real-time grammar review
   */
  public static async generateKaiwaResponse(
    userText: string,
    tone: KaiwaTone
  ): Promise<KaiwaMessage> {
    // Artificial latency for realistic AI thinking feel
    await new Promise(resolve => setTimeout(resolve, 800));

    let japanese = '';
    let reading = '';
    let vietnamese = '';

    // Tone specific responses
    if (tone === 'sensei') {
      japanese = '素晴らしいですね！日本語の発音がとても上手です。今日も一緒に頑張りましょう！';
      reading = 'すばらしいですね！にほんごのはつおんがとてもじょうずです。きょうもいっしょにがんばりましょう！';
      vietnamese = 'Tuyệt vời lắm! Phát âm tiếng Nhật của em rất tốt. Hôm nay chúng ta cũng hãy cùng nhau cố gắng nhé!';
    } else if (tone === 'anime') {
      japanese = 'よーし、その意気だぞ！オレと一緒に日本語の王様を目指そうぜ！';
      reading = 'よーし、そのいきだぞ！おれといっしょににほんごのおうさまをめざそうぜ！';
      vietnamese = 'Được lắm, tinh thần tốt đấy! Cùng tớ tiến tới mục tiêu trở thành Vua Tiếng Nhật nào!';
    } else if (tone === 'business') {
      japanese = '承知いたしました。本日もビジネス日本語の習得に向けてサポートさせていただきます。';
      reading = 'しょうちいたしました。ほんじつもびじねすにほんごのしゅうとくにむけてさぽーとさせていただきます。';
      vietnamese = 'Tôi đã rõ. Hôm nay tôi xin phép tiếp tục hỗ trợ quý vị rèn luyện tiếng Nhật thương mại.';
    } else {
      japanese = 'へえ、そうなんだ！最近日本語の勉強はどう？何が一番難しい？';
      reading = 'へえ、そうなんだ！さいきんにほんごのべんきょうはどう？なにがいちばんむずかしい？';
      vietnamese = 'Ồ ra vậy sao! Dạo này học tiếng Nhật thế nào rồi? Cái gì là khó nhất vậy?';
    }

    // Check grammar errors in userText
    let hasError = false;
    let original = userText;
    let corrected = userText;
    let explanation = '';

    if (userText.includes('私行く') || userText.includes('私たべます')) {
      hasError = true;
      corrected = userText.replace('私行く', '私が行きます').replace('私たべます', '私が食べます');
      explanation = 'Thiếu trợ từ 「が」 hoặc 「は」 sau chủ ngữ 「私」 và nên chia động từ sang thể lịch sự (-masu).';
    } else if (userText.includes('図書館でいく')) {
      hasError = true;
      corrected = userText.replace('図書館でいく', '図書館へ行く');
      explanation = 'Trợ từ chỉ hướng chuyển động đi đến địa điểm phải dùng 「へ」 hoặc 「に」 thay vì 「で」.';
    }

    return {
      id: 'ai-msg-' + Date.now(),
      sender: 'ai',
      japanese,
      reading,
      vietnamese,
      grammarCorrection: {
        hasError,
        original,
        corrected,
        explanation
      },
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
  }

  /**
   * Deconstructs a Japanese sentence into grammar points, particles, pitch accents, and readings
   */
  public static deconstructSentence(sentence: string) {
    const cleanSentence = sentence.trim();
    if (!cleanSentence) return null;

    // Simulated sentence analysis engine
    return {
      originalSentence: cleanSentence,
      fullFurigana: 'わたし は まいにち にほんご を べんきょう します。',
      vietnameseTranslation: 'Tôi học tiếng Nhật mỗi ngày.',
      pitchAccentType: 'Nhấn âm Heiban (0) ở cuối câu.',
      tokens: [
        { word: '私', reading: 'わたし', role: 'Chủ ngữ (Đại từ nhân xưng)', meaning: 'Tôi', particleInfo: 'Trợ từ は (Wa) chỉ chủ đề câu' },
        { word: '毎日', reading: 'まいにち', role: 'Trạng từ chỉ thời gian', meaning: 'Mỗi ngày' },
        { word: '日本語', reading: 'にほんご', role: 'Tân ngữ bổ nghĩa', meaning: 'Tiếng Nhật', particleInfo: 'Trợ từ を (O) chỉ đối tượng chịu tác động' },
        { word: '勉強します', reading: 'べんきょうします', role: 'Động từ chính (Thể Lịch sự -masu)', meaning: 'Học tập' }
      ],
      grammarPoints: [
        { title: 'Cấu trúc N + は', explanation: 'Dùng để nhấn mạnh chủ đề chính mà người nói muốn đề cập.' },
        { title: 'Cấu trúc N + を + Động từ', explanation: 'Đánh dấu tân ngữ trực tiếp của hành động tác động lên.' }
      ]
    };
  }
}
