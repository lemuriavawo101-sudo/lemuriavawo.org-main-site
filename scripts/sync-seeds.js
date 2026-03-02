const fs = require('fs');
const path = require('path');

const SEEDS_DIR = path.join(__dirname, '../src/lib/seeds');
const CONSTANTS_FILE = path.join(__dirname, '../src/lib/constants.ts');

function readSeed(filename) {
    const filePath = path.join(SEEDS_DIR, filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function generateConstants() {
    console.log('🌱 Starting Data Seeding...');

    try {
        const events = readSeed('events.json');
        const gurus = readSeed('gurus.json');
        const classes = readSeed('classes.json');
        const camps = readSeed('camps.json');
        const certificates = readSeed('certificates.json');
        const studentRecords = readSeed('student_records.json');
        const gallery = readSeed('gallery.json');

        const content = `// WARNING: This file is managed by the seeding system. 
// To update data, edit the JSON files in /src/lib/seeds/ and run: npm run seed

export const EVENTS = ${JSON.stringify(events, null, 4)};

export const GURUS = ${JSON.stringify(gurus, null, 4)};

export const CLASSES = ${JSON.stringify(classes, null, 4)};

export const CAMPS = ${JSON.stringify(camps, null, 4)};

export const CERTIFICATES = ${JSON.stringify(certificates, null, 4)};

export const STUDENT_RECORDS = ${JSON.stringify(studentRecords, null, 4)};

export const GALLERY_IMAGES = ${JSON.stringify(gallery, null, 4)};
`;

        fs.writeFileSync(CONSTANTS_FILE, content, 'utf8');
        console.log('✅ src/lib/constants.ts has been successfully restored from seeds.');
    } catch (error) {
        console.error('❌ Error during seeding:', error.message);
        process.exit(1);
    }
}

generateConstants();
