const readline = require("node:readline");
const kb = require("../data/knowledge-base.json");
const { answer } = require("./engine");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("🤖 ChatBot Personal — ketik 'exit' untuk keluar.\n");

function loop() {
  rl.question("Kamu: ", (line) => {
    const msg = line.trim();
    if (!msg) return loop();
    if (/^(exit|keluar|quit)$/i.test(msg)) {
      console.log("Bot: Sampai jumpa! 👋");
      rl.close();
      return;
    }
    const res = answer(msg, kb);
    console.log(`Bot : ${res.answer}\n`);
    loop();
  });
}

loop();
