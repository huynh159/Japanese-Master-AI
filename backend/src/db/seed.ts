import fs from 'fs';
import path from 'path';
import { pool, checkDbConnection } from './index';
import { KANJI_DATABASE, VOCAB_DATABASE, JLPT_EXAM_QUESTIONS } from '../data/japaneseData';

async function seedDatabase() {
  console.log('🌱 [PostgreSQL Seeder] Đang bắt đầu khởi tạo và chèn dữ liệu mẫu...');

  const isConnected = await checkDbConnection();
  if (!isConnected) {
    console.error('❌ Không thể chạy Seeder vì chưa kết nối được tới PostgreSQL Server!');
    process.exit(1);
  }

  try {
    // 1. Run schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(schemaSql);
    console.log('✅ [PostgreSQL Seeder] Đã tạo các bảng cơ sở dữ liệu (Schema DDL).');

    // 2. Seed Kanji Data
    for (const kanji of KANJI_DATABASE) {
      await pool.query(
        `INSERT INTO kanji (character, han_viet, onyomi, kunyomi, meanings, jlpt, stroke_count, radicals, mnemonic, examples)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (character) DO UPDATE SET
           han_viet = EXCLUDED.han_viet,
           onyomi = EXCLUDED.onyomi,
           kunyomi = EXCLUDED.kunyomi,
           meanings = EXCLUDED.meanings,
           jlpt = EXCLUDED.jlpt,
           stroke_count = EXCLUDED.stroke_count,
           radicals = EXCLUDED.radicals,
           mnemonic = EXCLUDED.mnemonic,
           examples = EXCLUDED.examples`,
        [
          kanji.character,
          kanji.hanViet,
          kanji.onyomi,
          kanji.kunyomi,
          kanji.meanings,
          kanji.jlpt,
          kanji.strokeCount,
          kanji.radicals,
          kanji.mnemonic,
          JSON.stringify(kanji.examples)
        ]
      );
    }
    console.log(`✅ [PostgreSQL Seeder] Đã nạp thành công ${KANJI_DATABASE.length} Hán tự Kanji.`);

    // 3. Seed Vocab Data
    for (const vocab of VOCAB_DATABASE) {
      await pool.query(
        `INSERT INTO vocab (id, word, reading, romaji, han_viet, meanings, jlpt, type, pitch_accent, example_sentence)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO UPDATE SET
           word = EXCLUDED.word,
           reading = EXCLUDED.reading,
           romaji = EXCLUDED.romaji,
           han_viet = EXCLUDED.han_viet,
           meanings = EXCLUDED.meanings,
           jlpt = EXCLUDED.jlpt,
           type = EXCLUDED.type,
           pitch_accent = EXCLUDED.pitch_accent,
           example_sentence = EXCLUDED.example_sentence`,
        [
          vocab.id,
          vocab.word,
          vocab.reading,
          vocab.romaji,
          vocab.hanViet || null,
          vocab.meanings,
          vocab.jlpt,
          vocab.type,
          vocab.pitchAccent || null,
          vocab.exampleSentence ? JSON.stringify(vocab.exampleSentence) : null
        ]
      );
    }
    console.log(`✅ [PostgreSQL Seeder] Đã nạp thành công ${VOCAB_DATABASE.length} từ vựng tiếng Nhật.`);

    // 4. Seed JLPT Questions Data
    for (const q of JLPT_EXAM_QUESTIONS) {
      await pool.query(
        `INSERT INTO jlpt_questions (id, jlpt, category, question, reading_context, audio_prompt_url, options, correct_answer, explanation, grammar_point)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO UPDATE SET
           jlpt = EXCLUDED.jlpt,
           category = EXCLUDED.category,
           question = EXCLUDED.question,
           reading_context = EXCLUDED.reading_context,
           audio_prompt_url = EXCLUDED.audio_prompt_url,
           options = EXCLUDED.options,
           correct_answer = EXCLUDED.correct_answer,
           explanation = EXCLUDED.explanation,
           grammar_point = EXCLUDED.grammar_point`,
        [
          q.id,
          q.jlpt,
          q.category,
          q.question,
          q.readingContext || null,
          q.audioPromptUrl || null,
          JSON.stringify(q.options),
          q.correctAnswer,
          q.explanation,
          q.grammarPoint || null
        ]
      );
    }
    console.log(`✅ [PostgreSQL Seeder] Đã nạp thành công ${JLPT_EXAM_QUESTIONS.length} câu hỏi đề thi JLPT.`);

    console.log('🎉 [PostgreSQL Seeder] Đã nạp dữ liệu hoàn tất!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi khi nạp dữ liệu vào PostgreSQL:', err);
    process.exit(1);
  }
}

seedDatabase();
