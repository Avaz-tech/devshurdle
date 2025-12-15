## 📁 Project Folder Structure

```
devs-hurdle/
├── app/
│   ├── (admin)/
│   │   └── studio/
│   │       └── [[...index]]/page.tsx
│   │       └── layout.tsx
│   ├── (user)/
│   │   ├── about/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── post/[slug]/page.tsx
│   │   └── signIn/page.tsx
│   ├── Context/SearchContext.tsx
│   ├── api/send/route.ts
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
```

---

## 🏗️ Architecture & Code Quality Analysis

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

---

### ⚠️ **Critical Issues & Improvements Needed**

#### 1. **Type Safety Issues**

**Problem:**

```tsx
// In SearchContext.tsx
filteredItems: any[]    // ❌ Too generic
originalItems: any[]    // ❌ Too generic

// In SearchPanel.tsx
const filteredP = originalItems.filter((_post: Post) => {  // ❌ Loosely typed
  return _post.categories?.some((category) =>
```

**Impact:** Loss of type safety, potential runtime errors

**Solution:**

```tsx
// Define proper types
interface SearchContextValue {
  query: string;
  setQuery: (query: string) => void;
  filteredItems: Post[]; // ✅ Use Post type
  setFilteredItems: (items: Post[]) => void;
  originalItems: Post[];
}
```

#### 2. **Code Duplication - Search & Filter Logic Split**

**Problem:**

- `SearchContext` handles text search (`query.toLowerCase().includes()`)
- `SearchPanel` handles category filtering (separate logic)
- Two different filtering mechanisms in one feature

**Impact:** Confusing UX, maintenance nightmare

**Solution - Combine into Single Search Context:**

```tsx
interface SearchFilters {
  query: string;
  categories: string[];
}

interface SearchContextValue {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  filteredItems: Post[];
}
```

#### 3. **Hardcoded Filter Options**

**Problem:**

```tsx
// In SearchPanel.tsx - hardcoded options
const filterOptions = [
  { label: "Browser", value: "browser" },
  { label: "Design", value: "design" },
  // ... etc
];
```

**Impact:**

- Not flexible for adding new categories
- Doesn't match actual post categories from Sanity
- Maintenance burden

**Solution:** Derive from actual posts:

```tsx
const categories = [...new Set(originalItems.flatMap((post) => post.categories?.map((c) => c.title) || []))].map(
  (title) => ({ label: title, value: title.toLowerCase() }),
);
```

#### 4. **Missing Error Boundaries**

**Problem:** No error boundaries in components

- If SearchContext provider data fails, entire page crashes
- BlogContent map could fail silently

**Solution:** Add error boundaries:

```tsx
import { ReactNode } from "react";

export function ErrorBoundary({ children }: { children: ReactNode }) {
  return <ErrorFallback>{children}</ErrorFallback>;
}
```

#### 5. **Inefficient Hook Usage - Over-Rendering**

**Problem in SearchPanel:**

```tsx
const { setFilteredItems, originalItems } = useSearchContext();
const [activeFilters, setActiveFilters] = useState<string[]>([]);

useEffect(() => {
  // Runs every time activeFilters or originalItems changes
  // But doesn't track query from SearchContext
}, [activeFilters, originalItems, setFilteredItems]);
```

**Impact:**

- When text search happens, category filters reset
- Two independent filtering systems collide
- Poor UX: selecting filters clears search results

**Solution:** Merge search + filter logic

#### 6. **No Input Sanitization in API Route**

**Problem:**

```tsx
// app/api/send/route.ts
const { name, email, subject, message } = body;
// No validation of content
```

**Risk:** XSS or injection attacks via email template

**Solution:**

```tsx
import DOMPurify from "isomorphic-dompurify";

const sanitize = (input: string) => DOMPurify.sanitize(input);
const safeMessage = sanitize(message);
```

---

### 🔴 **High Priority Issues**

| Issue                        | Severity    | Impact                  | Location                    |
| ---------------------------- | ----------- | ----------------------- | --------------------------- |
| Mixed search/filter contexts | 🔴 Critical | Broken search+filter UX | SearchContext + SearchPanel |
| `any` type usage             | 🔴 Critical | Type safety loss        | SearchContext, BlogContent  |
| No validation on form inputs | 🔴 Critical | Security risk           | API route                   |
| Hardcoded categories         | 🟠 High     | Not scalable            | SearchPanel                 |
| No error boundaries          | 🟠 High     | App crashes on errors   | Component tree              |
| Duplicate filter logic       | 🟠 High     | Maintenance burden      | Search/Filter features      |

---

### 📊 **Component Reusability Score**

| Component                           | Reuse Score | Notes                                  |
| ----------------------------------- | ----------- | -------------------------------------- |
| UI components (button, input, etc.) | ⭐⭐⭐⭐⭐  | Excellent - used everywhere            |
| SearchBox                           | ⭐⭐⭐      | Used in Home + Blog, but simple        |
| BlogContent                         | ⭐⭐        | Only on blog pages, could extract card |
| Container                           | ⭐⭐⭐⭐    | Excellent wrapper component            |
| Navbar                              | ⭐⭐⭐⭐    | Used in layout, good                   |
| AntdThemeProvider                   | ⭐⭐        | Installed but unclear usage            |

**Missing Reusable Components:**

- Post card (BlogContent.tsx has inline card logic)
- Filter toggle group
- Form field wrapper with validation
- Loading skeleton

---

### 🎯 **Recommended Refactoring Priority**

1. **Immediate (Week 1):**

   - ✅ Fix type safety (`any` → proper types)
   - ✅ Merge search + filter into single context
   - ✅ Add input validation in API route

2. **Important (Week 2):**

   - ✅ Extract post card into reusable component
   - ✅ Create utilities folder for helper functions
   - ✅ Add error boundaries

3. **Nice-to-Have (Week 3):**
   - ✅ Extract filter options from actual data
   - ✅ Add loading states with skeletons
   - ✅ Create custom hooks (useFilters, useSearch)

---

### 📁 **Suggested Folder Restructure**

```
├── components/
│   ├── ui/                 # shadcn components
│   ├── common/             # Navbar, Footer, etc.
│   ├── features/           # SearchPanel, BlogContent
│   ├── cards/              # PostCard (new)
│   └── layouts/            # Layout wrappers
├── hooks/                  # Custom hooks
│   ├── useSearch.ts        # New
│   └── useFilters.ts       # New
├── lib/
│   ├── utils.ts            # Existing
│   ├── validation.ts       # New - form validation
│   └── sanitize.ts         # New - HTML sanitization
├── context/                # Move from app/Context
│   └── SearchContext.tsx
└── types/
    └── index.ts            # Move from types.ts
```

├── lib/
│ └── utils.ts
├── public/
│ └── assets/
│ ├── fonts/
│ │ ├── cascadia-code/CascadiaCode.ttf
│ │ ├── ginto/ABCGintoNormal-\*.otf
│ │ ├── meedori_bold.ttf
│ │ └── meedori_regular.ttf
│ ├── icons/
│ └── images/
│ ├── banner.jpg
│ ├── devshurdle_landing.png
│ ├── log.svg
│ ├── logo-no-background.svg
│ └── register.svg
├── sanity/
│ ├── env.ts
│ ├── lib/
│ │ ├── client.ts
│ │ └── image.ts
│ ├── schema.ts
│ └── schemas/
│ ├── author.ts
│ ├── blockContent.ts
│ ├── category.ts
│ └── post.ts
├── ...config and root files (package.json, tsconfig.json, etc.)

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
