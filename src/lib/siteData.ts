export type CaseStudyCategory =
  | 'Developer Tooling'
  | 'Android NFC Framework'
  | 'NFC Automation'
  | 'Android Performance'
  | 'Real-time Android'
  | 'AI & Automation';

export interface CaseStudyItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: CaseStudyCategory;
  contextLabel: string;
  featured: boolean;
  referenceLink?: {
    label: string;
    url: string;
  };
  workflowSteps?: string[];
  problem: string;
  engineeringChallenge: string;
  technicalApproach: string;
  architectureAndTools: string[];
  tradeoffsAndDecisions: string;
  outcomeAndLearnings: string;
  externalLinksNote: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  periodLabel: string;
  summary: string;
  highlights: string[];
  outcomes?: { label: string; value: string }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface NowTopic {
  area: string;
  title: string;
  description: string;
  details?: string[];
}

const BASE_URL = import.meta.env.BASE_URL || '/';
const withBase = (assetPath: string) =>
  `${BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`}${assetPath.replace(/^\/+/, '')}`;

export const SITE_PROFILE = {
  name: 'Vaibhav Sharma',
  roleTitle: 'Lead Engineer at Samsung R&D Institute Bangalore',
  previousRoleTitle: 'Previously Software Engineer at Probo India & Tata Consultancy Services',
  roleKicker: 'Lead Engineer, Samsung R&D Institute Bangalore · Previously Probo India & TCS',
  headline: 'Android & Platform Engineering across consumer applications, AOSP, and NFC hardware.',
  introSummary:
    'Lead Android Engineer with 5 years of experience in Kotlin, Java, Android SDK, and Jetpack Compose—spanning high-traffic consumer apps for 50M+ users at Probo India to Android/AOSP NFC framework ownership, device bring-up, and AI-powered engineering tooling at Samsung R&D Institute.',
  aboutStory:
    'With 5 years of Android engineering experience across Tata Consultancy Services, Probo India, and Samsung R&D Institute, my work bridges consumer-facing mobile applications, proximity and connectivity systems (NFC, Beacon, GPS), Android framework integration, hardware validation, and AI-powered developer tooling.',
  profilePhotoPath: withBase('assets/aistudio/Vaibhav_ff861ca4.png'),
  profilePhotoAlt: 'Portrait of Vaibhav Sharma, Lead Engineer at Samsung R&D Institute Bangalore',
  profilePhotoCaption:
    'Vaibhav Sharma — Lead Engineer at Samsung R&D Institute Bangalore.',
  location: 'Jaipur / Bengaluru, India',
  email: 'vaibhavbabu3475@gmail.com',
  phone: '+91 7062134288',
  githubUrl: 'https://github.com/vaibhavsha24',
  githubHandle: 'github.com/vaibhavsha24',
  linkedinUrl: 'https://www.linkedin.com/in/vaibhavsharma24',
  linkedinHandle: 'linkedin.com/in/vaibhavsharma24',
  resumeUrl: withBase('assets/aistudio/VaibhavResumeOct_0cc0f93c.pdf'),
  coreDomains: [
    {
      index: '01',
      title: 'Android & Platform Engineering',
      description:
        '5 years across Kotlin, Java, Jetpack Compose, MVVM/MVC, and Android Framework boundaries from consumer apps to system services.',
    },
    {
      index: '02',
      title: 'NFC & Hardware Integration',
      description:
        'End-to-end NFC Settings ownership, new device bring-up, Beacon/GPS proximity flows, and Mobly + PN532 Dragon Reader validation.',
    },
    {
      index: '03',
      title: 'System Reliability & Performance',
      description:
        'Memory leak and performance profiling with LeakCanary, Android Profiler, and Crashlytics—sustaining 99.5%+ crash-free users.',
    },
    {
      index: '04',
      title: 'AI Tools & Engineering Automation',
      description:
        'RAG-based test recommendation systems, LLM-assisted issue intelligence platforms, CI/CD, and automated hardware validation.',
    },
  ],
};

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    id: 'samsung-srib',
    role: 'Lead Engineer',
    organization: 'Samsung R&D Institute',
    location: 'Bangalore, India',
    periodLabel: 'Jun 2025 – Present',
    summary:
      'Contributing to Google AOSP and working across core Android application and platform layers—owning the NFC Settings experience, leading new-device NFC subsystem bring-up, automating hardware validation, and building AI-integrated internal developer tools to reduce engineering workload.',
    highlights: [
      'Contributing upstream-aligned work to Google AOSP alongside core Android application and platform development using Kotlin, Java, Android SDK, Jetpack Compose, and modular architecture.',
      'Built lifecycle-aware, asynchronous components using Kotlin Coroutines, Flow, and Android Architecture Components.',
      'Owned end-to-end development and integration of the NFC experience within Android Settings, coordinating UI, business logic, Android framework services, and Samsung-specific system APIs.',
      'Led NFC subsystem bring-up for new Samsung devices, debugging end-to-end app-to-framework integration across software, hardware, and platform teams.',
      'Diagnosed memory leaks and performance bottlenecks using LeakCanary, Android Profiler, and platform debugging tools.',
      'Developed NFC automation frameworks using Mobly, PN532 Dragon Reader, and custom test applications.',
      'Built AI-integrated internal developer tools to reduce manual engineering workload—including a RAG-based test recommendation system (leveraging code reviews and historical test artifacts) and an issue intelligence platform for automated classification and trend analysis.',
    ],
  },
  {
    id: 'probo',
    role: 'Software Engineer',
    organization: 'Probo India',
    location: 'Gurugram, India',
    periodLabel: 'Jan 2024 – Jun 2025',
    summary:
      'Built and scaled core Android features for the Trading and Growth teams on a high-traffic consumer platform serving 50M+ users, combining MVVM, Jetpack Compose, real-time socket streaming, and in-house diagnostics.',
    highlights: [
      'Developed core Android features for Trading and Growth teams, supporting real-time data streaming via sockets for 50M+ users.',
      'Designed and maintained scalable app features using MVVM, Jetpack Compose, and modern Android engineering practices.',
      'Re-engineered critical user flows and real-time feed infrastructure, achieving a 4% reduction in unnecessary API calls.',
      'Migrated Java components to Kotlin and removed legacy code, reducing application size by 2 MB.',
      'Maintained 99.5% crash-free users and 99.8% crash-free sessions via Firebase Crashlytics, LeakCanary, and Android Profiler.',
      'Implemented internal analytics and logging solutions to track application events and API failures.',
      'Designed and developed Birdie, an in-house Android bug reporting and diagnostics tool with screenshot-based issue capture.',
    ],
    outcomes: [
      { value: '50M+', label: 'Consumer users served' },
      { value: '4%', label: 'Reduction in unnecessary API calls' },
      { value: '2 MB', label: 'Reduction in application size' },
      { value: '99.8%', label: 'Crash-free sessions (99.5% users)' },
    ],
  },
  {
    id: 'tcs',
    role: 'Software Engineer',
    organization: 'Tata Consultancy Services',
    location: 'Ahmedabad, India',
    periodLabel: 'Jul 2021 – Aug 2022',
    summary:
      'Developed modular, proximity-aware, and API-driven Android applications using modern Jetpack and background processing primitives, supporting clients from UAT through production.',
    highlights: [
      'Integrated Beacon, GPS, and NFC functionalities to enable location-aware and proximity-based Android experiences.',
      'Implemented dynamic, API-driven UIs with real-time data synchronization.',
      'Built clean, modular codebases using Java, Kotlin, Room Database, Coroutines, LiveData, JobScheduler, and Foreground Services.',
      'Collaborated directly with clients on requirement analysis, UAT, deployment, and production support.',
    ],
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    id: 'nsut-mtech',
    degree: 'M.Tech in Computer Science',
    institution: 'Netaji Subhas University of Technology',
    location: 'Delhi, India',
    year: '2024',
  },
  {
    id: 'rtu-btech',
    degree: 'B.Tech in Computer Science',
    institution: 'Rajasthan Technical University',
    location: 'Jaipur, India',
    year: '2021',
  },
];

export const BIRDIE_FEATURED = {
  title: 'Birdie — In-App Bug Reporting & Diagnostics',
  context: 'Probo India · In-House Android Tool (Designed & Developed)',
  referenceArticleUrl:
    'https://engineering.probo.in/birdie-flies-in-to-save-the-day-our-custom-bug-tracking-tool-for-android-ios-apps-3834ab2bc434',
  referenceArticleLabel: 'Read Probo Engineering article on Birdie',
  attributionNote:
    'Vaibhav Sharma designed and developed the Android-side Birdie in-house bug reporting and diagnostics tool at Probo India; accompanying write-up published by Probo Engineering.',
  problemSummary:
    'Traditional bug reporting through WhatsApp created fragmented communication, missing technical context, and slow issue tracking across mobile releases.',
  workflow: [
    'Users report issues directly from within the mobile app.',
    'Screenshot-based bug reporting captures visual state immediately.',
    'Optional written descriptions paired with structured permission handling.',
    'Automatic collection of app version, device model, and OS version.',
    'Structured reports routed directly to a dedicated Slack channel.',
    'Issues categorized and tracked through a Kanban workflow.',
    'In-app status updates keep reporters informed on progress.',
  ],
};

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'birdie-bug-reporting',
    number: '01',
    title: 'Birdie — Improving mobile bug reporting and diagnostics',
    subtitle: 'Probo India · Designed & developed in-house Android QA & diagnostics tool',
    category: 'Developer Tooling',
    contextLabel: 'Probo India · Android Tooling',
    featured: true,
    referenceLink: {
      label: 'Probo Engineering: Birdie Article',
      url: 'https://engineering.probo.in/birdie-flies-in-to-save-the-day-our-custom-bug-tracking-tool-for-android-ios-apps-3834ab2bc434',
    },
    workflowSteps: BIRDIE_FEATURED.workflow,
    problem:
      'Traditional bug reporting through WhatsApp created fragmented communication across teams, stripped away technical environment context, and slowed down triage and follow-up.',
    engineeringChallenge:
      'Replacing informal chat screenshots required making in-app capture frictionless for testers and internal users while consistently attaching device diagnostics, handling permissions cleanly, and connecting directly to team triage channels.',
    technicalApproach:
      'Designed and developed the Android-side Birdie in-house diagnostics tool: screenshot-based in-app reporting with optional descriptions and permission handling, automatic attachment of app version, device model, and OS version, Slack routing, Kanban tracking, and in-app status updates.',
    architectureAndTools: ['Android SDK', 'Kotlin', 'Screenshot Capture', 'Slack Routing', 'Kanban Workflow'],
    tradeoffsAndDecisions:
      'Kept reporter input optional beyond the captured screenshot so filing a bug takes seconds, while automating environment metadata capture in the background so engineers never have to chase device or version details.',
    outcomeAndLearnings:
      'Centralized bug reports into structured Slack threads and Kanban workflows with full device and app metadata, eliminating the missing context common in ad-hoc WhatsApp threads.',
    externalLinksNote: 'Accompanying write-up published by Probo Engineering (linked above).',
  },
  {
    id: 'android-nfc-framework',
    number: '02',
    title: 'Android NFC Framework — Working across the Android platform and NFC stack',
    subtitle: 'End-to-end NFC Settings ownership & new-device NFC subsystem bring-up',
    category: 'Android NFC Framework',
    contextLabel: 'Samsung R&D Institute',
    featured: true,
    problem:
      'Reliable NFC behavior on consumer devices requires tight coordination between user-facing NFC Settings, Android framework services, Samsung system APIs, and underlying hardware state during bring-up and daily use.',
    engineeringChallenge:
      'Debugging end-to-end app-to-framework integration across software, hardware, and platform teams while keeping NFC Settings behavior predictable across Galaxy devices.',
    technicalApproach:
      'Owned development and integration of the NFC experience within Android Settings—bridging UI, business logic, Android framework services, and Samsung-specific system APIs—while leading NFC subsystem bring-up and LeakCanary/Android Profiler diagnostics on new devices.',
    architectureAndTools: [
      'AOSP',
      'Android Framework',
      'Kotlin',
      'Java',
      'Jetpack Compose',
      'LeakCanary',
      'Android Profiler',
    ],
    tradeoffsAndDecisions:
      'Isolated UI state transitions cleanly from underlying framework callbacks using lifecycle-aware Coroutines and Flow components so state mismatches surface deterministically during bring-up debugging.',
    outcomeAndLearnings:
      'Strengthened end-to-end platform reliability across new Galaxy device bring-ups, connecting Settings UX directly to AOSP NFC services and hardware behavior.',
    externalLinksNote: 'Platform engineering work at Samsung R&D Institute Bangalore.',
  },
  {
    id: 'nfc-automation-mobly-pn532',
    number: '03',
    title: 'NFC Automation — Hardware-based testing with Mobly and PN532 Dragon Reader',
    subtitle: 'Automating physical NFC validation workflows across real devices and bench hardware',
    category: 'NFC Automation',
    contextLabel: 'Samsung R&D Institute',
    featured: true,
    problem:
      'Manual NFC validation requires repetitive physical tapping against external readers or cards, making regression verification slow and difficult to scale across frequent platform builds.',
    engineeringChallenge:
      'Synchronizing automated Android test execution with physical PN532 Dragon Reader hardware interactions while handling real-world RF timing tolerances reliably.',
    technicalApproach:
      'Built NFC automation frameworks combining Mobly test orchestration, PN532 Dragon Reader hardware, and custom Android test applications to exercise real NFC paths reproducibly.',
    architectureAndTools: ['Mobly', 'PN532 Dragon Reader', 'Custom Test Apps', 'Python', 'Kotlin', 'CI/CD'],
    tradeoffsAndDecisions:
      'Separated deterministic hardware-bench regression suites from lightweight unit checks so physical PN532 fixtures run reliably on critical NFC paths without blocking rapid developer iteration.',
    outcomeAndLearnings:
      'Demonstrated how pairing Mobly orchestration with PN532 Dragon Reader rigs and custom test apps turns manual NFC verification into repeatable automated coverage.',
    externalLinksNote: 'Hardware validation workflow at Samsung R&D Institute Bangalore.',
  },
  {
    id: 'android-performance-optimization',
    number: '04',
    title: 'Android Performance — Reducing unnecessary API calls and application size',
    subtitle: 'Targeted efficiency, Java-to-Kotlin migration, and crash-free reliability at 50M+ scale',
    category: 'Android Performance',
    contextLabel: 'Probo India · 50M+ Users',
    featured: true,
    problem:
      'High-traffic consumer Android apps serving tens of millions of users degrade quickly when redundant network requests, legacy Java bloat, or unmonitored crashes compound across diverse devices.',
    engineeringChallenge:
      'Improving network efficiency, trimming application footprint, and sustaining high crash-free stability without slowing feature delivery for Trading and Growth teams.',
    technicalApproach:
      'Re-engineered critical user flows and real-time feed infrastructure, migrated Java components to Kotlin while removing legacy code, instrumented internal event and API-failure logging, and profiled stability with Firebase Crashlytics, LeakCanary, and Android Profiler.',
    architectureAndTools: [
      'Kotlin',
      'REST APIs',
      'Firebase Crashlytics',
      'LeakCanary',
      'Android Profiler',
      'Charles Proxy',
    ],
    tradeoffsAndDecisions:
      'Prioritized incremental Java-to-Kotlin migration and targeted feed deduplication on the highest-traffic Trading and Growth flows to capture measurable size and API gains without risky full-module rewrites.',
    outcomeAndLearnings:
      'Achieved a 4% reduction in unnecessary API calls, a 2 MB reduction in application size, 99.5% crash-free users, and 99.8% crash-free sessions across a 50M+ user base.',
    externalLinksNote: 'Production outcomes from Android engineering work at Probo India.',
  },
  {
    id: 'realtime-android-applications',
    number: '05',
    title: 'Real-time Android Applications — Socket-based communication and modular MVVM',
    subtitle: 'Structuring responsive Trading & Growth UI on top of live socket streams',
    category: 'Real-time Android',
    contextLabel: 'Probo India · 50M+ Users',
    featured: false,
    problem:
      'Live consumer trading experiences depend on timely state updates over persistent sockets, where lifecycle transitions, high-frequency events, and oversized ViewModels can easily destabilize UI state.',
    engineeringChallenge:
      'Keeping real-time socket streams synchronized cleanly with Jetpack Compose screens while preventing ViewModel bloat and preserving predictable MVVM boundaries.',
    technicalApproach:
      'Built real-time socket-backed features on MVVM and modular domain boundaries using Kotlin Coroutines, Flow, Jetpack Compose, and structured analytics/logging.',
    architectureAndTools: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Coroutines', 'WebSocket', 'Room'],
    tradeoffsAndDecisions:
      'Constrained ViewModels to UI state mapping and lifecycle scoping while isolating domain orchestration and socket stream buffering—an architectural pattern also explored in my Medium essay on scaling MVVM.',
    outcomeAndLearnings:
      'Reinforced the value of strict unidirectional state flows and clear modular boundaries when bridging live socket connections to reactive Android UI at scale.',
    externalLinksNote: 'Architecture reflection from consumer Android engineering at Probo India.',
  },
  {
    id: 'ai-engineering-tooling',
    number: '06',
    title: 'AI-Powered Engineering Tooling — RAG test recommendations & issue intelligence',
    subtitle: 'Applying LLMs and retrieval workflows to test selection and issue triage',
    category: 'AI & Automation',
    contextLabel: 'Samsung R&D Institute',
    featured: true,
    problem:
      'Large platform codebases accumulate thousands of historical test cases, code reviews, and issue reports—making manual test selection during reviews and recurring failure triage slow.',
    engineeringChallenge:
      'Surfacing relevant test coverage recommendations from historical artifacts and turning noisy incoming bug reports into structured classification and trend signals.',
    technicalApproach:
      'Built AI-powered engineering tools including a RAG-based test recommendation system grounded in code reviews and historical test artifacts, alongside an issue intelligence platform for automated classification and trend analysis.',
    architectureAndTools: ['Python', 'RAG', 'LLM Applications', 'Prompt Engineering', 'Claude', 'ChatGPT'],
    tradeoffsAndDecisions:
      'Grounded recommendations in historical code-review and test-artifact retrieval rather than open-ended LLM prompting so suggested tests stay anchored to real repository history.',
    outcomeAndLearnings:
      'Paired domain engineering context with retrieval-augmented workflows to reduce manual lookup time during testing and issue triage.',
    externalLinksNote: 'Internal developer tooling built at Samsung R&D Institute Bangalore.',
  },
];

export const TECHNICAL_SKILLS: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['Kotlin', 'Java', 'Python', 'Dart', 'Swift', 'C/C++', 'JavaScript', 'SQL'],
  },
  {
    category: 'Android',
    items: [
      'Android SDK',
      'Android Framework',
      'Jetpack Compose',
      'MVVM',
      'MVC',
      'Coroutines',
      'LiveData',
      'Room',
      'Foreground Services',
      'JobScheduler',
    ],
  },
  {
    category: 'Mobile & Connectivity',
    items: ['REST APIs', 'WebSocket', 'Beacon', 'GPS', 'NFC', 'Flutter', 'iOS'],
  },
  {
    category: 'AI Tools & Automation',
    items: [
      'Claude',
      'ChatGPT',
      'RAG',
      'LLM Applications',
      'Prompt Engineering',
      'Mobly',
      'PN532 Dragon Reader',
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS (EC2, S3)', 'Docker', 'CI/CD', 'Git', 'GitHub', 'Maven'],
  },
  {
    category: 'Testing & Tools',
    items: [
      'Espresso',
      'JUnit',
      'Appium',
      'Firebase Crashlytics',
      'LeakCanary',
      'Android Profiler',
      'Charles Proxy',
      'Postman',
    ],
  },
];

export const NOW_INTERESTS: {
  lastUpdated: string;
  overview: string;
  currentFocus: NowTopic[];
  exploring: NowTopic[];
} = {
  lastUpdated: 'November 2026',
  overview:
    'At Samsung R&D Institute Bangalore, my day-to-day work focuses on two reinforcing tracks: contributing to Google AOSP and Android platform/NFC reliability across Galaxy devices, and building internal AI-integrated developer tools that automate repetitive testing, triage, and review workflows to reduce team workload.',
  currentFocus: [
    {
      area: 'Platform & Upstream AOSP',
      title: 'Contributing to Google AOSP & Android NFC platform engineering',
      description:
        'Working with Samsung R&D while contributing to Google AOSP across Android framework services, NFC Settings ownership, and new-device bring-up—keeping system behavior clean and aligned with upstream Android architecture.',
      details: [
        'Contributing upstream-aligned improvements and fixes to Google AOSP alongside platform-level Android and NFC framework work.',
        'Owning end-to-end NFC experiences in Android Settings, bridging UI state, business logic, AOSP services, and hardware callbacks.',
        'Coordinating cross-functional bring-up and stability debugging across software, hardware, and platform teams on new devices.',
      ],
    },
    {
      area: 'AI Dev Tools & Productivity',
      title: 'AI-integrated internal developer tools to reduce team workload',
      description:
        'Designing and building internal developer tooling with LLMs and RAG so engineers spend less time on manual test selection, repetitive defect triage, and digging through historical context.',
      details: [
        'Built a RAG-based test recommendation system grounded in code reviews and historical test artifacts to surface relevant tests automatically.',
        'Built an issue intelligence platform for automated defect classification, clustering, and recurring failure trend analysis.',
        'Integrating LLM workflows (Claude, ChatGPT, structured prompting) into internal developer pipelines to cut repetitive operational overhead.',
      ],
    },
    {
      area: 'Hardware & Validation',
      title: 'Automated NFC validation with Mobly & PN532 Dragon Reader',
      description:
        'Replacing manual physical tap-testing with deterministic hardware-in-the-loop automation frameworks and custom Android test applications that catch hardware-software regressions early.',
      details: [
        'Orchestrating end-to-end device and RF fixture tests using Mobly, PN532 Dragon Reader hardware, and custom test apps.',
        'Eliminating test bench flakiness via deterministic state resets, structured device/reader diagnostics, and CI/CD integration.',
        'Profiling memory leaks and system-level performance bottlenecks with LeakCanary and Android Profiler.',
      ],
    },
  ],
  exploring: [
    {
      area: 'Upstream Systems',
      title: 'AOSP framework boundaries & long-term platform maintainability',
      description:
        'Studying how clean abstractions between Android Settings, framework services, and HAL layers simplify multi-device bring-up and upstream AOSP collaboration.',
      details: [
        'Decoupling UI state machines from asynchronous controller initialization callbacks.',
        'Writing testable platform components that stay resilient across OS upgrades.',
      ],
    },
    {
      area: 'Applied AI Tooling',
      title: 'Reliable RAG & LLM evaluation for engineering workflows',
      description:
        'Refining retrieval quality, grounding, and deterministic guardrails so AI-powered internal dev tools remain trustworthy enough for daily engineering adoption.',
      details: [
        'Pairing code-review diffs and historical bug/test artifacts to improve retrieval precision.',
        'Measuring real workload reduction across triage, test selection, and debugging cycles.',
      ],
    },
    {
      area: 'Reliability & Craft',
      title: 'Android performance, memory hygiene & modular architecture',
      description:
        'Continuing to sharpen techniques for crash-free stability, lean APK footprints, and modular Kotlin architecture that prevents ViewModel sprawl as codebases scale.',
      details: [
        'Combining Firebase Crashlytics, LeakCanary, and Android Profiler to isolate subtle lifecycle leaks early.',
        'Applying practical domain boundaries learned from 50M+ user consumer apps to platform engineering.',
      ],
    },
  ],
};
