import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Gonzalo Petraglia",
    accounts: {
      create: [
        {
          email: "gonzalo.petraglia@gmail.com",
          emails: {
            create: [
              {
                name: "Elliot Latil",
                from: "elliot.latil@gmail.com",
                subject: "Meeting Tomorrow",
                text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, Gon",
                labels: ["meeting"]
              },
              {
                name: "Diego Bruno",
                from: "diego.bruno@test.com",
                subject: "Re: Project Update",
                text: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these during our next meeting. Keep up the excellent work!\n\nBest regards, Gon",
                labels: ["work", "important"]
              },
              {
                name: "Marcos Gomez",
                from: "marcos.gomez@hotmail.com",
                subject: "Re: Meeting Tomorrow",
                text: "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources.\n\nI've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.\n\nI've attached a detailed analysis for your reference. Let's discuss this further in our next meeting.\n\nThanks, Gon",
                labels: ["work", "meeting"]
              },
              {
                name: "Martin Garcia",
                from: "martin.garcia@gmail.com",
                subject: "New Project",
                text: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these during our next meeting. Keep up the excellent work!\n\nBest regards, Gon",
                labels: ["work", "important"]
              },
              {
                name: "Lourdes Lopez",
                from: "lourdes.lopez@hotmail.com",
                subject: "Re: Meeting",
                text: "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources.\n\nI've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.\n\nI've attached a detailed analysis for your reference. Let's discuss this further in our next meeting.\n\nThanks, Gon",
                labels: ["work", "meeting"]
              }
            ]
          }
        },
        {
          email: "gon@hotmail.com",
          emails: {
            create: [
              {
                name: "Felipe Martinez",
                from: "felipe.martinez@test.com",
                subject: "New Budget",
                text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, Gon",
                labels: ["meeting"]
              },
              {
                name: "Maria Martinez",
                from: "maria.martinez@gmail.com",
                subject: "Re: New Budget",
                text: "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources.\n\nI've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.\n\nI've attached a detailed analysis for your reference. Let's discuss this further in our next meeting.\n\nThanks, Gon",
                labels: ["work", "important"]
              },
              {
                name: "Laura Perez",
                from: "laura.perez@hotmail.com",
                subject: "New Project",
                text: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these during our next meeting. Keep up the excellent work!\n\nBest regards, Gon",
                labels: ["work", "meeting"]
              }
            ]
          }
        }
      ]
    }
  }
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
