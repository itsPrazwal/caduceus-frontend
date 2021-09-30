import { AuthPagesLabels, BloodGroup } from './enum'

const notFound = {
  title: 'ERROR 404!',
  subTitle: 'OPS! PAGE NOT FOUND',
  detail: 'Sorry, the page you are looking for does not exist. If you think something is broken report a problem.',
  redirection: {
    url: '/',
    displayName: 'RETURN HOME'
  },
  problemUrl: {
    url: '/',
    displayName: 'REPORT PROBLEM'
  }
}

const navigationDisplayNames = {
  home: 'Home'
}

const labels = {
  [AuthPagesLabels.EMAIL]:{
    topic: 'Trouble Logging In?',
    description: 'Enter your email, phone, or username and we\'ll send you a link to get back into your account.',
    pageTitle: 'TBD | Trouble Login | Email'
  },
  [AuthPagesLabels.OTP]:{
    topic: 'OTP Code',
    description: 'Enter the OTP code sent to ',
    pageTitle: 'TBD | Trouble Login | OTP',
  },
  [AuthPagesLabels.PASSWORD]:{
    topic: 'Trouble Logging In?',
    description: 'Enter new password for you account.',
    pageTitle: 'TBD | Trouble Login | Password'
  },
  [AuthPagesLabels.LOGIN]:{
    topic: 'Log In',
    description: 'For the purpose of industry regulation, your details are required.',
    pageTitle: 'TBD | Log In'
  },
  [AuthPagesLabels.USERTYPE]:{
    topic: 'Register',
    description: 'Sign up as a',
    pageTitle: 'TBD | Register'
  },
  [AuthPagesLabels.SELECT_USER_TYPE]:{
    topic: 'Select User Type',
    description: 'Sign up as a',
    pageTitle: 'TBD | Register'
  },
  [AuthPagesLabels.REGISTER]:{
    topic: 'Register',
    description: 'For the purpose of industry regulation, your details are required.',
    pageTitle: 'TBD | Register'
  },
  [AuthPagesLabels.VERIFY_USER]:{
    topic: 'Verifying User',
    description: 'To continue viewing secured pages, \n Please enter the OTP Code sent to ',
    pageTitle: 'TBD | Verifying User'
  },
  [AuthPagesLabels.CONFIRM_USER]:{
    topic: 'Confirm User',
    description: 'Please enter your email address to confirm.',
    pageTitle: 'TBD | Confirm User'
  },
}

const welcomeScreenLabels = {
  title: 'You have successfully registered to CADUCEUS',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  knowMore: 'We’d like to know more about you'
}

const accountSettingsLabels = {
  deleteAccount: {
    title: 'Delete Account',
    description: 'If you delete your account, your personal information will be wiped from Coursera\'s servers, all of your course activity will be anonymized and any certificates earned will be deleted. This action cannot be undone! Cancel any active subscriptions before you delete your account.',
    buttonLabel: 'Delete Account',
  },
  deactivateAccount: {
    title: 'Deactivate Account',
    description: 'If you delete your account, your personal information will be wiped from Coursera\'s servers, all of your course activity will be anonymized and any certificates earned will be deleted. This action cannot be undone! Cancel any active subscriptions before you delete your account.',
    buttonLabel: 'Deactivate Account',
  },
  hideAccount: {
    title: 'Hide my Profile',
    description: 'If you delete your account, your personal information will be wiped from Coursera\'s servers, all of your course activity will be anonymized and any certificates earned will be deleted. This action cannot be undone! Cancel any active subscriptions before you delete your account.',
    buttonLabel: 'Hide Profile',
  }
}

const bloodGroupList = [
  {
    displayName: 'A+ (A Positive)',
    value: BloodGroup.A_POSITIVE
  },
  {
    displayName: 'A- (A Negative)',
    value: BloodGroup.A_NEGATIVE
  },
  {
    displayName: 'B+ (B Positive)',
    value: BloodGroup.B_POSITIVE
  },
  {
    displayName: 'B+ (B Negative)',
    value: BloodGroup.B_NEGATIVE
  },
  {
    displayName: 'O+ (O Positive)',
    value: BloodGroup.O_POSITIVE
  },
  {
    displayName: 'O+ (O Negative)',
    value: BloodGroup.O_NEGATIVE
  },
  {
    displayName: 'AB+ (AB Positive)',
    value: BloodGroup.AB_POSITIVE
  },
  {
    displayName: 'AB+ (AB Negative)',
    value: BloodGroup.AB_NEGATIVE
  },
]

const educationDegreeList = [
  {
    displayName: 'SLC / SEE',
    value: 'SLC / SEE'
  },
  {
    displayName: '10 + 2',
    value: '10 + 2'
  },
  {
    displayName: 'Diploma',
    value: 'Diploma'
  },
  {
    displayName: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
    value: 'MBBS'
  },
  {
    displayName: 'Bachelor of Dental Surgery (BDS)',
    value: 'BDS'
  },
  {
    displayName: 'Bachelor of Ayurvedic Medicine and Surgery (BAMS)',
    value: 'BAMS'
  },
  {
    displayName: 'Bachelor of Unani Medicine and Surgery (BUMS)',
    value: 'BUMS'
  },
  {
    displayName: 'Bachelor of Homeopathy Medicine and Surgery (BHMS)',
    value: 'BHMS'
  },
  {
    displayName: 'Bachelor of Yoga and Naturopathy Sciences (BYNS)',
    value: 'BYNS'
  },
  {
    displayName: 'Bachelor of Veterinary Sciences and Animal Husbandry (B.V.Sc & AH)',
    value: 'B.V.Sc & AH'
  },
  {
    displayName: 'Masters - Doctor of Medicine (MD)',
    value: 'MD'
  },
  {
    displayName: 'Masters - Master of Surgery (MS)',
    value: 'MS'
  },
  {
    displayName: 'Masters - Diplomate of National Board (DNB)',
    value: 'DNB'
  },
  {
    displayName: 'Super Speciality - Doctorate of Medicine (D.M.)',
    value: 'D.M.'
  },
  {
    displayName: 'Super Speciality - Master of Chirurgiae (M.Ch)',
    value: 'M.Ch'
  }
]

const educationSpecialityList = {
  'MD' : [
    'Anaesthesiology',
    'Pharmacology',
    'Biochemistry',
    'Physical Medicine and Rehabilitation',
    'Community Health',
    'Physiology',
    'Dermatology',
    'Preventive and Social Medicine',
    'Family Medicine',
    'Psychiatry',
    'Forensic Medicine',
    'Radio-Diagnosis',
    'General Medicine',
    'Radio-Therapy',
    'Microbiology',
    'Tuberculosis and Respiratory diseases',
    'Paediatrics',
    'Emergency and Critical care',
    'Palliative Medicine',
    'Nuclear Medicine',
    'Pathology',
    'Transfusion Medicine',
    'Skin and Venereal diseases',
    'Tropical Medicine',
  ],
  'MS' :[
    'Ear, Nose and Throat',
    'General Surgery',
    'Ophthalmology',
    'Orthopaedics',
    'Obstetrics and Gynaecology',
    'Dermatology, Venerology and Leprosy',
  ],
  'DNB' : [
    'Anaesthesiology',
    'Orthopaedic Surgery',
    'Anatomy',
    'Oto-Rhino Laryngology',
    'Biochemistry',
    'Paediatrics',
    'Dermatology',
    'Pathology',
    'Emergency Medicine',
    'Pharmacology',
    'Family Medicine',
    'Physical Medicine and Rehabilitation',
    'Field Epidemiology',
    'Physiology',
    'Forensic Medicine',
    'Immunohematology and transfusion medicine',
    'General Medicine',
    'Maternal and Child Health',
    'General Surgery',
    'Microbiology',
    'Health Administration',
    'Nuclear Medicine',
    'Ophthalmology',
    'Obstetric and Gynecology',
    'Psychiatry',
    'Respiratory diseases',
    'Radio-Diagnosis',
    'Rural Surgery',
    'Radio-Therapy',
    'Social and Preventive Medicine',
  ],
  'D.M.': [
    'Psychiatry',
    'Cardiology',
    'Cardiac-Anaesthesiology',
    'Pulmonary and Sleep disorders',
    'Cardiology',
    'Obstetrics and Gynecology',
    'Haematology',
    'Nuclear Medicine',
    'Cardiac-Radiology',
    'Anaesthesiology, Pain Medicine and Critical Care',
    'Paediatrics',
    'Endocrinology',
    'Nephrology',
    'Gastroenterology',
    'Neuro-Anaesthesiology and Critical Care',
    'Medicine and Microbiology',
    'Neurology',
    'Onco-Anesthesiology and Palliative Medicine',
  ],
  'M.Ch': [
    'Surgery',
    'Cardiothoracic and Vascular Surgery',
    'Gastrointestinal Surgery',
    'Obstetrics and Gynaecology',
    'ENT',
    'Neuro Surgery',
    'Pediatric Surgery',
    'Plastic and Reconstructive Surgery',
    'Surgical Oncology',
    'Surgery Trauma Centre',
    'Urology',
  ]
}

export { navigationDisplayNames, notFound, labels, welcomeScreenLabels, accountSettingsLabels, bloodGroupList, educationDegreeList, educationSpecialityList }
