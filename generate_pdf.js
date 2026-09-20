import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  console.log('📄 Launching browser to generate PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const htmlPath = 'file:///' + path.join(__dirname, 'resume_template.html').replace(/\\/g, '/');
  
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(__dirname, 'Akshay_Resume.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      right: '12mm',
      bottom: '10mm',
      left: '12mm'
    }
  });

  await browser.close();
  console.log(`✅ Resume PDF successfully created at: ${pdfPath}`);
}

generatePDF().catch(err => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
