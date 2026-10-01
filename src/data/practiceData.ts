import { PracticeChallenge } from '../types/linkedList';

export const PRACTICE_CHALLENGES: PracticeChallenge[] = [
  {
    id: 1,
    title: 'Thử thách 1: Thêm Node 5 vào đầu danh sách',
    description: 'Danh sách hiện tại: [10] → [20] → [30] → NULL. Bạn vừa tạo Node p có giá trị 5. Hãy sắp xếp thứ tự 2 dòng lệnh dưới đây để chèn Node p vào đầu mà không làm mất danh sách cũ!',
    targetGoal: 'Kết quả mong muốn: [5] → [10] → [20] → [30] → NULL',
    initialList: [10, 20, 30],
    targetValue: 5,
    questionType: 'sequence',
    options: [
      { id: 'stepA', code: 'head = p;', label: 'Gán head trỏ vào Node p' },
      { id: 'stepB', code: 'p->next = head;', label: 'Gán p->next trỏ tới head hiện tại' },
    ],
    correctSequence: ['stepB', 'stepA'],
    explanation: 'Chính xác! Ta bắt buộc phải nối con trỏ p->next trỏ tới Node [10] trước (p->next = head). Sau khi liên kết đã an toàn, ta mới dời con trỏ head sang p (head = p). Nếu làm ngược lại (head = p trước), bạn sẽ mất địa chỉ của [10] và toàn bộ danh sách cũ biến mất!',
    hint: 'Hãy tự hỏi: Nếu bạn đổi con trỏ HEAD trước, con trỏ nào sẽ còn trỏ tới Node [10] cũ?',
    wrongSimulation: {
      wrongSequence: ['stepA', 'stepB'],
      visualStateDescription: `HEAD ──▶ [ 5 ] ──▶ [ 5 ] (tự trỏ chính nó!)
           ⚠️ [ 10 ] ──▶ [ 20 ] ──▶ [ 30 ] (BỊ MẤT DẤU TRONG RAM!)`,
      errorDiagnosis: 'HẬU QUẢ: Bạn đã gán head = p trước khi nối p->next. Kết quả là HEAD trỏ vào [5], và bạn đã đánh mất con trỏ tới [10]. Toàn bộ các phần tử cũ [10, 20, 30] bị trôi dạt và không thể truy cập lại!'
    }
  },
  {
    id: 2,
    title: 'Thử thách 2: Chèn Node 15 vào giữa [10] và [20]',
    description: 'Danh sách: [10] → [20] → [30] → NULL. Con trỏ q đang ở Node [10], Node mới p = 15. Thứ tự câu lệnh nào chèn đúng 15 vào giữa 10 và 20?',
    targetGoal: 'Kết quả mong muốn: [10] → [15] → [20] → [30] → NULL',
    initialList: [10, 20, 30],
    targetValue: 15,
    insertPosition: 0,
    questionType: 'sequence',
    options: [
      { id: 'mid_connect', code: 'p->next = q->next;', label: 'Gán p->next nhận địa chỉ Node [20] (chính là q->next)' },
      { id: 'mid_q', code: 'q->next = p;', label: 'Gán q->next trỏ sang Node mới p' }
    ],
    correctSequence: ['mid_connect', 'mid_q'],
    explanation: 'Xuất sắc! Phải nối p->next = q->next trước để Node 15 nắm lấy Node 20. Sau đó mới đổi q->next = p. Danh sách được nối liền mạch 4 Node [10] -> [15] -> [20] -> [30].',
    hint: 'Nếu gán q->next = p trước, q->next ban đầu đang giữ Node 20 sẽ bị ghi đè, và bạn sẽ mất dấu Node 20!',
    wrongSimulation: {
      wrongSequence: ['mid_q', 'mid_connect'],
      visualStateDescription: `[ 10 ] ──▶ [ 15 ] ──▶ [ 15 ] (vòng tròn quẩn!)
           ⚠️ [ 20 ] ──▶ [ 30 ] (BỊ ĐỨT LIÊN KẾT!)`,
      errorDiagnosis: 'HẬU QUẢ: Bạn gán q->next = p trước, khiến Node 10 trỏ vào 15, nhưng Node 15 chưa biết Node 20 ở đâu. Khi lệnh tiếp theo p->next = q->next chạy, nó gán p trỏ vào chính nó!'
    }
  },
  {
    id: 3,
    title: 'Thử thách 3: Xóa Node [20] ở giữa danh sách',
    description: 'Danh sách: [10] → [20] → [30] → NULL. Con trỏ q đang ở [10], con trỏ p đang ở [20] cần xóa. Hãy chọn trình tự thao tác an toàn nhất.',
    targetGoal: 'Kết quả mong muốn: [10] → [30] → NULL và giải phóng ô nhớ của [20]',
    initialList: [10, 20, 30],
    targetValue: 20,
    questionType: 'sequence',
    options: [
      { id: 'del_free', code: 'free(p);', label: 'Giải phóng bộ nhớ Node p' },
      { id: 'del_bridge', code: 'q->next = p->next;', label: 'Bắc cầu: q->next trỏ thẳng sang p->next (Node 30)' },
    ],
    correctSequence: ['del_bridge', 'del_free'],
    explanation: 'Xuất sắc! Phải bắc cầu vượt qua Node 20 bằng lệnh `q->next = p->next` trước. Sau khi dây nối đã vững vàng giữa [10] và [30], lúc này ta mới an tâm thu hồi vùng nhớ của p bằng `free(p)`. Nếu xóa p trước, p->next sẽ bị hủy hoại và không thể tìm thấy [30]!',
    hint: 'Bạn cần giữ cầu nối sang Node 30 trước khi phá dỡ Node 20!',
    wrongSimulation: {
      wrongSequence: ['del_free', 'del_bridge'],
      visualStateDescription: `[ 10 ] ──▶ [ ??? ] (Địa chỉ rác vô giá trị!)
           💥 Đã free(p) => Lệnh q->next = p->next gây LỖI CRASH (Segmentation Fault)`,
      errorDiagnosis: 'HẬU QUẢ: Bạn đã gọi free(p) giải phóng bộ nhớ của Node p trước. Vùng nhớ bị thu hồi nên truy cập p->next sau đó sẽ đọc vào ô nhớ cấm, làm sập toàn bộ chương trình!'
    }
  },
  {
    id: 4,
    title: 'Thử thách 4: Xóa Node đầu tiên trong danh sách',
    description: 'Danh sách: [10] → [20] → [30] → NULL. Hãy thực hiện thao tác xóa Node đầu [10] sao cho không bị rò rỉ bộ nhớ (Memory Leak).',
    targetGoal: 'Kết quả mong muốn: HEAD trỏ vào [20] → [30] → NULL và ô nhớ của [10] được dọn dẹp',
    initialList: [10, 20, 30],
    targetValue: 10,
    questionType: 'sequence',
    options: [
      { id: 'delhead_save', code: 'Node* temp = head;', label: 'Lưu tạm con trỏ Node đầu cũ vào biến temp' },
      { id: 'delhead_move', code: 'head = head->next;', label: 'Dời HEAD sang Node thứ hai (head = head->next)' },
      { id: 'delhead_free', code: 'free(temp);', label: 'Giải phóng ô nhớ của temp' }
    ],
    correctSequence: ['delhead_save', 'delhead_move', 'delhead_free'],
    explanation: 'Hoàn hảo! Dùng biến tạm temp để ghi nhớ địa chỉ Node đầu cũ. Sau khi head nhảy sang Node 20, ta dùng temp để gọi free(temp). Bằng cách này vừa không mất danh sách, vừa dọn sạch rác RAM.',
    hint: 'Nếu bạn dời head ngay lập tức mà không có biến tạm, làm sao bạn biết địa chỉ Node cũ để gọi lệnh free()?'
  },
  {
    id: 5,
    title: 'Thử thách 5: Thao tác khi danh sách ban đầu đang RỖNG (head == NULL)',
    description: 'Danh sách đang rỗng: head = NULL. Bạn muốn thêm Node p mang giá trị 100 vào danh sách. Thao tác xử lý đúng là gì?',
    targetGoal: 'Kết quả mong muốn: HEAD → [100] → NULL',
    initialList: [],
    targetValue: 100,
    questionType: 'sequence',
    options: [
      { id: 'empty_create', code: 'Node* p = CreateNode(100);', label: 'Tạo Node mới p (p->next = NULL)' },
      { id: 'empty_assign', code: 'head = p;', label: 'Gán head trỏ trực tiếp vào p' }
    ],
    correctSequence: ['empty_create', 'empty_assign'],
    explanation: 'Rất chuẩn! Khi danh sách rỗng, Node mới được tạo ra chính là Node duy nhất và cũng là Node đầu tiên, do đó chỉ cần gán thẳng head = p!',
    hint: 'Không có phần tử cũ nào cần nối, bạn chỉ cần gán con trỏ head vào Node mới tạo.'
  }
];
