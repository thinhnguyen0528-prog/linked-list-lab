import { QuizQuestion } from '../types/linkedList';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: 'Câu hỏi 1: Thao tác thêm vào đầu danh sách',
    scenarioDiagram: `HEAD
  │
  ▼
[ 10 ] ───> [ 20 ] ───> [ 30 ] ───> NULL
Node mới tạo: p = [ 5 ]`,
    question: 'Để chèn Node [5] vào đầu danh sách trên, thứ tự câu lệnh nào là CHÍNH XÁC?',
    options: [
      { id: 'A', text: 'head = p; p->next = head;', isCorrect: false },
      { id: 'B', text: 'p->next = head; head = p;', isCorrect: true },
      { id: 'C', text: 'p->next = NULL; head = p;', isCorrect: false },
      { id: 'D', text: 'head->next = p; head = p;', isCorrect: false }
    ],
    explanation: 'Đáp án B đúng: Phải thực hiện `p->next = head` để Node 5 liên kết với Node 10 trước, sau đó mới dời `head = p`. Nếu làm theo đáp án A (`head = p` trước), thì lệnh kế tiếp `p->next = head` sẽ khiến p tự trỏ vào chính nó, làm mất sạch các Node 10, 20, 30!',
    hint: 'Nếu cập nhật HEAD trước, bạn sẽ mất con trỏ tới danh sách cũ.'
  },
  {
    id: 2,
    title: 'Câu hỏi 2: Cấu trúc bộ nhớ của Node',
    scenarioDiagram: `┌───────────────┐
│     NODE      │
├───────┬───────┤
│ DATA  │ NEXT  │
│  42   │ 0x8F2 │ ───> Ô nhớ 0x8F2
└───────┴───────┘`,
    question: 'Trong cấu trúc Node của danh sách liên kết đơn, trường NEXT lưu trữ giá trị gì?',
    options: [
      { id: 'A', text: 'Giá trị dữ liệu số của Node tiếp theo', isCorrect: false },
      { id: 'B', text: 'Chỉ số index (vị trí 0, 1, 2...) trong mảng', isCorrect: false },
      { id: 'C', text: 'Địa chỉ ô nhớ (memory address) của Node tiếp theo', isCorrect: true },
      { id: 'D', text: 'Kích thước tính bằng byte của Node tiếp theo', isCorrect: false }
    ],
    explanation: 'Đáp án C đúng: NEXT là một biến con trỏ (pointer), chứa địa chỉ ô nhớ trong RAM của Node kế tiếp. Các Node không nằm liền kề nên con trỏ chính là sợi dây liên lạc duy nhất.',
    hint: 'Con trỏ trong C/C++ dùng để lưu cái gì trong RAM?'
  },
  {
    id: 3,
    title: 'Câu hỏi 3: Giá trị đặc biệt NULL ở đuôi danh sách',
    scenarioDiagram: `HEAD ──> [ 10 ] ──> [ 20 ] ──> [ 30 | ? ]`,
    question: 'Trường NEXT của phần tử cuối cùng trong một Danh sách liên kết đơn kết thúc bằng giá trị nào?',
    options: [
      { id: 'A', text: '0 (hoặc NULL / nullptr)', isCorrect: true },
      { id: 'B', text: 'Trỏ ngược về con trỏ HEAD', isCorrect: false },
      { id: 'C', text: 'Một địa chỉ ngẫu nhiên rác trong RAM', isCorrect: false },
      { id: 'D', text: 'Địa chỉ của chính Node đó', isCorrect: false }
    ],
    explanation: 'Đáp án A đúng: Node cuối cùng trong danh sách liên kết đơn luôn có `next = NULL`. Đây là dấu hiệu nhận biết để các vòng lặp duyệt biết điểm dừng (khi `p == NULL`).',
    hint: 'Khi nào vòng lặp while duyệt danh sách dừng lại?'
  },
  {
    id: 4,
    title: 'Câu hỏi 4: Thao tác xóa Node đầu',
    scenarioDiagram: `HEAD
  │
  ▼
[ 10 ] ───> [ 20 ] ───> [ 30 ] ───> NULL`,
    question: 'Đoạn mã nào sau đây xóa Node đầu an toàn và giải phóng vùng nhớ?',
    options: [
      { id: 'A', text: 'free(head); head = head->next;', isCorrect: false },
      { id: 'B', text: 'Node* temp = head; head = head->next; free(temp);', isCorrect: true },
      { id: 'C', text: 'head = head->next; (không cần free)', isCorrect: false },
      { id: 'D', text: 'head = NULL;', isCorrect: false }
    ],
    explanation: 'Đáp án B đúng: Phải giữ tạm con trỏ `temp = head`, sau đó chuyển `head = head->next`, rồi mới gọi `free(temp)`. Nếu gọi `free(head)` trước như đáp án A, ô nhớ đã bị thu hồi nên truy cập `head->next` sẽ gây lỗi Undefined Behavior!',
    hint: 'Nếu phá hủy ngôi nhà trước, bạn không thể mở tủ lấy địa chỉ ngôi nhà thứ hai.'
  },
  {
    id: 5,
    title: 'Câu hỏi 5: Xóa Node đứng sau một Node',
    scenarioDiagram: `  q             p
  │             │
  ▼             ▼
[ 10 ] ──────> [ 20 ] ──────> [ 30 ] ───> NULL`,
    question: 'Cho con trỏ q đang trỏ Node [10], muốn xóa Node p [20] đứng sau q, ta bắc cầu bằng lệnh nào?',
    options: [
      { id: 'A', text: 'q->next = p->next; free(p);', isCorrect: true },
      { id: 'B', text: 'p->next = q->next; free(p);', isCorrect: false },
      { id: 'C', text: 'q = p->next; free(p);', isCorrect: false },
      { id: 'D', text: 'free(p); q->next = p->next;', isCorrect: false }
    ],
    explanation: 'Đáp án A đúng: `q->next = p->next` sẽ làm cho Node 10 trỏ thẳng tới Node 30, hoàn toàn bỏ qua Node 20. Sau đó giải phóng Node 20 bằng `free(p)`.',
    hint: 'Nhìn vào sơ đồ: con trỏ next của q phải nhận địa chỉ của Node đứng sau p.'
  },
  {
    id: 6,
    title: 'Câu hỏi 6: Vòng lặp duyệt danh sách',
    scenarioDiagram: `Node* p = head;
while ( ? ) {
    printf("%d ", p->data);
    p = p->next;
}`,
    question: 'Điều kiện dừng trong dấu ? của vòng lặp duyệt danh sách liên kết đơn chuẩn là gì?',
    options: [
      { id: 'A', text: 'p->next != NULL', isCorrect: false },
      { id: 'B', text: 'p != NULL', isCorrect: true },
      { id: 'C', text: 'p->data != 0', isCorrect: false },
      { id: 'D', text: 'head != NULL', isCorrect: false }
    ],
    explanation: 'Đáp án B đúng: `p != NULL` đảm bảo in được TẤT CẢ các phần tử (kể cả Node cuối cùng). Nếu dùng `p->next != NULL` (đáp án A), vòng lặp sẽ dừng ngay khi p ở Node cuối cùng và bỏ sót không in giá trị của Node cuối!',
    hint: 'Nếu dùng p->next != NULL, khi p đến Node cuối thì next của nó là NULL, vòng lặp sẽ ngắt trước khi in Node đó!'
  },
  {
    id: 7,
    title: 'Câu hỏi 7: Danh sách liên kết kép (Doubly Linked List)',
    scenarioDiagram: `NULL <── [PREV | 10 | NEXT] <───> [PREV | 20 | NEXT] ──> NULL`,
    question: 'Ưu điểm lớn nhất của Danh sách liên kết kép so với Danh sách liên kết đơn là gì?',
    options: [
      { id: 'A', text: 'Tiết kiệm bộ nhớ RAM hơn', isCorrect: false },
      { id: 'B', text: 'Có thể duyệt và truy cập phần tử theo cả hai chiều (tiến và lùi)', isCorrect: true },
      { id: 'C', text: 'Thời gian tìm kiếm phần tử giảm xuống O(1)', isCorrect: false },
      { id: 'D', text: 'Không cần dùng con trỏ HEAD', isCorrect: false }
    ],
    explanation: 'Đáp án B đúng: Nhờ có con trỏ PREV, ta có thể di chuyển ngược về trước từ bất kỳ Node nào. Đổi lại, mỗi Node sẽ tốn thêm dung lượng bộ nhớ cho con trỏ này.',
    hint: 'Mỗi Node có 2 con trỏ: 1 trỏ tới tương lai (next), 1 trỏ về quá khứ (prev).'
  },
  {
    id: 8,
    title: 'Câu hỏi 8: Danh sách liên kết vòng (Circular Linked List)',
    scenarioDiagram: `      ┌──────────────────────────┐
      ▼                          │
   [ 10 ] ──────> [ 20 ] ──────> [ 30 ]`,
    question: 'Đặc điểm nhận dạng của Danh sách liên kết vòng là gì?',
    options: [
      { id: 'A', text: 'Node đầu tiên trỏ vào chính nó', isCorrect: false },
      { id: 'B', text: 'Node cuối cùng không trỏ tới NULL mà trỏ ngược về Node đầu tiên (HEAD)', isCorrect: true },
      { id: 'C', text: 'Tất cả các Node đều chứa cùng một giá trị dữ liệu', isCorrect: false },
      { id: 'D', text: 'Không thể chèn thêm phần tử mới', isCorrect: false }
    ],
    explanation: 'Đáp án B đúng: Danh sách vòng khép kín chu trình, Node cuối quay về đầu. Khi duyệt danh sách vòng cần lưu ý điều kiện dừng để tránh vòng lặp vô hạn (Infinite Loop).',
    hint: 'Nhìn vào mũi tên quay đầu từ Node 30 về Node 10.'
  },
  {
    id: 9,
    title: 'Câu hỏi 9: Độ phức tạp thuật toán (Time Complexity)',
    scenarioDiagram: `Chèn vào đầu danh sách liên kết:
p->next = head;
head = p;`,
    question: 'Thao tác chèn thêm một Node vào ĐẦU danh sách liên kết đơn có độ phức tạp thời gian là bao nhiêu?',
    options: [
      { id: 'A', text: 'O(1) - Thời gian hằng số', isCorrect: true },
      { id: 'B', text: 'O(n) - Tuyến tính theo số phần tử', isCorrect: false },
      { id: 'C', text: 'O(log n) - Logarithmic', isCorrect: false },
      { id: 'D', text: 'O(n^2) - Bậc hai', isCorrect: false }
    ],
    explanation: 'Đáp án A đúng: Thao tác thêm đầu chỉ tốn 2 phép gán con trỏ cố định (`p->next = head` và `head = p`), không phụ thuộc vào danh sách có 10 phần tử hay 10 triệu phần tử, do đó thời gian luôn là O(1)!',
    hint: 'Có cần vòng lặp duyệt qua các phần tử khác để thêm vào đầu không?'
  },
  {
    id: 10,
    title: 'Câu hỏi 10: Xóa toàn bộ danh sách liên kết',
    scenarioDiagram: `while (head != NULL) {
    Node* p = head;
    head = head->next;
    free(p);
}`,
    question: 'Mục đích của đoạn mã trên là gì?',
    options: [
      { id: 'A', text: 'Tìm kiếm phần tử lớn nhất', isCorrect: false },
      { id: 'B', text: 'Đảo ngược danh sách liên kết', isCorrect: false },
      { id: 'C', text: 'Giải phóng lần lượt từng Node để dọn dẹp toàn bộ bộ nhớ danh sách', isCorrect: true },
      { id: 'D', text: 'In các giá trị của danh sách ra màn hình', isCorrect: false }
    ],
    explanation: 'Đáp án C đúng: Vòng lặp duyệt từ đầu đến cuối, tại mỗi bước dùng con trỏ p giữ Node hiện tại, dời head sang Node kế rồi giải phóng ô nhớ của p. Khi kết thúc, toàn bộ danh sách đã được dọn sạch khỏi RAM an toàn.',
    hint: 'Hãy để ý sự xuất hiện của lệnh free(p) trong vòng lặp.'
  }
];
