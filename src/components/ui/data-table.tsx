"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Inbox,
} from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

interface FilterOption {
  label: string;
  value: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKey?: keyof T | ((row: T) => string);
  searchPlaceholder?: string;
  filterOptions?: {
    key: keyof T | ((row: T) => string);
    label: string;
    options: FilterOption[];
  };
  pageSize?: number;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (row: T) => void;
  actions?: (row: T) => React.ReactNode;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search records...",
  filterOptions,
  pageSize = 10,
  isLoading = false,
  emptyTitle = "No records found",
  emptyDescription = "There are currently no items matching your criteria.",
  onRowClick,
  actions,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Search & Filter
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Search check
      if (searchTerm && searchKey) {
        let val = "";
        if (typeof searchKey === "function") {
          val = searchKey(row);
        } else {
          val = String(row[searchKey] || "");
        }
        if (!val.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
      }

      // Dropdown filter check
      if (filterOptions && selectedFilter !== "all") {
        let filterVal = "";
        if (typeof filterOptions.key === "function") {
          filterVal = filterOptions.key(row);
        } else {
          filterVal = String(row[filterOptions.key] || "");
        }
        if (filterVal.toLowerCase() !== selectedFilter.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [data, searchTerm, searchKey, filterOptions, selectedFilter]);

  // 2. Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (valA === valB) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === "number" && typeof valB === "number") {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }

      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      if (strA < strB) return sortConfig.direction === "asc" ? -1 : 1;
      if (strA > strB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // 3. Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        return null;
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {searchKey && (
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white text-xs font-mono placeholder:text-text-muted focus:outline-none focus:border-red-primary/60 transition-colors"
            />
          </div>
        )}

        {filterOptions && (
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-text-muted" />
            <select
              value={selectedFilter}
              onChange={(e) => {
                setSelectedFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-primary/60"
            >
              <option value="all">All {filterOptions.label}</option>
              {filterOptions.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-14 rounded-2xl bg-surface-1/40 border border-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : paginatedData.length === 0 ? (
        /* Empty State */
        <div className="glass-card p-12 rounded-3xl border border-white/10 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-surface-2 border border-white/10 flex items-center justify-center mx-auto text-text-muted">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-white">{emptyTitle}</h3>
          <p className="text-xs text-text-muted max-w-sm mx-auto">{emptyDescription}</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 bg-surface-1/40 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-surface-1 text-[11px] font-mono uppercase text-text-muted">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => col.sortable && handleSort(col.key)}
                      className={`p-3.5 font-bold tracking-wider ${
                        col.sortable ? "cursor-pointer select-none hover:text-white" : ""
                      } ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"} ${col.className || ""}`}
                    >
                      <div
                        className={`inline-flex items-center gap-1.5 ${
                          col.align === "right" ? "justify-end" : col.align === "center" ? "justify-center" : ""
                        }`}
                      >
                        <span>{col.header}</span>
                        {col.sortable && (
                          <span className="text-text-muted">
                            {sortConfig?.key === col.key ? (
                              sortConfig.direction === "asc" ? (
                                <ChevronUp className="w-3.5 h-3.5 text-red-bright" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-red-bright" />
                              )
                            ) : (
                              <ChevronsUpDown className="w-3.5 h-3.5 opacity-40" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                  {actions && <th className="p-3.5 text-right font-bold tracking-wider">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {paginatedData.map((row, idx) => (
                  <tr
                    key={idx}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`transition-colors ${
                      onRowClick ? "cursor-pointer hover:bg-white/[0.03]" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`p-3.5 text-white/90 ${
                          col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                        } ${col.className || ""}`}
                      >
                        {col.render ? col.render(row) : String(row[col.key] ?? "")}
                      </td>
                    ))}
                    {actions && <td className="p-3.5 text-right">{actions(row)}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Collapse View */}
          <div className="md:hidden space-y-3">
            {paginatedData.map((row, idx) => (
              <div
                key={idx}
                onClick={() => onRowClick && onRowClick(row)}
                className="p-4 rounded-2xl bg-surface-1 border border-white/10 space-y-2.5"
              >
                {columns.map((col) => (
                  <div key={col.key} className="flex items-center justify-between text-xs">
                    <span className="text-text-muted font-mono text-[10px] uppercase">
                      {col.header}
                    </span>
                    <div className="text-right">
                      {col.render ? col.render(row) : String(row[col.key] ?? "")}
                    </div>
                  </div>
                ))}
                {actions && (
                  <div className="pt-2 border-t border-white/10 flex justify-end">
                    {actions(row)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between text-xs font-mono text-text-muted pt-2 px-1">
              <span>
                Showing {(currentPage - 1) * pageSize + 1}–
                {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg bg-surface-1 border border-white/10 text-white disabled:opacity-40 disabled:pointer-events-none hover:bg-surface-2"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 text-white font-bold">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg bg-surface-1 border border-white/10 text-white disabled:opacity-40 disabled:pointer-events-none hover:bg-surface-2"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
