import { navigationDisplayNames } from './en'
import {
  AnimateContainerVariant,
  ProfileEditNavTabValue,
  ProfileEditTags,
  ProfileMainNavTabValue,
  UserRequestTabName
} from './enum'

const company_details = {
  title: 'Caduceus Application' ,
  name: 'Caduceus Nepal',
  shortForm: 'CN',
  location: 'Kathmandu, Nepal',
  number: '+977-9812345678',
  logo: '',
  copyRight: 'Copyright 2021. All Rights reserved.',
}

const navigations = {
  home: {
    url: '/',
    displayName: navigationDisplayNames.home,
  }
}

const animateContainerVariants = {
  toLeft: {
    [AnimateContainerVariant.HIDDEN]: {
      opacity: 0,
      x: '20vw',
    },
    [AnimateContainerVariant.VISIBLE]: {
      opacity: 1,
      x: '0',
      transition: { ease: 'easeOut' }
    },
    [AnimateContainerVariant.EXIT]: {
      x: '-100vw',
      opacity: 0,
      transition: { duration: 1 }
    }
  },
  toRight: {
    [AnimateContainerVariant.HIDDEN]: {
      opacity: 0,
      x: '-20vw',
    },
    [AnimateContainerVariant.VISIBLE]: {
      opacity: 1,
      x: '0',
      transition: { ease: 'easeOut' }
    },
    [AnimateContainerVariant.EXIT]: {
      x: '100vw',
      opacity: 0,
      transition: { duration: 1 }
    }
  },
  toTop: {
    [AnimateContainerVariant.HIDDEN]: {
      opacity: 0,
      y: '20vh',
    },
    [AnimateContainerVariant.VISIBLE]: {
      opacity: 1,
      y: '0',
      transition: { ease: 'easeOut' }
    },
    [AnimateContainerVariant.EXIT]: {
      y: '-100vh',
      opacity: 0,
      transition: { duration: 1 }
    }
  },
}

const staticImageBaseUrl = '/static/images'

const staticImagesUrl = {
  tempGrayBox: `${staticImageBaseUrl}/tempGrayBoxAsImage.png`,
  tempEventImage: `${staticImageBaseUrl}/tempEventImage.png`,
  tempManImage: `${staticImageBaseUrl}/tempManTalking.jpeg`,
  tempHostImage: `${staticImageBaseUrl}/tempHostImage.png`,
  tempReviewImage: `${staticImageBaseUrl}/tempReviewImage.png`,
  tempProfileImage: `${staticImageBaseUrl}/tempProfileImage.jpg`,
  banner: [
    `${staticImageBaseUrl}/banner/tempBannerOne.svg`,
    `${staticImageBaseUrl}/banner/tempBannerTwo.svg`,
    `${staticImageBaseUrl}/banner/tempBannerThree.svg`,
    `${staticImageBaseUrl}/banner/tempBannerFour.svg`,
    `${staticImageBaseUrl}/banner/tempBannerFive.png`,
  ],
  companyLogo: {
    bottle: `${staticImageBaseUrl}/tempCompanyLogo_bottle.png`,
    abc: `${staticImageBaseUrl}/tempCompanyLogo_ABC.png`,
    abc2: `${staticImageBaseUrl}/tempCompanyLogo_ABC2.png`,
  },
  instituteLogo: {
    stXaviers: `${staticImageBaseUrl}/tempInstituteLogo_stXaviers.png`,
    abc: `${staticImageBaseUrl}/tempInstituteLogo_abc.png`,
  },
  areasOfInterest: `${staticImageBaseUrl}/tempAOIImage.png`,
  fallbackImages: {
    hospital: `${staticImageBaseUrl}/fallbackImages/hospitalFallBackImage.svg`,
    ambulance: `${staticImageBaseUrl}/fallbackImages/ambulanceFallBackImage.svg`,
    bloodBank: `${staticImageBaseUrl}/fallbackImages/bloodBankFallBackImage.svg`,
    event: `${staticImageBaseUrl}/fallbackImages/eventFallBackImage.svg`,
    disease: `${staticImageBaseUrl}/fallbackImages/diseaseFallBackImage.svg`,
    doctor: `${staticImageBaseUrl}/fallbackImages/doctorFallBackImage.svg`,
    department: `${staticImageBaseUrl}/fallbackImages/departmentFallBackImage.svg`,
  }
}

const landingPageFooter = {
  contactInfo: {
    displayName: 'Contact Info',
    navs: [
      { displayName: 'Caduceus', redirection: '/' },
      { displayName: 'Doctors', redirection: '/doctors' },
      { displayName: 'BloodBanks', redirection: '/bloodBanks' },
      { displayName: 'Ambulance', redirection: '/ambulances' },
      { displayName: 'Hospital', redirection: '/hospitals' },
    ]
  },
  about: {
    displayName: 'About',
    navs: [
      { displayName: 'Our Story', redirection: '/' },
      { displayName: 'Benefits', redirection: '/' },
      { displayName: 'Team', redirection: '/' },
      { displayName: 'Career', redirection: '/' },
    ]
  },
  help: {
    displayName: 'Help',
    navs: [
      { displayName: 'FAQs', redirection: '/faq' },
      { displayName: 'Contact Us', redirection: '/' },
    ]
  }
}

const profilePageTabs = {
  main: [
    {
      displayName: 'Details',
      value: ProfileMainNavTabValue.DETAIL
    },
    {
      displayName: 'Requests',
      value: ProfileMainNavTabValue.REQUEST
    }
  ],
  edit: [
    {
      displayName: 'Back',
      value: 'back',
      hrefUrl: '/profile'
    },
    {
      displayName: 'Profile',
      value: ProfileEditNavTabValue.PROFILE,
      hrefUrl: '/profile/edit'
    },
    {
      displayName: 'Account Settings',
      value: ProfileEditNavTabValue.ACCOUNT_SETTINGS,
      hrefUrl: '/profile/account-settings'
    }
  ]
}

const userRequestTab:{ displayName: string, value:UserRequestTabName }[] = [
  {
    displayName: 'Blood - Yours',
    value: UserRequestTabName.BLOOD_DONOR
  },
  {
    displayName: 'Blood - To You',
    value: UserRequestTabName.YOURSELF
  },
]


const profileEditTabs:{ displayName: string, value: ProfileEditTags }[] = [
  {
    displayName: 'Basic Info',
    value: ProfileEditTags.BASIC_INFO
  },
  {
    displayName: 'Work Experience',
    value: ProfileEditTags.WORK_EXPERIENCE
  },
  {
    displayName: 'Education',
    value: ProfileEditTags.EDUCATION
  },
  {
    displayName: 'Department',
    value: ProfileEditTags.DEPARTMENT
  },
]


export { navigations, company_details, animateContainerVariants, staticImagesUrl, landingPageFooter, profilePageTabs, userRequestTab, profileEditTabs }
