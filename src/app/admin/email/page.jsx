'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Inbox, Send, Archive, AlertCircle, Plus, X, Menu, ChevronLeft, Reply, Forward, Tag, MoreVertical, Paperclip, XCircle, Save, Star, StarOff
} from 'lucide-react';

const OrganizationMail = () => {
  const [activeFolder, setActiveFolder] = useState('All Mail');
  const [searchTerm, setSearchTerm] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [selectedMail, setSelectedMail] = useState(null);
  const [newMail, setNewMail] = useState({ recipients: [], subject: '', body: '', labels: [], attachments: [] });
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
  const [recipientInput, setRecipientInput] = useState('');
  const [showRecipientSuggestions, setShowRecipientSuggestions] = useState(false);
  const [attachmentInput, setAttachmentInput] = useState('');
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [members, setMembers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [recipientsList, setRecipientsList] = useState([]); // Combined members + vendors

  const folders = [
    { name: 'All Mail', icon: Inbox, count: 0 },
    { name: 'Inbox', icon: Inbox, count: 0 },
    { name: 'Sent', icon: Send, count: 0 },
    { name: 'Archive', icon: Archive, count: 0 },
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

  // Mock mails for unauthorized state
  const mockMails = [
    {
      id: 'mock1',
      sender: 'Sample User',
      subject: 'Welcome to Mail',
      preview: 'This is a sample mail to get started...',
      body: 'Dear User,\n\nWelcome to the organization mail system. Please log in to access your real mails.\n\nBest,\nTeam',
      dateTime: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
      unread: false,
      labels: ['General'],
      folder: 'inbox',
      isStarred: false,
    },
  ];

  const apiBase = process.env.NEXT_PUBLIC_BACKEND_API_PATH || '';

  // Fetch members (simplified, without roles/projects for mail)
  const fetchMembers = async () => {
    try {
      const token = sessionStorage.getItem('token') || ''; // Use sessionStorage
      const headers = {
        'Accept': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${apiBase}/api/member`, {
        headers,
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      const { success, data } = await res.json();
      console.log('Fetched members:', data);
      if (success) {
        const mappedMembers = data.map(m => ({
          id: m._id,
          name: m.name,
          email: m.email,
          type: 'member', // To distinguish
        }));
        setMembers(mappedMembers);
      } else {
        console.error('API error:', data.message);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  // Fetch vendors
  const fetchVendors = async () => {
    try {
      const token = sessionStorage.getItem('token') || ''; // Use sessionStorage
      const response = await fetch(`${apiBase}/api/vendor?_=${Date.now()}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch vendors: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('Fetched vendors:', result.data); // Debug
        const mappedVendors = result.data.map(v => ({
          id: v._id,
          name: v.name || v.companyName || 'Unknown Vendor', // Assume name or companyName
          email: v.email,
          type: 'vendor',
        }));
        setVendors(mappedVendors);
      } else {
        throw new Error(result.error || 'Failed to fetch vendors');
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  // Combine members and vendors for recipients list
  useEffect(() => {
    const combined = [
      ...members.map(m => ({ ...m, display: `${m.name} <${m.email}>` })),
      ...vendors.map(v => ({ ...v, display: `${v.name} <${v.email}>` })),
    ];
    setRecipientsList(combined);
  }, [members, vendors]);

  const filteredSuggestions = recipientsList.filter(item =>
    !newMail.recipients.includes(item.id) && 
    (item.name?.toLowerCase().includes(recipientInput.toLowerCase()) || 
     item.email.toLowerCase().includes(recipientInput.toLowerCase()))
  );

  const filteredMails = (isUnauthorized ? mockMails : mails).filter((mail) => {
    const matchesSearch =
      mail.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mail.preview || mail.body || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder =
      activeFolder === 'All Mail' ||
      (activeFolder === 'Inbox' && mail.folder === 'inbox') ||
      (activeFolder === 'Sent' && mail.folder === 'sent') ||
      (activeFolder === 'Archive' && mail.folder === 'trash') ||
      (activeFolder === 'Spam' && mail.folder === 'spam');
    const matchesLabel = !activeLabel || mail.labels.includes(activeLabel);
    return matchesSearch && matchesFolder && matchesLabel;
  });

  // Update folder counts based on mails
  useEffect(() => {
    const counts = { 'All Mail': 0, Inbox: 0, Sent: 0, Archive: 0, Spam: 0 };
    const currentMails = isUnauthorized ? mockMails : mails;
    currentMails.forEach(mail => {
      counts['All Mail']++;
      if (mail.folder === 'inbox') counts.Inbox++;
      if (mail.folder === 'sent') counts.Sent++;
      if (mail.folder === 'trash') counts.Archive++;
      if (mail.folder === 'spam') counts.Spam++;
    });
    folders.forEach(folder => folder.count = counts[folder.name]);
  }, [mails, isUnauthorized]);

  // Fetch members and vendors on mount
  useEffect(() => {
    fetchMembers();
    fetchVendors();
  }, []);

  const fetchMails = async () => {
    setLoading(true);
    setError(null);
    setIsUnauthorized(false);
    const token = sessionStorage.getItem('token');
    if (!token) {
      setIsUnauthorized(true);
      setLoading(false);
      return;
    }

    const apiBase = process.env.NEXT_PUBLIC_BACKEND_API_PATH || '';
    let url = '';
    if (searchTerm.trim()) {
      url = `${apiBase}/api/mail/search?q=${encodeURIComponent(searchTerm)}`;
    } else {
      switch (activeFolder) {
        case 'Inbox':
          url = `${apiBase}/api/mail/inbox`;
          break;
        case 'Sent':
          url = `${apiBase}/api/mail/sent`;
          break;
        case 'Archive':
          url = `${apiBase}/api/mail/draft`; // Placeholder, adjust if needed
          break;
        case 'Spam':
          url = `${apiBase}/api/mail/draft`; // Placeholder
          break;
        default:
          // For All Mail, fetch inbox + sent for now
          url = `${apiBase}/api/mail/inbox`; // Simplify, or chain fetches
          break;
      }
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (response.status === 401) {
        setIsUnauthorized(true);
        console.warn('401 Unauthorized - Using mock data');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const { mails: apiMails } = await response.json();
      // Map API response to UI format
      const mappedMails = apiMails.map(mail => ({
        id: mail._id,
        sender: mail.folder === 'sent' ? 'Me' : (mail.sender?.name || mail.sender?.email || 'Unknown'),
        subject: mail.subject,
        preview: mail.body ? mail.body.substring(0, 100) + '...' : '',
        body: mail.body,
        dateTime: new Date(mail.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
        unread: !mail.isRead,
        labels: mail.labels || [],
        folder: mail.folder,
        isStarred: mail.isStarred || false,
      }));
      setMails(mappedMails);
    } catch (err) {
      console.error('Fetch mails error:', err);
      if (err.message.includes('401')) {
        setIsUnauthorized(true);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMails();
  }, [activeFolder, searchTerm]);

  const openComposeModal = () => {
    setIsComposing(true);
    setNewMail({ recipients: [], subject: '', body: '', labels: [], attachments: [] });
    setRecipientInput('');
    setAttachmentInput('');
  };

  const closeComposeModal = () => {
    setIsComposing(false);
  };

  const handleComposeChange = (e) => {
    const { name, value } = e.target;
    setNewMail((prev) => ({ ...prev, [name]: value }));
  };

  const addRecipient = (recipient) => {
    if (!newMail.recipients.includes(recipient.id)) {
      setNewMail((prev) => ({ ...prev, recipients: [...prev.recipients, recipient.id] }));
      setRecipientInput('');
      setShowRecipientSuggestions(false);
    }
  };

  const removeRecipient = (idToRemove) => {
    setNewMail((prev) => ({ ...prev, recipients: prev.recipients.filter(id => id !== idToRemove) }));
  };

  const getRecipientDisplay = (id) => {
    const recipient = recipientsList.find(r => r.id === id);
    return recipient ? recipient.display : id;
  };

  const handleRecipientInputChange = (e) => {
    setRecipientInput(e.target.value);
    setShowRecipientSuggestions(true);
  };

  const handleRecipientKeyDown = (e) => {
    if (e.key === 'Enter' && recipientInput.trim()) {
      // Try to find matching recipient by email input
      const matching = recipientsList.find(item =>
        item.email.toLowerCase().includes(recipientInput.toLowerCase()) ||
        item.name?.toLowerCase().includes(recipientInput.toLowerCase())
      );
      if (matching && !newMail.recipients.includes(matching.id)) {
        e.preventDefault();
        addRecipient(matching);
      }
    } else if (e.key === 'Escape') {
      setShowRecipientSuggestions(false);
    }
  };

  const handleAttachmentInputChange = (e) => {
    const input = e.target.value;
    if (input && !newMail.attachments.some(att => att.name === input)) {
      setNewMail((prev) => ({ ...prev, attachments: [...prev.attachments, { name: input, url: '/mock-url/' + input }] }));
      setAttachmentInput('');
    }
  };

  const removeAttachment = (nameToRemove) => {
    setNewMail((prev) => ({ ...prev, attachments: prev.attachments.filter(att => att.name !== nameToRemove) }));
  };

  const handleLabelToggle = (mail, label) => {
    const updatedLabels = mail.labels.includes(label)
      ? mail.labels.filter((l) => l !== label)
      : [...mail.labels, label];
    mail.labels = updatedLabels;
    setSelectedMail({ ...mail });
  };

  const saveDraft = async () => {
    if (!newMail.subject && !newMail.body) {
      alert('Draft must have subject or body.');
      return;
    }

    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Authentication token not found. Please log in.');
      return;
    }

    const apiBase = process.env.NEXT_PUBLIC_BACKEND_API_PATH || '';
    const attachmentData = newMail.attachments.map(att => ({ name: att.name, url: att.url }));

    try {
      const response = await fetch(`${apiBase}/api/mail/draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: newMail.subject,
          body: newMail.body,
          recipients: newMail.recipients, // Now IDs
          attachments: attachmentData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save draft');
      }

      alert('Draft saved successfully!');
      closeComposeModal();
    } catch (error) {
      console.error('Error saving draft:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const sendMail = async () => {
    if (!newMail.recipients.length || !newMail.subject || !newMail.body) {
      alert('All fields are required.');
      return;
    }

    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Authentication token not found. Please log in.');
      return;
    }

    const attachmentData = newMail.attachments.map(att => ({ name: att.name, url: att.url }));

    const apiBase = process.env.NEXT_PUBLIC_BACKEND_API_PATH || '';
    const apiUrl = `${apiBase}/api/mail/send`.replace(/^\/\//, '/');

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    headers['Authorization'] = `Bearer ${token}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          subject: newMail.subject,
          body: newMail.body,
          recipients: newMail.recipients, // Now array of ObjectIds (strings)
          labels: newMail.labels,
          attachments: attachmentData,
        }),
      });
      

      const data = await response.json();
      console.log('Send mail response:', data); 

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send mail');
      }

      alert('Mail sent successfully!');
      closeComposeModal();
    } catch (error) {
      console.error('Error sending mail:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const selectMail = (mail) => {
    setSelectedMail(mail);
    if (mail.unread && mail.folder === 'inbox') {
      // Mark as read
      markAsRead(mail.id);
    }
    setIsDropdownOpen(false);
  };

  const markAsRead = async (mailId) => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    const apiBase = process.env.NEXT_PUBLIC_BACKEND_API_PATH || '';
    try {
      const response = await fetch(`${apiBase}/api/mail/${mailId}/read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ read: true }),
      });

      if (!response.ok) {
        console.error('Failed to mark as read');
      }
    } catch (err) {
      console.error('Mark as read error:', err);
    }
  };

  const toggleStar = async (mailId, currentStarred) => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    const apiBase = process.env.NEXT_PUBLIC_BACKEND_API_PATH || '';
    try {
      const response = await fetch(`${apiBase}/api/mail/${mailId}/star`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ starred: !currentStarred }),
      });

      if (response.ok) {
        // Update local state
        setMails(mails.map(m => m.id === mailId ? { ...m, isStarred: !currentStarred } : m));
        if (selectedMail?.id === mailId) {
          setSelectedMail({ ...selectedMail, isStarred: !currentStarred });
        }
      }
    } catch (err) {
      console.error('Toggle star error:', err);
    }
  };

  const moveToFolder = async (mailId, folder) => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    const apiBase = process.env.NEXT_PUBLIC_BACKEND_API_PATH || '';
    try {
      const response = await fetch(`${apiBase}/api/mail/${mailId}/move`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ folder }),
      });

      if (response.ok) {
        // Update local state
        setMails(mails.map(m => m.id === mailId ? { ...m, folder } : m));
        if (selectedMail?.id === mailId) {
          setSelectedMail({ ...selectedMail, folder });
        }
        // Refetch if needed
        fetchMails();
      }
    } catch (err) {
      console.error('Move folder error:', err);
    }
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

  if (loading) {
    return <div className="h-screen bg-gray-50 flex items-center justify-center">Loading mails...</div>;
  }

 
  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <div className="w-full flex flex-col h-full px-0 pt-2 pb-2">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2 px-4"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search mails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium placeholder:text-gray-500 text-gray-900"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openComposeModal}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Compose</span>
            </motion.button>
          </div>
          {isUnauthorized && (
            <div className="text-center text-sm text-yellow-600 mt-2">
              Please log in to access your personal mails. Showing sample data.
            </div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="flex bg-white border border-gray-200 flex-1 overflow-hidden">
          {/* Sidebar */}
          <motion.aside
            initial={{ width: '14rem' }}
            animate={{ width: isSidebarOpen ? '14rem' : '3.5rem' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="border-r border-gray-200 bg-gray-50 flex-shrink-0 overflow-hidden"
          >
            <div className="h-full p-3 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <AnimatePresence initial={false}>
                  {isSidebarOpen && (
                    <motion.h2 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-base font-semibold text-gray-800"
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
                  <ChevronLeft className={`w-4 h-4 transition-transform ${!isSidebarOpen && 'rotate-180'}`} />
                </motion.button>
              </div>
              <nav className="space-y-1.5">
                {folders.map(({ name, icon: Icon, count }) => (
                  <motion.button
                    key={name}
                    onClick={() => {
                      setActiveFolder(name);
                      setActiveLabel(null);
                      setSearchTerm('');
                    }}
                    whileHover={{ x: isSidebarOpen ? 3 : 0 }}
                    className={`flex items-center gap-2 w-full px-2 py-1.5 rounded text-xs font-medium transition-all ${
                      activeFolder === name && !activeLabel ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    } ${!isSidebarOpen && 'justify-center px-0'}`}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
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
                      <span className="ml-auto text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">
                        {count}
                      </span>
                    )}
                  </motion.button>
                ))}
              </nav>
              <div className="mt-auto pt-3 border-t border-gray-200">
                <AnimatePresence initial={false}>
                  {isSidebarOpen && (
                    <motion.h3 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-semibold text-gray-800 mb-1.5"
                    >
                      Labels
                    </motion.h3>
                  )}
                </AnimatePresence>
                <div className="space-y-1.5">
                  {labels.map((label) => (
                    <motion.button
                      key={label.name}
                      onClick={() => {
                        setActiveFolder('All Mail');
                        setActiveLabel(label.name);
                      }}
                      whileHover={{ x: isSidebarOpen ? 3 : 0 }}
                      className={`flex items-center gap-2 w-full px-2 py-1.5 rounded text-xs font-medium transition-all ${
                        activeLabel === label.name ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                      } ${!isSidebarOpen && 'justify-center px-0'}`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${label.color.split(' ')[0]} flex-shrink-0`}></div>
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
                    className={`flex items-center ${isSidebarOpen ? 'gap-2' : 'justify-center'} w-full px-2 py-1.5 rounded text-xs font-medium text-gray-600 hover:bg-gray-100 transition-all`}
                  >
                    <Plus className="w-3.5 h-3.5 flex-shrink-0" />
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
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mail List and View */}
            <div className="flex-1 flex overflow-hidden">
              {/* Mail List */}
              <section className="w-full md:w-72 border-r border-gray-200 flex flex-col overflow-hidden">
                <div className="p-3 border-b border-gray-200 shrink-0">
                  <h3 className="text-base font-semibold text-gray-900">
                    {activeLabel || activeFolder} ({filteredMails.length})
                  </h3>
                </div>
                <div className="flex-1 p-3 space-y-0 overflow-y-auto custom-scrollbar">
                  {filteredMails.length > 0 ? (
                    filteredMails.map((mail) => (
                      <motion.div
                        key={mail.id}
                        onClick={() => selectMail(mail)}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        className={`p-3 cursor-pointer transition-all border-b border-gray-100 last:border-b-0 ${
                          selectedMail?.id === mail.id ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
                        } ${mail.unread ? 'font-semibold' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-sm text-gray-900 truncate">{mail.sender}</span>
                            <span className="text-sm text-gray-800 truncate block">{mail.subject}</span>
                          </div>
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <span className="text-xs text-gray-500 whitespace-nowrap">{mail.dateTime}</span>
                            {mail.labels.length > 0 && (
                              <div className="flex gap-1">
                                {mail.labels.map((label) => (
                                  <span key={label} className={`text-xs px-1.5 py-0.5 rounded-full ${getLabelColor(label)}`}>
                                    {label}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
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
                      <h2 className="text-2xl font-bold text-gray-900">{selectedMail.subject}</h2>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => toggleStar(selectedMail.id, selectedMail.isStarred)}
                          className="text-gray-600 hover:text-yellow-600"
                        >
                          {selectedMail.isStarred ? <StarOff className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                        </motion.button>
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
                                  <div className="border-t pt-2 mt-2">
                                    <select
                                      onChange={(e) => moveToFolder(selectedMail.id, e.target.value)}
                                      defaultValue={selectedMail.folder}
                                      className="w-full px-3 py-1 rounded-lg text-xs text-gray-600"
                                    >
                                      <option value="inbox">Inbox</option>
                                      <option value="sent">Sent</option>
                                      <option value="spam">Spam</option>
                                      <option value="trash">Archive</option>
                                    </select>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-6 text-base text-gray-600">
                      <span>{selectedMail.sender}</span>
                      <span className="text-gray-400">•</span>
                      <span>{selectedMail.dateTime}</span>
                    </div>
                    <p className="text-base text-gray-800 whitespace-pre-wrap mb-6 leading-relaxed border-l-4 border-blue-200 pl-4">{selectedMail.body}</p>
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
                  <div className="flex-1 flex items-center justify-center text-gray-500 font-medium text-base">
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
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
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
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={recipientInput}
                        onChange={handleRecipientInputChange}
                        onKeyDown={handleRecipientKeyDown}
                        onFocus={() => setShowRecipientSuggestions(true)}
                        placeholder="Type email address or select from suggestions..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm placeholder:text-gray-500 text-gray-900"
                      />
                      {showRecipientSuggestions && filteredSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-40 overflow-y-auto z-10">
                          {filteredSuggestions.map((recipient) => (
                            <motion.button
                              key={recipient.id}
                              onClick={() => addRecipient(recipient)}
                              whileHover={{ backgroundColor: '#f3f4f6' }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {recipient.display}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                    {newMail.recipients.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {newMail.recipients.map((recipientId) => {
                          const recipient = recipientsList.find(r => r.id === recipientId);
                          if (!recipient) return null;
                          return (
                            <div key={recipientId} className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                              {recipient.display}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => removeRecipient(recipientId)}
                                className="ml-2 text-blue-700 hover:text-blue-900"
                              >
                                <XCircle className="w-3 h-3" />
                              </motion.button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={newMail.subject}
                      onChange={handleComposeChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm placeholder:text-gray-500 text-gray-900"
                      placeholder="Enter subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="body"
                      value={newMail.body}
                      onChange={handleComposeChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y h-32 text-sm placeholder:text-gray-500 text-gray-900"
                      placeholder="Compose your message..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Paperclip className="w-4 h-4" />
                      Attachments (Mock - Enter names for testing)
                    </label>
                    <input
                      type="text"
                      value={attachmentInput}
                      onChange={(e) => setAttachmentInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAttachmentInputChange(e)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm placeholder:text-gray-500 text-gray-900"
                      placeholder="Enter attachment name and press Enter (e.g., document.pdf)"
                    />
                    {newMail.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {newMail.attachments.map((att) => (
                          <div key={att.name} className="flex items-center bg-gray-100 text-gray-900 px-3 py-1 rounded-lg text-sm">
                            <Paperclip className="w-3 h-3 mr-1" />
                            {att.name}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={() => removeAttachment(att.name)}
                              className="ml-2 text-gray-700 hover:text-gray-900"
                            >
                              <XCircle className="w-3 h-3" />
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
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
                <div className="flex justify-end gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={saveDraft}
                    className="px-6 py-3 flex items-center gap-2 bg-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-300 text-sm transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Draft
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeComposeModal}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-300 text-sm transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMail}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg text-sm"
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
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm placeholder:text-gray-500 text-gray-900"
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
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(156, 163, 175, 0.4);
            border-radius: 2px;
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