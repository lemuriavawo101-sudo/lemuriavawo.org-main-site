'use server';

import fs from 'fs/promises';
import path from 'path';
import * as XLSX from 'xlsx';

const SEEDS_DIR = path.join(process.cwd(), 'src/lib/seeds');
const PUBLIC_UPLOADS_DIR = path.join(process.cwd(), 'public/uploads');
const CONSTANTS_FILE = path.join(process.cwd(), 'src/lib/constants.ts');


export async function importCertificatesExcelAction(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        if (!file) throw new Error('No Excel file provided');

        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const records = data.map((item: any) => ({
            id: Math.random().toString(36).substr(2, 9),
            student_name: item.student_name || '',
            la_number: item.la_number || '',
            university_id: item.university_id || '',
            issue_date: item.issue_date || '',
            course_title: item.course_title || '',
            certificate_url: item.certificate_url || ''
        }));

        await saveToSeedsAction('student_records', records);

        return { success: true, count: records.length };
    } catch (error: any) {
        console.error('Excel Import Error:', error);
        return { success: false, error: error.message };
    }
}

export async function importCertificatesCSVAction(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        if (!file) throw new Error('No file provided');

        const text = await file.text();
        const lines = text.split(/\r?\n/);
        const headers = lines[0].split(',').map(h => h.trim());

        const records = lines.slice(1).filter(line => line.trim()).map(line => {
            const values = line.split(',').map(v => v.trim());
            const record: any = { id: Math.random().toString(36).substr(2, 9) };
            headers.forEach((header, i) => {
                record[header] = values[i];
            });
            return record;
        });

        // Save to seeds
        await saveToSeedsAction('student_records', records);

        return { success: true, count: records.length };
    } catch (error: any) {
        console.error('CSV Import Error:', error);
        return { success: false, error: error.message };
    }
}

export async function saveToSeedsAction(category: string, data: any[]) {
    try {
        // 1. Write to specific seed file
        const seedPath = path.join(SEEDS_DIR, `${category}.json`);
        await fs.writeFile(seedPath, JSON.stringify(data, null, 4), 'utf8');

        // 2. Read all seeds to regenerate constants.ts
        const events = JSON.parse(await fs.readFile(path.join(SEEDS_DIR, 'events.json'), 'utf8'));
        const gurus = JSON.parse(await fs.readFile(path.join(SEEDS_DIR, 'gurus.json'), 'utf8'));
        const classes = JSON.parse(await fs.readFile(path.join(SEEDS_DIR, 'classes.json'), 'utf8'));
        const camps = JSON.parse(await fs.readFile(path.join(SEEDS_DIR, 'camps.json'), 'utf8'));
        const certificates = JSON.parse(await fs.readFile(path.join(SEEDS_DIR, 'certificates.json'), 'utf8'));

        let studentRecords = [];
        try {
            studentRecords = JSON.parse(await fs.readFile(path.join(SEEDS_DIR, 'student_records.json'), 'utf8'));
        } catch (e) { /* file might not exist yet */ }

        const content = `// WARNING: This file is managed by the seeding system. 
// To update data, edit the JSON files in /src/lib/seeds/ and run: npm run seed

export const EVENTS = ${JSON.stringify(events, null, 4)};

export const GURUS = ${JSON.stringify(gurus, null, 4)};

export const CLASSES = ${JSON.stringify(classes, null, 4)};

export const CAMPS = ${JSON.stringify(camps, null, 4)};

export const CERTIFICATES = ${JSON.stringify(certificates, null, 4)};

export const STUDENT_RECORDS = ${JSON.stringify(studentRecords, null, 4)};
`;

        await fs.writeFile(CONSTANTS_FILE, content, 'utf8');

        return { success: true };
    } catch (error: any) {
        console.error('Save error:', error);
        return { success: false, error: error.message };
    }
}
