import { useEffect, useRef, useState } from 'react';

interface NavigationItem {
  label: string;
  href?: string;
  children?: NavigationItem[];
}

export function useKeyboardNavigation(items: NavigationItem[]) {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev + 1;
            return next >= items.length ? 0 : next;
          });
          break;

        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev - 1;
            return next < 0 ? items.length - 1 : next;
          });
          break;

        case 'ArrowRight':
          e.preventDefault();
          if (focusedIndex >= 0 && items[focusedIndex].children) {
            setExpandedItems(prev => new Set(prev).add(items[focusedIndex].label));
          }
          break;

        case 'ArrowLeft':
          e.preventDefault();
          if (focusedIndex >= 0 && items[focusedIndex].children) {
            setExpandedItems(prev => {
              const newSet = new Set(prev);
              newSet.delete(items[focusedIndex].label);
              return newSet;
            });
          }
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0) {
            const item = items[focusedIndex];
            if (item.children) {
              setExpandedItems(prev => {
                const newSet = new Set(prev);
                if (newSet.has(item.label)) {
                  newSet.delete(item.label);
                } else {
                  newSet.add(item.label);
                }
                return newSet;
              });
            } else if (item.href) {
              window.location.href = item.href;
            }
          }
          break;

        case 'Escape':
          e.preventDefault();
          setFocusedIndex(-1);
          setExpandedItems(new Set());
          break;

        case 'Tab':
          // Allow default tab behavior
          break;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      return () => container.removeEventListener('keydown', handleKeyDown);
    }
  }, [items, focusedIndex]);

  const focusItem = (index: number) => {
    setFocusedIndex(index);
  };

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const clearFocus = () => {
    setFocusedIndex(-1);
  };

  return {
    focusedIndex,
    expandedItems,
    containerRef,
    focusItem,
    toggleExpanded,
    clearFocus,
    isExpanded: (label: string) => expandedItems.has(label),
    isFocused: (index: number) => focusedIndex === index,
  };
}

// Mega menu keyboard navigation
export function useMegaMenuKeyboard() {
  const [focusedColumn, setFocusedColumn] = useState<number>(0);
  const [focusedItem, setFocusedItem] = useState<{ column: number; row: number } | null>(null);

  const handleMegaKeyDown = (e: KeyboardEvent, columns: any[][]) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (focusedItem) {
          const currentColumn = columns[focusedItem.column];
          const nextRow = focusedItem.row + 1;
          if (nextRow < currentColumn.length) {
            setFocusedItem({ column: focusedItem.column, row: nextRow });
          }
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (focusedItem) {
          const prevRow = focusedItem.row - 1;
          if (prevRow >= 0) {
            setFocusedItem({ column: focusedItem.column, row: prevRow });
          }
        }
        break;

      case 'ArrowRight':
        e.preventDefault();
        const nextColumn = focusedColumn + 1;
        if (nextColumn < columns.length) {
          setFocusedColumn(nextColumn);
          setFocusedItem({ column: nextColumn, row: 0 });
        }
        break;

      case 'ArrowLeft':
        e.preventDefault();
        const prevColumn = focusedColumn - 1;
        if (prevColumn >= 0) {
          setFocusedColumn(prevColumn);
          setFocusedItem({ column: prevColumn, row: 0 });
        }
        break;

      case 'Home':
        e.preventDefault();
        setFocusedItem({ column: 0, row: 0 });
        setFocusedColumn(0);
        break;

      case 'End':
        e.preventDefault();
        const lastColumn = columns.length - 1;
        const lastRow = columns[lastColumn].length - 1;
        setFocusedItem({ column: lastColumn, row: lastRow });
        setFocusedColumn(lastColumn);
        break;

      case 'Enter':
        e.preventDefault();
        if (focusedItem) {
          const item = columns[focusedItem.column][focusedItem.row];
          if (item.href) {
            window.location.href = item.href;
          }
        }
        break;

      case 'Escape':
        e.preventDefault();
        setFocusedItem(null);
        setFocusedColumn(0);
        break;
    }
  };

  return {
    focusedColumn,
    focusedItem,
    setFocusedColumn,
    setFocusedItem,
    handleMegaKeyDown,
  };
}
