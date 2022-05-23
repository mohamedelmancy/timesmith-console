import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dashboard/analytics',
    name: 'Statistics board',
    type: 'button',
    label: '',
    icon: 'dashboard',
    role: 'backOffice',
  },

  {
    state: 'reception/inquiries',
    name: 'inquiries',
    type: 'button',
    icon: 'info',
    label: '',
    role: 'BoShowInquiries'
  },
  {
    state: 'reception',
    name: 'Reception',
    type: 'sub',
    label: '',
    icon: 'contacts',
    role: 'BoShowReception',
    children: [
      {state: 'reception-cashier', name: 'Cashier', label: '', role: 'BoShowReceptionCashier'},
      {state: 'data-review', name: 'Data review', label: '', role: 'BoShowReceptionReview'},
      {state: 'verify-certificate', name: 'Certificate verification', role: 'BoShowReceptionInvestCompany'},
      {state: 'receipts', name: 'Receipts', label: '', role: 'BoShowReceptionReceipts'},
      {state: 'person-data-with-aboard', name: 'Transfer from abroad', role: 'BoShowReceptionTransFromOutside'},

    ]
  },

  {
    state: 'forms/form-wizard',
    name: 'Add candidate',
    type: 'button',
    icon: 'add',
    label: '',
    role: 'BoShowCandidateAdd'
  },
  {
    state: 'accounting',
    name: 'Accounting',
    type: 'sub',
    label: '',
    icon: 'account_balance',
    role: 'BoShowAccounting',
    children: [
      {state: 'service-request', name: 'Service Request', label: '', role: 'BoShowAccountingRequests'},
      {state: 'cashier', name: 'Cashier', label: '', role: 'BoShowAccountingCashier'},
      {state: 'receipts', name: 'Receipts', label: '', role: 'BoShowAccountingReceipts'},
      {state: 'request-service-payment', name: 'Request services', label: '', role: 'BoShowAccountingApplayRequests'},
    ]
  },
  {
    state: 'review',
    name: 'Review',
    type: 'sub',
    label: '',
    icon: 'rate_review',
    role: 'BoShowReview',
    children: [
      {state: 'final-audition', name: 'Final audition', role: 'BoShowReviewFinalAudition'},
      {state: 'completing-documents', name: 'Completing documents', role: 'BoShowReviewCompleatDocument'},
      {state: 'accepted-files', name: 'Accepted files', role: 'BoShowReviewAcceptedFiles'},
      {state: 'rejected-files', name: 'Rejected files', role: 'BoShowReviewRejectedFiles'},
      {state: 'blocked-files', name: 'Blocked files', role: 'BoShowReviewBlockedFiles'},
      {state: 'person-data-not-compete', name: 'Files not complete', role: 'BoShowReviewFilesNotCompleate'},
    ]
  },
  {
    state: 'mail-inbox',
    name: 'Mail inbox',
    type: 'button',
    icon: 'mail',
    label: '',
    role: 'GetAllMail'
  },
  {
    state: 'panels',
    name: 'Evaluation',
    type: 'sub',
    label: '',
    icon: '',
    font: 'fa fa-group',
    role: 'BoShowEvaluation',
    children: [
      {state: 'list', name: 'Panels', label: '', role: 'BoShowEvaluationPanels'},
      {state: 'add-examiner', name: 'Add examiner to panel', label: '', role: 'BoShowEvaluationAddExaminerToPanel'},
      {state: 'remove-examiner', name: 'Remove examiner from panel', role: 'BoShowRemoveExaminier'},
      {state: 'evaluation', name: 'Add Evaluation results', label: '', role: 'BoShowEvaluationAddResults'},
      {state: 'accredit-results', name: 'Result accreditation', label: '', role: 'BoShowEvaluationResultAccreditation'},
      {state: 'faculty-member', name: 'Faculty members', role: 'BoShowEvaluationFacultyMembers'},
      {state: 're-evaluate', name: 'Re-Evaluate', role: 'BoShowEvaluationReEvaluate'},
    ]
  },
  {
    state: 'review/issued-certificate',
    name: 'Issued certificates',
    type: 'button',
    icon: 'wallpaper',
    label: '',
    role: 'BoShowIssuedCertificates'
  },
  {
    state: '',
    name: 'companies',
    type: 'sub',
    label: '',
    icon: 'location_city',
    role: 'BoShowCompanies',
    children: [
      {state: 'management/companies', name: 'Companies list', role: 'BoShowCompaniesList'},
      {state: 'company-register', name: 'Create new company profile', label: '', role: 'BoShowCompaniesCreateAccount'},
      {state: 'management/company-rating', name: 'Company rating', role: 'BoShowSuperAdmin'},
      {state: 'management/ministries', name: 'Ministries', role: 'BoShowCompaniesMinistries'},
    ]
  },
  {
    state: 'reports',
    name: 'REPORTS',
    type: 'sub',
    label: '',
    icon: 'report',
    role: 'BoShowReports',
    children: [
      {state: 'reception-cashier-daily', name: 'Reception cashier ( Daily )', label: '', role: 'BoShowReportsReceptionDailyIncome'},
      {state: 'reception-cashier-monthly', name: 'Reception cashier ( Monthly )', label: '', role: 'BoShowReportsReceptionMonthlyIncome'},
      {state: 'society-cashier-daily', name: 'Society cashier ( Daily )', label: '', role: 'BoShowReportsAccountingDailyIncome'},
      {state: 'society-cashier-monthly', name: 'Society cashier ( Monthly )', label: '', role: 'BoShowReportsAccountingMonthlyIncome'},
      // {state: 'daily-operations', name: 'Daily operations', label: '', role: 'BoShowReportsAccountingMonthlyIncome'},
      {state: 'basic-data', name: 'Basic data', label: '', role: 'PersonBasicDataDetails'},
      {state: 'data-statistics-by-country', name: 'Data statistics by country', label: '', role: 'PersonDataByNationStatistics'},
      {state: 'success-and-failed-statistics', name: 'Success and failed statistics', label: '', role: 'GetSuccesCountStatistic'},
      {state: 'evaluation-by-nationality', name: 'Evaluation statistics by nationality', label: '', role: 'PersonDataEvaluationByNationStatistics'},
      {state: 'evaluation-by-job', name: 'Evaluation statistics by job', label: '', role: 'PersonDataEvaluationByJobStatistics'},
      {state: 'evaluation-details', name: 'Evaluation details', label: '', role: 'GetPersonDataByEvaluationDetails'},
      {state: 'daily-accounting', name: 'Daily accounting', label: '', role: 'DialyAccountingReprot'},
      {state: 'financial-report-by-cashier', name: 'Financial report by cashier', label: '', role: 'BoShowReportsAccountingFinaRptCasher'},
      {state: 'financial-report-by-reception-cashier', name: 'Financial report by reception cashier', label: '', role: 'BoShowReportsReceptionFinaRptCasher'},
      {state: 'financial-report-by-service-cashier', name: 'Financial report by service and cashier', label: '', role: 'BoShowAccountingIncRptService'},
      {state: 'financial-report-by-service-reception-cashier', name: 'Financial report by service and reception cashier', label: '', role: 'BoShowReceptionIncRptService'},
      {state: 'person-status-by-user', name: 'Actions on files status', label: '', role: 'BoShowRptPersonStatus'},
      {state: 'service-request-by-user', name: 'Actions on service request', label: '', role: 'BoShowRptServiceRequest'},
      {state: 'persons-operations', name: 'Persons operations', label: '', role: 'BoShowRptPersonOperation'},

    ]
  },

  {
    state: 'other-destinations',
    name: 'Other destinations',
    type: 'sub',
    label: '',
    icon: 'call_made',
    role: 'BoShowOutsideOrgnizations',
    children: [
      {state: 'transfer-to-workflow', name: 'Transfer to workforce', label: '', role: 'BoShowToNOC'},
      {state: 'workforce-transfered', name: 'Transfered from workforce', label: '', role: 'BoShowInNOC'},

    ]
  },

  {
    state: 'forms',
    name: 'USERS',
    type: 'sub',
    label: '',
    icon: 'group',
    role: 'BoShowUsers',
    children: [
      {state: 'users-list', name: 'Users list', label: '', role: 'BoShowUsersView'},
      {state: 'person-data-transfer', name: 'Transfer person data', label: '', role: 'BoShowUsersTransfer'},
      {state: 'persons-with-no-company-account', name: 'Individual persons', label: '', role: 'BoShowUsersWithNoCompanyAccount'},
      {state: 'create-user', name: 'Create new user profile', label: '', role: 'BoShowUsersCreateAccount'},
    ]
  },
  {
    state: 'management',
    name: 'File management',
    type: 'sub',
    icon: 'file_copy',
    label : '',
    role: 'BoShowFileManagement',
    children: [
      {state: 'file-management', name: 'Change file status', role: 'BoShowFileManagementChangeStatus'},
    ]
  },

  {
    state: 'management',
    name: 'System logs',
    type: 'sub',
    icon: 'view_list',
    label : '',
    role: 'BoShowSystemAudit',
    children: [
      {state: 'Audit-category', name: 'Audit category', role: 'BoShowAuditCategories'},
      {state: 'Audit-Data', name: 'AuditData', role: 'BoShowAuditData'}
    ]
  },


  {
    state: 'management',
    name: 'Notifications',
    type: 'sub',
    icon: 'notifications_active',
    label : '',
    role: 'BoShowNotification',
    children: [
      {state: 'notification-data', name: 'Notifications', role: 'BoShowNotificationList'},
      {state: 'notification-category', name: 'Notification category', role: 'BoShowNotificationCategory'},
      {state: 'messages-settings', name: 'Messages settings', role: 'BoShowMessagesSetting'},
    ]
  },

  {
    state: 'management',
    name: 'Appointment booking settings',
    type: 'sub',
    icon: 'access_alarms',
    label : '',
    role: 'BoShowAppointmentSetting',
    children: [
      {state: 'shift', name: 'Shifts', role: 'BoShowAppointmentSettingShifts'},
      {state: 'holidays', name: 'Holidays', role: 'BoShowAppointmentHolidays'},
      {state: 'appointment-type', name: 'Booking types', role: 'BoShowAppointmentTypeView'},
      {state: 'appointment-info', name: 'Booking info', role: 'BoShowAppointmentInfoView'},
      {state: 'appointment-setting', name: 'Booking settings', role: 'BoShowSuperAdmin'},
    ]
  },
  {
    state: 'management',
    name: 'Evaluation settings',
    type: 'sub',
    icon: 'done_outline',
    label : '',
    role: 'BoShowEvaluationSettings',
    children: [
      {state: 'evaluation-type', name: 'Evaluation type', role: 'BoShowEvaluationTypeView'},
      {state: 'evaluation-status', name: 'Evaluation status', role: 'BoShowEvaluationStatusView'},
      {state: 'evaluation-setting', name: 'Evaluation settings', role: 'BoShowEvaluationSettingView'},
    ]
  },
  {
    state: 'management',
    name: 'Data registeration settings',
    type: 'sub',
    icon: 'settings_input_antenna',
    label : '',
    role: 'BoShowDataRegistrationSetting',
    children: [
      {state: 'nationalities', name: 'Nationalities', role: 'BoShowDataRegistrationSettingNationalities'},
      {state: 'countries', name: 'Countries', role: 'BoShowDataRegistrationSettingCountries'},
      {state: 'gender', name: 'Gender', role: 'BoShowDataRegistrationSettingGender'},
      {state: 'residency-type', name: 'Residency type', role: 'BoShowRegistrationSettingResidencyType'},
      {state: 'jobs', name: 'Jobs', role: 'BoShowDataRegistrationSettingJobs'},
      {state: 'document-type', name: 'Document types', role: 'BoShowDataRegistrationSettingDocumentTypes'},
      {state: 'districts', name: 'Districts', role: 'BoShowDataRegistrationSettingDistricts'},
    ]
  },
  {
    state: 'management',
    name: 'Education settings',
    type: 'sub',
    icon: 'school',
    label : '',
    role: 'BoShowEducationSetting',
    children: [
      {state: 'education-rating', name: 'Education rating', role: 'BoShowEducationRating'},
      {state: 'certificate-type', name: 'Education level', role: 'BoShowEducationType'},
      {state: 'school-university', name: 'Shools & Universities', role: 'BoShowSchoolAndUniversity'},
      {state: 'sec-colleges', name: 'Sections & Colleges', role: 'BoShowSectionsAndCollage'},
      {state: 'profession', name: 'Professions', role: 'BoShowProfessions'},
      {state: 'sub-profession', name: 'Sub professions', role: 'BoShowSubProfessions'},
      {state: 'approved-years', name: 'Approved years', role: 'BoShowAcceptedYears'},
    ]
  },
  {
    state: 'management',
    name: 'Investigation company settings',
    type: 'sub',
    icon: 'verified_user',
    label : '',
    role: 'BoShowInvestCompany',
    children: [
      {state: 'verification-certificate', name: 'Verification certificates', role: 'BoShowInvestCompanyCerts'},
      {state: 'certver-status', name: 'Verification statuss', role: 'BoShowInvestCompanyStatus'},
      {state: 'certvertype-status', name: 'Certificates status', role: 'BoShowInvestCompanyCertStatus'},
    ]
  },
  {
    state: 'management',
    name: 'Requests settings',
    type: 'sub',
    icon: 'question_answer',
    label : '',
    role: 'BoShowRequestSetting',
    children: [
      {state: 'service', name: 'Services', role: 'BoShowRequestSettingServices'},
      {state: 'service-setting', name: 'Service settings', role: 'BoShowSuperAdmin'},
      {state: 'payment-method', name: 'Payment methods', role: 'BoShowRequestSettingPaymentMethods'},
      {state: 'discount', name: 'Discounts', role: 'BoShowRequestSettingDiscounts'},
      {state: 'request-status', name: 'Request status', role: 'BoShowRequestSettingRequestStatus'},
      {state: 'organizations', name: 'Organizations', role: 'BoShowRequestSettingOrganizations'},
    ]
  },

  {
    state: 'management',
    name: 'System settings',
    type: 'sub',
    icon: 'view_list',
    label : '',
    role: 'BoShowSystemSettings',
    children: [
      {state: 'page-setting', name: 'Page settings', role: 'BoShowSuperAdmin'},
      {state: 'application-page', name: 'Application pages', role: 'BoShowSuperAdmin'},
      {state: 'role-groups', name: 'Role groups', role: 'BoShowSuperAdmin'},
      {state: 'status-type', name: 'Status type', role: 'BoShowSuperAdmin'},
      {state: 'fo-pages', name: 'Website pages', role: 'BoShowFoPages'},
      {state: 'approved-settings', name: 'Approved settings', role: 'BoShowSuperAdmin'},
    ]
  },
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  add(menu: any) {
    MENUITEMS.push(menu);
  }
}
