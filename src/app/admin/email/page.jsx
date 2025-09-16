'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Inbox, Send, Archive, AlertCircle, Plus, X, Menu, ChevronLeft, Reply, Forward, Tag, MoreVertical
} from 'lucide-react';

const OrganizationMail = () => {
  const [activeFolder, setActiveFolder] = useState('All Mail');
  const [searchTerm, setSearchTerm] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [selectedMail, setSelectedMail] = useState(null);
  const [newMail, setNewMail] = useState({ recipient: '', subject: '', body: '', labels: [] });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [labels, setLabels] = useState([
    { name: 'General', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { name: 'Structural', color: 'bg-green-100 text-green-700 border-green-200' },
    { name: 'Interior', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  ]);
  const [newLabel, setNewLabel] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('bg-gray-100 text-gray-700 border-gray-200');
  const [isLabelEditorOpen, setIsLabelEditorOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const folders = [
    { name: 'All Mail', icon: Inbox, count: 19 },
    { name: 'Inbox', icon: Inbox, count: 12 },
    { name: 'Sent', icon: Send, count: 5 },
    { name: 'Archive', icon: Archive, count: 2 },
    { name: 'Spam', icon: AlertCircle, count: 0 },
  ];

  const colorOptions = [
    { name: 'Gray', value: 'bg-gray-100 text-gray-700 border-gray-200' },
    { name: 'Blue', value: 'bg-blue-100 text-blue-700 border-blue-200' },
    { name: 'Green', value: 'bg-green-100 text-green-700 border-green-200' },
    { name: 'Purple', value: 'bg-purple-100 text-purple-700 border-purple-200' },
    { name: 'Red', value: 'bg-red-100 text-red-700 border-red-200' },
    { name: 'Yellow', value: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  ];

  const mails = [
    {
      id: 1,
      sender: 'Mahesh Patil',
      subject: 'Project Horizon Update',
      preview: 'Please find the attached project updates for review and let me know if there are any immediate concerns or adjustments needed...',
      body: 'Dear Team,\n\nPlease find the attached project updates for review. Let me know if you have any questions.\n\nBest,\nMahesh Patil',
      dateTime: 'Sep 15, 2025 - 2:30 PM',
      unread: true,
      labels: ['Structural'],
    },
    {
      id: 2,
      sender: 'Alan David',
      subject: 'Meeting Invitation',
      preview: 'You are invited to the project alignment meeting scheduled for next week; please confirm your availability as soon as possible...',
      body: 'Hi,\n\nYou are invited to the project alignment meeting on Friday at 10 AM.\n\nRegards,\nAlan David',
      dateTime: 'Sep 15, 2025 - 11:10 AM',
      unread: false,
      labels: ['General'],
    },
    {
      id: 3,
      sender: 'SkyStruct HR',
      subject: 'Policy Changes',
      preview: 'We have updated our organization leave policies effective immediately; please review the attached document for full details...',
      body: 'Hello,\n\nWe have updated our organization leave policies. Please review the attached document.\n\nThank you,\nSkyStruct HR',
      dateTime: 'Sep 14, 2025 - 3:45 PM',
      unread: false,
      labels: ['Interior'],
    },
  ];

  const vendorEmails = [
    'abc@constructions.com',
    'xyz@suppliers.in',
    'sales@reliablesteel.co.in',
    'contact@modernel.com',
    'info@shakti.com',
    'sales@brightel.com',
    'contact@aquafl.com',
    'hvac@coolair.com',
    'support@roofguard.com',
  ];

  const filteredMails = mails.filter((mail) => {
    const matchesSearch =
      mail.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder =
      activeFolder === 'All Mail' ||
      (activeFolder === 'Inbox' && !mail.labels.includes('Archive') && !mail.labels.includes('Spam')) ||
      (activeFolder === 'Sent' && mail.labels.includes('Sent')) ||
      (activeFolder === 'Archive' && mail.labels.includes('Archive')) ||
      (activeFolder === 'Spam' && mail.labels.includes('Spam'));
    const matchesLabel = !activeLabel || mail.labels.includes(activeLabel);
    return matchesSearch && matchesFolder && matchesLabel;
  });

  const openComposeModal = () => {
    setIsComposing(true);
    setNewMail({ recipient: '', subject: '', body: '', labels: [] });
  };

  const closeComposeModal = () => {
    setIsComposing(false);
  };

  const handleComposeChange = (e) => {
    const { name, value } = e.target;
    setNewMail((prev) => ({ ...prev, [name]: value }));
  };

  const handleLabelToggle = (mail, label) => {
    const updatedLabels = mail.labels.includes(label)
      ? mail.labels.filter((l) => l !== label)
      : [...mail.labels, label];
    mail.labels = updatedLabels;
    setSelectedMail({ ...mail });
  };

  const sendMail = () => {
    if (!newMail.recipient || !newMail.subject || !newMail.body) {
      alert('All fields are required.');
      return;
    }
    console.log('Sending mail:', newMail);
    closeComposeModal();
  };

  const selectMail = (mail) => {
    setSelectedMail(mail);
    mail.unread = false;
    setIsDropdownOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openLabelEditor = () => {
    setIsLabelEditorOpen(true);
    setNewLabel('');
    setNewLabelColor('bg-gray-100 text-gray-700 border-gray-200');
  };

  const closeLabelEditor = () => {
    setIsLabelEditorOpen(false);
  };

  const addNewLabel = () => {
    if (newLabel.trim() && !labels.some((label) => label.name === newLabel.trim())) {
      setLabels([...labels, { name: newLabel.trim(), color: newLabelColor }]);
      closeLabelEditor();
    }
  };

  const getLabelColor = (labelName) => {
    const label = labels.find((l) => l.name === labelName);
    return label ? label.color : 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col h-full px-6 pt-6 pb-2">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization Mail</h1>
              <p className="text-gray-600">Manage and track all your communications</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium placeholder:text-gray-400 text-gray-700"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openComposeModal}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Compose</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex bg-white rounded-3xl shadow-2xl border border-gray-200 flex-1 overflow-hidden">
          {/* Sidebar */}
          <motion.aside
            initial={{ width: '16rem' }}
            animate={{ width: isSidebarOpen ? '16rem' : '4rem' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="border-r border-gray-200 bg-gray-50 flex-shrink-0 overflow-hidden relative rounded-l-3xl"
          >
            <div className="h-full p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <AnimatePresence initial={false}>
                  {isSidebarOpen && (
                    <motion.h2 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-lg font-semibold text-gray-800"
                    >
                      Filters
                    </motion.h2>
                  )}
                </AnimatePresence>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={toggleSidebar}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ChevronLeft className={`w-5 h-5 transition-transform ${!isSidebarOpen && 'rotate-180'}`} />
                </motion.button>
              </div>
              <nav className="space-y-2">
                {folders.map(({ name, icon: Icon, count }) => (
                  <motion.button
                    key={name}
                    onClick={() => {
                      setActiveFolder(name);
                      setActiveLabel(null);
                    }}
                    whileHover={{ x: isSidebarOpen ? 5 : 0 }}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      activeFolder === name && !activeLabel ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    } ${!isSidebarOpen && 'justify-center px-0'}`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <AnimatePresence initial={false}>
                      {isSidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="truncate"
                        >
                          {name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {count > 0 && isSidebarOpen && (
                      <span className="ml-auto text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    )}
                  </motion.button>
                ))}
              </nav>
              <div className="mt-auto pt-4 border-t border-gray-200">
                <AnimatePresence initial={false}>
                  {isSidebarOpen && (
                    <motion.h3 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-semibold text-gray-800 mb-2"
                    >
                      Labels
                    </motion.h3>
                  )}
                </AnimatePresence>
                <div className="space-y-2">
                  {labels.map((label) => (
                    <motion.button
                      key={label.name}
                      onClick={() => {
                        setActiveFolder('All Mail');
                        setActiveLabel(label.name);
                      }}
                      whileHover={{ x: isSidebarOpen ? 5 : 0 }}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        activeLabel === label.name ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                      } ${!isSidebarOpen && 'justify-center px-0'}`}
                    >
                      <div className={`w-3 h-3 rounded-full ${label.color.split(' ')[0]} flex-shrink-0`}></div>
                      <AnimatePresence initial={false}>
                        {isSidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="truncate"
                          >
                            {label.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openLabelEditor}
                    className={`flex items-center ${isSidebarOpen ? 'gap-2' : 'justify-center'} w-full px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all`}
                  >
                    <Plus className="w-4 h-4 flex-shrink-0" />
                    <AnimatePresence initial={false}>
                      {isSidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                        >
                          Add Label
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Mail Area */}
          <div className="flex-1 flex flex-col rounded-r-3xl overflow-hidden">
            {/* Mail List and View */}
            <div className="flex-1 flex overflow-hidden">
              {/* Mail List */}
              <section className="w-full md:w-80 border-r border-gray-200 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-200 shrink-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {activeLabel || activeFolder} ({filteredMails.length})
                  </h3>
                </div>
                <div className="flex-1 p-4 space-y-0 overflow-y-auto custom-scrollbar">
                  {filteredMails.length > 0 ? (
                    filteredMails.map((mail, index) => (
                      <div key={mail.id}>
                        <motion.div
                          onClick={() => selectMail(mail)}
                          whileHover={{ backgroundColor: '#f3f4f6' }}
                          className={`p-4 cursor-pointer rounded-2xl transition-all shadow-sm hover:shadow-md ${
                            selectedMail?.id === mail.id ? 'bg-blue-50' : 'bg-white'
                          } ${mail.unread ? 'font-semibold' : ''}`}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex flex-col flex-1 min-w-0">
                              <span className="text-sm text-gray-900 truncate font-medium">{mail.sender}</span>
                              <span className="text-sm text-gray-800 truncate block font-medium">{mail.subject}</span>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <span className="text-xs text-gray-500 whitespace-nowrap">{mail.dateTime}</span>
                              {mail.labels.length > 0 && (
                                <div className="flex gap-1">
                                  {mail.labels.map((label) => (
                                    <span key={label} className={`text-xs px-2 py-0.5 rounded-full ${getLabelColor(label)}`}>
                                      {label}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                        {index < filteredMails.length - 1 && <hr className="border-gray-200 my-2" />}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 text-sm mt-10">No mails found</div>
                  )}
                </div>
              </section>

              {/* Mail View */}
              <main className="flex-1 p-6 flex flex-col overflow-y-auto custom-scrollbar">
                {selectedMail ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-900">{selectedMail.subject}</h2>
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={toggleDropdown}
                          className="text-gray-600 hover:text-blue-600"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </motion.button>
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-10"
                            >
                              <div className="flex flex-col gap-1 p-2">
                                {labels.map((label) => (
                                  <motion.button
                                    key={label.name}
                                    whileHover={{ backgroundColor: '#f3f4f6' }}
                                    onClick={() => handleLabelToggle(selectedMail, label.name)}
                                    className={`px-3 py-1 rounded-lg text-xs font-medium text-left flex items-center gap-1 ${
                                      selectedMail.labels.includes(label.name) ? label.color : 'bg-gray-100 text-gray-600'
                                    }`}
                                  >
                                    {label.name}
                                    {selectedMail.labels.includes(label.name) && <X className="w-3 h-3 ml-auto" />}
                                  </motion.button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                      <span>{selectedMail.sender}</span>
                      <span className="text-gray-400">•</span>
                      <span>{selectedMail.dateTime}</span>
                    </div>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap mb-6 leading-relaxed border-l-4 border-blue-200 pl-4">{selectedMail.body}</p>
                    <div className="flex gap-3 mb-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 text-sm transition-all"
                      >
                        <Reply className="w-4 h-4" />
                        Reply
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 text-sm transition-all"
                      >
                        <Forward className="w-4 h-4" />
                        Forward
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500 font-medium text-sm">
                    Select a mail to view
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>

        {/* Compose Modal */}
        <AnimatePresence>
          {isComposing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full mx-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">New Mail</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeComposeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <select
                      name="recipient"
                      value={newMail.recipient}
                      onChange={handleComposeChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    >
                      <option value="">Select recipient</option>
                      {vendorEmails.map((email) => (
                        <option key={email} value={email}>
                          {email}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={newMail.subject}
                      onChange={handleComposeChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                      placeholder="Enter subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      name="body"
                      value={newMail.body}
                      onChange={handleComposeChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y h-24 text-sm"
                      placeholder="Compose your message..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Labels
                    </label>
                    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                      {labels.map((label) => (
                        <motion.button
                          key={label.name}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => {
                            const updatedLabels = newMail.labels.includes(label.name)
                              ? newMail.labels.filter((l) => l !== label.name)
                              : [...newMail.labels, label.name];
                            setNewMail({ ...newMail, labels: updatedLabels });
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${
                            newMail.labels.includes(label.name) ? label.color : 'bg-gray-100 text-gray-600 border-gray-200'
                          }`}
                        >
                          {label.name}
                          {newMail.labels.includes(label.name) && <X className="w-3 h-3" />}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeComposeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-300 text-sm transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMail}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg text-sm"
                  >
                    Send Mail
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Label Editor Modal */}
        <AnimatePresence>
          {isLabelEditorOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full mx-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Add New Label</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeLabelEditor}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label Name</label>
                    <input
                      type="text"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                      placeholder="Enter label name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <div className="grid grid-cols-3 gap-2">
                      {colorOptions.map((color) => (
                        <motion.button
                          key={color.name}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setNewLabelColor(color.value)}
                          className={`p-2 rounded-full ${color.value} ${newLabelColor === color.value ? 'ring-2 ring-blue-400' : ''}`}
                        >
                          <div className="w-4 h-4 rounded-full mx-auto" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeLabelEditor}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-300 text-sm transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addNewLabel}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg text-sm"
                  >
                    Add Label
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(156, 163, 175, 0.4);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(107, 114, 128, 0.6);
          }
          html, body {
            overflow: hidden;
          }
        `}</style>
      </div>
    </div>
  );
};

export default OrganizationMail;