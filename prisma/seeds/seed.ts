import { seedCultures } from "./cultures/seed.cultures";

async function main() {
  console.log('Iniciando o seed...');

  await seedCultures();

  console.log(' Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.log('Erro ao executar o seed:', e);
    process.exit(1);
  });
