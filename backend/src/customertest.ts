import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
    // const createise = await prisma.user.create({
    //     data: {
    //         username: "abv88",
    //         password: "111",
    //         role: "CUSTOMER",
    //         email: "EE@Hotmail.com",
    //     },
    // });
    // const dateOfBirth = new Date(1982, 0, 2);
    // const createCus = await prisma.customer.create({
    //     data: {
    //         firstname: "Thu",
    //         lastname: "Hear",
    //         gender: "MALE",
    //         dateOfBirth: dateOfBirth,
    //         citizenId: "12345678912554",
    //         province: "Conburi",
    //         district: "Ioszl",
    //         sub_district: "556",
    //         address: "dsdqwe",
    //         contact: "line cosa",
    //         userId: "4179314d-d861-48e1-8828-b14cbef57c43",
    //     },
    // });

    const findAll = await prisma.customer.findMany({});
    // console.log(createise);
    // console.log(dateOfBirth);
    // console.table(createCus);
    console.table(findAll);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
