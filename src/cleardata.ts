import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearData() {
  try {
    // Deleting from the tables with no dependencies first
    await prisma.application.deleteMany({});
    await prisma.jobSkill.deleteMany({});
    await prisma.candidateSkill.deleteMany({});
    await prisma.experience.deleteMany({});

    // Deleting from Job table before Address and Recruiter due to foreign key constraints
    await prisma.job.deleteMany({});

    // Deleting from Address table before Company due to foreign key constraints
    await prisma.address.deleteMany({});

    // Deleting from Company table
    await prisma.company.deleteMany({});

    // Deleting from Candidate and Recruiter before User due to foreign key constraints
    await prisma.candidate.deleteMany({});
    await prisma.recruiter.deleteMany({});

    // Deleting from User table
    await prisma.user.deleteMany({});

    // Deleting from Skill table
    await prisma.skill.deleteMany({});
  } catch (error) {
    console.error('Error clearing data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearData()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
