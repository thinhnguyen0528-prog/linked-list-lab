import React, { useState } from 'react';
import { CODE_SNIPPETS } from '../data/codeSnippets';
import { OperationType, ListType } from '../types/linkedList';

interface CodeViewerProps {
  operation: OperationType;
  listType: ListType;
  highlightLines?: number[];
  whyExplanation?: string;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  operation,
  listType,
  highlightLines = [],
  whyExplanation,
  isOpen,
  onToggleOpen
}) => {
  const [lang, setLang] = useState<'cpp' | 'c' | 'pseudo'>('cpp');
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [showWhyModal, setShowWhyModal] = useState<boolean>(false);

  // Look up snippet for operation and listType
  const snippetKey = `${operation}_${listType}`;
  const fallbackKey = `${operation}_singly`;
  const snippet = CODE_SNIPPETS[snippetKey] || CODE_SNIPPETS[fallbackKey] || CODE_SNIPPETS['insertHead_singly'];

  const lines = snippet[lang] || snippet['cpp'];

  return (
    <div className="bg-white rounded-2xl border border-[#CBD5E1] shadow-xs overflow-hidden transition-all">
      {/* Header bar with controls */}
      <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleOpen}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E293B] hover:text-[#2D6A4F] transition-colors"
          >
            <span className="text-sm">{isOpen ? '▼' : '▶'}</span>
            <span>Mã nguồn đối chiếu ({snippet.title})</span>
          </button>
          <span className="text-xs text-[#94A3B8]">·</span>
          <span className="text-xs text-[#64748B]">Đồng bộ theo từng bước thao tác</span>
        </div>

        <div className="flex items-center gap-2">
          {whyExplanation && (
            <button
              onClick={() => setShowWhyModal(true)}
              className="px-3 py-1 text-xs font-semibold rounded-md bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A] border border-[#FCD34D] transition-colors flex items-center gap-1 shadow-2xs"
            >
              <span>💡</span>
              <span>TẠI SAO?</span>
            </button>
          )}

          {isOpen && (
            <div className="flex items-center bg-[#E2E8F0] p-0.5 rounded-lg text-xs font-medium">
              <button
                onClick={() => setLang('cpp')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  lang === 'cpp' ? 'bg-white text-[#0F172A] shadow-xs font-semibold' : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                C++
              </button>
              <button
                onClick={() => setLang('c')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  lang === 'c' ? 'bg-white text-[#0F172A] shadow-xs font-semibold' : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                C
              </button>
              <button
                onClick={() => setLang('pseudo')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  lang === 'pseudo' ? 'bg-white text-[#0F172A] shadow-xs font-semibold' : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                Mã giả
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Code Body */}
      {isOpen && (
        <div className="p-4 sm:p-5 bg-[#0F172A] text-[#F8FAFC] font-mono text-sm overflow-x-auto">
          <div className="min-w-[450px]">
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlighted = highlightLines.includes(lineNum);
              const isSelected = selectedLine === lineNum;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedLine(isSelected ? null : lineNum)}
                  className={`group flex items-start gap-4 py-1.5 px-3 rounded-md cursor-pointer transition-colors ${
                    isHighlighted
                      ? 'bg-[#1E293B] border-l-4 border-[#10B981] text-[#E2E8F0]'
                      : 'hover:bg-[#1E293B]/50 text-[#94A3B8]'
                  } ${isSelected ? 'ring-1 ring-[#38BDF8]' : ''}`}
                >
                  <span className="w-6 text-right select-none text-xs text-[#64748B]">
                    {lineNum}
                  </span>
                  <div className="flex-1 whitespace-pre">
                    <span className={isHighlighted ? 'text-[#38BDF8] font-bold' : ''}>
                      {line}
                    </span>
                    {isHighlighted && (
                      <span className="ml-3 text-[11px] font-sans font-medium px-2 py-0.5 rounded-sm bg-[#065F46] text-[#A7F3D0]">
                        ← Đang thực hiện
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive line explanation tooltip if line is clicked */}
          {selectedLine && snippet.lineExplanations[selectedLine] && (
            <div className="mt-4 p-3 rounded-lg bg-[#1E293B] border border-[#334155] text-xs font-sans text-[#E2E8F0] flex items-start gap-2.5 animate-fadeIn">
              <span className="text-[#38BDF8] font-bold text-sm">ℹ️</span>
              <div>
                <span className="font-semibold text-white">Dòng {selectedLine}: </span>
                <span>{snippet.lineExplanations[selectedLine]}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* "TẠI SAO?" Modal Dialog */}
      {showWhyModal && whyExplanation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#CBD5E1]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="text-xl">💡</span>
                <h3 className="text-lg font-bold text-[#1E293B]">
                  Tại sao phải làm như vậy?
                </h3>
              </div>
              <button
                onClick={() => setShowWhyModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="text-sm text-[#334155] leading-relaxed mb-6 bg-[#FEF3C7]/40 p-4 rounded-xl border border-[#FDE68A]">
              <p className="font-medium text-[#92400E] mb-2">Bản chất của con trỏ trong bộ nhớ:</p>
              <p>{whyExplanation}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowWhyModal(false)}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#2D6A4F] text-white hover:bg-[#22543d] transition-colors"
              >
                Tôi đã hiểu rõ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
