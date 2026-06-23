-- Projects
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  num text,
  category text,
  title text not null,
  description text,
  stack jsonb default '[]',
  image text,
  live text,
  github text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Services
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  num text,
  title text not null,
  description text,
  href text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Experience
create table if not exists experiences (
  id uuid default gen_random_uuid() primary key,
  company text not null,
  position text not null,
  duration text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Education
create table if not exists education (
  id uuid default gen_random_uuid() primary key,
  institution text not null,
  degree text not null,
  duration text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Contact messages
create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  firstname text,
  lastname text,
  email text,
  phone text,
  service text,
  message text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- CV download tracking
create table if not exists cv_downloads (
  id uuid default gen_random_uuid() primary key,
  ip text,
  user_agent text,
  created_at timestamptz default now()
);

-- Insert initial projects data
insert into projects (num, category, title, description, stack, image, live, github, sort_order) values
('01', 'Frontend', 'MGA Reklama – Corporate Website', 'Developed a responsive corporate website for a Turkish advertising and banner manufacturing company.', '[{"name":"HTML5"},{"name":"SCSS"},{"name":"JavaScript"},{"name":"React.js"},{"name":"Redux Toolkit"}]', '/assets/work/mgareklama.png', 'http://www.mgareklama.com/', 'https://github.com/Shahriddinov/New-version-MGA', 1),
('02', 'Frontend', 'Vatandoshlar Fondi', 'Site for compatriots abroad with videos, news, webinars, Uzbek language learning, and chat.', '[{"name":"Javascript"},{"name":"React.js"},{"name":"Redux"},{"name":"Websocket"}]', '/assets/work/vatandosh.jpg', 'https://vatandoshlarfondi.uz/', 'https://github.com/Shahriddinov/Vatandosh', 2),
('03', 'Frontend', 'Clear Path', 'Information about state motor vehicle roads under repair or closed for specific reasons.', '[{"name":"Javascript"},{"name":"React.js"},{"name":"Redux"},{"name":"Leaflet"}]', '/assets/work/shaffof.jpg', '', '', 3),
('04', 'Frontend', 'Sport Platform', 'Sports platform with live scores, news and event management.', '[{"name":"Javascript"},{"name":"React.js"},{"name":"Redux"}]', '/assets/work/sport.jpg', '', '', 4),
('05', 'Frontend', 'Mirobod District', 'Official website for Mirobod district administration.', '[{"name":"Javascript"},{"name":"React.js"},{"name":"Redux"}]', '/assets/work/mirobod.png', '', '', 5),
('06', 'Frontend', 'Texnika Platform', 'Technical equipment management platform.', '[{"name":"Javascript"},{"name":"React.js"}]', '/assets/work/texnika.png', '', '', 6),
('07', 'Frontend', 'Easy Przeprowadzki', 'Moving company website built for Polish market with booking system.', '[{"name":"Next.js"},{"name":"TypeScript"},{"name":"Tailwind"}]', '/assets/work/easy.png', 'https://easyprzeprowadzki.pl', '', 7),
('08', 'Frontend', 'CarPlus', 'Automotive platform with vehicle listings and dealer management.', '[{"name":"React.js"},{"name":"Next.js"},{"name":"TypeScript"}]', '/assets/work/carplus.png', '', '', 8);

-- Insert initial services
insert into services (num, title, description, href, sort_order) values
('01', 'Web Development', 'I craft fast, responsive, and production-ready web applications using React.js and Next.js with clean architecture and optimized performance.', '/work', 1),
('02', 'UI/UX Implementation', 'I transform Figma designs into pixel-perfect interfaces with smooth animations, accessibility in mind, and cross-browser compatibility.', '/work', 2),
('03', 'Frontend Architecture', 'I design scalable component libraries, state management solutions, and maintainable codebases for growing teams and products.', '/work', 3),
('04', 'Performance Optimization', 'I analyze and improve Core Web Vitals, reduce bundle sizes, implement lazy loading and caching strategies for lightning-fast apps.', '/work', 4);

-- Insert experiences
insert into experiences (company, position, duration, sort_order) values
('Ministry of Innovation', 'Frontend Engineer (React)', 'Dec 2021 – Feb 2022', 1),
('OKS Technologies', 'Frontend Engineer (React, Redux Toolkit)', 'Feb 2022 – Jun 2022', 2),
('NAPA Automotive', 'Frontend Engineer', '2022 – 2023', 3),
('Tashkent City Prosecutor''s Academy', 'Frontend Engineer (Angular)', 'Jun 2023 – Oct 2023', 4),
('Online Media Platform', 'Frontend Engineer (Next.js)', 'Jan 2024 – Jun 2024', 5),
('E-commerce Startup (Poland)', 'Senior Frontend Engineer — Remote', '2024 – Present', 6),
('CarPlus', 'Senior Frontend Engineer (React, Next.js)', 'Mar 2025 – July', 7),
('Registon School', 'Frontend Instructor & Mentor', '2025 – Present', 8);

-- Insert education
insert into education (institution, degree, duration, sort_order) values
('University of Science and Technologies', 'Bachelor''s Degree — Logistics (In Progress)', '2023 – 2028', 1),
('PDP Academy', 'Frontend Development Program', '2021 (6 months)', 2),
('Online Learning Platforms', 'Advanced Frontend Development (React, Next.js)', '2021 – Present', 3);
