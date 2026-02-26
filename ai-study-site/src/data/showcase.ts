export interface ShowcasePost {
  id: string;
  category: ShowcaseCategory;
  title: string;
  summary: string;
  author: string;
  tags: string[];
  content: string;
  createdAt: string;
}

export type ShowcaseCategory =
  | '프롬프트'
  | '자동화'
  | '워크플로우'
  | '스킬/설정'
  | '활용 사례';

export const showcaseCategories: { key: ShowcaseCategory; emoji: string; color: string }[] = [
  { key: '프롬프트', emoji: '💬', color: 'var(--color-accent)' },
  { key: '자동화', emoji: '⚡', color: 'var(--color-accent2)' },
  { key: '워크플로우', emoji: '🔄', color: 'var(--color-accent3)' },
  { key: '스킬/설정', emoji: '⚙️', color: 'var(--color-green)' },
  { key: '활용 사례', emoji: '🎯', color: '#f472b6' },
];

export const showcaseData: ShowcasePost[] = [
  {
    id: 'prompt-review',
    category: '프롬프트',
    title: '코드 리뷰 프롬프트 템플릿',
    summary: '시니어 개발자 수준의 코드 리뷰를 받는 프롬프트',
    author: 'AI학습자',
    tags: ['Claude', '코드리뷰', '프롬프트'],
    content: '역할: 10년 경력 시니어 개발자\n관점: 보안, 성능, 가독성, 테스트 커버리지\n형식: 심각도(🔴🟡🟢)별 분류 + 개선 코드 제시\n\n이 구조로 프롬프트를 작성하면 단순 "좋아요/나빠요" 대신 구체적이고 실행 가능한 피드백을 받을 수 있습니다.',
    createdAt: '2026-02-20',
  },
  {
    id: 'prompt-meeting',
    category: '프롬프트',
    title: '회의록 자동 정리 프롬프트',
    summary: '녹음 텍스트를 구조화된 회의록으로 변환',
    author: '직장인AI',
    tags: ['생산성', '회의록', '업무'],
    content: '회의 텍스트를 붙여넣고 "다음 형식으로 정리해줘: 참석자 / 핵심 안건 / 결정사항 / Action Items(담당자+기한)"을 요청합니다. 중요한 건 "말투는 ~했음 체로, 이모지 없이"처럼 출력 스타일도 지정하는 것.',
    createdAt: '2026-02-18',
  },
  {
    id: 'auto-n8n',
    category: '자동화',
    title: 'n8n으로 뉴스 요약 자동화',
    summary: 'RSS → AI 요약 → Slack 알림 파이프라인',
    author: '자동화매니아',
    tags: ['n8n', '자동화', 'Slack'],
    content: 'n8n에서 RSS 노드로 기사를 가져오고, Claude API로 3줄 요약을 생성한 뒤, Slack으로 전송합니다. 하루 1회 스케줄링하면 매일 아침 AI 뉴스 브리핑을 받을 수 있습니다.',
    createdAt: '2026-02-15',
  },
  {
    id: 'auto-git',
    category: '자동화',
    title: 'Claude Code로 PR 자동 리뷰',
    summary: 'GitHub Actions + claude -p로 PR 코멘트 자동화',
    author: '데브옵스러',
    tags: ['Claude Code', 'GitHub', 'CI/CD'],
    content: 'GitHub Actions에서 PR이 열리면 diff를 추출하고, claude -p "이 diff를 리뷰해줘"로 비대화형 리뷰를 생성합니다. 결과를 gh pr comment로 자동 등록하면 AI 코드 리뷰 봇 완성.',
    createdAt: '2026-02-12',
  },
  {
    id: 'workflow-plan',
    category: '워크플로우',
    title: 'Plan First 워크플로우',
    summary: '대규모 기능 개발 시 Plan Mode 활용법',
    author: '풀스택개발자',
    tags: ['Claude Code', 'Plan Mode', '워크플로우'],
    content: '1. Plan Mode로 진입 (/plan)\n2. "이 기능을 구현하려면 어떤 파일을 수정해야 해?"로 범위 파악\n3. 계획을 검토하고 수정 요청\n4. 동의 후 Normal Mode로 전환하여 실행\n\n이렇게 하면 AI가 엉뚱한 파일을 건드리는 사고를 방지할 수 있습니다.',
    createdAt: '2026-02-10',
  },
  {
    id: 'workflow-debug',
    category: '워크플로우',
    title: '에러 디버깅 3단계 루틴',
    summary: '에러 → 재현 → 수정을 체계적으로',
    author: '디버거',
    tags: ['디버깅', '워크플로우', '테스트'],
    content: '1단계: 에러 로그를 Claude에게 보여주고 "원인을 분석해줘"\n2단계: "이 에러를 재현하는 테스트를 작성해줘"\n3단계: "테스트가 통과하도록 수정해줘"\n\n테스트 먼저 작성하면 수정이 맞는지 자동 검증됩니다.',
    createdAt: '2026-02-08',
  },
  {
    id: 'skill-claudemd',
    category: '스킬/설정',
    title: 'CLAUDE.md 실전 템플릿',
    summary: '프로젝트 유형별 CLAUDE.md 작성 가이드',
    author: 'ClaudeCode러',
    tags: ['CLAUDE.md', '설정', '템플릿'],
    content: '# 프로젝트명\n\n## 빌드 & 테스트\n- npm run dev / npm test / npm run build\n\n## 코드 스타일\n- TypeScript strict mode\n- 함수형 컴포넌트 + hooks\n\n## 주의사항\n- as any 절대 금지\n- 기존 패턴 따를 것\n\n이 정도만 적어도 AI 응답 품질이 확 올라갑니다.',
    createdAt: '2026-02-05',
  },
  {
    id: 'skill-hooks',
    category: '스킬/설정',
    title: 'Hook으로 자동 린트 설정하기',
    summary: 'PostToolUse 훅으로 파일 저장 후 자동 린트',
    author: '자동화매니아',
    tags: ['Hooks', '린트', '자동화'],
    content: '.claude/settings.json에 PostToolUse 훅을 추가합니다. Write 도구 실행 후 eslint --fix를 자동으로 돌리면, AI가 작성한 코드가 항상 린트 규칙을 따르게 됩니다.',
    createdAt: '2026-02-03',
  },
  {
    id: 'usecase-blog',
    category: '활용 사례',
    title: 'AI로 기술 블로그 작성하기',
    summary: '구조 잡기 → 초안 → 퇴고 3단계',
    author: '블로거',
    tags: ['글쓰기', '블로그', '생산성'],
    content: '1. "이 주제로 블로그 목차를 잡아줘" (구조)\n2. 섹션별로 "이 부분을 500자로 써줘" (초안)\n3. "전문가가 읽어도 이상하지 않게 다듬어줘" (퇴고)\n\n한 번에 전체를 쓰게 하면 품질이 떨어집니다. 단계별로 나눠서 요청하는 게 핵심.',
    createdAt: '2026-01-28',
  },
  {
    id: 'usecase-data',
    category: '활용 사례',
    title: 'Claude로 데이터 분석하기',
    summary: 'CSV 데이터를 붙여넣고 인사이트 추출',
    author: '데이터분석가',
    tags: ['데이터', '분석', 'CSV'],
    content: 'CSV 데이터를 Claude에 붙여넣고 "이 데이터의 트렌드, 이상치, 주요 인사이트를 분석해줘"로 시작합니다. 이어서 "이걸 경영진 보고용 차트 추천과 함께 정리해줘"로 보고서까지.',
    createdAt: '2026-01-25',
  },
];
