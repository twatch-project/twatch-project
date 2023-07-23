// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// async function main() {
//   await prisma.user.create({
//     data: {
//       username: "abv88",
//       password: "111",
//       role: "CUSTOMER",
//       email: "EE@Hotmail.com",
//     },
//   });

//   await prisma.feed.create({
//     data: {
//       name: "isado",
//       mets: ["MINIMALMODERN", "CONTEMPORARYMODERN"],
//     },
//   });

//   const asw = await prisma.feed.findMany({
//     where: {
//       id: 1,
//     },
//   });
//   console.log(asw);
//   // await prisma.feed.create({
//   //   data: {
//   //     title: "Some thing",
//   //     mags: {
//   //       create: [
//   //         {
//   //           mag: { create: { name: "MINIMALMODERN" } },
//   //         },
//   //       ],
//   //     },
//   //   },
//   // });
//   // await prisma.ueed.create({
//   //   data: {
//   //     title: "Types of relations",
//   //     mags: {
//   //       create: [{ name: "MINIMALMODERN" }, { name: "CONTEMPORARYMODERN" }],
//   //     },
//   //   },
//   // });
//   // const dateOfBirth = new Date(1982, 0, 2);
//   // const createCus = await prisma.customer.create({
//   //     data: {
//   //         firstname: "Thu",
//   //         lastname: "Hear",
//   //         gender: "MALE",
//   //         dateOfBirth: dateOfBirth,
//   //         citizenId: "12345678912554",
//   //         province: "Conburi",
//   //         district: "Ioszl",
//   //         sub_district: "556",
//   //         address: "dsdqwe",
//   //         contact: "line cosa",
//   //         userId: "4179314d-d861-48e1-8828-b14cbef57c43",
//   //     },
//   // });
//   // await prisma.user.deleteMany({});
//   // await prisma.customer.deleteMany({});
//   // await prisma.blog.deleteMany({});

//   const findAll = await prisma.customer.findMany({});
//   // console.log(createise);
//   // console.log(dateOfBirth);
//   // console.table(createCus);
//   console.table(findAll);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
