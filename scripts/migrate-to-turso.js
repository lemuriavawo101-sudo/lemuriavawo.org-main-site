const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

const SEEDS_DIR = path.join(__dirname, '../src/lib/seeds');

async function migrate() {
    console.log('🚀 Starting Migration to Turso...');

    try {
        // 1. Create Tables
        console.log('Creating tables...');

        await db.execute(`
            CREATE TABLE IF NOT EXISTS gallery (
                id TEXT PRIMARY KEY,
                title TEXT,
                category TEXT,
                image TEXT,
                color TEXT
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY,
                day TEXT,
                month TEXT,
                year TEXT,
                date TEXT,
                type TEXT,
                title TEXT,
                subtitle TEXT,
                location TEXT,
                focus TEXT,
                description TEXT,
                wisdomSummary TEXT,
                tag TEXT,
                color TEXT,
                accent TEXT,
                image TEXT,
                number TEXT,
                placement TEXT
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS gurus (
                name TEXT PRIMARY KEY,
                role TEXT,
                bio TEXT,
                image TEXT
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS student_records (
                id TEXT PRIMARY KEY,
                student_name TEXT,
                la_number TEXT,
                university_id TEXT,
                issue_date TEXT,
                course_title TEXT,
                certificate_url TEXT
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS classes (
                id TEXT PRIMARY KEY,
                title TEXT,
                subtitle TEXT,
                description TEXT,
                duration TEXT,
                schedule TEXT,
                level TEXT,
                image TEXT,
                color TEXT
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS camps (
                id TEXT PRIMARY KEY,
                title TEXT,
                location TEXT,
                date TEXT,
                description TEXT,
                tag TEXT,
                image TEXT,
                color TEXT
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS certificates (
                id TEXT PRIMARY KEY,
                title TEXT,
                description TEXT,
                prerequisite TEXT,
                duration TEXT
            )
        `);

        // 2. Migrate Gallery Data
        console.log('Migrating Gallery...');
        const galleryData = JSON.parse(fs.readFileSync(path.join(SEEDS_DIR, 'gallery.json'), 'utf8'));
        for (const item of galleryData) {
            await db.execute({
                sql: `INSERT OR REPLACE INTO gallery (id, title, category, image, color) VALUES (?, ?, ?, ?, ?)`,
                args: [item.id, item.title, item.category, item.image, item.color]
            });
        }

        // 3. Migrate Events Data
        console.log('Migrating Events...');
        const eventsData = JSON.parse(fs.readFileSync(path.join(SEEDS_DIR, 'events.json'), 'utf8'));
        for (const item of eventsData) {
            await db.execute({
                sql: `INSERT OR REPLACE INTO events (id, day, month, year, date, type, title, subtitle, location, focus, description, wisdomSummary, tag, color, accent, image, number, placement) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    item.id, item.day, item.month, item.year, item.date, item.type,
                    item.title, item.subtitle, item.location, item.focus, item.description,
                    item.wisdomSummary, item.tag, item.color, item.accent, item.image,
                    item.number, item.placement
                ]
            });
        }

        // 4. Migrate Gurus Data
        console.log('Migrating Gurus...');
        const gurusData = JSON.parse(fs.readFileSync(path.join(SEEDS_DIR, 'gurus.json'), 'utf8'));
        for (const item of gurusData) {
            await db.execute({
                sql: `INSERT OR REPLACE INTO gurus (name, role, bio, image) VALUES (?, ?, ?, ?)`,
                args: [item.name, item.role, item.bio, item.image]
            });
        }

        console.log('✅ Migration completed successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        process.exit();
    }
}

migrate();
