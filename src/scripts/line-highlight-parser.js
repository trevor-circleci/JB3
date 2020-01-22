/* global Prism */
(function() {
  if (
    typeof self === `undefined` ||
    !self.Prism ||
    !self.document ||
    !document.querySelector
  ) {
    return;
  }

  Prism.hooks.add(`before-highlight`, function(env) {
    const regex = /^\/\/\sLineHighlight:\s.*$/gm;
    let lineCode = ``;
    env.code = env.code
      .split(`\n`)
      .filter(line => (line.match(regex) ? !(lineCode = line) : true))
      .join(`\n`);

    // Parse line - extract param value
    lineCode = lineCode.match(/\/\/\sLineHighlight:\s(.*)(?=;)/);
    lineCode = lineCode ? lineCode[1] : null;

    // Add data-line attribute
    if (lineCode) {
      env.element.closest(`pre`).dataset.line = lineCode;
    }
  });
})();
