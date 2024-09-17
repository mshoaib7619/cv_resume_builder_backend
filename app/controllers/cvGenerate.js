// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const { CandidateProfile, Skill, Experience, Objective, Reference, Language, Project, Qualification } = require('../models');

// module.exports.cvGenerate = async (req, res) => {
//     try {
//         const candidateProfileId = req.query.candidateProfileId;
//         const candidateData = await CandidateProfile.findOne({
//             where: { id: candidateProfileId },
//             include: [
//                 { model: Qualification, as: 'qualifications' },
//                 { model: Skill, as: 'skill' },
//                 { model: Experience, as: 'experience' },
//                 { model: Objective, as: 'objective' },
//                 { model: Reference, as: 'reference' },
//                 { model: Language, as: 'language' },
//                 { model: Project, as: 'project' }
//             ]
//         });

//         if (!candidateData) {
//             return res.status(404).json({ message: 'Candidate profile not found' });
//         }

//         const doc = new PDFDocument({ size: 'A4', margin: 50 });
//         doc.pipe(fs.createWriteStream(`${candidateData.name}Resume.pdf`));

//         // Header
//         doc.fillColor('black')
//            .font('Helvetica-Bold').fontSize(24).text(candidateData.name, { align: 'center' });
//         doc.font('Helvetica').fontSize(12).fillColor('gray')
//            .text(`Phone: ${candidateData.phoneNumber} | Email: ${candidateData.email} | Address: ${candidateData.address}`, { align: 'center' })
//            .moveDown(1)
//            .fontSize(10).fillColor('gray').text(candidateData.summary,{align:"justify"})
//            .moveDown(1);

//         // Objective
//          doc.font('Helvetica-Bold').fontSize(12).fillColor('black').text('OBJECTIVE', { underline: true }).moveDown(1);
//          doc.font('Helvetica').fontSize(10).text(candidateData.objective.objective).moveDown(1);

//         //  Qualification
//         doc.font('Helvetica-Bold').fontSize(12).text('Qualification', { underline: true }).moveDown(0.5);
//         if (Array.isArray(candidateData.qualifications)) {
//             candidateData.qualifications.forEach(exp => {
                
//                 const startYear = new Date(exp.startDate).getFullYear();
//                 const endYear = new Date(exp.endDate).getFullYear();
//                 const dateRange = `${startYear} - ${endYear}`;

//                 doc.font('Helvetica-Bold').fontSize(11).fillColor('black')
//                 .text(`${exp.qualification} in ${exp.degree}`, { continued: true })
//                 .fillColor('grey').fontSize(9).text(dateRange, { align: 'right' }).moveDown(0.3); 
//                 doc.font('Helvetica').fillColor('black').fontSize(10).text(`${exp.school} at ${exp.city}`,{indent:10, continued : true})
//                 .font('Helvetica-Bold').fontSize(8).fillColor('grey').text('Marks/CGPA',{align:'right'});
//                 doc.text(`${exp.obtainMarks}/${exp.totalMarks}`,{align:'right'}).moveDown(0.5)
//             });
//         }

//         // Skills 
//          doc.font('Helvetica-Bold').fillColor('black').fontSize(12).text('SKILLS', { underline: true }).moveDown(0.5);
//          doc.fontSize(10).font('Helvetica').fillColor('black');
//          if (Array.isArray(candidateData.skill)) {
//              candidateData.skill.forEach((skill) => {
//                  doc.text(`•   ${skill.name}`, {
//                      continued: false,
//                      align: 'left',
//                      indent: 20,
//                  }).moveDown(0.3);
//              });
//          }

//         //  Experience
//         doc.font('Helvetica-Bold').fontSize(12).text('Experience', { underline: true }).moveDown(0.5);
//         if (Array.isArray(candidateData.experience)) {
//             candidateData.experience.forEach(exp => {

//             const startDate = new Date(exp.startDate);
//             const endDate = new Date(exp.endDate);

//             const startDayMonthYear = startDate.toLocaleDateString('default', { day: '2-digit', month: '2-digit', year: 'numeric' });
//             const endDayMonthYear = endDate.toLocaleDateString('default', { day: '2-digit', month: '2-digit', year: 'numeric' });
//             const dateRange = `${startDayMonthYear} - ${endDayMonthYear}`;

//                 doc.font('Helvetica-Bold').fontSize(11).fillColor('black')
//                 .text(`${exp.organizationName} at ${exp.city}`, { continued: true }).moveDown(0.5)
//                 .fillColor('grey').fontSize(9).text(dateRange, { align: 'right' }); 
//                 doc.font('Helvetica').fillColor('black').fontSize(10).text(`${exp.desigination}`,{indent:8}).moveDown(0.2)
//                 .text(`${exp.description}`,{indent:13}).moveDown(0.5)
//             }); 
//         }

//         // Language

//         doc.font('Helvetica-Bold').fontSize(12).text('Language', { underline: true }).moveDown(0.5);
//         if (Array.isArray(candidateData.language)) {
//             candidateData.language.forEach(lang => {
//                 doc.font('Helvetica').fontSize(10).text(`•   ${lang.name}`, { indent: 20 ,continued:true }) 
//                 .fontSize(10).text(`${lang.proficiencyLevel}`,{align:'right'}).moveDown(0.3)
//             }); 
//         }

//         //Hobby
//         doc.font('Helvetica-Bold').fontSize(12).text('Hobby', { underline: true }).moveDown(0.5);
//         if (Array.isArray(candidateData.hobby)) {
//             candidateData.hobby.forEach(hobby => {
//                 doc.font('Helvetica').fontSize(10).text(`•   ${hobby}`, { indent: 20}).moveDown(0.3)
//             }); 
//         }

//         //Reference
//         doc.font('Helvetica-Bold').fontSize(12).text('Reference', { underline: true }).moveDown(0.5);
//         if (Array.isArray(candidateData.reference)) {
//             candidateData.reference.forEach(ref => {
//                 doc.font('Helvetica').fontSize(10).text(`•   ${ref.name}`, { indent: 20}).moveDown(0.2)
//                 .text(`${ref.email}`, { indent: 30}).moveDown(0.3)
//             }); 
//         }


//         doc.end();
//         res.status(200).json({ message: 'CV generated successfully', filePath: `${candidateData.name}Resume.pdf`, candidateData });

//     } catch (e) {
//         console.error('controller:cv:cvGenerate:', e);
//         res.status(500).json({ message: e.message });
//     }
// };














// const ejs = require('ejs');
// const path = require('path');
// const wkhtmltopdf = require('wkhtmltopdf');
// const pathToWkhtmltopdf = require('wkhtmltopdf-installer').path;
// wkhtmltopdf.command = pathToWkhtmltopdf;

// const { CandidateProfile, Skill, Experience, Objective, Reference, Language, Project, Qualification } = require('../models');

// module.exports.cvGenerate = async (req, res) => {
//     try {
//         const candidateProfileId = req.query.candidateProfileId;
//         const candidateData = await CandidateProfile.findOne({
//             where: { id: candidateProfileId },
//             include: [
//                 { model: Qualification, as: 'qualifications' },
//                 { model: Skill, as: 'skill' },
//                 { model: Experience, as: 'experience' },
//                 { model: Objective, as: 'objective' },
//                 { model: Reference, as: 'reference' },
//                 { model: Language, as: 'language' },
//                 { model: Project, as: 'project' }
//             ]
//         });

//         if (!candidateData) {
//             return res.status(404).json({ message: 'Candidate profile not found' });
//         }

//         const templatePath = path.join(__dirname, '../view/cvTemplete.html');
//         const html = await ejs.renderFile(templatePath, { candidate: candidateData });

//         // Set up PDF output path
//         const outputFilePath = path.join(__dirname, `../view/${candidateData.name}Resume.pdf`);

//         // Render HTML to PDF
//         wkhtmltopdf(html, {
//             output: outputFilePath,
//             pageSize: 'A4',
//             printMediaType: true,
//             marginBottom: 10, // Adjust if necessary
//             marginTop: 10,
//             marginLeft: 10,
//             marginRight: 10,
//             enableLocalFileAccess: true, // Allow local CSS and image files
//             zoom: 1.0 
//         }, (err) => {
//             if (err) {
//                 console.error('Error generating PDF:', err);
//                 return res.status(500).json({ message: 'Error generating PDF', error: err.message });
//             }

//             // Send file path as a response
//             res.status(200).json({ message: 'CV generated successfully', filePath: outputFilePath ,candidateData});
//         });

//     } catch (e) {
//         console.error('controller:cv:cvGenerate:', e);
//         res.status(500).json({ message: e.message });
//     }
// };






const ejs = require('ejs');
const path = require('path');
const { chromium } = require('playwright');

const { CandidateProfile, Skill, Experience, Objective, Reference, Language, Project, Qualification } = require('../models');

module.exports.cvGenerate = async (req, res) => {
    try {
        const candidateProfileId = req.query.candidateProfileId;
        const candidateData = await CandidateProfile.findOne({
            where: { id: candidateProfileId },
            include: [
                { model: Qualification, as: 'qualifications' },
                { model: Skill, as: 'skill' },
                { model: Experience, as: 'experience' },
                { model: Objective, as: 'objective' },
                { model: Reference, as: 'reference' },
                { model: Language, as: 'language' },
                { model: Project, as: 'project' }
            ]
        });

        if (!candidateData) {
            return res.status(404).json({ message: 'Candidate profile not found' });
        }

        const templatePath = path.join(__dirname, '../view/templete3.html');
        const html = await ejs.renderFile(templatePath, { candidate: candidateData});

        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            margin: { top: '10px', bottom: '10px', left: '10px', right: '10px' },
            printBackground: true
        });

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', pdfBuffer.length);
        res.send(pdfBuffer);

    } catch (e) {
        console.error('controller:cv:cvGenerate:', e);
        res.status(500).json({ message: e.message });
    }
};
