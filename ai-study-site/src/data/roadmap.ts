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
    description: 'ChatGPT, Claude, Gemini 중 어떤 걸 써야 할지 모르겠다면 여기서 시작하세요. 각 서비스의 강점, 무료/유료 차이, 첫 대화 팁까지 한 번에 정리합니다.',
    duration: '1~2일',
    topics: [
      {
        title: '생성형 AI란?',
        description: '구글 검색은 "이미 있는 페이지"를 찾아주고, 생성형 AI는 "없던 콘텐츠"를 만들어줍니다. 예를 들어 "신입사원 환영 이메일 써줘"라고 하면, 검색엔진은 템플릿 사이트를 보여주지만, Claude는 즉시 완성된 이메일을 작성합니다. 핵심 원리는 간단합니다: 인터넷의 방대한 텍스트를 학습한 AI가 "다음에 올 가장 자연스러운 단어"를 계속 예측하는 것입니다. 그래서 글, 코드, 번역, 요약을 할 수 있지만, "정답을 검색"하는 게 아니라 "그럴듯한 답을 생성"하는 것이라는 점을 기억하세요.',
        resources: [
          { label: 'Google — 생성형 AI 소개', url: 'https://cloud.google.com/ai/generative-ai' },
          { label: 'Anthropic — Claude란?', url: 'https://www.anthropic.com/claude' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '주요 AI 서비스 비교',
        description: '2026년 초 기준 AI 경쟁이 어느 때보다 치열합니다. 주요 서비스 비교: Claude (Opus 4.6) — 코딩·추론·긴 문서 분석 최강, 1M 토큰 컨텍스트(약 750K 단어). SWE-bench 코딩 벤치마크 1위. GPT-5 (ChatGPT) — 수학·범용 추론·이미지 생성(DALL-E) 강점, 400K 컨텍스트. 가장 큰 생태계. Gemini 3 — 구글 서비스(Gmail, Docs, Search) 완전 통합 + Deep Think 추론. 가성비 최강. Perplexity — 실시간 웹 검색 + AI 답변 결합, 최신 정보에 강점. DeepSeek — 오픈소스 최강, 무료 사용 가능, 추론 성능 세계 최정상급. 선택 기준: ① 코딩·문서 분석 → Claude, ② 범용·이미지 생성 → ChatGPT, ③ 구글 연동 → Gemini, ④ 검색 중심 → Perplexity, ⑤ 비용 민감 → DeepSeek. 무료 플랜으로 각각 하루씩 써보고 결정하세요.',
        resources: [
          { label: 'Claude', url: 'https://claude.ai' },
          { label: 'ChatGPT', url: 'https://chat.openai.com' },
          { label: 'Gemini', url: 'https://gemini.google.com' },
          { label: 'Perplexity', url: 'https://www.perplexity.ai' },
          { label: 'DeepSeek', url: 'https://chat.deepseek.com' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '첫 대화 — 이렇게 시작하세요',
        description: '처음 AI를 쓸 때 흔한 실수: "안녕하세요" 한마디만 치고 뭘 해야 할지 모르는 것. 바로 써먹을 수 있는 첫 프롬프트 3개를 소개합니다. ① "오늘 팀 회의에서 논의된 내용을 요약해줘: [회의 내용 붙여넣기]" ② "이 이메일을 정중하지만 간결하게 다시 써줘: [이메일 붙여넣기]" ③ "이 개념을 초등학생도 이해할 수 있게 설명해줘: [개념]". 핵심 팁: AI는 구체적으로 요청할수록 좋은 답을 줍니다. "좋은 글 써줘" 보다 "LinkedIn에 올릴 300자 이내의 AI 트렌드 포스트를 써줘"가 10배 좋은 결과를 만듭니다.',
        resources: [
          { label: 'Anthropic — Claude 시작 가이드', url: 'https://docs.anthropic.com/en/docs/initial-setup' },
          { label: 'OpenAI — ChatGPT 시작하기', url: 'https://help.openai.com/en/articles/6783457-chatgpt-general-faq' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'AI의 한계 — 반드시 알아야 할 3가지',
        description: 'AI를 100% 신뢰하면 큰 실수를 합니다. 반드시 알아야 할 한계 3가지: ① 환각(Hallucination) — AI가 자신있게 틀린 답을 말합니다. 실제로 "서울 강남구 맛집 전화번호"를 물으면 존재하지 않는 번호를 그럴듯하게 지어냅니다. 숫자·날짜·인용은 반드시 원본을 확인하세요. ② 최신 정보 부재 — 학습 데이터에 컷오프가 있어 "어제 주가"나 "오늘 날씨"를 모릅니다. 최신 정보가 필요하면 Perplexity나 검색 연동 AI를 사용하세요. ③ 편향 — 학습 데이터에 포함된 편견이 출력에 반영될 수 있습니다. 중요한 의사결정에는 AI 답변을 참고만 하고 직접 판단하세요.',
        resources: [
          { label: 'Anthropic — Claude 사용 가이드', url: 'https://docs.anthropic.com/en/docs/about-claude/use-case-guides' },
          { label: 'OpenAI — AI 안전성', url: 'https://openai.com/safety' },
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
    description: '같은 AI를 써도 결과가 10배 차이나는 이유는 "질문하는 방법" 때문입니다. 이 모듈에서 AI에게 원하는 답을 정확히 뽑아내는 기술을 익히세요.',
    duration: '1~2주',
    topics: [
      {
        title: '좋은 프롬프트의 4요소',
        description: '좋은 프롬프트에는 4가지 요소가 있습니다. ① 역할(Role): "당신은 10년 경력의 마케팅 전문가입니다" ② 맥락(Context): "B2B SaaS 스타트업의 신제품 런칭을 준비하고 있습니다" ③ 지시(Task): "제품 소개 이메일을 3가지 톤(격식체, 캐주얼, 유머)으로 작성해주세요" ④ 형식(Format): "각각 200자 이내, 제목 포함". 비교 예시 — ❌ "마케팅 이메일 써줘" → 두루뭉술한 결과. ✅ 위의 4요소를 포함한 프롬프트 → 바로 사용 가능한 결과. 처음에는 복잡해 보이지만, 한 번 만들어 놓으면 계속 재사용할 수 있습니다.',
        resources: [
          { label: 'Anthropic 프롬프트 엔지니어링 가이드', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
          { label: 'OpenAI 프롬프트 엔지니어링 가이드', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'System Prompt — AI에게 역할 부여하기',
        description: 'System Prompt는 대화 전체에 적용되는 "기본 설정"입니다. 예를 들어 Claude의 System Prompt에 "당신은 한국 세법에 정통한 10년 경력 세무사입니다. 항상 관련 법 조항을 인용하며, 불확실한 내용은 \'확인이 필요합니다\'라고 표시합니다"라고 입력하면, 이후 모든 답변이 세무사 관점에서 나옵니다. 실전 팁: ① 전문 분야 + 경력 연수를 명시하면 답변 깊이가 달라집니다 ② "불확실하면 모른다고 말해줘"를 추가하면 환각이 줄어듭니다 ③ 자주 쓰는 역할은 메모장에 저장해두고 복사해서 사용하세요.',
        resources: [
          { label: 'Anthropic — System Prompt 가이드', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts' },
          { label: 'Anthropic Prompt Library', url: 'https://docs.anthropic.com/en/prompt-library' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'Few-shot & Chain of Thought',
        description: 'AI의 정확도를 극적으로 높이는 2가지 핵심 기법입니다. Few-shot: 원하는 출력 형태의 예시를 2~3개 먼저 보여주는 것. 예: "다음 형식으로 요약해줘 — 제목: [한 줄 요약], 핵심: [3가지 bullet], 액션: [해야 할 일]. 예시1: [예시 제공]". 예시를 보면 AI가 패턴을 학습하여 일관된 결과를 냅니다. Chain of Thought(CoT): "단계별로 생각해봐"를 추가하는 것. 수학 문제, 논리 추론, 코드 디버깅에서 정답률이 40~70% 향상됩니다. 사용법: 프롬프트 끝에 "step by step으로 풀어줘" 한 줄만 추가하세요.',
        resources: [
          { label: 'Anthropic — Chain of Thought', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought' },
          { label: 'Anthropic — 프롬프트 기법 모음', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/techniques' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '나만의 프롬프트 템플릿 만들기',
        description: '매일 반복하는 작업에 프롬프트 템플릿을 만들면 업무 속도가 3배 이상 빨라집니다. 실전 템플릿 예시: [이메일 답장] "아래 이메일에 대해 정중하지만 간결한 답장을 작성해줘. 톤: 비즈니스 캐주얼, 길이: 5문장 이내. 원본 이메일: [붙여넣기]". [회의록 요약] "아래 회의 녹취를 다음 형식으로 정리해줘 — 참석자, 주요 논의사항(bullet), 결정사항, 다음 액션아이템(담당자+기한). 녹취: [붙여넣기]". [데이터 분석] "아래 CSV 데이터에서 ① 상위 5개 항목 ② 전월 대비 변화율 ③ 주목할 이상치를 분석해줘. 표 형식으로 출력: [데이터 붙여넣기]". 이런 템플릿을 노션이나 메모장에 모아두면 나만의 AI 무기가 됩니다.',
        resources: [
          { label: 'Anthropic Prompt Library', url: 'https://docs.anthropic.com/en/prompt-library' },
          { label: 'OpenAI Cookbook', url: 'https://cookbook.openai.com/' },
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
    description: 'McKinsey 보고서에 따르면 AI를 업무에 활용하는 직장인은 평균 40%의 생산성 향상을 경험합니다. 이메일, 리서치, 문서 작업, 번역까지 — 오늘 바로 적용할 수 있는 실전 활용법을 배웁니다.',
    duration: '1~2주',
    topics: [
      {
        title: '글쓰기 & 문서 작업',
        description: 'AI 글쓰기의 핵심은 "처음부터 완벽한 글을 요구하는 것"이 아니라 "초안을 빠르게 뽑고 사람이 다듬는 것"입니다. 실전 워크플로우: ① AI에게 초안 요청 → ② 구조와 논리 확인 → ③ 본인의 톤과 사실관계로 수정 → ④ AI에게 "이 글을 더 간결하게 다듬어줘"로 폴리싱. Before: 보고서 초안 작성 2시간 → After: AI 초안 5분 + 수정 20분 = 총 25분. 주의: AI가 쓴 글을 그대로 제출하지 마세요. 반드시 팩트체크 후 본인의 관점을 추가하세요. 그래야 AI가 "도구"이지 "대체자"가 아닙니다.',
        resources: [
          { label: 'Claude.ai', url: 'https://claude.ai' },
          { label: 'Anthropic — 글쓰기 활용 가이드', url: 'https://docs.anthropic.com/en/prompt-library' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '리서치 & 정보 정리',
        description: '자료 조사에 AI를 활용하는 3단계: ① 탐색 — Perplexity에 주제를 물어 최신 소스와 개요를 파악합니다. "2026년 한국 이커머스 시장 트렌드를 주요 보고서 인용과 함께 정리해줘". ② 심화 — Claude에 보고서 PDF를 업로드하고 핵심 내용을 추출합니다. "이 50페이지 보고서에서 시장 규모, 성장률, 주요 플레이어 3곳을 표로 정리해줘". Claude Opus 4.6은 1M 토큰(약 750,000단어)까지 한 번에 처리 가능하여 수백 페이지 문서도 통째로 분석할 수 있습니다. ③ 비교 — "A안과 B안의 장단점을 표로 비교해줘". 이 3단계로 하루 걸리던 리서치를 1시간으로 줄일 수 있습니다.',
        resources: [
          { label: 'Perplexity AI', url: 'https://www.perplexity.ai' },
          { label: 'Claude — 파일 업로드 가이드', url: 'https://support.anthropic.com/en/articles/9576088-how-do-i-upload-files-to-claude' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '이미지 & 디자인 생성',
        description: '디자이너가 아니어도 AI로 프로 수준의 이미지를 만들 수 있습니다. 용도별 추천: PPT 삽화 → ChatGPT(DALL-E): "깔끔한 미니멀 일러스트, 팀 협업하는 장면, 파란색 톤, 흰 배경". SNS 콘텐츠 → Midjourney: 품질이 가장 높지만 학습 곡선 있음. 로고/아이콘 → Ideogram: 텍스트가 포함된 이미지에 강함. 실전 팁: ① 스타일을 명시하세요 ("미니멀", "수채화풍", "3D 아이소메트릭") ② 원하지 않는 것도 말하세요 ("사람 없이", "텍스트 없이") ③ 같은 프롬프트로 4~5번 생성해서 가장 좋은 것을 고르세요.',
        resources: [
          { label: 'ChatGPT DALL-E', url: 'https://chat.openai.com' },
          { label: 'Midjourney', url: 'https://www.midjourney.com' },
          { label: 'Ideogram', url: 'https://ideogram.ai' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '번역 & 다국어 작업',
        description: 'AI 번역은 단순 번역기(Google Translate)와 차원이 다릅니다. 핵심 차이: 맥락을 이해합니다. 예: "이 사업 제안서를 일본어로 번역해줘. 단, 일본 비즈니스 문화에 맞게 존경어를 사용하고, 직접적인 거절 표현은 완곡하게 바꿔줘". 실전 활용법: ① 번역 + 로컬라이제이션: "미국 마케팅 카피를 한국 20대 타겟에 맞게 의역해줘" ② 톤 유지 번역: "이 유머러스한 블로그 글을 영어로 번역하되 유머 톤을 유지해줘" ③ 전문 용어 일관성: "이 기술 문서를 번역해줘. 다음 용어집을 따라줘: API→API, deploy→배포, container→컨테이너". DeepL은 품질이 좋지만 AI에게 맥락을 설명하면 DeepL보다 자연스러운 결과가 나옵니다.',
        resources: [
          { label: 'DeepL 번역기', url: 'https://www.deepl.com' },
          { label: 'Claude.ai', url: 'https://claude.ai' },
        ],
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
    description: '코딩 경험이 없어도 괜찮습니다. 터미널을 켜고 명령어 5개만 익히면 Claude Code를 시작할 준비가 됩니다. 총 1시간이면 충분합니다.',
    duration: '1시간',
    topics: [
      {
        title: '터미널이란?',
        description: '터미널은 컴퓨터에게 "글자로 명령을 내리는 창"입니다. 마우스로 폴더를 클릭하는 대신, cd Documents라고 타이핑하면 Documents 폴더로 이동합니다. 겁먹지 마세요 — 잘못 입력해도 컴퓨터가 고장나지 않습니다. 최악의 경우 "command not found"라는 메시지가 뜰 뿐입니다. 시작법: macOS → Spotlight(⌘+Space)에서 "터미널" 검색. Windows → 시작 메뉴에서 "PowerShell" 검색. 터미널이 열리면 whoami를 입력해보세요 — 본인의 사용자 이름이 나오면 성공입니다.',
        resources: [
          { label: 'macOS 터미널 기초 (Apple)', url: 'https://support.apple.com/ko-kr/guide/terminal/apdb66b5242-0d18-49fc-9c47-a2498b7c91d5/mac' },
          { label: 'Windows PowerShell 시작하기', url: 'https://learn.microsoft.com/ko-kr/powershell/scripting/learn/ps101/01-getting-started' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '필수 명령어 5개',
        description: '이 5개만 알면 Claude Code를 쓸 수 있습니다: ① pwd — "나 지금 어디야?" 현재 폴더 경로를 보여줍니다. ② ls — "여기에 뭐가 있어?" 현재 폴더의 파일 목록을 보여줍니다. ③ cd 폴더명 — "그 폴더로 이동해." cd Desktop은 바탕화면으로 이동. cd ..은 한 단계 위로. ④ mkdir 이름 — "새 폴더 만들어." mkdir my-project로 프로젝트 폴더 생성. ⑤ clear — "화면 정리해." 터미널이 지저분해지면 clear로 깨끗하게. 연습: 터미널을 열고 → pwd → ls → mkdir test-folder → cd test-folder → pwd 순서로 입력해보세요. 2분이면 됩니다.',
        resources: [
          { label: 'Linux 기본 명령어 치트시트', url: 'https://www.geeksforgeeks.org/linux-commands-cheat-sheet/' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '개발 환경 설치',
        description: 'Claude Code 실행에 필요한 프로그램 2개를 설치합니다. 총 10분 소요. [macOS] ① Homebrew 설치: 터미널에 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" 붙여넣기 → Enter. ② Node.js 설치: brew install node → Enter. ③ 확인: node --version 입력 → v18 이상이면 성공. [Windows] ① nodejs.org 접속 → LTS 버전 다운로드 → 설치 마법사 실행. ② PowerShell에서 node --version 확인. 설치 중 에러가 나면 당황하지 마세요. 에러 메시지를 그대로 Claude에 붙여넣으면 해결법을 알려줍니다.',
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
    description: '"코드 자동완성 도구 아니야?" — 아닙니다. Claude Code는 파일을 읽고, 코드를 짜고, 테스트하고, 배포까지 하는 AI 개발 파트너입니다. Copilot이나 Cursor와 어떻게 다른지 30분 만에 이해합니다.',
    duration: '30분',
    topics: [
      {
        title: 'Claude Code 개념',
        description: 'Claude Code는 터미널에서 실행되는 "AI 개발자"입니다. 단순히 코드를 자동완성하는 게 아니라, 코드베이스 전체를 읽고 → 무엇을 바꿔야 할지 계획하고 → 여러 파일을 동시에 수정하고 → 테스트를 돌려 검증하는 전 과정을 자율 수행합니다. 실제 예: "이 프로젝트에 다크 모드를 추가해줘"라고 말하면, Claude Code가 ① 현재 스타일 파일 분석 ② CSS 변수 추가 ③ 토글 버튼 컴포넌트 생성 ④ 모든 컴포넌트에 테마 적용 ⑤ 빌드 확인까지 혼자 해냅니다. 비개발자에게는 "말로 앱을 만드는 도구", 개발자에게는 "시니어 페어 프로그래머"입니다.',
        resources: [
          { label: 'Claude Code 공식 문서', url: 'https://docs.anthropic.com/en/docs/claude-code' },
          { label: 'Claude Code 소개 영상', url: 'https://www.youtube.com/watch?v=FBvGhEsOIqI' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'Copilot / Cursor와 뭐가 다른가',
        description: '2026년 기준, 세 도구의 포지셔닝이 더 명확해졌습니다. GitHub Copilot ($10~19/월) — GPT-5·Claude·Gemini 모델 선택 가능, 모든 IDE에서 작동. 코딩 중 자동완성 + Agent Mode 추가. GitHub 생태계(이슈, PR)와의 통합이 최대 강점. Cursor ($20/월) — Claude Opus 기반 AI-네이티브 IDE. VS Code를 포크한 전용 에디터에서 코드베이스 전체를 이해하고 대화형으로 수정. 개발자가 주도권을 쥐고 AI와 협업하는 방식. Claude Code (사용량 기반) — 터미널에서 프로젝트 전체를 자율적으로 분석·수정·테스트·배포. 가장 높은 자율성. SWE-bench 72.5%로 코딩 정확도 1위. 핵심 차이: Copilot = "빠른 자동완성", Cursor = "대화형 페어 프로그래밍", Claude Code = "자율 AI 개발자". 많은 시니어 개발자들은 Cursor(일상 코딩)와 Claude Code(복잡한 작업)를 병행합니다.',
        resources: [
          { label: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
          { label: 'Cursor', url: 'https://cursor.sh' },
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
    description: '설치 3분, 로그인 2분, 첫 대화 5분. 10분 안에 Claude Code를 직접 사용해봅니다.',
    duration: '1시간',
    topics: [
      {
        title: 'OS별 설치',
        description: '설치는 터미널에 한 줄 입력이면 끝납니다. [macOS/Linux] npm install -g @anthropic-ai/claude-code — Enter. [Windows] 동일한 명령어를 PowerShell에서 실행. 설치 확인: claude --version 입력 → 버전 번호가 나오면 성공. 자주 겪는 문제: ① "permission denied" → 맥: sudo를 앞에 붙여 sudo npm install -g @anthropic-ai/claude-code ② "npm not found" → Node.js가 설치되지 않은 것. 이전 모듈(Pre)로 돌아가세요. ③ 방화벽 문제 → 회사 네트워크에서는 IT팀에 npm 접근 허용을 요청하세요.',
        resources: [
          { label: 'Claude Code 설치 가이드', url: 'https://docs.anthropic.com/en/docs/claude-code/getting-started' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '로그인 & 첫 세션',
        description: '프로젝트 폴더에서 claude를 입력하면 로그인 화면이 나옵니다. 인증 방법 4가지: ① Claude.ai 구독 계정(추천) — 월 $20 구독자는 추가 비용 없이 일정량 사용 가능. 가장 안전한 옵션. ② Console API 키 — pay-as-you-go. 토큰 단위 과금이라 사용량 관리 필수. ③ AWS Bedrock / Google Vertex AI — 기업 환경에서 사용. 첫 세션에서 해볼 것: 로그인 후 /help를 입력해보세요. 사용 가능한 모든 명령어 목록이 나옵니다. 그다음 "이 프로젝트의 구조를 설명해줘"라고 입력하면, Claude Code가 폴더를 탐색하고 프로젝트를 분석해줍니다.',
        resources: [
          { label: 'Claude Code 인증 가이드', url: 'https://docs.anthropic.com/en/docs/claude-code/getting-started' },
          { label: 'Anthropic Console', url: 'https://console.anthropic.com/' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'IDE 연동 (VS Code, JetBrains)',
        description: 'Claude Code는 터미널에서 직접 써도 되지만, VS Code나 JetBrains에서 통합하면 더 편합니다. [VS Code] ① 확장 프로그램에서 "Claude Code" 검색 → 설치. ② 또는 터미널에서: code --install-extension anthropic.claude-code ③ VS Code 내장 터미널(Ctrl+`)에서 claude 입력으로도 바로 사용 가능. [JetBrains] Plugins → "Claude Code" 검색 → Install. 팁: IDE 연동의 최대 장점은 Claude Code가 수정한 파일이 에디터에 실시간으로 반영되는 것입니다. 코드 변경을 눈으로 확인하면서 작업할 수 있어 안심됩니다.',
        resources: [
          { label: 'VS Code 마켓플레이스', url: 'https://marketplace.visualstudio.com/' },
          { label: 'JetBrains Plugins', url: 'https://plugins.jetbrains.com/' },
        ],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'cc-basics',
    num: '02',
    phase: 'Claude Code',
    title: '기본 사용법 마스터',
    description: '핵심 명령어 8개, 3가지 권한 모드, 비용 관리법. 이것만 알면 Claude Code의 80%를 활용할 수 있습니다.',
    duration: '2시간',
    topics: [
      {
        title: '핵심 슬래시 커맨드 8개',
        description: '자주 쓰는 커맨드만 정리했습니다: /help — 모든 명령어 목록 보기. /model — AI 모델 변경 (Opus↔Sonnet. Sonnet이 빠르고 저렴). /clear — 대화 초기화 (토큰 절약에 필수). /compact — 이전 대화를 요약해서 토큰을 절약. 긴 작업 중간에 사용하세요. /resume — 이전 세션을 이어서 작업. /init — CLAUDE.md 파일 자동 생성. /plan — Plan Mode 진입 (코드 변경 없이 계획만). /config — 설정 변경. 실전 팁: 세션이 길어지면 /compact를 습관적으로 사용하세요. 체감 비용이 50% 이상 줄어듭니다.',
        resources: [
          { label: 'Claude Code 커맨드 레퍼런스', url: 'https://docs.anthropic.com/en/docs/claude-code/cli-usage' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '3가지 권한 모드',
        description: 'Claude Code에는 "얼마나 자율적으로 작업하게 할 것인가"를 정하는 3가지 모드가 있습니다: ① Plan Mode (가장 안전) — 코드를 읽고 계획만 세움. 파일을 절대 수정하지 않음. "이 버그를 어떻게 고칠지 계획을 세워줘"에 적합. ② Normal Mode (기본값) — 파일 수정, 명령 실행 전에 매번 사용자 승인을 요청. 초보자에게 추천. ③ Auto-Accept — 승인 없이 자동 실행. 빠르지만 위험. 숙련자만 사용. 추천 워크플로우: Plan Mode로 계획 확인 → Normal Mode로 실행 → 결과 검증. Shift+Tab으로 모드를 순환 전환할 수 있습니다.',
        resources: [
          { label: 'Claude Code 권한 설정', url: 'https://docs.anthropic.com/en/docs/claude-code/settings' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '키보드 단축키',
        description: '4개만 기억하면 됩니다: Shift+Tab — 권한 모드 순환 전환 (Plan → Normal → Auto-Accept). 가장 자주 씀. Shift+Enter — 프롬프트에서 줄바꿈. 긴 프롬프트를 여러 줄로 작성할 때. Ctrl+C — 현재 작업 중단. AI가 잘못된 방향으로 갈 때 즉시 멈추기. Esc — 현재 입력 취소. 프롬프트를 다시 쓰고 싶을 때. 실전 팁: Claude Code가 예상과 다른 작업을 시작하면 Ctrl+C로 즉시 중단하세요. 잘못된 작업을 끝까지 기다리는 것보다 중단하고 프롬프트를 명확하게 다시 쓰는 게 빠릅니다.',
        resources: [
          { label: 'Claude Code 사용법', url: 'https://docs.anthropic.com/en/docs/claude-code/cli-usage' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '비용 & 토큰 관리',
        description: 'Claude Code 사용 비용을 관리하는 법: [인증별 과금 방식] Claude Max 구독($100~200/월) → Claude Code 무제한 사용. 헤비 유저에게 가장 경제적. Claude Pro($20/월) → 일정량 무료 포함, 초과 시 속도 제한. 가벼운 사용에 적합. API 키(종량제) → 토큰 단위 과금. Opus 4.6 기준 입력 $15/출력 $75 per 1M 토큰. 코딩 세션 하나에 $1~$10 정도. [비용 절약 팁] ① /compact를 자주 사용 — 긴 대화를 요약해 토큰 수를 줄임 ② Sonnet 모델 사용 — /model로 변경. Opus의 약 1/5 가격에 대부분의 작업을 처리 ③ 한 번에 하나의 명확한 작업 요청 — 모호한 질문은 AI가 여러 번 시도하며 토큰을 낭비 ④ /clear로 불필요한 이전 대화 정리. API 키 사용자는 Anthropic Console에서 일일 한도를 설정하세요.',
        resources: [
          { label: 'Anthropic 요금제', url: 'https://www.anthropic.com/pricing' },
          { label: 'Anthropic Console (API 사용량)', url: 'https://console.anthropic.com/' },
        ],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'cc-claudemd',
    num: '03',
    phase: 'Claude Code',
    title: 'CLAUDE.md — 프로젝트 메모리',
    description: 'AI에게 "이 프로젝트에서는 이렇게 해"라고 알려주는 설정 파일입니다. CLAUDE.md 하나만 잘 써도 AI의 작업 품질이 2배 이상 좋아집니다.',
    duration: '1.5시간',
    topics: [
      {
        title: 'CLAUDE.md란?',
        description: 'CLAUDE.md는 프로젝트 루트에 두는 마크다운 파일로, Claude Code가 세션을 시작할 때 가장 먼저 읽습니다. 마치 신입 개발자에게 건네는 "프로젝트 온보딩 문서"와 같습니다. 왜 필요한가? CLAUDE.md가 없으면 Claude Code는 프로젝트의 빌드 명령어, 코딩 규칙, 아키텍처를 모른 채 작업합니다. 예: TypeScript 프로젝트인데 JavaScript 코드를 생성하거나, npm 프로젝트인데 yarn 명령어를 실행하는 실수가 생깁니다. CLAUDE.md에 "이 프로젝트는 TypeScript + pnpm을 사용합니다. 빌드: pnpm build, 테스트: pnpm test"만 적어도 이런 실수가 사라집니다.',
        resources: [
          { label: 'CLAUDE.md 공식 가이드', url: 'https://docs.anthropic.com/en/docs/claude-code/memory' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '효과적인 CLAUDE.md 작성법',
        description: '좋은 CLAUDE.md의 필수 섹션 4가지: ① 빌드/테스트 명령어 — "빌드: npm run build, 테스트: npm test, 린트: npm run lint". AI가 코드 변경 후 자동으로 검증할 수 있습니다. ② 코드 스타일 규칙 — "세미콜론 사용, 2칸 들여쓰기, 함수형 컴포넌트 사용, any 타입 금지". 기존 코드와 일관성을 유지합니다. ③ 프로젝트 구조 설명 — "src/api/ — API 라우트, src/components/ — React 컴포넌트, src/hooks/ — 커스텀 훅". AI가 파일을 어디에 만들지 판단할 수 있습니다. ④ 하면 안 되는 것 — "테스트 파일 삭제 금지, 기존 API 엔드포인트 변경 금지". 가장 빠른 시작법: claude를 실행하고 /init 입력 → AI가 프로젝트를 분석해서 CLAUDE.md 초안을 자동 생성합니다. 이걸 수정하면 됩니다.',
        resources: [
          { label: 'CLAUDE.md 베스트 프랙티스', url: 'https://docs.anthropic.com/en/docs/claude-code/memory' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'CLAUDE.md 계층 구조',
        description: 'CLAUDE.md는 3단계 계층으로 동작합니다: ① 프로젝트 루트 CLAUDE.md — 팀 전체 규칙. Git에 커밋하여 팀원과 공유. 예: 빌드 명령어, 코딩 스타일, 아키텍처 규칙. ② 하위 디렉토리 CLAUDE.md — 모듈별 규칙. 예: src/api/CLAUDE.md에 "이 폴더의 모든 API는 RESTful 규칙을 따르며, 에러 응답은 {error: string, code: number} 형식". ③ ~/.claude/CLAUDE.md — 개인 글로벌 규칙. 모든 프로젝트에 공통 적용. 예: "커밋 메시지는 한국어로, 응답도 한국어로". 규칙 충돌 시 우선순위: 하위 디렉토리 > 프로젝트 루트 > 글로벌. 더 구체적인 규칙이 이깁니다.',
        resources: [
          { label: 'Claude Code 메모리 시스템', url: 'https://docs.anthropic.com/en/docs/claude-code/memory' },
        ],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'cc-prompting',
    num: '04',
    phase: 'Claude Code',
    title: '효과적인 프롬프팅',
    description: '"이거 고쳐줘" vs "auth.ts 42번째 줄의 JWT 만료 처리에 refresh token 로직을 추가해줘" — 이 차이가 결과를 결정합니다. Claude Code에서 좋은 프롬프트를 쓰는 법을 배웁니다.',
    duration: '2시간',
    topics: [
      {
        title: '좋은 프롬프트 vs 나쁜 프롬프트',
        description: 'Claude Code 프롬프트의 핵심 원칙 3가지: ① 구체적으로 — ❌ "버그 고쳐줘" → ✅ "로그인 페이지에서 비밀번호 입력 후 Enter를 누르면 폼이 제출되지 않는 버그를 수정해줘. handleSubmit 함수가 호출되는지 확인하고 고쳐줘". ② 한 번에 하나 — ❌ "로그인 만들고 회원가입도 만들고 프로필도 만들어줘" → ✅ "먼저 로그인 기능을 만들어줘. 이메일+비밀번호 방식으로". 완료 후 다음 작업 요청. ③ 완료 기준 명시 — ❌ "테스트 작성해줘" → ✅ "로그인 API에 대한 테스트를 작성해줘. 성공 케이스 1개, 실패 케이스 2개(잘못된 비밀번호, 미등록 이메일), npm test가 통과해야 함".',
        resources: [
          { label: 'Claude Code 프롬프트 팁', url: 'https://docs.anthropic.com/en/docs/claude-code/tips-and-tricks' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'Plan Mode 활용',
        description: '복잡한 작업은 반드시 Plan Mode로 시작하세요. Plan Mode(/plan 또는 Shift+Tab으로 전환)에서는 Claude Code가 코드를 "읽기만" 하고 변경하지 않습니다. 사용법: ① Plan Mode 진입 → "이 프로젝트에 사용자 인증 기능을 추가하려면 어떤 파일을 수정해야 하고 어떤 순서로 작업해야 할까?" ② Claude Code가 계획을 제시 → 검토 → 동의하면 Normal Mode로 전환하여 실행. 왜 중요한가: Plan Mode 없이 바로 작업을 시키면, AI가 잘못된 방향으로 30개 파일을 수정한 뒤에야 문제를 발견할 수 있습니다. Plan Mode로 5분 투자하면 30분의 롤백을 방지할 수 있습니다.',
        resources: [
          { label: 'Claude Code 사용법', url: 'https://docs.anthropic.com/en/docs/claude-code/cli-usage' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '컨텍스트 멘션 (@파일, @URL)',
        description: 'AI의 답변 품질은 "얼마나 정확한 맥락을 제공했느냐"에 달려 있습니다. @멘션으로 컨텍스트를 명시적으로 제공하세요. @파일명 — 특정 파일을 대화에 포함: "@src/api/auth.ts 이 파일의 로그인 함수에 rate limiting을 추가해줘". AI가 해당 파일을 정확히 읽고 작업합니다. @URL — 외부 문서를 참조: "@https://docs.stripe.com/payments/accept-a-payment 이 가이드를 따라서 결제 기능을 구현해줘". 실전 팁: 파일 이름이 기억나지 않으면 "로그인 관련 파일을 찾아줘"라고 먼저 물어보세요. Claude Code가 관련 파일 목록을 보여줍니다.',
        resources: [
          { label: 'Claude Code 컨텍스트 관리', url: 'https://docs.anthropic.com/en/docs/claude-code/cli-usage' },
        ],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'cc-mcp',
    num: '05',
    phase: 'Claude Code',
    title: 'MCP 서버 연결',
    description: 'Claude Code에 GitHub, 데이터베이스, 브라우저 등 외부 도구를 연결하면 할 수 있는 일이 10배로 늘어납니다. MCP(Model Context Protocol)로 AI의 능력을 확장하는 법을 배웁니다.',
    duration: '2시간',
    topics: [
      {
        title: 'MCP란 무엇인가',
        description: 'MCP(Model Context Protocol)는 AI에게 "새로운 능력"을 부여하는 표준 규격입니다. 비유하면: Claude Code 본체 = 스마트폰, MCP 서버 = 앱. 앱을 설치하듯 MCP 서버를 연결하면 AI가 GitHub 이슈를 읽고, DB를 조회하고, 웹 페이지를 크롤링할 수 있습니다. 예: GitHub MCP를 연결하면 "이슈 #42의 버그를 분석하고 PR을 만들어줘"가 가능. PostgreSQL MCP를 연결하면 "users 테이블에서 최근 7일 신규 가입자 수를 조회해줘"가 가능. 연결 없이는 Claude Code가 파일 시스템만 접근할 수 있지만, MCP로 바깥 세상과 연결됩니다.',
        resources: [
          { label: 'MCP 공식 사이트', url: 'https://modelcontextprotocol.io/' },
          { label: 'MCP 소개 (Anthropic)', url: 'https://www.anthropic.com/news/model-context-protocol' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: 'MCP 서버 설정 방법',
        description: 'MCP 서버를 추가하는 2가지 방법: [CLI로 추가] claude mcp add github -- npx -y @modelcontextprotocol/server-github — 이 한 줄로 GitHub MCP가 연결됩니다. [설정 파일로 추가] .claude/settings.json에 직접 작성: {"mcpServers": {"github": {"command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"]}}}. scope 구분: project scope(팀 공유, .claude/settings.json) vs user scope(개인 전용, ~/.claude/settings.json). 설정 후 확인: Claude Code를 재시작하고 /mcp 입력 → 연결된 MCP 서버 목록이 나오면 성공. 주의: API 키가 필요한 MCP 서버(예: GitHub)는 환경변수로 토큰을 설정해야 합니다.',
        resources: [
          { label: 'MCP 서버 설정 가이드', url: 'https://docs.anthropic.com/en/docs/claude-code/mcp' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '자주 쓰는 MCP 서버 TOP 5',
        description: '실무에서 가장 유용한 MCP 서버 5개: ① GitHub — 이슈 읽기, PR 생성/리뷰, 코드 검색. "이슈 #15의 버그를 수정하고 PR을 만들어줘"가 가능. ② PostgreSQL/SQLite — DB 스키마 조회, 쿼리 실행. "최근 한 달 매출 데이터를 분석해줘"가 가능. ③ Puppeteer/Playwright — 브라우저 자동화. 웹사이트 스크린샷 촬영, 폼 테스트 자동화. ④ Fetch — HTTP 요청. 외부 API 호출, 웹 페이지 내용 가져오기. ⑤ Filesystem — 프로젝트 외부 파일 접근. 다른 프로젝트의 코드 참조. 처음에는 GitHub MCP 하나만 연결해보세요. 가장 범용적이고 효과가 큽니다.',
        resources: [
          { label: 'MCP 서버 목록 (공식)', url: 'https://github.com/modelcontextprotocol/servers' },
          { label: 'MCP 서버 디렉토리', url: 'https://github.com/punkpeye/awesome-mcp-servers' },
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
    description: '하나의 Claude Code가 여러 작업을 동시에 처리할 수 있다면? 서브에이전트로 복잡한 작업을 분할하고, 나만의 전문 에이전트를 만드는 법을 배웁니다.',
    duration: '2시간',
    topics: [
      {
        title: '서브에이전트 개념',
        description: 'Claude Code는 복잡한 작업을 받으면 내부적으로 "서브에이전트"를 생성하여 병렬로 처리합니다. 예를 들어 "이 프로젝트의 모든 API 엔드포인트에 인증을 추가해줘"라고 요청하면: 메인 에이전트가 계획 수립 → 서브에이전트 A는 auth 미들웨어 작성 → 서브에이전트 B는 기존 라우트 분석 → 서브에이전트 C는 테스트 코드 작성. 이런 식으로 순차적으로 10분 걸릴 작업이 3분으로 줄어듭니다. 사용자가 직접 서브에이전트를 관리할 필요는 없습니다. Claude Code가 작업 규모를 판단하여 자동으로 분할합니다. 다만, 프롬프트가 충분히 구체적이어야 효과적으로 분할됩니다.',
        resources: [
          { label: 'Claude Code 에이전트 문서', url: 'https://docs.anthropic.com/en/docs/claude-code' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '커스텀 에이전트 만들기',
        description: '슬래시 커맨드(.claude/commands/)를 활용하면 특정 역할의 에이전트를 만들 수 있습니다. 예: 코드 리뷰 에이전트 — .claude/commands/review.md 파일을 만들고 내용에 "변경된 파일을 분석하여 ① 버그 가능성 ② 성능 이슈 ③ 보안 취약점을 체크리스트로 보고해줘. 각 항목에 심각도(높음/중간/낮음)를 표시하고, 수정 코드 제안을 포함해줘"라고 작성. 이후 /review를 입력하면 이 에이전트가 자동 실행됩니다. 실전 활용: /test — 테스트 작성 전문, /docs — JSDoc 문서 자동 생성, /refactor — 코드 리팩토링 전문 등 팀에 맞는 커스텀 명령어를 만들어 공유하세요.',
        resources: [
          { label: 'Claude Code 커스텀 명령어', url: 'https://docs.anthropic.com/en/docs/claude-code/tutorials' },
        ],
        difficulty: 'advanced',
      },
    ],
  },
  {
    id: 'cc-skills-hooks',
    num: '07',
    phase: 'Claude Code',
    title: 'Skills & Hooks',
    description: 'Skills로 AI에게 전문 지식을 장착하고, Hooks로 반복 작업을 자동화합니다. Claude Code를 나만의 맞춤형 개발 도구로 변환하는 단계입니다.',
    duration: '2시간',
    topics: [
      {
        title: 'Skills 시스템',
        description: 'Skill은 특정 도메인의 지식과 도구를 묶어놓은 "전문가 팩"입니다. 예를 들어 "playwright" 스킬을 로드하면 Claude Code가 브라우저 테스트 작성 시 Playwright의 최신 API와 베스트 프랙티스를 자동 적용합니다. 스킬 사용법: CLAUDE.md에 관련 지식을 구조화하여 작성하거나, 커뮤니티에서 만든 스킬 파일을 프로젝트에 추가합니다. 실전 효과: "React 컴포넌트 테스트 작성해줘"라고 요청했을 때 — 스킬 없이: 기본적인 render 테스트만 생성 — 스킬 있으면: Testing Library 베스트 프랙티스에 따라 user event, accessibility 체크 포함된 고품질 테스트 생성.',
        resources: [
          { label: 'Claude Code 설정', url: 'https://docs.anthropic.com/en/docs/claude-code/settings' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: 'Hooks 설정',
        description: 'Hooks는 Claude Code의 특정 동작에 자동화를 연결하는 기능입니다. "어떤 일이 일어나면 → 자동으로 이것을 실행해라". 설정 방법: .claude/settings.json에 hooks 섹션 추가. 주요 훅 타입: ① PreToolUse — 도구 실행 전에 개입. 예: 파일 수정 전에 자동으로 git stash 실행. ② PostToolUse — 도구 실행 후에 개입. 예: 파일 수정 후 자동으로 린트 실행. ③ Notification — 작업 완료 알림. 예: 긴 작업이 끝나면 시스템 알림. 실전 예시: "파일을 편집한 후 자동으로 ESLint를 실행하고, 에러가 있으면 자동 수정" — 이런 자동화로 코드 품질을 일관되게 유지할 수 있습니다.',
        resources: [
          { label: 'Claude Code Hooks 가이드', url: 'https://docs.anthropic.com/en/docs/claude-code/hooks' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: 'Hooks 실전 설정 예시',
        description: '바로 복사해서 쓸 수 있는 Hooks 설정 3가지: [1. 자동 린트] PostToolUse의 Edit/Write 후 → npm run lint --fix 실행. 코드 스타일이 항상 일관됩니다. [2. 커밋 전 테스트] PreToolUse의 git commit 전 → npm test 실행. 테스트 실패하면 커밋 차단. [3. 빌드 검증] PostToolUse의 파일 변경 후 → npm run build 실행. 빌드가 깨지는 변경을 즉시 감지. 설정은 .claude/settings.json의 hooks 배열에 추가합니다. 팀 전체에 동일한 품질 게이트를 강제할 수 있어 코드 리뷰 부담이 줄어듭니다. 주의: 너무 많은 Hooks를 설정하면 작업 속도가 느려집니다. 핵심 3~4개만 설정하세요.',
        resources: [
          { label: 'Claude Code Hooks 문서', url: 'https://docs.anthropic.com/en/docs/claude-code/hooks' },
        ],
        difficulty: 'advanced',
      },
    ],
  },
  {
    id: 'cc-workflow',
    num: '08',
    phase: 'Claude Code',
    title: '실전 워크플로우',
    description: 'Git 커밋, PR 리뷰, 버그 디버깅 — 실제 개발 과정에서 Claude Code를 어떻게 활용하는지 시나리오별로 익힙니다.',
    duration: '2시간',
    topics: [
      {
        title: 'Git 워크플로우',
        description: 'Claude Code와 Git을 함께 쓰는 실전 패턴: [기능 개발] "feature/user-auth 브랜치를 만들고, 이메일 로그인 기능을 구현해줘" → Claude Code가 브랜치 생성 + 코드 작성 + 커밋까지 한 번에 처리. [커밋 메시지] "변경사항을 분석해서 의미 있는 커밋 메시지로 커밋해줘" → 파일 변경 내용을 읽고 적절한 커밋 메시지를 자동 생성. [충돌 해결] merge conflict가 발생하면 충돌 파일을 Claude Code에 보여주고 "이 충돌을 해결해줘. 두 변경사항을 모두 유지하는 방향으로" 요청. 핵심 팁: 항상 작업 전에 git status를 확인하고, 중요한 변경 전에 새 브랜치를 만드세요. Claude Code가 실수하더라도 git checkout으로 되돌릴 수 있습니다.',
        resources: [
          { label: 'Claude Code Git 통합', url: 'https://docs.anthropic.com/en/docs/claude-code/tutorials' },
          { label: 'Git 기초 가이드', url: 'https://git-scm.com/book/ko/v2' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: 'PR 리뷰 자동화',
        description: 'Claude Code의 비대화형 모드(-p 플래그)를 활용하면 PR 리뷰를 자동화할 수 있습니다. 사용법: git diff main | claude -p "이 변경사항을 리뷰해줘. 버그 가능성, 성능 이슈, 보안 취약점을 체크하고, 각각에 대해 수정 제안을 해줘" — 이 한 줄로 전문적인 코드 리뷰 리포트를 받을 수 있습니다. CI/CD 통합: GitHub Actions에 이 명령을 추가하면 PR이 올라올 때마다 자동으로 AI 리뷰 코멘트가 생성됩니다. 실전 팁: AI 리뷰는 "놓친 부분을 찾는 보조 도구"로 사용하세요. 최종 판단은 사람이 해야 합니다.',
        resources: [
          { label: 'Claude Code CI 통합', url: 'https://docs.anthropic.com/en/docs/claude-code/github-actions' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '디버깅 실전',
        description: 'Claude Code로 버그를 잡는 3단계 프로세스: ① 에러 전달 — 터미널의 에러 메시지를 그대로 복사해서 "이 에러를 분석하고 원인을 찾아줘"라고 요청. 또는 cat error.log | claude -p "이 에러 로그를 분석해줘"로 파이프. ② 재현 확인 — "이 버그를 재현하는 최소한의 테스트 코드를 작성해줘". 재현 가능한 테스트가 있으면 수정 확인이 쉬워집니다. ③ 수정 + 검증 — "이 버그를 수정하고, 수정이 맞는지 테스트를 돌려서 확인해줘". Claude Code가 수정 → 테스트 → 결과 확인을 자동으로 반복합니다. 핵심: 에러 메시지를 요약하지 말고 "전체"를 붙여넣으세요. 스택 트레이스의 한 줄이 단서가 될 수 있습니다.',
        resources: [
          { label: 'Claude Code 팁 & 트릭', url: 'https://docs.anthropic.com/en/docs/claude-code/tips-and-tricks' },
        ],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'cc-advanced',
    num: '09',
    phase: 'Claude Code',
    title: '고급 기능 & 팀 협업',
    description: '여러 AI가 동시에 프론트엔드·백엔드·테스트를 개발하는 Agent Teams, Git Worktree로 충돌 없는 병렬 개발까지. 대규모 프로젝트를 위한 고급 기능입니다.',
    duration: '2시간',
    topics: [
      {
        title: 'Agent Teams — 멀티 에이전트 개발',
        description: '하나의 프로젝트에 여러 Claude Code 인스턴스를 동시에 실행하는 기능입니다. 예: 터미널 3개를 열고 각각에게 — 터미널1: "프론트엔드에 사용자 프로필 페이지를 만들어줘", 터미널2: "백엔드에 /api/profile 엔드포인트를 만들어줘", 터미널3: "프로필 기능의 E2E 테스트를 작성해줘". 3개의 작업이 동시에 진행되어 개발 속도가 2~3배 빨라집니다. 주의사항: ① 같은 파일을 수정하는 작업은 분리하세요 (충돌 방지) ② 각 에이전트에 CLAUDE.md를 통해 "다른 에이전트가 작업 중인 영역은 건드리지 마"라고 명시 ③ Git Worktree(다음 토픽)와 함께 사용하면 충돌을 원천 차단할 수 있습니다.',
        resources: [
          { label: 'Claude Code 멀티 에이전트', url: 'https://docs.anthropic.com/en/docs/claude-code' },
        ],
        difficulty: 'advanced',
      },
      {
        title: 'Git Worktree 격리',
        description: 'Git Worktree는 하나의 저장소에서 여러 작업 디렉토리를 만드는 Git 기능입니다. Agent Teams와 결합하면 각 에이전트가 완전히 독립된 공간에서 작업하여 파일 충돌이 불가능합니다. 설정법: git worktree add ../project-frontend feature/frontend → 새 디렉토리에서 Claude Code 실행 → 작업 완료 후 PR로 병합. 실전 시나리오: 대규모 리팩토링 시 — worktree A에서 API 리팩토링, worktree B에서 UI 리팩토링, worktree C에서 테스트 업데이트. 각각 독립된 브랜치에서 작업하므로 메인 브랜치는 항상 안정적입니다.',
        resources: [
          { label: 'Git Worktree 문서', url: 'https://git-scm.com/docs/git-worktree' },
        ],
        difficulty: 'advanced',
      },
      {
        title: '비대화형 모드 & 파이프라인',
        description: 'claude -p 플래그로 대화 없이 한 번에 결과를 받을 수 있습니다. 이를 활용한 자동화 파이프라인 예시: [일일 코드 품질 체크] echo "src/ 디렉토리의 코드 품질을 분석해줘" | claude -p > daily-report.md — 매일 아침 cron으로 실행하여 코드 품질 리포트 자동 생성. [에러 로그 분석] cat production.log | claude -p "최근 24시간의 에러 패턴을 분석하고 우선순위별로 정리해줘" — 운영 모니터링 자동화. [문서 자동 생성] claude -p "src/api/ 디렉토리의 모든 엔드포인트에 대한 API 문서를 OpenAPI 형식으로 생성해줘" > api-docs.yaml. 핵심: -p 모드는 CI/CD, cron job, 쉘 스크립트에 통합하여 반복 작업을 자동화하는 데 최적입니다.',
        resources: [
          { label: 'Claude Code CLI 레퍼런스', url: 'https://docs.anthropic.com/en/docs/claude-code/cli-usage' },
        ],
        difficulty: 'advanced',
      },
    ],
  },
  {
    id: 'cc-project',
    num: '10',
    phase: 'Claude Code',
    title: '실전 프로젝트',
    description: '이론은 끝! 이제 Claude Code로 처음부터 끝까지 앱을 만들어봅니다. 기획 → 설계 → 개발 → 테스트 → 배포까지의 전체 과정을 체험합니다.',
    duration: '3시간',
    topics: [
      {
        title: '프로젝트 기획 & 초기 설정',
        description: '실습 프로젝트: "할 일 관리 앱(Todo App)". 단계별로 따라하세요: ① Claude Code 실행 후 Plan Mode 진입 → "React + TypeScript로 할 일 관리 앱을 만들 거야. 기능: 할 일 추가/삭제/완료 체크, 필터링(전체/진행중/완료). 프로젝트 구조와 구현 계획을 세워줘" ② 계획을 검토하고 동의하면 Normal Mode로 전환 ③ "먼저 프로젝트를 초기화해줘. Vite + React + TypeScript 템플릿으로" → Claude Code가 npm create vite 실행, 의존성 설치까지 자동 처리 ④ /init으로 CLAUDE.md 생성 → 프로젝트에 맞게 수정. 핵심: 처음에 계획을 꼼꼼히 세우는 것이 나중에 10배의 수정을 방지합니다.',
        resources: [
          { label: 'Vite 시작 가이드', url: 'https://vite.dev/guide/' },
          { label: 'React 공식 문서', url: 'https://react.dev/' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '핵심 기능 개발',
        description: '기능을 하나씩 순서대로 구현합니다. 절대 한 번에 모든 기능을 요청하지 마세요. [Step 1] "TodoItem 컴포넌트를 만들어줘. 할 일 텍스트, 완료 체크박스, 삭제 버튼이 있어야 해" → 완료 확인 → [Step 2] "할 일을 추가하는 입력 폼을 만들어줘. Enter 키로 추가, 빈 값은 추가 불가" → 완료 확인 → [Step 3] "필터 기능을 추가해줘. 전체/진행중/완료 3가지 탭으로 필터링" → 완료 확인. 각 단계마다: ① 코드가 정상 동작하는지 브라우저에서 확인 ② 동작하지 않으면 "이 부분이 동작하지 않아. [증상 설명]" ③ Claude Code가 스스로 디버깅. 이 "하나씩 구현 → 확인 → 다음"이 가장 효율적인 패턴입니다.',
        resources: [
          { label: 'React Tutorial', url: 'https://react.dev/learn' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '테스트 & 배포',
        description: '앱이 완성되면 테스트와 배포를 진행합니다. [테스트] "이 앱의 핵심 기능에 대한 테스트를 작성해줘. 할 일 추가, 삭제, 완료 토글, 필터링 각각에 대해. Vitest + React Testing Library 사용" → Claude Code가 테스트 파일 생성 + 테스트 실행까지 자동. [빌드] "프로덕션 빌드를 해줘" → npm run build 실행 + 에러가 있으면 자동 수정. [배포] "이 프로젝트를 GitHub에 올리고 GitHub Pages로 배포해줘" → git init + 커밋 + GitHub 레포 생성 + GitHub Actions 워크플로우 설정 + 배포까지 자동. 3시간 안에 기획부터 배포까지 완성된 앱을 만드는 경험은 Claude Code의 진짜 가치를 체감하게 해줍니다.',
        resources: [
          { label: 'Vitest 공식 문서', url: 'https://vitest.dev/' },
          { label: 'GitHub Pages 배포', url: 'https://pages.github.com/' },
        ],
        difficulty: 'intermediate',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // PART 3: AI 심화
  // ──────────────────────────────────────────────
  {
    id: 'automation',
    num: '11',
    phase: 'AI 심화',
    title: 'AI 자동화 & 워크플로우',
    description: '"이메일이 오면 AI가 요약해서 슬랙에 전달" — 이런 자동화를 코드 한 줄 없이 만들 수 있습니다. n8n, Make 같은 도구와 AI API를 결합하여 반복 작업을 없애는 방법을 배웁니다.',
    duration: '2~3주',
    topics: [
      {
        title: 'AI 워크플로우 자동화 (n8n, Make)',
        description: '코드 없이 AI를 업무에 연결하는 노코드 자동화 도구입니다. 실전 자동화 예시: [이메일 요약] Gmail에 새 이메일 도착 → AI가 핵심 내용 3줄 요약 → 슬랙 채널에 전달. [고객 문의 분류] 고객 문의 접수 → AI가 카테고리 분류(기술/결제/일반) + 긴급도 판단 → 해당 담당자에게 자동 배정. [콘텐츠 생성] 새 제품이 DB에 등록되면 → AI가 제품 설명 초안 작성 → 마케팅팀 리뷰 요청 알림. n8n(오픈소스, 무료 셀프호스팅 가능) vs Make(유료, UI가 직관적). 처음이라면 Make의 무료 플랜으로 시작한 후, 복잡한 자동화가 필요하면 n8n으로 전환하세요.',
        resources: [
          { label: 'n8n 공식 문서', url: 'https://docs.n8n.io/' },
          { label: 'Make (구 Integromat)', url: 'https://www.make.com' },
          { label: 'Zapier', url: 'https://zapier.com' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: 'AI API 활용 기초',
        description: 'AI를 직접 프로그래밍에서 호출하고 싶다면 API를 사용합니다. 시작법: ① Anthropic Console(console.anthropic.com)에서 API 키 발급 ② 가장 간단한 호출 예시(Python): import anthropic / client = anthropic.Anthropic() / message = client.messages.create(model="claude-sonnet-4-20250514", max_tokens=1024, messages=[{"role":"user","content":"안녕!"}]). 핵심 개념: 모델 선택(Sonnet = 빠르고 저렴, Opus = 최고 품질), 토큰(글자 수 단위), 온도(temperature, 창의성 조절). 비용: Sonnet 기준 100만 토큰당 입력 $3 / 출력 $15. 일반적인 요청 1건은 $0.01~$0.05 수준. OpenAI도 비슷한 패턴: from openai import OpenAI / client = OpenAI() / response = client.chat.completions.create(model="gpt-5", ...). 두 API 모두 10줄 이내로 첫 호출이 가능합니다. 실전 활용: 엑셀 데이터 1000건을 자동 분류하거나, 매일 뉴스를 수집해서 요약 리포트를 생성하는 스크립트를 만들 수 있습니다.',
        resources: [
          { label: 'Anthropic API 문서', url: 'https://docs.anthropic.com/en/api' },
          { label: 'OpenAI API 문서', url: 'https://platform.openai.com/docs' },
          { label: 'Anthropic Python SDK', url: 'https://github.com/anthropics/anthropic-sdk-python' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: 'AI 에이전트 — 다음 단계',
        description: '2026년, AI 에이전트는 더 이상 실험이 아닌 실전 기술입니다. Fortune 500 기업의 40% 이상이 AI 에이전트를 프로덕션에서 운영 중입니다 (Gartner 2026). AI 에이전트란: 스스로 계획하고 → 도구를 사용하고 → 결과를 검증하고 → 다음 행동을 결정하는 자율적 시스템. Claude Code 자체가 대표적인 AI 에이전트입니다. 2026년 현재 주요 에이전트 프레임워크: ① LangGraph — 기업 환경 1위 (월 3,400만 다운로드), 상태 관리가 핵심 강점. 복잡한 분기 워크플로우에 최적 ② CrewAI — 역할 기반 멀티 에이전트 협업, 직관적 API. 빠른 프로토타이핑에 추천 ③ OpenAI Agents SDK — OpenAI 공식 에이전트 프레임워크, 간결한 설계 ④ Google ADK — Gemini + Google 서비스 연동 강점. 실전 사례: 고객 문의 자동 응답, 코드 리뷰 자동화, 데이터 분석 보고서 생성. 에이전트 시장 규모: 2025년 $78억 → 2030년 $526억 예상. AI를 "도구"로 쓰는 것에서 AI가 "동료"로 일하는 시대로 전환 중입니다.',
        resources: [
          { label: 'LangGraph 공식 문서', url: 'https://langchain-ai.github.io/langgraph/' },
          { label: 'CrewAI 공식 문서', url: 'https://docs.crewai.com/' },
          { label: 'OpenAI Agents SDK', url: 'https://openai.github.io/openai-agents-python/' },
        ],
        difficulty: 'advanced',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // PART 3 확장: RAG, 에이전트 개발, 윤리 & 커리어
  // ──────────────────────────────────────────────
  {
    id: 'rag-vector',
    num: '12',
    phase: 'AI 심화',
    title: 'RAG & 벡터 데이터베이스',
    description: '"이 100페이지 PDF 내용을 바탕으로 답변해줘" — RAG(검색 증강 생성)는 AI가 당신의 데이터를 기반으로 정확한 답변을 생성하게 하는 핵심 기술입니다. 2026년 AI 엔지니어의 필수 역량입니다.',
    duration: '2~3주',
    topics: [
      {
        title: 'RAG란 무엇인가',
        description: 'RAG(Retrieval-Augmented Generation)는 AI의 환각 문제를 해결하는 가장 실용적인 방법입니다. 원리: ① 당신의 문서를 작은 조각(chunk)으로 나눔 ② 각 조각을 벡터(숫자 배열)로 변환하여 저장 ③ 질문이 들어오면 가장 관련 있는 조각을 검색 ④ 검색된 조각을 AI에게 "참고 자료"로 전달 → 정확한 답변 생성. 비유하면: 시험을 볼 때 교과서를 통째로 외우는 대신(기존 AI), 관련 페이지를 펼쳐놓고 답을 쓰는 것(RAG)입니다. Before/After — ❌ RAG 없이: "우리 회사 환불 정책 알려줘" → AI가 일반적인 환불 정책을 지어냄 ✅ RAG 적용: 회사 약관 PDF를 벡터 DB에 저장 → 해당 조항을 정확히 인용하며 답변. 실전 활용: 사내 문서 검색 챗봇, 고객 FAQ 자동 응답, 법률/의료 문서 분석. RAG 없는 AI는 학습 데이터에만 의존하지만, RAG가 있으면 최신 정보와 비공개 데이터를 실시간으로 활용할 수 있습니다.',
        resources: [
          { label: 'LangChain RAG 튜토리얼', url: 'https://python.langchain.com/docs/tutorials/rag/' },
          { label: 'RAG 무료 강좌 (Active Loop)', url: 'https://learn.activeloop.ai/courses/rag' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '벡터 데이터베이스 비교',
        description: '벡터 데이터베이스는 RAG의 핵심 인프라입니다. 텍스트를 숫자 벡터로 변환한 뒤, "의미가 비슷한" 벡터를 빠르게 검색합니다. 2026년 주요 벡터 DB 비교: ① Chroma — 로컬 개발에 최적. pip install chromadb 한 줄로 시작, 무료 오픈소스. 학습·프로토타입에 강력 추천 ② Pinecone — 완전 관리형 클라우드 서비스. 설정 없이 바로 사용, 무료 티어 제공. 프로덕션 RAG에 추천 ③ Qdrant — 고성능 오픈소스(Rust 기반). Docker로 셀프호스팅, <5ms 검색 속도, 필터링 강력 ④ Weaviate — 멀티모달(텍스트+이미지) 검색 지원, GraphQL API ⑤ pgvector — PostgreSQL 확장. 기존 DB 인프라를 그대로 활용. 선택 기준: 학습/프로토타입 → Chroma, SaaS 프로덕션 → Pinecone, 셀프호스팅 고성능 → Qdrant, 기존 PostgreSQL 활용 → pgvector. 입문자는 Chroma로 시작해서 프로덕션 시 Pinecone이나 Qdrant로 전환하는 패턴을 추천합니다.',
        resources: [
          { label: 'Chroma 공식 문서', url: 'https://docs.trychroma.com/' },
          { label: 'Pinecone 시작 가이드', url: 'https://docs.pinecone.io/guides/get-started/overview' },
          { label: 'Qdrant 공식 문서', url: 'https://qdrant.tech/documentation/' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: 'LangChain vs LlamaIndex — 실전 선택 가이드',
        description: 'RAG 구축의 양대 프레임워크입니다. 2026년 현재 "둘 다 쓰는 것"이 엔터프라이즈 표준이 되었습니다. LangChain — "만능 오케스트레이터". 2025년 10월 v1.0 출시, 모듈화된 패키지 구조(langchain-core, langchain-openai, langchain-anthropic 등)로 진화. RAG뿐 아니라 에이전트, 체인, 도구 연결까지. 월 3,400만 다운로드로 기업 채택 1위. LlamaIndex — "데이터 전문가". 문서 로딩·파싱·인덱싱에 특화. 복잡한 문서 구조(PDF 표, 이미지 포함)를 처리하는 데 강점. 고급 검색 기법(하이브리드 검색, 리랭킹) 내장. 실전 선택 가이드: ① RAG만 필요 → LlamaIndex로 시작 ② RAG + 에이전트 + 도구 연결 → LangChain ③ 복잡한 문서(PDF 표, 이미지) → LlamaIndex ④ 기업 프로덕션 → LangChain + LangSmith(모니터링). 엔터프라이즈 패턴: LlamaIndex로 데이터 인덱싱 → LangGraph 에이전트에 도구로 연결. 둘 다 Python 10줄 이내로 기본 RAG를 구축할 수 있습니다.',
        resources: [
          { label: 'LangChain 공식 문서', url: 'https://python.langchain.com/docs/introduction/' },
          { label: 'LlamaIndex 공식 문서', url: 'https://docs.llamaindex.ai/' },
          { label: '테디노트 LangChain 한국어 튜토리얼', url: 'https://github.com/teddylee777/langchain-kr' },
        ],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'ai-agent-dev',
    num: '13',
    phase: 'AI 심화',
    title: 'AI 에이전트 개발',
    description: '2026년 가장 뜨거운 AI 기술은 단연 "에이전트"입니다. 시장 규모가 2025년 $78억에서 2030년 $526억으로 성장 전망. 단순한 챗봇을 넘어, 스스로 계획하고 도구를 사용하고 작업을 완수하는 AI 시스템을 직접 만들어봅니다.',
    duration: '3~4주',
    topics: [
      {
        title: '에이전트 프레임워크 비교',
        description: '2026년 주요 AI 에이전트 프레임워크를 비교합니다. ① LangGraph — LangChain 생태계의 에이전트 프레임워크. 기업 환경 1위 (월 3,400만 다운로드). 상태 관리가 핵심 강점: 복잡한 멀티스텝 워크플로우를 그래프 구조로 정의. "고객 문의 → 분류 → 담당자 라우팅 → 자동 답변" 같은 파이프라인에 최적. 학습 곡선이 높지만 프로덕션에 가장 안정적. ② CrewAI — "역할 기반 협업"이 콘셉트. Researcher(조사), Writer(작성), Editor(검수) 역할을 정의하면 AI가 역할별로 협업. 코드가 직관적이라 러닝커브가 낮음. 단, 토큰 오버헤드가 약 3배라 프로덕션 비용 주의. ③ OpenAI Agents SDK — OpenAI 공식 에이전트 프레임워크. 가장 간결한 API 설계. OpenAI 모델과의 통합이 자연스러움. ④ Google ADK — Google의 에이전트 개발 키트. Gemini 모델과 Google 서비스 연동에 강점. 처음 시작한다면: CrewAI(가장 쉬움) → LangGraph(프로덕션 수준) 순서를 추천합니다.',
        resources: [
          { label: 'LangGraph 공식 문서', url: 'https://langchain-ai.github.io/langgraph/' },
          { label: 'CrewAI 공식 문서', url: 'https://docs.crewai.com/' },
          { label: 'OpenAI Agents SDK', url: 'https://openai.github.io/openai-agents-python/' },
        ],
        difficulty: 'intermediate',
      },
      {
        title: '멀티 에이전트 실전 — CrewAI로 리서치 팀 만들기',
        description: '직접 해보면서 배우는 멀티 에이전트 시스템입니다. CrewAI로 "AI 리서치 팀"을 만들어봅니다. 목표: 주제를 입력하면 AI 팀이 자동으로 조사 → 분석 → 보고서 작성. [Step 1] pip install crewai crewai-tools로 설치. [Step 2] 에이전트 3명 정의 — Researcher(role="시니어 리서처", goal="주제에 대한 최신 자료 5개 수집"), Analyst(role="데이터 분석가", goal="수집된 자료에서 핵심 인사이트 추출"), Writer(role="보고서 작성자", goal="분석 결과를 한국어 보고서로 작성"). [Step 3] Task를 순서대로 정의: research_task → analysis_task → writing_task. [Step 4] Crew 실행: crew.kickoff(inputs={"topic": "2026년 AI 에이전트 트렌드"}). 결과: 3개의 AI가 순서대로 작업을 완수하고 최종 보고서가 생성됩니다. 이것이 멀티 에이전트의 핵심 패턴: 역할 분담 → 순차/병렬 실행 → 결과 통합. 실제로 이 패턴이 콘텐츠 파이프라인, 데이터 분석, 고객 지원 자동화에 사용되고 있습니다.',
        resources: [
          { label: 'CrewAI 퀵스타트', url: 'https://docs.crewai.com/quickstart' },
          { label: 'CrewAI 실전 튜토리얼 (DigitalOcean)', url: 'https://www.digitalocean.com/community/tutorials/crewai-crash-course-role-based-agent-orchestration' },
        ],
        difficulty: 'advanced',
      },
      {
        title: 'Tool Use — AI에게 도구 쥐여주기',
        description: 'AI 에이전트의 진짜 힘은 "도구 사용(Tool Use)" 능력에서 나옵니다. Tool Use란: AI가 텍스트 생성 외에 웹 검색, API 호출, DB 조회, 파일 읽기/쓰기를 직접 수행하는 것. Claude의 Tool Use 예시: Anthropic API에서 tools 파라미터로 함수를 정의하면, AI가 필요할 때 해당 함수를 "호출"합니다. 예: 날씨 조회 도구를 정의 → 사용자가 "서울 날씨 알려줘" → AI가 get_weather("Seoul")을 호출 → 실제 날씨 데이터로 답변. PART 2에서 배운 MCP와의 연결: MCP 서버 = AI가 사용할 수 있는 도구 모음. Claude Code가 파일을 읽고, 명령을 실행하고, Git을 다루는 것이 바로 Tool Use입니다. 실전 활용 패턴: ① 검색 에이전트: 웹 검색 → 결과 분석 → 답변 ② 데이터 에이전트: DB 조회 → 시각화 → 보고서 ③ 코딩 에이전트: 코드 읽기 → 수정 → 테스트 실행 → 결과 확인. 현재 기업에서 가장 수요가 높은 스킬 중 하나입니다.',
        resources: [
          { label: 'Anthropic Tool Use 가이드', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview' },
          { label: 'OpenAI Function Calling', url: 'https://platform.openai.com/docs/guides/function-calling' },
          { label: 'MCP 공식 문서', url: 'https://modelcontextprotocol.io/' },
        ],
        difficulty: 'advanced',
      },
    ],
  },
  {
    id: 'ai-ethics-career',
    num: '14',
    phase: 'AI 심화',
    title: 'AI 윤리, 보안 & 커리어',
    description: 'AI를 잘 쓰는 것만큼 "올바르게" 쓰는 것이 중요합니다. EU AI Act 전면 시행이 2026년 8월로 다가오고, AI 시대에 어떤 커리어를 준비해야 하는지 — 이 모듈에서 정리합니다.',
    duration: '1~2주',
    topics: [
      {
        title: 'AI 윤리와 규제 — EU AI Act',
        description: '2026년, AI 규제가 본격화되었습니다. 가장 중요한 EU AI Act 타임라인: ✅ 2025년 2월 시행 — 금지 AI 관행(사회적 점수제, 실시간 생체인식 등) ✅ 2025년 8월 시행 — GPT-5급 범용 AI 모델 규제(투명성 의무, 저작권 준수) ⏰ 2026년 8월 시행 예정 — 고위험 AI 전면 의무화(의료, 교육, 채용, 금융 등). 위반 시 최대 벌금: 3,500만 유로 또는 전 세계 매출의 7%. 한국도 AI 기본법 제정 추진 중. 실전 가이드라인: ❌ 개인정보(주민번호, 전화번호)를 AI에 입력하지 말 것 ❌ 회사 기밀 문서는 기업용 AI 서비스(API 모드, 학습에 사용 안 함 보장)만 사용 ✅ AI 출력물은 반드시 사람이 팩트체크할 것 ✅ AI 사용 사실을 이해관계자에게 적절히 공개할 것. AI를 업무에 쓸 때 "이 데이터를 AI에 넣어도 되는가?"를 항상 먼저 질문하세요.',
        resources: [
          { label: 'EU AI Act 공식 요약', url: 'https://artificialintelligenceact.eu/' },
          { label: 'Anthropic AI 안전 연구', url: 'https://www.anthropic.com/research' },
          { label: 'OpenAI 안전성 가이드', url: 'https://openai.com/safety' },
        ],
        difficulty: 'beginner',
      },
      {
        title: 'AI 시대의 커리어 전략',
        description: '2026년 AI 관련 직종별 가이드: ① AI 엔지니어 — 가장 수요 높은 역할. LLM 기반 앱(챗봇, RAG, 에이전트) 개발. 필요 스킬: Python, LangChain/LlamaIndex, 프롬프트 엔지니어링, API 통합, Docker. 미국 기준 연봉 $140K~$200K+. ② ML 엔지니어 — 모델 학습·최적화·배포 전문. 수학/통계 기반 필수. PyTorch, MLOps, 데이터 파이프라인. $130K~$220K. ③ 프롬프트 엔지니어 — AI 시스템 품질을 좌우하는 프롬프트 설계 전문가. 비개발자도 진입 가능. ④ AI 프로덕트 매니저 — AI 제품 기획·관리. 기술 이해 + 비즈니스 감각. 핵심 데이터: AI 스킬 보유 직군은 평균 28% 높은 연봉, AI 스킬 2개 이상이면 43% 프리미엄 (Lightcast 2026 조사). 현실적 조언: 이 로드맵을 완료하면 AI 엔지니어 입문 수준에 도달합니다. "AI 엔지니어"가 진입장벽이 가장 낮고 수요가 가장 높습니다. 기존 직무(마케터, 기획자, 디자이너)에 AI 스킬을 더하는 것만으로도 경쟁력이 크게 올라갑니다.',
        resources: [
          { label: 'AI 커리어 가이드 (Coursera)', url: 'https://www.coursera.org/resources/ai-learning-roadmap' },
          { label: 'AI Engineer 로드맵', url: 'https://roadmap.sh/ai-engineer' },
        ],
        difficulty: 'beginner',
      },
      {
        title: '포트폴리오 프로젝트 가이드',
        description: '취업이나 커리어 전환을 위한 AI 포트폴리오 프로젝트 추천. 채용 담당자가 보는 3가지: ① 클릭 가능한 라이브 데모 URL (GitHub 링크만으론 부족) ② 실제 비즈니스 문제 해결 (Titanic/MNIST 같은 튜토리얼 프로젝트는 감점) ③ 전체 라이프사이클 증명 (데이터 → 모델 → 배포 → 모니터링). 난이도별 프로젝트: [입문 1~2일] AI 챗봇 — Claude/GPT API + Streamlit으로 특정 주제 전문 챗봇. 예: "한국 세법 Q&A 챗봇". [중급 3~5일] RAG 검색 시스템 — 회사 매뉴얼을 벡터 DB에 저장, 자연어로 검색. LangChain + Chroma + Streamlit. 이것이 GenAI의 "Hello World"입니다. [중급 1주] 멀티 에이전트 리서치 봇 — CrewAI로 주제 입력 시 자동 리서치 + 보고서 생성. [고급 2~4주] 풀스택 AI SaaS — 실제 유료 서비스로 배포. Stripe 결제 연동. "3-프로젝트 공식": RAG 앱(검색/그라운딩 이해 증명) + AI 에이전트(자율 시스템 구축 증명) + 풀스택 AI 제품(배포 능력 증명). 모든 프로젝트는 GitHub 소스 공개 + README에 스크린샷/데모 영상 필수.',
        resources: [
          { label: 'Streamlit 공식 문서', url: 'https://docs.streamlit.io/' },
          { label: 'Gradio 공식 문서', url: 'https://www.gradio.app/docs' },
          { label: 'AI 프로젝트 로드맵 (GitHub)', url: 'https://github.com/krishnaik06/Complete-RoadMap-To-Learn-AI' },
        ],
        difficulty: 'intermediate',
      },
    ],
  },
];
