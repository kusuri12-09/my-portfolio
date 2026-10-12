const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
function resolveFile(url) {
  const file = path.resolve(root, '.' + decodeURIComponent(new URL(url, 'http://localhost').pathname));
  if (!file.startsWith(root + path.sep) && file !== root) throw new Error('Invalid path');
  const relative = path.relative(root, file);
  if (relative && !/^(assets[\\/]|(?:index|entrydsm|modev|hear)\.html$|(?:styles|pdf)\.css$|script\.js$)/.test(relative)) throw new Error('Private file');
  return file === root ? path.join(root, 'index.html') : file;
}
function createServer() {
  return http.createServer(async (req, res) => {
    try {
      const file = resolveFile(req.url);
      const data = await fs.readFile(file);
      const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
      res.end(data);
    } catch { res.writeHead(404); res.end('Not found'); }
  });
}
module.exports = { createServer };
if (require.main === module) {
  if (process.argv.includes('--test')) {
    const assert = require('node:assert/strict');
    assert.equal(resolveFile('/'), path.join(root, 'index.html'));
    assert.throws(() => resolveFile('/AGENTS.md'));
    assert.throws(() => resolveFile('/assets/%2e%2e/%2e%2e/secret'));
    console.log('PASS: local server paths');
  } else {
    const server = createServer();
    server.on('error', error => { console.error(error.message); process.exitCode = 1; });
    server.listen(4173, '127.0.0.1', () => console.log('http://127.0.0.1:4173'));
  }
}
