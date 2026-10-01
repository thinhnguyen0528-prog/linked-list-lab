export type ListType = 'singly' | 'doubly' | 'circular';

export interface ListNode {
  id: string;
  value: number | string;
  address: string; // e.g. "0x10A"
  nextAddress?: string | null;
  prevAddress?: string | null;
  highlight?: 'default' | 'active' | 'new' | 'delete' | 'target' | 'prev' | 'next';
  statusLabel?: string; // e.g. "p (mới)", "q (đứng trước)", "head"
}

export type AnimationStep = {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description: string;
  humanExplanation?: string; // "Giải thích như người thật"
  whyExplanation: string;
  codeHighlightLines: {
    c: number[];
    cpp: number[];
    pseudo: number[];
  };
  listState: {
    nodes: ListNode[];
    headId: string | null;
    tailId?: string | null;
    floatingNode?: ListNode | null; // For newly created node before joining
    pointerArrows?: Array<{
      fromId: string;
      toId: string | 'NULL';
      label?: string;
      color?: 'default' | 'active' | 'warning' | 'temp';
      style?: 'solid' | 'dashed';
    }>;
    activePointers?: Array<{
      name: string; // e.g. "head", "p", "q", "tail"
      targetId: string | 'floating';
      color?: string;
    }>;
  };
};

export interface LearningModule {
  id: string;
  num: string;
  title: string;
  icon: string;
  status: 'not_started' | 'in_progress' | 'completed';
  targetSection: string;
}

export interface GuidedTourStep {
  stepIndex: number;
  title: string;
  concept: string;
  explanation: string;
  humanAnalogy: string;
  sampleDiagram: string;
  codeSnippet: string;
}

export type OperationType = 
  | 'insertHead'
  | 'insertTail'
  | 'insertAfter'
  | 'deleteHead'
  | 'deleteTail'
  | 'deleteNode'
  | 'traverse';

export interface TheoryChapter {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  humanDesc?: string;
  metaphor: {
    title: string;
    content: string;
    icon: string;
  };
  conceptDiagram: string;
  explanationPoints: string[];
  keyTakeaway: string;
  codeSnippet: {
    title: string;
    language: string;
    code: string;
  };
}

export interface QuizQuestion {
  id: number;
  title: string;
  scenarioDiagram: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  hint: string;
}

export interface PracticeChallenge {
  id: number;
  title: string;
  description: string;
  targetGoal: string;
  initialList: number[];
  targetValue: number;
  insertPosition?: number;
  questionType: 'sequence' | 'action';
  options?: {
    id: string;
    code: string;
    label: string;
  }[];
  correctSequence?: string[];
  explanation: string;
  hint: string;
  wrongSimulation?: {
    wrongSequence: string[];
    visualStateDescription: string;
    errorDiagnosis: string;
  };
}

