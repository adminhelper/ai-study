export interface RoadmapStage {
  id: string;
  num: string;
  phase: string;
  title: string;
  description: string;
  duration: string;
  topics: RoadmapTopic[];
}

export interface RoadmapTopic {
  title: string;
  description: string;
  resources: { label: string; url: string }[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const roadmapData: RoadmapStage[] = [
  // ──────────────────────────────────────────────
  // PART 1: AI 기초 학습
  // ──────────────────────────────────────────────
  {
    id: 'getting-started',
    num: '01',
    phase: 'AI 기초',
    title: 'AI 시작하기',
    description: 'AI 도구가 뭔지, 어떤 것들이 있는지, 어떻게 시작하는지 알아봅니다.',
    duration: '1~2일',
    topics: [
      {
        title: '생성형 AI란?',
        description: 'ChatGPT, Claude, Gemini 같은 도구가 무엇이고, 기존 검색이나 소프트웨어와 어떻게 다른지 이해합니다. 텍스트를 입력하면 AI가 글, 코드, 이미지를 만들어주는 원리를 직관적으로 파악합니다.',
        resources: [
          { label: 'Google — 생성형 AI란 무엇인가', url: 'https://cloud.google.com/ai/generative-ai' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '주요 AI 서비스 한눈에 보기',
        description: 'Claude, ChatGPT, Gemini, Perplexity 등 주요 AI 서비스를 비교합니다. 각각의 강점과 요금제를 파악하고, 본인에게 맞는 서비스를 선택합니다.',
        resources: [
          { label: 'Claude (Anthropic)', url: 'https://claude.ai' },
          { label: 'ChatGPT (OpenAI)', url: 'https://chat.openai.com' },
          { label: 'Gemini (Google)', url: 'https://gemini.google.com' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '첫 대화 해보기',
        description: 'AI에게 질문하는 법을 배웁니다. 계정을 만들고, 간단한 질문을 던져봅니다. AI의 응답 방식과 한계를 체험합니다.',
        resources: [
          { label: 'Anthropic — Claude 시작 가이드', url: 'https://docs.anthropic.com/en/docs/quickstart' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'AI의 한계 이해하기',
        description: '환각(hallucination), 최신 정보 부재, 편향 등 AI의 주요 한계를 알아둡니다. AI 출력물을 무조건 신뢰하면 안 되는 이유와 팩트체크 습관을 익힙니다.',
        resources: [
          { label: 'Anthropic — Claude의 한계', url: 'https://docs.anthropic.com/en/docs/about-claude/use-case-guides' },
        ],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'prompt-engineering',
    num: '02',
    phase: 'AI 기초',
    title: '프롬프트 엔지니어링',
    description: 'AI에게 원하는 결과를 정확하게 얻는 "질문하는 기술"을 익힙니다.',
    duration: '1~2주',
    topics: [
      {
        title: '좋은 프롬프트의 구조',
        description: '역할(Role) + 맥락(Context) + 지시(Instruction) + 출력 형식(Format). 이 4가지 요소를 갖추면 AI 응답 품질이 비약적으로 올라갑니다.',
        resources: [
          { label: 'Anthropic 프롬프트 엔지니어링 가이드', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
          { label: 'OpenAI 프롬프트 엔지니어링 가이드', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'System Prompt (역할 부여)',
        description: '"당신은 10년 경력의 세무사입니다" 같은 역할을 부여하면 AI가 해당 전문가 관점에서 답변합니다. 효과적인 역할 부여 패턴을 연습합니다.',
        resources: [
          { label: 'Anthropic — System Prompt 가이드', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'Few-shot & Chain of Thought',
        description: '예시를 2~3개 보여주는 Few-shot 기법, "단계별로 생각해봐"라는 Chain of Thought 기법. 복잡한 작업에서 AI의 정확도를 극적으로 높이는 핵심 패턴.',
        resources: [
          { label: 'Anthropic — Chain of Thought', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '실전 프롬프트 템플릿',
        description: '이메일 작성, 회의록 요약, 보고서 초안, 코드 리뷰, 번역 등 자주 쓰는 작업에 대한 나만의 프롬프트를 만들고 반복 사용합니다.',
        resources: [
          { label: 'Anthropic Prompt Library', url: 'https://docs.anthropic.com/en/prompt-library' },
        ],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'daily-productivity',
    num: '03',
    phase: 'AI 기초',
    title: 'AI 일상 활용',
    description: '업무와 일상에서 AI를 생산성 도구로 활용하는 실전 방법.',
    duration: '1~2주',
    topics: [
      {
        title: '글쓰기 & 문서 작업',
        description: '이메일, 보고서, 블로그, 마케팅 문구 작성. AI에게 초안을 맡기고 사람이 다듬는 워크플로우를 익힙니다.',
        resources: [{ label: 'Claude.ai', url: 'https://claude.ai' }],
        difficulty: 'beginner',
      },
      {
        title: '리서치 & 정보 정리',
        description: 'AI로 자료 조사, 비교 분석, 요약하는 방법. Perplexity로 최신 정보 검색, Claude로 긴 문서 요약.',
        resources: [{ label: 'Perplexity AI', url: 'https://www.perplexity.ai' }],
        difficulty: 'beginner',
      },
      {
        title: '이미지 & 디자인 생성',
        description: 'ChatGPT(DALL-E), Midjourney 등으로 이미지를 생성합니다. 프레젠테이션용 이미지, SNS 콘텐츠 등 실무 활용법.',
        resources: [
          { label: 'Midjourney 시작 가이드', url: 'https://docs.midjourney.com/' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '번역 & 다국어 작업',
        description: '맥락을 이해하는 자연스러운 번역, 특정 톤 유지, 현지화(localization) 작업에 AI를 활용합니다.',
        resources: [{ label: 'DeepL', url: 'https://www.deepl.com' }],
        difficulty: 'beginner',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // PART 2: Claude Code 마스터
  // ──────────────────────────────────────────────
  {
    id: 'cc-prereq',
    num: 'Pre',
    phase: 'Claude Code',
    title: '터미널이 처음이라면',
    description: '비개발자를 위한 사전 준비. 터미널 기초와 개발 환경을 셋업합니다.',
    duration: '1시간',
    topics: [
      {
        title: '터미널이란?',
        description: '컴퓨터에게 텍스트로 명령을 내리는 도구입니다. 마우스 대신 글자를 입력해서 폴더를 열고, 파일을 만들고, 프로그램을 실행합니다. macOS는 Spotlight(⌘+Space)에서 "터미널", Windows는 시작 메뉴에서 "PowerShell"을 검색하세요.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: '필수 명령어 5개',
        description: 'pwd(현재 위치), ls(파일 목록), cd(폴더 이동), mkdir(폴더 생성), clear(화면 정리). 이 5개만 알면 터미널 기초는 충분합니다. 잘못 입력해도 컴퓨터가 고장나지 않으니 걱정 마세요.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: '개발 환경 설치 (Homebrew & Node.js)',
        description: 'macOS에서 brew install로 프로그램을 설치하는 Homebrew, Claude Code 실행에 필요한 Node.js(v18+)를 설치합니다. Windows는 nodejs.org에서 직접 다운로드.',
        resources: [
          { label: 'Homebrew 공식 사이트', url: 'https://brew.sh' },
          { label: 'Node.js 다운로드', url: 'https://nodejs.org' },
        ],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'cc-what',
    num: '00',
    phase: 'Claude Code',
    title: 'Claude Code가 뭔가요?',
    description: '에이전틱 코딩 도구의 개념과 기존 도구와의 차이를 이해합니다.',
    duration: '30분',
    topics: [
      {
        title: 'Claude Code 개념',
        description: '터미널에서 동작하는 에이전틱 코딩 도구입니다. 코드 자동완성이 아니라, 코드베이스를 읽고 → 이해하고 → 계획하고 → 실행하고 → 검증하는 전 과정을 자율 수행합니다. 시니어 개발자가 옆에 앉아서 같이 일하는 것에 가깝습니다.',
        resources: [
          { label: 'Claude Code 공식 문서', url: 'https://docs.anthropic.com/en/docs/claude-code' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'Copilot / Cursor와 무엇이 다른가',
        description: 'Copilot은 타이핑 중 다음 줄을 제안하는 수동적 보조, Cursor는 IDE 내 AI 채팅, Claude Code는 파일 읽기/쓰기/bash/git/테스트까지 자율 수행하는 터미널 에이전트. 근본적으로 자율성의 수준이 다릅니다.',
        resources: [
          { label: 'Cursor 공식 사이트', url: 'https://cursor.sh' },
          { label: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
        ],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'cc-install',
    num: '01',
    phase: 'Claude Code',
    title: '설치 & 첫 실행',
    description: '환경설정, 로그인, 첫 대화까지 진행합니다.',
    duration: '1시간',
    topics: [
      {
        title: 'OS별 설치',
        description: 'macOS: brew install claude-code, Windows: winget install Anthropic.ClaudeCode. 설치 후 claude --version으로 확인합니다.',
        resources: [
          { label: 'Claude Code 설치 가이드', url: 'https://docs.anthropic.com/en/docs/claude-code/getting-started' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '로그인 & 첫 세션',
        description: '프로젝트 폴더에서 claude를 실행하고 로그인합니다. Claude.ai 구독(추천), Console API, Bedrock, Vertex AI 중 선택. /help, /status, /model 등 첫 명령어를 실행해봅니다.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: 'IDE 연동 (VS Code, JetBrains)',
        description: 'VS Code 확장 설치(code --install-extension anthropic.claude-code) 또는 내장 터미널에서 바로 사용. JetBrains는 Plugins에서 Claude Code를 검색하여 설치합니다.',
        resources: [],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'cc-basics',
    num: '02',
    phase: 'Claude Code',
    title: '기본 사용법 마스터',
    description: '핵심 명령어, 권한 모드, 세션 관리, 비용 관리를 익힙니다.',
    duration: '2시간',
    topics: [
      {
        title: '슬래시 커맨드',
        description: '/help(도움말), /model(모델 변경), /clear(초기화), /compact(토큰 절약), /resume(이전 세션 이어하기), /init(CLAUDE.md 생성), /plan(Plan Mode), /config(설정) 등 핵심 커맨드를 익힙니다.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: '3가지 권한 모드',
        description: 'Normal(매번 승인, 기본값), Auto-Accept(자동 승인, 숙련자만), Plan Mode(읽기 전용, 가장 안전). Shift+Tab으로 순환 전환합니다. 추천 흐름: Plan Mode → 계획 → Normal → 실행.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: '키보드 단축키',
        description: 'Shift+Tab(모드 전환), Shift+Enter(줄바꿈), Ctrl+C(중단), Ctrl+B(백그라운드 전환). 이 4개만 기억하면 충분합니다.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: '비용 & 토큰 관리',
        description: 'Claude.ai 구독(월 정액, 안전)과 API 종량제(토큰 과금, 주의 필요)의 차이. /cost로 현재 세션 비용 확인. /compact로 토큰 절약. Sonnet으로 모델 변경하여 비용 절감.',
        resources: [],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'cc-claudemd',
    num: '03',
    phase: 'Claude Code',
    title: 'CLAUDE.md — 프로젝트 메모리',
    description: 'AI에게 프로젝트 맥락을 알려주는 설정 파일의 핵심.',
    duration: '1.5시간',
    topics: [
      {
        title: 'CLAUDE.md란?',
        description: '프로젝트 루트에 위치하는 마크다운 파일로, Claude Code가 세션 시작 시 자동으로 읽습니다. 빌드 명령어, 코딩 규칙, 아키텍처 정보 등을 담아 AI의 맥락 이해를 높입니다.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: '효과적인 작성법',
        description: '빌드/테스트 명령어, 코드 스타일 규칙, 프로젝트 구조 설명, 자주 하는 실수 방지 규칙을 간결하게 작성합니다. /init으로 자동 생성 후 수정하는 것이 가장 쉬운 시작법.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: 'CLAUDE.md 계층 구조',
        description: '프로젝트 루트, 하위 디렉토리, ~/.claude/CLAUDE.md(글로벌)의 3단계 계층. 팀 전체 규칙은 루트에, 개인 규칙은 글로벌에, 모듈별 규칙은 해당 디렉토리에 배치합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'cc-prompting',
    num: '04',
    phase: 'Claude Code',
    title: '효과적인 프롬프팅',
    description: 'Claude Code에서 좋은 프롬프트를 쓰는 법, Plan Mode 활용, 컨텍스트 멘션.',
    duration: '2시간',
    topics: [
      {
        title: '좋은 프롬프트 작성법',
        description: '구체적인 요청(❌ "이거 고쳐줘" → ✅ "auth.ts의 JWT 만료 처리에서 refresh token 로직을 추가해줘"), 한 번에 하나의 작업, 완료 기준 명시. 모호하면 AI도 모호하게 답합니다.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: 'Plan Mode 활용',
        description: '복잡한 작업은 Plan Mode(/plan)로 먼저 계획을 세우게 합니다. 계획을 검토하고 동의한 후 Normal Mode로 전환하여 실행. "먼저 계획을 세워줘"로도 진입 가능.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '컨텍스트 멘션 (@파일, @URL)',
        description: '@파일명으로 특정 파일을 컨텍스트에 추가, @URL로 웹 문서를 참조시킵니다. 명시적 컨텍스트 제공이 AI의 정확도를 크게 높입니다.',
        resources: [],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'cc-mcp',
    num: '05',
    phase: 'Claude Code',
    title: 'MCP 서버 연결',
    description: 'GitHub, DB, API 등 외부 도구를 Claude Code에 연결합니다.',
    duration: '2시간',
    topics: [
      {
        title: 'MCP(Model Context Protocol)란?',
        description: 'AI가 외부 도구에 접근할 수 있게 해주는 표준 프로토콜입니다. 파일 시스템, 데이터베이스, API, 웹 브라우저 등을 AI에게 "도구"로 제공합니다.',
        resources: [
          { label: 'MCP 공식 사이트', url: 'https://modelcontextprotocol.io/' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: 'MCP 서버 설정',
        description: '.claude/settings.json 또는 claude mcp add 명령어로 MCP 서버를 등록합니다. project scope(팀 공유)와 user scope(개인)를 구분하여 설정합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '주요 MCP 서버',
        description: 'filesystem(파일 접근), github(이슈/PR), postgres/sqlite(DB 조회), puppeteer(브라우저), fetch(HTTP 요청) 등 자주 쓰이는 MCP 서버를 소개합니다.',
        resources: [
          { label: 'MCP 서버 목록', url: 'https://github.com/modelcontextprotocol/servers' },
        ],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'cc-agents',
    num: '06',
    phase: 'Claude Code',
    title: '서브에이전트 & 커스텀 에이전트',
    description: '병렬 작업과 전문 에이전트를 활용하여 복잡한 작업을 분할합니다.',
    duration: '2시간',
    topics: [
      {
        title: '서브에이전트 개념',
        description: 'Claude Code는 복잡한 작업을 여러 서브에이전트에게 위임할 수 있습니다. 메인 에이전트가 계획을 세우고, 서브에이전트들이 파일 검색, 코드 작성, 테스트 등을 병렬로 수행합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '커스텀 에이전트 만들기',
        description: 'CLAUDE.md와 슬래시 커맨드를 활용하여 특정 역할의 에이전트를 정의합니다. 코드 리뷰 전문, 테스트 작성 전문, 문서화 전문 등 역할별 에이전트를 구성합니다.',
        resources: [],
        difficulty: 'advanced',
      },
    ],
  },
  {
    id: 'cc-skills-hooks',
    num: '07',
    phase: 'Claude Code',
    title: 'Skills & Hooks',
    description: '자동으로 로드되는 스킬 시스템과 라이프사이클 자동화.',
    duration: '2시간',
    topics: [
      {
        title: 'Skills 시스템',
        description: '특정 도메인에 대한 지식과 도구를 패키지화한 것이 Skill입니다. 프로젝트에 맞는 스킬을 설치하면 AI가 해당 분야의 베스트 프랙티스를 자동으로 적용합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: 'Hooks 설정',
        description: 'Claude Code의 라이프사이클에 자동화를 연결합니다. 커밋 전 린트 실행, 파일 저장 후 테스트 실행, 세션 시작 시 환경 체크 등을 자동으로 수행합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '자동화 활용 예시',
        description: 'PreToolUse(도구 실행 전), PostToolUse(도구 실행 후), Notification(알림) 등의 훅 타입별 실전 설정 예시를 다룹니다.',
        resources: [],
        difficulty: 'advanced',
      },
    ],
  },
  {
    id: 'cc-workflow',
    num: '08',
    phase: 'Claude Code',
    title: '실전 워크플로우',
    description: 'Git 협업, PR 리뷰, 디버깅 등 실전 개발 워크플로우.',
    duration: '2시간',
    topics: [
      {
        title: 'Git 워크플로우',
        description: '브랜치 생성, 커밋 메시지 작성, 충돌 해결을 Claude Code와 함께 합니다. "이 변경사항을 커밋해줘"부터 복잡한 리베이스까지.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: 'PR 리뷰 자동화',
        description: 'claude -p를 활용한 비대화형 코드 리뷰. CI/CD 파이프라인에 통합하여 PR이 올라오면 자동으로 리뷰 코멘트를 생성합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '디버깅 실전',
        description: '에러 로그를 Claude Code에 파이프(cat error.log | claude -p "분석해줘"), 브레이크포인트 설정 가이드, 재현 가능한 테스트 작성까지의 디버깅 플로우.',
        resources: [],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'cc-advanced',
    num: '09',
    phase: 'Claude Code',
    title: '고급 기능 & 팀 협업',
    description: 'Agent Teams, Worktree 격리, Teleport, Plugin 등 고급 기능.',
    duration: '2시간',
    topics: [
      {
        title: 'Agent Teams',
        description: '여러 Claude Code 인스턴스가 각자 다른 작업을 병렬로 수행합니다. 프론트엔드/백엔드/테스트를 동시에 진행하는 팀 코딩.',
        resources: [],
        difficulty: 'advanced',
      },
      {
        title: 'Worktree 격리',
        description: 'Git worktree를 활용하여 각 에이전트가 독립된 작업 공간에서 충돌 없이 작업합니다. 메인 브랜치를 건드리지 않고 안전하게 병렬 개발.',
        resources: [],
        difficulty: 'advanced',
      },
      {
        title: 'Teleport & Plugin',
        description: 'Teleport로 원격 서버의 코드를 로컬처럼 작업, Plugin으로 Claude Code의 기능을 확장합니다.',
        resources: [],
        difficulty: 'advanced',
      },
    ],
  },
  {
    id: 'cc-project',
    num: '10',
    phase: 'Claude Code',
    title: '실전 프로젝트',
    description: '처음부터 끝까지 Claude Code로 앱을 완성합니다.',
    duration: '3시간',
    topics: [
      {
        title: '프로젝트 기획 & 초기 설정',
        description: 'Plan Mode로 프로젝트 구조를 설계하고, CLAUDE.md를 작성하고, 기본 환경을 셋업합니다. "할 일 관리 앱을 만들자" 같은 자연어 기획부터 시작.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '핵심 기능 개발',
        description: 'Normal Mode에서 기능을 하나씩 구현합니다. Claude Code가 파일을 생성하고, 코드를 작성하고, 테스트를 돌리는 전 과정을 체험합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '테스트 & 배포',
        description: '테스트 코드 생성, 버그 수정, 빌드, 배포까지. Claude Code와 함께 프로젝트를 완성하고 GitHub에 올리는 것까지 진행합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // PART 3: AI 자동화
  // ──────────────────────────────────────────────
  {
    id: 'automation',
    num: '11',
    phase: 'AI 심화',
    title: 'AI 자동화 & 워크플로우',
    description: '반복 작업을 AI로 자동화하고, 나만의 AI 워크플로우를 구축합니다.',
    duration: '2~3주',
    topics: [
      {
        title: 'AI 워크플로우 자동화 (n8n, Make)',
        description: '코드 없이 AI를 워크플로우에 연결합니다. "이메일이 오면 AI가 요약 → 슬랙에 전달" 같은 자동화를 구축합니다.',
        resources: [
          { label: 'n8n 공식 문서', url: 'https://docs.n8n.io/' },
          { label: 'Make (구 Integromat)', url: 'https://www.make.com' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: 'AI API 활용 기초',
        description: 'Claude API, OpenAI API를 직접 호출하는 방법. API 키 발급, 간단한 스크립트 작성, 응답 처리.',
        resources: [
          { label: 'Anthropic API 문서', url: 'https://docs.anthropic.com/en/api' },
          { label: 'OpenAI API 문서', url: 'https://platform.openai.com/docs' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: 'AI 에이전트 심화',
        description: '단순 챗봇을 넘어 스스로 계획하고 도구를 사용하는 AI 에이전트의 개념. 멀티 에이전트 시스템과 미래의 AI 활용.',
        resources: [
          { label: 'Anthropic — AI 에이전트 연구', url: 'https://www.anthropic.com/research' },
        ],
        difficulty: 'advanced',
      },
    ],
  },
];
