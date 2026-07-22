export type Role = 'student' | 'admin' | 'admin+student' | 'mentor'

export type CohortStatus = 'open' | 'active' | 'completed'

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'waitlisted'

export type LabStatus = 'submitted' | 'under_review' | 'approved' | 'revision_requested'

export type LessonType = 'reading' | 'video' | 'interactive' | 'lab'

export interface Profile {
  id: string
  name: string | null
  username: string | null
  bio: string | null
  country: string | null
  website: string | null
  github: string | null
  x_handle: string | null
  telegram: string | null
  discord: string | null
  zcash_ua: string | null
  avatar_url: string | null
  role: Role
  cohort_id: string | null
  enrolled_at: string | null
  xp: number
  is_public: boolean
  created_at: string
}

export interface Cohort {
  id: string
  name: string
  start_date: string
  end_date: string
  max_students: number
  status: CohortStatus
  discord_invite: string | null
}

export interface Application {
  id: string
  name: string
  email: string
  github: string | null
  country: string | null
  background: string | null
  motivation: string | null
  status: ApplicationStatus
  cohort_id: string | null
  reviewed_by: string | null
  reviewed_at: string | null
  admin_notes: string | null
  created_at: string
}

export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string
  completed: boolean
  completed_at: string | null
  time_spent_mins: number | null
  bookmarked: boolean
}

export interface LabSubmission {
  id: string
  user_id: string
  lab_id: string
  submission_url: string | null
  submission_notes: string | null
  status: LabStatus
  feedback: string | null
  mentor_id: string | null
  submitted_at: string
  reviewed_at: string | null
  xp_awarded: number
}

export interface Achievement {
  id: string
  user_id: string
  achievement_id: string
  awarded_at: string
}

export interface Lesson {
  id: string
  title: string
  slug: string
  stage: string
  module: string
  week: number
  order: number
  duration_mins: number
  type: LessonType
  video_id?: string
  why_it_matters?: string
  tags: string[]
  prerequisites: string[]
}
