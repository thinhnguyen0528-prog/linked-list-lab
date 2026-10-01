import { AnimationStep, ListNode, ListType, OperationType } from '../types/linkedList';

// Helper to generate consistent mock hex memory addresses
export const getMockAddress = (id: string | number, offset: number = 0): string => {
  const base = 0x2000;
  const num = typeof id === 'number' ? id : parseInt(id.replace(/\D/g, '') || '1', 10);
  const hex = (base + num * 0x40 + offset * 0x10).toString(16).toUpperCase();
  return `0x${hex}`;
};

export const createInitialNodes = (values: number[], type: ListType = 'singly'): ListNode[] => {
  return values.map((val, idx) => {
    const id = `node-${idx + 1}-${val}`;
    const address = getMockAddress(idx + 1);
    const nextAddress = idx < values.length - 1 ? getMockAddress(idx + 2) : (type === 'circular' ? getMockAddress(1) : null);
    const prevAddress = type === 'doubly' ? (idx > 0 ? getMockAddress(idx) : null) : null;
    
    return {
      id,
      value: val,
      address,
      nextAddress,
      prevAddress,
      highlight: 'default'
    };
  });
};

export const generateSteps = (
  initialNodes: ListNode[],
  op: OperationType,
  newValue: number = 50,
  targetIndex: number = 0,
  listType: ListType = 'singly'
): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const currentNodes = [...initialNodes];

  if (listType === 'singly') {
    switch (op) {
      case 'insertHead': {
        const newId = `node-new-${Date.now()}`;
        const newAddress = '0x1050';
        const oldHeadAddress = currentNodes.length > 0 ? currentNodes[0].address : null;

        const newNode: ListNode = {
          id: newId,
          value: newValue,
          address: newAddress,
          nextAddress: null,
          highlight: 'new',
          statusLabel: 'p (Node mới)'
        };

        // BƯỚC 1: Node mới xuất hiện riêng biệt
        steps.push({
          stepNumber: 1,
          totalSteps: 4,
          title: 'Bước 1: Cấp phát Node mới (p)',
          description: `Tạo con trỏ p trỏ tới ô nhớ mới cấp phát tại ${newAddress}. Khởi tạo p->data = ${newValue} và p->next = NULL.`,
          whyExplanation: 'Trước khi chèn vào danh sách, Node phải được cấp phát bộ nhớ độc lập và chuẩn bị dữ liệu sẵn sàng. Khởi tạo p->next = NULL để tránh con trỏ rác.',
          codeHighlightLines: {
            c: [1, 2, 3],
            cpp: [1, 2],
            pseudo: [1]
          },
          listState: {
            nodes: currentNodes.map(n => ({ ...n, highlight: 'default' })),
            headId: currentNodes[0]?.id || null,
            floatingNode: newNode,
            activePointers: [
              { name: 'head', targetId: currentNodes[0]?.id || 'NULL' },
              { name: 'p', targetId: 'floating' }
            ]
          }
        });

        // BƯỚC 2: Node mới được đưa tới gần vị trí đầu
        steps.push({
          stepNumber: 2,
          totalSteps: 4,
          title: 'Bước 2: Chuẩn bị liên kết với Node đầu cũ',
          description: `Đưa Node [${newValue}] tới phía trước Node [${currentNodes[0]?.value ?? 'Rỗng'}]. Con trỏ HEAD vẫn đang giữ danh sách cũ.`,
          whyExplanation: 'Vẫn chưa được thay đổi con trỏ HEAD! Nếu thay đổi HEAD ngay lúc này, bạn sẽ mất địa chỉ của toàn bộ danh sách cũ.',
          codeHighlightLines: {
            c: [3],
            cpp: [2],
            pseudo: [1]
          },
          listState: {
            nodes: currentNodes.map(n => ({ ...n, highlight: 'default' as const })),
            headId: currentNodes[0]?.id || null,
            floatingNode: { ...newNode, highlight: 'active' as const },
            activePointers: [
              { name: 'head', targetId: currentNodes[0]?.id || 'NULL' },
              { name: 'p', targetId: 'floating' }
            ]
          }
        });

        // BƯỚC 3: Mũi tên từ p -> head xuất hiện (p->next = head)
        const connectedNewNode: ListNode = {
          ...newNode,
          nextAddress: oldHeadAddress,
          highlight: 'active' as const
        };

        steps.push({
          stepNumber: 3,
          totalSteps: 4,
          title: 'Bước 3: Nối Node mới vào danh sách cũ (p->next = head)',
          description: `Gán trường next của Node [${newValue}] trỏ tới địa chỉ của Node đầu hiện tại (${oldHeadAddress ?? 'NULL'}).`,
          whyExplanation: 'ĐÂY LÀ BƯỚC QUAN TRỌNG NHẤT: Bắt buộc phải nối Node mới với danh sách cũ trước, để bảo đảm con cháu phía sau không bị đứt gãy!',
          codeHighlightLines: {
            c: [4],
            cpp: [3],
            pseudo: [2]
          },
          listState: {
            nodes: currentNodes.map(n => ({ ...n, highlight: 'default' })),
            headId: currentNodes[0]?.id || null,
            floatingNode: connectedNewNode,
            pointerArrows: currentNodes[0] ? [
              { fromId: newId, toId: currentNodes[0].id, label: 'p->next', color: 'active' }
            ] : [],
            activePointers: [
              { name: 'head', targetId: currentNodes[0]?.id || 'NULL' },
              { name: 'p', targetId: 'floating' }
            ]
          }
        });

        // BƯỚC 4: HEAD chuyển sang Node mới (head = p)
        const finalList = [connectedNewNode, ...currentNodes].map((n, i) => ({
          ...n,
          highlight: i === 0 ? ('new' as const) : ('default' as const),
          statusLabel: i === 0 ? 'HEAD' : undefined
        }));

        steps.push({
          stepNumber: 4,
          totalSteps: 4,
          title: 'Bước 4: Cập nhật con trỏ HEAD (head = p)',
          description: `Chuyển con trỏ HEAD trỏ trực tiếp vào Node [${newValue}]. Lúc này [${newValue}] chính thức trở thành Node đầu tiên của danh sách!`,
          whyExplanation: 'Sau khi p đã nắm chắc danh sách cũ, ta an tâm dời con trỏ HEAD sang p. Hoàn tất chèn trong độ phức tạp O(1)!',
          codeHighlightLines: {
            c: [5],
            cpp: [4],
            pseudo: [3]
          },
          listState: {
            nodes: finalList,
            headId: newId,
            floatingNode: null,
            activePointers: [
              { name: 'head', targetId: newId }
            ]
          }
        });
        break;
      }

      case 'insertTail': {
        const newId = `node-tail-${Date.now()}`;
        const newAddress = '0x1990';
        const newNode: ListNode = {
          id: newId,
          value: newValue,
          address: newAddress,
          nextAddress: null,
          highlight: 'new',
          statusLabel: 'p (Mới)'
        };

        if (currentNodes.length === 0) {
          // Danh sách rỗng
          steps.push({
            stepNumber: 1,
            totalSteps: 2,
            title: 'Bước 1: Cấp phát Node mới',
            description: `Tạo Node [${newValue}] với next = NULL`,
            whyExplanation: 'Danh sách đang rỗng, chỉ cần gán thẳng head = p.',
            codeHighlightLines: { c: [1, 2], cpp: [1, 2], pseudo: [1] },
            listState: { nodes: [], headId: null, floatingNode: newNode }
          });
          steps.push({
            stepNumber: 2,
            totalSteps: 2,
            title: 'Bước 2: Gán head = p',
            description: `Node [${newValue}] trở thành Node duy nhất.`,
            whyExplanation: 'Hoàn tất thêm vào danh sách rỗng.',
            codeHighlightLines: { c: [3], cpp: [3], pseudo: [2] },
            listState: { nodes: [{ ...newNode, statusLabel: 'HEAD' }], headId: newId, floatingNode: null }
          });
          return steps;
        }

        // BƯỚC 1: Tạo Node mới
        steps.push({
          stepNumber: 1,
          totalSteps: 4,
          title: 'Bước 1: Tạo Node mới p',
          description: `Cấp phát Node p có giá trị [${newValue}] tại địa chỉ ${newAddress}, p->next = NULL.`,
          whyExplanation: 'Node đuôi trong danh sách liên kết đơn luôn trỏ tới NULL.',
          codeHighlightLines: { c: [1, 2], cpp: [1, 2], pseudo: [1] },
          listState: {
            nodes: currentNodes.map(n => ({ ...n, highlight: 'default' })),
            headId: currentNodes[0].id,
            floatingNode: newNode,
            activePointers: [{ name: 'head', targetId: currentNodes[0].id }, { name: 'p', targetId: 'floating' }]
          }
        });

        // BƯỚC 2: Duyệt tìm Node cuối cùng
        const lastIdx = currentNodes.length - 1;
        steps.push({
          stepNumber: 2,
          totalSteps: 4,
          title: 'Bước 2: Dùng con trỏ q duyệt tìm Node cuối',
          description: `Con trỏ q lần theo các con trỏ next cho đến khi gặp Node có next == NULL (chính là Node [${currentNodes[lastIdx].value}]).`,
          whyExplanation: 'Vì không có con trỏ TAIL cố định, ta phải duyệt từ HEAD với độ phức tạp O(n) để tìm đến cuối hàng.',
          codeHighlightLines: { c: [3, 4, 5], cpp: [3, 4], pseudo: [2] },
          listState: {
            nodes: currentNodes.map((n, i) => ({
              ...n,
              highlight: i === lastIdx ? ('target' as const) : ('default' as const),
              statusLabel: i === lastIdx ? 'q (Node cuối)' : undefined
            })),
            headId: currentNodes[0].id,
            floatingNode: newNode,
            activePointers: [
              { name: 'head', targetId: currentNodes[0].id },
              { name: 'q', targetId: currentNodes[lastIdx].id },
              { name: 'p', targetId: 'floating' }
            ]
          }
        });

        // BƯỚC 3: Nối Node cuối cũ sang Node mới (q->next = p)
        const updatedList = currentNodes.map((n, i) => {
          if (i === lastIdx) {
            return { ...n, nextAddress: newAddress, highlight: 'active' as const };
          }
          return n;
        });

        steps.push({
          stepNumber: 3,
          totalSteps: 4,
          title: 'Bước 3: Nối đuôi cũ sang Node mới (q->next = p)',
          description: `Gán con trỏ next của Node [${currentNodes[lastIdx].value}] trỏ tới địa chỉ của Node [${newValue}].`,
          whyExplanation: 'Node [${currentNodes[lastIdx].value}] không còn trỏ tới NULL nữa mà trỏ tới Node mới p.',
          codeHighlightLines: { c: [6], cpp: [5], pseudo: [3] },
          listState: {
            nodes: updatedList,
            headId: currentNodes[0].id,
            floatingNode: newNode,
            pointerArrows: [
              { fromId: currentNodes[lastIdx].id, toId: newId, label: 'q->next', color: 'active' }
            ],
            activePointers: [
              { name: 'head', targetId: currentNodes[0].id },
              { name: 'q', targetId: currentNodes[lastIdx].id }
            ]
          }
        });

        // BƯỚC 4: Hoàn thành danh sách
        steps.push({
          stepNumber: 4,
          totalSteps: 4,
          title: 'Bước 4: Hoàn tất thêm cuối danh sách',
          description: `Node [${newValue}] chính thức trở thành đuôi mới của danh sách liên kết.`,
          whyExplanation: 'Toàn bộ danh sách liên kết đã thông suốt từ HEAD đến Node [${newValue}] -> NULL.',
          codeHighlightLines: { c: [7], cpp: [6], pseudo: [4] },
          listState: {
            nodes: [...updatedList.map(n => ({ ...n, highlight: 'default' as const })), { ...newNode, highlight: 'new' as const }],
            headId: currentNodes[0].id,
            floatingNode: null,
            activePointers: [{ name: 'head', targetId: currentNodes[0].id }]
          }
        });
        break;
      }

      case 'insertAfter': {
        const safeIdx = Math.min(targetIndex, currentNodes.length - 1);
        const qNode = currentNodes[safeIdx];
        const nextNode = currentNodes[safeIdx + 1];
        const newId = `node-mid-${Date.now()}`;
        const newAddress = '0x1550';

        const newNode: ListNode = {
          id: newId,
          value: newValue,
          address: newAddress,
          nextAddress: null,
          highlight: 'new',
          statusLabel: 'p (Mới)'
        };

        // BƯỚC 1: Xác định vị trí q và tạo Node p
        steps.push({
          stepNumber: 1,
          totalSteps: 4,
          title: `Bước 1: Xác định Node q [${qNode.value}] và tạo Node p`,
          description: `Con trỏ q đang trỏ tới Node [${qNode.value}]. Tạo Node p mang giá trị [${newValue}].`,
          whyExplanation: 'Ta chuẩn bị chèn Node mới vào giữa [${qNode.value}] và Node kế tiếp.',
          codeHighlightLines: { c: [1, 2], cpp: [1, 2], pseudo: [1] },
          listState: {
            nodes: currentNodes.map((n, i) => ({
              ...n,
              highlight: i === safeIdx ? ('target' as const) : ('default' as const),
              statusLabel: i === safeIdx ? 'q' : undefined
            })),
            headId: currentNodes[0].id,
            floatingNode: newNode,
            activePointers: [
              { name: 'head', targetId: currentNodes[0].id },
              { name: 'q', targetId: qNode.id },
              { name: 'p', targetId: 'floating' }
            ]
          }
        });

        // BƯỚC 2: p->next = q->next
        const connectedNode = {
          ...newNode,
          nextAddress: qNode.nextAddress,
          highlight: 'active' as const
        };

        steps.push({
          stepNumber: 2,
          totalSteps: 4,
          title: 'Bước 2: Nối p với phần sau (p->next = q->next)',
          description: `Gán con trỏ next của p trỏ tới Node đứng sau q (${nextNode ? `[${nextNode.value}]` : 'NULL'}).`,
          whyExplanation: 'CỰC KỲ QUAN TRỌNG: Phải nối p->next = q->next trước! Nếu bạn đổi q->next = p trước, bạn sẽ mất dấu toàn bộ phần còn lại của danh sách!',
          codeHighlightLines: { c: [3], cpp: [3], pseudo: [2] },
          listState: {
            nodes: currentNodes.map((n, i) => ({
              ...n,
              highlight: i === safeIdx ? ('target' as const) : ('default' as const),
              statusLabel: i === safeIdx ? 'q' : undefined
            })),
            headId: currentNodes[0].id,
            floatingNode: connectedNode,
            pointerArrows: nextNode ? [
              { fromId: newId, toId: nextNode.id, label: 'p->next', color: 'active' }
            ] : [],
            activePointers: [
              { name: 'head', targetId: currentNodes[0].id },
              { name: 'q', targetId: qNode.id },
              { name: 'p', targetId: 'floating' }
            ]
          }
        });

        // BƯỚC 3: q->next = p
        steps.push({
          stepNumber: 3,
          totalSteps: 4,
          title: 'Bước 3: Nối q sang p (q->next = p)',
          description: `Cập nhật con trỏ next của Node q [${qNode.value}] trỏ tới Node mới p [${newValue}].`,
          whyExplanation: 'Bây giờ liên kết từ q đã chuyển sang p, và từ p tiếp tục nối tới Node tiếp theo.',
          codeHighlightLines: { c: [4], cpp: [4], pseudo: [3] },
          listState: {
            nodes: currentNodes.map((n, i) => {
              if (i === safeIdx) return { ...n, nextAddress: newAddress, highlight: 'active' as const };
              return { ...n, highlight: 'default' as const };
            }),
            headId: currentNodes[0].id,
            floatingNode: connectedNode,
            pointerArrows: [
              { fromId: qNode.id, toId: newId, label: 'q->next', color: 'active' }
            ],
            activePointers: [
              { name: 'head', targetId: currentNodes[0].id },
              { name: 'q', targetId: qNode.id }
            ]
          }
        });

        // BƯỚC 4: Hoàn tất dàn hàng
        const resultNodes = [...currentNodes];
        resultNodes.splice(safeIdx + 1, 0, { ...connectedNode, highlight: 'new' as const });
        resultNodes[safeIdx].nextAddress = newAddress;

        steps.push({
          stepNumber: 4,
          totalSteps: 4,
          title: 'Bước 4: Hoàn thành chèn sau Node',
          description: `Node [${newValue}] đã nằm ngay ngắn sau Node [${qNode.value}].`,
          whyExplanation: 'Thao tác chèn hoàn tất thành công trong O(1) khi đã có con trỏ q.',
          codeHighlightLines: { c: [5], cpp: [5], pseudo: [4] },
          listState: {
            nodes: resultNodes.map(n => ({ ...n, statusLabel: undefined })),
            headId: currentNodes[0].id,
            floatingNode: null,
            activePointers: [{ name: 'head', targetId: currentNodes[0].id }]
          }
        });
        break;
      }

      case 'deleteHead': {
        if (currentNodes.length === 0) return steps;
        const targetNode = currentNodes[0];
        const nextNode = currentNodes[1];

        // Bước 1: Gán con trỏ tạm temp = head
        steps.push({
          stepNumber: 1,
          totalSteps: 4,
          title: 'Bước 1: Giữ tạm địa chỉ Node đầu (temp = head)',
          description: `Tạo con trỏ tạm temp giữ địa chỉ của Node [${targetNode.value}] để tí nữa gọi free().`,
          whyExplanation: 'Nếu không lưu con trỏ tạm, khi HEAD nhảy đi bạn sẽ không còn biết địa chỉ của Node đầu để giải phóng vùng nhớ!',
          codeHighlightLines: { c: [1], cpp: [1], pseudo: [1] },
          listState: {
            nodes: currentNodes.map((n, i) => ({
              ...n,
              highlight: i === 0 ? ('target' as const) : ('default' as const),
              statusLabel: i === 0 ? 'temp' : undefined
            })),
            headId: targetNode.id,
            activePointers: [
              { name: 'head', targetId: targetNode.id },
              { name: 'temp', targetId: targetNode.id }
            ]
          }
        });

        // Bước 2: Dời HEAD sang Node thứ hai (head = head->next)
        steps.push({
          stepNumber: 2,
          totalSteps: 4,
          title: 'Bước 2: Dời HEAD sang Node tiếp theo (head = head->next)',
          description: `Con trỏ HEAD chính thức nhảy sang Node [${nextNode?.value ?? 'NULL'}].`,
          whyExplanation: 'Lúc này Node [${targetNode.value}] đã bị loại khỏi danh sách chính, nhưng ô nhớ của nó vẫn còn nằm trong RAM.',
          codeHighlightLines: { c: [2], cpp: [2], pseudo: [2] },
          listState: {
            nodes: currentNodes.map((n, i) => ({
              ...n,
              highlight: i === 0 ? ('delete' as const) : ('default' as const),
              statusLabel: i === 0 ? 'temp (chuẩn bị xóa)' : (i === 1 ? 'HEAD MỚI' : undefined)
            })),
            headId: nextNode ? nextNode.id : null,
            activePointers: [
              ...(nextNode ? [{ name: 'head', targetId: nextNode.id }] : []),
              { name: 'temp', targetId: targetNode.id }
            ]
          }
        });

        // Bước 3: Thu hồi vùng nhớ (free(temp) / delete temp)
        steps.push({
          stepNumber: 3,
          totalSteps: 4,
          title: 'Bước 3: Giải phóng bộ nhớ Node đầu (free(temp))',
          description: `Gọi lệnh free(temp) để trả lại ô nhớ ${targetNode.address} cho hệ điều hành.`,
          whyExplanation: 'Giải phóng bộ nhớ ngăn chặn rò rỉ RAM (Memory Leak) trong các ứng dụng chạy dài hạn.',
          codeHighlightLines: { c: [3], cpp: [3], pseudo: [3] },
          listState: {
            nodes: currentNodes.map((n, i) => ({
              ...n,
              highlight: i === 0 ? ('delete' as const) : ('default' as const),
              statusLabel: i === 0 ? 'Đang giải phóng...' : undefined
            })),
            headId: nextNode ? nextNode.id : null,
            activePointers: nextNode ? [{ name: 'head', targetId: nextNode.id }] : []
          }
        });

        // Bước 4: Danh sách mới sau khi xóa
        steps.push({
          stepNumber: 4,
          totalSteps: 4,
          title: 'Bước 4: Hoàn thành xóa Node đầu',
          description: nextNode ? `Danh sách mới bắt đầu từ Node [${nextNode.value}].` : 'Danh sách đã trở về rỗng (HEAD = NULL).',
          whyExplanation: 'Thao tác xóa đầu hoàn thành trong O(1).',
          codeHighlightLines: { c: [4], cpp: [4], pseudo: [4] },
          listState: {
            nodes: currentNodes.slice(1).map(n => ({ ...n, highlight: 'default' as const, statusLabel: undefined })),
            headId: nextNode ? nextNode.id : null,
            activePointers: nextNode ? [{ name: 'head', targetId: nextNode.id }] : []
          }
        });
        break;
      }

      case 'deleteTail': {
        if (currentNodes.length <= 1) {
          // Chỉ có 1 Node hoặc rỗng -> xử lý như xóa đầu
          return generateSteps(currentNodes, 'deleteHead', newValue, 0, listType);
        }

        const secondLastIdx = currentNodes.length - 2;
        const lastIdx = currentNodes.length - 1;
        const qNode = currentNodes[secondLastIdx];
        const pNode = currentNodes[lastIdx];

        // Bước 1: Tìm Node kế cuối q và Node cuối p
        steps.push({
          stepNumber: 1,
          totalSteps: 4,
          title: 'Bước 1: Tìm Node áp chót (q) và Node cuối (p)',
          description: `Duyệt tìm Node [${qNode.value}] (đứng trước) và Node [${pNode.value}] (cần xóa).`,
          whyExplanation: 'Trong danh sách liên kết đơn, muốn xóa đuôi ta buộc phải biết Node đứng ngay trước đuôi để ngắt liên kết.',
          codeHighlightLines: { c: [1, 2, 3], cpp: [1, 2], pseudo: [1] },
          listState: {
            nodes: currentNodes.map((n, i) => ({
              ...n,
              highlight: i === secondLastIdx ? ('target' as const) : (i === lastIdx ? ('delete' as const) : ('default' as const)),
              statusLabel: i === secondLastIdx ? 'q (kế cuối)' : (i === lastIdx ? 'p (cuối)' : undefined)
            })),
            headId: currentNodes[0].id,
            activePointers: [
              { name: 'head', targetId: currentNodes[0].id },
              { name: 'q', targetId: qNode.id },
              { name: 'p', targetId: pNode.id }
            ]
          }
        });

        // Bước 2: q->next = NULL
        steps.push({
          stepNumber: 2,
          totalSteps: 4,
          title: 'Bước 2: Ngắt liên kết Node cuối (q->next = NULL)',
          description: `Gán trường next của Node [${qNode.value}] thành NULL. Lúc này [${qNode.value}] trở thành đuôi mới.`,
          whyExplanation: 'Bỏ qua Node [${pNode.value}], đánh dấu kết thúc danh sách an toàn.',
          codeHighlightLines: { c: [4], cpp: [3], pseudo: [2] },
          listState: {
            nodes: currentNodes.map((n, i) => ({
              ...n,
              nextAddress: i === secondLastIdx ? null : n.nextAddress,
              highlight: i === secondLastIdx ? ('active' as const) : (i === lastIdx ? ('delete' as const) : ('default' as const))
            })),
            headId: currentNodes[0].id,
            activePointers: [
              { name: 'head', targetId: currentNodes[0].id },
              { name: 'q', targetId: qNode.id },
              { name: 'p', targetId: pNode.id }
            ]
          }
        });

        // Bước 3: free(p)
        steps.push({
          stepNumber: 3,
          totalSteps: 4,
          title: 'Bước 3: Giải phóng bộ nhớ Node cuối (free(p))',
          description: `Thu hồi ô nhớ của Node [${pNode.value}] để tránh lãng phí RAM.`,
          whyExplanation: 'Vùng nhớ của p được hoàn trả về Heap.',
          codeHighlightLines: { c: [5], cpp: [4], pseudo: [3] },
          listState: {
            nodes: currentNodes.slice(0, lastIdx).map(n => ({ ...n, highlight: 'default' as const })),
            headId: currentNodes[0].id,
            activePointers: [{ name: 'head', targetId: currentNodes[0].id }]
          }
        });

        // Bước 4: Kết quả
        steps.push({
          stepNumber: 4,
          totalSteps: 4,
          title: 'Bước 4: Hoàn tất xóa Node cuối',
          description: `Danh sách còn ${currentNodes.length - 1} phần tử kết thúc tại Node [${qNode.value}] -> NULL.`,
          whyExplanation: 'Thời gian thực thi O(n) do phải duyệt từ đầu đến áp chót.',
          codeHighlightLines: { c: [6], cpp: [5], pseudo: [4] },
          listState: {
            nodes: currentNodes.slice(0, lastIdx).map(n => ({ ...n, highlight: 'default' as const, statusLabel: undefined })),
            headId: currentNodes[0].id,
            activePointers: [{ name: 'head', targetId: currentNodes[0].id }]
          }
        });
        break;
      }

      case 'deleteNode': {
        // Xóa theo vị trí / xóa sau Node
        const safeIdx = Math.min(targetIndex, currentNodes.length - 1);
        if (safeIdx === 0) {
          return generateSteps(currentNodes, 'deleteHead', newValue, 0, listType);
        }
        if (safeIdx === currentNodes.length - 1) {
          return generateSteps(currentNodes, 'deleteTail', newValue, 0, listType);
        }

        const qNode = currentNodes[safeIdx - 1];
        const pNode = currentNodes[safeIdx];
        const nextNode = currentNodes[safeIdx + 1];

        // Bước 1: Xác định q và p
        steps.push({
          stepNumber: 1,
          totalSteps: 4,
          title: `Bước 1: Xác định Node cần xóa [${pNode.value}] và Node đứng trước [${qNode.value}]`,
          description: `Con trỏ q trỏ vào [${qNode.value}], con trỏ p trỏ vào Node [${pNode.value}] cần xóa.`,
          whyExplanation: 'Để xóa một Node ở giữa, luôn cần nắm giữ Node đứng ngay trước nó.',
          codeHighlightLines: { c: [1, 2], cpp: [1, 2], pseudo: [1] },
          listState: {
            nodes: currentNodes.map((n, i) => ({
              ...n,
              highlight: i === safeIdx - 1 ? ('target' as const) : (i === safeIdx ? ('delete' as const) : ('default' as const)),
              statusLabel: i === safeIdx - 1 ? 'q' : (i === safeIdx ? 'p' : undefined)
            })),
            headId: currentNodes[0].id,
            activePointers: [
              { name: 'head', targetId: currentNodes[0].id },
              { name: 'q', targetId: qNode.id },
              { name: 'p', targetId: pNode.id }
            ]
          }
        });

        // Bước 2: Bắc cầu qua p (q->next = p->next)
        steps.push({
          stepNumber: 2,
          totalSteps: 4,
          title: 'Bước 2: Bắc cầu vượt qua Node p (q->next = p->next)',
          description: `Gán q->next trỏ thẳng sang Node [${nextNode.value}], hoàn toàn bỏ qua Node [${pNode.value}].`,
          whyExplanation: 'Đường liên kết đã vòng qua Node [${pNode.value}], bảo toàn tính liên tục của danh sách.',
          codeHighlightLines: { c: [3], cpp: [3], pseudo: [2] },
          listState: {
            nodes: currentNodes.map((n, i) => ({
              ...n,
              nextAddress: i === safeIdx - 1 ? nextNode.address : n.nextAddress,
              highlight: i === safeIdx ? ('delete' as const) : (i === safeIdx - 1 ? ('active' as const) : ('default' as const))
            })),
            headId: currentNodes[0].id,
            pointerArrows: [
              { fromId: qNode.id, toId: nextNode.id, label: 'q->next = p->next', color: 'active' }
            ],
            activePointers: [
              { name: 'head', targetId: currentNodes[0].id },
              { name: 'q', targetId: qNode.id },
              { name: 'p', targetId: pNode.id }
            ]
          }
        });

        // Bước 3: free(p)
        steps.push({
          stepNumber: 3,
          totalSteps: 4,
          title: 'Bước 3: Giải phóng ô nhớ Node p (free(p))',
          description: `Xóa Node [${pNode.value}] khỏi bộ nhớ RAM.`,
          whyExplanation: 'Vùng nhớ được thu hồi an toàn.',
          codeHighlightLines: { c: [4], cpp: [4], pseudo: [3] },
          listState: {
            nodes: currentNodes.filter((_, i) => i !== safeIdx).map(n => ({ ...n, highlight: 'default' as const })),
            headId: currentNodes[0].id,
            activePointers: [{ name: 'head', targetId: currentNodes[0].id }]
          }
        });

        // Bước 4: Danh sách hoàn tất
        steps.push({
          stepNumber: 4,
          totalSteps: 4,
          title: 'Bước 4: Hoàn thành xóa Node ở giữa',
          description: `Danh sách được nối liền từ [${qNode.value}] sang [${nextNode.value}].`,
          whyExplanation: 'Không có phần tử nào bị mất tích và RAM sạch sẽ.',
          codeHighlightLines: { c: [5], cpp: [5], pseudo: [4] },
          listState: {
            nodes: currentNodes.filter((_, i) => i !== safeIdx).map(n => ({ ...n, highlight: 'default' as const, statusLabel: undefined })),
            headId: currentNodes[0].id,
            activePointers: [{ name: 'head', targetId: currentNodes[0].id }]
          }
        });
        break;
      }

      case 'traverse': {
        // Duyệt từng bước
        currentNodes.forEach((node, i) => {
          steps.push({
            stepNumber: i + 1,
            totalSteps: currentNodes.length + 1,
            title: `Bước ${i + 1}: Duyệt Node thứ ${i + 1} ([${node.value}])`,
            description: `Con trỏ p đang ở Node [${node.value}] (địa chỉ ${node.address}). In giá trị: ${node.value}. Chuẩn bị sang p = p->next.`,
            whyExplanation: 'Vòng lặp lần theo con trỏ next của từng Node, không nhảy cóc được.',
            codeHighlightLines: { c: [2, 3], cpp: [2, 3], pseudo: [2] },
            listState: {
              nodes: currentNodes.map((n, idx) => ({
                ...n,
                highlight: idx === i ? ('active' as const) : (idx < i ? ('target' as const) : ('default' as const)),
                statusLabel: idx === i ? 'p (hiện tại)' : undefined
              })),
              headId: currentNodes[0].id,
              activePointers: [
                { name: 'head', targetId: currentNodes[0].id },
                { name: 'p', targetId: node.id }
              ]
            }
          });
        });

        steps.push({
          stepNumber: currentNodes.length + 1,
          totalSteps: currentNodes.length + 1,
          title: `Bước ${currentNodes.length + 1}: Gặp NULL - Kết thúc duyệt!`,
          description: 'p->next = NULL => p trở thành NULL. Điều kiện while (p != NULL) sai, kết thúc quá trình duyệt.',
          whyExplanation: 'NULL là cột mốc báo hiệu đã duyệt hết toàn bộ danh sách liên kết.',
          codeHighlightLines: { c: [4], cpp: [4], pseudo: [3] },
          listState: {
            nodes: currentNodes.map(n => ({ ...n, highlight: 'target' as const, statusLabel: undefined })),
            headId: currentNodes[0].id,
            activePointers: [{ name: 'head', targetId: currentNodes[0].id }]
          }
        });
        break;
      }
    }
  } else if (listType === 'doubly') {
    // Doubly Linked List Steps
    switch (op) {
      case 'insertHead': {
        const newId = `dnode-new-${Date.now()}`;
        const newAddress = '0x2050';
        const oldHead = currentNodes[0];

        const newNode: ListNode = {
          id: newId,
          value: newValue,
          address: newAddress,
          prevAddress: null,
          nextAddress: null,
          highlight: 'new',
          statusLabel: 'p (Mới)'
        };

        steps.push({
          stepNumber: 1,
          totalSteps: 4,
          title: 'Bước 1: Tạo Node kép mới p',
          description: `Cấp phát Node kép với DATA = ${newValue}, PREV = NULL, NEXT = NULL.`,
          whyExplanation: 'Node kép có 2 con trỏ: prev trỏ lùi và next trỏ tiến.',
          codeHighlightLines: { c: [1, 2], cpp: [1, 2], pseudo: [1] },
          listState: {
            nodes: currentNodes.map(n => ({ ...n, highlight: 'default' as const })),
            headId: oldHead?.id || null,
            floatingNode: newNode,
            activePointers: [{ name: 'head', targetId: oldHead?.id || 'NULL' }, { name: 'p', targetId: 'floating' }]
          }
        });

        steps.push({
          stepNumber: 2,
          totalSteps: 4,
          title: 'Bước 2: Nối tiến (p->next = head)',
          description: `Gán p->next trỏ tới Node [${oldHead?.value ?? 'NULL'}].`,
          whyExplanation: 'Kết nối đường xuôi từ Node mới sang danh sách cũ.',
          codeHighlightLines: { c: [3], cpp: [3], pseudo: [2] },
          listState: {
            nodes: currentNodes.map(n => ({ ...n, highlight: 'default' as const })),
            headId: oldHead?.id || null,
            floatingNode: { ...newNode, nextAddress: oldHead?.address || null, highlight: 'active' as const },
            activePointers: [{ name: 'head', targetId: oldHead?.id || 'NULL' }, { name: 'p', targetId: 'floating' }]
          }
        });

        steps.push({
          stepNumber: 3,
          totalSteps: 4,
          title: 'Bước 3: Nối lùi (head->prev = p)',
          description: `Gán trường prev của Node [${oldHead?.value}] trỏ ngược về Node mới p (${newAddress}).`,
          whyExplanation: 'Đây là đặc trưng của Linked List kép: 2 Node liên kết 2 chiều qua lại!',
          codeHighlightLines: { c: [4], cpp: [4], pseudo: [3] },
          listState: {
            nodes: currentNodes.map((n, i) => i === 0 ? { ...n, prevAddress: newAddress, highlight: 'active' as const } : n),
            headId: oldHead?.id || null,
            floatingNode: { ...newNode, nextAddress: oldHead?.address || null, highlight: 'active' as const },
            activePointers: [{ name: 'head', targetId: oldHead?.id || 'NULL' }, { name: 'p', targetId: 'floating' }]
          }
        });

        steps.push({
          stepNumber: 4,
          totalSteps: 4,
          title: 'Bước 4: Cập nhật HEAD (head = p)',
          description: `HEAD chuyển sang trỏ vào Node [${newValue}]. Hoàn tất!`,
          whyExplanation: 'Danh sách kép bây giờ có thể duyệt tiến từ HEAD hoặc duyệt lùi.',
          codeHighlightLines: { c: [5], cpp: [5], pseudo: [4] },
          listState: {
            nodes: [
              { ...newNode, nextAddress: oldHead?.address || null, highlight: 'new' as const, statusLabel: 'HEAD' },
              ...currentNodes.map((n, i) => i === 0 ? { ...n, prevAddress: newAddress, highlight: 'default' as const, statusLabel: undefined } : { ...n, highlight: 'default' as const })
            ],
            headId: newId,
            floatingNode: null,
            activePointers: [{ name: 'head', targetId: newId }]
          }
        });
        break;
      }

      default: {
        // Standard fallback for doubly list operations
        return generateSteps(currentNodes, op, newValue, targetIndex, 'singly');
      }
    }
  } else if (listType === 'circular') {
    // Circular Linked List Steps
    switch (op) {
      case 'traverse': {
        currentNodes.forEach((node, i) => {
          steps.push({
            stepNumber: i + 1,
            totalSteps: currentNodes.length + 1,
            title: `Bước ${i + 1}: Thăm Node [${node.value}]`,
            description: `Con trỏ p đang ở Node [${node.value}].`,
            whyExplanation: 'Duyệt danh sách vòng cần kiểm tra p->next == head để biết khi nào hoàn tất 1 vòng.',
            codeHighlightLines: { c: [2, 3], cpp: [2, 3], pseudo: [2] },
            listState: {
              nodes: currentNodes.map((n, idx) => ({
                ...n,
                highlight: idx === i ? ('active' as const) : ('default' as const)
              })),
              headId: currentNodes[0].id,
              activePointers: [{ name: 'head', targetId: currentNodes[0].id }, { name: 'p', targetId: node.id }]
            }
          });
        });

        steps.push({
          stepNumber: currentNodes.length + 1,
          totalSteps: currentNodes.length + 1,
          title: 'Bước Cuối: Phát hiện Node cuối trỏ về HEAD (Vòng khép kín)',
          description: `Node [${currentNodes[currentNodes.length - 1].value}] có con trỏ next trỏ về lại HEAD (${currentNodes[0].address}). Vòng lặp dừng lại!`,
          whyExplanation: '⚠️ Chú ý: Nếu dùng điều kiện p != NULL như danh sách đơn, chương trình sẽ rơi vào vòng lặp vô tận (Infinite Loop)!',
          codeHighlightLines: { c: [4, 5], cpp: [4, 5], pseudo: [3] },
          listState: {
            nodes: currentNodes.map(n => ({ ...n, highlight: 'target' as const })),
            headId: currentNodes[0].id,
            activePointers: [{ name: 'head', targetId: currentNodes[0].id }]
          }
        });
        break;
      }

      default: {
        return generateSteps(currentNodes, op, newValue, targetIndex, 'singly');
      }
    }
  }

  return steps;
};
