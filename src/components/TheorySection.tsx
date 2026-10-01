import React, { useState } from 'react';
import { THEORY_CHAPTERS } from '../data/theoryData';

interface TheorySectionProps {
  onJumpToLab: () => void;
}

export const TheorySection: React.FC<TheorySectionProps> = ({ onJumpToLab }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [explainStyle, setExplainStyle] = useState<'academic' | 'intuitive'>('intuitive');
  const currentChapter = THEORY_CHAPTERS[activeChapterIndex];

  return (
    <section id="theory-section" className="py-12 md:py-16 bg-white border-b border-[#E2DDD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2D6A4F]">
              Khám phá bản chất từng khái niệm
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B] mt-1">
              BÀI GIẢNG TRỰC QUAN
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-1">
              Hiểu bản chất con trỏ qua hình vẽ và mô hình tư duy thực tế trước khi đọc code.
            </p>
          </div>

          <button
            onClick={onJumpToLab}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#F7F5EF] border border-[#CBD5E1] text-[#1E293B] hover:bg-[#EAE6D9] transition-colors self-start md:self-auto"
          >
            Thử nghiệm thực tế trong Lab →
          </button>
        </div>

        {/* Progress Bar & Chapter Navigator */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 min-w-[700px]">
            {THEORY_CHAPTERS.map((chap, idx) => {
              const isActive = idx === activeChapterIndex;
              const isPassed = idx < activeChapterIndex;

              return (
                <button
                  key={chap.id}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`flex-1 text-left p-3 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-[#ECFDF5] border-[#2D6A4F] ring-1 ring-[#2D6A4F]'
                      : isPassed
                      ? 'bg-white border-[#CBD5E1] hover:border-[#94A3B8]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold ${
                        isActive ? 'text-[#2D6A4F]' : isPassed ? 'text-[#059669]' : 'text-[#94A3B8]'
                      }`}
                    >
                      {chap.num}
                    </span>
                    {isPassed && <span className="text-[10px] text-[#059669]">✓</span>}
                  </div>
                  <p
                    className={`text-xs font-bold truncate ${
                      isActive ? 'text-[#065F46]' : 'text-[#334155]'
                    }`}
                  >
                    {chap.title.replace(/^.*: /, '')}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Lesson Content Card */}
        <div className="bg-[#FAF9F5] rounded-3xl border border-[#CBD5E1] p-6 sm:p-10 shadow-xs">
          
          {/* Chapter Title & Subtitle */}
          <div className="mb-8">
            <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-[#2D6A4F] text-white">
              BÀI {currentChapter.num} / 08
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mt-3">
              {currentChapter.title}
            </h3>
            <p className="text-base text-[#64748B] mt-1 font-medium">
              {currentChapter.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Visual Metaphor & Diagram (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Explanation Style Switcher */}
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold uppercase text-[#475569]">
                  Phong cách giảng giải:
                </span>
                <div className="flex items-center gap-1 bg-[#E2E8F0] p-1 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setExplainStyle('intuitive')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      explainStyle === 'intuitive' ? 'bg-white text-[#065F46] shadow-xs' : 'text-[#64748B]'
                    }`}
                  >
                    🗣 Giải thích dễ hiểu
                  </button>
                  <button
                    onClick={() => setExplainStyle('academic')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      explainStyle === 'academic' ? 'bg-white text-[#1E293B] shadow-xs' : 'text-[#64748B]'
                    }`}
                  >
                    📘 Giải thích học thuật
                  </button>
                </div>
              </div>

              {/* Dynamic explanation text */}
              <div className="text-base text-[#334155] leading-relaxed bg-white p-5 rounded-2xl border border-[#E2DDD3]">
                {explainStyle === 'intuitive' && currentChapter.humanDesc ? (
                  <div>
                    <span className="text-xs font-bold uppercase text-[#059669] block mb-1">
                      🗣 Diễn giải nôm na:
                    </span>
                    <p className="text-sm sm:text-base text-[#1E293B]">
                      {currentChapter.humanDesc}
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs font-bold uppercase text-[#2563EB] block mb-1">
                      📘 Định nghĩa chuẩn giáo trình:
                    </span>
                    <p className="text-sm sm:text-base text-[#334155]">
                      {currentChapter.shortDesc}
                    </p>
                  </div>
                )}
              </div>

              {/* Real-life Metaphor Callout */}
              <div className="p-5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-4">
                <span className="text-3xl shrink-0">{currentChapter.metaphor.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-[#92400E] mb-1">
                    {currentChapter.metaphor.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed">
                    {currentChapter.metaphor.content}
                  </p>
                </div>
              </div>

              {/* Visual ASCII / Graphic Architecture */}
              <div className="p-5 rounded-2xl bg-[#0F172A] text-[#F8FAFC] border border-[#334155]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1E293B]">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#38BDF8]">
                    SƠ ĐỒ TRỰC QUAN TRONG BỘ NHỚ RAM
                  </span>
                  <span className="text-[11px] font-mono text-[#94A3B8]">Memory Model</span>
                </div>
                <pre className="font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-[#E2E8F0]">
                  {currentChapter.conceptDiagram}
                </pre>
              </div>

              {/* Key Bullet Points */}
              <div className="bg-white p-5 rounded-2xl border border-[#E2DDD3]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] mb-3">
                  CÁC Ý CỐT LÕI CẦN HIỂU:
                </h4>
                <ul className="space-y-2">
                  {currentChapter.explanationPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                      <span className="text-[#2D6A4F] font-bold">●</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Code & Key Takeaways (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Code Snippet Card */}
              <div className="bg-[#1E293B] rounded-2xl border border-[#334155] overflow-hidden text-[#F8FAFC]">
                <div className="px-4 py-3 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#A7F3D0]">
                    {currentChapter.codeSnippet.title}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#334155] text-[#94A3B8]">
                    {currentChapter.codeSnippet.language}
                  </span>
                </div>
                <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-[#E2E8F0]">
                  <code>{currentChapter.codeSnippet.code}</code>
                </pre>
              </div>

              {/* "Điều cần nhớ" Callout Card */}
              <div className="p-5 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">📌</span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#065F46]">
                    ĐIỀU CẦN NHỚ
                  </h4>
                </div>
                <p className="text-sm font-semibold text-[#047857] leading-relaxed">
                  &ldquo;{currentChapter.keyTakeaway}&rdquo;
                </p>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setActiveChapterIndex(Math.max(0, activeChapterIndex - 1))}
                  disabled={activeChapterIndex === 0}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] hover:bg-[#F1F5F9] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  ← Bài trước
                </button>

                <span className="text-xs font-mono text-[#64748B]">
                  {activeChapterIndex + 1} / {THEORY_CHAPTERS.length}
                </span>

                <button
                  onClick={() => setActiveChapterIndex(Math.min(THEORY_CHAPTERS.length - 1, activeChapterIndex + 1))}
                  disabled={activeChapterIndex === THEORY_CHAPTERS.length - 1}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#2D6A4F] text-white hover:bg-[#22543d] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  Bài tiếp theo →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
