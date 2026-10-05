/**
 * Mesin chatbot: pencocokan kata kunci + skor sederhana (tanpa AI eksternal).
 */
function normalize(text) {
  return String(text).toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}

/**
 * @param {string} message - pesan pengguna
 * @param {{faq: Array<{jawaban: string, kataKunci: string[]}>, fallback: string}} kb
 * @returns {{answer: string, faqId: string|null, score: number}}
 */
function answer(message, kb) {
  const text = normalize(message);
  const tokens = new Set(text.split(/\s+/).filter(Boolean));
  let best = null;
  let bestScore = 0;

  for (const item of kb.faq) {
    let score = 0;
    for (const kw of item.kataKunci) {
      const k = normalize(kw);
      if (tokens.has(k)) score += 2; // kecocokan kata utuh
      else if (k.length > 4 && text.includes(k)) score += 1; // substring
    }
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  if (!best || bestScore === 0) {
    return { answer: kb.fallback, faqId: null, score: 0 };
  }
  return { answer: best.jawaban, faqId: best.id, score: bestScore };
}

module.exports = { answer, normalize };
