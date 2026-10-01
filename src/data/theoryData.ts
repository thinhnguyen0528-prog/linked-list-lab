import { TheoryChapter } from '../types/linkedList';

export const THEORY_CHAPTERS: TheoryChapter[] = [
  {
    id: 'intro',
    num: '01',
    title: 'Định nghĩa Danh sách liên kết',
    subtitle: 'Cấu trúc dữ liệu tuyến tính với các phần tử phân tán trong bộ nhớ',
    shortDesc: 'Danh sách liên kết (Linked List) là một tập hợp các phần tử gọi là Node. Khác với Mảng (Array) nằm ở các ô nhớ liên tiếp nhau, các Node trong Linked List có thể nằm rải rác khắp nơi trong RAM nhưng được nối với nhau bằng con trỏ.',
    humanDesc: 'Hãy nghĩ đơn giản: Mảng giống như hàng ghế cố định trong rạp phim (phải đặt cạnh nhau). Còn Linked List giống như một nhóm bạn chơi đuổi bắt ở khắp sân: mỗi người chỉ cần nhớ số điện thoại của người tiếp theo là cả nhóm luôn tìm thấy nhau!',
    metaphor: {
      title: 'Ẩn dụ: Trò chơi tìm kho báu',
      content: 'Hãy tưởng tượng bạn tham gia trò chơi truy tìm kho báu: Manh mối 1 đưa cho bạn địa chỉ của Manh mối 2. Manh mối 2 đưa bạn địa chỉ của Manh mối 3. Bạn không thể nhảy cóc đến manh mối cuối cùng ngay lập tức, mà phải lần theo từng chỉ dẫn!',
      icon: '🗺️'
    },
    conceptDiagram: `MẢNG LIÊN TIẾP TRONG RAM:
[ 10 | 20 | 30 ]  (Ô 0x100 -> 0x104 -> 0x108)

DANH SÁCH LIÊN KẾT PHÂN TÁN:
[10 | 0x3F0] ──> (ở 0x3F0) [20 | 0x8A4] ──> (ở 0x8A4) [30 | NULL]`,
    explanationPoints: [
      'Không yêu cầu cấp phát một vùng nhớ liên tục cố định trước như mảng tĩnh.',
      'Dễ dàng mở rộng hoặc thu nhỏ kích thước linh hoạt khi chương trình đang chạy.',
      'Thêm hoặc xóa phần tử chỉ cần đổi liên kết con trỏ, không phải dịch chuyển hàng loạt phần tử như mảng.'
    ],
    keyTakeaway: 'Mảng là đoàn xe lửa gắn cứng toa liền kề; Linked List là những chiếc xe nối với nhau bằng dây cáp có thể tháo lắp tức thì.',
    codeSnippet: {
      title: 'So sánh kích thước & bộ nhớ',
      language: 'c',
      code: `// Mảng cố định 100 phần tử (tốn 400 bytes ngay cả khi chỉ dùng 3)
int arr[100] = {10, 20, 30};

// Linked List: Chỉ cấp phát đúng khi cần thêm Node mới
// Tiết kiệm bộ nhớ, linh hoạt kích thước tối đa!`
    }
  },
  {
    id: 'node-structure',
    num: '02',
    title: 'Cấu trúc một Node (Data & Next)',
    subtitle: 'Khối xây dựng cơ bản gồm Dữ liệu và Con trỏ liên kết',
    shortDesc: 'Mỗi Node là một cấu trúc (struct) gồm 2 thành phần cốt lõi: phần DATA lưu giá trị thực tế (số nguyên, chuỗi, sinh viên...) và phần NEXT là con trỏ lưu địa chỉ của Node kế tiếp.',
    humanDesc: 'Node giống như một người đang xếp hàng mua vé: Tay trái ôm một món đồ (DATA) và tay phải đang đặt lên vai người đứng trước mặt (NEXT) để giữ hàng không bị đứt!',
    metaphor: {
      title: 'Ẩn dụ: Toa tàu hỏa',
      content: 'Mỗi toa tàu gồm khoang chở hàng (DATA) và một chiếc móc xích ở phía sau (NEXT) để móc vào toa tàu tiếp theo.',
      icon: '🚃'
    },
    conceptDiagram: `┌───────────────────────────┐
│         NODE (NodeS)      │
├─────────────┬─────────────┤
│    DATA     │    NEXT     │
│     10      │   0x4A02    │ ────> Trỏ đến Node kế tiếp ở ô nhớ 0x4A02
└─────────────┴─────────────┘`,
    explanationPoints: [
      'DATA: Vùng lưu trữ thông tin thực tế của bài toán (int, float, struct SinhVien...).',
      'NEXT: Biến con trỏ kiểu Node* lưu địa chỉ bộ nhớ của Node đứng ngay sau nó.',
      'Nếu là Node cuối cùng, con trỏ NEXT sẽ trỏ tới NULL (địa chỉ 0x0).'
    ],
    keyTakeaway: 'Node không chỉ giữ giá trị của mình, mà nắm luôn chiếc chìa khóa (địa chỉ) để tìm thấy người kế tiếp.',
    codeSnippet: {
      title: 'Khai báo cấu trúc Node trong C / C++',
      language: 'cpp',
      code: `struct Node {
    int data;          // Dữ liệu chứa trong Node
    struct Node* next; // Con trỏ trỏ tới Node kế tiếp
};

typedef struct Node Node;
typedef Node* NodePtr;`
    }
  },
  {
    id: 'head-and-null',
    num: '03',
    title: 'Con trỏ HEAD và giá trị NULL',
    subtitle: 'Điểm khởi đầu duy nhất và điểm dừng kết thúc danh sách',
    shortDesc: 'Vì các Node nằm phân tán, máy tính chỉ cần lưu duy nhất một con trỏ đặc biệt gọi là HEAD (trỏ tới Node đầu tiên). Nếu mất HEAD, toàn bộ danh sách sẽ trôi dạt và không thể truy cập được!',
    humanDesc: 'HEAD là tấm biển chỉ đường đặt ở cửa vào: "Người đầu tiên ở kia kìa!". Còn NULL là bức tường gạch cuối đường báo hiệu "Hết người rồi, dừng lại ở đây!".',
    metaphor: {
      title: 'Ẩn dụ: Đầu cuộn chỉ',
      content: 'Muốn mở một cuộn chỉ rối, bạn phải tìm thấy đầu mối dây (HEAD). Đi dọc sợi chỉ đến nút thắt cuối cùng (NULL) thì biết đã hết dây.',
      icon: '🧶'
    },
    conceptDiagram: `HEAD (0x10A)
  │
  ▼
┌───────────┐      ┌───────────┐      ┌───────────┐
│ 10 |0x20B │ ───> │ 20 |0x30C │ ───> │ 30 | NULL │ ───> [ HẾT ]
└───────────┘      └───────────┘      └───────────┘
 (ở 0x10A)          (ở 0x20B)          (ở 0x30C)`,
    explanationPoints: [
      'HEAD = NULL có nghĩa là danh sách đang rỗng hoàn toàn, chưa có Node nào.',
      'Khi danh sách có phần tử: HEAD luôn lưu địa chỉ của Node đầu tiên.',
      'Node cuối cùng luôn có trường next = NULL, đóng vai trò là điều kiện dừng khi duyệt.'
    ],
    keyTakeaway: 'Mọi thao tác với Linked List đều bắt đầu từ HEAD. Giữ chặt con trỏ HEAD như giữ sinh mạng của chương trình!',
    codeSnippet: {
      title: 'Khởi tạo danh sách rỗng',
      language: 'cpp',
      code: `Node* head = NULL; // Ban đầu danh sách chưa có phần tử nào

// Kiểm tra danh sách có rỗng không:
if (head == NULL) {
    printf("Danh sách đang rỗng!\\n");
}`
    }
  },
  {
    id: 'create-node',
    num: '04',
    title: 'Tạo Node mới & Cấp phát động',
    subtitle: 'Sử dụng malloc (C) hoặc new (C++) để xin cấp ô nhớ từ Heap',
    shortDesc: 'Trước khi chèn một giá trị vào danh sách, ta phải xin hệ điều hành cấp phát một ô nhớ mới trong vùng nhớ Heap, điền giá trị cho data và gán next = NULL.',
    humanDesc: 'Giống như bạn sinh thêm một em bé: phải chuẩn bị sẵn nôi, tã lót và giấy khai sinh trước, rồi sau đó mới dắt tay em bé giới thiệu vào gia đình lớn!',
    metaphor: {
      title: 'Ẩn dụ: Xây một căn phòng mới',
      content: 'Trước khi đón khách vào ở một chuỗi phòng liên hoàn, bạn cần gọi thợ xây thêm một căn phòng độc lập, quét vôi, gắn số phòng và đặt sẵn chốt cửa mở.',
      icon: '🏗️'
    },
    conceptDiagram: `BƯỚC TẠO NODE MỚI:
1. Gọi malloc() / new ────> Máy tính cấp ô nhớ tự do (vd: 0x9F0)
2. Gán p->data = x ───────> [ x ]
3. Gán p->next = NULL ────> [ x | NULL ]
4. Trả về con trỏ p trỏ tới Node mới này!`,
    explanationPoints: [
      'Bộ nhớ cấp phát qua malloc/new nằm trong vùng HEAP, không bị hủy khi hàm kết thúc.',
      'Sau khi tạo Node, next được đặt tạm thời là NULL vì nó chưa được nối vào đâu.',
      'Luôn kiểm tra nếu cấp phát thất bại (p == NULL) do máy tính hết RAM.'
    ],
    keyTakeaway: 'Luôn khởi tạo next = NULL cho Node mới để tránh con trỏ rác trỏ lung tung vào vùng nhớ cấm.',
    codeSnippet: {
      title: 'Hàm tạo Node chuẩn C / C++',
      language: 'cpp',
      code: `Node* CreateNode(int value) {
    Node* p = (Node*)malloc(sizeof(Node)); // Xin RAM
    if (p == NULL) {
        printf("Lỗi cấp phát bộ nhớ!\\n");
        return NULL;
    }
    p->data = value; // Gán dữ liệu
    p->next = NULL;  // Chưa nối vào ai
    return p;
}`
    }
  },
  {
    id: 'insert-operations',
    num: '05',
    title: 'Các thao tác Thêm Node',
    subtitle: 'Thêm đầu, thêm cuối và chèn sau một Node chỉ định',
    shortDesc: 'Để thêm một Node vào danh sách, nguyên tắc vàng là: Nối Node mới vào danh sách trước (p->next = ...), sau đó mới cập nhật con trỏ chính (head hoặc q->next).',
    humanDesc: 'Quy tắc "Cầm tay trước, đổi chỗ sau": Người mới muốn chen lên đầu hàng phải nắm chặt áo người số 1 cũ trước. Nếu buông tay mà tự nhận là số 1, người số 1 cũ cùng cả hàng phía sau sẽ bị đẩy rơi xuống vực mất tích!',
    metaphor: {
      title: 'Ẩn dụ: Nối dây chuyền người',
      content: 'Muốn một người mới (p) chen vào trước người đầu hàng (head): Người mới phải dùng tay nắm chặt vai người đầu hàng cũ trước, rồi người mới mới tự nhận mình là người dẫn đầu!',
      icon: '🤝'
    },
    conceptDiagram: `THÊM ĐẦU (Insert Head):
Bước 1: p->next = head  (Node mới nối tới Node đầu cũ)
Bước 2: head = p        (HEAD chính thức chuyển sang Node mới)

THÊM SAU NODE Q (Insert After q):
Bước 1: p->next = q->next (Node mới nối tới Node phía sau q)
Bước 2: q->next = p       (q nối sang Node mới p)`,
    explanationPoints: [
      'Thêm vào đầu danh sách: Độ phức tạp O(1) cực kỳ nhanh chóng.',
      'Thêm vào cuối danh sách: Cần duyệt từ HEAD đến Node cuối cùng có next == NULL (nếu không có con trỏ TAIL), độ phức tạp O(n).',
      'Chèn sau một Node q: Cần biết con trỏ trỏ tới q, sau đó đổi 2 liên kết là xong trong O(1).'
    ],
    keyTakeaway: 'Nếu bạn gán head = p trước khi gán p->next = head, bạn sẽ vĩnh viễn mất con trỏ tới danh sách cũ!',
    codeSnippet: {
      title: 'Thêm vào đầu danh sách (C++)',
      language: 'cpp',
      code: `void InsertFirst(Node* &head, int x) {
    Node* p = CreateNode(x);
    if (head == NULL) {
        head = p;
    } else {
        p->next = head; // Bước 1: Nối p với danh sách cũ
        head = p;       // Bước 2: Cập nhật HEAD mới
    }
}`
    }
  },
  {
    id: 'delete-operations',
    num: '06',
    title: 'Các thao tác Xóa Node',
    subtitle: 'Bỏ qua liên kết và giải phóng bộ nhớ để tránh rò rỉ RAM',
    shortDesc: 'Xóa một Node gồm 2 việc: 1. Cập nhật con trỏ của Node đứng trước bắc cầu vượt qua Node cần xóa. 2. Giải phóng bộ nhớ của Node đó bằng lệnh free() hoặc delete.',
    humanDesc: 'Muốn mời một bạn ở giữa bước ra khỏi hàng: Bạn đứng trước nắm lấy tay bạn đứng sau để bắc cầu liền mạch. Sau khi hàng đã vững, bạn ở giữa mới an tâm bước ra ngoài mà không làm đứt hàng!',
    metaphor: {
      title: 'Ẩn dụ: Xây cầu đường vòng',
      content: 'Muốn dỡ bỏ cây cầu số 2 giữa đảo 1 và đảo 3: Đảo 1 phải xây một đường nối thẳng tới đảo 3 trước, rồi mới kích nổ phá dỡ đảo số 2 một cách an toàn.',
      icon: '🌉'
    },
    conceptDiagram: `XÓA NODE Ở GIỮA (Node [20]):
       ┌────────────────────────┐ (q->next = p->next)
       │                        ▼
[ 10 | * ]    [ 20 | * ]    [ 30 | NULL ]
  Node q        Node p
              (free(p)!)`,
    explanationPoints: [
      'Xóa đầu: Cần lưu tạm Node đầu cũ `temp = head`, dời `head = head->next`, sau đó `free(temp)`.',
      'Xóa sau Node q: `p = q->next; q->next = p->next; free(p);`.',
      'Nếu không gọi free()/delete, vùng nhớ của Node đó sẽ trở thành "bộ nhớ rác" làm hao tốn tài nguyên hệ thống (Memory Leak).'
    ],
    keyTakeaway: 'Đừng bao giờ xóa Node trước khi dời con trỏ, vì khi đã free(p) thì p->next sẽ chứa giá trị không hợp lệ!',
    codeSnippet: {
      title: 'Xóa Node đầu danh sách',
      language: 'cpp',
      code: `void DeleteFirst(Node* &head) {
    if (head == NULL) return; // Danh sách rỗng không xóa
    Node* temp = head;       // Giữ tạm địa chỉ Node đầu
    head = head->next;       // Dời HEAD sang Node thứ hai
    free(temp);              // Giải phóng Node đầu cũ
}`
    }
  },
  {
    id: 'traversal-and-search',
    num: '07',
    title: 'Duyệt danh sách & Tìm kiếm',
    subtitle: 'Dùng con trỏ tạm thời bước từng bước từ HEAD tới NULL',
    shortDesc: 'Vì không thể dùng chỉ số ngẫu nhiên arr[i] như mảng, ta tạo một con trỏ tạm `p = head`, lần lượt xử lý `p->data`, rồi bước tiếp bằng lệnh kinh điển: `p = p->next`.',
    humanDesc: 'Điểm danh từng người: Bắt đầu từ bạn đầu bàn (head), hỏi tên xong thì bảo "chỉ cho thầy bạn kế tiếp là ai", rồi bước sang người đó cho đến khi hết người (NULL).',
    metaphor: {
      title: 'Ẩn dụ: Đi trên cầu khỉ',
      content: 'Bạn chỉ có thể bước từng nhịp cầu một: Từ nhịp hiện tại, nhìn thấy nhịp tiếp theo và bước sang. Bạn không thể nhảy dù trực tiếp vào giữa cầu!',
      icon: '🚶'
    },
    conceptDiagram: `BƯỚC 1: p = head       ──> p đang ở [ 10 ]
BƯỚC 2: in p->data     ──> In ra 10
BƯỚC 3: p = p->next    ──> p nhảy sang [ 20 ]
BƯỚC 4: in p->data     ──> In ra 20
BƯỚC 5: p = p->next    ──> p nhảy sang [ 30 ]
BƯỚC 6: p = p->next    ──> p trở thành NULL (DỪNG LẠI!)`,
    explanationPoints: [
      'Vòng lặp chuẩn: `for (Node* p = head; p != NULL; p = p->next)`',
      'Tìm kiếm: So sánh `if (p->data == key)` tại mỗi bước; nếu thấy thì trả về con trỏ p.',
      'Thời gian duyệt toàn bộ danh sách là O(n) với n là số phần tử.'
    ],
    keyTakeaway: 'Không bao giờ dùng con trỏ head để duyệt trực tiếp (ví dụ: `head = head->next` trong vòng lặp), vì làm vậy bạn sẽ làm mất sạch danh sách ban đầu!',
    codeSnippet: {
      title: 'Duyệt in danh sách và tìm kiếm',
      language: 'cpp',
      code: `void PrintList(Node* head) {
    Node* p = head; // Dùng con trỏ phụ p
    while (p != NULL) {
        printf("%d -> ", p->data);
        p = p->next; // Bước tiếp theo
    }
    printf("NULL\\n");
}`
    }
  },
  {
    id: 'doubly-and-circular',
    num: '08',
    title: 'Liên kết kép & Liên kết vòng',
    subtitle: 'Mở rộng khả năng đi lùi và tạo vòng khép kín',
    shortDesc: 'Danh sách liên kết kép (Doubly) có thêm con trỏ PREV để đi ngược chiều. Danh sách liên kết vòng (Circular) có Node cuối trỏ ngược về HEAD thay vì NULL.',
    humanDesc: 'Kép giống như nhảy dây đôi: hai tay nắm lấy cả bạn phía trước và bạn phía sau, đi xuôi đi lùi đều được. Vòng giống như trò chơi múa sạp vòng tròn: người cuối nắm tay người đầu tiên, đi mãi quanh vòng tròn không có điểm tận cùng!',
    metaphor: {
      title: 'Ẩn dụ: Đường hai chiều & Vòng xoay giao thông',
      content: 'Liên kết kép là đường cao tốc 2 làn xe: đi xuôi được, quay lui được. Liên kết vòng là bùng binh xoay vòng quanh hồ: đi hết vòng lại quay về điểm xuất phát!',
      icon: '🔄'
    },
    conceptDiagram: `LIÊN KẾT KÉP (DOUBLY):
NULL <── [PREV| 10 |NEXT] <───> [PREV| 20 |NEXT] ──> NULL

LIÊN KẾT VÒNG (CIRCULAR):
     ┌──────────────────────────────────────────┐
     │                                          │
     ▼                                          │
 [ 10 | * ] ────────> [ 20 | * ] ────────> [ 30 | * ]`,
    explanationPoints: [
      'Liên kết kép: Mỗi Node tốn thêm bộ nhớ cho con trỏ `prev`, nhưng xóa một Node bất kỳ cực nhanh mà không cần tìm Node đứng trước.',
      'Liên kết vòng: Không bao giờ có con trỏ NULL ở đuôi. Thích hợp cho các bài toán phân chia tài nguyên vòng (Round-Robin CPU Scheduling), danh sách phát nhạc lặp lại.',
      'Lưu ý vòng lặp: Với danh sách vòng, điều kiện dừng phải là `p->next == head` thay vì `p == NULL` để không bị lặp vô tận!'
    ],
    keyTakeaway: 'Liên kết kép cho phép duyệt 2 chiều; Liên kết vòng khép kín chu trình không có điểm kết thúc NULL.',
    codeSnippet: {
      title: 'Cấu trúc Node danh sách kép',
      language: 'cpp',
      code: `struct DNode {
    int data;
    struct DNode* prev; // Trỏ về Node đứng trước
    struct DNode* next; // Trỏ tới Node đứng sau
};`
    }
  }
];
