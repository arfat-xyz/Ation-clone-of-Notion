### Personal portfolio
[Arfatur Rahman](https://www.arfat.app/)
# NextJS Notion Clone

This project is a feature-rich Notion clone built using NextJS 14 with App Routes. It incorporates various cutting-edge technologies and libraries to provide a seamless user experience.

## Key Features

- **Convex Database**: Empower your application with Convex for efficient and scalable database management.
  
- **Clerk User Management**: Leverage Clerk for robust user authentication and management, ensuring a secure and seamless login experience for your users.

- **Edge Store for Image Management**: Store and retrieve images efficiently using Edge Store, enhancing the performance of image-related operations.

- **Tailwind CSS Framework**: Create a stunning and responsive user interface with the help of Tailwind CSS, a highly customizable CSS framework.

- **Shadcn for Reusable UI Components**: Boost development productivity with Shadcn, a library of reusable UI components that maintain consistency and aesthetic appeal throughout your application.

- **Use Blocknote Core & React**: Implement Notion-style page editing functionality seamlessly with Use Blocknote Core & React, enhancing the user's ability to create and organize content effortlessly.

- **Next Themes for Dark and Light Mode**: Provide users with a personalized experience by incorporating Next Themes for dynamic switching between dark and light modes.

- **Emoji-picker-react**: Enhance user interactions by integrating emoji-picker-react, allowing users to easily select and add emojis to their content.

# Installation

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/arfat-xyz/Ation-clone-of-Notion.git
```
### Go to Ation-clone-of-Notion

```shell
 cd Ation-clone-of-Notion/
 ```

### Install packages

```shell
yarn install
```

### Setup .env file


```js
# ./.env.local
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=
```

### To get upper keys & url visit
-  [Clerk](https://clerk.com/docs/quickstarts/setup-clerk)
-  [Convex](https://docs.convex.dev/quickstart/nextjs)
-  [Edge store](https://edgestore.dev/docs/quick-start)

### Setup Convex

```shell
npx convex dev

```

### Start the app

```shell
npm run dev
```

### Deployment
- [Deploy](https://docs.convex.dev/production/hosting/)