export interface Project {
	title: string;
	description: string;
	tags: string[];
	status: string;
	source: string | null;
	url: string | null;
	year: number;
}

const PRAVIDEON_PROJECTS: Project[] = [
	{
		title: 'Elitecodo LMS',
		description: 'Comprehensive Learning Management System.',
		tags: ['Remix', 'React.js', 'TypeScript', 'AWS', 'MongoDB', 'Electron'],
		status: 'Finished',
		source: null,
		url: null,
		year: 2023
	},
	{
		title: 'E-Courts Metadata Parser',
		description: 'Automated parsing tool for legal metadata from the Supreme Court of India.',
		tags: ['Python', 'MySQL'],
		status: 'Finished',
		source: null,
		url: null,
		year: 2024
	},
	{
		title: 'Nirvanagni F.L.A.M.E',
		description: 'AI-driven autonomous fire detection and supression system.',
		tags: ['Python', 'Raspberry Pi', 'YOLO', 'Artificial Intelligence'],
		status: 'Ongoing',
		source: null,
		url: null,
		year: 2024
	},
	{
		title: 'GasProPlus',
		description: 'Comprehensive multi-tenant SaaS ERP/CRM for LPG gas agencies.',
		tags: ['Laravel', 'PHP', 'PostgreSQL', 'React', 'TypeScript'],
		status: 'Maintained',
		source: null,
		url: null,
		year: 2024
	},
	{
		title: 'Rangvarna',
		description: 'Color detection device for sample matching in paint industry.',
		tags: ['Raspberry Pi', 'IoT', 'Python'],
		status: 'Finished',
		source: null,
		url: null,
		year: 2024
	},
	{
		title: 'Vidhi pH Monitoring',
		description: 'Software application to communicate with pH monitoring hardware.',
		tags: ['Electron', 'Node.js', 'TypeScript', 'ARM', 'ESP32', 'Raspberry Pi', 'C', 'IoT'],
		status: 'Finished',
		source: null,
		url: null,
		year: 2025
	}
].sort((a, b) => b.year - a.year);

const RETRONAV_PROJECTS: Project[] = [
	{
		title: 'Thicket',
		description: 'A digital garden from markdown files.',
		tags: ['Svelte', 'Astro', 'TypeScript'],
		status: 'Finished',
		source: 'https://github.com/retronav/thicket',
		url: 'https://thicket-retronav.vercel.app/',
		year: 2022
	},
	{
		title: 'rehype-shiki',
		description: 'Syntax highlighting plugin for rehype.',
		tags: ['TypeScript'],
		status: 'Unmaintained',
		source: 'https://github.com/retronav/rehype-shiki',
		url: null,
		year: 2023
	},
	{
		title: 'Lilac',
		description: 'Indieweb-compatible site engine with micropub support for static websites.',
		tags: ['Python', 'Indieweb', 'SQLite'],
		status: 'WIP',
		source: 'https://github.com/retronav/lilac',
		url: null,
		year: 2024
	},
	{
		title: 'Auralis',
		description: 'Procedural music generation for every vibe.',
		tags: ['Rust'],
		status: 'TBD',
		source: null,
		url: null,
		year: 2024
	},
	{
		title: 'Bratify',
		description: 'BRAT album art generator.',
		tags: ['Svelte', 'TypeScript'],
		status: 'Maintained',
		source: 'https://github.com/retronav/bratify',
		url: 'https://bratify.vercel.app',
		year: 2024
	},
	{
		title: 'Ixora',
		description: 'An extension pack to make interactive markdown editors using CodeMirror 6.',
		tags: ['TypeScript', 'CodeMirror'],
		status: 'Maintained',
		source: 'https://github.com/retronav/ixora',
		url: 'https://ixora.karawale.com',
		year: 2023
	},
	{
		title: 'Rosette',
		description: 'Notion-as-a-CMS',
		tags: ['TypeScript', 'Notion API'],
		status: 'Maintained',
		source: 'https://github.com/retronav/rosette',
		url: null,
		year: 2025
	},
	{
		title: 'LoRaPWN',
		description:
			'Research project on LoRaWAN security. Includes a custom implementation of the LoRaWAN MAC Layer using ChaCha20-Poly1305. Also includes an auditing framework for detecting anamolous packets and device behaviours in LoRaWAN networks using ML and vector databases.',
		tags: ['Python', 'LoRaWAN', 'IoT', 'Rust', 'ML', 'STM32'],
		status: 'Finished',
		source: '',
		url: 'https://www.linkedin.com/posts/pranavkarawale_the-way-i-found-art-in-perfection-and-precision-activity-7411663616158113792-lL3K',
		year: 2025
	}
].sort((a, b) => b.year - a.year);

export const PROJECT_GROUPS = [
	{ id: 'group-pravideon', title: 'PRAVIDEON', projects: PRAVIDEON_PROJECTS },
	{ id: 'group-personal', title: 'RETRONAV', projects: RETRONAV_PROJECTS }
];
