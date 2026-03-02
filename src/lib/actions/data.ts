'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// Gallery Actions
export async function getGalleryImages() {
    try {
        const result = await db.execute('SELECT * FROM gallery ORDER BY id DESC');
        return JSON.parse(JSON.stringify(result.rows));
    } catch (error) {
        console.error('Failed to fetch gallery images:', error);
        return [];
    }
}

export async function addGalleryImage(image: any) {
    try {
        await db.execute({
            sql: 'INSERT INTO gallery (id, title, category, image, color) VALUES (?, ?, ?, ?, ?)',
            args: [image.id, image.title, image.category, image.image, image.color]
        });
        revalidatePath('/admin/gallery');
        revalidatePath('/gallery');
        return { success: true };
    } catch (error) {
        console.error('Failed to add gallery image:', error);
        return { success: false, error };
    }
}

export async function deleteGalleryImage(id: string) {
    try {
        await db.execute({
            sql: 'DELETE FROM gallery WHERE id = ?',
            args: [id]
        });
        revalidatePath('/admin/gallery');
        revalidatePath('/gallery');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete gallery image:', error);
        return { success: false, error };
    }
}

export async function updateGalleryImage(image: any) {
    try {
        await db.execute({
            sql: 'UPDATE gallery SET title = ?, category = ?, color = ? WHERE id = ?',
            args: [image.title, image.category, image.color, image.id]
        });
        revalidatePath('/admin/gallery');
        revalidatePath('/gallery');
        return { success: true };
    } catch (error) {
        console.error('Failed to update gallery image:', error);
        return { success: false, error };
    }
}

// Events Actions
export async function getEvents() {
    try {
        const result = await db.execute('SELECT * FROM events ORDER BY date ASC');
        return JSON.parse(JSON.stringify(result.rows));
    } catch (error) {
        console.error('Failed to fetch events:', error);
        return [];
    }
}

// Gurus Actions
export async function getGurus() {
    try {
        const result = await db.execute('SELECT * FROM gurus');
        return JSON.parse(JSON.stringify(result.rows));
    } catch (error) {
        console.error('Failed to fetch gurus:', error);
        return [];
    }
}

// Data Management Actions
export async function saveToSeedsAction(category: string, data: any[]) {
    try {
        // 1. Update Turso Database
        if (category === 'events') {
            await db.execute('DELETE FROM events');
            for (const item of data) {
                await db.execute({
                    sql: `INSERT INTO events (id, day, month, year, date, type, title, subtitle, location, focus, description, wisdomSummary, tag, color, accent, image, number, placement) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    args: [
                        item.id, item.day, item.month, item.year, item.date, item.type,
                        item.title, item.subtitle, item.location, item.focus, item.description,
                        item.wisdomSummary, item.tag, item.color, item.accent, item.image,
                        item.number, item.placement
                    ]
                });
            }
        } else if (category === 'classes') {
            await db.execute('DELETE FROM classes');
            for (const item of data) {
                await db.execute({
                    sql: 'INSERT INTO classes (id, title, subtitle, description, duration, schedule, level, image, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    args: [item.id, item.title, item.subtitle, item.description, item.duration, item.schedule, item.level, item.image, item.color]
                });
            }
        } else if (category === 'camps') {
            await db.execute('DELETE FROM camps');
            for (const item of data) {
                await db.execute({
                    sql: 'INSERT INTO camps (id, title, location, date, description, tag, image, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    args: [item.id, item.title, item.location, item.date, item.description, item.tag, item.image, item.color]
                });
            }
        } else if (category === 'student_records') {
            await db.execute('DELETE FROM student_records');
            for (const item of data) {
                await db.execute({
                    sql: 'INSERT INTO student_records (id, student_name, la_number, university_id, issue_date, course_title, certificate_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    args: [item.id || Math.random().toString(36).substring(2, 11), item.student_name, item.la_number, item.university_id, item.issue_date, item.course_title, item.certificate_url]
                });
            }
        }

        // 2. Optional: Sync to local JSON seeds for development consistency
        if (process.env.NODE_ENV === 'development') {
            try {
                const filePath = path.join(process.cwd(), 'src/lib/seeds', `${category}.json`);
                fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
            } catch (e) {
                console.warn('Failed to sync to local seeds:', e);
            }
        }

        revalidatePath('/admin/' + category);
        return { success: true };
    } catch (error) {
        console.error(`Failed to save ${category}:`, error);
        return { success: false, error: String(error) };
    }
}

export async function importCertificatesExcelAction(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const records = data.map((item: any) => ({
            id: Math.random().toString(36).substring(2, 11),
            student_name: item.student_name || 'Unknown',
            la_number: item.la_number || '',
            university_id: item.university_id || '',
            issue_date: item.issue_date || new Date().toISOString().split('T')[0],
            course_title: item.course_title || 'General Course',
            certificate_url: item.certificate_url || ''
        }));

        // Batch insert for performance
        for (const record of records) {
            await db.execute({
                sql: 'INSERT INTO student_records (id, student_name, la_number, university_id, issue_date, course_title, certificate_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
                args: [record.id, record.student_name, record.la_number, record.university_id, record.issue_date, record.course_title, record.certificate_url]
            });
        }

        revalidatePath('/admin/certificates');
        return { success: true, count: records.length };
    } catch (error) {
        console.error('Excel Import failed:', error);
        return { success: false, error: String(error) };
    }
}

export async function importCertificatesCSVAction(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        const text = await file.text();
        const lines = text.split('\n');
        const headers = lines[0].split(',');

        const records = lines.slice(1).filter(line => line.trim()).map(line => {
            const values = line.split(',').map(v => v.replace(/^"|"$/g, '').trim());
            const record: any = {};
            headers.forEach((header, i) => {
                record[header.trim()] = values[i];
            });
            return {
                id: Math.random().toString(36).substring(2, 11),
                student_name: record.student_name || 'Unknown',
                la_number: record.la_number || '',
                university_id: record.university_id || '',
                issue_date: record.issue_date || new Date().toISOString().split('T')[0],
                course_title: record.course_title || 'General Course',
                certificate_url: record.certificate_url || ''
            };
        });

        for (const record of records) {
            await db.execute({
                sql: 'INSERT INTO student_records (id, student_name, la_number, university_id, issue_date, course_title, certificate_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
                args: [record.id, record.student_name, record.la_number, record.university_id, record.issue_date, record.course_title, record.certificate_url]
            });
        }

        revalidatePath('/admin/certificates');
        return { success: true, count: records.length };
    } catch (error) {
        console.error('CSV Import failed:', error);
        return { success: false, error: String(error) };
    }
}
