"use client";
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiArrowUp,
  FiArrowDown,
  FiList,
  FiGrid,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiX,
  FiMapPin,
  FiPhone,
  FiHash,
  FiGlobe,
  FiInfo,
  FiHome,
  FiActivity,
  FiCheckCircle,
  FiUser
} from 'react-icons/fi';
import './HospitalsList.css';
import { Hospital, Building2, FlaskConical, Microscope, Stethoscope, HeartPulse } from 'lucide-react';
import { FaCity, FaBuilding, FaFlask, FaUserMd, FaHospital, FaClinicMedical, FaVial, FaHeartbeat } from 'react-icons/fa';
import { BsFillGlobeAmericasFill, BsBuildingFillAdd, BsHospital } from 'react-icons/bs';

const HospitalsList = ({
  hospitals = [],
  title = "Hospitals List",
  id = "panel-hospitals-section",
  columns = [
    { key: 'sno', label: 'S.No', width: '60px', sortable: true, icon: 'hash', type: 'badge' },
    { key: 'name', label: 'Hospital Name', sortable: true, icon: 'hospital', type: 'text' },
    { key: 'city', label: 'City', width: '100px', sortable: true, icon: 'city', type: 'cityBadge' },
    { key: 'province', label: 'Province', width: '100px', sortable: true, icon: 'globe', type: 'text' },
    { key: 'address', label: 'Address', sortable: true, icon: 'map', type: 'text' },
    { key: 'contact', label: 'Contact', width: '180px', sortable: true, icon: 'phone', type: 'contact' }
  ],
  searchPlaceholder = "Search...",
  emptyMessage = "No records found",
  itemsPerPageOptions = [10, 20, 30, 50, 100]
}) => {

  const [viewMode, setViewMode] = useState('list');
  const [sortConfig, setSortConfig] = useState({ key: columns[0]?.key || 'sno', direction: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(itemsPerPageOptions[0] || 10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEntriesDropdown, setShowEntriesDropdown] = useState(false);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const entriesDropdownRef = useRef(null);
  const pageDropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (entriesDropdownRef.current && !entriesDropdownRef.current.contains(event.target)) {
        setShowEntriesDropdown(false);
      }
      if (pageDropdownRef.current && !pageDropdownRef.current.contains(event.target)) {
        setShowPageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset page on search or entries change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, entriesPerPage]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedItem]);

  // Update sort config if columns change
  useEffect(() => {
    if (columns.length > 0) {
      setSortConfig({ key: columns[0].key, direction: 'asc' });
    }
  }, [columns]);

  const handleSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  // Dynamic filter function
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return hospitals;
    const query = searchQuery.toLowerCase().trim();
    return hospitals.filter(item =>
      columns.some(column =>
        item[column.key] &&
        item[column.key].toString().toLowerCase().includes(query)
      )
    );
  }, [hospitals, searchQuery, columns]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === undefined || aValue === null) return 0;
      if (bValue === undefined || bValue === null) return 0;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aString = aValue.toString().toLowerCase();
      const bString = bValue.toString().toLowerCase();

      if (aString < bString) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aString > bString) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredItems, sortConfig]);

  const totalPages = Math.ceil(sortedItems.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = sortedItems.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEntriesChange = (value) => {
    setEntriesPerPage(value);
    setShowEntriesDropdown(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: {
      opacity: 0,
      x: 10,
      transition: {
        duration: 0.2
      }
    }
  };

  // Dynamic icon mapping
  const getColumnIcon = (iconName, size = 12) => {
    const iconProps = { size };
    switch (iconName) {
      case 'hash':
        return <FiHash {...iconProps} />;
      case 'hospital':
        return <Hospital {...iconProps} />;
      case 'building':
        return <FaBuilding {...iconProps} />;
      case 'flask':
        return <FaFlask {...iconProps} />;
      case 'user':
        return <FiUser {...iconProps} />;
      case 'userMd':
        return <FaUserMd {...iconProps} />;
      case 'city':
        return <FaCity {...iconProps} />;
      case 'globe':
        return <BsFillGlobeAmericasFill {...iconProps} />;
      case 'map':
        return <FiMapPin {...iconProps} />;
      case 'phone':
        return <FiPhone {...iconProps} />;
      case 'info':
        return <FiInfo {...iconProps} />;
      case 'home':
        return <FiHome {...iconProps} />;
      case 'activity':
        return <FiActivity {...iconProps} />;
      case 'check':
        return <FiCheckCircle {...iconProps} />;
      case 'heart':
        return <FaHeartbeat {...iconProps} />;
      case 'clinic':
        return <FaClinicMedical {...iconProps} />;
      case 'vial':
        return <FaVial {...iconProps} />;
      case 'microscope':
        return <Microscope {...iconProps} />;
      case 'stethoscope':
        return <Stethoscope {...iconProps} />;
      case 'heartPulse':
        return <HeartPulse {...iconProps} />;
      case 'buildingIcon':
        return <Building2 {...iconProps} />;
      case 'flaskIcon':
        return <FlaskConical {...iconProps} />;
      default:
        return <FiInfo {...iconProps} />;
    }
  };

  // Dynamic cell rendering
  const renderCellContent = (item, column) => {
    const value = item[column.key];

    if (value === undefined || value === null) return '-';

    switch (column.type) {
      case 'badge':
        return <span className="hospitals-sno-badge">{value}</span>;
      case 'cityBadge':
        return <span className="hospitals-city-badge">{value}</span>;
      case 'statusBadge':
        const statusClass = value.toLowerCase() === 'active' ? 'status-active' :
          value.toLowerCase() === 'inactive' ? 'status-inactive' :
            value.toLowerCase() === 'pending' ? 'status-pending' : '';
        return <span className={`status-badge ${statusClass}`}>{value}</span>;
      case 'providerType':
        let providerClass = '';
        const typeValue = value.toLowerCase();
        if (typeValue.includes('hospital')) {
          providerClass = 'provider-hospital';
        } else if (typeValue.includes('clinic')) {
          providerClass = 'provider-clinic';
        } else if (typeValue.includes('diagnostic')) {
          providerClass = 'provider-diagnostic';
        } else if (typeValue.includes('lab')) {
          providerClass = 'provider-lab';
        } else if (typeValue.includes('pharmacy')) {
          providerClass = 'provider-pharmacy';
        } else {
          providerClass = 'provider-other';
        }
        return <span className={`provider-badge ${providerClass}`}>{value}</span>;
      case 'contact':
        return <span className="hospitals-contact-text">{value}</span>;

      // case 'yesNo':
      //   const isYes = value.toLowerCase() === 'yes' || value === true || value === 'true';
      //   return (
      //     <span className={isYes ? 'yes-badge' : 'no-badge'}>
      //       {value}
      //     </span>
      //   );
      case 'yesNo':
  const isYes = value.toLowerCase() === 'yes' || value === true || value === 'true';
  return (
    <span className={isYes ? 'yes-badge' : 'no-badge'}>
      {isYes ? '✓ Yes' : '✗ No'}
    </span>
  );
      case 'name':
        return <span className="hospitals-td-name">{value}</span>;
      default:
        return value;
    }
  };

  // Get title field (second column usually)
  const getTitleKey = () => {
    const nameColumn = columns.find(col => col.key === 'name') ||
      columns.find(col => col.key === 'laboratory') ||
      columns.find(col => col.key === 'title') ||
      columns[1] || columns[0];
    return nameColumn.key;
  };

  // Get sno/badge field (first column usually)
  const getSnoKey = () => {
    const snoColumn = columns.find(col => col.key === 'sno') ||
      columns.find(col => col.key === 'id') ||
      columns[0];
    return snoColumn.key;
  };

  const titleKey = getTitleKey();
  const snoKey = getSnoKey();

  // Get icon for title
  const getTitleIcon = () => {
    const titleColumn = columns.find(col => col.key === titleKey);
    return titleColumn?.icon || 'info';
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <FiArrowUp className="hospitals-sort-icon" style={{ opacity: 0.3 }} />;
    }
    return sortConfig.direction === 'asc' ?
      <FiArrowUp className="hospitals-sort-icon" /> :
      <FiArrowDown className="hospitals-sort-icon" />;
  };

  return (
    <>
      <motion.div
        id={id}
        className="hospitals-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="hospitals-container">
          <motion.div
            className="hospitals-card"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Top Control Bar */}
            <div className="hospitals-header">
              <div className="hospitals-header-left">
                <motion.h2
                  className="hospitals-title"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className='icons'>
                    {getColumnIcon('buildingIcon', 20)}
                    {title}
                  </span>
                </motion.h2>
                <span className="hospitals-count-badge">{filteredItems.length} Total</span>
              </div>

              <div className="hospitals-controls">
                {/* Search Bar */}
                <div className={`hospitals-search-wrapper ${isSearchFocused ? 'hospitals-search-focused' : ''}`}>
                  <FiSearch className="hospitals-search-icon" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="hospitals-search-input"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  {searchQuery && (
                    <button
                      className="hospitals-search-clear"
                      onClick={handleClearSearch}
                      aria-label="Clear search"
                    >
                      <FiX size={14} />
                    </button>
                  )}
                </div>

                {/* View Toggle */}
                <div className="hospitals-view-toggle">
                  <motion.button
                    className={`hospitals-view-btn ${viewMode === 'list' ? 'hospitals-view-active' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('list')}
                    title="List View"
                  >
                    <FiList className="hospitals-view-icon" />
                  </motion.button>
                  <motion.button
                    className={`hospitals-view-btn ${viewMode === 'grid' ? 'hospitals-view-active' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                  >
                    <FiGrid className="hospitals-view-icon" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Data Table - List View */}
            {viewMode === 'list' ? (
              <div className="hospitals-table-wrapper">
                <table className="hospitals-table">
                  <thead>
                    <tr className="hospitals-table-header">
                      {columns.map((column) => (
                        <th
                          key={column.key}
                          className={`hospitals-th ${column.key === 'address' ? 'hospitals-th-address' : ''} ${column.key === 'contact' ? 'hospitals-th-contact' : ''}`}
                          onClick={() => column.sortable !== false && handleSort(column.key)}
                          style={{
                            width: column.width || 'auto',
                            cursor: column.sortable !== false ? 'pointer' : 'default'
                          }}
                        >
                          <div className="hospitals-th-content">
                            {column.icon && getColumnIcon(column.icon)}
                            {column.label}
                            {column.sortable !== false && <SortIcon column={column.key} />}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="wait">
                      {currentEntries.map((item, index) => (
                        <motion.tr
                          key={item.id || item[snoKey] || index}
                          className="hospitals-table-row"
                          variants={rowVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          whileHover={{ backgroundColor: '#F8F9FA' }}
                          transition={{ duration: 0.2 }}
                          onClick={() => openModal(item)}
                          style={{ cursor: 'pointer' }}
                        >
                          {columns.map((column) => (
                            <td
                              key={column.key}
                              className={`hospitals-td ${column.key === snoKey ? 'hospitals-td-sno' : ''} ${column.key === titleKey ? 'hospitals-td-name' : ''} ${column.key === 'address' ? 'hospitals-td-address' : ''} ${column.key === 'contact' ? 'hospitals-td-contact' : ''}`}
                            >
                              {renderCellContent(item, column)}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>

                {currentEntries.length === 0 && (
                  <div className="hospitals-empty-state">
                    <FiSearch size={32} />
                    <p>{emptyMessage}</p>
                  </div>
                )}
              </div>
            ) : (
              /* Grid View */
              <motion.div
                className="hospitals-grid-view"
                initial="hidden"
                animate="visible"
              >
                {currentEntries.map((item, index) => {
                  const nameColumn = columns.find(col => col.key === titleKey) || columns[1] || columns[0];
                  const snoColumn = columns.find(col => col.key === snoKey) || columns[0];
                  const otherColumns = columns.filter(col => col.key !== titleKey && col.key !== snoKey);

                  return (
                    <motion.div
                      key={item.id || item[snoKey] || index}
                      className="hospitals-grid-card"
                      variants={rowVariants}
                      whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                      transition={{ duration: 0.2 }}
                      onClick={() => openModal(item)}
                    >
                      <div className="hospitals-grid-header">
                        <span className="hospitals-grid-sno">#{item[snoColumn.key]}</span>
                        {otherColumns.length > 0 && (
                          <span className="hospitals-grid-province">
                            {item[otherColumns[0].key]}
                          </span>
                        )}
                      </div>
                      <h3 className="hospitals-grid-name">
                        {getColumnIcon(nameColumn.icon || 'info', 14)}
                        {item[nameColumn.key]}
                      </h3>
                      <div className="hospitals-grid-details">
                        {otherColumns.map((column, idx) => (
                          <p className="hospitals-grid-detail" key={column.key}>
                            {column.icon && getColumnIcon(column.icon, 12)}
                            <span className="hospitals-grid-label">{column.label}:</span> {item[column.key]}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Pagination Footer */}
            <div className="hospitals-footer">
              <div className="hospitals-footer-left">
                <p className="hospitals-results">
                  Showing <strong>{indexOfFirstEntry + 1}-{Math.min(indexOfLastEntry, sortedItems.length)}</strong> of <strong>{sortedItems.length}</strong> results
                </p>
              </div>

              <div className="hospitals-footer-right">
                {/* Entries Per Page */}
                <div className="hospitals-entries-wrapper" ref={entriesDropdownRef}>
                  <span className="hospitals-entries-label">Show</span>
                  <div
                    className="hospitals-entries-select"
                    onClick={() => setShowEntriesDropdown(!showEntriesDropdown)}
                  >
                    <span>{entriesPerPage}</span>
                    <FiChevronDown size={14} className={showEntriesDropdown ? 'hospitals-entries-chevron-rotate' : ''} />
                  </div>
                  <span className="hospitals-entries-label">entries</span>

                  <AnimatePresence>
                    {showEntriesDropdown && (
                      <motion.div
                        className="hospitals-entries-dropdown hospitals-entries-dropdown-footer"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        {itemsPerPageOptions.map(value => (
                          <motion.div
                            key={value}
                            className={`hospitals-entries-option ${entriesPerPage === value ? 'hospitals-entries-option-active' : ''}`}
                            onClick={() => handleEntriesChange(value)}
                            whileHover={{ backgroundColor: '#F1F3F5' }}
                          >
                            {value}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Pagination */}
                <div className="hospitals-pagination">
                  <motion.button
                    className="hospitals-pagination-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                  >
                    <FiChevronLeft size={16} />
                  </motion.button>

                  <div className="hospitals-page-select" ref={pageDropdownRef}>
                    <div
                      className="hospitals-page-select-trigger"
                      onClick={() => setShowPageDropdown(!showPageDropdown)}
                    >
                      <span>{currentPage}</span>
                      <FiChevronDown size={14} className={showPageDropdown ? 'hospitals-entries-chevron-rotate' : ''} />
                    </div>

                    <AnimatePresence>
                      {showPageDropdown && (
                        <motion.div
                          className="hospitals-page-dropdown"
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <motion.div
                              key={page}
                              className={`hospitals-page-option ${currentPage === page ? 'hospitals-page-option-active' : ''}`}
                              onClick={() => {
                                setCurrentPage(page);
                                setShowPageDropdown(false);
                              }}
                              whileHover={{ backgroundColor: '#F1F3F5' }}
                            >
                              {page}
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <span className="hospitals-page-text">of {totalPages}</span>

                  <motion.button
                    className="hospitals-pagination-btn hospitals-pagination-active"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={{ opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                  >
                    <FiChevronRight size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Dynamic Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="hospital-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="hospital-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="hospital-modal-header">
                <div className="hospital-modal-header-left">
                  <div className="hospital-modal-icon">
                    {getColumnIcon(getTitleIcon(), 20)}
                  </div>
                  <div className="hospital-modal-header-title">
                    <span className="hospital-modal-badge">#{selectedItem[snoKey]}</span>
                    <h2 className="hospital-modal-name">{selectedItem[titleKey]}</h2>
                  </div>
                </div>
                <button className="hospital-modal-close" onClick={closeModal}>
                  <FiX size={18} />
                </button>
              </div>

              <div className="hospital-modal-content">
                <div className="hospital-modal-details">
                  {columns
                    .filter(col => col.key !== titleKey && col.key !== snoKey)
                    .map((column) => (
                      <div className="hospital-modal-detail-item" key={column.key}>
                        {column.icon && (
                          <span className="hospital-modal-detail-icon">
                            {getColumnIcon(column.icon, 16)}
                          </span>
                        )}
                        <div>
                          <span className="hospital-modal-detail-label">{column.label}</span>
                          <span className="hospital-modal-detail-value">
                            {selectedItem[column.key] || '-'}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HospitalsList;