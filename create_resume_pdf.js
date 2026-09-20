import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 32, bottom: 32, left: 38, right: 38 }
});

const outputPath = path.join(__dirname, 'Akshay_Resume.pdf');
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Styling constants
const PRIMARY = '#0f172a'; // Deep slate
const ACCENT = '#0284c7';  // Blue accent
const TEXT = '#334155';    // Charcoal text
const MUTED = '#64748b';   // Slate muted
const LINE_COLOR = '#cbd5e1';

// Helper: Section Heading
function addSectionHeader(title) {
  doc.moveDown(0.5);
  doc.x = doc.page.margins.left;
  doc.fontSize(10.5).font('Helvetica-Bold').fillColor(PRIMARY).text(title.toUpperCase(), doc.page.margins.left, doc.y, { letterSpacing: 0.8 });
  const y = doc.y + 2;
  doc.strokeColor(PRIMARY).lineWidth(1.2).moveTo(doc.page.margins.left, y).lineTo(doc.page.width - doc.page.margins.right, y).stroke();
  doc.moveDown(0.4);
}

// Helper: Item Header with Title and Date
function addItemHeader(title, subtitle, date) {
  const leftX = doc.page.margins.left;
  const rightX = doc.page.width - doc.page.margins.right;
  const currentY = doc.y;

  doc.fontSize(9.5).font('Helvetica-Bold').fillColor(PRIMARY).text(title, leftX, currentY, { continued: subtitle ? true : false });
  if (subtitle) {
    doc.fontSize(9).font('Helvetica').fillColor(TEXT).text(`  |  ${subtitle}`);
  }
  
  if (date) {
    doc.fontSize(8.5).font('Helvetica-Bold').fillColor(MUTED).text(date, leftX, currentY, { align: 'right' });
  }
  doc.y = currentY + 13;
}

// Helper: Bullet point
function addBullet(text) {
  const leftX = doc.page.margins.left + 8;
  doc.fontSize(8.8).font('Helvetica').fillColor(TEXT);
  doc.text('•  ', leftX, doc.y, { continued: true });
  doc.text(text, { align: 'left', lineGap: 1.5 });
  doc.moveDown(0.15);
}

// ==================== HEADER ====================
doc.fontSize(22).font('Helvetica-Bold').fillColor(PRIMARY).text('AKSHAY', { align: 'center', letterSpacing: 1.5 });
doc.moveDown(0.2);

doc.fontSize(8.8).font('Helvetica').fillColor(TEXT).text(
  'Phone: +91-7626993524   |   Email: akshaysati2002@gmail.com   |   Location: Chandigarh, India',
  { align: 'center' }
);
const linkedInLabel = 'LinkedIn: akshay-sati';
const githubLabel = 'GitHub: akshaysati12';
const profileSeparator = '   |   ';
doc.fontSize(8.8).font('Helvetica-Bold');
const profileWidth = doc.widthOfString(linkedInLabel) + doc.widthOfString(profileSeparator) + doc.widthOfString(githubLabel);
const profileX = (doc.page.width - profileWidth) / 2;
const profileY = doc.y;
doc.fillColor(ACCENT).text(linkedInLabel, profileX, profileY, {
  link: 'https://www.linkedin.com/in/akshay-sati-b41bb5283/',
  underline: true,
  lineBreak: false
});
doc.fillColor(TEXT).text(profileSeparator, profileX + doc.widthOfString(linkedInLabel), profileY, { lineBreak: false });
doc.fillColor(ACCENT).text(githubLabel, profileX + doc.widthOfString(linkedInLabel) + doc.widthOfString(profileSeparator), profileY, {
  link: 'https://github.com/akshaysati12?tab=repositories',
  underline: true,
  lineBreak: false
});
doc.y = profileY + 12;
doc.x = doc.page.margins.left;
doc.moveDown(0.3);

// Horizontal Rule
doc.strokeColor(LINE_COLOR).lineWidth(0.8).moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
doc.moveDown(0.3);

// ==================== OBJECTIVE ====================
addSectionHeader('Professional Summary');
doc.fontSize(8.8).font('Helvetica').fillColor(TEXT).text(
  'Versatile Computer Science Engineer specializing in Information Security and Software Development. Skilled in designing, developing, and securing enterprise applications with hands-on expertise in Network Security, Vulnerability Analysis, SIEM Log Management, REST API Integration, and Full-Stack Engineering. Eager to contribute to high-impact engineering and cybersecurity initiatives.',
  { align: 'justify', lineGap: 1.5 }
);

// ==================== EDUCATION ====================
addSectionHeader('Education');

addItemHeader('UIET – Panjab University, Chandigarh', 'M.E. in Computer Science (Cyber Security)', 'Sep 2025 – Oct 2027');
doc.fontSize(8.5).font('Helvetica-Bold').fillColor(ACCENT).text('CGPA: 8.5', doc.page.margins.left + 8, doc.y - 1);
doc.moveDown(0.3);

addItemHeader('Chandigarh University, Punjab', 'B.E. in Computer Science (Information Security)', 'Aug 2022 – May 2025');
doc.fontSize(8.5).font('Helvetica-Bold').fillColor(ACCENT).text('CGPA: 8.01', doc.page.margins.left + 8, doc.y - 1);
doc.moveDown(0.3);

// ==================== EXPERIENCE ====================
addSectionHeader('Experience & Internships');

addItemHeader('SafeAeon Inc.', 'SOC Analyst Intern', 'July 2025 – Sep 2025');
addBullet('Monitored and analyzed real-time security alerts utilizing industry-leading tools: Rapid7, SentinelOne, and Avanan Email Security.');
addBullet('Investigated active cyber threats, executed incident triage, and strengthened overall enterprise security posture.');
doc.moveDown(0.2);

addItemHeader('Indian Cyber Crime Coordination Centre (I4C) – MHA', 'Network Security Intern', 'Dec 2024 – Feb 2025');
addBullet('Configured enterprise switches, managed firewalls, and provisioned server clusters with RAID, Hyper-V, TACACS+, and Dell iDRAC.');
addBullet('Contributed to designing high-availability, secure, and scalable network infrastructure for cyber incident operations.');
doc.moveDown(0.2);

addItemHeader('CBitss', 'Java Developer Intern', 'Jan 2023 – Mar 2023');
addBullet('Gained hands-on experience in API connectivity, JDBC database pipelines, and enterprise software architecture.');
addBullet('Developed intuitive user interfaces and optimized backend performance using NetBeans IDE through structured debugging.');
doc.moveDown(0.3);

// ==================== PROJECTS ====================
addSectionHeader('Key Projects');

addItemHeader('Image Forensics Steganographic Analysis System', 'Python, OpenCV, NumPy, Pywt, Streamlit, Tkinter', 'Jan 2026');
addBullet('Developed frequency domain image steganography (DCT, DWT, FFT) suite for covert data embedding and anti-forensic detection.');
doc.moveDown(0.15);

addItemHeader('Crypto-Jacking Real-Time Detection Tool', 'Python, GUI, Multi-threading, Network Analysis', 'Dec 2025');
addBullet('Built real-time CPU, GPU, memory, and packet monitoring daemon with automated malicious process termination and IP blacklisting.');
doc.moveDown(0.15);

addItemHeader('Tour & Travel Flight Search Platform', 'HTML5, CSS3, JavaScript, Live Flight Data APIs', 'Feb 2026');
addBullet('Created a flight search engine across 50+ international airports redirecting to 40+ official airline booking gateways.');
doc.moveDown(0.15);

addItemHeader('RAS : Enterprise SIEM Log Monitoring Solution', 'Wazuh, Elasticsearch, Kibana, Fluentd, Linux, Bash', 'Jan 2025');
addBullet('Architected log collection pipeline aggregating system, auth, and network logs with custom anomaly detection dashboards.');
doc.moveDown(0.15);

addItemHeader('Web Application Vulnerability Scanner', 'Python, OWASP Top 10, CSRF & SQLi Detection', 'Aug 2024');
addBullet('Engineered automated security scanner assessing web apps for SQL Injection and CSRF vulnerabilities with audit reports.');
doc.moveDown(0.15);

addItemHeader('Library Management Enterprise System', 'Java, MySQL, NetBeans, JDBC', 'Aug 2023');
addBullet('Designed role-based library workflow with book issuance tracking, automated overdue fees, and secure auth.');
doc.moveDown(0.3);

// ==================== SKILLS & CERTIFICATIONS ====================
// ==================== SKILLS ====================
addSectionHeader('Technical Skills');

function addSkillRow(label, items) {
  const leftX = doc.page.margins.left;
  const currentY = doc.y;
  doc.fontSize(8.8).font('Helvetica-Bold').fillColor(PRIMARY).text(label, leftX, currentY);
  doc.fontSize(8.8).font('Helvetica').fillColor(TEXT).text(items, leftX + 140, currentY);
  doc.moveDown(0.25);
}

addSkillRow('Programming / Scripting:', 'Java, Python, C, SQL, Bash, HTML5, CSS3, JavaScript, Git & GitHub');
addSkillRow('Cybersecurity & Defense:', 'Network Security, Cryptography, SIEM, OWASP Top 10, Linux Administration, Incident Response');
addSkillRow('Security & Audit Tools:', 'Nmap, Wireshark, Metasploit, Burp Suite, Aircrack-ng, Maltego, Rapid7, SentinelOne, Wazuh');
addSkillRow('Infrastructure & Systems:', 'RAID, Hyper-V, TACACS+ Configuration, Dell iDRAC, Switch & Firewall Setup');
addSkillRow('Databases & Frameworks:', 'MySQL, JDBC, Elasticsearch, Kibana, Fluentd, XAMPP Server');
doc.moveDown(0.3);

// ==================== CERTIFICATIONS ====================
addSectionHeader('Certifications');

const certList = [
  'CompTIA Security+ (SY701)',
  'Certified Network Security Practitioner (CNSP)',
  'Certified APPSec Practitioner (CAP)',
  'ISO 27001 (ISMS) by Alison',
  'Cyber Threat Intelligence 101 (CTI-101)'
];

certList.forEach(cert => {
  addBullet(cert);
});

doc.end();

stream.on('finish', () => {
  console.log(`✅ Clean merged Resume PDF successfully created at: ${outputPath}`);
});
