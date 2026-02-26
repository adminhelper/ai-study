export interface CommunityItem {
  name: string;
  description: string;
  url: string;
  type: CommunityType;
  language: 'ko' | 'en' | 'both';
  tags: string[];
}

export type CommunityType = 'forum' | 'discord' | 'newsletter' | 'youtube' | 'podcast' | 'blog';

export const communityTypeLabels: Record<CommunityType, string> = {
  forum: '포럼 / 커뮤니티',
  discord: 'Discord',
  newsletter: '뉴스레터',
  youtube: 'YouTube',
  podcast: '팟캐스트',
  blog: '블로그 / 미디어',
};

export const communityData: CommunityItem[] = [
  {
    name: 'r/MachineLearning',
    description: 'Reddit의 대표적 AI/ML 커뮤니티. 논문 리뷰, 토론, 최신 소식.',
    url: 'https://reddit.com/r/MachineLearning',
    type: 'forum',
    language: 'en',
    tags: ['논문', '토론', '뉴스'],
  },
  {
    name: 'r/LocalLLaMA',
    description: '오픈소스 LLM을 로컬에서 실행하는 커뮤니티. 양자화, 벤치마크, 파인튜닝.',
    url: 'https://reddit.com/r/LocalLLaMA',
    type: 'forum',
    language: 'en',
    tags: ['오픈소스', 'LLM', '로컬'],
  },
  {
    name: 'AI 타임스 (GeekNews)',
    description: '한국어 기반 기술 뉴스 커뮤니티. AI 관련 소식 활발.',
    url: 'https://news.hada.io',
    type: 'forum',
    language: 'ko',
    tags: ['뉴스', '한국어', '기술'],
  },
  {
    name: 'Hugging Face Discord',
    description: '오픈소스 AI 모델 허브. 모델 공유, 튜토리얼, Q&A.',
    url: 'https://discord.gg/huggingface',
    type: 'discord',
    language: 'en',
    tags: ['오픈소스', '모델', '커뮤니티'],
  },
  {
    name: 'Anthropic Discord',
    description: 'Claude 개발자 커뮤니티. Claude Code, API, 프롬프트 관련 토론.',
    url: 'https://discord.gg/anthropic',
    type: 'discord',
    language: 'en',
    tags: ['Claude', '개발', 'API'],
  },
  {
    name: 'AI Breakfast',
    description: '매일 아침 AI 뉴스 요약 뉴스레터. 주요 논문, 제품, 투자 소식.',
    url: 'https://aibreakfast.beehiiv.com/',
    type: 'newsletter',
    language: 'en',
    tags: ['뉴스', '매일', '요약'],
  },
  {
    name: 'The Batch (Andrew Ng)',
    description: 'Andrew Ng의 주간 AI 뉴스레터. 업계 트렌드와 교육 콘텐츠.',
    url: 'https://www.deeplearning.ai/the-batch/',
    type: 'newsletter',
    language: 'en',
    tags: ['주간', '교육', '트렌드'],
  },
  {
    name: '3Blue1Brown',
    description: '수학적 직관으로 설명하는 ML/DL 영상. 신경망 시리즈 필수 시청.',
    url: 'https://www.youtube.com/@3blue1brown',
    type: 'youtube',
    language: 'en',
    tags: ['교육', '수학', '시각화'],
  },
  {
    name: 'Andrej Karpathy',
    description: '전 Tesla AI, OpenAI. Neural Networks: Zero to Hero 시리즈.',
    url: 'https://www.youtube.com/@AndrejKarpathy',
    type: 'youtube',
    language: 'en',
    tags: ['교육', '딥러닝', '코딩'],
  },
  {
    name: '테크과학! DaveLeeLee',
    description: 'AI 기술 트렌드, 리뷰를 한국어로 쉽게 설명.',
    url: 'https://www.youtube.com/@daveleeleetechsci',
    type: 'youtube',
    language: 'ko',
    tags: ['한국어', '트렌드', '리뷰'],
  },
  {
    name: 'Latent Space Podcast',
    description: 'AI 엔지니어들의 기술 팟캐스트. 실무 인사이트와 업계 동향.',
    url: 'https://www.latent.space/podcast',
    type: 'podcast',
    language: 'en',
    tags: ['팟캐스트', '인터뷰', '실무'],
  },
  {
    name: 'Lil\'Log (Lilian Weng)',
    description: 'OpenAI 연구원의 기술 블로그. 고품질 AI 개념 설명과 서베이.',
    url: 'https://lilianweng.github.io/',
    type: 'blog',
    language: 'en',
    tags: ['블로그', '논문', '서베이'],
  },
];
