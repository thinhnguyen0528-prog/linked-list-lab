import React from 'react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenGuidedTour: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onOpenGuidedTour }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#F7F5EF]/90 backdrop-blur-md border-b border-[#E2DDD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => onSelectTab('hero')}
          className="text-left group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A4F] rounded-lg"
        >
          <span className="w-8 h-8 rounded-lg bg-[#2D6A4F] text-[#F7F5EF] flex items-center justify-center font-mono font-bold text-sm shadow-xs">
            LL
          </span>
          <span className="text-xl font-bold tracking-tight text-[#1E293B]">
            Linked List Lab
          </span>
        </button>

        {/* Zone 2: Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#475569]">
          <button
            onClick={() => onSelectTab('hero')}
            className={`transition-colors hover:text-[#1E293B] focus:outline-none ${
              activeTab === 'hero' ? 'text-[#2D6A4F] font-semibold border-b-2 border-[#2D6A4F] py-5' : ''
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => onSelectTab('theory')}
            className={`transition-colors hover:text-[#1E293B] focus:outline-none ${
              activeTab === 'theory' ? 'text-[#2D6A4F] font-semibold border-b-2 border-[#2D6A4F] py-5' : ''
            }`}
          >
            Lý thuyết trực quan
          </button>
          <button
            onClick={() => onSelectTab('lab')}
            className={`transition-colors hover:text-[#1E293B] focus:outline-none ${
              activeTab === 'lab' ? 'text-[#2D6A4F] font-semibold border-b-2 border-[#2D6A4F] py-5' : ''
            }`}
          >
            Phòng thí nghiệm
          </button>
          <button
            onClick={() => onSelectTab('practice')}
            className={`transition-colors hover:text-[#1E293B] focus:outline-none ${
              activeTab === 'practice' ? 'text-[#2D6A4F] font-semibold border-b-2 border-[#2D6A4F] py-5' : ''
            }`}
          >
            Tự thực hành
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`transition-colors hover:text-[#1E293B] focus:outline-none ${
              activeTab === 'quiz' ? 'text-[#2D6A4F] font-semibold border-b-2 border-[#2D6A4F] py-5' : ''
            }`}
          >
            Trắc nghiệm hình ảnh
          </button>
          <button
            onClick={() => onSelectTab('compare')}
            className={`transition-colors hover:text-[#1E293B] focus:outline-none ${
              activeTab === 'compare' ? 'text-[#2D6A4F] font-semibold border-b-2 border-[#2D6A4F] py-5' : ''
            }`}
          >
            Bảng so sánh
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenGuidedTour}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#2D6A4F] bg-white border border-[#CBD5E1] rounded-lg hover:bg-[#F1F5F9] transition-colors shadow-2xs whitespace-nowrap"
          >
            <span>👨‍🏫</span>
            <span>Hướng dẫn</span>
          </button>
          <button
            onClick={() => onSelectTab('lab')}
            className="px-4 py-2 text-sm font-medium text-white bg-[#2D6A4F] hover:bg-[#22543d] rounded-lg transition-colors shadow-xs whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2D6A4F]"
          >
            Vào phòng thí nghiệm
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-[#E2DDD3] bg-[#F7F5EF] px-2 py-2 overflow-x-auto text-xs font-medium text-[#475569]">
        <button
          onClick={() => onSelectTab('theory')}
          className={`px-3 py-1.5 whitespace-nowrap ${activeTab === 'theory' ? 'text-[#2D6A4F] font-semibold' : ''}`}
        >
          Lý thuyết
        </button>
        <button
          onClick={() => onSelectTab('lab')}
          className={`px-3 py-1.5 whitespace-nowrap ${activeTab === 'lab' ? 'text-[#2D6A4F] font-semibold' : ''}`}
        >
          Thí nghiệm
        </button>
        <button
          onClick={() => onSelectTab('practice')}
          className={`px-3 py-1.5 whitespace-nowrap ${activeTab === 'practice' ? 'text-[#2D6A4F] font-semibold' : ''}`}
        >
          Thực hành
        </button>
        <button
          onClick={() => onSelectTab('quiz')}
          className={`px-3 py-1.5 whitespace-nowrap ${activeTab === 'quiz' ? 'text-[#2D6A4F] font-semibold' : ''}`}
        >
          Trắc nghiệm
        </button>
        <button
          onClick={() => onSelectTab('compare')}
          className={`px-3 py-1.5 whitespace-nowrap ${activeTab === 'compare' ? 'text-[#2D6A4F] font-semibold' : ''}`}
        >
          So sánh
        </button>
      </div>
    </header>
  );
};
