# Email Kabilio
Email client powered by Remix and Prisma.

- 📖 [Remix docs](https://remix.run/docs)
- 📖 [Prisma docs](https://www.prisma.io/docs)

## Prerequisites

Install [Node](https://nodejs.org/) if it is not installed. (v22.9.0)

Create a [Prisma](https://www.prisma.io/) account if you don't have one.

## Install

Install Dependencies:
```shellscript
npm i
```

Initialize Prisma in your project and authenticate:
```shellscript
npx prisma init --db --output ../app/generated/prisma
```

Create a .env file in the project root like the example in .env.template and paste the connection string obtained in the previous step DATABASE_URL=
```shellscript
DATABASE_URL="prisma+postgres://..."
```

Create the database tables and generate the Prisma Client:
```shellscript
npx prisma migrate dev --name init
```

Add some seed data to populate the database:
```shellscript
npx prisma db seed
```

Open Prisma Studio to inspect your data:
```shellscript
npx prisma studio
```

## Run project
```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

