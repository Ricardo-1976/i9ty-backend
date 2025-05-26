import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCultures() {
  const cultures = ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açúcar'];

  for (const name of cultures) {
    await prisma.culture.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Cultures inserted successfully!');
}
