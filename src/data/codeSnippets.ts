import { OperationType, ListType } from '../types/linkedList';

export interface CodeTemplate {
  title: string;
  c: string[];
  cpp: string[];
  pseudo: string[];
  lineExplanations: Record<number, string>;
}

export const CODE_SNIPPETS: Record<string, CodeTemplate> = {
  insertHead_singly: {
    title: 'Thêm vào đầu (Insert Head)',
    c: [
      '// 1. Cấp phát Node mới trong heap',
      'Node* p = (Node*)malloc(sizeof(Node));',
      'p->data = value;',
      'p->next = head; // 2. Nối Node mới vào danh sách cũ',
      'head = p;       // 3. Cập nhật HEAD trỏ vào Node mới'
    ],
    cpp: [
      '// 1. Tạo Node mới',
      'Node* p = new Node{value, nullptr};',
      'p->next = head; // 2. Nối Node mới vào danh sách cũ',
      'head = p;       // 3. Dời HEAD sang Node mới'
    ],
    pseudo: [
      'p ← TẠO_NODE(value)',
      'p.next ← head     // Nối vào đầu cũ',
      'head ← p          // Cập nhật mốc đầu mới'
    ],
    lineExplanations: {
      1: 'Xin hệ điều hành cấp phát vùng nhớ mới cho Node p và gán giá trị data.',
      2: 'Đưa con trỏ p->next trỏ tới Node đầu hiện tại. Đây là then chốt để không làm mất phần còn lại của danh sách!',
      3: 'Chính thức chuyển con trỏ head sang p, hoàn tất thao tác thêm đầu trong O(1).'
    }
  },
  insertTail_singly: {
    title: 'Thêm vào cuối (Insert Tail)',
    c: [
      'Node* p = (Node*)malloc(sizeof(Node));',
      'p->data = value; p->next = NULL;',
      'if (head == NULL) { head = p; return; }',
      'Node* q = head;',
      'while (q->next != NULL) { q = q->next; }',
      'q->next = p; // Nối đuôi cũ sang Node mới'
    ],
    cpp: [
      'Node* p = new Node{value, nullptr};',
      'if (!head) { head = p; return; }',
      'Node* q = head;',
      'while (q->next) { q = q->next; }',
      'q->next = p; // Nối đuôi cũ sang Node mới'
    ],
    pseudo: [
      'p ← TẠO_NODE(value, NULL)',
      'NẾU head = NULL THÌ head ← p',
      'q ← head; KHI q.next ≠ NULL THÌ q ← q.next',
      'q.next ← p // Nối vào đuôi'
    ],
    lineExplanations: {
      1: 'Tạo Node mới với next = NULL vì nó sẽ là Node cuối cùng.',
      2: 'Kiểm tra nếu danh sách ban đầu đang rỗng thì head nhận luôn Node này.',
      3: 'Dùng con trỏ tạm q duyệt từ đầu đến khi gặp Node có q->next == NULL.',
      4: 'Gán q->next = p để đuôi cũ nối sang Node mới p.'
    }
  },
  insertAfter_singly: {
    title: 'Chèn sau Node q (Insert After)',
    c: [
      'Node* p = (Node*)malloc(sizeof(Node));',
      'p->data = value;',
      'p->next = q->next; // 1. Nối p với phần sau',
      'q->next = p;       // 2. Nối q sang p'
    ],
    cpp: [
      'Node* p = new Node{value, nullptr};',
      'p->next = q->next; // 1. Nối p với phần sau',
      'q->next = p;       // 2. Nối q sang p'
    ],
    pseudo: [
      'p ← TẠO_NODE(value)',
      'p.next ← q.next  // Nối Node mới với phía sau',
      'q.next ← p       // Nối q vào Node mới'
    ],
    lineExplanations: {
      1: 'Tạo Node mới p chứa giá trị cần chèn.',
      2: 'QUAN TRỌNG: p->next nhận địa chỉ của Node đứng sau q trước. Tránh mất dấu!',
      3: 'q->next nhận địa chỉ của p, danh sách liên kết liền mạch.'
    }
  },
  deleteHead_singly: {
    title: 'Xóa Node đầu (Delete Head)',
    c: [
      'if (head == NULL) return;',
      'Node* temp = head; // 1. Lưu tạm Node đầu',
      'head = head->next; // 2. Dời HEAD sang Node thứ hai',
      'free(temp);        // 3. Giải phóng bộ nhớ Node đầu cũ'
    ],
    cpp: [
      'if (!head) return;',
      'Node* temp = head;',
      'head = head->next; // Dời HEAD sang Node kế',
      'delete temp;       // Thu hồi ô nhớ'
    ],
    pseudo: [
      'NẾU head = NULL THÌ THOÁT',
      'temp ← head',
      'head ← head.next',
      'GIẢI_PHÓNG(temp)'
    ],
    lineExplanations: {
      1: 'Kiểm tra điều kiện biên: nếu danh sách rỗng thì không làm gì.',
      2: 'Giữ lại con trỏ Node đầu trong biến temp để tí nữa free().',
      3: 'Dời HEAD sang Node kế tiếp: head = head->next.',
      4: 'Giải phóng vùng nhớ của temp để tránh rò rỉ RAM.'
    }
  },
  deleteTail_singly: {
    title: 'Xóa Node cuối (Delete Tail)',
    c: [
      'if (head == NULL) return;',
      'if (head->next == NULL) { free(head); head = NULL; return; }',
      'Node* q = head;',
      'while (q->next->next != NULL) { q = q->next; }',
      'free(q->next);    // Giải phóng Node cuối',
      'q->next = NULL;   // q trở thành Node cuối mới'
    ],
    cpp: [
      'if (!head) return;',
      'if (!head->next) { delete head; head = nullptr; return; }',
      'Node* q = head;',
      'while (q->next->next) { q = q->next; }',
      'delete q->next;',
      'q->next = nullptr;'
    ],
    pseudo: [
      'q ← head',
      'KHI q.next.next ≠ NULL THÌ q ← q.next',
      'GIẢI_PHÓNG(q.next)',
      'q.next ← NULL'
    ],
    lineExplanations: {
      1: 'Duyệt tìm Node áp chót q (Node có q->next->next == NULL).',
      2: 'Giải phóng Node cuối bằng free(q->next).',
      3: 'Gán q->next = NULL để ngắt đuôi an toàn.'
    }
  },
  deleteNode_singly: {
    title: 'Xóa Node sau q (Delete After q)',
    c: [
      'if (q == NULL || q->next == NULL) return;',
      'Node* p = q->next; // Node cần xóa đứng sau q',
      'q->next = p->next; // Bắc cầu vượt qua p',
      'free(p);           // Giải phóng ô nhớ'
    ],
    cpp: [
      'if (!q || !q->next) return;',
      'Node* p = q->next;',
      'q->next = p->next; // Bắc cầu vượt qua p',
      'delete p;'
    ],
    pseudo: [
      'p ← q.next',
      'q.next ← p.next // Bắc cầu vượt qua p',
      'GIẢI_PHÓNG(p)'
    ],
    lineExplanations: {
      1: 'Xác định Node p cần xóa chính là q->next.',
      2: 'Bắc cầu: q->next trỏ thẳng sang p->next, bỏ qua p hoàn toàn.',
      3: 'Thu hồi bộ nhớ của Node p.'
    }
  },
  traverse_singly: {
    title: 'Duyệt danh sách (Traverse)',
    c: [
      'Node* p = head;',
      'while (p != NULL) {',
      '    printf("%d -> ", p->data);',
      '    p = p->next; // Nhảy sang Node kế tiếp',
      '}',
      'printf("NULL\\n");'
    ],
    cpp: [
      'Node* p = head;',
      'while (p != nullptr) {',
      '    cout << p->data << " -> ";',
      '    p = p->next;',
      '}',
      'cout << "NULL" << endl;'
    ],
    pseudo: [
      'p ← head',
      'KHI p ≠ NULL THÌ:',
      '    XỬ_LÝ(p.data)',
      '    p ← p.next'
    ],
    lineExplanations: {
      1: 'Khởi tạo con trỏ tạm p = head. Tuyệt đối không dùng head để duyệt!',
      2: 'Vòng lặp chạy cho đến khi p trỏ vào NULL (cuối danh sách).',
      3: 'Xử lý dữ liệu của Node hiện tại (in ấn, tính tổng, tìm kiếm...).',
      4: 'p = p->next: Bước chuyển dịch quan trọng nhất để tiến lên Node tiếp theo.'
    }
  },
  insertHead_doubly: {
    title: 'Thêm đầu - Danh sách kép',
    c: [
      'DNode* p = (DNode*)malloc(sizeof(DNode));',
      'p->data = value; p->prev = NULL; p->next = head;',
      'if (head != NULL) head->prev = p; // Nối lùi',
      'head = p; // Cập nhật HEAD mới'
    ],
    cpp: [
      'DNode* p = new DNode{value, nullptr, head};',
      'if (head) head->prev = p;',
      'head = p;'
    ],
    pseudo: [
      'p ← TẠO_DNODE(value, NULL, head)',
      'NẾU head ≠ NULL THÌ head.prev ← p',
      'head ← p'
    ],
    lineExplanations: {
      1: 'Tạo Node kép mới với 2 con trỏ prev và next.',
      2: 'Nối lùi: gán head->prev = p để Node đầu cũ trỏ ngược lại Node mới.',
      3: 'Cập nhật head = p.'
    }
  },
  traverse_circular: {
    title: 'Duyệt danh sách vòng',
    c: [
      'if (head == NULL) return;',
      'Node* p = head;',
      'do {',
      '    printf("%d -> ", p->data);',
      '    p = p->next;',
      '} while (p != head); // Dừng khi quay lại HEAD'
    ],
    cpp: [
      'if (!head) return;',
      'Node* p = head;',
      'do {',
      '    cout << p->data << " -> ";',
      '    p = p->next;',
      '} while (p != head);'
    ],
    pseudo: [
      'p ← head',
      'LÀM:',
      '    XỬ_LÝ(p.data)',
      '    p ← p.next',
      'KHI p ≠ head'
    ],
    lineExplanations: {
      1: 'Dùng vòng lặp do...while để duyệt ít nhất 1 lần từ HEAD.',
      2: 'Điều kiện dừng là p == head (đã đi giáp một vòng), tránh lặp vô tận!'
    }
  }
};
