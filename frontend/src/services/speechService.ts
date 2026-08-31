export class SpeechService {
  /**
   * Speaks Japanese text aloud using Web Speech API (ja-JP voice)
   */
  public static speakJapanese(text: string, rate: number = 1.0): void {
    if (!('speechSynthesis' in window)) {
      console.warn('Trình duyệt không hỗ trợ Web Speech API TTS.');
      return;
    }

    // Cancel ongoing speech
    window.speechSynthesis.cancel();

    // Clean text (remove furigana brackets if present)
    const cleanText = text.replace(/（[^）]+）/g, '').replace(/\([^)]+\)/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Find Japanese voice if available
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang.includes('ja') || v.lang.includes('JP'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Starts Speech-to-Text recording for Japanese speech
   */
  public static startSpeechRecognition(
    onResult: (transcript: string) => void,
    onError?: (err: any) => void
  ): any {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      if (onError) onError('Trình duyệt của bạn không hỗ trợ Nhận diện Giọng nói STT.');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      if (onError) onError(event.error);
    };

    recognition.start();
    return recognition;
  }
}
