import React, { useState } from 'react';
import { ListNode, ListType } from '../types/linkedList';

interface NodeInspectorProps {
  node: ListNode | null;
  listType: ListType;
  nextNodeVal?: number | string | null;
  prevNodeVal?: number | string | null;
  onClose: () => void;
}

export const NodeInspector: React.FC<NodeInspectorProps> = ({
  node,
  listType,
  nextNodeVal,
  prevNodeVal,
  onClose
}) => {
  const [activeCell, setActiveCell] = useState<'data' | 'next' | 'prev' | null>(null);

  if (!node) return null;

  return (
    <div className="bg-white rounded-2xl border-2 border-[#2D6A4F] p-5 shadow-md animate-fadeIn transition-all">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] animate-pulse" />
          <h4 className="text-sm font-bold text-[#1E293B] uppercase tracking-wider">
            KÍNH HIỂN VI: SOI CHI TIẾT NODE [{node.value}]
          </h4>
          <span className="text-xs font-mono text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-md">
            Địa chỉ RAM: {node.address}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A] p-1 rounded-md hover:bg-[#F1F5F9] transition-colors"
        >
          ✕ Đóng
        </button>
      </div>

      {/* Visual Interactive Node Anatomy */}
      <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
        
        {/* Visual Enlarged Node Box */}
        <div className="flex items-stretch rounded-2xl border-2 border-[#1E293B] shadow-sm overflow-hidden bg-white shrink-0">
          
          {/* PREV Cell for Doubly list */}
          {listType === 'doubly' && (
            <div
              onMouseEnter={() => setActiveCell('prev')}
              onMouseLeave={() => setActiveCell(null)}
              onClick={() => setActiveCell(activeCell === 'prev' ? null : 'prev')}
              className={`px-4 py-4 cursor-pointer transition-all border-r border-[#CBD5E1] text-center ${
                activeCell === 'prev' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#FEF3C7]/40'
              }`}
            >
              <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                PREV
              </span>
              <span className="font-mono text-sm font-bold">
                {node.prevAddress || 'NULL'}
              </span>
              <span className="block text-[10px] text-[#0284C7] mt-1 font-sans">
                {prevNodeVal !== undefined && prevNodeVal !== null ? `← [${prevNodeVal}]` : '← NULL'}
              </span>
            </div>
          )}

          {/* DATA Cell */}
          <div
            onMouseEnter={() => setActiveCell('data')}
            onMouseLeave={() => setActiveCell(null)}
            onClick={() => setActiveCell(activeCell === 'data' ? null : 'data')}
            className={`px-6 py-4 cursor-pointer transition-all text-center min-w-[100px] ${
              activeCell === 'data' ? 'bg-[#ECFDF5] text-[#065F46]' : 'bg-white text-[#1E293B] hover:bg-[#ECFDF5]/40'
            }`}
          >
            <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
              DATA
            </span>
            <span className="font-mono text-3xl font-extrabold text-[#1E293B]">
              {node.value}
            </span>
            <span className="block text-[10px] text-[#059669] mt-1 font-sans font-medium">
              (Dữ liệu thực tế)
            </span>
          </div>

          {/* NEXT Cell */}
          <div
            onMouseEnter={() => setActiveCell('next')}
            onMouseLeave={() => setActiveCell(null)}
            onClick={() => setActiveCell(activeCell === 'next' ? null : 'next')}
            className={`px-4 py-4 cursor-pointer transition-all border-l border-[#CBD5E1] text-center ${
              activeCell === 'next' ? 'bg-[#EFF6FF] text-[#1E40AF]' : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#EFF6FF]/40'
            }`}
          >
            <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
              NEXT
            </span>
            <span className="font-mono text-sm font-bold text-[#2563EB]">
              {node.nextAddress || 'NULL'}
            </span>
            <span className="block text-[10px] text-[#2563EB] mt-1 font-sans">
              {nextNodeVal !== undefined && nextNodeVal !== null ? `→ [${nextNodeVal}]` : '→ NULL'}
            </span>
          </div>
        </div>

        {/* Dynamic Contextual Explanation Panel */}
        <div className="flex-1 bg-[#FAF9F5] p-4 rounded-xl border border-[#CBD5E1]">
          {activeCell === 'data' ? (
            <div className="animate-fadeIn">
              <span className="text-xs font-bold uppercase text-[#059669] block mb-1">
                📌 THÀNH PHẦN: DATA (Dữ liệu)
              </span>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                Đây là <strong>dữ liệu mà Node đang lưu trữ</strong> (ở đây là số nguyên <code>{node.value}</code>). Trong thực tế, DATA có thể là số, chuỗi, hoặc struct chứa thông tin sinh viên, sản phẩm...
              </p>
            </div>
          ) : activeCell === 'next' ? (
            <div className="animate-fadeIn">
              <span className="text-xs font-bold uppercase text-[#2563EB] block mb-1">
                🔗 THÀNH PHẦN: NEXT (Con trỏ tiếp theo)
              </span>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                Đây là <strong>con trỏ lưu địa chỉ ô nhớ</strong> giúp Node này biết Node nào đứng sau nó trong RAM.
                {node.nextAddress ? (
                  <> Nó đang trỏ tới địa chỉ <code>{node.nextAddress}</code>{nextNodeVal !== undefined && nextNodeVal !== null ? ` (Node chứa giá trị [${nextNodeVal}])` : ''}.</>
                ) : (
                  <> Vì đây là Node cuối danh sách, trường NEXT trỏ tới <strong>NULL</strong> (0x0) để làm mốc dừng.</>
                )}
              </p>
            </div>
          ) : activeCell === 'prev' ? (
            <div className="animate-fadeIn">
              <span className="text-xs font-bold uppercase text-[#D97706] block mb-1">
                ↔️ THÀNH PHẦN: PREV (Con trỏ đi lùi - Danh sách kép)
              </span>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                Đây là <strong>con trỏ lưu địa chỉ ô nhớ</strong> của Node đứng ngay trước nó trong danh sách kép. Cho phép quay ngược chiều mà không cần bắt đầu duyệt lại từ HEAD.
              </p>
            </div>
          ) : (
            <div>
              <span className="text-xs font-bold uppercase text-[#2D6A4F] block mb-1">
                💡 Rê chuột hoặc nhấp vào từng ô để xem giải thích:
              </span>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                • <strong>DATA:</strong> Chứa giá trị số <code>{node.value}</code>.<br />
                • <strong>NEXT:</strong> Giữ sợi dây liên kết tới phần tử kế tiếp ({node.nextAddress || 'NULL'}).<br />
                {listType === 'doubly' && <>• <strong>PREV:</strong> Giữ sợi dây liên kết ngược về phần tử trước ({node.prevAddress || 'NULL'}).</>}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
