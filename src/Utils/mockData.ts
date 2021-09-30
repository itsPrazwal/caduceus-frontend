import {
  FieldTypeBanner,
  FieldTypeEvent,
  FieldTypeHost,
  FieldTypeReview,
  QuestionSetType
} from './Types'
import { staticImagesUrl } from './constants'
import { EventType } from './enum'

const accords = {
  general: {
    title: 'General',
    content: [
      {
        title: 'General Question 1',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book'
      },
      {
        title: 'General Question 2',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        title: 'General Question 3',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        title: 'General Question 4',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
    ]
  },
  pricingPayment: {
    title: 'Pricing And Payment',
    content: [
      {
        title: 'Pricing And Payment Question 1',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book'
      },
      {
        title: 'Pricing And Payment Question 2',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        title: 'Pricing And Payment Question 3',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        title: 'Pricing And Payment Question 4',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
    ]
  }
}

const questionnaire:QuestionSetType[] = [
  {
    userType: 'LEARNER',
    questionField: 'fieldOne',
    question: 'Leaner question number one of five questions.',
    isRequired: true,
    questionType: 'SINGLE',
    options: [
      {
        displayOption: 'Answer 1',
        value: 'answer1',
      },
      {
        displayOption: 'Answer 2',
        value: 'answer2',
      },
      {
        displayOption: 'Answer 3',
        value: 'answer3',
      },
    ],
    hasOthers: false
  },
  {
    userType: 'LEARNER',
    questionField: 'fieldTwo',
    question: 'Leaner question number two of five questions.',
    isRequired: false,
    questionType: 'MULTIPLE',
    options: [
      {
        displayOption: 'Answer 1',
        value: 'answer1',
      },
      {
        displayOption: 'Answer 2',
        value: 'answer2',
      },
      {
        displayOption: 'Answer 3',
        value: 'answer3',
      },
    ],
    hasOthers: false
  },
  {
    userType: 'LEARNER',
    questionField: 'fieldThree',
    question: 'Leaner question number three of five questions.',
    isRequired: false,
    questionType: 'SINGLE',
    options: [
      {
        displayOption: 'Answer 1',
        value: 'answer1',
      },
      {
        displayOption: 'Answer 2',
        value: 'answer2',
      },
      {
        displayOption: 'Answer 3',
        value: 'answer3',
      },
      {
        displayOption: 'Answer 4',
        value: 'answer4',
      },
      {
        displayOption: 'Answer 5',
        value: 'answer5',
      },
    ],
    hasOthers: false
  },
  {
    userType: 'LEARNER',
    questionField: 'fieldFour',
    question: 'Leaner question number four of five questions.',
    isRequired: false,
    questionType: 'SINGLE',
    options: [
      {
        displayOption: 'Answer 1',
        value: 'answer1',
      },
      {
        displayOption: 'Answer 2',
        value: 'answer2',
      },
    ],
    hasOthers: true
  },
  {
    userType: 'LEARNER',
    questionField: 'fieldFive',
    question: 'Leaner question number five of five questions.',
    isRequired: false,
    questionType: 'MULTIPLE',
    options: [
      {
        displayOption: 'Answer 1',
        value: 'answer1',
      },
      {
        displayOption: 'Answer 2',
        value: 'answer2',
      },
      {
        displayOption: 'Answer 3',
        value: 'answer3',
      },
    ],
    hasOthers: false
  },
  {
    userType: 'INSTRUCTOR',
    questionField: 'fieldOne',
    question: 'Instructor question number one of five questions.',
    isRequired: false,
    questionType: 'SINGLE',
    options: [
      {
        displayOption: 'Answer 1',
        value: 'answer1',
      },
      {
        displayOption: 'Answer 2',
        value: 'answer2',
      },
      {
        displayOption: 'Answer 3',
        value: 'answer3',
      },
    ],
    hasOthers: false
  },
  {
    userType: 'INSTRUCTOR',
    questionField: 'fieldTwo',
    question: 'Instructor question number two of five questions.',
    isRequired: false,
    questionType: 'SINGLE',
    options: [
      {
        displayOption: 'Answer 1',
        value: 'answer1',
      },
      {
        displayOption: 'Answer 2',
        value: 'answer2',
      },
      {
        displayOption: 'Answer 3',
        value: 'answer3',
      },
    ],
    hasOthers: false
  },
  {
    userType: 'INSTRUCTOR',
    questionField: 'fieldThree',
    question: 'Instructor question number three of five questions.',
    isRequired: false,
    questionType: 'SINGLE',
    options: [
      {
        displayOption: 'Answer 1',
        value: 'answer1',
      },
      {
        displayOption: 'Answer 2',
        value: 'answer2',
      },
      {
        displayOption: 'Answer 3',
        value: 'answer3',
      },
      {
        displayOption: 'Answer 4',
        value: 'answer4',
      },
      {
        displayOption: 'Answer 5',
        value: 'answer5',
      },
    ],
    hasOthers: false
  },
  {
    userType: 'INSTRUCTOR',
    questionField: 'fieldFour',
    question: 'Instructor question number four of five questions.',
    isRequired: false,
    questionType: 'SINGLE',
    options: [
      {
        displayOption: 'Answer 1',
        value: 'answer1',
      },
      {
        displayOption: 'Answer 2',
        value: 'answer2',
      },
    ],
    hasOthers: false
  },
  {
    userType: 'INSTRUCTOR',
    questionField: 'fieldFive',
    question: 'Instructor question number five of five questions.',
    isRequired: false,
    questionType: 'SINGLE',
    options: [
      {
        displayOption: 'Answer 1',
        value: 'answer1',
      },
      {
        displayOption: 'Answer 2',
        value: 'answer2',
      },
      {
        displayOption: 'Answer 3',
        value: 'answer3',
      },
    ],
    hasOthers: false
  },
]

const landingPage: { banners: FieldTypeBanner[], events: FieldTypeEvent[], hosts: FieldTypeHost[], reviews: FieldTypeReview[] } = {
  banners: [
    {
      title: 'Join with Caduceus',
      description: 'Welcome to our caduceus family, we provide medical facilities that you need and provide you medical services.',
      imageUrl: staticImagesUrl.banner[0],
      navButtons: [
        {
          name: 'Sign Up',
          redirection: '/register'
        },
        {
          name: 'Log In',
          redirection: '/login'
        }
      ]
    },
    {
      title: ' Online Blood bank provider',
      description: 'Caduceus provides online blood bank system for the patient who needs blood for their medical treatment. The blood bank contains details of the blood group of both the donor and the receiver along with their contact details.',
      imageUrl: staticImagesUrl.banner[1],
    },
    {
      title: 'Home of the best ideas in medicine',
      description: 'Caduceus provides health care services where we suggest medicine and home remedies according to the recommendation of top doctors and specialist.',
      imageUrl: staticImagesUrl.banner[2],
    },
    {
      title: 'Your community, your Health Care',
      description: 'This is the community where we prioritize health as our main  services.',
      imageUrl: staticImagesUrl.banner[3],
    },
    {
      title: 'Leading you to a healthy life',
      description: 'WE provide best health care tips and services online. Online counselling session and online appointment would lead the patient to take care of their health and a healthy life style.',
      imageUrl: staticImagesUrl.banner[4],
    },
  ],
  events: [
    {
      title: 'Innovation Through Design: Think, Make, Break, Repeat',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
    {
      title: 'Design a User Experience for social good and jobs',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 50,
      eventType: EventType.ZONE,
      rating: 5
    },
    {
      title: 'Foundation of Project Management',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.DEBATE,
      rating: 4.6
    },
    {
      title: 'Create High Fidelity Design and Prototypes in Figma',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
    {
      title: 'Innovation Through Design: Think, Make, Break, Repeat',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
    {
      title: 'Innovation Through Design: Think, Make, Break, Repeat',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
    {
      title: 'Innovation Through Design: Think, Make, Break, Repeat',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
    {
      title: 'Design a User Experience for social good and jobs',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 50,
      eventType: EventType.ZONE,
      rating: 5
    },
    {
      title: 'Foundation of Project Management',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.DEBATE,
      rating: 4.6
    },
    {
      title: 'Create High Fidelity Design and Prototypes in Figma',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
    {
      title: 'Innovation Through Design: Think, Make, Break, Repeat',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
    {
      title: 'Innovation Through Design: Think, Make, Break, Repeat',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
  ],
  hosts: [
    {
      name: 'Jane Cooper',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: staticImagesUrl.tempHostImage
    },
    {
      name: 'Esther Howard',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: staticImagesUrl.tempHostImage
    },
    {
      name: 'Jenny Wilson',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: staticImagesUrl.tempHostImage
    },
    {
      name: 'Bessie Cooper',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: staticImagesUrl.tempHostImage
    },
    {
      name: 'Prazwal Malakar',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: staticImagesUrl.tempHostImage
    },
    {
      name: 'Promila Limbu',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: staticImagesUrl.tempHostImage
    },
    {
      name: 'Utsav Shrestha',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: staticImagesUrl.tempHostImage
    },
    {
      name: 'Vivek Kansakar',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: staticImagesUrl.tempHostImage
    },
  ],
  reviews: [
    {
      name: 'Peter Parker',
      position: 'flutter developer',
      rating: 4.6,
      imageUrl: staticImagesUrl.tempReviewImage,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '
    },
    {
      name: 'Mary Jane',
      position: 'flutter developer',
      rating: 4.6,
      imageUrl: staticImagesUrl.tempReviewImage,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '
    },
    {
      name: 'Spider Man',
      position: 'flutter developer',
      rating: 4.6,
      imageUrl: staticImagesUrl.tempReviewImage,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '
    },
    {
      name: 'Dr Octopus',
      position: 'flutter developer',
      rating: 4.6,
      imageUrl: staticImagesUrl.tempReviewImage,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '
    },
    {
      name: 'Venom',
      position: 'flutter developer',
      rating: 4.6,
      imageUrl: staticImagesUrl.tempReviewImage,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '
    },
  ]
}

export { questionnaire, accords, landingPage }
