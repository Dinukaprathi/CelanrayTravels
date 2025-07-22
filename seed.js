const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.admin.upsert({
    where: { id: 'admin-1' },
    update: {
      email: 'dinuka@gmail.com',
      password: 'Dinuka@123',
      name: 'Dinuka',
      updatedAt: new Date(),
    },
    create: {
      id: 'admin-1',
      email: 'dinuka@gmail.com',
      password: 'Dinuka@123',
      name: 'Dinuka',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  console.log('Admin upserted:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 