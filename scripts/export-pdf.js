const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const { createServer } = require('./server');
const root = path.resolve(__dirname, '..');

async function main() {
  const server = createServer();
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();
    const base = `http://127.0.0.1:${server.address().port}/`;
    async function extract(file, selectors) {
      await page.goto(base + file);
      return page.evaluate(selectors => selectors.map(selector => {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Missing PDF section: ${selector}`);
        const copy = element.cloneNode(true);
        copy.querySelectorAll('.socials button,.copy-status,.back-link').forEach(node => node.remove());
        return copy.outerHTML;
      }), selectors);
    }
    const [about, skills, projects, contact] = await extract('index.html', ['#about', '#skills', '#projects', '#contact']);
    const details = [];
    for (const file of ['entrydsm.html', 'modev.html', 'hear.html']) {
      const [hero, article] = await extract(file, ['.detail-hero', '.article']);
      details.push(`<section class="pdf-project">${hero}${article}</section>`);
    }
    const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><base href="${base}"><title>국승리 포트폴리오</title><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="pdf.css"></head><body><main>${about}${skills}${projects}${details.join('')}${contact}</main></body></html>`;
    await fs.mkdir(path.join(root, 'output'), { recursive: true });
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('.article').forEach(article => {
        let section;
        [...article.children].forEach(element => {
          if (element.tagName === 'H2') {
            section = document.createElement('section');
            section.className = 'pdf-section';
            article.insertBefore(section, element);
          }
          if (section) section.appendChild(element);
        });
      });
      const ending = document.createElement('section');
      ending.className = 'pdf-ending';
      const lastArticle = [...document.querySelectorAll('.pdf-project .article')].at(-1);
      const contact = document.querySelector('.contact');
      const finalSections = [...lastArticle.querySelectorAll(':scope > .pdf-section')].slice(-2);
      finalSections.forEach(section => ending.appendChild(section));
      ending.appendChild(contact);
      lastArticle.appendChild(ending);
      await document.fonts.ready;
      await Promise.all([...document.images].map(async image => {
        image.loading = 'eager';
        await image.decode();
      }));
      // Source IDs repeat across project pages; the combined PDF uses external links.
      document.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!/^(https?:|mailto:)/.test(href)) link.href = new URL(href, 'https://kusuri12-09.github.io/my-portfolio/').href;
      });
    });
    const output = path.join(root, 'output', '국승리-포트폴리오.pdf');
    await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log(output);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
