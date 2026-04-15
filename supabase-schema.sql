-- ─── Profiles ────────────────────────────────────────────────────────────────
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  pain_type text[],
  pain_duration text,
  tms_score integer,
  current_day integer not null default 1,
  onboarding_completed boolean not null default false,
  reminder_time text default '08:00',
  subscription_status text not null default 'free',
  stripe_customer_id text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
create policy "Users can read own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ─── Evidence list ────────────────────────────────────────────────────────────
create table if not exists evidence_list (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  text text not null,
  category text,
  created_at timestamptz not null default now()
);

alter table evidence_list enable row level security;
create policy "Users can manage own evidence" on evidence_list
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── Emotion check-ins ────────────────────────────────────────────────────────
create table if not exists emotion_checkins (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  date date not null,
  emotions text[],
  pain_reaction text,
  journaled boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  unique(user_id, date)
);

alter table emotion_checkins enable row level security;
create policy "Users can manage own checkins" on emotion_checkins
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── User progress ────────────────────────────────────────────────────────────
create table if not exists user_progress (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  content_id integer not null,
  completed_at timestamptz not null default now(),
  is_favorite boolean not null default false,
  unique(user_id, content_id)
);

alter table user_progress enable row level security;
create policy "Users can manage own progress" on user_progress
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── User stats ───────────────────────────────────────────────────────────────
create table if not exists user_stats (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade unique,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  total_exercises integer not null default 0,
  total_journal_sessions integer not null default 0,
  total_minutes integer not null default 0,
  last_activity_date date
);

alter table user_stats enable row level security;
create policy "Users can manage own stats" on user_stats
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Auto-create stats row for new profiles
create or replace function handle_new_profile()
returns trigger language plpgsql security definer as $$
begin
  insert into public.user_stats (user_id) values (new.id);
  return new;
end;
$$;

drop trigger if exists on_profile_created on public.profiles;
create trigger on_profile_created
  after insert on public.profiles
  for each row execute function handle_new_profile();

-- ─── RPC: increment_user_stats ────────────────────────────────────────────────
create or replace function increment_user_stats(p_user_id uuid, p_minutes integer)
returns void language plpgsql security definer as $$
declare
  v_last_date date;
  v_streak integer;
  v_longest integer;
begin
  select last_activity_date, current_streak, longest_streak
  into v_last_date, v_streak, v_longest
  from user_stats where user_id = p_user_id;

  -- Streak logica
  if v_last_date is null or v_last_date < current_date - interval '1 day' then
    v_streak := 1;
  elsif v_last_date = current_date - interval '1 day' then
    v_streak := v_streak + 1;
  end if;

  if v_streak > v_longest then
    v_longest := v_streak;
  end if;

  update user_stats set
    total_exercises     = total_exercises + 1,
    total_minutes       = total_minutes + p_minutes,
    current_streak      = v_streak,
    longest_streak      = v_longest,
    last_activity_date  = current_date
  where user_id = p_user_id;
end;
$$;
