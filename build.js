import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const filesToCopy = [
  'index.html',
  'style.css',
  'script.js',
  'profile.jpg',
  'Akshay_Resume.pdf',
  'resume_template.html'
];

for (const file of filesToCopy) {
  const src = path.resolve(process.cwd(), file);
  const dest = path.resolve(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to dist/`);
  }
}

console.log('Build completed successfully!');
