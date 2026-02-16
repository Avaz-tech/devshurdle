## 📁 Project Folder Structure

```
devs-hurdle/
├── app/
│   ├── (admin)/
│   │   └── studio/
│   │       ├── [[...index]]/
│   │       │   └── page.tsx
│   │       └── layout.tsx
│   ├── (user)/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── post/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── signIn/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   └── send/
│   │       └── route.ts
│   ├── Context/
│   │   └── SearchContext.tsx
│   └── styles/
│       ├── globals.css
│       └── login.css
├── components/
│   ├── AntdThemeProvider.tsx
│   ├── BlogContent.tsx
│   ├── ComingSoon.tsx
│   ├── Container.tsx
│   ├── EmailTemplate.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HighlightCode.tsx
│   ├── Logo.tsx
│   ├── ModeToggle.tsx
│   ├── Navbar.tsx
│   ├── RichText.tsx
│   ├── SearchBox.tsx
│   ├── SearchPanel.tsx
│   ├── StudioNavbar.tsx
│   ├── theme-provider.tsx
│   └── ui/
│       ├── button.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── textarea.tsx
│       ├── toggle-group.tsx
│       └── toggle.tsx
├── lib/
│   ├── client.ts
│   ├── image.ts
│   ├── prisma.ts
│   ├── utils.ts
│   └── validation.ts
├── public/
│   └── assets/
│       ├── fonts/
│       │   ├── cascadia-code/
│       │   └── ginto/
│       ├── icons/
│       └── images/
├── sanity/
│   ├── env.ts
│   ├── schema.ts
│   └── lib/
│       ├── client.ts
│       └── image.ts
├── sanity/
│   └── schemas/
│       ├── author.ts
│       ├── blockContent.ts
│       ├── category.ts
│       └── post.ts
├── ARCHITECTURE_IMPROVEMENTS.md
├── components.json
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── sanity.cli.ts
├── sanity.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── types.ts
```

---

## 🏗️ Architecture & Code Quality

### ✅ **Strengths**

1. **Smart Route Grouping with (user) and (admin)**

   - Clean separation of concerns using Next.js route groups
   - User-facing and admin panels are logically isolated
   - Easy to manage authentication and different layouts

2. **Shadcn/UI Component Library**

   - Good reuse of UI components (button, form, input, textarea, etc.)
   - Consistent styling and props across the app
   - Well-organized in `ui/` subdirectory

3. **Context API for State Management**

   - SearchContext properly centralizes search/filter logic
   - Efficient for prop-drilling prevention
   - Used in SearchPanel and BlogContent

4. **Server-Side Data Fetching (Sanity CMS)**
   - Blog pages use async components and direct Sanity fetching
   - Reduces client-side bundle size
   - Good performance optimization


````

---

![home page](images/devshurdle_lading_img.png)

## Live at: -> https://devshurdle.vercel.app/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
