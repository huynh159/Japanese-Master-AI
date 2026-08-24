import { KaiwaMessage, KaiwaTone } from '../types';

export class AiService {
  public static generateKaiwaResponse(userText: string, tone: KaiwaTone): KaiwaMessage {
    let japanese = '';
    let reading = '';
    let vietnamese = '';

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

    let hasError = false;
    let original = userText;
    let corrected = userText;
    let explanation = '';

    if (userText.includes('私行く') || userText.includes('私たべます')) {
      hasError = true;
      corrected = userText.replace('私行く', '私が行きます').replace('私たべます', '私が食べます');
      explanation = 'Thiếu trợ từ 「が」 hoặc 「は」 sau chủ ngữ 「私」 và nên chia động từ sang thể lịch sự (-masu).';
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

  public static deconstructSentence(sentence: string) {
    const cleanSentence = sentence.trim();
    return {
      originalSentence: cleanSentence,
      fullFurigana: 'わたし は まいにち にほんご を べんきょう します。',
      vietnameseTranslation: 'Tôi học tiếng Nhật mỗi ngày.',
      pitchAccentType: 'Nhấn âm Heiban (0) ở cuối câu.',
      tokens: [
        { word: '私', reading: 'わたし', role: 'Chủ ngữ', meaning: 'Tôi', particleInfo: 'Trợ từ は (Wa)' },
        { word: '毎日', reading: 'まいにち', role: 'Trạng từ', meaning: 'Mỗi ngày' },
        { word: '日本語', reading: 'にほんご', role: 'Tân ngữ', meaning: 'Tiếng Nhật', particleInfo: 'Trợ từ を (O)' },
        { word: '勉強します', reading: 'べんきょうします', role: 'Động từ chính', meaning: 'Học tập' }
      ]
    };
  }
}
