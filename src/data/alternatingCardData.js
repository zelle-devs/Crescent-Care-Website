// ==================== ALTERNATING CARD SECTION DATA ====================

export const mailroomSection = {
  title: 'Mailroom / Document Management',
  description: '',   // Optional intro paragraph
  cards: [
    {
      id: 'mailroom',
      image: '/Services/cards/1.jpg',
      imageAlt: 'Mailroom',
      title: 'Mailroom',
      description:
        "Customers send documents in bulk and reduce mailroom costs by routing mail directly to Crescent Care’s post office box. Crescent Care’s mailroom service frees customers from the headaches of opening and sorting, enabling them to benefit from naturally occurring economies of scale and making this process automated.",
      gradient: 'green-blue',   // Predefined gradients
      imagePosition: 'left',     // 'left' | 'right'
    },
    {
      id: 'management-document',
      image: '/Services/cards/2.jpg',
      imageAlt: 'Management Document',
      title: 'Management Document',
      description:
        'After preparing and classifying the document, they are sent to the scanner. The scanner can print a document control number (usually the date followed by a sequential number) on each page that passes through the scanner. This embossing feature eliminates the need to manually date stamp each document.',
      gradient: 'blue-green',
      imagePosition: 'left',
    },
  ],
};

export const policyAdminSection = {
  title: 'Policy Administration',
  description:<>The Customer/insurer/policyholder details are entered in the Crescent Care application system. After carefully checking the uploaded data, the insured person’s health insurance cards are printed.<br/><br/>Policy administration includes appropriate additions, deletions, and changes to policy benefits and coverage throughout the year. 24/7 call center service is available to provide support and handle insured inquiries.</>,
  cards: [
    {
      id: 'utilization-management',
      image: '/Services/cards/3.jpg',
      imageAlt: 'Utilization Management',
      title: 'Utilization Management',
      description:
        'The network claims pre -approved services for elective treatments and surgeries . Review claims and coordinate with physicians, hospitals and other providers within & outside the network to determine the appropriate level of benefit consumption under policy/privilege terms as per client protocol and established guidelines.',
      gradient: 'green-blue',
      imagePosition: 'left',
    },
    {
      id: 'case-management',
      image: '/Services/cards/4.jpg',
      imageAlt: 'Case Management',
      title: 'Case Management',
      description:
        'We employ a gatekeeper approach of advising patients and assisting qualified physicians as case managers to direct the services they need, ensuring the quality of care provided to our members and its cost effectiveness. Expert case managers monitor members’ well -being from admission to discharge and manage unnecessary tests, medications and malpractice.',
      gradient: 'blue-green',
      imagePosition: 'left',
    },
     {
      id: 'claims-management',
      image: '/Services/cards/5.jpg',
      imageAlt: 'Claims Management',
      title: 'Claims Management',
      description:
        'Our service strives for a complete implementation of an automated end-to-end process flow until successful claim settlement. The aim of the current medical scrutiny done at CC to identify some of the points listed below: Inappropriate billing pattern, Detection of customary overcharge, Duplicate billing detection, Visiting Doctor charges, Fee schedule, Verification of pharmacy and investigation bills for reasonableness, To filter unnecessary admissions, To monitor length of stays, Necessity of hospitalization',
      gradient: 'green-blue',
      imagePosition: 'left',
    },
    {
      id: 'insurers-and-partners',
      image: '/Services/cards/6.jpg',
      imageAlt: 'Insurers and Partners',
      title: 'Insurers and Partners',
      description:
        'Crescent Care Services Healthcare policies are tailored to the needs of the customer/insurer. CC can also assist clients/insurers in designing healthcare plans with their needs in mind. By working with existing policies, CC allows clients to monitor medical policies without interfering with daily administrative processes.',
      gradient: 'blue-green',
      imagePosition: 'left',
    },
  ],
};

export const MISReporting = {
  title: 'MIS Reporting',
  description:'Crescent Care can create customizable MIS reports for their customers. With the latest software available, CC can produce a variety of regular MIS reports according to standard protocols and customer requirements. A sophisticated MIS system with CC enables all customer service representatives to provide customers with the information they need to reach their goals.',
  cards: [
    {
      id: 'reports',
      image: '/Services/cards/7.jpg',
      imageAlt: 'Reports',
      title: 'Reports',
      description:
        'Call history report, Benefit redemption report, Pre-approval detail report, Billing Detail Report, Disease trends report, Group overview report, Other reports as per the mutual agreement',
      gradient: 'green-blue',
      imagePosition: 'left',
    },
    {
      id: 'value-added-services',
      image: '/Services/cards/8.jpg',
      imageAlt: 'Value Added Services',
      title: 'Value Added Services',
      description:
        'Disease management, Preventive care programs, Advanced case management, Provider network management, Product development, Other value additions as per understanding.',
      gradient: 'blue-green',
      imagePosition: 'left',
    }
  ],
};


// Predefined gradients for cards
export const gradientPresets = {
  'green-blue': 'linear-gradient(135deg, #397E3F 0%, #244098 100%)',
  'blue-green': 'linear-gradient(135deg, #244098 0%, #397E3F 100%)',
  'blue': 'linear-gradient(135deg, #244098 0%, #5269B0 100%)',
  'green': 'linear-gradient(135deg, #397E3F 0%, #4ec058 100%)',
  'red': 'linear-gradient(135deg, #D73E2A 0%, #B83223 100%)',
  'dark': 'linear-gradient(135deg, #1B3073 0%, #244098 100%)',
};

export default mailroomSection;