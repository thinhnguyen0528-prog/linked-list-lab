import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';

export const QuizSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const userChoice = selectedAnswers[currentQ.id];
  const isAnswered = userChoice !== undefined;

  const handleSelectOption = (optId: string) => {
    if (showExplanation[currentQ.id]) return; // lock once answered
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: optId }));
    setShowExplanation(prev => ({ ...prev, [currentQ.id]: true }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      const correctOpt = q.options.find(o => o.isCorrect)?.id;
      if (selectedAnswers[q.id] === correctOpt) {
        score++;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanation({});
    setCurrentIdx(0);
    setQuizFinished(false);
  };

  return (
    <section id="quiz-section" className="py-12 md:py-16 bg-white border-b border-[#E2DDD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2D6A4F]">
              Đánh giá mức độ thấu hiểu
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B] mt-1">
              TRẮC NGHIỆM HÌNH ẢNH
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-1">
              10 câu hỏi trực quan kiểm tra trực tiếp kiến thức con trỏ và thao tác danh sách liên kết.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#2D6A4F] bg-[#ECFDF5] px-3 py-1.5 rounded-lg border border-[#A7F3D0]">
              Đã làm: {Object.keys(selectedAnswers).length} / {QUIZ_QUESTIONS.length} câu
            </span>
          </div>
        </div>

        {/* Finished Score Screen */}
        {quizFinished ? (
          <div className="max-w-2xl mx-auto bg-[#FAF9F5] rounded-3xl border border-[#CBD5E1] p-8 sm:p-12 text-center shadow-xs">
            <span className="text-5xl block mb-4">🏆</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-2">
              Kết quả bài trắc nghiệm
            </h3>
            <p className="text-base text-[#64748B] mb-6">
              Bạn đã hoàn thành 10 câu hỏi trắc nghiệm bản chất con trỏ.
            </p>

            <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-[#CBD5E1] shadow-2xs mb-8">
              <span className="text-4xl font-mono font-extrabold text-[#2D6A4F]">
                {calculateScore()} / {QUIZ_QUESTIONS.length}
              </span>
              <div className="text-left border-l border-[#E2E8F0] pl-4">
                <p className="text-xs font-bold text-[#1E293B]">
                  {calculateScore() >= 8 ? 'Xuất sắc! Nắm rất vững kiến thức!' : calculateScore() >= 5 ? 'Khá tốt! Cần lưu ý thứ tự gán con trỏ.' : 'Nên xem lại bài giảng trực quan!'}
                </p>
                <p className="text-[11px] text-[#64748B]">Điểm số chuẩn hóa</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleResetQuiz}
                className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-[#2D6A4F] text-white hover:bg-[#22543d] transition-colors"
              >
                Làm lại từ đầu
              </button>
              <button
                onClick={() => setQuizFinished(false)}
                className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] hover:bg-[#F1F5F9] transition-colors"
              >
                Xem lại các câu hỏi
              </button>
            </div>
          </div>
        ) : (
          /* Active Question Card */
          <div className="max-w-4xl mx-auto bg-[#FAF9F5] rounded-3xl border border-[#CBD5E1] p-6 sm:p-10 shadow-xs">
            
            {/* Question Progress bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2DDD3]">
              <span className="text-xs font-mono font-bold text-[#2D6A4F]">
                CÂU HỎI {currentIdx + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <div className="flex items-center gap-1.5">
                {QUIZ_QUESTIONS.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                      i === currentIdx
                        ? 'bg-[#2D6A4F] scale-125'
                        : selectedAnswers[QUIZ_QUESTIONS[i].id]
                        ? 'bg-[#10B981]'
                        : 'bg-[#CBD5E1]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Scenario ASCII Diagram */}
            <div className="bg-[#0F172A] p-4 sm:p-5 rounded-2xl border border-[#334155] text-[#F8FAFC] mb-6 font-mono text-xs sm:text-sm overflow-x-auto">
              <div className="text-[11px] uppercase tracking-wider text-[#38BDF8] font-bold pb-2 mb-2 border-b border-[#1E293B]">
                Sơ đồ tình huống:
              </div>
              <pre className="text-[#E2E8F0] leading-relaxed">
                {currentQ.scenarioDiagram}
              </pre>
            </div>

            {/* Question title */}
            <h3 className="text-lg sm:text-xl font-bold text-[#1E293B] mb-6">
              {currentQ.question}
            </h3>

            {/* Options list */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map(opt => {
                const isSelected = userChoice === opt.id;
                const isRevealed = showExplanation[currentQ.id];
                
                let optionStyle = 'bg-white border-[#CBD5E1] hover:border-[#94A3B8]';
                if (isRevealed) {
                  if (opt.isCorrect) {
                    optionStyle = 'bg-[#ECFDF5] border-[#059669] text-[#065F46] ring-1 ring-[#059669]';
                  } else if (isSelected && !opt.isCorrect) {
                    optionStyle = 'bg-[#FEF2F2] border-[#DC2626] text-[#991B1B]';
                  } else {
                    optionStyle = 'bg-white border-[#E2E8F0] opacity-50';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-[#EFF6FF] border-[#3B82F6] ring-1 ring-[#3B82F6]';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isRevealed}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#F1F5F9] font-mono text-xs font-bold text-[#475569] flex items-center justify-center shrink-0">
                        {opt.id}
                      </span>
                      <span className="text-sm font-medium">
                        {opt.text}
                      </span>
                    </div>

                    {isRevealed && opt.isCorrect && (
                      <span className="text-xs font-bold text-[#059669] px-2 py-0.5 rounded-sm bg-[#D1FAE5]">
                        ✓ ĐÚNG
                      </span>
                    )}
                    {isRevealed && isSelected && !opt.isCorrect && (
                      <span className="text-xs font-bold text-[#DC2626] px-2 py-0.5 rounded-sm bg-[#FEE2E2]">
                        ✕ SAI
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box once answered */}
            {showExplanation[currentQ.id] && (
              <div className="p-5 rounded-2xl bg-white border border-[#CBD5E1] mb-6 animate-fadeIn">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">💡</span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                    Giải thích bản chất:
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E2DDD3]">
              <button
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] hover:bg-[#F1F5F9] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                ← Câu trước
              </button>

              {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#2D6A4F] text-white hover:bg-[#22543d] transition-colors"
                >
                  Câu tiếp theo →
                </button>
              ) : (
                <button
                  onClick={() => setQuizFinished(true)}
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#2D6A4F] text-white hover:bg-[#22543d] transition-colors shadow-xs"
                >
                  Xem tổng điểm bài thi 🏆
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
