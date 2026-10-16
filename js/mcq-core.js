// MCQ bank core. Each module's multiple-choice questions are added in mcq-*.js files as:
//   Object.assign(MCQ.en, { "slug": [ [question, [option, option, option, option], correctIndex, explanation], ... ] });
// applyMcq() copies them into MODULE_CONTENT so the lesson page shows them as the module's quiz.
const MCQ = { en: {}, hi: {} };

function applyMcq() {
  ["en", "hi"].forEach(lg => {
    Object.keys(MCQ[lg]).forEach(slug => {
      MODULE_CONTENT[lg] = MODULE_CONTENT[lg] || {};
      MODULE_CONTENT[lg][slug] = MODULE_CONTENT[lg][slug] || { faq: [], quiz: [] };
      MODULE_CONTENT[lg][slug].quiz = MCQ[lg][slug].map(([q, o, a, e]) => ({ q, o, a, e }));
    });
  });
}
