"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch,
  FiArrowUp, 
  FiArrowDown, 
  FiList, 
  FiGrid, 
  FiChevronLeft, 
  FiChevronRight,
  FiChevronDown
} from 'react-icons/fi';
import './HospitalsList.css';

const HospitalsList = () => {
  const hospitals = [
    { sno: 1, name: 'Aga Khan University Hospital', city: 'Karachi', province: 'Sindh', address: 'Stadium Road', contact: '3493-0051' },
    { sno: 2, name: 'Aga Khan Hospital For Women-Karimabad', city: 'Karachi', province: 'Sindh', address: 'Block-7, Shahra-e-Pakistan, F B Area', contact: '36823045 / 36323465' },
    { sno: 3, name: 'Aga Khan Maternity Home-Garden', city: 'Karachi', province: 'Sindh', address: 'Gold Street, Garden East', contact: '3225-0966 / 0522, +92 21 3225 6903 ext. 7468' },
    { sno: 4, name: 'Aga Khan Maternity Home-Kharadar', city: 'Karachi', province: 'Sindh', address: 'Atmaram Pritam Das Road, Kharadar', contact: '32526315/32524618(EXT 318)' },
    { sno: 5, name: 'Agha Khan University Health Services', city: 'Karachi', province: 'Sindh', address: 'G-69, Block-7, Kehkashan Clifton.', contact: '35837965-86' },
    { sno: 6, name: 'South City Hospital', city: 'Karachi', province: 'Sindh', address: 'St-1 Shahrah-e-Firdousi, Block 3 Clifton, Karachi,', contact: '(021) 111 724 000' },
    { sno: 7, name: 'Liaquat National Hospital', city: 'Karachi', province: 'Sindh', address: 'NATIONAL STADIUM ROAD KARACHI.', contact: '4412712 -4412811 , (021) 111 456 456' },
    { sno: 8, name: 'Ziauddin Hospital - Clifton', city: 'Karachi', province: 'Sindh', address: 'Block-6, Scheme-5, Clifton', contact: '35862937-9 Ext 251' },
    { sno: 9, name: 'Ziauddin Hospital - Kemari', city: 'Karachi', province: 'Sindh', address: 'Plot # 33, Behind KPT Hospital, Kemari', contact: '285-1881-5' },
    { sno: 10, name: 'Ziauddin Hospital - North', city: 'Karachi', province: 'Sindh', address: 'North Nazimabad.', contact: '664-8237-8-9 Ext:503/504' },
    { sno: 11, name: 'Liaquat National Hospital', city: 'Karachi', province: 'Sindh', address: 'NATIONAL STADIUM ROAD KARACHI.', contact: '4412712 -4412811 , (021) 111 456 456' },
    { sno: 12, name: 'Ziauddin Hospital - Clifton', city: 'Karachi', province: 'Sindh', address: 'Block-6, Scheme-5, Clifton', contact: '35862937-9 Ext 251' },
    { sno: 13, name: 'Ziauddin Hospital - Kemari', city: 'Karachi', province: 'Sindh', address: 'Plot # 33, Behind KPT Hospital, Kemari', contact: '285-1881-5' },
    { sno: 14, name: 'Ziauddin Hospital - North', city: 'Karachi', province: 'Sindh', address: 'North Nazimabad.', contact: '664-8237-8-9 Ext:503/504' },
    { sno: 15, name: 'Patel Hospital', city: 'Karachi', province: 'Sindh', address: 'ST-18, Block 4, Gulshan-e-Iqbal', contact: '34821284' },
    { sno: 16, name: 'Tabba Heart Institute', city: 'Karachi', province: 'Sindh', address: 'St-15, Block 7, F.B Area', contact: '111-822-822' },
    { sno: 17, name: 'National Medical Centre', city: 'Karachi', province: 'Sindh', address: 'D.H.A Phase 1, Korangi Road', contact: '111-662-662' },
    { sno: 18, name: 'Saifee Hospital', city: 'Karachi', province: 'Sindh', address: 'St-15, Block 7, F.B Area', contact: '36824000' },
    { sno: 19, name: 'Burhani Hospital', city: 'Karachi', province: 'Sindh', address: 'M.A Jinnah Road', contact: '111-777-111' },
    { sno: 20, name: 'Karachi Adventist Hospital', city: 'Karachi', province: 'Sindh', address: '91 Depot Lines, M.A Jinnah Road', contact: '32784500' },
    { sno: 21, name: 'Holy Family Hospital', city: 'Karachi', province: 'Sindh', address: 'Street 10-A, Block 3, Nazimabad', contact: '36617812' },
    { sno: 22, name: 'Memon Medical Institute', city: 'Karachi', province: 'Sindh', address: 'Block-6, Scheme-5, Clifton', contact: '111-664-664' },
    { sno: 23, name: 'United Medical & Dental College', city: 'Karachi', province: 'Sindh', address: 'St-20, Block 4, Gulshan-e-Iqbal', contact: '34982479' },
    { sno: 24, name: 'Darul Sehat Hospital', city: 'Karachi', province: 'Sindh', address: 'Block-3, Gulistan-e-Jauhar', contact: '111-374-374' },
    { sno: 25, name: 'Zainab Panjwani Memorial Hospital', city: 'Karachi', province: 'Sindh', address: 'Block-6, Scheme-5, Clifton', contact: '35862450' },
    { sno: 26, name: 'Hill Park General Hospital', city: 'Karachi', province: 'Sindh', address: 'Shaheed-e-Millat Road', contact: '34532315' },
    { sno: 27, name: 'Kiran Hospital', city: 'Karachi', province: 'Sindh', address: 'Saudabad, Malir', contact: '34512345' },
    { sno: 28, name: 'Medicare Cardiac & General Hospital', city: 'Karachi', province: 'Sindh', address: 'St-17, Block 6, F.B Area', contact: '36324673' },
    { sno: 29, name: 'Rabia Moon Trust Hospital', city: 'Karachi', province: 'Sindh', address: 'Block-14, Gulistan-e-Jauhar', contact: '34612345' },
    { sno: 30, name: 'Sir Syed Hospital', city: 'Karachi', province: 'Sindh', address: 'Block-16, F.B Area', contact: '36324567' },
    { sno: 31, name: 'Usman Memorial Hospital', city: 'Karachi', province: 'Sindh', address: 'A-1, Block-1, North Nazimabad', contact: '36601234' },
    { sno: 32, name: 'Wazir Ali Shah Hospital', city: 'Karachi', province: 'Sindh', address: 'Near Disco Bakery, Gulshan-e-Iqbal', contact: '34981234' },
    { sno: 33, name: 'Yaseen Medical Center', city: 'Karachi', province: 'Sindh', address: 'Block-7, F.B Area', contact: '36329876' },
    { sno: 34, name: 'Al-Noor Hospital', city: 'Karachi', province: 'Sindh', address: 'Sector 11-B, North Karachi', contact: '36902345' },
    { sno: 35, name: 'Al-Shifa Hospital', city: 'Karachi', province: 'Sindh', address: 'Block-10, F.B Area', contact: '36324500' },
  ];

  const [viewMode, setViewMode] = useState('list');
  const [sortConfig, setSortConfig] = useState({ key: 'sno', direction: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEntriesDropdown, setShowEntriesDropdown] = useState(false);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredHospitals = useMemo(() => {
    if (!searchQuery.trim()) return hospitals;
    const query = searchQuery.toLowerCase().trim();
    return hospitals.filter(hospital => 
      hospital.name.toLowerCase().includes(query) ||
      hospital.city.toLowerCase().includes(query) ||
      hospital.province.toLowerCase().includes(query) ||
      hospital.address.toLowerCase().includes(query) ||
      hospital.contact.toLowerCase().includes(query)
    );
  }, [hospitals, searchQuery]);

  const sortedHospitals = useMemo(() => {
    return [...filteredHospitals].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredHospitals, sortConfig]);

  const totalPages = Math.ceil(sortedHospitals.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = sortedHospitals.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleEntriesChange = (value) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
    setShowEntriesDropdown(false);
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

  const rowContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3
      }
    }
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
    <motion.div
      className="hospitals-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="hospitals-container">
        <motion.div 
          className="hospitals-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Top Control Bar */}
          <div className="hospitals-header">
            <motion.h2 
              className="hospitals-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hospitals List
            </motion.h2>
            
            <div className="hospitals-controls">
              {/* Search Bar */}
              <div className="hospitals-search-wrapper">
                <FiSearch className="hospitals-search-icon" />
                <input 
                  type="text" 
                  className="hospitals-search-input"
                  placeholder="Search hospitals..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
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
              
              {/* Entries Per Page Dropdown */}
              <div className="hospitals-entries-wrapper">
                <div 
                  className="hospitals-entries-select"
                  onClick={() => setShowEntriesDropdown(!showEntriesDropdown)}
                >
                  <span>{entriesPerPage}</span>
                  <FiChevronDown size={14} className={showEntriesDropdown ? 'hospitals-entries-chevron-rotate' : ''} />
                </div>
                <span className="hospitals-entries-label">entries per page</span>
                
                <AnimatePresence>
                  {showEntriesDropdown && (
                    <motion.div 
                      className="hospitals-entries-dropdown"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {[10, 20, 30, 50, 100].map(value => (
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
            </div>
          </div>

          {/* Data Table - List View */}
          {viewMode === 'list' ? (
            <div className="hospitals-table-wrapper">
              <table className="hospitals-table">
                <thead>
                  <tr className="hospitals-table-header">
                    <th className="hospitals-th" onClick={() => handleSort('sno')} style={{ width: '70px' }}>
                      <div className="hospitals-th-content">
                        S.No
                        <SortIcon column="sno" />
                      </div>
                    </th>
                    <th className="hospitals-th" onClick={() => handleSort('name')}>
                      <div className="hospitals-th-content">
                        Hospital Name
                        <SortIcon column="name" />
                      </div>
                    </th>
                    <th className="hospitals-th" onClick={() => handleSort('city')} style={{ width: '120px' }}>
                      <div className="hospitals-th-content">
                        City
                        <SortIcon column="city" />
                      </div>
                    </th>
                    <th className="hospitals-th" onClick={() => handleSort('province')} style={{ width: '120px' }}>
                      <div className="hospitals-th-content">
                        Province
                        <SortIcon column="province" />
                      </div>
                    </th>
                    <th className="hospitals-th hospitals-th-address" onClick={() => handleSort('address')}>
                      <div className="hospitals-th-content">
                        Address
                        <SortIcon column="address" />
                      </div>
                    </th>
                    <th className="hospitals-th hospitals-th-contact" onClick={() => handleSort('contact')} style={{ width: '200px' }}>
                      <div className="hospitals-th-content">
                        Contact
                        <SortIcon column="contact" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={rowContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence mode="wait">
                    {currentEntries.map((hospital) => (
                      <motion.tr 
                        key={hospital.sno} 
                        className="hospitals-table-row"
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover={{ backgroundColor: '#F8F9FA' }}
                        transition={{ duration: 0.2 }}
                      >
                        <td className="hospitals-td hospitals-td-sno">{hospital.sno}</td>
                        <td className="hospitals-td hospitals-td-name">{hospital.name}</td>
                        <td className="hospitals-td">{hospital.city}</td>
                        <td className="hospitals-td">{hospital.province}</td>
                        <td className="hospitals-td hospitals-td-address">{hospital.address}</td>
                        <td className="hospitals-td hospitals-td-contact">{hospital.contact}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </motion.tbody>
              </table>
            </div>
          ) : (
            /* Grid View */
            <motion.div 
              className="hospitals-grid-view"
              variants={rowContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentEntries.map((hospital) => (
                <motion.div 
                  key={hospital.sno}
                  className="hospitals-grid-card"
                  variants={rowVariants}
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="hospitals-grid-header">
                    <span className="hospitals-grid-sno">#{hospital.sno}</span>
                    <span className="hospitals-grid-province">{hospital.province}</span>
                  </div>
                  <h3 className="hospitals-grid-name">{hospital.name}</h3>
                  <div className="hospitals-grid-details">
                    <p className="hospitals-grid-detail">
                      <span className="hospitals-grid-label">City:</span> {hospital.city}
                    </p>
                    <p className="hospitals-grid-detail">
                      <span className="hospitals-grid-label">Address:</span> {hospital.address}
                    </p>
                    <p className="hospitals-grid-detail">
                      <span className="hospitals-grid-label">Contact:</span> {hospital.contact}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination Footer */}
          <div className="hospitals-footer">
            <p className="hospitals-results">
              Showing results {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, sortedHospitals.length)} of {sortedHospitals.length}
            </p>
            
            <div className="hospitals-pagination">
              <motion.button 
                className="hospitals-pagination-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                <FiChevronLeft size={16} />
              </motion.button>
              
              <div className="hospitals-page-select">
                <span>{currentPage}</span>
                <FiChevronDown size={14} />
              </div>
              
              <span className="hospitals-page-text">of {totalPages}</span>
              
              <motion.button 
                className="hospitals-pagination-btn hospitals-pagination-active"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{ opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
              >
                <FiChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HospitalsList;