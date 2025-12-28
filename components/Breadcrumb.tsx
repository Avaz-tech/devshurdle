"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  noBorder?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, noBorder = false }) => {
  return (
    <nav className={`flex items-center gap-2 text-sm mb-6 pt-4 ${noBorder ? '' : 'pb-4 border-b border-border'}`}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="text-muted-foreground hover:text-mainColor transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="text-muted-foreground">/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;

