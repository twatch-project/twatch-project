import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
    // const createise = await prisma.user.create({
    //     data: {
    //         username: "abc444",
    //         password: "111",
    //         role: "CUSTOMER",
    //         email: "EE@Hotmail.com",
    //     },
    // });

    const createCus = await prisma.customer.create({
        data: {
            firstname: "Thu",
            lastname: "Hear",
            gender: "MALE",
            dateOfBirth: "11/11/1975",
            citizenId: "1234567891234",
            province: "Conburi",
            district: "Ioszl",
            sub_district: "556",
            address: "dsdqwe",
            contact: "line cosa",
            userId: "8c6910a3-c031-40e2-86f2-df8de65b0d40",
        },
    });

    // console.log(createise);
    console.table(createCus);
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
