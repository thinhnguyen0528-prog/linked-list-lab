import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF9F5] border-t border-[#E2DDD3] py-12 text-[#64748B] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-5 h-5 rounded-md bg-[#2D6A4F] text-[#F7F5EF] flex items-center justify-center font-mono font-bold text-[10px]">
              LL
            </span>
            <span className="font-bold text-[#1E293B] text-sm">Linked List Lab</span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-[#64748B]">Bài giảng tương tác Danh sách liên kết</span>
          </div>
          <p className="text-[#94A3B8]">
            Thiết kế giáo dục theo triết lý: Nhìn thấy dữ liệu → Thao tác trực tiếp → Thấu hiểu bản chất con trỏ trong RAM.
          </p>
        </div>

        <div className="flex items-center gap-6 font-medium text-[#475569]">
          <a href="#lab-section" className="hover:text-[#2D6A4F] transition-colors">
            Phòng thí nghiệm
          </a>
          <a href="#theory-section" className="hover:text-[#2D6A4F] transition-colors">
            Lý thuyết trực quan
          </a>
          <a href="#practice-section" className="hover:text-[#2D6A4F] transition-colors">
            Thực hành
          </a>
          <a href="#quiz-section" className="hover:text-[#2D6A4F] transition-colors">
            Trắc nghiệm
          </a>
        </div>
      </div>
    </footer>
  );
};
