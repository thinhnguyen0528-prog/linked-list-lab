import React, { useState } from 'react';
import { GUIDED_TOUR_STEPS } from '../data/learningPathData';
import { playStepClick, playSuccessChord } from '../utils/soundEffects';

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToPractice: () => void;
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  isOpen,
  onClose,
  onJumpToPractice
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const currentStep = GUIDED_TOUR_STEPS[currentStepIdx];

  if (!isOpen) return null;

  const handleNext = () => {
    playStepClick();
    if (currentStepIdx < GUIDED_TOUR_STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      playSuccessChord();
      onClose();
      onJumpToPractice();
    }
  };

  const handlePrev = () => {
    playStepClick();
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#CBD5E1] flex flex-col justify-between max-h-[90vh] overflow-y-auto">
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👨‍🏫</span>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#2D6A4F]">
                  Chế độ giảng bài trực tiếp · Bài {currentStep.stepIndex} / {GUIDED_TOUR_STEPS.length}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E293B]">
                  {currentStep.title}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Core Concept Banner */}
          <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] mb-5">
            <span className="text-xs font-bold text-[#065F46] uppercase block mb-1">
              Khái niệm trọng tâm:
            </span>
            <p className="text-sm font-semibold text-[#047857]">
              {currentStep.concept}
            </p>
          </div>

          {/* Explanation & Human Analogy */}
          <div className="space-y-4 text-sm text-[#334155] leading-relaxed mb-6">
            <p>{currentStep.explanation}</p>

            <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs sm:text-sm text-[#92400E] flex items-start gap-3">
              <span className="text-xl shrink-0">🗣️</span>
              <div>
                <strong className="block text-[#78350F] mb-0.5">Nói nôm na cho dễ nhớ:</strong>
                <span>{currentStep.humanAnalogy}</span>
              </div>
            </div>
          </div>

          {/* Visual Diagram */}
          <div className="p-4 rounded-2xl bg-[#0F172A] text-[#F8FAFC] font-mono text-xs sm:text-sm overflow-x-auto mb-5 border border-[#334155]">
            <pre className="text-[#38BDF8] leading-relaxed">
              {currentStep.sampleDiagram}
            </pre>
          </div>

          {/* Code snippet */}
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-xs text-[#1E293B]">
            <span className="text-[10px] text-[#64748B] block mb-1 font-sans font-bold uppercase">Mã nguồn tương ứng:</span>
            <pre className="text-[#0F172A] font-bold">{currentStep.codeSnippet}</pre>
          </div>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#E2E8F0]">
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F1F5F9] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            ← Bài trước
          </button>

          <div className="flex items-center gap-1.5">
            {GUIDED_TOUR_STEPS.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentStepIdx ? 'bg-[#2D6A4F] w-5' : 'bg-[#CBD5E1]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#2D6A4F] text-white hover:bg-[#22543d] transition-colors shadow-xs"
          >
            {currentStepIdx < GUIDED_TOUR_STEPS.length - 1 ? 'Tiếp tục bài sau →' : 'Hoàn tất & Vào thực hành 🧪'}
          </button>
        </div>
      </div>
    </div>
  );
};
