import React, { useState, useEffect } from 'react';
import { playNodePop, playConnectChime } from '../utils/soundEffects';

interface HeroProps {
  onStartLearning: () => void;
  onEnterLab: (type?: 'singly' | 'doubly' | 'circular') => void;
  onOpenGuidedTour: () => void;
  soundActive: boolean;
  onToggleSound: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartLearning,
  onEnterLab,
  onOpenGuidedTour,
  soundActive,
  onToggleSound
}) => {
  const [activeStage, setActiveStage] = useState<number>(3); // 0 = head only, 1 = node 10, 2 = node 20, 3 = node 30 + null

  // Sequential animation looping
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage(prev => {
        const next = (prev + 1) % 4;
        if (next === 1 || next === 2 || next === 3) {
          playNodePop();
        }
        return next;
      });
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-14 md:pb-20 border-b border-[#E2DDD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top utility row: Sound & Tour buttons */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onOpenGuidedTour}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-[#CBD5E1] text-[#2D6A4F] hover:bg-[#F1F5F9] text-xs font-bold transition-all flex items-center gap-2 shadow-2xs group"
          >
            <span className="text-base group-hover:scale-110 transition-transform">👨‍🏫</span>
            <span>Hướng dẫn tôi học từ đầu</span>
          </button>

          <button
            onClick={onToggleSound}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
              soundActive
                ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]'
                : 'bg-white border-[#CBD5E1] text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <span>{soundActive ? '🔊' : '🔇'}</span>
            <span>Âm thanh: {soundActive ? 'BẬT' : 'TẮT'}</span>
          </button>
        </div>

        {/* Hero Headline and Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-bold tracking-widest text-[#2D6A4F] uppercase mb-3">
            LINKED LIST LAB V2 · THỰC HÀNH TRỰC QUAN
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1E293B] mb-5 leading-tight">
            Đừng học thuộc Linked List.<br />
            <span className="text-[#2D6A4F]">Hãy nhìn thấy nó hoạt động.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#64748B] font-normal leading-relaxed mb-8">
            Phòng thí nghiệm tương tác giúp bạn thấu hiểu bản chất từng byte trong RAM và đường nối con trỏ.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartLearning}
              className="px-6 py-3.5 text-base font-semibold text-white bg-[#2D6A4F] hover:bg-[#22543d] rounded-2xl shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2D6A4F] hover:scale-102"
            >
              Bắt đầu học
            </button>
            <button
              onClick={() => onEnterLab('singly')}
              className="px-6 py-3.5 text-base font-semibold text-[#1E293B] bg-white border border-[#CBD5E1] hover:bg-[#F1EFE7] rounded-2xl shadow-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2D6A4F] hover:scale-102"
            >
              Vào phòng thí nghiệm
            </button>
          </div>
        </div>

        {/* Hero Sequential Linked List Animation */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Sơ đồ động: Khởi tạo danh sách từng phần tử
              </span>
            </div>
            <div className="text-xs font-mono text-[#2D6A4F] font-bold">
              Giai đoạn {activeStage + 1} / 4
            </div>
          </div>

          {/* Interactive animated line */}
          <div className="overflow-x-auto py-8 flex items-center justify-center min-h-[180px]">
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              
              {/* HEAD pointer tag */}
              <div className="flex flex-col items-center animate-bounce">
                <span className="text-xs font-mono font-bold text-[#2D6A4F] px-2 py-0.5 rounded-md bg-[#ECFDF5] border border-[#A7F3D0] shadow-2xs mb-1">
                  HEAD ↓
                </span>
                <span className="text-[10px] text-[#64748B] font-mono">0x10A</span>
              </div>

              {/* Node 10 */}
              <div
                className={`transition-all duration-500 transform ${
                  activeStage >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex border-2 border-[#1E293B] bg-white rounded-2xl shadow-xs overflow-hidden">
                    <div className="px-5 py-3 font-mono font-bold text-xl text-[#1E293B] border-r border-[#CBD5E1]">
                      10
                    </div>
                    <div className="px-3 py-3 font-mono text-xs text-[#2563EB] bg-[#F8FAFC] flex items-center font-semibold">
                      {activeStage >= 1 ? '0x20B' : 'NULL'}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] mt-1">@0x10A</span>
                </div>
              </div>

              {/* Arrow 1 */}
              <div
                className={`flex items-center text-[#2563EB] transition-all duration-500 ${
                  activeStage >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}
              >
                <span className="w-6 sm:w-10 h-0.5 bg-[#2563EB]" />
                <span className="-ml-1 font-bold text-sm">▶</span>
              </div>

              {/* Node 20 */}
              <div
                className={`transition-all duration-500 transform ${
                  activeStage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex border-2 border-[#1E293B] bg-white rounded-2xl shadow-xs overflow-hidden">
                    <div className="px-5 py-3 font-mono font-bold text-xl text-[#1E293B] border-r border-[#CBD5E1]">
                      20
                    </div>
                    <div className="px-3 py-3 font-mono text-xs text-[#2563EB] bg-[#F8FAFC] flex items-center font-semibold">
                      {activeStage >= 2 ? '0x30C' : 'NULL'}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] mt-1">@0x20B</span>
                </div>
              </div>

              {/* Arrow 2 */}
              <div
                className={`flex items-center text-[#2563EB] transition-all duration-500 ${
                  activeStage >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}
              >
                <span className="w-6 sm:w-10 h-0.5 bg-[#2563EB]" />
                <span className="-ml-1 font-bold text-sm">▶</span>
              </div>

              {/* Node 30 */}
              <div
                className={`transition-all duration-500 transform ${
                  activeStage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex border-2 border-[#1E293B] bg-white rounded-2xl shadow-xs overflow-hidden">
                    <div className="px-5 py-3 font-mono font-bold text-xl text-[#1E293B] border-r border-[#CBD5E1]">
                      30
                    </div>
                    <div className="px-3 py-3 font-mono text-xs text-[#94A3B8] bg-[#F8FAFC] flex items-center font-semibold">
                      NULL
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] mt-1">@0x30C</span>
                </div>
              </div>

              {/* Arrow to NULL */}
              <div
                className={`flex items-center text-[#94A3B8] transition-all duration-500 ${
                  activeStage >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}
              >
                <span className="w-6 sm:w-10 h-0.5 bg-[#94A3B8]" />
                <span className="-ml-1 font-bold text-sm">▶</span>
              </div>

              {/* NULL Box */}
              <div
                className={`flex items-center justify-center px-4 py-3 rounded-2xl bg-[#F1F5F9] border-2 border-[#CBD5E1] text-xs font-mono font-bold text-[#64748B] shadow-2xs transition-all duration-500 ${
                  activeStage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                NULL (0x0)
              </div>
            </div>
          </div>

          {/* Educational Caption */}
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E2DDD3] text-xs text-[#475569] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              💡 <strong>Bản chất:</strong> Các Node nằm ở các ô nhớ phân tán (<code>0x10A</code>, <code>0x20B</code>, <code>0x30C</code>). Con trỏ NEXT là sợi dây duy nhất kết nối chúng!
            </span>
            <span className="font-mono text-xs text-[#2D6A4F] font-bold shrink-0">
              head ──▶ [10] ──▶ [20] ──▶ [30] ──▶ NULL
            </span>
          </div>
        </div>

        {/* 3 Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div
            onClick={() => onEnterLab('singly')}
            className="group cursor-pointer bg-white rounded-2xl border border-[#CBD5E1] p-6 hover:border-[#2D6A4F] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🧩</span>
                <span className="text-xs font-medium text-[#2D6A4F] group-hover:underline">
                  Thực hành ngay →
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1E293B] mb-2">
                Liên kết đơn (Singly)
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                Mỗi Node chứa dữ liệu (DATA) và một con trỏ duy nhất (NEXT). Duyệt theo một chiều từ HEAD đến NULL.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F1F5F9] font-mono text-xs text-[#475569]">
              HEAD → [DATA|NEXT] → NULL
            </div>
          </div>

          <div
            onClick={() => onEnterLab('doubly')}
            className="group cursor-pointer bg-white rounded-2xl border border-[#CBD5E1] p-6 hover:border-[#2D6A4F] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">↔️</span>
                <span className="text-xs font-medium text-[#2D6A4F] group-hover:underline">
                  Thực hành ngay →
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1E293B] mb-2">
                Liên kết kép (Doubly)
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                Mỗi Node có thêm con trỏ PREV trỏ về phần tử đứng trước. Cho phép duyệt hai chiều xuôi và ngược dễ dàng.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F1F5F9] font-mono text-xs text-[#475569]">
              NULL ← [PREV|DATA|NEXT] → NULL
            </div>
          </div>

          <div
            onClick={() => onEnterLab('circular')}
            className="group cursor-pointer bg-white rounded-2xl border border-[#CBD5E1] p-6 hover:border-[#2D6A4F] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🔄</span>
                <span className="text-xs font-medium text-[#2D6A4F] group-hover:underline">
                  Thực hành ngay →
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1E293B] mb-2">
                Liên kết vòng (Circular)
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                Node cuối không trỏ tới NULL mà quay ngược lại trỏ vào Node đầu (HEAD). Tạo thành một chu trình khép kín liên tục.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F1F5F9] font-mono text-xs text-[#475569]">
              [10] → [20] → [30] ─(vòng về HEAD)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
