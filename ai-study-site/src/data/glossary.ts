export interface GlossaryTerm {
  term: string;
  termEn: string;
  category: GlossaryCategory;
  definition: string;
  example?: string;
}

export type GlossaryCategory = 'core' | 'model' | 'technique' | 'tool' | 'ethics';

export const categoryLabels: Record<GlossaryCategory, string> = {
  core: '핵심 개념',
  model: '모델 & 아키텍처',
  technique: '기법 & 방법론',
  tool: '도구 & 플랫폼',
  ethics: '윤리 & 안전',
};

export const glossaryData: GlossaryTerm[] = [
  {
    term: '인공지능',
    termEn: 'Artificial Intelligence (AI)',
    category: 'core',
    definition: '인간의 학습, 추론, 인지 능력을 모방하는 컴퓨터 시스템. 좁은 AI(특정 작업)와 일반 AI(범용)로 구분.',
  },
  {
    term: '머신러닝',
    termEn: 'Machine Learning (ML)',
    category: 'core',
    definition: '명시적 프로그래밍 없이 데이터로부터 패턴을 학습하는 AI의 하위 분야.',
    example: '스팸 메일 필터가 수천 개의 메일 데이터로부터 스팸 패턴을 학습.',
  },
  {
    term: '딥러닝',
    termEn: 'Deep Learning (DL)',
    category: 'core',
    definition: '여러 층의 신경망을 사용하는 머신러닝 기법. 이미지 인식, 자연어 처리 등에 특히 강력.',
  },
  {
    term: '트랜스포머',
    termEn: 'Transformer',
    category: 'model',
    definition: '2017년 Google이 발표한 신경망 아키텍처. Self-Attention 메커니즘으로 GPT, BERT, Claude 등 현대 LLM의 기반.',
  },
  {
    term: '대규모 언어 모델',
    termEn: 'Large Language Model (LLM)',
    category: 'model',
    definition: '방대한 텍스트 데이터로 학습된 언어 모델. 텍스트 생성, 번역, 요약, 코딩 등 다양한 언어 작업 수행.',
    example: 'GPT-4, Claude, Gemini, LLaMA 등.',
  },
  {
    term: '토큰',
    termEn: 'Token',
    category: 'core',
    definition: 'LLM이 텍스트를 처리하는 최소 단위. 한국어 한 글자 ≈ 2~3 토큰, 영어 한 단어 ≈ 1~2 토큰.',
    example: '"안녕하세요" → 약 5~8 토큰으로 분리.',
  },
  {
    term: '프롬프트 엔지니어링',
    termEn: 'Prompt Engineering',
    category: 'technique',
    definition: 'AI에게 원하는 결과를 얻기 위해 입력(프롬프트)을 설계하는 기술.',
    example: 'System Prompt, Few-shot, Chain of Thought 등의 기법.',
  },
  {
    term: 'RAG',
    termEn: 'Retrieval-Augmented Generation',
    category: 'technique',
    definition: '외부 데이터베이스에서 관련 정보를 검색한 뒤 LLM에 제공하여 응답 품질을 높이는 기법.',
    example: '회사 내부 문서를 검색해서 정확한 답변을 생성.',
  },
  {
    term: '파인튜닝',
    termEn: 'Fine-tuning',
    category: 'technique',
    definition: '사전 학습된 모델을 특정 도메인/작업에 맞게 추가 학습시키는 과정.',
  },
  {
    term: 'RLHF',
    termEn: 'Reinforcement Learning from Human Feedback',
    category: 'technique',
    definition: '인간 피드백을 통해 모델의 응답 품질을 향상시키는 강화학습 기법. ChatGPT, Claude 등에 사용.',
  },
  {
    term: '환각',
    termEn: 'Hallucination',
    category: 'ethics',
    definition: 'AI가 사실이 아닌 내용을 그럴듯하게 생성하는 현상. LLM의 주요 한계 중 하나.',
    example: '존재하지 않는 논문을 인용하거나 잘못된 통계를 제시.',
  },
  {
    term: 'MCP',
    termEn: 'Model Context Protocol',
    category: 'tool',
    definition: 'AI 모델이 외부 도구와 데이터에 접근할 수 있도록 하는 표준 프로토콜. Anthropic이 주도.',
  },
  {
    term: 'AI 에이전트',
    termEn: 'AI Agent',
    category: 'tool',
    definition: '목표를 달성하기 위해 자율적으로 계획을 세우고, 도구를 사용하고, 행동하는 AI 시스템.',
    example: 'Claude Code가 파일을 읽고 → 분석하고 → 코드를 수정하는 전 과정.',
  },
  {
    term: '컨텍스트 윈도우',
    termEn: 'Context Window',
    category: 'model',
    definition: 'LLM이 한 번에 처리할 수 있는 토큰의 최대 양. 모델마다 다름.',
    example: 'Claude Opus 4.6: 약 1M 토큰, GPT-4o: 128K 토큰.',
  },
  {
    term: '얼라인먼트',
    termEn: 'Alignment',
    category: 'ethics',
    definition: 'AI의 행동을 인간의 의도와 가치에 맞추는 연구 분야.',
  },
];
