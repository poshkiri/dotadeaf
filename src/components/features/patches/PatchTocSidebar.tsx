"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { PatchTocItem } from "./patchContentParser";

type PatchTocSidebarProps = {
  items: PatchTocItem[];
};

export function PatchTocSidebar({ items }: PatchTocSidebarProps) {
  const t = useTranslations();
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting && e.intersectionRatio > 0);
        if (visible.length === 0) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0].target.id;
        if (id) setActiveId(id);
      },
      {
        rootMargin: "-12% 0px -48% 0px",
        threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="patch-toc-sidebar" aria-label={t("patches.toc_aria")}>
      <p className="patch-toc-sidebar-title">{t("patches.contents_sidebar")}</p>
      <ul className="patch-toc-sidebar-list">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`patch-toc-link${active ? " patch-toc-link--active" : ""}`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
