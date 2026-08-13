'use client';

import { useState, useMemo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Inbox,
} from 'lucide-react';
import './Datatable.css';

/**
 * Small reusable pieces so consumers don't hand-roll inline styles
 * every time — used via `render` on a column definition, e.g.:
 *   { key: 'name', render: (v) => <DataTable.Avatar label={v} /> }
 */
function Avatar({ label = '', tone = 'primary' }) {
  const initial = String(label).trim().charAt(0).toUpperCase() || '?';
  return (
    <span className={`dt-avatar dt-avatar--${tone}`} aria-hidden="true">
      {initial}
    </span>
  );
}

function Badge({ children, tone = 'neutral' }) {
  return <span className={`dt-badge dt-badge--${tone}`}>{children}</span>;
}

/**
 * DataTable — fully dynamic, reusable data table.
 *
 * Reuse it anywhere by only changing `columns` + `data`:
 *
 * <DataTable
 *   title="Hospital Directory"
 *   columns={[
 *     { key: 'sno', label: 'S.No', sortable: false, width: '70px' },
 *     { key: 'name', label: 'Hospital Name', sortable: true },
 *     { key: 'city', label: 'City', sortable: true },
 *     { key: 'province', label: 'Province', sortable: true },
 *     { key: 'address', label: 'Address', sortable: false },
 *     {
 *       key: 'contact',
 *       label: 'Contact',
 *       sortable: false,
 *       render: (value) => <a href={`tel:${value}`}>{value}</a>,
 *     },
 *   ]}
 *   data={hospitals}
 *   rowKey="sno"
 * />
 *
 * Props:
 * - columns: [{ key, label, sortable?, width?, align?, render?(value, row) }]
 * - data: array of row objects
 * - rowKey: string field name (or function(row, index)) used as React key. Default: index.
 * - searchableKeys: array of column keys included in search. Default: every column key.
 * - entriesOptions: number[] shown in the "entries per page" select. Default: [10, 25, 50, 100]
 * - defaultEntries: number. Default: 10
 * - title: optional heading rendered top-left
 * - searchPlaceholder: string
 * - emptyMessage: string shown when a search returns nothing
 * - className: extra class on the outer wrapper
 */
export default function DataTable({
  columns = [],
  data = [],
  rowKey,
  searchableKeys,
  entriesOptions = [10, 25, 50, 100],
  defaultEntries = 10,
  title,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No matching records found',
  className = '',
}) {
  const uid = useId();
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(defaultEntries);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const effectiveSearchKeys = searchableKeys || columns.map((c) => c.key);

  const getValue = (row, key) => row?.[key];

  const resolveRowKey = (row, index) => {
    if (typeof rowKey === 'function') return rowKey(row, index);
    if (typeof rowKey === 'string' && row[rowKey] !== undefined) return row[rowKey];
    return index;
  };

  // ---- filter ----
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.trim().toLowerCase();
    return data.filter((row) =>
      effectiveSearchKeys.some((key) => {
        const val = getValue(row, key);
        return val !== null && val !== undefined && String(val).toLowerCase().includes(term);
      })
    );
  }, [data, searchTerm, effectiveSearchKeys]);

  // ---- sort ----
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return filteredData;
    const { key, direction } = sortConfig;
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = getValue(a, key);
      const bVal = getValue(b, key);
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      const aNum = Number(aVal);
      const bNum = Number(bVal);
      const bothNumeric = !Number.isNaN(aNum) && !Number.isNaN(bNum);

      const result = bothNumeric
        ? aNum - bNum
        : String(aVal).localeCompare(String(bVal), undefined, { sensitivity: 'base' });

      return direction === 'asc' ? result : -result;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  // ---- paginate ----
  const totalEntries = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = totalEntries === 0 ? 0 : (safePage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);
  const pageData = sortedData.slice(startIndex, endIndex);

  // ---- handlers ----
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSort = (col) => {
    if (!col.sortable) return;
    setSortConfig((prev) => {
      if (prev.key !== col.key) return { key: col.key, direction: 'asc' };
      if (prev.direction === 'asc') return { key: col.key, direction: 'desc' };
      if (prev.direction === 'desc') return { key: null, direction: null };
      return { key: col.key, direction: 'asc' };
    });
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const withDots = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= safePage - delta && i <= safePage + delta)) {
        range.push(i);
      }
    }
    let last = 0;
    for (const i of range) {
      if (last) {
        if (i - last === 2) withDots.push(last + 1);
        else if (i - last > 2) withDots.push('dots-' + i);
      }
      withDots.push(i);
      last = i;
    }
    return withDots;
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, transition: { duration: 0.12 } },
  };

  return (
    <div className={`dt-wrapper ${className}`}>
      {(title || true) && (
        <div className="dt-header">
          {title ? (
            <div className="dt-title-group">
              <h3 className="dt-title">{title}</h3>
              <span className="dt-count-badge">{totalEntries}</span>
            </div>
          ) : (
            <span />
          )}

<div className="dt-entries">
              <span className="dt-entries-label">Show</span>
              <div className="dt-select-wrapper">
                <select
                  className="dt-select"
                  value={entriesPerPage}
                  onChange={handleEntriesChange}
                  aria-label="Entries per page"
                >
                  {entriesOptions.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <ChevronDown className="dt-select-icon" size={16} strokeWidth={2.25} />
              </div>
              <span className="dt-entries-label">entries</span>
            </div>
            
          <div className="dt-controls">
            

            <div className="dt-search">
              <Search className="dt-search-icon" size={17} strokeWidth={2.25} />
              <input
                type="text"
                className="dt-search-input"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search table"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="dt-clear-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  aria-label="Clear search"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              )}
            </div>
            
          </div>
          
        </div>
      )}

      <div className="dt-table-container">
        <table className="dt-table">
          <thead>
            <tr>
              {columns.map((col) => {
                const isActive = sortConfig.key === col.key;
                return (
                  <th
                    key={col.key}
                    className={`dt-th ${col.sortable ? 'dt-th--sortable' : ''} ${
                      isActive ? 'dt-th--active' : ''
                    }`}
                    style={{ width: col.width, textAlign: col.align || 'left' }}
                    onClick={() => handleSort(col)}
                  >
                    <span className="dt-th-content">
                      {col.label}
                      {col.sortable && (
                        <span className="dt-sort-icon">
                          {isActive && sortConfig.direction === 'asc' && (
                            <ArrowUp size={14} strokeWidth={2.5} />
                          )}
                          {isActive && sortConfig.direction === 'desc' && (
                            <ArrowDown size={14} strokeWidth={2.5} />
                          )}
                          {!isActive && <ArrowUpDown size={13} strokeWidth={2.25} />}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            <AnimatePresence mode="popLayout" initial={false}>
              {pageData.length > 0 ? (
                pageData.map((row, i) => {
                  const key = resolveRowKey(row, startIndex + i);
                  return (
                    <motion.tr
                      key={`${uid}-${key}`}
                      layout
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ delay: i * 0.02 }}
                      className="dt-row"
                    >
                      {columns.map((col) => {
                        const value = getValue(row, col.key);
                        return (
                          <td
                            key={col.key}
                            className="dt-td"
                            data-label={col.label}
                            style={{ textAlign: col.align || 'left' }}
                          >
                            <span className="dt-td-value">
                              {col.render ? col.render(value, row) : value}
                            </span>
                          </td>
                        );
                      })}
                    </motion.tr>
                  );
                })
              ) : (
                <motion.tr
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td className="dt-empty" colSpan={columns.length}>
                    <div className="dt-empty-inner">
                      <Inbox size={34} strokeWidth={1.5} />
                      <p>{emptyMessage}</p>
                    </div>
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="dt-footer">
        <p className="dt-footer-info">
          {totalEntries === 0
            ? 'Showing 0 entries'
            : `Showing ${startIndex + 1} to ${endIndex} of ${totalEntries} entries`}
        </p>

        {totalPages > 1 && (
          <div className="dt-pagination">
            <button
              type="button"
              className="dt-page-btn dt-page-btn--nav"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            {getPageNumbers().map((p) =>
              typeof p === 'string' ? (
                <span key={p} className="dt-ellipsis">
                  &hellip;
                </span>
              ) : (
                <button
                  type="button"
                  key={p}
                  className={`dt-page-btn ${p === safePage ? 'dt-page-btn--active' : ''}`}
                  onClick={() => goToPage(p)}
                  aria-current={p === safePage ? 'page' : undefined}
                >
                  {p}
                </button>
              )
            )}

            <button
              type="button"
              className="dt-page-btn dt-page-btn--nav"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

DataTable.Avatar = Avatar;
DataTable.Badge = Badge;