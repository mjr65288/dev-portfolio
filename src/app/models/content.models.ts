export interface SocialLink { label: string; url: string; icon?: string; }
export interface Skill { name: string; level?: 'beginner'|'intermediate'|'advanced'|'expert'; }
export interface Project { title: string; description: string; tags: string[]; repo?: string; demo?: string; image?: string; }
export interface ExperienceItem { company: string; role: string; start: string; end?: string; bullets: string[]; }
export interface About { headline: string; summary: string; }


export interface PortfolioContent {
name: string;
role: string;
location?: string;
socials: SocialLink[];
skills: Skill[];
projects: Project[];
experience: ExperienceItem[];
about: About;
}
