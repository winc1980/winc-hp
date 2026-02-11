import React from 'react';
import { TableOfContentsItem } from '@/types/Blog';

interface TocProps {
  items: TableOfContentsItem[];
}

export const Toc: React.FC<TocProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="table-of-contents">
      <h2>目次</h2>
      <TocList items={items} />
    </nav>
  );
};

interface TocListProps {
  items: TableOfContentsItem[];
}

const TocList: React.FC<TocListProps> = ({ items }) => {
  return (
    <ul className={`toc-list`}>
      {items.map((item) => (
        <li key={item.id} className={`toc-level-${item.level}`}>
          <a href={`#heading-${item.id}`}>{item.title}</a>
          {item.children && item.children.length > 0 && (
            <TocList items={item.children} />
          )}
        </li>
      ))}
    </ul>
  );
};
