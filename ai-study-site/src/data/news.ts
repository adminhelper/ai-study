export interface NewsSource {
  name: string;
  description: string;
  url: string;
  type: NewsType;
  updateFrequency: string;
  language: 'ko' | 'en' | 'both';
}

export type NewsType = 'official' | 'media' | 'aggregator' | 'research';

export const newsTypeLabels: Record<NewsType, string> = {
  official: '공식 블로그',
  media: '미디어 / 저널',
  aggregator: '뉴스 모음',
  research: '연구 / 논문',
};

export const newsData: NewsSource[] = [
  {
    name: 'Anthropic Blog',
    description: 'Claude 개발사 공식 블로그. 모델 출시, 안전성 연구, 기술 글.',
    url: 'https://www.anthropic.com/news',
    type: 'official',
    updateFrequency: '주 1~2회',
    language: 'en',
  },
  {
    name: 'OpenAI Blog',
    description: 'GPT 시리즈 개발사 공식 블로그. 모델 업데이트, 연구 발표.',
    url: 'https://openai.com/blog',
    type: 'official',
    updateFrequency: '주 2~3회',
    language: 'en',
  },
  {
    name: 'Google DeepMind Blog',
    description: 'Gemini, AlphaFold 등 Google AI 연구 소식.',
    url: 'https://deepmind.google/discover/blog/',
    type: 'official',
    updateFrequency: '주 1~2회',
    language: 'en',
  },
  {
    name: 'Meta AI Blog',
    description: 'LLaMA 등 오픈소스 AI 연구와 발표.',
    url: 'https://ai.meta.com/blog/',
    type: 'official',
    updateFrequency: '주 1~2회',
    language: 'en',
  },
  {
    name: 'The Verge - AI',
    description: '주요 AI 뉴스를 일반인도 이해하기 쉽게 보도.',
    url: 'https://www.theverge.com/ai-artificial-intelligence',
    type: 'media',
    updateFrequency: '매일',
    language: 'en',
  },
  {
    name: 'Ars Technica - AI',
    description: '기술적 깊이가 있는 AI 뉴스와 분석 기사.',
    url: 'https://arstechnica.com/ai/',
    type: 'media',
    updateFrequency: '매일',
    language: 'en',
  },
  {
    name: 'MIT Technology Review',
    description: 'MIT 발행 기술 매거진. 심층적 AI 분석과 전망.',
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/',
    type: 'media',
    updateFrequency: '주 3~5회',
    language: 'en',
  },
  {
    name: 'GeekNews (긱뉴스)',
    description: '한국어 기술 뉴스 커뮤니티. AI 소식 큐레이션.',
    url: 'https://news.hada.io',
    type: 'aggregator',
    updateFrequency: '매일',
    language: 'ko',
  },
  {
    name: 'Hacker News',
    description: 'Y Combinator의 기술 뉴스 커뮤니티. AI 관련 글 활발.',
    url: 'https://news.ycombinator.com/',
    type: 'aggregator',
    updateFrequency: '매일',
    language: 'en',
  },
  {
    name: 'Papers With Code',
    description: 'AI 논문과 구현 코드를 연결. 최신 벤치마크 트래킹.',
    url: 'https://paperswithcode.com/',
    type: 'research',
    updateFrequency: '매일',
    language: 'en',
  },
  {
    name: 'arXiv - cs.AI',
    description: 'AI 분야 사전 인쇄 논문 저장소. 최신 연구를 가장 빨리 접할 수 있음.',
    url: 'https://arxiv.org/list/cs.AI/recent',
    type: 'research',
    updateFrequency: '매일',
    language: 'en',
  },
  {
    name: 'Hugging Face Papers',
    description: '커뮤니티 기반 AI 논문 큐레이션. 인기순 정렬.',
    url: 'https://huggingface.co/papers',
    type: 'research',
    updateFrequency: '매일',
    language: 'en',
  },
];
