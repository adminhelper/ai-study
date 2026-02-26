export interface DeepSection {
  id: string;
  title: string;
  description: string;
  topics: DeepTopic[];
}

export interface DeepTopic {
  title: string;
  description: string;
  resources: { label: string; url: string }[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const claudeCodeDeepData: DeepSection[] = [
  // ──────────────────────────────────────────────
  // 1. 소개
  // ──────────────────────────────────────────────
  {
    id: 'deep-intro',
    title: '소개',
    description: 'Claude Code가 무엇이고, 어떤 원리로 작동하는지 이해합니다.',
    topics: [
      {
        title: '코딩 에이전트란?',
        description: 'AI가 코드를 자동완성하는 수준을 넘어, 스스로 계획하고 → 코드를 작성하고 → 테스트하고 → 디버깅하는 자율적 소프트웨어 개체입니다. 사람이 요구사항만 주면 나머지를 알아서 처리합니다.',
        resources: [
          { label: 'IBM — AI 에이전트란?', url: 'https://www.ibm.com/think/topics/ai-agents' },
          { label: 'Google Cloud — AI 에이전트 정의', url: 'https://cloud.google.com/discover/what-are-ai-agents' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '에이전틱 루프',
        description: 'Claude Code는 "읽기 → 계획 → 실행 → 검증"을 반복하는 에이전틱 루프로 작동합니다. 한 번의 명령으로 여러 파일을 수정하고, 테스트를 돌리고, 결과를 확인하는 전 과정을 자동 반복합니다.',
        resources: [
          { label: 'Claude Code 작동 원리', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '바이브 코딩이란?',
        description: '"이런 느낌으로 만들어줘"처럼 자연어로 코딩하는 새로운 패러다임입니다. 정확한 명세 대신 의도와 분위기를 전달하면 AI가 코드를 생성합니다. 빠르지만 품질 관리에 주의가 필요합니다.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: 'Claude Code 워크플로우',
        description: 'Explore(코드베이스 탐색) → Plan(계획 수립) → Implement(코드 작성) → Verify(테스트/린트 검증)의 4단계 워크플로우. CLAUDE.md를 읽고 프로젝트 맥락을 파악한 뒤 작업을 시작합니다.',
        resources: [
          { label: '공식 — How Claude Code Works', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
          { label: '공식 — Common Workflows', url: 'https://docs.anthropic.com/en/docs/claude-code/common-workflows' },
        ],
        difficulty: 'beginner',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 2. 설치 & 시작
  // ──────────────────────────────────────────────
  {
    id: 'deep-setup',
    title: '설치 & 시작',
    description: '환경별 설치, 인증, 요금제를 이해하고 첫 세션을 시작합니다.',
    topics: [
      {
        title: '설치 & 인증',
        description: 'macOS: brew install claude-code, Windows: winget install Anthropic.ClaudeCode. 설치 후 claude 명령어로 실행하면 브라우저에서 로그인 인증이 진행됩니다.',
        resources: [
          { label: '공식 — Getting Started', url: 'https://docs.anthropic.com/en/docs/claude-code/getting-started' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '구독 & 요금제',
        description: 'Claude.ai 구독(Max Plan, 월 정액)과 API 종량제(토큰당 과금) 두 가지 방식이 있습니다. 입문자는 월 정액이 안전하고, 대량 사용 시 API가 유리할 수 있습니다.',
        resources: [
          { label: 'Claude 요금제', url: 'https://www.anthropic.com/pricing' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '사용 환경 (CLI / Desktop / IDE)',
        description: '터미널 CLI가 기본이며, VS Code/JetBrains 확장으로 IDE 내에서도 사용 가능합니다. 데스크톱 앱은 터미널 없이 GUI로 접근할 수 있는 옵션입니다.',
        resources: [
          { label: '공식 — IDE 연동', url: 'https://docs.anthropic.com/en/docs/claude-code/ide-integrations' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '첫 세션 시작하기',
        description: '프로젝트 폴더에서 claude를 실행하면 세션이 시작됩니다. /help로 사용 가능한 명령어를 확인하고, 간단한 질문부터 시작해보세요. 종료는 /exit 또는 Ctrl+D.',
        resources: [],
        difficulty: 'beginner',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 3. 핵심 명령어
  // ──────────────────────────────────────────────
  {
    id: 'deep-commands',
    title: '핵심 명령어',
    description: 'claude CLI의 주요 플래그와 실행 모드를 익힙니다.',
    topics: [
      {
        title: 'claude 기본 명령어',
        description: '프로젝트 디렉토리에서 claude를 실행하면 대화형 세션이 시작됩니다. 자연어로 코드 작성, 수정, 설명, 디버깅을 요청할 수 있습니다.',
        resources: [
          { label: '공식 — CLI Reference', url: 'https://docs.anthropic.com/en/docs/claude-code/cli-reference' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'claude -p (비대화형 모드)',
        description: '파이프라인이나 스크립트에서 사용하는 비대화형 모드입니다. echo "코드 리뷰해줘" | claude -p 형태로 CI/CD에 통합하거나 일괄 처리에 활용합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: 'claude -c (세션 이어하기)',
        description: '가장 최근 세션을 이어서 작업합니다. 이전 대화의 맥락이 유지되므로, 중단했던 작업을 자연스럽게 계속할 수 있습니다.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: 'claude -r (특정 세션 재개)',
        description: '세션 ID를 지정하여 과거 특정 세션을 재개합니다. claude --resume SESSION_ID 형태로 사용하며, 여러 작업을 병렬로 관리할 때 유용합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '--add-dir (디렉토리 추가)',
        description: '현재 프로젝트 외의 디렉토리를 컨텍스트에 추가합니다. 모노레포나 관련 프로젝트를 동시에 참조할 때 사용합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '주요 활용 사례',
        description: '코드 작성, 버그 수정, 리팩토링, 테스트 생성, 문서화, Git 커밋, PR 리뷰, 코드 설명 등. Claude Code는 개발 라이프사이클 전반에 걸쳐 활용할 수 있습니다.',
        resources: [
          { label: '공식 — Common Workflows', url: 'https://docs.anthropic.com/en/docs/claude-code/common-workflows' },
        ],
        difficulty: 'beginner',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 4. 컨텍스트 관리
  // ──────────────────────────────────────────────
  {
    id: 'deep-context',
    title: '컨텍스트 관리',
    description: 'AI의 성능을 좌우하는 컨텍스트를 효과적으로 관리합니다.',
    topics: [
      {
        title: '컨텍스트의 이해',
        description: 'Claude Code가 한 번에 처리할 수 있는 정보량(컨텍스트 윈도우)은 제한적입니다. 불필요한 컨텍스트는 성능을 떨어뜨리므로, 관련 파일만 정확히 제공하는 것이 중요합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: 'CLAUDE.md 작성법',
        description: '프로젝트 루트의 마크다운 파일로, 세션 시작 시 자동으로 읽힙니다. 빌드 명령어, 코딩 규칙, 아키텍처 설명, 자주 하는 실수 방지 규칙을 간결하게 기록합니다.',
        resources: [
          { label: '공식 — CLAUDE.md', url: 'https://docs.anthropic.com/en/docs/claude-code/memory' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'CLAUDE.md 구조화 전략',
        description: '효과적인 CLAUDE.md는 "프로젝트 개요 → 빌드/테스트 명령어 → 코드 스타일 → 주의사항" 순서로 구성합니다. 너무 길면 오히려 역효과이므로 핵심만 간결하게.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '파일 위치 & 계층',
        description: '프로젝트 루트 CLAUDE.md, 하위 디렉토리 CLAUDE.md, ~/.claude/CLAUDE.md(글로벌)의 3단계 계층. 팀 규칙은 루트, 개인 설정은 글로벌, 모듈별 규칙은 해당 디렉토리에 배치합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '메모리 시스템',
        description: 'Claude Code는 /init으로 생성한 CLAUDE.md 외에도 세션 간 메모리를 유지할 수 있습니다. 학습된 교훈(#로 시작하는 메모)이 자동으로 기록되어 반복 실수를 방지합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 5. 모드 & 권한
  // ──────────────────────────────────────────────
  {
    id: 'deep-modes',
    title: '모드 & 권한',
    description: '3가지 권한 모드와 Plan Mode를 상황에 맞게 활용합니다.',
    topics: [
      {
        title: '권한 모드 (Normal / Auto / Plan)',
        description: 'Normal: 파일 수정 전 매번 승인(기본값, 안전). Auto-Accept: 자동 승인(숙련자, 주의 필요). Plan Mode: 읽기 전용(가장 안전, 계획 수립용). Shift+Tab으로 순환 전환.',
        resources: [
          { label: '공식 — Permission Modes', url: 'https://docs.anthropic.com/en/docs/claude-code/security' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'Plan Mode 실전 활용',
        description: '복잡한 작업은 Plan Mode로 먼저 계획을 검토한 뒤 Normal Mode로 전환하여 실행합니다. "먼저 계획을 세워줘"로도 진입 가능. 대규모 리팩토링이나 새 기능 개발에 필수적입니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '보안 베스트 프랙티스',
        description: 'API 키나 비밀번호가 포함된 파일은 .claudeignore에 등록합니다. Auto-Accept 모드에서는 의도치 않은 파일 삭제나 위험한 명령어 실행에 주의해야 합니다.',
        resources: [
          { label: '공식 — Security', url: 'https://docs.anthropic.com/en/docs/claude-code/security' },
        ],
        difficulty: 'intermediate',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 6. 슬래시 커맨드
  // ──────────────────────────────────────────────
  {
    id: 'deep-slash',
    title: '슬래시 커맨드',
    description: '세션 내에서 사용하는 슬래시 커맨드를 기능별로 정리합니다.',
    topics: [
      {
        title: '핵심 커맨드 (/help, /init, /clear, /compact)',
        description: '/help: 사용 가능한 명령어 목록. /init: CLAUDE.md 자동 생성. /clear: 컨텍스트 초기화(새 주제 시작 시). /compact: 대화를 요약하여 토큰을 절약(긴 세션 필수).',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: '세션 관리 (/resume, /exit, /stop)',
        description: '/resume: 이전 세션 목록에서 선택하여 재개. /exit: 세션 종료(Ctrl+D와 동일). /stop: 현재 진행 중인 작업을 중단.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: '설정 & 정보 (/model, /status, /config, /cost)',
        description: '/model: 사용 중인 모델 변경(Sonnet↔Opus). /status: 현재 세션 상태 확인. /config: 설정 파일 편집. /cost: 현재 세션의 토큰 사용량과 비용 확인.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: '유틸리티 (/doctor, /export, /rewind, /plan)',
        description: '/doctor: 환경 진단(설치 문제 해결). /export: 대화 내용을 마크다운으로 내보내기. /rewind: 이전 상태로 되돌리기(실수 복구). /plan: Plan Mode 진입.',
        resources: [],
        difficulty: 'intermediate',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 7. 키보드 단축키
  // ──────────────────────────────────────────────
  {
    id: 'deep-shortcuts',
    title: '키보드 단축키',
    description: '빠른 조작을 위한 핵심 단축키를 익힙니다.',
    topics: [
      {
        title: 'Shift+Tab (모드 전환)',
        description: 'Normal → Auto-Accept → Plan Mode를 순환합니다. 가장 많이 쓰는 단축키로, 계획 수립과 실행 사이를 빠르게 전환할 수 있습니다.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: '실행 제어 (Ctrl+C, Esc)',
        description: 'Ctrl+C: 현재 작업을 중단하고 프롬프트로 돌아갑니다. Esc: 현재 입력을 취소. Esc Esc(두 번): 진행 중인 응답을 즉시 중단합니다.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: '기타 단축키',
        description: 'Ctrl+R: 히스토리 검색(이전 입력 재사용). Shift+Enter: 줄바꿈(여러 줄 입력). Ctrl+B: 백그라운드로 전환.',
        resources: [],
        difficulty: 'beginner',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 8. 모델 선택 & 설정
  // ──────────────────────────────────────────────
  {
    id: 'deep-models',
    title: '모델 선택 & 설정',
    description: '상황에 맞는 모델을 선택하고 설정을 최적화합니다.',
    topics: [
      {
        title: '사용 가능한 모델',
        description: 'Claude Code는 여러 Claude 모델을 지원합니다. /model 명령어로 세션 중에도 전환 가능합니다. 각 모델은 속도, 품질, 비용이 다르므로 작업 성격에 맞게 선택합니다.',
        resources: [
          { label: 'Anthropic — Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'Sonnet — 일상 작업용',
        description: '속도와 품질의 균형이 잡힌 기본 모델입니다. 일반적인 코딩, 리팩토링, 문서화에 적합합니다. 비용 효율이 가장 좋아 일상 작업에 권장됩니다.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: 'Opus — 복잡한 추론용',
        description: '가장 강력한 모델로, 복잡한 아키텍처 설계, 어려운 버그 디버깅, 대규모 리팩토링에 적합합니다. 느리고 비싸지만 품질이 뛰어납니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: 'Haiku — 빠른 작업용',
        description: '가장 빠르고 저렴한 모델입니다. 간단한 질문, 코드 설명, 작은 수정에 적합합니다. 복잡한 작업에는 품질이 부족할 수 있습니다.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: 'Thinking Modes & Effort',
        description: 'Extended Thinking을 활성화하면 모델이 답변 전에 "생각하는 시간"을 갖습니다. 복잡한 문제에서 정확도가 올라가지만 응답 시간이 길어집니다. effort 파라미터로 사고 깊이를 조절합니다.',
        resources: [],
        difficulty: 'advanced',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 9. MCP (Model Context Protocol)
  // ──────────────────────────────────────────────
  {
    id: 'deep-mcp',
    title: 'MCP (Model Context Protocol)',
    description: 'AI와 외부 도구를 연결하는 표준 프로토콜을 이해하고 설정합니다.',
    topics: [
      {
        title: 'MCP 개요',
        description: 'AI가 파일시스템, 데이터베이스, API, 브라우저 등 외부 도구에 접근할 수 있게 해주는 오픈 표준입니다. Claude Code에 "도구"를 부여하여 능력을 확장합니다.',
        resources: [
          { label: 'MCP 공식 사이트', url: 'https://modelcontextprotocol.io/' },
          { label: 'MCP 서버 목록', url: 'https://github.com/modelcontextprotocol/servers' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: 'MCP 서버 연결 & 설정',
        description: 'claude mcp add 명령어 또는 .claude/settings.json으로 MCP 서버를 등록합니다. project scope(팀 공유)와 user scope(개인)를 구분하여 관리합니다.',
        resources: [
          { label: '공식 — MCP 설정', url: 'https://docs.anthropic.com/en/docs/claude-code/mcp' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '주요 MCP 서버',
        description: 'filesystem(파일 접근), github(이슈/PR 관리), postgres/sqlite(DB 조회), puppeteer(브라우저 자동화), fetch(HTTP 요청) 등이 자주 사용됩니다. 필요에 따라 커스텀 MCP 서버를 만들 수도 있습니다.',
        resources: [
          { label: 'MCP 서버 목록', url: 'https://github.com/modelcontextprotocol/servers' },
        ],
        difficulty: 'intermediate',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 10. Hooks (자동화 후크)
  // ──────────────────────────────────────────────
  {
    id: 'deep-hooks',
    title: 'Hooks (자동화 후크)',
    description: 'Claude Code의 라이프사이클에 자동화를 연결합니다.',
    topics: [
      {
        title: 'Hooks 개요',
        description: 'Hook은 특정 이벤트가 발생할 때 자동으로 실행되는 셸 명령어입니다. 커밋 전 린트 실행, 파일 저장 후 테스트 실행 등을 자동화하여 일관된 품질을 유지합니다.',
        resources: [
          { label: '공식 — Hooks', url: 'https://docs.anthropic.com/en/docs/claude-code/hooks' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: 'Hook 타입',
        description: 'PreToolUse(도구 실행 전), PostToolUse(도구 실행 후), UserPromptSubmit(프롬프트 제출 시), SessionStart(세션 시작), SessionEnd(세션 종료). 각 타입마다 다른 자동화 시나리오에 적합합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '이벤트 매처 & 필터',
        description: 'Hook이 언제 실행될지를 세밀하게 제어합니다. 특정 도구(예: Write)에만 반응하거나, 특정 파일 패턴에만 적용하는 등의 조건을 설정할 수 있습니다.',
        resources: [],
        difficulty: 'advanced',
      },
      {
        title: 'Hook 입력 & 출력',
        description: 'Hook은 stdin으로 JSON 데이터를 받고, stdout으로 결과를 반환합니다. 이벤트 정보(도구 이름, 파일 경로 등)를 활용하여 조건부 로직을 구현합니다.',
        resources: [],
        difficulty: 'advanced',
      },
      {
        title: '실전 Hook 예시',
        description: 'Write 도구 실행 후 자동 린트, 세션 시작 시 환경 체크, 커밋 전 테스트 실행, 특정 디렉토리 수정 방지 등. .claude/settings.json의 hooks 섹션에 설정합니다.',
        resources: [],
        difficulty: 'advanced',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 11. Skills (스킬 시스템)
  // ──────────────────────────────────────────────
  {
    id: 'deep-skills',
    title: 'Skills (스킬 시스템)',
    description: '도메인별 전문 지식을 패키지화하여 AI의 능력을 확장합니다.',
    topics: [
      {
        title: 'Skills 시스템 개요',
        description: '특정 도메인(프론트엔드, 테스트, 배포 등)에 대한 지식과 도구를 패키지화한 것이 Skill입니다. 프로젝트에 맞는 스킬을 설치하면 AI가 해당 분야의 베스트 프랙티스를 자동으로 적용합니다.',
        resources: [
          { label: '공식 — Skills', url: 'https://docs.anthropic.com/en/docs/claude-code/skills' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '스킬 만들기',
        description: '.claude/skills/ 디렉토리에 마크다운 파일로 스킬을 정의합니다. 역할, 규칙, 도구 사용법, 예시를 포함하여 Claude Code에게 전문가 역할을 부여합니다.',
        resources: [],
        difficulty: 'advanced',
      },
      {
        title: '스킬 범위 & 관리',
        description: '프로젝트 스킬(.claude/skills/)은 해당 프로젝트에서만, 글로벌 스킬(~/.claude/skills/)은 모든 프로젝트에서 적용됩니다. 팀 공유 스킬은 Git으로 버전 관리합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: 'MCP용 스킬',
        description: 'MCP 서버에 대한 사용법을 스킬로 정의하면, Claude Code가 MCP 도구를 더 효과적으로 활용합니다. "이 DB에는 이런 스키마가 있고, 쿼리는 이렇게 작성해"와 같은 맥락을 제공합니다.',
        resources: [],
        difficulty: 'advanced',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 12. 에이전트 & 서브에이전트
  // ──────────────────────────────────────────────
  {
    id: 'deep-agents',
    title: '에이전트 & 서브에이전트',
    description: '복잡한 작업을 여러 에이전트로 분할하여 병렬 처리합니다.',
    topics: [
      {
        title: '서브에이전트 개요',
        description: 'Claude Code는 복잡한 작업을 서브에이전트에게 위임할 수 있습니다. 메인 에이전트가 계획을 세우고, 서브에이전트가 파일 검색/코드 작성/테스트를 병렬로 수행합니다.',
        resources: [
          { label: '공식 — Sub-agents', url: 'https://docs.anthropic.com/en/docs/claude-code/sub-agents' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '서브에이전트 만들기',
        description: 'CLAUDE.md에 서브에이전트 규칙을 정의하거나, 커스텀 슬래시 커맨드로 특정 역할의 에이전트를 호출합니다. 코드 리뷰 전문, 테스트 작성 전문 등 역할별로 구성합니다.',
        resources: [],
        difficulty: 'advanced',
      },
      {
        title: 'Agent Team',
        description: '여러 Claude Code 인스턴스를 동시에 실행하여 프론트엔드/백엔드/테스트를 병렬로 진행합니다. 각 에이전트는 독립적으로 작업하고 결과를 메인 에이전트가 통합합니다.',
        resources: [],
        difficulty: 'advanced',
      },
      {
        title: 'Git Worktree 격리',
        description: 'Git worktree를 활용하여 각 에이전트가 독립된 작업 공간에서 충돌 없이 작업합니다. 메인 브랜치를 건드리지 않고 안전하게 병렬 개발이 가능합니다.',
        resources: [],
        difficulty: 'advanced',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 13. 확장 & 통합
  // ──────────────────────────────────────────────
  {
    id: 'deep-extend',
    title: '확장 & 통합',
    description: 'Claude Code의 기능을 확장하고 다양한 환경에 통합합니다.',
    topics: [
      {
        title: '플러그인',
        description: 'Claude Code의 기능을 확장하는 플러그인을 설치하거나 직접 만들 수 있습니다. 커뮤니티에서 만든 플러그인으로 워크플로우를 개선합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: 'Headless Mode',
        description: '사용자 인터페이스 없이 Claude Code를 실행합니다. CI/CD 파이프라인, 자동화 스크립트, 서버 환경에서 활용합니다. -p 플래그와 함께 사용하면 완전 자동화가 가능합니다.',
        resources: [],
        difficulty: 'advanced',
      },
      {
        title: 'API 활용',
        description: 'Claude Code를 프로그래밍 방식으로 호출하여 커스텀 도구를 만듭니다. 자동 코드 리뷰 봇, 코드 생성 파이프라인, 문서 자동화 등에 활용합니다.',
        resources: [
          { label: 'Anthropic API 문서', url: 'https://docs.anthropic.com/en/api' },
        ],
        difficulty: 'advanced',
      },
      {
        title: '커뮤니티 도구 & 확장',
        description: 'Claude Code 생태계에서 만들어진 서드파티 도구들입니다. 커스텀 MCP 서버, 워크플로우 템플릿, 프롬프트 라이브러리 등을 활용합니다. 설치 전 신뢰성을 확인하세요.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: 'IDE 확장 주의사항',
        description: 'VS Code/JetBrains 확장 사용 시 다른 AI 확장과의 충돌, 성능 영향, 보안 문제에 주의합니다. 불필요한 AI 확장은 비활성화하여 깔끔한 환경을 유지하세요.',
        resources: [],
        difficulty: 'intermediate',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 14. 비용 최적화 & 베스트 프랙티스
  // ──────────────────────────────────────────────
  {
    id: 'deep-best',
    title: '비용 최적화 & 베스트 프랙티스',
    description: '효율적으로 사용하고 비용을 관리하는 실전 팁.',
    topics: [
      {
        title: '사용 베스트 프랙티스',
        description: '"Plan First, Implement Second" 원칙. 복잡한 작업은 Plan Mode로 먼저 계획 → 검토 → Normal Mode로 실행. CLAUDE.md를 최신 상태로 유지하고, 한 번에 하나의 작업에 집중합니다.',
        resources: [
          { label: '공식 — Best Practices', url: 'https://docs.anthropic.com/en/docs/claude-code/best-practices' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '/compact & /clear 활용',
        description: '긴 세션에서는 /compact로 대화를 요약하여 토큰을 절약합니다. 주제가 완전히 바뀌면 /clear로 초기화. 컨텍스트가 깨끗할수록 AI 응답 품질이 올라갑니다.',
        resources: [],
        difficulty: 'beginner',
      },
      {
        title: '프롬프트 캐싱',
        description: '반복되는 프롬프트 패턴을 캐싱하여 비용과 응답 시간을 줄입니다. CLAUDE.md의 내용은 자동으로 캐싱되므로, 자주 사용하는 지시사항을 CLAUDE.md에 포함하면 효율적입니다.',
        resources: [],
        difficulty: 'advanced',
      },
      {
        title: '토큰 사용량 줄이기',
        description: '구체적인 프롬프트 작성(모호한 요청 피하기), 불필요한 파일 컨텍스트 제거, Sonnet/Haiku로 모델 다운그레이드, /compact 주기적 사용. /cost로 사용량을 모니터링합니다.',
        resources: [],
        difficulty: 'intermediate',
      },
      {
        title: '요금제 이해 & 선택',
        description: 'Claude.ai Max Plan(월 정액, 안전)과 API 종량제(토큰당 과금)의 차이를 이해합니다. 입문자는 월 정액 추천, 대량 사용 시 API + 비용 한도 설정이 효율적입니다.',
        resources: [
          { label: 'Anthropic 요금제', url: 'https://www.anthropic.com/pricing' },
        ],
        difficulty: 'beginner',
      },
    ],
  },
];
