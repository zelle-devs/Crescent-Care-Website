// ==================== FAQ DATA ====================
// 
// Structure:
// - categories: Array of tab data
//   - id: unique key
//   - label: Tab button text
//   - questions: Array of questions
//     - id: unique key
//     - question: Question text
//     - answer: Can be STRING | ARRAY (list) | JSX
//     - answerType: 'text' | 'list' | 'html'

export const faqCategories = [
  {
    id: 'policy-coverage',
    label: 'Policy & Coverage',
    questions: [
      {
        id: 'q1',
        question: 'Is Crescent Care my insurance company?',
        answerType: 'text',
        answer:
          'No, Crescent is a TPA (Third Party Administrator) that provides third-party administration services for insurers and other payers of healthcare.',
      },
      {
        id: 'q2',
        question: 'What is a “Digital Insurance Card”?',
        answerType: 'text',
        answer:
          'A Digital Insurance Card is an electronic version of your insurance card, accessible via the Crescent Care App.You can view and download it from the app from the “Coverage” section.',
      },
      {
        id: 'q3',
        question: 'How can I access my policy details?',
        answerType: 'text',
        answer:
          'Once you log into the Crescent Care App, you can access the “Coverage” section and view all policy details and benefits.',
      },
      {
        id: 'q4',
        question: 'How can I access the policy benefits of my family members?',
        answerType: 'text',
        answer:
          'On the Crescent Care App, you can access the policy benefits of your family members that are under the age of 18. As for the members who are above the age of 18, they have to register and create their own account on the app.',
      },
      {
        id: 'q5',
        question: 'In which countries can I receive treatment?',
        answerType: 'text',
        answer:'You can receive treatment in any country within your area of cover, as shown in your policy benefits.If the treatment you need is available locally but you choose to travel to another country in your area of cover, we will reimburse all eligible medical costs incurred according to the terms of your policy, except for your travel expenses.'
      },
      {
        id: 'q6',
        question: "What's the scope of my cover?",
        answerType: 'text',
        answer:
          <>You can confirm the scope of your cover by checking your Policy Benefits section in the app.<br/>The definitions, exclusions and all other terms and conditions of your policy are detailed in your “Coverage” section in the Crescent Care App. Simply log in, click on the “Coverage” tab and vide the needed details.</>,
      },
      {
        id: 'q7',
        question: 'What is a geographical location of cover?',
        answerType: 'text',
        answer:
        <>This is the geographical territory where your cover is valid. We offer multiple geographical area of cover options – please check your policy benefits to confirm which one applies to you and under which terms.<br/>This is also coupled with the Network tab, identifying which service providers are covered.</>
    },
      {
        id: 'q8',
        question: 'What do I do if I need treatment outside my geographical location of cover?',
        answerType: 'text',
        answer:
        <>If you require treatment outside the area of cover indicated in your policy benefits, you may still be covered if the “Emergency treatment outside area of cover” is listed in your policy.<br/>This benefit provides cover for medical emergencies which occur during business or holiday trips outside your area of cover. In most cases, cover is provided up to a maximum period per trip and up to the maximum benefit amount (indicated in your policy benefits) and includes treatment required due to an accident or the sudden beginning or worsening of a severe illness which presents an immediate threat to your health.<br/>Treatment by a doctor must start within 24 hours of the emergency event. Cover is not provided for curative or follow-up on-emergency treatment, even if you are deemed unable to travel to a <br/>country within your geographical area of cover. Furthermore, the cover doesn’t include the charges relating to maternity, pregnancy, childbirth or any complications of pregnancy or childbirth.<br/>If you are covered under a group scheme, you must inform your company’s Group Scheme Manager if you are moving outside your area of cover for more than six weeks. If you are not part of standard policy, you might have a different submission period. Please check the guidelines with the Care Center.<br/>Check your area of cover and maximum benefit amount on the Crescent Care App. Simply log in and click on “Coverage” tab.</>
    },
     {
        id: 'q9',
        question: 'Does my policy cover pre-existing conditions?',
        answerType: 'text',
        answer:
        <>If you are covered under a group scheme or with an individual policy we generally cover pre-existing conditions (including pre-existing chronic conditions) unless we say otherwise in your policy
documents. If in doubt, please check your policy benefits to confirm if pre-existing conditions are covered.<br/>You can access your policy benefits via the Crescent Care App. Simply log in and click on “Benefits”.</>
    },
     {
        id: 'q10',
        question: 'What do I do in case of an emergency?',
        answerType: 'text',
        answer:
        'Seek assistance at the nearest medical facility and contact the Crescent Care local Call Center number available on the back of your insurance card, so that we may provide assistance and clarify procedures.'
    },
     {
        id: 'q11',
        question: 'Can I upgrade or downgrade my level of cover?',
        answerType: 'text',
        answer:
        <>If you have an individual policy and want to change your level of cover, please contact your insurance company before your policy renewal date to discuss your options, as changes to the level of cover can only be made at policy renewal.<br/>If you are covered under a group scheme plan the level of cover was decided by your company, therefore if you want to discuss any change you must contact your group administration or Human Resources.</>
    },
    ],
  },
  {
    id: 'digital-service',
    label: 'Digital Service',
    questions: [
      {
        id: 'd1',
        question: 'What is Crescent Care App?',
         answerType: 'mixed',
  intro: 'Crescent Care App is a mobile app that was designed to help our insured members manage their claims and their health.',
  paragraphs: [
    'With Crescent Care App, you can:',
  ],
  list: [
    'access digital insurance card',
    'view your policy benefits and issue certificate',
    'check your symptoms',
    'have a video consultation with a doctor',
    'search for a healthcare provider and book an appointment',
    'submit and track your medical claims',
    'get virtual assistance',
  ],
  outro: 'To start using Crescent Care App, you need to download it on your mobile from your app store, click on Register and follow the on-screen instructions.',
      },
      {
        id: 'd2',
        question: 'Do I need my insurance card number to register on the Crescent Care App?',
        answerType: 'text',
        answer: 'To register, you only need an email address. Once you create the account, you will need to link it to your insurance policy using either your national ID number, insurance card number or Member ID.',
      },
      {
        id: 'd3',
        question: 'Can I register on the Crescent Care App using my national ID?',
        answerType: 'text',
        answer:
          'It depends on the country where you are insured. Registration can be done using the national ID, insurance card number, or member unique number, depending on the country of your insurance company.',
      },
      {
        id: 'd4',
        question: 'I’m not receiving the one-time-password (OTP) when adding my email address. What shall I do?',
        answerType: 'list',
        answer:[
             'Make sure you are connected to the internet.',
          'Make sure are using your correct email address. Please note that some company emails are restricted from receiving external emails for privacy reasons. If this is the case, please enter a personal email address.',
          'Check the spam folder in your emails.',
          'Try re-submitting the OTP.',
          'If none of the above steps work, please contact our support team at hello@crescentcare.pk',
          ]
    },
     {
        id: 'd5',
        question: 'I’m not receiving the one-time-password (OTP) when adding my email address. What shall I do?',
        answerType: 'mixed',
        answer:[
             'Make sure you are connected to the internet.',
          'Make sure you have input the correct mobile number.',
          'Try re-submitting the OTP.',
          'Ensure that the contact number is not “opted out” based on the SMS status from the service provider. If it is, try to set another number which is not “opted out”.',
          ],
          outro:'If none of the above steps work, please send an email about it to hello@crescentcare.pk'
    },
    {
        id: 'd6',
        question: 'I’m not able to log into the Crescent Care App. What should I do?',
        answerType: 'list',
        answer:[
             'Make sure you are using the correct email address and password that you had registered with.',
          'Make sure you are connected to the internet.',
          'Refer to the error message that is displayed on Lumi app interface explaining the reason why you are unable to log in.',
          'If the above 3 steps do not work, please contact our support team at hello@crescentcare.pk for assistance.',
          ],
    },
     {
        id: 'd7',
        question: 'I forgot the password of the Crescent Care App. What should I do?',
        answerType: 'text',
        answer:'You can easily and securely reset your password via the app. On the login screen, click on “Forgot Password” and follow the instructions. Please note that if you enter an incorrect OTP code while resetting your password, you will get a message saying “You are not authorized to change the password”. So please try again and ensure you enter the correct OTP received.',
    },
      {
        id: 'd8',
        question: 'Can I log into the Crescent Care App without internet?',
        answerType: 'text',
        answer:'No, you need to be connected to the internet in order to verify your credentials and log in.',
    },
    {
        id: 'd9',
        question: 'I don’t receive any push notifications or status updates. What should I do?',
        answerType: 'list',
        answer:[
            'Make sure you are connected to the internet.',
            'From your mobile device settings, make sure push notifications are turned on for Crescent Care App.',
        ],
    },
    {
        id: 'd10',
        question: 'Symptom Checker: How can I use this service?',
        answerType: 'text',
        answer:'Our Symptom Checker is available on the Crescent Care App. It gives you a preliminary evaluation of your symptoms after completing a few questions about your medical condition. This feature is accessible to some users, depending on their insurance policy benefits.',
    },
    {
        id: 'd11',
        question: 'What is a “telehealth”?',
        answerType: 'text',
        answer:<>Telehealth is a consultation service connecting patients with specialized doctors via video. The service is operated by Health at Hand, a UAE duly licensed telehealth provider.<br/>Crescent Care provides this service via Telehealth on the Crescent Care App. This feature is accessible to some users, depending on their insurance policy benefits.</>,
    },
    {
        id: 'd12',
        question: 'When can I use the telehealth service?',
        answerType: 'text',
        answer:'A telehealth doctor can give you medical advice and recommend treatments for non-emergency medical conditions, such as cough, cold, sore throat, headache, eye infection, urinary infection, diarrhea, earache, sinus congestion, indigestion, rashes, etc.The service is available to all insured members on the Crescent Care App via Telehealth from Sunday to Friday: 7am – 11pm and Saturday from 9am to 6pm (GST).',
    },
    {
        id: 'd13',
        question: 'Can I obtain a prescription after a telehealth service?',
        answerType: 'text',
        answer:<>Within the UAE, the telehealth doctor will determine the prescription you require. Right after a teleconsultation, you will receive your medical report on the Lumi app. You will be able to access the details of the prescription and an e-Prescription Number (e-RX). Pharmacies within your network will be able to retrieve it.<br/>Please note that prescription acceptance outside the UAE is subject to local regulations. Your policy’s terms and conditions apply to the prescriptions received and will only be covered if they are included in your benefits.<br/>If your policy requires that you have a consultation via a dedicated phone line, you will receive the report via SMS as a link that is password protected.</>,
    },
    {
        id: 'd14',
        question: 'Guided Care: What does it mean for Crescent Care insured members?',
        answerType: 'text',
        answer:<>If the policy includes the Guided Care service, the member will need to first have a consultation with a primary care physician via the Telehealth service on the Crescent Care App or via a dedicated phone line. There is no co-pay for these consultations, and they are available 7 days a week. The doctor will, if required, issue a referral to a specialist.<br/>If the insured member forgets to contact the primary care physician before visiting the hospital/clinic, they will be asked by the hospital/clinic to complete the video consultation and obtain a referral before proceeding with a physical consultation.<br/>In case of a life-threatening emergency, insured members may proceed directly to the Emergency Department. There is no need to see a primary care physician or obtain a referral.</>,
    },
    {
        id: 'd15',
        question: 'What can the virtual assistant do for me?',
        answerType: 'text',
        answer:<>If the policy includes the Guided Care service, the member will need to Zoe can help you find your covered medical providers and facilities near you, connect you with a licensed doctor on the mobile app, follow up on submitted reimbursement claims and transfer to our agents, when required.first have a consultation with a primary care physician via the Telehealth service on the Crescent Care App or via a dedicated phone line. There is no co-pay for these consultations, and they are available 7 days a week. The doctor will, if required, issue a referral to a specialist.<br/>If the insured member forgets to contact the primary care physician before visiting the hospital/clinic, they will be asked by the hospital/clinic to complete the video consultation and obtain a referral before proceeding with a physical consultation.<br/>In case of a life-threatening emergency, insured members may proceed directly to the Emergency Department. There is no need to see a primary care physician or obtain a referral.</>,
    },
    ],
  },
  {
    id: 'managing-policy',
    label: 'Managing Policy',
    questions: [
      {
        id: 'm1',
        question: 'How can I update my personal details that you hold on record for me?',
        answerType: 'text',
        answer:
          <>Now you can update your personal information such as home or business address, email address or telephone number via the Crescent Care App. Simply log in and click on your profile icon located on the top right corner of the home screen, then proceed to change your details under Account Settings section.<br/>It is important to keep your details updated to help us stay in touch with you when needed.</>,
      },
      {
        id: 'm2',
        question: 'What is a “Digital Insurance Card”?',
        answerType: 'text',
        answer:
          <>Digital Insurance Card is an electronic version of your insurance card, accessible via the Crescent Care App.<br/>You can view and download it from the Crescent Care app, by visiting the “Coverage” section.</>,
      },
      {
        id: 'm3',
        question: 'Can I access the Digital Insurance Card of my family member?',
        answerType: 'text',
        answer:
          'You can access the Digital Insurance Card of your family members by visiting the “Coverage” section in the app.',
      },
       {
        id: 'm4',
        question: 'What is an “insurance certificate”?',
        answerType: 'text',
        answer:
          'An insurance certificate is a document that provides information about a specific insurance coverage, such as verification of the insurance, information on the type and the limitations of the coverage, details of your insurance company, your policy number, your insured member name and the insurance policy effective periods.',
      },
       {
        id: 'm5',
        question: 'How can I issue an insurance certificate from the app?',
        answerType: 'text',
        answer:
          'The insurance certificate can be downloaded from the Crescent Care App. Simply click on “Coverage tab on the home screen, then visit the “Documents” section to download the needed certificate. If you are unable to download it from the app, please contact your insurance company.',
      },
       {
        id: 'm6',
        question: 'Can I issue an insurance certificate for my family members?',
        answerType: 'text',
        answer:
          <>For family members who are below the age of 18, you can issue an insurance certificate on their behalf, by default.<br/>As for the members who are above the age of 18, they have to register and create their own account on the app.</>,
      },
       {
        id: 'm7',
        question: 'What can I action on a family member’s account on the Crescent Care app?',
        answerType: 'mixed',
        intro: 'You can action the following (applicable only for family members under the age of 18):',
        answer:[
          'Access his/her Digital Insurance Card',
          'View his/her medical claims history',
          'Submit reimbursement claims on his/her behalf',
          'View his/her policy benefits',
          'Issue insurance certificates on his/her behalf',
      ]
        },
       {
        id: 'm8',
        question: 'Can I access all my policies from the same account on the Crescent Care app?',
        answerType: 'text',
        answer:
          'Yes. Open the side bar menu (by clicking on your profile icon from the top right of the app), then click on the button that if below your email address (in the side bar menu). Then you will be able to view the detected policies linked to your account. If you are not able to view all of your policies , please contact us by submitting an inquiry.',
      },
 {
        id: 'm9',
        question: 'How can I add family members / newborn under my policy?',
        answerType: 'text',
        answer:
        <>If you have an individual policy, please contact your insurance company and provide them with the required details. The coverage will be subsequently added after receiving instructions from your insurance company.<br/>If you are covered under a group scheme plan, please contact your group administration or Human Resources with details and the coverage will be subsequently added after receiving instructions from your insurance company.</>
    },

    ],
  },
  {
    id: 'getting-treatment',
    label: 'Getting Treatment',
    questions: [
      {
        id: 't1',
        question: 'What does “healthcare provider” mean?',
        answerType: 'text',
        answer:
          'A healthcare provider is any entity that possesses the legal right to provide medical services or products (e.g. hospitals, clinics, laboratories and pharmacies).',
      },
      {
        id: 't2',
        question: 'What does “covered healthcare providers” mean?',
        answerType: 'text',
        answer: 'This means that these healthcare providers are covered under your policy, so you can benefit from direct settlement of bills when presenting your insurance card.',
      },
      {
        id: 't3',
        question: 'Can I visit a provider outside my network?',
        answerType: 'text',
        answer: <>Yes, you can only if, as per your Insurance Policy Terms and Conditions, you are allowed to use a non-network provider for eligible services. However, this is not recommended, as you will be required to pay all bills and then claim back eligible amounts.<br/>To submit a Reimbursement Claim, please go to Claims & Pre-approvals on the Crescent Care app, then click on Submit a Claim.</>,
      },
      {
        id: 't4',
        question: 'Can I access healthcare providers located in other countries?',
        answerType: 'text',
        answer: 'Yes, you can access healthcare providers located in other countries through an international list of providers for which coverage of those would depend on your policy’s terms and conditions.',
      },
      {
        id: 't5',
        question: 'What do I do in an emergency?',
        answerType: 'text',
        answer: <>Get the emergency treatment you need and call us if you need any advice or support.<br/>Where possible you, your doctor or one of your dependants should contact our Call Center or email us within 48 hours of the emergency event, to inform us of the hospitalization. Treatment Guarantee/Pre-authorization Form details can be taken over the phone when you call us.<br/>Our Call Center details as well as our customer care emails are listed by country on our website.</>,
      },
    ],
  },
  {
    id: 'getting-reimbursed',
    label: 'Getting Reimbursed',
    questions: [
      {
        id: 'r1',
        question: 'What does “medical claim” mean?',
        answerType: 'text',
        answer: 'A medical claim is a medical bill submitted to health insurance companies and other insurance providers for services rendered to patients by healthcare providers. When you visit a doctor, hospital or any other healthcare provider, your service generates a bill that is referred to as a medical claim.',
      },
      {
        id: 'r2',
        question: 'What does “direct claim” mean?',
        answerType: 'text',
        answer:
          'The term “Direct claim” is used when the healthcare provider submits the medical claim directly to the insurance company to process for payment.',
      },
      {
        id: 'r3',
        question: 'What does a “reimbursement claim” mean?',
        answerType: 'text',
        answer: 'If a medical claim is not directly submitted by the healthcare provider to the insurance company, this claim would then be submitted by the patient for reimbursement, depending on his/her policy’s terms and conditions.',
      },
       {
        id: 'r4',
        question: 'Can I view my medical claims history?',
        answerType: 'text',
        answer: 'Yes, you can visit the Claims section in the Lumi app home screen and view all of your claims history.',
      },
       {
        id: 'r5',
        question: 'Can I view the medical claims history of my family members?',
        answerType: 'text',
        answer: 'By default, you have access to the policy benefits of your family members who are under 18. As for the members who are above the age of 18, they have to register and create their own account on the app.',
      },
       {
        id: 'r6',
        question: 'Can I submit a reimbursement medical claim from app?',
        answerType: 'text',
        answer: 'Yes, you can submit reimbursement claims by clicking on “Claims” tab from the home screen, if this feature is available in your app. If you don’t find this in your app, please send all required documents by email to hello@crescentcare.pk',
      },
       {
        id: 'r7',
        question: 'Do I need my original documents when submitting a claim?',
        answerType: 'text',
        answer: 'This depends on your policy’s terms and conditions. In any case, we recommend that you retain the originals for a period of one year should there be a need for an investigation.',
      },
       {
        id: 'r8',
        question: 'Can I submit a claim on behalf of my family members?',
        answerType: 'text',
        answer: 'For family members who are below the age of 18, you can submit claims on their behalf. As for the members who are above the age of 18, they have to register and create their own account on the app.',
      },
       {
        id: 'r9',
        question: 'How do I receive my cash reimbursement?',
        answerType: 'text',
        answer: 'When submitting a reimbursement claim, you will need to select the desired reimbursement method, and the approved reimbursement amount will be paid accordingly, and as per your company’s agreed mode of settlement.',
      },
       {
        id: 'r10',
        question: 'How would I be updated regarding the progress of my claim?',
        answerType: 'text',
        answer: 'The Crescent Care will notify you with a push notification on your mobile device every time there is an update on the status of your reimbursement claim. If you encounter any issue, please contact our support team by email at hello@crescentcare.pk for assistance.',
      },
       {
        id: 'r11',
        question: 'How do I arrange direct settlement for a planned in-patient treatment?',
        answerType: 'list',
        answer: [
            'You first need to visit a medical facility and consult with the physician who will submit the request for the planned treatment.',
            'Claim adjudication is done as per policy terms and conditions.',
            'Nextcare replies back within 24 hours with approval or rejection for the planned treatment.',
            'The medical facility receives the decision from Nextcare and informs you accordingly in order to plan the date and timing of service(s) to be provided.'
        ],
      },
       {
        id: 'r12',
        question: 'How can I submit a reimbursement claim online?',
        answerType: 'mixed',
        intro: 'You can submit a reimbursement claim through the Lumi app available on Google Play Store, Apple Store and AppGallery.',
        answer: [
            'Download Crescent Care App',
            'Register and log in using your username and password',
            'Go to “Claims”',
            'Go to “Submit a Claim” and follow the instructions.',
        ],
        outro:'After you submit your completed claim form, you will receive a notification by e-mail to confirm that it has been submitted successfully.'
      },
       {
        id: 'r13',
        question: 'How can I follow up on my reimbursement claim?',
        answerType: 'text',
        answer: <>You can easily follow up on your reimbursement claim either via the Crescent Care App, or by calling the Call Center number mentioned on your insurance card, or by WhatsApp for further inquiries.<br/>On the Crescent Care, go to Claims, View Claims page and you can search for the submitted reimbursement claim to view its status.</>,
      },

    ],
  },
  {
    id: 'complaints',
    label: 'Complaints',
    questions: [
      {
        id: 'c1',
        question: 'How can I submit a Complaint?',
        answerType: 'text',
        answer:
          <>On the Crescent Care app, on the home screen, click on “Need Help”, click on Inquiry Type and select “Complaint”. Then click on “Start Chat” located at the bottom of the screen to chat with one of our Crescent Care customer service team.<br/>Alternatively, you can submit a complaint by email or online form. Read how in this link https://crescentcare.pk/complaints-procedure/</>,
      }
    ],
  },
];

export default faqCategories;