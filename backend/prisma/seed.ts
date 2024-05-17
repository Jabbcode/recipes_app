import prisma from ".";

const main = async () => {
  await prisma.unit.createMany({
    data: [
      { name: "Kilogramos", abbreviation: "Kg" },
      { name: "Litro", abbreviation: "L" },
      { name: "Unidad", abbreviation: "Unit" },
      { name: "Gramos", abbreviation: "g" },
      { name: "Mililitro", abbreviation: "mL" },
    ],
  });

  await prisma.ingredient.createMany({
    data: [{ name: "Arroz" }, { name: "Pasta" }],
  });

  await prisma.category.createMany({
    data: [{ name: "Desayuno" }, { name: "Almuerzo" }, { name: "Cena" }],
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
