import React from 'react';
import { ListNode, ListType } from '../types/linkedList';

interface NodeViewProps {
  node: ListNode;
  isHead?: boolean;
  isTail?: boolean;
  listType?: ListType;
  customPointers?: string[];
  isFloating?: boolean;
  onSelectNode?: () => void;
  isSelected?: boolean;
}

export const NodeView: React.FC<NodeViewProps> = ({
  node,
  isHead = false,
  isTail = false,
  listType = 'singly',
  customPointers = [],
  isFloating = false,
  onSelectNode,
  isSelected = false
}) => {
  // Determine border and background styles based on highlight status
  const getHighlightStyle = () => {
    if (isSelected) {
      return 'border-[#2D6A4F] bg-[#ECFDF5] ring-2 ring-[#2D6A4F] ring-offset-2';
    }
    switch (node.highlight) {
      case 'new':
        return 'border-[#059669] bg-[#ECFDF5] ring-2 ring-[#10B981]/50';
      case 'active':
        return 'border-[#2563EB] bg-[#EFF6FF] ring-2 ring-[#3B82F6]/50';
      case 'delete':
        return 'border-[#DC2626] bg-[#FEF2F2] opacity-80 line-through ring-2 ring-[#EF4444]/40';
      case 'target':
        return 'border-[#D97706] bg-[#FFFBEB] ring-2 ring-[#F59E0B]/50';
      default:
        return 'border-[#CBD5E1] bg-white hover:border-[#94A3B8]';
    }
  };

  const allPointers: string[] = [];
  if (isHead) allPointers.push('HEAD');
  if (isTail && listType !== 'circular') allPointers.push('TAIL');
  if (node.statusLabel) allPointers.push(node.statusLabel);
  customPointers.forEach(p => {
    if (!allPointers.includes(p)) allPointers.push(p);
  });

  return (
    <div
      onClick={onSelectNode}
      className={`group relative flex flex-col items-center select-none cursor-pointer transition-all duration-300 ${
        isFloating ? 'transform -translate-y-2' : ''
      }`}
    >
      {/* Pointers above node */}
      <div className="h-6 flex items-center justify-center gap-1.5 mb-1.5">
        {allPointers.map((label, idx) => (
          <span
            key={idx}
            className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-sm tracking-tight flex items-center gap-1 ${
              label.includes('HEAD')
                ? 'bg-[#2D6A4F] text-white'
                : label.includes('p') || label.includes('Mới')
                ? 'bg-[#059669] text-white'
                : label.includes('q') || label.includes('target')
                ? 'bg-[#D97706] text-white'
                : label.includes('temp') || label.includes('xóa')
                ? 'bg-[#DC2626] text-white'
                : 'bg-[#475569] text-white'
            }`}
          >
            <span>{label}</span>
            <span className="text-[9px]">↓</span>
          </span>
        ))}
      </div>

      {/* Main Node Box */}
      <div
        className={`flex items-stretch rounded-xl border-2 shadow-xs overflow-hidden transition-all duration-200 ${getHighlightStyle()}`}
      >
        {/* PREV pointer cell (Doubly linked list only) */}
        {listType === 'doubly' && (
          <div className="flex flex-col items-center justify-center px-2.5 py-2 bg-[#F8FAFC] border-r border-[#E2E8F0] min-w-[50px]">
            <span className="text-[9px] font-mono font-medium text-[#94A3B8] uppercase">
              PREV
            </span>
            <span className="text-xs font-mono font-semibold text-[#64748B]">
              {node.prevAddress || 'NULL'}
            </span>
          </div>
        )}

        {/* DATA cell */}
        <div className="flex flex-col items-center justify-center px-5 py-3 min-w-[64px]">
          <span className="text-[9px] font-mono font-medium text-[#94A3B8] uppercase tracking-wider">
            DATA
          </span>
          <span className="text-xl font-bold font-mono text-[#1E293B]">
            {node.value}
          </span>
        </div>

        {/* NEXT pointer cell */}
        <div className="flex flex-col items-center justify-center px-3 py-2 bg-[#F8FAFC] border-l border-[#E2E8F0] min-w-[54px]">
          <span className="text-[9px] font-mono font-medium text-[#94A3B8] uppercase">
            NEXT
          </span>
          <span
            className={`text-xs font-mono font-semibold ${
              node.nextAddress ? 'text-[#2563EB]' : 'text-[#94A3B8]'
            }`}
          >
            {node.nextAddress || 'NULL'}
          </span>
        </div>
      </div>

      {/* Physical RAM Address below node */}
      <div className="mt-1.5 flex items-center gap-1 font-mono text-[11px] text-[#64748B]">
        <span className="text-[#94A3B8]">RAM:</span>
        <span className="font-semibold text-[#475569]">{node.address}</span>
      </div>
    </div>
  );
};
