// ==================== COMPLAINT SECTION DATA ====================

export const complaintData = {
  title: 'How Can I File a Complaint with Crescent Care?',
  
  // Content blocks - render in order
  // Types: 'paragraph' | 'list' | 'link' | 'email' | 'line'
  blocks: [
    {
      type: 'paragraph',
      text: 'At Crescent Care, we do our best to provide you with the highest level of customer service. However, sometimes things can go wrong and you may want to complain about it.',
    },
    {
      type: 'paragraph',
      text: 'Most issues are resolved immediately, so please try to contact our call centre first.',
    },
    {
      type: 'paragraph',
      text: 'To submit your complaint, you can:',
    },
    {
      type: 'list',
      items: [
        'Fill out the form on this page',
        'Send it on the Crescent Care App: click on Send Inquiry -> Inquiry Type -> Complaint',
      ],
    },
    {
      type: 'paragraph',
      text: 'Please be clear and specific in your information, and mention your national ID number or insurance policy number for easy tracking.',
    },
    {
      type: 'paragraph',
      text: 'Once you submit your complaint, we will contact you within one working day to provide you with a Complaint Reference Number. We will then proceed with our investigation and revert to you within a maximum of 5 working days.',
    },
    {
      type: 'paragraph',
      text: 'However, if you are dissatisfied with the response or you feel that your issue requires escalation, you may contact our management level on the below email',
    },
    {
      type: 'email',
      email: 'complaint@crescentcare.pk',
      href: 'mailto:complaint@crescentcare.pk',
    },
    {
      type: 'paragraph',
      text: 'Please provide the Complaint Reference Number and other relevant details to assist our management team in investigating your complaint and responding to you within 1 working day.',
    },
    {
      type: 'paragraph-with-link',
      text: 'Click ',
      link: {
        label: 'here',
        href: 'https://crescentcare.pk/wp-content/uploads/2024/07/Compalint-Procedure-Chart.pdf',
        target: '_blank',
        bold: true,
      },
      textAfter: ' to view our complaints process flowchart.',
    },
  ],
};

export default complaintData;