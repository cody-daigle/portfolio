import { PrismaClient, SkillCategory } from '@prisma/client';

const prisma = new PrismaClient();

// NOTE: This is placeholder content. Replace it with your real projects,
// skills, and work history before deploying.
async function main() {
  await prisma.contactMessage.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.project.deleteMany();

  await prisma.project.createMany({
    data: [
      {
        title: 'mkdev',
        slug: 'mkdev',
        summary: 'Centralized developer social instance',
        description:
          'Developer social platform that pulls in Dev.to and Medium blogs, with Google and email login on an Express + TypeScript backend.',
        techStack: [
          'React',
          'TypeScript',
          'Express',
          'PostgreSQL',
          'Prisma',
          'Material UI',
          'Passport',
          'Socket.IO',
          'AWS',
        ],
        githubUrl: 'https://github.com/cody-daigle/mkdev',
        liveUrl: null,
        imageUrl: null,
        featured: true,
        sortOrder: 1,
      },
      {
        title: 'This Portfolio',
        slug: 'fullstack-portfolio',
        summary:
          "The site you're looking at — React, Express, and Postgres; leveraging AI -> Claude by Anthropic.",
        description:
          'A fullstack portfolio built to demonstrate engineering practices rather than just list them: typed client and server, a real relational schema with migrations, request validation, rate limiting, automated tests on both sides, and a CI pipeline that runs them on every push.',
        techStack: [
          'React',
          'TypeScript',
          'Express',
          'Prisma',
          'PostgreSQL',
          'Vitest',
          'GitHub Actions',
        ],
        githubUrl: 'https://github.com/cody-daigle/portfolio',
        liveUrl: null,
        imageUrl: null,
        featured: true,
        sortOrder: 2,
      },
      {
        title: 'API Rate Limiter Library',
        slug: 'api-rate-limiter-library',
        summary:
          'A small, dependency-light sliding-window rate limiter for Node APIs.',
        description:
          'Extracted a rate-limiting utility used across three internal services into a standalone, published package with a sliding-window algorithm, pluggable storage (in-memory or Redis), and 100% branch coverage.',
        techStack: ['TypeScript', 'Node.js', 'Redis'],
        githubUrl: 'https://github.com/your-handle/api-rate-limiter',
        liveUrl: null,
        imageUrl: null,
        featured: false,
        sortOrder: 3,
      },
    ],
  });

  await prisma.skill.createMany({
    data: [
      {
        name: 'TypeScript',
        category: SkillCategory.LANGUAGE,
        proficiency: 5,
        sortOrder: 1,
      },
      {
        name: 'JavaScript',
        category: SkillCategory.LANGUAGE,
        proficiency: 5,
        sortOrder: 2,
      },
      {
        name: 'SQL',
        category: SkillCategory.LANGUAGE,
        proficiency: 4,
        sortOrder: 3,
      },
      {
        name: 'Python',
        category: SkillCategory.LANGUAGE,
        proficiency: 3,
        sortOrder: 4,
      },

      {
        name: 'React',
        category: SkillCategory.FRONTEND,
        proficiency: 5,
        sortOrder: 1,
      },
      {
        name: 'Next.js',
        category: SkillCategory.FRONTEND,
        proficiency: 4,
        sortOrder: 2,
      },
      {
        name: 'Tailwind CSS',
        category: SkillCategory.FRONTEND,
        proficiency: 3,
        sortOrder: 3,
      },

      {
        name: 'Node.js / Express',
        category: SkillCategory.BACKEND,
        proficiency: 5,
        sortOrder: 1,
      },
      {
        name: 'REST API design',
        category: SkillCategory.BACKEND,
        proficiency: 4,
        sortOrder: 2,
      },
      {
        name: 'Authentication & authorization',
        category: SkillCategory.BACKEND,
        proficiency: 5,
        sortOrder: 3,
      },

      {
        name: 'PostgreSQL',
        category: SkillCategory.DATABASE,
        proficiency: 4,
        sortOrder: 1,
      },
      {
        name: 'Prisma',
        category: SkillCategory.DATABASE,
        proficiency: 4,
        sortOrder: 2,
      },
      {
        name: 'Redis',
        category: SkillCategory.DATABASE,
        proficiency: 3,
        sortOrder: 3,
      },

      {
        name: 'Docker',
        category: SkillCategory.DEVOPS,
        proficiency: 4,
        sortOrder: 1,
      },
      {
        name: 'GitHub Actions / CI',
        category: SkillCategory.DEVOPS,
        proficiency: 4,
        sortOrder: 2,
      },
      {
        name: 'AWS',
        category: SkillCategory.DEVOPS,
        proficiency: 3,
        sortOrder: 3,
      },

      {
        name: 'Vitest / Jest',
        category: SkillCategory.TOOLING,
        proficiency: 3,
        sortOrder: 1,
      },
      {
        name: 'Git',
        category: SkillCategory.TOOLING,
        proficiency: 5,
        sortOrder: 2,
      },
    ],
  });

  await prisma.experience.createMany({
    data: [
      {
        company: 'United States Marine Corps',
        role: 'Aviation Structures Technician Level 3',
        location: 'Huntsville, AL',
        startDate: new Date('2010-10-18'),
        endDate: new Date('2015-10-18'),
        description: [
          'Aircraft maintenance supervisor for Night Crew work center overseeing maintenance on 12 MV-22 Osprey aircraft. Receiving various accolades for expedited aircraft maintenance efficiency',
          'Phase coordinator and Naval program manager with experience in aviation safety, hazmat handling, dispersed naval aviation publications, quality assurance and personnel training programs.',
        ],
        sortOrder: 1,
      },
      {
        company: 'Yulista Integrated Services',
        role: 'Aviation Team Lead',
        location: 'Huntsville, AL',
        startDate: new Date('2019-05-19'),
        endDate: new Date('2022-9-16'),
        description: [
          'Led a team in executing complex aircraft maintenance operations, showcasing strong leadership and project management skills.',
          'Utilized problem-solving abilities to address technical issues and ensure operational efficiency, while maintaining a cohesive team and prioritizing the well-being of each team member',
        ],
        sortOrder: 2,
      },
    ],
  });

  console.log('Seed complete.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
