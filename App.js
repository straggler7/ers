import React, { useState, useEffect } from 'react';

// Mock Data for IRS Tax Form Issues with Schedules and Sub-Issues
const mockFormIssues = [
  {
    id: 'tax-F1040-001',
    message: 'Multiple discrepancies across Form 1040, W-2, and Schedule A.', // General message for the issue
    severity: 'High',
    status: 'Under Review',
    lastSeen: '2025-08-24 09:30 AM',
    firstSeen: '2025-08-23 05:00 PM',
    occurrences: 157,
    taxpayersAffected: 45,
    formType: 'Form 1040',
    taxpayerID: '***-**-1234',
    assignedTo: 'Jane Doe',
    auditTrail: [
      { timestamp: '2025-08-23 05:00 PM', action: 'System flagged issue with multiple discrepancies' },
      { timestamp: '2025-08-24 09:35 AM', action: 'Assigned to Examiner Jane Doe' }
    ],
    context: {
      filedDate: '2025-04-15'
    },
    schedules: [ // Array for different schedules within the form
      {
        scheduleName: "Form 1040 (Main)",
        subIssues: [
          {
            subIssueId: 'sub-F1040-001-A',
            subIssueMessage: 'Income reported on W-2 does not match Line 1 (Wages, salaries, tips, etc.).',
            fieldName: 'Line 1 (Wages, salaries, tips, etc.)',
            currentValue: '$60,000',
            suggestedCorrection: 'Verify W-2 data entry or contact taxpayer for clarification.',
            correctValue: '',
            status: 'Pending',
            auditTrail: [
              { timestamp: '2025-08-23 05:00 PM', action: 'System flagged sub-issue A' }
            ]
          },
          {
            subIssueId: 'sub-F1040-001-D',
            subIssueMessage: 'Taxable interest (Line 2b) appears inconsistent with investment income.',
            fieldName: 'Line 2b (Taxable interest)',
            currentValue: '$500',
            suggestedCorrection: 'Verify 1099-INT and other interest income sources.',
            correctValue: '',
            status: 'Pending',
            auditTrail: [
              { timestamp: '2025-08-23 07:00 PM', action: 'System flagged sub-issue D' }
            ]
          }
        ]
      },
      {
        scheduleName: "Schedule A (Itemized Deductions)",
        subIssues: [
          {
            subIssueId: 'sub-F1040-001-B',
            subIssueMessage: 'Missing Schedule A for Itemized Deductions.',
            fieldName: 'Schedule A (Itemized Deductions)',
            currentValue: 'N/A (claimed $15,000)',
            suggestedCorrection: 'Request Schedule A from taxpayer.',
            correctValue: '',
            status: 'Pending',
            auditTrail: [
              { timestamp: '2025-08-23 05:00 PM', action: 'System flagged sub-issue B' }
            ]
          },
          {
            subIssueId: 'sub-F1040-001-C',
            subIssueMessage: 'Medical expense deduction calculation error.',
            fieldName: 'Medical Expenses (Line 4)',
            currentValue: '$8,000',
            suggestedCorrection: 'Recalculate AGI limitation for medical expenses.',
            correctValue: '',
            status: 'Pending',
            auditTrail: [
              { timestamp: '2025-08-23 06:00 PM', action: 'System flagged sub-issue C' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'tax-F ScheduleC-002',
    message: 'Schedule C discrepancies in expenses and income reporting.',
    severity: 'Medium',
    status: 'Open',
    lastSeen: '2025-08-24 09:28 AM',
    firstSeen: '2025-08-24 08:00 AM',
    occurrences: 88,
    taxpayersAffected: 22,
    formType: 'Form 1040 (with Schedule C)',
    taxpayerID: '***-**-5678',
    assignedTo: 'Unassigned',
    auditTrail: [
      { timestamp: '2025-08-24 08:00 AM', action: 'System flagged issue' }
    ],
    context: {
      businessType: 'Consulting'
    },
    schedules: [
        {
            scheduleName: "Schedule C (Profit or Loss from Business)",
            subIssues: [
              {
                subIssueId: 'sub-ScheduleC-002-A',
                subIssueMessage: 'Business expense deduction exceeds industry average by 25%.',
                fieldName: 'Business Expenses',
                currentValue: '$15,000',
                suggestedCorrection: 'Request supporting documentation for expenses.',
                correctValue: '',
                status: 'Pending',
                auditTrail: [
                    { timestamp: '2025-08-24 08:00 AM', action: 'System flagged sub-issue A' }
                ]
              },
              {
                subIssueId: 'sub-ScheduleC-002-B',
                subIssueMessage: 'Reported gross receipts seem low for business type.',
                fieldName: 'Gross Receipts',
                currentValue: '$25,000',
                suggestedCorrection: 'Verify business activity and income sources.',
                correctValue: '',
                status: 'Pending',
                auditTrail: [
                    { timestamp: '2025-08-24 08:00 AM', action: 'System flagged sub-issue B' }
                ]
              }
            ]
        }
    ]
  },
  {
    id: 'tax-F4562-003',
    message: 'Depreciation issues on Form 1040.',
    severity: 'High',
    status: 'Needs Clarification',
    lastSeen: '2025-08-23 03:15 PM',
    firstSeen: '2025-08-23 10:00 AM',
    occurrences: 32,
    taxpayersAffected: 10,
    formType: 'Form 1040',
    taxpayerID: '***-**-9012',
    assignedTo: 'John Smith',
    auditTrail: [
      { timestamp: '2025-08-23 10:00 AM', action: 'System flagged issue' },
      { timestamp: '2025-08-23 03:10 PM', action: 'Assigned to Examiner John Smith' }
    ],
    context: {
      depreciationClaimed: '$2,500'
    },
    schedules: [
        {
            scheduleName: "Form 1040 (Main)",
            subIssues: [
                {
                    subIssueId: 'sub-F4562-003-A',
                    subIssueMessage: 'Missing Form 4562 for depreciation claimed.',
                    fieldName: 'Depreciation (Line 12)',
                    currentValue: 'N/A (claimed $2,500)',
                    suggestedCorrection: 'Request Form 4562 from taxpayer.',
                    correctValue: '',
                    status: 'Pending',
                    auditTrail: [
                        { timestamp: '2025-08-23 10:00 AM', action: 'System flagged sub-issue A' }
                    ]
                }
            ]
        }
    ]
  },
  {
    id: 'tax-F1040-004',
    message: 'Child Tax Credit and EIC calculation errors.',
    severity: 'Medium',
    status: 'Corrected',
    lastSeen: '2025-08-22 11:00 AM',
    firstSeen: '2025-08-22 09:00 AM',
    occurrences: 5,
    taxpayersAffected: 3,
    formType: 'Form 1040',
    taxpayerID: '***-**-3456',
    assignedTo: 'Jane Doe',
    auditTrail: [
      { timestamp: '2025-08-22 09:00 AM', action: 'System flagged issue' },
      { timestamp: '2025-08-22 11:00 AM', action: 'Examiner Jane Doe marked as Corrected' }
    ],
    context: {
      numDependents: 2
    },
    schedules: [
      {
        scheduleName: "Form 1040 (Main)",
        subIssues: [
          {
            subIssueId: 'sub-F1040-004-A',
            subIssueMessage: 'Incorrect calculation of Child Tax Credit.',
            fieldName: 'Child Tax Credit (Line 19)',
            currentValue: '$4,000',
            suggestedCorrection: 'Adjust credit amount based on eligible dependents and income.',
            correctValue: '$2,000',
            status: 'Corrected',
            auditTrail: [
              { timestamp: '2025-08-22 09:00 AM', action: 'System flagged sub-issue A' },
              { timestamp: '2025-08-22 10:30 AM', action: 'Examiner Jane Doe corrected field Child Tax Credit (Line 19) to $2,000' }
            ]
          },
          {
            subIssueId: 'sub-F1040-004-B',
            subIssueMessage: 'Potentially incorrect Earned Income Credit calculation.',
            fieldName: 'Earned Income Credit',
            currentValue: '$1,500',
            suggestedCorrection: 'Review EIC worksheet based on income and family size.',
            correctValue: '$1,000',
            status: 'Corrected',
            auditTrail: [
              { timestamp: '2025-08-22 09:00 AM', action: 'System flagged sub-issue B' },
              { timestamp: '2025-08-22 10:45 AM', action: 'Examiner Jane Doe corrected field Earned Income Credit to $1,000' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'tax-F8995-005',
    message: 'QBI deduction calculation issues.',
    severity: 'Low',
    status: 'Open',
    lastSeen: '2025-08-21 07:00 PM',
    firstSeen: '2025-08-21 06:00 PM',
    occurrences: 12,
    taxpayersAffected: 7,
    formType: 'Form 8995',
    taxpayerID: '***-**-7890',
    assignedTo: 'Unassigned',
    auditTrail: [
      { timestamp: '2025-08-21 06:00 PM', action: 'System flagged issue' }
    ],
    context: {
      taxableIncome: '$180,000',
      qbi: '$50,000'
    },
    schedules: [
        {
            scheduleName: "Form 8995 (QBI Deduction)",
            subIssues: [
                {
                    subIssueId: 'sub-F8995-005-A',
                    subIssueMessage: 'Qualified Business Income (QBI) deduction calculation error.',
                    fieldName: 'QBI Deduction',
                    currentValue: '$15,000',
                    suggestedCorrection: 'Review QBI worksheet for calculation accuracy.',
                    correctValue: '',
                    status: 'Pending',
                    auditTrail: [
                        { timestamp: '2025-08-21 06:00 PM', action: 'System flagged sub-issue A' }
                    ]
                }
            ]
        }
    ]
  },
  // Form 4868 Issue
  {
    id: 'tax-F4868-006',
    message: 'Discrepancies found on Form 4868 (Application for Automatic Extension of Time To File U.S. Individual Income Tax Return).',
    severity: 'Medium',
    status: 'Open',
    lastSeen: '2025-08-24 10:15 AM',
    firstSeen: '2025-08-24 10:00 AM',
    occurrences: 5,
    taxpayersAffected: 3,
    formType: 'Form 4868',
    taxpayerID: '***-**-0001',
    assignedTo: 'Emily White',
    auditTrail: [
      { timestamp: '2025-08-24 10:00 AM', action: 'System flagged issue with Form 4868' },
      { timestamp: '2025-08-24 10:10 AM', action: 'Assigned to Examiner Emily White' }
    ],
    context: {
      extensionRequestedDate: '2025-04-14',
      originalDueDate: '2025-04-15'
    },
    schedules: [
      {
        scheduleName: "Form 4868 (Extension Application)",
        subIssues: [
          {
            subIssueId: 'sub-F4868-006-A',
            subIssueMessage: 'Estimated tax liability (Line 4) does not match supporting documentation or prior year data.',
            fieldName: 'Line 4 (Estimated tax liability)',
            currentValue: '$5,000',
            suggestedCorrection: 'Request taxpayer to provide a more accurate estimate or supporting calculations.',
            correctValue: '',
            status: 'Pending',
            auditTrail: [
              { timestamp: '2025-08-24 10:00 AM', action: 'System flagged sub-issue A' }
            ]
          },
          {
            subIssueId: 'sub-F4868-006-B',
            subIssueMessage: 'Incorrect amount paid (Line 5) for extension.',
            fieldName: 'Line 5 (Amount you are paying)',
            currentValue: '$0',
            suggestedCorrection: 'Verify payment records. Taxpayer may owe penalty for underpayment.',
            correctValue: '',
            status: 'Pending',
            auditTrail: [
              { timestamp: '2025-08-24 10:05 AM', action: 'System flagged sub-issue B' }
            ]
          }
        ]
      }
    ]
  }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedIssue, setSelectedIssue] = useState(null); // Now directly controls if detail view is active
  const [isEditingForm, setIsEditingForm] = useState(false); // New state to control full form editing mode
  const [formIssues, setFormIssues] = useState(mockFormIssues);
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterAssignedTo, setFilterAssignedTo] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 5;

  // Available Examiners for assignment
  const examiners = ['Unassigned', 'Jane Doe', 'John Smith', 'Emily White'];

  // Icons (simulated using inline SVG for a self-contained component)
  const IconLayoutDashboard = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  );
  const IconFileText = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
  );
  const IconBell = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
  );
  const IconUser = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );
  // const IconX = () => (
  //   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  // );
  const IconArrowLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
  );
  const IconArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );
  // const IconFlag = () => (
  //   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
  // );
  const IconCircleCheck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
  );
  const IconBug = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bug"><path d="m8 2h8"/><path d="m17 11v9"/><path d="m7 11v9"/><path d="m10 20h4"/><path d="M12 2v6"/><path d="M12 17v3"/><path d="M20 12v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2Z"/></svg>
  );
  const IconUserPlus = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
  );
  const IconMessageSquare = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  );
  const IconArrowUpRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
  );
  const IconChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucude-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
  );
  const IconSave = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
  );
  const IconEyeOff = () => ( // For ignoring sub-issues
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.54 18.54 0 0 1 2.21-3.02M2.38 2.38 22 22M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.54 18.54 0 0 1-2.16 3.19"/><path d="M11.2 11.2A3 3 0 0 1 15 11c.91 0 1.62.33 2.21.93"/><path d="M14.31 14.31A3.5 3.5 0 0 0 12 9.5c-1.15 0-2.07.44-2.82 1.25"/></svg>
  );
  // const IconListFilter = () => (
  //   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-filter"><path d="M3 6h18"/><path d="M7 12h10"/><path d="M10 18h4"/></svg>
  // );
  const IconEdit = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
  );


  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    setActiveTab('workRecords'); // Ensure 'workRecords' tab is active when viewing details
  };

  const clearSelectedIssue = () => {
    setSelectedIssue(null);
    setIsEditingForm(false); // Exit editing mode when clearing selected issue
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'High': return 'text-red-700 bg-red-100';
      case 'Medium': return 'text-yellow-700 bg-yellow-100';
      case 'Low': return 'text-blue-700 bg-blue-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Open': return 'text-orange-700 bg-orange-100';
      case 'Under Review': return 'text-blue-700 bg-blue-100';
      case 'Corrected': return 'text-green-700 bg-green-100';
      case 'Needs Clarification': return 'text-yellow-700 bg-yellow-100';
      case 'Pending': return 'text-gray-700 bg-gray-100'; // For sub-issues
      case 'Ignored': return 'text-slate-700 bg-slate-100'; // For sub-issues
      case 'Resolved': return 'text-green-700 bg-green-100'; // New status for main issue
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const filteredIssues = formIssues.filter(issue => {
    const matchesSeverity = filterSeverity === 'All' || issue.severity === filterSeverity;
    const matchesStatus = filterStatus === 'All' || issue.status === filterStatus;
    const matchesAssignedTo = filterAssignedTo === 'All' || issue.assignedTo === filterAssignedTo;
    const matchesSearch = issue.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          issue.taxpayerID.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesStatus && matchesAssignedTo && matchesSearch;
  });

  // Pagination logic
  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = filteredIssues.slice(indexOfFirstIssue, indexOfLastIssue);
  const totalPages = Math.ceil(filteredIssues.length / issuesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Mock data for dashboard metrics
  // const totalIssues = formIssues.length;
  const myAssignedIssues = formIssues.filter(issue => issue.assignedTo === 'Jane Doe' && (issue.status === 'Open' || issue.status === 'Under Review' || issue.status === 'Needs Clarification')).length;
  const highImpactIssues = formIssues.filter(e => e.severity === 'High' && (e.status === 'Open' || e.status === 'Under Review' || e.status === 'Needs Clarification')).length;
  const overdueIssues = formIssues.filter(e => e.status === 'Open' && new Date(e.lastSeen) < new Date('2025-08-20')).length; // Simplified overdue logic for demonstration

  // Mock data for chart (simple trend over last 7 days)
  const chartData = [
    { day: 'Day -6', issues: 20, resolvedIssues: 10 },
    { day: 'Day -5', issues: 35, resolvedIssues: 20 },
    { day: 'Day -4', issues: 28, resolvedIssues: 15 },
    { day: 'Day -3', issues: 45, resolvedIssues: 30 },
    { day: 'Day -2', issues: 60, resolvedIssues: 40 },
    { day: 'Day -1', issues: 52, resolvedIssues: 35 },
    { day: 'Today', issues: 70, resolvedIssues: 45 },
  ];

  // Component to render individual sub-issue details and correction inputs
  const SubIssueCorrection = ({ subIssue, onCorrectSubIssue, onIgnoreSubIssue }) => {
    const [correctValue, setCorrectValue] = useState(subIssue.correctValue || '');
    const isCorrected = subIssue.status === 'Corrected';
    const isIgnored = subIssue.status === 'Ignored';

    return (
      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-semibold text-gray-800 text-base flex-1 mr-4">{subIssue.subIssueMessage}</h4>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(subIssue.status)}`}>
            {subIssue.status}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
          <div>
            <p className="font-medium text-gray-600">Form Field:</p>
            <p>{subIssue.fieldName}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Current Value:</p>
            <p>{subIssue.currentValue}</p>
          </div>
          {subIssue.suggestedCorrection && (
            <div className="md:col-span-2">
              <p className="font-medium text-teal-700">Suggested Action:</p>
              <p className="text-teal-900">{subIssue.suggestedCorrection}</p>
            </div>
          )}
        </div>

        {!isCorrected && !isIgnored && (
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <input
              type="text"
              className="flex-1 p-2 rounded-md bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter correct value"
              value={correctValue}
              onChange={(e) => setCorrectValue(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={() => onCorrectSubIssue(subIssue.subIssueId, subIssue.fieldName, correctValue)}
                disabled={!correctValue.trim()}
                className="flex items-center px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <IconSave className="mr-2" /> Correct
              </button>
              <button
                onClick={() => onIgnoreSubIssue(subIssue.subIssueId)}
                className="flex items-center px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 transition-colors text-slate-800 font-medium text-sm"
              >
                <IconEyeOff className="mr-2" /> Ignore
              </button>
            </div>
          </div>
        )}

        {isCorrected && subIssue.correctValue && (
          <div className="mt-4 p-3 rounded-md bg-green-50 border border-green-200 text-green-800 text-sm">
            <p><strong className="text-green-700">Corrected to:</strong> {subIssue.correctValue}</p>
          </div>
        )}
        {isIgnored && (
            <div className="mt-4 p-3 rounded-md bg-slate-50 border border-slate-200 text-slate-800 text-sm">
                <p><strong className="text-slate-700">Status:</strong> Ignored by examiner.</p>
            </div>
        )}
      </div>
    );
  };

  const FormEditorView = ({ issue, onSaveFullForm, onCancelEdit }) => {
    const [editedSchedules, setEditedSchedules] = useState(issue.schedules);
    const [editedContext, setEditedContext] = useState(issue.context || {});

    const handleFieldChange = (scheduleName, subIssueId, fieldName, value) => {
      setEditedSchedules(prevSchedules =>
        prevSchedules.map(schedule => {
          if (schedule.scheduleName === scheduleName) {
            const updatedSubIssues = schedule.subIssues.map(subIssue =>
              subIssue.subIssueId === subIssueId
                ? { ...subIssue, [fieldName === 'message' ? 'subIssueMessage' : 'currentValue']: value }
                : subIssue
            );
            return { ...schedule, subIssues: updatedSubIssues };
          }
          return schedule;
        })
      );
    };

    const handleContextChange = (key, value) => {
      setEditedContext(prevContext => ({
        ...prevContext,
        [key]: value
      }));
    };

    const handleSave = () => {
      const updatedIssue = {
        ...issue,
        schedules: editedSchedules,
        context: editedContext,
        auditTrail: [...issue.auditTrail, { timestamp: new Date().toLocaleString(), action: 'Full form fields edited and saved.' }]
      };
      onSaveFullForm(updatedIssue);
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
          <button onClick={onCancelEdit} className="flex items-center text-teal-700 hover:text-teal-900 transition-colors">
            <IconChevronLeft className="mr-1" /> Back to Issue Details
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Edit Form: {issue.formType} - {issue.id}</h2>
        </div>

        {Object.keys(editedContext).length > 0 && (
          <div className="mb-6 border-b border-gray-200 pb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contextual Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(editedContext).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <label htmlFor={`context-${key}`} className="text-sm font-medium text-gray-700 mb-1">{key}:</label>
                  <input
                    id={`context-${key}`}
                    type="text"
                    value={value}
                    onChange={(e) => handleContextChange(key, e.target.value)}
                    className="p-2 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {editedSchedules.map(schedule => (
          <div key={schedule.scheduleName} className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">{schedule.scheduleName}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {schedule.subIssues.map(subIssue => (
                <div key={subIssue.subIssueId} className="flex flex-col">
                  <label htmlFor={`field-${subIssue.subIssueId}`} className="text-sm font-medium text-gray-700 mb-1">{subIssue.fieldName}:</label>
                  <input
                    id={`field-${subIssue.subIssueId}`}
                    type="text"
                    value={subIssue.currentValue}
                    onChange={(e) => handleFieldChange(schedule.scheduleName, subIssue.subIssueId, 'currentValue', e.target.value)}
                    className="p-2 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-end gap-3 mt-6 border-t border-gray-200 pt-6">
          <button
            onClick={onCancelEdit}
            className="flex items-center px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors text-gray-800 font-bold text-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors text-white font-bold text-lg"
          >
            <IconSave className="mr-3" /> Save All Changes
          </button>
        </div>
      </div>
    );
  };

  const IssueDetailView = ({ issue, onBackToList, onUpdateIssueStatus, onCorrectSubIssue, onIgnoreSubIssue, onEditFullForm }) => {
    const [localSchedules, setLocalSchedules] = useState(issue.schedules);
    const [activeScheduleName, setActiveScheduleName] = useState(issue.schedules[0]?.scheduleName || '');

    useEffect(() => {
        setLocalSchedules(issue.schedules);
        setActiveScheduleName(issue.schedules[0]?.scheduleName || '');
    }, [issue]);

    const getScheduleStatus = (schedule) => {
      if (!schedule || !schedule.subIssues || schedule.subIssues.length === 0) {
        return 'N/A'; // No sub-issues to fix
      }
      const allSubIssuesHandled = schedule.subIssues.every(si => si.status === 'Corrected' || si.status === 'Ignored');
      return allSubIssuesHandled ? 'Fixed' : 'Needs Fixing';
    };

    const activeSchedule = localSchedules.find(s => s.scheduleName === activeScheduleName);
    const activeScheduleStatus = getScheduleStatus(activeSchedule);
    const allSubIssues = localSchedules.flatMap(s => s.subIssues);
    const anySubIssuesPending = allSubIssues.some(si => si.status === 'Pending');

    const handleSaveAllSubIssues = () => {
        onUpdateIssueStatus(issue.id, issue.status, localSchedules);
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
          <button onClick={onBackToList} className="flex items-center text-teal-700 hover:text-teal-900 transition-colors">
            <IconChevronLeft className="mr-1" /> Back to All Work Records
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Work Record Details: {issue.id}</h2>
          <button
            onClick={() => onEditFullForm(issue)}
            className="flex items-center px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors text-blue-800 font-medium text-sm"
          >
            <IconEdit className="mr-2" /> Edit Full Record
          </button>
        </div>

        {/* Issue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border-b border-gray-200 pb-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Issue Description</p>
            <p className="font-semibold text-gray-900 text-lg">{issue.message}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Taxpayer ID</p>
            <p className="font-semibold text-gray-900">{issue.taxpayerID}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Form Type</p>
            <p className="font-semibold text-gray-900">{issue.formType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Severity</p>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getSeverityClass(issue.severity)}`}>
              {issue.severity} Impact
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(issue.status)}`}>
              {issue.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Assigned To</p>
            <p className="font-semibold text-gray-900">{issue.assignedTo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Last Updated</p>
            <p className="font-semibold text-gray-900">{issue.lastSeen}</p>
          </div>
        </div>

        {localSchedules.length > 0 && (
          <div className="mb-6 border-b border-gray-200 pb-4 flex items-center gap-3">
            <label htmlFor="schedule-select" className="block text-sm font-medium text-gray-700">View Schedule:</label>
            <div className="relative flex-1 max-w-xs">
                <select
                id="schedule-select"
                value={activeScheduleName}
                onChange={(e) => setActiveScheduleName(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md appearance-none bg-white border"
                >
                {localSchedules.map((schedule) => (
                    <option key={schedule.scheduleName} value={schedule.scheduleName}>
                      {schedule.scheduleName} ({getScheduleStatus(schedule)}) {/* Display status here */}
                    </option>
                ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
          </div>
        )}

        {/* List of Sub-Issues for Correction (for active schedule) */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Discrepancies in {activeScheduleName}
            {activeScheduleStatus !== 'N/A' && (
              <span className={`ml-3 px-3 py-1 text-sm font-semibold rounded-full ${activeScheduleStatus === 'Fixed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {activeScheduleStatus}
              </span>
            )}
          </h3>
          {activeSchedule && activeSchedule.subIssues.length > 0 ? (
            activeSchedule.subIssues.map(subIssue => (
              <SubIssueCorrection
                key={subIssue.subIssueId}
                subIssue={subIssue}
                onCorrectSubIssue={(subIssueId, fieldName, correctValue) => onCorrectSubIssue(issue.id, subIssueId, fieldName, correctValue, activeScheduleName)}
                onIgnoreSubIssue={(subIssueId) => onIgnoreSubIssue(issue.id, subIssueId, activeScheduleName)}
              />
            ))
          ) : (
            <p className="text-gray-600">No specific discrepancies identified for this schedule.</p>
          )}

            {anySubIssuesPending && (
                <button
                    onClick={handleSaveAllSubIssues}
                    className="mt-6 w-full flex items-center justify-center px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors text-white font-bold text-lg"
                >
                    <IconSave className="mr-3" /> Save All Pending Corrections
                </button>
            )}

            {!anySubIssuesPending && (
                 <button
                    onClick={() => onUpdateIssueStatus(issue.id, 'Resolved', localSchedules)}
                    className="mt-6 w-full flex items-center justify-center px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition-colors text-white font-bold text-lg"
                 >
                    <IconCircleCheck className="mr-3" /> Mark Entire Issue as Resolved
                 </button>
            )}
        </div>

        {/* Contextual Data */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2 font-medium">Contextual Data</p>
          <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-800 overflow-x-auto">
            {issue.context && Object.entries(issue.context).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
          </div>
        </div>

        {/* Audit Trail */}
        <div>
          <p className="text-sm text-gray-600 mb-2 font-medium">Audit Trail</p>
          <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap max-h-48">
            {issue.auditTrail.map((entry, index) => (
              <p key={index} className="mb-1">{entry.timestamp}: {entry.action}</p>
            ))}
          </div>
        </div>

        {/* General Action Buttons - Simplified for overall issue action */}
        <div className="p-5 border-t border-gray-200 flex flex-wrap justify-end gap-3 mt-6">
          <button className="flex items-center px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors text-gray-800 font-medium">
            <IconUserPlus className="mr-2" /> Assign To
          </button>
          <button className="flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium">
            <IconMessageSquare className="mr-2" /> Request Clarification
          </button>
          {issue.status === 'Resolved' && (
            <button className="flex items-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white font-medium">
              <IconBug className="mr-2" /> Reopen Issue
            </button>
          )}
        </div>
      </div>
    );
  };

  // Global handler to update main issue state after sub-issue changes
  const handleUpdateIssueStatus = (issueId, currentStatus, updatedSchedules, mainIssueAuditTrail) => {
    setFormIssues(prevIssues =>
      prevIssues.map(issue => {
        if (issue.id === issueId) {
          const allSubIssues = updatedSchedules.flatMap(s => s.subIssues);
          const allHandled = allSubIssues.every(si => si.status === 'Corrected' || si.status === 'Ignored');
          const newOverallStatus = allHandled ? 'Resolved' : 'Under Review';

          const newAuditTrail = [...issue.auditTrail];
          if(newOverallStatus !== currentStatus) {
              newAuditTrail.push({ timestamp: new Date().toLocaleString(), action: `Overall issue status updated to: ${newOverallStatus}` });
          }
          return { ...issue, status: newOverallStatus, schedules: updatedSchedules, auditTrail: mainIssueAuditTrail };
        }
        return issue;
      })
    );
    setSelectedIssue(null); // Return to list after saving/resolving
    alert('Issue and sub-issues updated successfully!');
  };

  // Handler for individual sub-issue correction across schedules
  const handleCorrectSubIssue = (issueId, subIssueId, fieldName, correctValue, scheduleName) => {
    setFormIssues(prevIssues =>
      prevIssues.map(issue => {
        if (issue.id === issueId) {
          const updatedSchedules = issue.schedules.map(schedule => {
            if (schedule.scheduleName === scheduleName) {
              const updatedSubIssues = schedule.subIssues.map(si => {
                if (si.subIssueId === subIssueId) {
                  const newAuditTrail = [...si.auditTrail, { timestamp: new Date().toLocaleString(), action: `Field '${fieldName}' corrected to '${correctValue}' on ${scheduleName}.` }];
                  return { ...si, correctValue, status: 'Corrected', auditTrail: newAuditTrail };
                }
                return si;
              });
              return { ...schedule, subIssues: updatedSubIssues };
            }
            return schedule;
          });

          const allSubIssues = updatedSchedules.flatMap(s => s.subIssues);
          const allHandled = allSubIssues.every(si => si.status === 'Corrected' || si.status === 'Ignored');
          const newOverallStatus = allHandled ? 'Resolved' : 'Under Review';

          const mainIssueAuditTrail = [...issue.auditTrail];
          if(newOverallStatus !== issue.status) {
              mainIssueAuditTrail.push({ timestamp: new Date().toLocaleString(), action: `Main issue status changed to: ${newOverallStatus}` });
          }

          return { ...issue, status: newOverallStatus, schedules: updatedSchedules, auditTrail: mainIssueAuditTrail };
        }
        return issue;
      })
    );
  };

  // Handler for individual sub-issue ignore across schedules
  const handleIgnoreSubIssue = (issueId, subIssueId, scheduleName) => {
    setFormIssues(prevIssues =>
      prevIssues.map(issue => {
        if (issue.id === issueId) {
          const updatedSchedules = issue.schedules.map(schedule => {
            if (schedule.scheduleName === scheduleName) {
              const updatedSubIssues = schedule.subIssues.map(si => {
                if (si.subIssueId === subIssueId) {
                  const newAuditTrail = [...si.auditTrail, { timestamp: new Date().toLocaleString(), action: `Sub-issue '${si.subIssueMessage}' ignored by examiner on ${scheduleName}.` }];
                  return { ...si, status: 'Ignored', auditTrail: newAuditTrail };
                }
                return si;
              });
              return { ...schedule, subIssues: updatedSubIssues };
            }
            return schedule;
          });

          const allSubIssues = updatedSchedules.flatMap(s => s.subIssues);
          const allHandled = allSubIssues.every(si => si.status === 'Corrected' || si.status === 'Ignored');
          const newOverallStatus = allHandled ? 'Resolved' : 'Under Review';

          const mainIssueAuditTrail = [...issue.auditTrail];
          if(newOverallStatus !== issue.status) {
              mainIssueAuditTrail.push({ timestamp: new Date().toLocaleString(), action: `Main issue status changed to: ${newOverallStatus}` });
          }

          return { ...issue, status: newOverallStatus, schedules: updatedSchedules, auditTrail: mainIssueAuditTrail };
        }
        return issue;
      })
    );
  };

  // Handler for saving the full form from FormEditorView
  const handleSaveFullForm = (updatedIssue) => {
    setFormIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === updatedIssue.id ? updatedIssue : issue
      )
    );
    setIsEditingForm(false);
    setSelectedIssue(updatedIssue);
    alert('Full form fields saved successfully!');
  };

  const navigateToWorkRecordsWithFilters = (severity = 'All', status = 'All', assignedTo = 'All') => {
    setActiveTab('workRecords');
    setFilterSeverity(severity);
    setFilterStatus(status);
    setFilterAssignedTo(assignedTo);
    setSelectedIssue(null); // Ensure no detail view is open
    setCurrentPage(1); // Reset pagination
  };


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-inter antialiased flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-teal-700">IRS Error Resolution System</h1>
          <nav className="hidden sm:flex space-x-4 ml-8">
            <button
              onClick={() => { setActiveTab('dashboard'); setSelectedIssue(null); setIsEditingForm(false); }}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'dashboard' && !selectedIssue && !isEditingForm ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <IconLayoutDashboard />
              <span className="ml-2">Dashboard</span>
            </button>
            <button
              onClick={() => { setActiveTab('workRecords'); setSelectedIssue(null); setIsEditingForm(false); }}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'workRecords' && !selectedIssue && !isEditingForm ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <IconFileText />
              <span className="ml-2">Work Records</span>
            </button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900">
            <IconBell />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
              <IconUser />
            </div>
            <span className="hidden md:block text-sm text-gray-800">Examiner Jane Doe</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {selectedIssue && isEditingForm ? (
            <FormEditorView
                issue={selectedIssue}
                onSaveFullForm={handleSaveFullForm}
                onCancelEdit={() => setIsEditingForm(false)}
            />
        ) : selectedIssue ? (
          <IssueDetailView
            issue={selectedIssue}
            onBackToList={clearSelectedIssue}
            onUpdateIssueStatus={handleUpdateIssueStatus}
            onCorrectSubIssue={handleCorrectSubIssue}
            onIgnoreSubIssue={handleIgnoreSubIssue}
            onEditFullForm={(issueToEdit) => { setSelectedIssue(issueToEdit); setIsEditingForm(true); }}
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <section className="dashboard-view">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Your Work Overview</h2>

                {/* Quick Actions / Important Metrics - Enhanced Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* My Open Issues Card */}
                  <div
                    className="bg-white rounded-xl p-6 shadow-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 ease-out cursor-pointer border-l-8 border-teal-600"
                    onClick={() => navigateToWorkRecordsWithFilters('All', 'Open', 'Jane Doe')}
                  >
                    <p className="text-sm text-gray-700 mb-3 font-medium">My Open Issues</p>
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-5xl font-extrabold text-teal-700 animate-fade-in">{myAssignedIssues}</h3>
                        <p className="text-xs text-teal-800 flex items-center font-semibold ml-4 whitespace-nowrap hover:underline">
                            <IconArrowUpRight className="mr-2 h-4 w-4" /> View tasks
                        </p>
                    </div>
                  </div>
                  {/* High Impact Issues Card */}
                  <div
                    className="bg-white rounded-xl p-6 shadow-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 ease-out cursor-pointer border-l-8 border-red-600"
                    onClick={() => navigateToWorkRecordsWithFilters('High', 'Open')} // Show high impact and open
                  >
                    <p className="text-sm text-gray-700 mb-3 font-medium">High Impact Issues</p>
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-5xl font-extrabold text-red-700 animate-fade-in">{highImpactIssues}</h3>
                        <p className="text-xs text-red-800 flex items-center font-semibold ml-4 whitespace-nowrap hover:underline">
                            <IconArrowUpRight className="mr-2 h-4 w-4" /> Action needed
                        </p>
                    </div>
                  </div>
                  {/* Total Issues Today Card */}
                  <div
                    className="bg-white rounded-xl p-6 shadow-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 ease-out cursor-pointer border-l-8 border-blue-600"
                    onClick={() => navigateToWorkRecordsWithFilters()} // For simplicity, just navigate to all records
                  >
                    <p className="text-sm text-gray-700 mb-3 font-medium">New Issues Today</p>
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-5xl font-extrabold text-blue-700 animate-fade-in">{chartData[chartData.length - 1].issues}</h3>
                        <p className="text-xs text-blue-800 flex items-center font-semibold ml-4 whitespace-nowrap hover:underline">
                            <IconArrowUpRight className="mr-2 h-4 w-4" /> Recently flagged
                        </p>
                    </div>
                  </div>
                  {/* Overdue Tasks Card */}
                  <div
                    className="bg-white rounded-xl p-6 shadow-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 ease-out cursor-pointer border-l-8 border-orange-600"
                    onClick={() => navigateToWorkRecordsWithFilters('All', 'Open')} // Navigate to open issues, user can refine by date
                  >
                    <p className="text-sm text-gray-700 mb-3 font-medium">Overdue Tasks</p>
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-5xl font-extrabold text-orange-700 animate-fade-in">{overdueIssues}</h3>
                        <p className="text-xs text-orange-800 flex items-center font-semibold ml-4 whitespace-nowrap hover:underline">
                            <IconArrowUpRight className="mr-2 h-4 w-4" /> Review deadlines
                        </p>
                    </div>
                  </div>
                </div>

                {/* Charts: Daily Issue Volume & Daily Issues Resolved */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Daily Issue Volume Chart */}
                  <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Issue Volume</h3>
                    {/* This is a simplified chart visualization. In a real app, recharts or chart.js would be used */}
                    <div className="h-56 flex items-end justify-between px-2 pb-2 pt-8 relative">
                      <div className="absolute top-0 left-0 right-0 h-full w-full border-b border-l border-gray-300"></div>
                      {chartData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center flex-1 mx-1 z-10">
                          <div
                            className="bg-teal-500 rounded-t-md w-full hover:bg-teal-400 transition-colors"
                            style={{ height: `${data.issues * 0.65}px`, maxHeight: '100%' }}
                            title={`${data.issues} issues`}
                          ></div>
                          <span className="text-xs text-gray-600 mt-2">{data.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Daily Issues Resolved Chart */}
                  <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Issues Resolved</h3>
                    {/* This is a simplified chart visualization. In a real app, recharts or chart.js would be used */}
                    <div className="h-56 flex items-end justify-between px-2 pb-2 pt-8 relative">
                      <div className="absolute top-0 left-0 right-0 h-full w-full border-b border-l border-gray-300"></div>
                      {chartData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center flex-1 mx-1 z-10">
                          <div
                            className="bg-green-500 rounded-t-md w-full hover:bg-green-400 transition-colors"
                            style={{ height: `${data.resolvedIssues * 0.65}px`, maxHeight: '100%' }}
                            title={`${data.resolvedIssues} issues resolved`}
                          ></div>
                          <span className="text-xs text-gray-600 mt-2">{data.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* My Recent Issues List */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">My Recent Work Records</h3>
                  <ul className="divide-y divide-gray-200">
                    {formIssues.filter(issue => issue.assignedTo === 'Jane Doe').slice(0, 3).map(issue => (
                      <li
                        key={issue.id}
                        className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                        onClick={() => handleIssueClick(issue)}
                      >
                        <div className="flex-1 truncate">
                          <p className="font-medium text-gray-900 truncate">{issue.message}</p>
                          <p className="text-xs text-gray-600">{issue.status} - {issue.taxpayerID}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityClass(issue.severity)}`}>
                          {issue.severity}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigateToWorkRecordsWithFilters('All', 'All', 'Jane Doe')}
                    className="mt-4 w-full text-center py-2 px-4 rounded-md bg-teal-600 hover:bg-teal-700 transition-colors text-white font-medium"
                  >
                    View All My Work Records
                  </button>
                </div>
              </section>
            )}

            {activeTab === 'workRecords' && (
              <section className="work-records-list-view">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">All Work Records</h2>

                {/* Filters and Search */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  <div className="relative col-span-1 sm:col-span-2 lg:col-span-2">
                    <input
                      type="text"
                      placeholder="Search by issue, ID, or Taxpayer ID..."
                      className="w-full pl-4 pr-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 h-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 h-10"
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                  >
                    <option value="All">All Severity</option>
                    <option value="High">High Impact</option>
                    <option value="Medium">Medium Impact</option>
                    <option value="Low">Low Impact</option>
                  </select>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 h-10"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Open">Open</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Corrected">Corrected</option>
                    <option value="Needs Clarification">Needs Clarification</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 h-10"
                    value={filterAssignedTo}
                    onChange={(e) => setFilterAssignedTo(e.target.value)}
                  >
                    <option value="All">All Examiners</option>
                    {examiners.map(examiner => (
                      <option key={examiner} value={examiner}>{examiner}</option>
                    ))}
                  </select>
                </div>

                {/* Form Issues Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Issue Description
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Severity
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Assigned To
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Taxpayer ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Last Seen
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentIssues.length > 0 ? (
                          currentIssues.map((issue) => (
                            <tr
                              key={issue.id}
                              className="hover:bg-gray-50 cursor-pointer transition-colors"
                              onClick={() => handleIssueClick(issue)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-xs truncate">
                                {issue.message}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityClass(issue.severity)}`}>
                                  {issue.severity}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(issue.status)}`}>
                                  {issue.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {issue.assignedTo}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {issue.taxpayerID}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {issue.lastSeen}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-600">
                              No work records found matching your criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                      <div className="flex-1 flex justify-between sm:hidden">
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <IconArrowLeft /> Previous
                        </button>
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next <IconArrowRight />
                        </button>
                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-600">
                            Showing <span className="font-medium">{indexOfFirstIssue + 1}</span> to <span className="font-medium">{Math.min(indexOfLastIssue, filteredIssues.length)}</span> of{' '}
                            <span className="font-medium">{filteredIssues.length}</span> results
                          </p>
                        </div>
                        <div>
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                              onClick={() => paginate(currentPage - 1)}
                              disabled={currentPage === 1}
                              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <span className="sr-only">Previous</span>
                              <IconArrowLeft />
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                              <button
                                key={i}
                                onClick={() => paginate(i + 1)}
                                aria-current={currentPage === i + 1 ? 'page' : undefined}
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                                  currentPage === i + 1 ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {i + 1}
                              </button>
                            ))}
                            <button
                              onClick={() => paginate(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <span className="sr-only">Next</span>
                              <IconArrowRight />
                            </button>
                          </nav>
                        </div>
                      </div>
                    </nav>
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
