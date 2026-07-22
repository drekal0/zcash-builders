-- Zcash Builders — Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── COHORTS ──────────────────────────────────────────────────
create table public.cohorts (
  id          text primary key,          -- 'cohort-01', 'cohort-02'
  name        text not null,
  start_date  date,
  end_date    date,
  max_students int default 20,
  status      text default 'open'
                check (status in ('open','active','completed')),
  discord_invite text,
  created_at  timestamptz default now()
);

-- Seed first cohort
insert into public.cohorts (id, name, start_date, end_date, max_students, status)
values ('cohort-01', 'Cohort 01', '2026-09-01', '2026-10-27', 20, 'open');

-- ── PROFILES ─────────────────────────────────────────────────
-- Extends auth.users — created automatically on signup via trigger
create table public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  name        text,
  username    text unique,
  bio         text,
  country     text,
  website     text,
  github      text,
  x_handle    text,
  telegram    text,
  discord     text,
  zcash_ua    text,
  avatar_url  text,
  role        text default 'student'
                check (role in ('student','admin','admin+student','mentor')),
  cohort_id   text references public.cohorts(id),
  enrolled_at timestamptz,
  xp          int default 0,
  is_public   boolean default true,
  created_at  timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data ->> 'name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── APPLICATIONS ─────────────────────────────────────────────
create table public.applications (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  github      text,
  country     text,
  background  text,   -- 'rust' | 'typescript' | 'python' | 'mobile' | 'other'
  motivation  text,
  status      text default 'pending'
                check (status in ('pending','accepted','rejected','waitlisted')),
  cohort_id   text references public.cohorts(id),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  admin_notes text,
  created_at  timestamptz default now()
);

-- ── LESSON PROGRESS ──────────────────────────────────────────
create table public.lesson_progress (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references public.profiles(id) on delete cascade,
  lesson_id       text not null,   -- e.g. 'stage-00-week-01-lesson-01'
  stage           text not null,
  completed       boolean default false,
  completed_at    timestamptz,
  time_spent_mins int,
  bookmarked      boolean default false,
  unique(user_id, lesson_id)
);

-- ── LAB SUBMISSIONS ──────────────────────────────────────────
create table public.lab_submissions (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid references public.profiles(id) on delete cascade,
  lab_id           text not null,   -- 'lab-01' through 'lab-08'
  stage            text not null,
  submission_url   text,            -- txid, GitHub URL, live URL, blog URL
  submission_notes text,
  status           text default 'submitted'
                     check (status in ('submitted','under_review','approved','revision_requested')),
  feedback         text,
  mentor_id        uuid references public.profiles(id),
  submitted_at     timestamptz default now(),
  reviewed_at      timestamptz,
  xp_awarded       int default 0,
  unique(user_id, lab_id)
);

-- ── ACHIEVEMENTS ─────────────────────────────────────────────
create table public.achievements (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid references public.profiles(id) on delete cascade,
  achievement_id text not null,
  awarded_at     timestamptz default now(),
  unique(user_id, achievement_id)
);

-- ── CHAT MESSAGES ────────────────────────────────────────────
create table public.chat_messages (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references public.profiles(id) on delete cascade,
  cohort_id       text references public.cohorts(id),
  channel         text not null,   -- 'general' | 'stage-00' | 'labs' | 'help' | 'showcase'
  lesson_context  text,            -- lesson_id if message is lesson-specific
  content         text not null,
  created_at      timestamptz default now()
);

-- ── BOOKMARKS ────────────────────────────────────────────────
create table public.bookmarks (
  user_id    uuid references public.profiles(id) on delete cascade,
  lesson_id  text not null,
  created_at timestamptz default now(),
  primary key(user_id, lesson_id)
);

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
alter table public.profiles      enable row level security;
alter table public.applications  enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.lab_submissions enable row level security;
alter table public.achievements  enable row level security;
alter table public.chat_messages enable row level security;
alter table public.bookmarks     enable row level security;

-- Profiles: users can read public profiles, only edit their own
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (is_public = true);

create policy "Users can view their own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Applications: anyone can insert (apply), only admin can read all
create policy "Anyone can apply"
  on public.applications for insert with check (true);

-- Lesson progress: users can only see and update their own
create policy "Users can manage their own progress"
  on public.lesson_progress for all using (auth.uid() = user_id);

-- Lab submissions: users manage their own
create policy "Users can manage their own lab submissions"
  on public.lab_submissions for all using (auth.uid() = user_id);

-- Achievements: users can read their own
create policy "Users can view their own achievements"
  on public.achievements for select using (auth.uid() = user_id);

-- Chat: cohort members can read and write
create policy "Cohort members can read chat"
  on public.chat_messages for select using (auth.uid() is not null);

create policy "Cohort members can post"
  on public.chat_messages for insert with check (auth.uid() = user_id);

-- Bookmarks: users manage their own
create policy "Users can manage their own bookmarks"
  on public.bookmarks for all using (auth.uid() = user_id);

-- ── INDEXES ──────────────────────────────────────────────────
create index on public.lesson_progress(user_id);
create index on public.lesson_progress(lesson_id);
create index on public.lab_submissions(user_id);
create index on public.lab_submissions(status);
create index on public.applications(status);
create index on public.applications(cohort_id);
create index on public.chat_messages(cohort_id, channel, created_at desc);
