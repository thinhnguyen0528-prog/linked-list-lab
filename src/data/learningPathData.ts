import { LearningModule, GuidedTourStep } from '../types/linkedList';

export const INITIAL_LEARNING_MODULES: LearningModule[] = [
  { id: 'mod-node', num: '01', title: 'Node là gì', icon: '🧩', status: 'completed', targetSection: 'theory-section' },
  { id: 'mod-link', num: '02', title: 'Con trỏ Next & Liên kết', icon: '🔗', status: 'in_progress', targetSection: 'theory-section' },
  { id: 'mod-head', num: '03', title: 'Head & NULL', icon: '🎯', status: 'not_started', targetSection: 'theory-section' },
  { id: 'mod-insert', num: '04', title: 'Thao tác Thêm', icon: '➕', status: 'not_started', targetSection: 'lab-section' },
  { id: 'mod-delete', num: '05', title: 'Thao tác Xóa', icon: '🗑', status: 'not_started', targetSection: 'lab-section' },
  { id: 'mod-traverse', num: '06', title: 'Duyệt danh sách', icon: '👀', status: 'not_started', targetSection: 'lab-section' },
  { id: 'mod-doubly', num: '07', title: 'Danh sách kép', icon: '↔️', status: 'not_started', targetSection: 'lab-section' },
  { id: 'mod-circular', num: '08', title: 'Danh sách vòng', icon: '🔄', status: 'not_started', targetSection: 'lab-section' },
  { id: 'mod-practice', num: '09', title: 'Tự mình thực hành', icon: '🧪', status: 'not_started', targetSection: 'practice-section' }
];

export const GUIDED_TOUR_STEPS: GuidedTourStep[] = [
  {
    stepIndex: 1,
    title: 'Bài 1: Khám phá bí mật của một Node',
    concept: 'Node là một chiếc hộp 2 ngăn trong RAM',
    explanation: 'Một Node không phải là một số đơn thuần. Nó là một vùng nhớ gồm 2 phần: ngăn DATA chứa giá trị thực tế (ví dụ: 10) và ngăn NEXT chứa địa chỉ dẫn tới người đứng sau.',
    humanAnalogy: 'Tưởng tượng Node như một học sinh trong lớp: túi áo đựng thẻ học sinh (DATA), tay phải nắm lấy vạt áo bạn kế bên (NEXT).',
    sampleDiagram: `┌─────────────┐
│  DATA: 10   │ ── Dữ liệu thực tế bạn muốn lưu
├─────────────┤
│ NEXT: 0x4B2 │ ── Địa chỉ RAM của Node tiếp theo
└─────────────┘`,
    codeSnippet: `struct Node {\n    int data;\n    Node* next;\n};`
  },
  {
    stepIndex: 2,
    title: 'Bài 2: Con trỏ HEAD - Đầu mối duy nhất',
    concept: 'HEAD nắm giữ chìa khóa của toàn bộ danh sách',
    explanation: 'Vì các Node nằm phân tán khắp RAM, chương trình chỉ cần giữ duy nhất một biến con trỏ HEAD trỏ vào Node đầu tiên. Từ HEAD, ta lần theo từng con trỏ NEXT để tìm thấy tất cả các phần tử còn lại.',
    humanAnalogy: 'HEAD giống như đầu cuộn dây chỉ. Nắm được đầu dây, bạn sẽ kéo được cả cuộn chỉ. Nếu tuột mất đầu dây, bạn mất trắng cuộn chỉ!',
    sampleDiagram: `HEAD
  │
  ▼
[ 10 | 0x2A ] ───▶ [ 20 | 0x3C ] ───▶ [ 30 | NULL ]`,
    codeSnippet: `Node* head = CreateNode(10);`
  },
  {
    stepIndex: 3,
    title: 'Bài 3: Giá trị NULL - Điểm dừng an toàn',
    concept: 'Node cuối cùng luôn trỏ tới NULL',
    explanation: 'Làm sao máy tính biết danh sách đã kết thúc? Đó là nhờ trường next của Node cuối cùng luôn được gán bằng NULL (địa chỉ 0x0). Khi con trỏ duyệt chạm tới NULL, vòng lặp dừng lại an toàn.',
    humanAnalogy: 'NULL giống như biển báo "Đoạn đường cụt - Hết đường" ở cuối ngõ.',
    sampleDiagram: `[ 30 | NULL ] ───▶ [ DỪNG LẠI TẠI ĐÂY ]`,
    codeSnippet: `while (p != NULL) {\n    p = p->next;\n}`
  },
  {
    stepIndex: 4,
    title: 'Bài 4: Thao tác Thêm - Nối trước, đổi HEAD sau',
    concept: 'Quy tắc sinh tử: p->next = head TRƯỚC head = p',
    explanation: 'Khi tạo Node mới p và muốn chèn vào đầu: Bạn bắt buộc phải gán p->next = head trước để p nối với danh sách cũ. Nếu bạn gán head = p trước, bạn sẽ mất vĩnh viễn địa chỉ của Node đầu cũ!',
    humanAnalogy: 'Người mới muốn chen vào đầu hàng phải nắm áo người số 1 cũ trước rồi mới tự nhận là số 1.',
    sampleDiagram: `Bước 1: p->next = head  [5] ──────▶ [10] -> [20]
Bước 2: head = p         HEAD ──▶ [5]`,
    codeSnippet: `Node* p = new Node(5);\np->next = head; // Bắt buộc trước!\nhead = p;       // Cập nhật sau`
  },
  {
    stepIndex: 5,
    title: 'Bài 5: Thao tác Xóa - Bắc cầu vượt Node',
    concept: 'Bỏ qua liên kết và giải phóng ô nhớ (free)',
    explanation: 'Để xóa Node [20] đứng giữa [10] và [30]: Node 10 đổi con trỏ next trỏ thẳng sang Node 30 (q->next = p->next). Sau khi đã bắc cầu an toàn, ta gọi free(p) để dọn dẹp RAM.',
    humanAnalogy: 'Muốn dỡ bỏ cây cầu gỗ ở giữa, phải xây cây cầu bê tông vòng qua trước rồi mới dỡ cây cầu cũ.',
    sampleDiagram: `[ 10 ] ───────────────────▶ [ 30 ]  (bắc cầu q->next = p->next)
   │                           ▲
   └── [ 20 ] (xóa bằng free(p))` ,
    codeSnippet: `q->next = p->next;\nfree(p);`
  },
  {
    stepIndex: 6,
    title: 'Bài 6: Duyệt danh sách - Từng bước một',
    concept: 'Lần theo từng bước: p = p->next',
    explanation: 'Không có cách nào nhảy cóc tới Node thứ 5 ngay lập tức như mảng arr[4]. Bạn bắt buộc phải xuất phát từ HEAD, rồi lặp p = p->next từng bước cho đến khi chạm đích.',
    humanAnalogy: 'Bước từng nhịp trên cây cầu khỉ: đứng ở nhịp hiện tại, nhìn thấy nhịp tiếp theo và bước sang.',
    sampleDiagram: `p = head ──▶ [10]
p = p->next ──▶ [20]
p = p->next ──▶ [30]
p = p->next ──▶ NULL (Xong!)`,
    codeSnippet: `for (Node* p = head; p != NULL; p = p->next) {\n    printf("%d ", p->data);\n}`
  }
];
