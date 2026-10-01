import React, { useState, useEffect, useRef } from 'react';
import { ListNode, ListType, OperationType, AnimationStep } from '../types/linkedList';
import { createInitialNodes, generateSteps } from '../utils/linkedListEngine';
import { NodeView } from './NodeView';
import { NodeInspector } from './NodeInspector';
import { CodeViewer } from './CodeViewer';
import { playNodePop, playConnectChime, playStepClick } from '../utils/soundEffects';

interface LabSectionProps {
  initialType?: ListType;
}

export const LabSection: React.FC<LabSectionProps> = ({ initialType = 'singly' }) => {
  const [listType, setListType] = useState<ListType>(initialType);
  const [nodes, setNodes] = useState<ListNode[]>(() => createInitialNodes([10, 20, 30], initialType));
  const [inputValue, setInputValue] = useState<number>(50);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [showInspector, setShowInspector] = useState<boolean>(true);

  // Explanation style: academic vs intuitive
  const [explanationMode, setExplanationMode] = useState<'academic' | 'intuitive'>('intuitive');

  // Animation playback state
  const [steps, setSteps] = useState<AnimationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1); // 1 = 1800ms
  const [currentOp, setCurrentOp] = useState<OperationType>('insertHead');
  const [isCodeOpen, setIsCodeOpen] = useState<boolean>(true);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  // Doubly & Circular specific simulation states
  const [circularCycleCount, setCircularCycleCount] = useState<number>(0);
  const [isReverseTraversing, setIsReverseTraversing] = useState<boolean>(false);

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // When initialType changes from outside
  useEffect(() => {
    if (initialType !== listType) {
      handleTypeChange(initialType);
    }
  }, [initialType]);

  // When list type changes, reset nodes
  const handleTypeChange = (newType: ListType) => {
    setListType(newType);
    const newNodes = createInitialNodes([10, 20, 30], newType);
    setNodes(newNodes);
    setSteps([]);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setSelectedNodeIndex(0);
    setCircularCycleCount(0);
    setIsReverseTraversing(false);
  };

  // Trigger an operation and generate step sequence
  const startOperation = (op: OperationType) => {
    setCurrentOp(op);
    const generatedSteps = generateSteps(nodes, op, inputValue, selectedNodeIndex, listType);
    if (generatedSteps.length === 0) {
      setActiveNotification('Danh sách đang rỗng, không thể thực hiện thao tác xóa!');
      setTimeout(() => setActiveNotification(null), 3000);
      return;
    }

    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(true);
    playNodePop();
  };

  // Playback timer effect
  useEffect(() => {
    if (!isPlaying || steps.length === 0) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    const intervalTime = Math.round(2000 / playSpeed);
    autoPlayTimerRef.current = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < steps.length - 1) {
          playStepClick();
          if (prev + 1 === 2) playConnectChime();
          return prev + 1;
        } else {
          // Reached end of animation
          setIsPlaying(false);
          // Apply final list state to active nodes
          const finalState = steps[steps.length - 1].listState;
          if (finalState.nodes) {
            setNodes(finalState.nodes.map(n => ({ ...n, highlight: 'default', statusLabel: undefined })));
          }
          return prev;
        }
      });
    }, intervalTime);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, steps, playSpeed]);

  // Reset to initial [10] -> [20] -> [30] -> NULL
  const handleReset = () => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    setIsPlaying(false);
    setSteps([]);
    setCurrentStepIndex(0);
    const freshNodes = createInitialNodes([10, 20, 30], listType);
    setNodes(freshNodes);
    setSelectedNodeIndex(0);
    setCircularCycleCount(0);
    setIsReverseTraversing(false);
    setActiveNotification('Đã đặt lại danh sách về trạng thái mặc định: [10] → [20] → [30]');
    setTimeout(() => setActiveNotification(null), 2500);
  };

  // Step manually / Time Machine scrubber
  const goToStep = (index: number) => {
    setIsPlaying(false);
    if (index >= 0 && index < steps.length) {
      playStepClick();
      setCurrentStepIndex(index);
    }
  };

  // Reverse traversal demo for Doubly List
  const handleReverseTraverse = () => {
    setIsReverseTraversing(true);
    let cur = nodes.length - 1;
    const timer = setInterval(() => {
      if (cur >= 0) {
        setSelectedNodeIndex(cur);
        playStepClick();
        cur--;
      } else {
        clearInterval(timer);
        setIsReverseTraversing(false);
        setActiveNotification('Đã hoàn tất duyệt ngược từ Node đuôi về HEAD!');
        setTimeout(() => setActiveNotification(null), 2500);
      }
    }, 800);
  };

  // Circular loop simulator
  const handleSimulateCycle = () => {
    let count = 0;
    let idx = 0;
    const maxSteps = nodes.length * 2;
    const timer = setInterval(() => {
      if (count < maxSteps) {
        setSelectedNodeIndex(idx);
        playStepClick();
        idx = (idx + 1) % nodes.length;
        if (idx === 0) setCircularCycleCount(c => c + 1);
        count++;
      } else {
        clearInterval(timer);
        setActiveNotification('⚠️ Lưu ý: Bạn vừa quan sát 2 vòng lặp liên tục quay về HEAD!');
        setTimeout(() => setActiveNotification(null), 3500);
      }
    }, 700);
  };

  // Get current active state for rendering
  const activeStep = steps.length > 0 ? steps[currentStepIndex] : null;
  const displayNodes = activeStep ? activeStep.listState.nodes : nodes;
  const floatingNode = activeStep ? activeStep.listState.floatingNode : null;
  const activePointers = activeStep ? activeStep.listState.activePointers : [];

  // Currently inspected node
  const inspectedNode = displayNodes[selectedNodeIndex] || displayNodes[0] || null;
  const inspectedNextVal = displayNodes[selectedNodeIndex + 1]?.value ?? (listType === 'circular' ? displayNodes[0]?.value : null);
  const inspectedPrevVal = displayNodes[selectedNodeIndex - 1]?.value ?? null;

  return (
    <section id="lab-section" className="py-12 md:py-16 bg-[#F7F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2D6A4F]">
              PHÒNG THÍ NGHIỆM TRỰC QUAN V2
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B] mt-1">
              THAO TÁC CON TRỎ THỜI GIAN THỰC
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-1 max-w-2xl">
              Thao tác trực tiếp với các khối Node và quan sát liên kết con trỏ biến đổi từng nhịp trong bộ nhớ RAM.
            </p>
          </div>

          {/* List Type Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white border border-[#CBD5E1] rounded-2xl shadow-2xs self-start md:self-auto">
            <button
              onClick={() => handleTypeChange('singly')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                listType === 'singly' ? 'bg-[#2D6A4F] text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              🧩 Liên kết đơn
            </button>
            <button
              onClick={() => handleTypeChange('doubly')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                listType === 'doubly' ? 'bg-[#2D6A4F] text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              ↔️ Liên kết kép
            </button>
            <button
              onClick={() => handleTypeChange('circular')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                listType === 'circular' ? 'bg-[#2D6A4F] text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              🔄 Liên kết vòng
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {activeNotification && (
          <div className="mb-4 p-3.5 bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl text-xs font-semibold text-[#065F46] flex items-center justify-between shadow-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              <span>🔔</span>
              <span>{activeNotification}</span>
            </div>
            <button onClick={() => setActiveNotification(null)} className="text-[#047857] hover:underline font-bold">✕</button>
          </div>
        )}

        {/* Main Lab Canvas Card */}
        <div className="bg-white rounded-3xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs mb-6">
          
          {/* Circular Notice Bar */}
          {listType === 'circular' && (
            <div className="mb-5 p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-base">⚠️</span>
                <span>
                  <strong>Đặc điểm danh sách vòng:</strong> Node cuối cùng trỏ quay lại HEAD. Nếu duyệt bằng <code>while(p != NULL)</code> sẽ chạy vô hạn!
                </span>
              </div>
              <button
                onClick={handleSimulateCycle}
                className="px-3 py-1 bg-[#D97706] text-white rounded-lg text-xs font-bold hover:bg-[#B45309] transition-colors"
              >
                Chạy thử 2 vòng chu trình 🔄
              </button>
            </div>
          )}

          {/* Doubly Special Action Bar */}
          {listType === 'doubly' && (
            <div className="mb-5 p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-xs text-[#1E40AF] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-base">↔️</span>
                <span>
                  <strong>Đặc điểm danh sách kép:</strong> Mỗi Node có cả PREV và NEXT. Cho phép duyệt ngược từ đuôi về đầu!
                </span>
              </div>
              <button
                onClick={handleReverseTraverse}
                disabled={isReverseTraversing || displayNodes.length === 0}
                className="px-3 py-1 bg-[#2563EB] text-white rounded-lg text-xs font-bold hover:bg-[#1D4ED8] disabled:opacity-40 transition-colors"
              >
                {isReverseTraversing ? 'Đang duyệt lùi...' : 'Duyệt ngược từ đuôi về HEAD ◀'}
              </button>
            </div>
          )}

          {/* Interactive Visual Canvas Area */}
          <div className="relative overflow-x-auto min-h-[220px] py-8 flex flex-col items-center justify-center border border-dashed border-[#CBD5E1] rounded-2xl bg-[#FAF9F5]">
            
            {/* Empty list indicator */}
            {displayNodes.length === 0 && !floatingNode && (
              <div className="text-center py-12">
                <span className="font-mono text-2xl font-bold text-[#94A3B8] block mb-2">
                  HEAD ──▶ NULL
                </span>
                <p className="text-xs text-[#64748B]">Danh sách hiện tại đang rỗng. Bấm &ldquo;+ Thêm đầu&rdquo; hoặc &ldquo;+ Thêm cuối&rdquo; để bắt đầu!</p>
              </div>
            )}

            {/* Visual Node Diagram */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 px-6 py-4">
              
              {/* Floating Node (appears during creation) */}
              {floatingNode && (
                <div className="flex items-center">
                  <NodeView
                    node={floatingNode}
                    listType={listType}
                    isFloating={true}
                    customPointers={['p (Mới)']}
                  />

                  {/* Temporary Pointer Arrow to Head */}
                  <div className="flex items-center px-1.5">
                    {floatingNode.nextAddress ? (
                      <div className="flex items-center text-[#059669] animate-pulse">
                        <span className="w-8 sm:w-12 h-0.5 bg-[#059669]" />
                        <span className="-ml-1 font-bold text-sm">▶</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-[#CBD5E1]">
                        <span className="w-6 sm:w-10 h-0.5 border-t border-dashed border-[#CBD5E1]" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Display existing nodes */}
              {displayNodes.map((node, idx) => {
                const isHead = idx === 0 && !floatingNode;
                const isTail = idx === displayNodes.length - 1;
                const isSelected = idx === selectedNodeIndex;
                const isAdjacent = Math.abs(idx - selectedNodeIndex) === 1;

                // Match active pointers for this node
                const nodePointers = activePointers
                  ? activePointers.filter(p => p.targetId === node.id).map(p => p.name)
                  : [];

                return (
                  <React.Fragment key={node.id}>
                    <div className={`transition-opacity duration-300 ${!isSelected && !isAdjacent && displayNodes.length > 3 ? 'opacity-85' : 'opacity-100'}`}>
                      <NodeView
                        node={node}
                        isHead={isHead}
                        isTail={isTail}
                        listType={listType}
                        customPointers={nodePointers}
                        isSelected={isSelected}
                        onSelectNode={() => {
                          setSelectedNodeIndex(idx);
                          setShowInspector(true);
                          playStepClick();
                        }}
                      />
                    </div>

                    {/* Connecting Arrows between nodes */}
                    {!isTail && (
                      <div className="flex flex-col items-center px-1 text-[#94A3B8]">
                        {/* Forward Arrow (NEXT) */}
                        <div className={`flex items-center transition-colors ${isSelected || isAdjacent ? 'text-[#2563EB] font-bold' : 'text-[#94A3B8]'}`}>
                          <span className={`h-0.5 transition-all ${isSelected ? 'w-8 sm:w-12 bg-[#2563EB] h-1' : 'w-6 sm:w-10 bg-[#2563EB]'}`} />
                          <span className="-ml-1 font-bold text-sm">▶</span>
                        </div>

                        {/* Backward Arrow (PREV for Doubly list) */}
                        {listType === 'doubly' && (
                          <div className={`flex items-center transition-colors -mt-1 ${isSelected || isAdjacent ? 'text-[#D97706] font-bold' : 'text-[#D97706]'}`}>
                            <span className="-mr-1 font-bold text-sm">◀</span>
                            <span className={`h-0.5 transition-all ${isSelected ? 'w-8 sm:w-12 bg-[#D97706] h-1' : 'w-6 sm:w-10 bg-[#D97706]'}`} />
                          </div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* End of List indicator */}
              {displayNodes.length > 0 && listType !== 'circular' && (
                <>
                  <div className="flex items-center text-[#94A3B8]">
                    <span className="w-6 sm:w-8 h-0.5 bg-[#94A3B8]" />
                    <span className="-ml-1 font-bold text-sm">▶</span>
                  </div>
                  <div className="flex flex-col items-center justify-center px-3.5 py-3 rounded-2xl bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-mono font-bold text-[#64748B] shadow-2xs">
                    NULL (0x0)
                  </div>
                </>
              )}

              {/* Circular link back to Head */}
              {displayNodes.length > 0 && listType === 'circular' && (
                <div className="flex items-center text-[#2D6A4F] ml-3 font-mono text-xs">
                  <div className="flex items-center gap-1 bg-[#ECFDF5] border-2 border-[#A7F3D0] px-3 py-1.5 rounded-xl shadow-2xs">
                    <span className="text-base animate-spin">🔄</span>
                    <span className="text-[#065F46] font-bold text-xs">
                      Quay về HEAD (@{displayNodes[0]?.address})
                    </span>
                  </div>
                </div>
              )}
            </div>

            <p className="mt-4 text-xs text-[#64748B]">
              💡 <em>Tương tác:</em> Nhấp vào bất kỳ Node nào để mở kính hiển vi soi chi tiết DATA và con trỏ. (Đang chọn Node vị trí {selectedNodeIndex + 1}: <strong>[{displayNodes[selectedNodeIndex]?.value ?? 'rỗng'}]</strong>)
            </p>
          </div>

          {/* Time Machine & Step-by-Step Playback Controller */}
          {steps.length > 0 && activeStep && (
            <div className="mt-6 p-5 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] shadow-2xs">
              
              {/* Timeline Scrubber */}
              <div className="mb-4 pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center justify-between text-xs font-bold text-[#475569] mb-2">
                  <span className="flex items-center gap-1.5 text-[#2D6A4F]">
                    <span>⏱️</span>
                    <span>TIME MACHINE: Kéo mốc thời gian để xem lại biến đổi con trỏ</span>
                  </span>
                  <span className="font-mono">
                    Bước {currentStepIndex + 1} / {steps.length}
                  </span>
                </div>

                {/* Scrubber slider */}
                <input
                  type="range"
                  min={0}
                  max={steps.length - 1}
                  value={currentStepIndex}
                  onChange={e => goToStep(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2D6A4F]"
                />

                {/* Step checkpoints */}
                <div className="flex justify-between text-[11px] font-mono text-[#64748B] mt-1 px-1">
                  {steps.map((st, i) => (
                    <span
                      key={i}
                      onClick={() => goToStep(i)}
                      className={`cursor-pointer hover:text-[#2D6A4F] ${
                        i === currentStepIndex ? 'text-[#2D6A4F] font-bold underline' : ''
                      }`}
                    >
                      B{i + 1}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step info row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 mb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg bg-[#2D6A4F] text-white">
                    STEP {activeStep.stepNumber}/{activeStep.totalSteps}
                  </span>
                  <h4 className="text-sm font-bold text-[#1E293B]">
                    {activeStep.title}
                  </h4>
                </div>

                {/* Step Playback Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToStep(currentStepIndex - 1)}
                    disabled={currentStepIndex === 0}
                    className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors text-xs font-semibold"
                  >
                    ← Bước trước
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#2D6A4F] text-white text-xs font-bold hover:bg-[#22543d] transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>{isPlaying ? '⏸ Tạm dừng' : '▶ Tự động'}</span>
                  </button>

                  <button
                    onClick={() => goToStep(currentStepIndex + 1)}
                    disabled={currentStepIndex === steps.length - 1}
                    className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors text-xs font-semibold"
                  >
                    Bước tiếp theo →
                  </button>

                  <span className="text-xs text-[#94A3B8] ml-2">Tốc độ:</span>
                  <button
                    onClick={() => setPlaySpeed(playSpeed === 1 ? 1.5 : playSpeed === 1.5 ? 0.75 : 1)}
                    className="px-2 py-1 text-xs font-mono rounded-md border border-[#CBD5E1] text-[#475569] hover:bg-white font-bold"
                  >
                    {playSpeed}x
                  </button>
                </div>
              </div>

              {/* Step Description & Explanation switcher */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1E293B]">
                    {explanationMode === 'academic' ? '📘 Giải thích học thuật:' : '🗣 Giải thích dễ hiểu:'}
                  </span>
                  <div className="flex items-center gap-1 bg-[#E2E8F0] p-0.5 rounded-lg text-[11px] font-semibold">
                    <button
                      onClick={() => setExplanationMode('intuitive')}
                      className={`px-2 py-0.5 rounded-md transition-colors ${
                        explanationMode === 'intuitive' ? 'bg-white text-[#1E293B] shadow-2xs' : 'text-[#64748B]'
                      }`}
                    >
                      🗣 Dễ hiểu
                    </button>
                    <button
                      onClick={() => setExplanationMode('academic')}
                      className={`px-2 py-0.5 rounded-md transition-colors ${
                        explanationMode === 'academic' ? 'bg-white text-[#1E293B] shadow-2xs' : 'text-[#64748B]'
                      }`}
                    >
                      📘 Học thuật
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                  {explanationMode === 'academic'
                    ? activeStep.description
                    : `💡 ${activeStep.whyExplanation}`}
                </p>
              </div>
            </div>
          )}

          {/* Interactive Controls Bar */}
          <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Input for Node value */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wide">
                  Giá trị Node:
                </label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={e => setInputValue(parseInt(e.target.value, 10) || 0)}
                  className="w-20 px-3 py-2 text-sm font-mono font-bold rounded-xl border border-[#CBD5E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => startOperation('insertHead')}
                  className="px-4 py-2.5 text-xs font-bold rounded-xl bg-[#2D6A4F] text-white hover:bg-[#22543d] transition-all shadow-xs hover:scale-102"
                >
                  + Thêm đầu
                </button>
                <button
                  onClick={() => startOperation('insertTail')}
                  className="px-4 py-2.5 text-xs font-bold rounded-xl bg-[#2D6A4F] text-white hover:bg-[#22543d] transition-all shadow-xs hover:scale-102"
                >
                  + Thêm cuối
                </button>
                <button
                  onClick={() => startOperation('insertAfter')}
                  disabled={displayNodes.length === 0}
                  className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-white border border-[#CBD5E1] text-[#1E293B] hover:bg-[#F1EFE7] disabled:opacity-40 transition-colors shadow-2xs"
                >
                  + Chèn sau Node ({displayNodes[selectedNodeIndex]?.value ?? 'chọn'})
                </button>

                <div className="h-5 w-px bg-[#CBD5E1] mx-1 hidden sm:block" />

                <button
                  onClick={() => startOperation('deleteHead')}
                  disabled={displayNodes.length === 0}
                  className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] hover:bg-[#FEE2E2] disabled:opacity-40 transition-colors"
                >
                  🗑 Xóa đầu
                </button>
                <button
                  onClick={() => startOperation('deleteTail')}
                  disabled={displayNodes.length === 0}
                  className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] hover:bg-[#FEE2E2] disabled:opacity-40 transition-colors"
                >
                  🗑 Xóa cuối
                </button>
                <button
                  onClick={() => startOperation('deleteNode')}
                  disabled={displayNodes.length <= 1}
                  className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] hover:bg-[#FEE2E2] disabled:opacity-40 transition-colors"
                >
                  🗑 Xóa Node ({displayNodes[selectedNodeIndex]?.value ?? 'chọn'})
                </button>

                <div className="h-5 w-px bg-[#CBD5E1] mx-1 hidden sm:block" />

                <button
                  onClick={() => startOperation('traverse')}
                  disabled={displayNodes.length === 0}
                  className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] hover:bg-[#DBEAFE] disabled:opacity-40 transition-colors"
                >
                  🔍 Duyệt danh sách
                </button>

                <button
                  onClick={handleReset}
                  className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] transition-colors ml-auto"
                >
                  ↻ Đặt lại
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Node Inspector Panel (Section 4) */}
        {showInspector && inspectedNode && (
          <div className="mb-6">
            <NodeInspector
              node={inspectedNode}
              listType={listType}
              nextNodeVal={inspectedNextVal}
              prevNodeVal={inspectedPrevVal}
              onClose={() => setShowInspector(false)}
            />
          </div>
        )}

        {/* Code Viewer Synchronized with Active Step */}
        <CodeViewer
          operation={currentOp}
          listType={listType}
          highlightLines={activeStep?.codeHighlightLines?.cpp || []}
          whyExplanation={activeStep?.whyExplanation}
          isOpen={isCodeOpen}
          onToggleOpen={() => setIsCodeOpen(!isCodeOpen)}
        />
      </div>
    </section>
  );
};
