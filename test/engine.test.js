const test = require("node:test");
const assert = require("node:assert");
const kb = require("../data/knowledge-base.json");
const { answer, normalize } = require("../src/engine");

test("normalize: huruf kecil & tanpa tanda baca", () => {
  assert.strictEqual(normalize("Halo, Apa Itu?!"), "halo apa itu");
});

test("menjawab FAQ perkenalan", () => {
  const r = answer("halo, siapa kamu?", kb);
  assert.strictEqual(r.faqId, "faq-001");
  assert.ok(r.answer.includes("Budi"));
});

test("menjawab FAQ kontak", () => {
  const r = answer(" gimana cara kontak kamu? ", kb);
  assert.strictEqual(r.faqId, "faq-003");
});

test("fallback untuk pertanyaan tak dikenal", () => {
  const r = answer("resep rendang padang", kb);
  assert.strictEqual(r.faqId, null);
  assert.strictEqual(r.answer, kb.fallback);
});

test("skor lebih tinggi untuk kecocokan lebih banyak", () => {
  const a = answer("kontak", kb);
  const b = answer("kontak email github", kb);
  assert.ok(b.score >= a.score);
});
