import React from 'react';
import { LearningModule } from '../types/linkedList';

interface LearningPathMapProps {
  modules: LearningModule[];
  onSelectModule: (module: LearningModule) => void;
  activeModuleId: string;
}

export const LearningPathMap: React.FC<LearningPathMapProps> = ({
  modules,
  onSelectModule,
  activeModuleId
}) => {
  // Calculate completed percent
  const completedCount = modules.filter(m => m.status === 'completed').length;
  const inProgressCount = modules.filter(m => m.status === 'in_progress').length;
  const percent = Math.round(((completedCount + inProgressCount * 0.5) / modules.length) * 100);

  return (
    <div className="bg-white rounded-3xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs mb-8">
      {/* Header & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E2DDD3]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2D6A4F]">
            Lộ trình học tập tương tác
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E293B] mt-0.5">
            BẢN ĐỒ BÀI HỌC V2
          </h3>
        </div>

        {/* Visual Progress Bar */}
        <div className="flex flex-col items-start sm:items-end min-w-[240px]">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-bold">
            <span className="text-[#64748B] uppercase tracking-wider">TIẾN ĐỘ HỌC:</span>
            <span className="font-mono text-sm text-[#2D6A4F]">{percent}%</span>
          </div>
          <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-[#2D6A4F] rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid of 9 Roadmap items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
        {modules.map((m) => {
          const isActive = m.id === activeModuleId;
          const isDone = m.status === 'completed';
          const isInProgress = m.status === 'in_progress';

          return (
            <button
              key={m.id}
              onClick={() => onSelectModule(m)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[105px] group ${
                isActive
                  ? 'border-[#2D6A4F] bg-[#ECFDF5] ring-2 ring-[#2D6A4F] shadow-xs'
                  : isDone
                  ? 'border-[#A7F3D0] bg-[#FAFDFB] hover:border-[#2D6A4F]'
                  : isInProgress
                  ? 'border-[#FDE68A] bg-[#FFFBEB] hover:border-[#F59E0B]'
                  : 'border-[#E2E8F0] bg-[#FAF9F5] opacity-75 hover:opacity-100 hover:border-[#CBD5E1]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#64748B]">
                  {m.num}
                </span>
                <span className="text-xs">
                  {isDone ? (
                    <span className="text-[#059669] font-bold">✓</span>
                  ) : isInProgress ? (
                    <span className="text-[#D97706] font-bold">◐</span>
                  ) : (
                    <span className="text-[#94A3B8]">○</span>
                  )}
                </span>
              </div>

              <div className="my-1.5">
                <span className="text-xl block mb-1">{m.icon}</span>
                <p className="text-xs font-bold text-[#1E293B] group-hover:text-[#2D6A4F] transition-colors leading-tight">
                  {m.title}
                </p>
              </div>

              <div className="text-[10px] font-medium">
                {isDone ? (
                  <span className="text-[#059669]">Đã hiểu</span>
                ) : isInProgress ? (
                  <span className="text-[#D97706]">Đang học</span>
                ) : (
                  <span className="text-[#94A3B8]">Chưa học</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
