
// Base Types
export interface BaseFormData {
  id?: string;
  fullName: string;
  email: string;
  status: 'draft' | 'submitted';
  createdAt?: string;
  updatedAt?: string;
  submittedAt?: string;
}

// Award/Prize
export interface Award {
  id: string;
  fullName: string;
  awardName: string;
  dateReceived: string;
  awardingOrganization: string;
  awardDescription: string;
  awardCriteria: string;
  selectionProcess: string;
  certificateUrl?: string;
  supportingDocUrl?: string;
}

// Membership
export interface Membership {
  id: string;
  associationName: string;
  memberSince: string;
  associationDescription: string;
  membershipRequirements: string;
  contributions: string;
  certificateUrl?: string;
  supportingDocUrl?: string;
}

// Published Material
export interface PublishedMaterial {
  id: string;
  publicationTitle: string;
  publicationDate: string;
  publisherName: string;
  circulationInfo: string;
  contentSummary: string;
  publicationUrl?: string;
  evidenceUrl?: string;
}

// Judging Experience
export interface JudgingExperience {
  id: string;
  judgeRole: string;
  startDate: string;
  endDate: string;
  organizationName: string;
  description: string;
  selectionProcess: string;
  appointmentLetterUrl?: string;
  evidenceUrl?: string;
}

// Original Contribution
export interface OriginalContribution {
  id: string;
  contributionTitle: string;
  contributionDate: string;
  field: string;
  description: string;
  significance: string;
  implementation: string;
  evidenceUrl?: string;
  lettersUrl?: string;
  supportingDocUrl?: string;
}

// Scholarly Article
export interface ScholarlyArticle {
  id: string;
  articleTitle: string;
  journalName: string;
  publicationDate: string;
  authors: string;
  abstract: string;
  journalImpact: string;
  significance: string;
  articleUrl?: string;
  citationUrl?: string;
  journalInfoUrl?: string;
}

// Exhibition
export interface Exhibition {
  id: string;
  exhibitionName: string;
  venueName: string;
  startDate: string;
  endDate: string;
  venueLocation: string;
  exhibitionDescription: string;
  workDescription: string;
  selectionProcess: string;
  venuePrestige: string;
  exhibitionDocUrl?: string;
  visualEvidenceUrl?: string;
  reviewsUrl?: string;
}

// Leading Role
export interface LeadingRole {
  id: string;
  organizationName: string;
  roleTitle: string;
  startDate: string;
  endDate: string;
  organizationDescription: string;
  responsibilities: string;
  achievements: string;
  reportingStructure: string;
  verificationUrl?: string;
  organizationChartUrl?: string;
  distinctionEvidenceUrl?: string;
  recommendationUrl?: string;
}

// High Salary
export interface HighSalary {
  id: string;
  employerName: string;
  startDate: string;
  endDate: string;
  baseSalary: string;
  currency: string;
  frequency: string;
  additionalCompensation: string;
  industryComparison: string;
  salaryDocUrl?: string;
  industryEvidenceUrl?: string;
  expertLettersUrl?: string;
}

// Commercial Success
export interface CommercialSuccess {
  id: string;
  projectTitle: string;
  projectType: string;
  releaseDate: string;
  role: string;
  metrics: string;
  industryContext: string;
  criticalReception: string;
  salesDocUrl?: string;
  mediaCoverageUrl?: string;
  recognitionUrl?: string;
  contractsUrl?: string;
}

// Complete Form Data
export interface EB1AFormData extends BaseFormData {
  awards: Award[];
  memberships: Membership[];
  publishedMaterials: PublishedMaterial[];
  judgingExperiences: JudgingExperience[];
  originalContributions: OriginalContribution[];
  scholarlyArticles: ScholarlyArticle[];
  exhibitions: Exhibition[];
  leadingRoles: LeadingRole[];
  highSalaries: HighSalary[];
  commercialSuccesses: CommercialSuccess[];
}

// Form Context Types
export interface FormContextType {
  formData: EB1AFormData;
  setFormData: React.Dispatch<React.SetStateAction<EB1AFormData>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  saveProgress: () => Promise<void>;
  submitForm: () => Promise<void>;
  isLoading: boolean;
}

// Admin Types
export interface AdminUser {
  email: string;
  password?: string;
}
