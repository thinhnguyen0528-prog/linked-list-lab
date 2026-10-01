import React, { useState, useEffect } from 'react';
import { playStepClick } from '../utils/soundEffects';

export const ComparisonSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'singly' | 'doubly' | 'circular' | 'array'>('singly');
  const [animStep, setAnimStep] = useState<number>(0);

  // Auto animation for active comparison diagram
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimStep(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(timer);
  }, [selectedType]);

  const handleSelect = (t: 'singly' | 'doubly' | 'circular' | 'array') => {
    playStepClick();
    setSelectedType(t);
    setAnimStep(0);
  };

  return (
    <section id="compare-section" className="py-12 md:py-16 bg-[#F7F5EF] border-b border-[#E2DDD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2D6A4F]">
              ĐÁNH GIÁ & ĐỐI CHIẾU KIẾN TRÚC
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B] mt-1">
              BẢNG SO SÁNH TRỰC QUAN ĐỘNG
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-1">
              Nhấp vào từng loại danh sách để sơ đồ mô phỏng chuyển động trực quan tương ứng.
            </p>
          </div>
        </div>

        {/* 3+1 Type Interactive Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => handleSelect('singly')}
            className={`p-4 rounded-2xl border text-center transition-all ${
              selectedType === 'singly'
                ? 'bg-white border-[#2D6A4F] ring-2 ring-[#2D6A4F] shadow-xs'
                : 'bg-[#FAF9F5] border-[#CBD5E1] text-[#64748B] hover:bg-white'
            }`}
          >
            <span className="text-2xl block mb-1">🧩</span>
            <span className="text-xs font-bold text-[#1E293B] block">LIÊN KẾT ĐƠN</span>
            <span className="text-[10px] text-[#64748B]">1 con trỏ next</span>
          </button>

          <button
            onClick={() => handleSelect('doubly')}
            className={`p-4 rounded-2xl border text-center transition-all ${
              selectedType === 'doubly'
                ? 'bg-white border-[#2563EB] ring-2 ring-[#2563EB] shadow-xs'
                : 'bg-[#FAF9F5] border-[#CBD5E1] text-[#64748B] hover:bg-white'
            }`}
          >
            <span className="text-2xl block mb-1">↔️</span>
            <span className="text-xs font-bold text-[#1E293B] block">LIÊN KẾT KÉP</span>
            <span className="text-[10px] text-[#2563EB]">2 con trỏ (prev + next)</span>
          </button>

          <button
            onClick={() => handleSelect('circular')}
            className={`p-4 rounded-2xl border text-center transition-all ${
              selectedType === 'circular'
                ? 'bg-white border-[#D97706] ring-2 ring-[#D97706] shadow-xs'
                : 'bg-[#FAF9F5] border-[#CBD5E1] text-[#64748B] hover:bg-white'
            }`}
          >
            <span className="text-2xl block mb-1">🔄</span>
            <span className="text-xs font-bold text-[#1E293B] block">LIÊN KẾT VÒNG</span>
            <span className="text-[10px] text-[#D97706]">Đuôi quay lại HEAD</span>
          </button>

          <button
            onClick={() => handleSelect('array')}
            className={`p-4 rounded-2xl border text-center transition-all ${
              selectedType === 'array'
                ? 'bg-white border-[#475569] ring-2 ring-[#475569] shadow-xs'
                : 'bg-[#FAF9F5] border-[#CBD5E1] text-[#64748B] hover:bg-white'
            }`}
          >
            <span className="text-2xl block mb-1">📦</span>
            <span className="text-xs font-bold text-[#1E293B] block">MẢNG TĨNH (ARRAY)</span>
            <span className="text-[10px] text-[#64748B]">Bộ nhớ liên tục</span>
          </button>
        </div>

        {/* Dynamic Animated Diagram Showcase */}
        <div className="bg-[#0F172A] rounded-3xl border border-[#334155] p-6 sm:p-8 text-[#F8FAFC] shadow-md mb-8">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E293B]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38BDF8]">
                MÔ PHỎNG ĐỘNG DÒNG DỮ LIỆU ({selectedType.toUpperCase()})
              </span>
            </div>
            <span className="text-xs font-mono text-[#94A3B8]">
              Bước duyệt: {animStep + 1} / 3
            </span>
          </div>

          <div className="font-mono text-xs sm:text-sm overflow-x-auto py-4">
            {selectedType === 'singly' && (
              <div className="space-y-4">
                <pre className="text-[#38BDF8] leading-relaxed">
{`HEAD
  │
  ▼
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│ 10 │ 0x2080 │ ───> │ 20 │ 0x30C0 │ ───> │ 30 │  NULL  │ ───> [ DỪNG ]
└─────────────┘      └─────────────┘      └─────────────┘
  ở ô 0x1040           ở ô 0x2080           ở ô 0x30C0`}
                </pre>
                <div className="p-3 bg-[#1E293B] rounded-xl text-xs text-[#E2E8F0] flex items-center gap-2">
                  <span className="text-[#10B981] font-bold">● Đang duyệt:</span>
                  <span>{animStep === 0 ? 'Con trỏ p đang ở Node [10]' : animStep === 1 ? 'p bước sang Node [20] qua p->next' : 'p bước sang Node [30], gặp next = NULL nên dừng lại!'}</span>
                </div>
              </div>
            )}

            {selectedType === 'doubly' && (
              <div className="space-y-4">
                <pre className="text-[#60A5FA] leading-relaxed">
{`NULL <── [PREV | 10 | NEXT] <════> [PREV | 20 | NEXT] <════> [PREV | 30 | NEXT] ──> NULL
          (ở 0x1040)                 (ở 0x2080)                 (ở 0x30C0)`}
                </pre>
                <div className="p-3 bg-[#1E293B] rounded-xl text-xs text-[#E2E8F0] flex items-center gap-2">
                  <span className="text-[#60A5FA] font-bold">↔️ Chiều duyệt:</span>
                  <span>{animStep % 2 === 0 ? 'Đi xuôi: [10] ──▶ [20] ──▶ [30]' : 'Đi lùi: [30] ◀── [20] ◀── [10] nhờ con trỏ PREV!'}</span>
                </div>
              </div>
            )}

            {selectedType === 'circular' && (
              <div className="space-y-4">
                <pre className="text-[#FBBF24] leading-relaxed">
{`      ┌────────────────────────────────────────────────────────┐
      ▼                                                        │
┌─────────────┐      ┌─────────────┐      ┌─────────────┐      │
│ 10 │ 0x2080 │ ───> │ 20 │ 0x30C0 │ ───> │ 30 │ 0x1040 │ ─────┘
└─────────────┘      └─────────────┘      └─────────────┘
  (HEAD)                                    (Node cuối trỏ về HEAD!)`}
                </pre>
                <div className="p-3 bg-[#1E293B] rounded-xl text-xs text-[#FEF08A] flex items-center gap-2">
                  <span className="text-[#F59E0B] font-bold">🔄 Chu trình:</span>
                  <span>{animStep === 0 ? 'Duyệt Node [10]' : animStep === 1 ? 'Duyệt Node [20]' : 'Duyệt Node [30] rồi lại QUAY VỀ Node [10]!'}</span>
                </div>
              </div>
            )}

            {selectedType === 'array' && (
              <div className="space-y-4">
                <pre className="text-[#A7F3D0] leading-relaxed">
{`VÙNG NHỚ LIÊN TIẾP TRONG RAM:
Địa chỉ:   0x1000       0x1004       0x1008       0x100C
Chỉ số:    arr[0]       arr[1]       arr[2]       arr[3]
Giá trị:  [  10   ]    [  20   ]    [  30   ]    [  ...  ]`}
                </pre>
                <div className="p-3 bg-[#1E293B] rounded-xl text-xs text-[#E2E8F0]">
                  💡 Truy xuất ngẫu nhiên <code>arr[i]</code> tốn O(1). Nhưng chèn phần tử mới vào đầu bắt buộc phải dịch chuyển toàn bộ n phần tử sang phải (O(n))!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Visual Matrix Table */}
        <div className="bg-white rounded-3xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b-2 border-[#CBD5E1] text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                <th className="py-4 px-4 bg-[#F8FAFC]">Tiêu chí so sánh</th>
                <th className="py-4 px-4 bg-[#F8FAFC] text-[#2D6A4F]">🧩 Liên kết đơn</th>
                <th className="py-4 px-4 bg-[#F8FAFC] text-[#2563EB]">↔️ Liên kết kép</th>
                <th className="py-4 px-4 bg-[#F8FAFC] text-[#D97706]">🔄 Liên kết vòng</th>
                <th className="py-4 px-4 bg-[#F8FAFC] text-[#475569]">📦 Mảng tĩnh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs sm:text-sm">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1E293B] bg-[#FAF9F5]">Số con trỏ mỗi phần tử</td>
                <td className="py-3.5 px-4 font-mono font-medium text-[#2D6A4F]">1 (con trỏ next)</td>
                <td className="py-3.5 px-4 font-mono font-medium text-[#2563EB]">2 (prev & next)</td>
                <td className="py-3.5 px-4 font-mono font-medium text-[#D97706]">1 hoặc 2</td>
                <td className="py-3.5 px-4 font-mono text-[#64748B]">0 (chỉ có dữ liệu)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1E293B] bg-[#FAF9F5]">Truy cập Node trước (PREV)</td>
                <td className="py-3.5 px-4 text-[#DC2626] font-medium">❌ Không thể</td>
                <td className="py-3.5 px-4 text-[#059669] font-medium">✅ Trực tiếp O(1)</td>
                <td className="py-3.5 px-4 text-[#475569] font-medium">Tùy loại đơn/kép vòng</td>
                <td className="py-3.5 px-4 text-[#059669] font-medium">✅ Qua arr[i-1]</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1E293B] bg-[#FAF9F5]">Có NULL kết thúc ở đuôi?</td>
                <td className="py-3.5 px-4 text-[#059669] font-medium">✅ Có (tail-&gt;next = NULL)</td>
                <td className="py-3.5 px-4 text-[#059669] font-medium">✅ Có (2 đầu NULL)</td>
                <td className="py-3.5 px-4 text-[#DC2626] font-medium">❌ Không (quay về HEAD)</td>
                <td className="py-3.5 px-4 text-[#64748B] font-medium">Không áp dụng</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1E293B] bg-[#FAF9F5]">Duyệt hai chiều (tiến & lùi)</td>
                <td className="py-3.5 px-4 text-[#DC2626] font-medium">❌ Chỉ đi một chiều</td>
                <td className="py-3.5 px-4 text-[#059669] font-medium">✅ Đi cả 2 chiều tự do</td>
                <td className="py-3.5 px-4 text-[#475569] font-medium">Chỉ đi vòng tròn</td>
                <td className="py-3.5 px-4 text-[#059669] font-medium">✅ Duyệt qua index</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1E293B] bg-[#FAF9F5]">Thêm / Xóa phần tử đầu</td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#059669]">O(1) Cực nhanh</td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#059669]">O(1) Cực nhanh</td>
                <td className="py-3.5 px-4 font-mono font-medium text-[#D97706]">O(1) nếu có tail</td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#DC2626]">O(n) Dịch toàn mảng</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1E293B] bg-[#FAF9F5]">Truy xuất ngẫu nhiên</td>
                <td className="py-3.5 px-4 font-mono text-[#DC2626]">O(n) Bắt buộc duyệt</td>
                <td className="py-3.5 px-4 font-mono text-[#DC2626]">O(n) Bắt buộc duyệt</td>
                <td className="py-3.5 px-4 font-mono text-[#DC2626]">O(n) Bắt buộc duyệt</td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#059669]">O(1) Truy cập arr[i]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
