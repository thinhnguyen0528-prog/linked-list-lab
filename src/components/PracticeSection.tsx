import React, { useState } from 'react';
import { PRACTICE_CHALLENGES } from '../data/practiceData';
import { playSuccessChord, playStepClick } from '../utils/soundEffects';

export const PracticeSection: React.FC = () => {
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedSequence, setSelectedSequence] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const challenge = PRACTICE_CHALLENGES[currentChallengeIdx];

  const handleToggleOption = (optionId: string) => {
    if (submitted) return;
    playStepClick();
    if (selectedSequence.includes(optionId)) {
      setSelectedSequence(selectedSequence.filter(id => id !== optionId));
    } else {
      setSelectedSequence([...selectedSequence, optionId]);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedSequence.length === 0) return;
    const correctSeq = challenge.correctSequence || [];
    const correct = JSON.stringify(selectedSequence) === JSON.stringify(correctSeq);
    setIsCorrect(correct);
    setSubmitted(true);
    if (correct) {
      playSuccessChord();
    } else {
      playStepClick();
    }
  };

  const handleResetChallenge = () => {
    setSelectedSequence([]);
    setSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
  };

  const handleNextChallenge = () => {
    handleResetChallenge();
    setCurrentChallengeIdx(prev => (prev + 1) % PRACTICE_CHALLENGES.length);
  };

  return (
    <section id="practice-section" className="py-12 md:py-16 bg-[#F7F5EF] border-b border-[#E2DDD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2D6A4F]">
              THỰC CHIẾN TƯ DUY CON TRỎ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B] mt-1">
              TỰ MÌNH LÀM · SAI THẤY NGAY
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-1">
              Tự tay lắp ráp các câu lệnh con trỏ. Nếu làm sai thứ tự, hệ thống sẽ mô phỏng ngay hậu quả đứt gãy danh sách!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#2D6A4F] bg-white px-3 py-1.5 rounded-xl border border-[#CBD5E1]">
              Thử thách {currentChallengeIdx + 1} / {PRACTICE_CHALLENGES.length}
            </span>
          </div>
        </div>

        {/* Challenge Box */}
        <div className="bg-white rounded-3xl border border-[#CBD5E1] p-6 sm:p-10 shadow-xs">
          
          {/* Challenge title & scenario */}
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E293B] mb-2">
              {challenge.title}
            </h3>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              {challenge.description}
            </p>
          </div>

          {/* Visual Initial State vs Goal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#FAF9F5] border border-[#E2DDD3] mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-2">
                Trạng thái hiện tại:
              </span>
              <div className="font-mono text-sm font-bold text-[#1E293B] bg-white p-3 rounded-xl border border-[#CBD5E1]">
                {challenge.initialList.length > 0 ? (
                  <span>HEAD → [{challenge.initialList.join('] → [')}] → NULL</span>
                ) : (
                  <span>HEAD → NULL (Rỗng)</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D6A4F] block mb-2">
                Mục tiêu mong muốn:
              </span>
              <div className="font-mono text-sm font-bold text-[#065F46] bg-[#ECFDF5] p-3 rounded-xl border border-[#A7F3D0]">
                {challenge.targetGoal}
              </div>
            </div>
          </div>

          {/* Step Selector Area */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E293B] mb-3">
              Nhấp vào các thao tác bên dưới theo thứ tự bạn muốn thực thi:
            </h4>

            <div className="space-y-3">
              {challenge.options?.map(opt => {
                const stepIdx = selectedSequence.indexOf(opt.id);
                const isChosen = stepIdx !== -1;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleToggleOption(opt.id)}
                    disabled={submitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isChosen
                        ? 'bg-[#EFF6FF] border-[#3B82F6] ring-1 ring-[#3B82F6]'
                        : 'bg-white border-[#CBD5E1] hover:border-[#94A3B8]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                          isChosen
                            ? 'bg-[#2563EB] text-white shadow-xs'
                            : 'bg-[#F1F5F9] text-[#64748B]'
                        }`}
                      >
                        {isChosen ? `B${stepIdx + 1}` : '○'}
                      </span>
                      <div>
                        <div className="font-mono text-sm font-bold text-[#1E293B]">
                          {opt.code}
                        </div>
                        <div className="text-xs text-[#64748B] mt-0.5">
                          {opt.label}
                        </div>
                      </div>
                    </div>

                    <span className="text-xs text-[#2563EB] font-medium hidden sm:inline">
                      {isChosen ? `Được chọn làm Bước ${stepIdx + 1}` : '+ Chọn'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sequence summary */}
            {selectedSequence.length > 0 && (
              <div className="mt-4 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center gap-2 text-xs text-[#475569]">
                <span className="font-semibold text-[#1E293B]">Trình tự của bạn:</span>
                <span className="font-mono font-bold text-[#2563EB]">
                  {selectedSequence
                    .map(id => challenge.options?.find(o => o.id === id)?.code)
                    .join('  ──▶  ')}
                </span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E2DDD3]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-3.5 py-2 text-xs font-medium text-[#D97706] bg-[#FFFBEB] border border-[#FDE68A] hover:bg-[#FEF3C7] rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>💡</span>
                <span>{showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}</span>
              </button>
              <button
                onClick={handleResetChallenge}
                className="px-3.5 py-2 text-xs font-medium text-[#475569] hover:bg-[#F1F5F9] rounded-lg transition-colors"
              >
                ↻ Đặt lại lựa chọn
              </button>
            </div>

            <div className="flex items-center gap-3">
              {!submitted ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedSequence.length < (challenge.options?.length || 2)}
                  className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-[#2D6A4F] text-white hover:bg-[#22543d] disabled:opacity-40 transition-colors shadow-xs"
                >
                  Kiểm tra câu trả lời
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-[#2D6A4F] text-white hover:bg-[#22543d] transition-colors shadow-xs"
                >
                  Thử thách tiếp theo →
                </button>
              )}
            </div>
          </div>

          {/* Hint callout */}
          {showHint && (
            <div className="mt-4 p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] leading-relaxed">
              <strong>Gợi ý:</strong> {challenge.hint}
            </div>
          )}

          {/* Result Feedback Banner with "Sai thì thấy ngay" simulation */}
          {submitted && (
            <div
              className={`mt-6 p-6 rounded-2xl border ${
                isCorrect
                  ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]'
                  : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-base font-bold">
                  <span>{isCorrect ? '🎉' : '⚠️'}</span>
                  <span>{isCorrect ? 'Chính xác xuất sắc!' : 'Chưa chính xác — Hậu quả khi thực thi:'}</span>
                </div>
                {!isCorrect && (
                  <button
                    onClick={handleResetChallenge}
                    className="px-3 py-1 bg-[#DC2626] text-white rounded-lg text-xs font-bold hover:bg-[#B91C1C] transition-colors shadow-2xs"
                  >
                    Sửa thao tác ↻
                  </button>
                )}
              </div>

              {/* If wrong, show the visual simulation of the error */}
              {!isCorrect && challenge.wrongSimulation && (
                <div className="p-4 rounded-xl bg-[#450A0A] text-[#FECACA] font-mono text-xs mb-3 border border-[#7F1D1D] overflow-x-auto">
                  <div className="text-[10px] uppercase font-bold text-[#F87171] mb-1">
                    MÔ PHỎNG TRẠNG THÁI BỘ NHỚ BỊ HỎNG DO LÀM SAI THỨ TỰ:
                  </div>
                  <pre className="text-white leading-relaxed">{challenge.wrongSimulation.visualStateDescription}</pre>
                  <p className="mt-2 text-xs font-sans text-[#FCA5A5] font-semibold">{challenge.wrongSimulation.errorDiagnosis}</p>
                </div>
              )}

              <p className="text-xs sm:text-sm leading-relaxed mb-2">
                {isCorrect
                  ? challenge.explanation
                  : 'Bạn đã đảo lộn thứ tự con trỏ! Nhớ quy tắc cốt lõi: Luôn móc nối Node mới vào danh sách cũ trước, rồi mới được dời con trỏ HEAD hoặc con trỏ của Node đứng trước.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
