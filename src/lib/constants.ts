// WARNING: This file is managed by the seeding system. 
// To update data, edit the JSON files in /src/lib/seeds/ and run: npm run seed

export const EVENTS = [
    {
        "id": 0,
        "day": "21",
        "month": "DEC",
        "year": "2025",
        "date": "2025-12-21",
        "type": "HEALING SESSION",
        "title": "Winter Solstice Healing",
        "subtitle": "Chandra Varmam & Deep Restoration",
        "location": "Digital Sanctuary (Live Stream)",
        "focus": "Lunar energy alignment and restorative pressure-point therapy for the winter transition.",
        "description": "A profound evening session harnessing the longest night's energy for deep restoration through Chandra Varmam techniques.",
        "wisdomSummary": "Participants experienced deep nervous system reset through lunar-aligned pressure point activation. Key insight: the 7 cranial Varmam points respond most powerfully during solstice energy windows.",
        "tag": "VIRTUAL · HEALING",
        "color": "#8B7355",
        "accent": "#B8A082",
        "image": "/event-healing.png",
        "number": "00",
        "placement": "left"
    },
    {
        "id": 1,
        "day": "21",
        "month": "MAR",
        "year": "2026",
        "date": "2026-03-21",
        "type": "PHYSICAL WORKSHOP",
        "title": "Spring Equinox Varma Intensive",
        "subtitle": "The Awakening of Prana",
        "location": "Digital Sanctuary (Live Stream) & Chennai Coastal Retreat",
        "focus": "Mastering the 12 vital points of the upper torso during the solar transition.",
        "description": "An outdoor dawn session focusing on \"Surya Varmam\" and mobility flow as the sun rises. Feel the ancient force awaken with the light.",
        "wisdomSummary": "",
        "tag": "OUTDOOR · DAWN",
        "color": "#D4AF37",
        "accent": "#F5E27A",
        "image": "/event-sunrise.png",
        "number": "01",
        "placement": "right"
    },
    {
        "id": 2,
        "day": "05",
        "month": "APR",
        "year": "2026",
        "date": "2026-04-05",
        "type": "VIRTUAL WEBINAR",
        "title": "Healing Touch Symposium",
        "subtitle": "Varma Vaidyam — The 108 Points",
        "location": "Global Livestream (4K Interactive)",
        "focus": "Self-healing techniques for stress, immunity, and nervous system regulation.",
        "description": "A deep-dive masterclass into the \"Varma Vaidyam\" healing side of the 108 vital points. Open to practitioners worldwide.",
        "wisdomSummary": "",
        "tag": "VIRTUAL · GLOBAL",
        "color": "#C9A96E",
        "accent": "#E8D5A3",
        "image": "/event-healing.png",
        "number": "02",
        "placement": "left"
    },
    {
        "id": 3,
        "day": "12",
        "month": "MAY",
        "year": "2026",
        "date": "2026-05-12",
        "type": "RESIDENTIAL RETREAT",
        "title": "The Warrior's Path",
        "subtitle": "Nokku Varmam & Weapon Defence",
        "location": "Ancient Temple Grounds / Mountain Sanctuary",
        "focus": "Advanced \"Nokku Varmam\" (Focus Art) and the weapon-defense syllabus of Varmakalai.",
        "description": "A 3-day immersive \"Gurukulam\" style stay for advanced practitioners. Surrender to the ancient lineage.",
        "wisdomSummary": "",
        "tag": "3-DAY IMMERSION",
        "color": "#B8860B",
        "accent": "#D4AF37",
        "image": "/event-warriors.png",
        "number": "03",
        "placement": "right"
    }
];

export const GURUS = [
    {
        "name": "V. Ramanan",
        "role": "Senior Mentor",
        "bio": "A 5th generation practitioner specialized in 'Nokku Varmam' (The Art of Focus). Dedicated to preserving ancient Tamil traditions.",
        "image": "/assets/guru_1.png"
    },
    {
        "name": "K. Shiva",
        "role": "Combat Head",
        "bio": "Transmitting a legacy of discipline, healing, and silent power through the most lethal Varma switches.",
        "image": "/assets/guru_2.png"
    },
    {
        "name": "M. Arul",
        "role": "Varmam Specialist",
        "bio": "Mastering the restorative side of the science, resetting the body's internal clock through point-stimulation.",
        "image": "/assets/guru_3.png"
    }
];

export const CLASSES = [
    {
        "id": "beginner-varma",
        "title": "Beginner Varma Foundations",
        "subtitle": "The 12 Vital Switches",
        "description": "Master the fundamental points of the upper body. Focus on self-defense application and daily vitality resets.",
        "duration": "12 Weeks",
        "schedule": "Tue & Thu | 6:30 PM",
        "level": "Entry Level",
        "image": "/assets/adimurai_practitioner.png",
        "color": "#D4AF37"
    },
    {
        "id": "advanced-healing",
        "title": "Advanced Varma Vaidyam",
        "subtitle": "The Science of Restoration",
        "description": "A deep dive into the healing side of Varmakalai. Learn to treat nervous system disorders and chronic pain.",
        "duration": "24 Weeks",
        "schedule": "Mon & Wed | 7:00 PM",
        "level": "Intermediate",
        "image": "/assets/guru_1.png",
        "color": "#FF2D55"
    },
    {
        "id": "weapons-mastery",
        "title": "Traditional Weapons Flow",
        "subtitle": "The Extension of Prana",
        "description": "Master the Silambam and short stick techniques integrated with Varma point targeting.",
        "duration": "16 Weeks",
        "schedule": "Sat | 8:00 AM",
        "level": "Advanced",
        "image": "/assets/mallakhamb_practitioner.png",
        "color": "#B8860B"
    }
];

export const CAMPS = [
    {
        "id": "mountain-immersion",
        "title": "Mountain Shadow Immersion",
        "location": "Western Ghats Sanctuary",
        "date": "August 15 - 20, 2026",
        "description": "5 days of silent practice, dawn Varma training, and nocturnal sensory awakening in the deep forest.",
        "tag": "RESIDENTIAL",
        "image": "/event-warriors.png",
        "color": "#8B7355"
    },
    {
        "id": "coastal-retreat",
        "title": "Coastal Flow Retreat",
        "location": "Kanyakumari Shores",
        "date": "November 10 - 15, 2026",
        "description": "Harnessing the water element to master fluid motion and restorative coastal healing practices.",
        "tag": "RETREAT",
        "image": "/event-sunrise.png",
        "color": "#D4AF37"
    }
];

export const CERTIFICATES = [
    {
        "id": "foundation-cert",
        "title": "Certified Varma Practitioner (CVP)",
        "description": "Recognition of mastery over the basic 108 points and their safety protocols.",
        "prerequisite": "Completion of 1-year basic syllabus",
        "duration": "Final Examination"
    },
    {
        "id": "healer-cert",
        "title": "Master Varma Healer (MVH)",
        "description": "Specialization in Varma Vaidyam and restorative neurological therapy.",
        "prerequisite": "CVP + 2 years clinical practice",
        "duration": "Thesis + Oral Defense"
    }
];

export const STUDENT_RECORDS = [
    {
        "id": "7aqrl2ven",
        "student_name": "John Doe",
        "la_number": "LA-1234",
        "university_id": "TPM440123",
        "issue_date": "20-01-2024",
        "course_title": "Varma Foundation",
        "certificate_url": "https://link-to-pdf.com"
    },
    {
        "id": "304tjhidv",
        "student_name": "reshanth",
        "la_number": "LA-8888",
        "university_id": "",
        "issue_date": "16-10-2023",
        "course_title": "Adimurai",
        "certificate_url": "/uploads/1772389131196-8899_copy.png"
    }
];

export const GALLERY_IMAGES = [
    {
        "id": "gal-1",
        "title": "Adimurai Dawn Practice",
        "category": "Training",
        "image": "/assets/adimurai_practitioner.png",
        "color": "#FFB100"
    },
    {
        "id": "gal-2",
        "title": "Traditional Weapons Flow",
        "category": "Syllabus",
        "image": "/assets/mallakhamb_practitioner.png",
        "color": "#FF2D55"
    },
    {
        "id": "gal-3",
        "title": "Nokku Varmam Focus",
        "category": "Legacy",
        "image": "/assets/guru_1.png",
        "color": "#B8860B"
    },
    {
        "id": "gal-4",
        "title": "Sacred Transmission",
        "category": "Gathering",
        "image": "/event-warriors.png",
        "color": "#D4AF37"
    },
    {
        "id": "gal-5",
        "title": "Coastal Healing",
        "category": "Transmission",
        "image": "/event-sunrise.png",
        "color": "#8B7355"
    },
    {
        "id": "gal-6",
        "title": "The 108 Points",
        "category": "Syllabus",
        "image": "/event-healing.png",
        "color": "#C9A96E"
    }
];
