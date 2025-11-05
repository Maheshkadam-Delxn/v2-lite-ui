// 'use client'
// import React, { useState } from 'react';

// const CustomerPage = () => {
//   // Sample data with correct fields
//   const customers = [
//     {
//       id: 1,
//       name: 'ABC Corp',
//       email: 'contact1@abccorp.com',
//       phone: '+91 9876543210',
//       projectName: 'Project Alpha',
//       location: 'Pune',
//       status: 'pending'
//     },
//     {
//       id: 2,
//       name: 'XYZ Ltd',
//       email: 'contact2@xyz.com',
//       phone: '+91 9876543211',
//       projectName: 'Project Beta',
//       location: 'Mumbai',
//       status: 'active'
//     },
//     {
//       id: 3,
//       name: 'DEF Enterprises',
//       email: 'contact3@def.com',
//       phone: '+91 9876543212',
//       projectName: 'Project Gamma',
//       location: 'Delhi',
//       status: 'pending'
//     },
//     {
//       id: 4,
//       name: 'GHI Inc',
//       email: 'contact4@ghi.com',
//       phone: '+91 9876543213',
//       projectName: 'Project Delta',
//       location: 'Bangalore',
//       status: 'active'
//     },
//     {
//       id: 5,
//       name: 'JKL Pvt Ltd',
//       email: 'contact5@jkl.com',
//       phone: '+91 9876543214',
//       projectName: 'Project Echo',
//       location: 'Chennai',
//       status: 'pending'
//     },
//     {
//       id: 6,
//       name: 'MNO Group',
//       email: 'contact6@mno.com',
//       phone: '+91 9876543215',
//       projectName: 'Project Foxtrot',
//       location: 'Hyderabad',
//       status: 'active'
//     },
//   ];

//   const [searchTerm, setSearchTerm] = useState('');

//   // Filter customers based on search term
//   const filteredCustomers = customers.filter(customer =>
//     customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.location.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleEditClick = (customerId) => {
//     console.log(`Edit customer details for ID: ${customerId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 font-sans">
//       <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">Customer Dashboard</h1>
      
//       {/* Stats Card */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">Customer Overview</h2>
//               <p className="text-gray-600 mt-1">Total number of customers in the system</p>
//             </div>
//             <div className="text-right">
//               <div className="text-4xl font-bold text-blue-600">{customers.length}</div>
//               <div className="text-sm text-gray-500 mt-1">Total Customers</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
//           <div className="flex items-center gap-4">
//             <div className="flex-1">
//               <input
//                 type="text"
//                 placeholder="Search customers by name, email, project, or location..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//             <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium">
//               Search
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Customers Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//         {filteredCustomers.map((customer) => (
//           <div
//             key={customer.id}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden"
//           >
//             {/* Card Header - Blue Gradient */}
//             <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 pb-5 relative overflow-hidden">
//               {/* Decorative circles */}
//               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
//               <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-400 rounded-full opacity-20 transform translate-x-4 translate-y-4"></div>
              
//               <div className="relative z-10">
//                 <div className="flex items-start gap-3 mb-3">
//                   <div className="w-12 h-12 bg-blue-400 bg-opacity-40 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
//                     🏢
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-xl font-bold text-white mb-1">{customer.name}</h3>
//                     <p className="text-blue-100 text-sm">{customer.email}</p>
//                   </div>
//                 </div>
                
//                 {/* Badges */}
//                 <div className="flex gap-2 mt-3">
//                   <span className="bg-yellow-300 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
//                     {customer.status}
//                   </span>
//                   <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
//                     Customer
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Card Body */}
//             <div className="p-6">
//               {/* TYPE Section */}
//               <div className="mb-6">
//                 <div className="flex items-start gap-3">
//                   <div className="text-gray-600 mt-1">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                     </svg>
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">TYPE</p>
//                     <p className="text-gray-900 font-bold">{customer.projectName}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* DETAILS Section */}
//               <div>
//                 <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-3">DETAILS</p>
                
//                 <div className="space-y-2 text-sm">
//                   <p className="text-gray-900">
//                     <span className="font-semibold">Phone:</span> {customer.phone}
//                   </p>
//                   <p className="text-gray-900">
//                     <span className="font-semibold">Location:</span> {customer.location}
//                   </p>
//                   <p className="text-gray-900">
//                     <span className="font-semibold">Email:</span> {customer.email}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Card Footer */}
//             <div className="px-6 pb-6">
//               <button
//                 onClick={() => handleEditClick(customer.id)}
//                 className="flex items-center justify-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium w-full"
//               >
//                 Edit
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* No Results Message */}
//       {filteredCustomers.length === 0 && (
//         <div className="max-w-7xl mx-auto text-center py-12">
//           <div className="text-gray-500 text-lg">
//             No customers found matching your search criteria.
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerPage;

'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from "../../../../context/AuthContext";

const CustomerPage = () => {
  const { token } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        // Check if data.projects exists and is an array
        if (!data.projects || !Array.isArray(data.projects)) {
          console.warn("No projects array found in response, using empty array");
          setCustomers([]);
          return;
        }

        // Map projects to customer format
        const mappedCustomers = data.projects.map((project) => ({
          id: project._id?.$oid || project._id || project.id,
          name: project.client_name || 'N/A',
          email: project.client_email || 'No email provided',
          phone: project.client_phone_number || 'No phone provided',
          projectName: project.project_name || 'Unnamed Project',
          status: project.status || 'unknown',
        }));
        
        setCustomers(mappedCustomers);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProjects();
    } else {
      setLoading(false);
      setError('No authentication token found');
    }
  }, [token]);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading customers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md">
            <h3 className="font-bold text-lg mb-2">Error Loading Customers</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">Customer Dashboard</h1>
      
      {/* Stats Card */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Customer Overview</h2>
              <p className="text-gray-600 mt-1">Total number of customers in the system</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{customers.length}</div>
              <div className="text-sm text-gray-500 mt-1">Total Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search customers by name, email, or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden"
          >
            {/* Card Header - Blue Gradient */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 pb-5 relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-400 rounded-full opacity-20 transform translate-x-4 translate-y-4"></div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-400 bg-opacity-40 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
                    🏢
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{customer.name}</h3>
                    <p className="text-blue-100 text-sm">{customer.email}</p>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="flex gap-2 mt-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    customer.status === 'completed' 
                      ? 'bg-green-300 text-gray-800' 
                      : customer.status === 'in-progress'
                      ? 'bg-yellow-300 text-gray-800'
                      : 'bg-gray-300 text-gray-800'
                  }`}>
                    {customer.status}
                  </span>
                  <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                    Customer
                  </span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {/* PROJECT Section */}
              <div className="mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-gray-600 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">PROJECT</p>
                    <p className="text-gray-900 font-bold">{customer.projectName}</p>
                  </div>
                </div>
              </div>

              {/* DETAILS Section */}
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-3">DETAILS</p>
                
                <div className="space-y-2 text-sm">
                  <p className="text-gray-900">
                    <span className="font-semibold">Phone:</span> {customer.phone}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-semibold">Email:</span> {customer.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredCustomers.length === 0 && !loading && (
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="text-gray-500 text-lg">
            {customers.length === 0 
              ? "No customers found. Projects may not have client information." 
              : "No customers found matching your search criteria."}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;