export enum ScreenSizes {
    MOBILE = 640,
    TABLET = 768,
    LARGE_TABLET = 1024,
    DESKTOP = 1280,
    LARGE_DESKTOP = 1440,
}

export enum ThemeType {
    DARK    = 'dark',
    LIGHT   = 'light',
}

export enum AuthPagesLabels {
    EMAIL = 'email',
    OTP = 'otp',
    PASSWORD = 'password',
    LOGIN = 'login',
    REGISTER = 'register',
    USERTYPE = 'usertype',
    VERIFY_USER = 'verifyUser',
    CONFIRM_USER = 'confirmUser',
    SELECT_USER_TYPE = 'selectUserType'
}

export enum LocalStorageKeys {
    RESET_STATE = 'rsi',
    LOGIN_FIELD = 'lfs',
    CONFIRM_USER = 'cfu',
    OTP_ACTIVATE_TIME = 'oat',
}

export enum UserType {
    ADMIN = 'ADMIN',
    DOCTOR = 'DOCTOR',
    PATIENT = 'PATIENT',
    BLOOD_DONOR = 'BLOOD_DONOR'
}

export enum SvgIconName {
    ANSWER_CARD_ICON = 'answerCardIcon',
    ARROW_RIGHT = 'arrowRight',
    ANSWER_SELECTED = 'answerSelected',
    SEARCH = 'search',
    ANGLE_DOWN = 'angleDown',
    BELL_WITH_DOT = 'bellWithDot',
    STAR_GOLD = 'starGold',
    USER = 'user',
    CALENDAR = 'calendar',
    SHARE = 'share',
    HEART_OUTLINE = 'heartOutline',
    CLOCK = 'clock',
    FACEBOOK_WHITE = 'facebookWhite',
    TWITTER_WHITE = 'twitterWhite',
    FACEBOOK_LOGO = 'facebookLogo',
    LINKEDIN_LOGO = 'linkedInLogo',
    INSTAGRAM = 'instagram',
    PENCIL = 'pencil',
    USER_SEAT_BELT = 'userSeatBelt',
    BLOOD_DROP = 'bloodDrop',
    AMBULANCE = 'ambulance',
    DOCTOR = 'doctor',
    TICK_MARK = 'tickMark'
}

export enum AnimateContainerVariant {
    HIDDEN = 'hidden',
    VISIBLE = 'visible',
    EXIT = 'exit'
}

export enum EventType{
    WEBINAR = 'webinar',
    ZONE = 'zone',
    DEBATE = 'debate',
    COURSES = 'courses',
    WORKSHOP = 'workshop'
}

export enum UserRequestTabName {
    BLOOD_DONOR = 'bloodDonor',
    YOURSELF = 'yourself',
    DOCTOR = 'doctor',
}

export enum RequestStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
}

export enum ProfileMainNavTabValue {
    DETAIL = 'details',
    REQUEST = 'requests'
}

export enum ProfileEditNavTabValue {
    PROFILE = 'edit',
    ACCOUNT_SETTINGS = 'account-settings'
}

export enum ProfileEditTags {
    BASIC_INFO = 'basicInfo',
    WORK_EXPERIENCE = 'workExperience',
    EDUCATION = 'education',
    DEPARTMENT = 'department'
}

export enum ClassNameScrollBar {
    Y = 'hasYScrollBar',
    X = 'hasXScrollBar'
}

export enum EventCategory {
    BLOOD = 'blood',
    MEDICAL = 'medical'
}

export enum BloodGroup {
    A_POSITIVE = 'A+',
    A_NEGATIVE = 'A-',
    B_POSITIVE = 'B+',
    B_NEGATIVE = 'B-',
    O_POSITIVE = 'O+',
    O_NEGATIVE = 'O-',
    AB_POSITIVE = 'AB+',
    AB_NEGATIVE = 'AB-',
}
