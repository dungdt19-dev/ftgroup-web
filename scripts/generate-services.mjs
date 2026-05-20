import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'services');

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function decodeEnt(s) {
  return String(s).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

const COMMON_KEYWORDS =
  'FT GROUP E&E, tổ chức sự kiện Hà Nội, sự kiện miền Bắc, âm thanh ánh sáng, cho thuê thiết bị sự kiện';

const PROCESS = [
  { t: 'Tư vấn &amp; khảo sát', p: 'Lắng nghe mục tiêu, ngân sách và đặc thù địa điểm; hiện trường &amp; timeline rõ ràng.' },
  { t: 'Lập kế hoạch &amp; kịch bản', p: 'Concept, rundown, phân luồng nhân sự — bản vẽ sân khấu &amp; danh mục thiết bị minh bạch.' },
  { t: 'Chuẩn bị &amp; setup', p: 'Thiết bị, decor, âm thanh — kiểm tra kỹ thuật, dry-run theo checklist an toàn.' },
  { t: 'Vận hành sự kiện', p: 'Điều phối hiện trường, xử lý sự cố, đồng bộ MC — kỹ thuật &amp; creative.' },
  { t: 'Đánh giá &amp; bàn giao', p: 'Tổng kết, hạ màn, thu dọn — đề xuất tối ưu cho lần tiếp theo.' },
];

const GALLERY_POOL = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=75',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=75',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=75',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=75',
  'https://images.unsplash.com/photo-1598653222000-6b7b7f552368?auto=format&fit=crop&w=900&q=75',
  'https://images.unsplash.com/photo-1544531586-fde5298cef13?auto=format&fit=crop&w=900&q=75',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=900&q=75',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=75',
];

function rotateGallery(seed) {
  const out = [];
  for (let i = 0; i < 5; i++) out.push(GALLERY_POOL[(seed + i) % GALLERY_POOL.length]);
  return out;
}

const SERVICES = [
  {
    id: 'khai-truong',
    file: 'khai-truong.html',
    title: 'Tổ chức khai trương Hà Nội chuyên nghiệp | FT GROUP E&amp;E',
    desc:
      'Tổ chức khai trương Hà Nội trọn gói: sân khấu, âm thanh ánh sáng, MC, kịch bản cắt băng. FT GROUP E&amp;E — Trao giá trị, tạo niềm tin. Miền Bắc.',
    h1: 'Tổ chức khai trương Hà Nội',
    heroLede:
      'Khai trương cửa hàng, showroom, chi nhánh — concept ấn tượng, dàn dựng sang trọng, vận hành êm ái trong phạm vi miền Bắc.',
    heroImg:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, tổ chức khai trương Hà Nội`,
    introH2: 'Giới thiệu dịch vụ khai trương',
    introP: [
      'Lễ khai trương là điểm chạm đầu tiên với khách hàng và đối tác. FT GROUP E&amp;E thiết kế trải nghiệm có nhịp — từ welcome, ribbon cutting đến mini show — sao cho thương hiệu được nhớ và chia sẻ.',
      'Chúng tôi phối hợp trang trí, âm thanh, ánh sáng và nhân sự hiện trường theo một quy trình chuẩn, hạn chế rủi ro và tối ưu thời lượng gold moment cho báo chí &amp; mạng xã hội.',
    ],
    benefits: [
      { t: 'Ấn tượng thương hiệu', d: 'Câu chuyện trên sân khấu, backdrop và ánh sáng nhấn đúng key visual.' },
      { t: 'An toàn &amp; đúng giờ', d: 'Rà soát điện, tải âm thanh, phân luồng khách — kịch bản rõ ràng.' },
      { t: 'Một đầu mối', d: 'Từ thiết bị đến nhân sự; giao tiếp gọn, báo giá minh bạch.' },
    ],
    features: [
      { t: 'Thiết bị sân khấu', d: 'Loa line array, mixer, wireless mic, LED backdrop theo quy mô không gian.' },
      { t: 'Nhân sự', d: 'Điều phối, MC/host, hỗ trợ lễ tân và kỹ thuật âm thanh tại chỗ.' },
      { t: 'Kế hoạch sự kiện', d: 'Rundown, phân công, kịch bản ribbon — tối ưu cho không gian hẹp hoặc mở.' },
      { t: 'Setup &amp; chạy show', d: 'Lắp đặt, soundcheck, rehearsal ngắn trước giờ G.' },
      { t: 'Quy trình chuyên nghiệp', d: 'Checklist kỹ thuật, backup thiết bị theo nhu cầu.' },
      { t: 'Hậu kỳ', d: 'Hạ hình, thu dọn nhanh — cam kết tiến độ bàn giao mặt bằng.' },
    ],
    gallerySeed: 0,
    related: ['hoi-nghi', 'ra-mat-san-pham', 'cho-thue-thiet-bi'],
  },
  {
    id: 'khoi-cong-khanh-thanh',
    file: 'khoi-cong-khanh-thanh.html',
    title: 'Tổ chức lễ khánh thành &amp; khởi công | FT GROUP E&amp;E Miền Bắc',
    desc:
      'Tổ chức lễ khánh thành, động thổ, khởi công công trình tại Hà Nội và miền Bắc. Sân khấu ngoài trời, âm thanh, nghi lễ trang trọng — FT GROUP E&amp;E.',
    h1: 'Khởi công &amp; khánh thành',
    heroLede:
      'Nghi thức trang trọng, sân khấu chịu thời tiết, đội kỹ thuật onsite — phù hợp dự án bất động sản, nhà máy, hạ tầng.',
    heroImg:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, tổ chức lễ khánh thành, lễ khởi công Hà Nội`,
    introH2: 'Lễ khánh thành &amp; khởi công chuyên nghiệp',
    introP: [
      'Lễ động thổ hay khánh thành cần sự chỉn chu về protocol, thời gian và an toàn công trường. Chúng tôi dựng sân khấu, hệ thống âm thanh và hỗ trợ nghi lễ phù hợp quy mô đại biểu.',
      'FT GROUP E&amp;E đồng hành từ khảo sát mặt bằng, phương án che nắng/mưa đến vận hành buổi lễ — đảm bảo hình ảnh truyền thông và trải nghiệm đại biểu.',
    ],
    benefits: [
      { t: 'Phù hợp công trường', d: 'Thiết kế sân khấu, tải điện và an toàn lao động được ưu tiên.' },
      { t: 'Trang trọng', d: 'Nhịp chương trình, MC dẫn lễ, phối hợp ban tổ chức và đơn vị thi công.' },
      { t: 'Truyền thông', d: 'Khu vực check-in, backdrop, chỗ chụp cho đối tác và báo chí.' },
    ],
    features: [
      { t: 'Thiết bị', d: 'Âm thanh công suất lớn ngoài trời, màn hình LED/màn led cột khi cần.' },
      { t: 'Nhân sự', d: 'Điều phối, kỹ thuật âm thanh, hỗ trợ nghi thức và an ninh sân khấu.' },
      { t: 'Quy hoạch', d: 'Sơ đồ chỗ đứng, lịch diễn thử, phối hợp đơn vị khánh thành.' },
      { t: 'Lắp đặt', d: 'Ráp sân khấu, che mưa nắng, cố định khung an toàn.' },
      { t: 'Vận hành', d: 'Đồng bộ MC, video, hiệu ứng ánh sáng theo rundown.' },
      { t: 'Handover', d: 'Tháo dỡ có kiểm soát, bàn giao mặt bằng cho chủ đầu tư.' },
    ],
    gallerySeed: 1,
    related: ['khai-truong', 'ky-niem-thanh-lap', 'cho-thue-thiet-bi'],
  },
  {
    id: 'tiec-cuoi-nam',
    file: 'tiec-cuoi-nam.html',
    title: 'Tổ chức tiệc cuối năm doanh nghiệp | FT GROUP E&amp;E',
    desc:
      'Year-end party, gala dinner, gameshow — concept sáng tạo, sân khấu và ánh sáng đẳng cấp. Tổ chức tiệc cuối năm trọn gói tại Hà Nội &amp; miền Bắc.',
    h1: 'Tiệc cuối năm',
    heroLede:
      'Đêm gala gắn kết — kịch bản tương tác, ánh sáng cinematic, âm thanh đầy năng lượng cho tập thể.',
    heroImg:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, tiệc cuối năm doanh nghiệp, year end party Hà Nội`,
    introH2: 'Year-end party trọn gói',
    introP: [
      'Tiệc cuối năm là dịp tôn vinh và kết nối. Chúng tôi xây dựng concept phù hợp văn hoá doanh nghiệp — từ sân khấu, ánh sáng, đến gameshow và phần trao giải.',
      'Đội ngũ FT GROUP E&amp;E vận hành trơn tru: lên rundown, quản lý tốc độ chương trình, hỗ trợ ban lãnh đạo và ban tổ chức nội bộ.',
    ],
    benefits: [
      { t: 'Trải nghiệm đồng điệu', d: 'Key visual, ánh sáng và nhạc nền đồng bộ từng khoảnh khắc.' },
      { t: 'Tương tác', d: 'Game, quay thưởng, live vote — tùy quy mô và không gian.' },
      { t: 'Tối ưu ngân sách', d: 'Gói linh hoạt theo số khách và địa điểm.' },
    ],
    features: [
      { t: 'Thiết bị sự kiện', d: 'Đèn beam, moving head, smoke/hazer theo concept.' },
      { t: 'Nhân sự sự kiện', d: 'Host/MC, điều phối, PG hỗ trợ lễ tân &amp; backstage.' },
      { t: 'Kịch bản', d: 'Gala, awards, live band/DJ — rundown minute-by-minute.' },
      { t: 'Setup sảnh tiệc', d: 'Sân khấu trung tâm, line array, monitor cho ban nhạc.' },
      { t: 'Quy trình', d: 'Rehearsal MC, soundcheck, timing với nhà hàng/khách sạn.' },
      { t: 'Hậu kỳ', d: 'Thu dọn gọn trong khung giờ bàn giao địa điểm.' },
    ],
    gallerySeed: 2,
    related: ['hoi-nghi', 'hoi-thao', 'cung-cap-nhan-su'],
  },
  {
    id: 'hoi-nghi',
    file: 'hoi-nghi.html',
    title: 'Tổ chức hội nghị chuyên nghiệp Hà Nội | FT GROUP E&amp;E',
    desc:
      'Tổ chức hội nghị khách hàng, hội nghị tổng kết, đại hội cổ đông. Âm thanh rõ, màn hình led, vận hành đồng bộ — FT GROUP E&amp;E miền Bắc.',
    h1: 'Tổ chức hội nghị chuyên nghiệp',
    heroLede:
      'Không gian trang trọng — hybrid ready, mic dàn, ánh sáng hội trường, kỹ thuật onsite xuyên suốt phiên làm việc.',
    heroImg:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, tổ chức hội nghị chuyên nghiệp, hội nghị Hà Nội`,
    introH2: 'Hội nghị doanh nghiệp &amp; đại hội',
    introP: [
      'Hội nghị đòi hỏi độ tin cậy kỹ thuật: giọng nói rõ, slide/video phát đồng bộ, livestream ổn định khi cần.',
      'FT GROUP E&amp;E cung cấp bản vẽ bố trí thiết bị, micro không dây đa kênh, màn hình LED hoặc projector mapping theo sơ đồ hội trường.',
    ],
    benefits: [
      { t: 'Uy tín hiện trường', d: 'Kỹ thuật viên túc trực, xử lý nhanh feedback và chuyển tiết mục.' },
      { t: 'Rõ ràng &amp; minh bạch', d: 'Danh mục thiết bị, timeline setup trước giờ khai mạc.' },
      { t: 'Đồng bộ thương hiệu', d: 'Backdrop, signage dẫn lối, ánh sáng chụp ảnh đại biểu.' },
    ],
    features: [
      { t: 'Âm thanh hội trường', d: 'Mixer digital, wireless handheld &amp; headset, processor.' },
      { t: 'Hình ảnh', d: 'LED indoor, switcher, signal path redundant khi cần.' },
      { t: 'Kế hoạch', d: 'Rundown phiên họp, rehearsal đại diễn giả, backup slide.' },
      { t: 'Setup', d: 'Trước giờ G 1–2 ca — test đủ điều kiện AC và line.' },
      { t: 'Vận hành', d: 'Đồng bộ MC, countdown, chuyển cảnh video.' },
      { t: 'Hybrid', d: 'Tư vấn camera, thu âm phòng họp cho livestream.' },
    ],
    gallerySeed: 3,
    related: ['hoi-thao', 'tiec-cuoi-nam', 'cho-thue-thiet-bi'],
  },
  {
    id: 'hoi-thao',
    file: 'hoi-thao.html',
    title: 'Tổ chức hội thảo doanh nghiệp | FT GROUP E&amp;E Hà Nội',
    desc:
      'Tổ chức hội thảo chuyên đề, workshop, seminar. Micro hội thảo, màn hình, facilitator — trọn gói tại Hà Nội &amp; miền Bắc.',
    h1: 'Tổ chức hội thảo',
    heroLede:
      'Không gian học tập &amp; trao đổi — thiết bị ổn định, layout bàn họp nhóm, hỗ trợ phiên QA chuyên nghiệp.',
    heroImg:
      'https://images.unsplash.com/photo-1544531586-fde5298cef13?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, tổ chức hội thảo, hội thảo doanh nghiệp Hà Nội`,
    introH2: 'Workshop &amp; seminar',
    introP: [
      'Hội thảo thường có nhiều phiên chia nhóm — chúng tôi bố trí micro zone, màn hình phụ và ánh sáng vừa đủ để tập trung nội dung.',
      'Quy trình chuẩn bị gồm khảo sát hội trường, test độ phủ loa, phối hợp facilitator và đội nội dung khách hàng.',
    ],
    benefits: [
      { t: 'Tập trung nội dung', d: 'Âm thanh rõ, ít vang — thiết kế loa theo kiến trúc phòng.' },
      { t: 'Linh hoạt layout', d: 'Classroom, fishbone, islands — setup nhanh giữa các slot.' },
      { t: 'Hỗ trợ vận hành', d: 'Kỹ thuật đồng hành suốt agenda.' },
    ],
    features: [
      { t: 'Thiết bị', d: 'Micro cổ ngỗng, clip, stage monitor nhỏ cho diễn giả.' },
      { t: 'Nhân sự', d: 'Operator âm thanh, điều phối phòng breakout.' },
      { t: 'Lập kế hoạch', d: 'Agenda, chuyển phòng, backup slide &amp; video clip.' },
      { t: 'Setup', d: 'Label cable, test từng seat quan trọng.' },
      { t: 'Quy trình', d: 'Checklist theo slot thời gian.' },
      { t: 'Tối ưu chi phí', d: 'Gói thiết bị theo số lượng đại biểu thực tế.' },
    ],
    gallerySeed: 4,
    related: ['hoi-nghi', 'cung-cap-nhan-su', 'cho-thue-thiet-bi'],
  },
  {
    id: 'ra-mat-san-pham',
    file: 'ra-mat-san-pham.html',
    title: 'Tổ chức lễ ra mắt sản phẩm | Launch event FT GROUP E&amp;E',
    desc:
      'Launch event, ra mắt sản phẩm — concept sân khấu, mapping ánh sáng, media wall. Tổ chức sự kiện ra mắt tại Hà Nội &amp; miền Bắc.',
    h1: 'Ra mắt sản phẩm',
    heroLede:
      'Khoảnh khắc reveal ấn tượng — runway, key visual, storyboard sân khấu và media showcase đồng bộ.',
    heroImg:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, ra mắt sản phẩm, launch event Hà Nội`,
    introH2: 'Launch event đẳng cấp',
    introP: [
      'Sự kiện ra mắt cần wow moment được dựng có chủ đích: timeline reveal, video product, ánh sáng chase nhịp brand.',
      'FT GROUP E&amp;E phối hợp creative và kỹ thuật để đồng bộ âm thanh, LED và hiệu ứng — phù hợp cả họp báo và khách mời VIP.',
    ],
    benefits: [
      { t: 'Nhịp cảm xúc', d: 'Build-up, drop, khoảng lặng trước reveal — được tính toán trước.' },
      { t: 'Đồng bộ media', d: 'ProRes playback, timecode, backup máy khi cần.' },
      { t: 'Ready cho PR', d: 'Góc chụp đẹp, ánh sáng chủ thể cho KOL/báo chí.' },
    ],
    features: [
      { t: 'Sân khấu &amp; LED', d: 'Màn hình cong, runway, light beam theo art direction.' },
      { t: 'Nhân sự', d: 'Showcaller, lighting op, media server support.' },
      { t: 'Ý tưởng', d: 'Storyboard, demo rehearsal với team marketing.' },
      { t: 'Lắp đặt', d: 'Truss, cable management, safety load.' },
      { t: 'Vận hành', d: 'Cue — light, sound, video một nút bấm.' },
      { t: 'Tối ưu địa điểm', d: 'Indoor/outdoor — phương án dự phòng thời tiết.' },
    ],
    gallerySeed: 5,
    related: ['khai-truong', 'hoi-nghi', 'cho-thue-thiet-bi'],
  },
  {
    id: 'ky-niem-thanh-lap',
    file: 'ky-niem-thanh-lap.html',
    title: 'Tổ chức sự kiện kỷ niệm thành lập | FT GROUP E&amp;E',
    desc:
      'Kỷ niệm thành lập công ty, milestone thương hiệu — gala, sân khấu kể chuyện, video hoài niệm. FT GROUP E&amp;E tại Hà Nội &amp; miền Bắc.',
    h1: 'Kỷ niệm thành lập',
    heroLede:
      'Đêm tôn vinh hành trình — video storytelling, phần tri ân nhân sự &amp; đối tác, ánh sáng &amp; âm thanh cảm xúc.',
    heroImg:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, sự kiện kỷ niệm thành lập, gala kỷ niệm`,
    introH2: 'Milestone của thương hiệu',
    introP: [
      'Kỷ niệm thành lập là dịp củng cố văn hoá nội bộ và gửi thông điệp ra bên ngoài. Chúng tôi đề xuất format phù hợp quy mô — từ ấm cúng đến gala.',
      'Kết hợp video hoài niệm, màn trình diễn nghệ thuật, phần vinh danh — tất cả được dàn dựng trên timeline rõ ràng.',
    ],
    benefits: [
      { t: 'Cảm xúc &amp; kỷ niệm', d: 'Narrative dẫn dắt — hạn chế phần thoại dài dòng.' },
      { t: 'Đẳng cấp', d: 'Ăn sáng visual — backdrop, light cue, dresscode sân khấu.' },
      { t: 'Kết nối', d: 'Không gian networking trước/sau gala.' },
    ],
    features: [
      { t: 'Thiết bị', d: 'LED, beam, ambient light cho cảm xúc từng segment.' },
      { t: 'Nhân sự', d: 'Director chương trình, MC, backstage chăm sóc khách.' },
      { t: 'Kịch bản', d: 'Phân đoạn: mở màn — tri ân — tiệc — afterparty.' },
      { t: 'Setup', d: 'Decor, photo zone, chỗ xem video tập thể.' },
      { t: 'Quy trình', d: 'Dry-run với ban lãnh đạo, backup kịch bản MC.' },
      { t: 'Hạ màn', d: 'Thu dọn trong slot nhà hàng — đúng SLA địa điểm.' },
    ],
    gallerySeed: 6,
    related: ['tiec-cuoi-nam', 'khoi-cong-khanh-thanh', 'cung-cap-nhan-su'],
  },
  {
    id: 'cho-thue-thiet-bi',
    file: 'cho-thue-thiet-bi.html',
    title: 'Cho thuê thiết bị sự kiện âm thanh ánh sáng LED | FT GROUP E&amp;E',
    desc:
      'Cho thuê thiết bị sự kiện: loa, mixer, đèn beam, LED, sân khấu — lắp đặt &amp; vận hành kỹ thuật tại Hà Nội &amp; miền Bắc.',
    h1: 'Cho thuê thiết bị sự kiện',
    heroLede:
      'Danh mục đa dạng — book theo list hoặc trọn gói với đội kỹ thuật &amp; vận chuyển trong phạm vi miền Bắc.',
    heroImg:
      'https://images.unsplash.com/photo-1598653222000-6b7b7f552368?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, cho thuê thiết bị sự kiện, thuê âm thanh ánh sáng Hà Nội`,
    introH2: 'Thuê thiết bị &amp; vận hành',
    introP: [
      'Cho thuê thiết bị sự kiện linh hoạt theo catalog — từ bộ âm thanh nhỏ đến dàn beam + LED indoor/outdoor. Báo giá theo ngày/ca và đội kỹ thuật đi kèm.',
      'FT GROUP E&amp;E cam kết kiểm tra thiết bị trước xuất kho, dự phòng cable &amp; máy dự phòng theo tier gói.',
    ],
    benefits: [
      { t: 'Minh bạch catalog', d: 'Model, số lượng, công suất — tránh hidden fee.' },
      { t: 'Kỹ thuật onsite', d: 'Soundcheck, focus đèn, an toàn treo truss.' },
      { t: 'Miền Bắc', d: 'Logistics trong khu vực theo thỏa thuận.' },
    ],
    features: [
      { t: 'Âm thanh', d: 'Line array, sub, monitor, mixer digital, wireless mics.' },
      { t: 'Ánh sáng', d: 'Beam, wash, LED par, console DMX.' },
      { t: 'LED &amp; hình ảnh', d: 'LED modular indoor, processor, switcher.' },
      { t: 'Lắp đặt', d: 'Truss, motor khi cần — thẩm định tải treo.' },
      { t: 'Quy trình thuê', d: 'Hold thiết bị — ký nhận — bàn giao có biên bản.' },
      { t: 'Bảo trì', d: 'Lau lens, test pin mic trước show.' },
    ],
    gallerySeed: 7,
    related: ['hoi-nghi', 'hoi-thao', 'cung-cap-nhan-su'],
  },
  {
    id: 'cung-cap-nhan-su',
    file: 'cung-cap-nhan-su.html',
    title: 'Cung cấp nhân sự sự kiện chuyên nghiệp | FT GROUP E&amp;E Hà Nội',
    desc:
      'Cung cấp nhân sự sự kiện: điều phối, MC, PG/PB, kỹ thuật âm thanh ánh sáng — phối hợp đồng bộ onsite. Miền Bắc.',
    h1: 'Cung cấp nhân sự sự kiện',
    heroLede:
      'Con người là mấu chốt trải nghiệm — đội ngũ được briefing kỹ, đồng phục và attitude chuyên nghiệp trước giờ G.',
    heroImg:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, cung cấp nhân sự sự kiện, PG sự kiện Hà Nội`,
    introH2: 'Nhân sự hiện trường',
    introP: [
      'Cung cấp nhân sự sự kiện theo role: điều phối chương trình, quản lý sân khấu, hỗ trợ lễ tân, vận hành micro/queue.',
      'Chúng tôi training nhanh theo brief khách — checklist từ lúc setup đến hạ màn; phối hợp một cửa với đội kỹ thuật FT.',
    ],
    benefits: [
      { t: 'Thái độ &amp; hình ảnh', d: 'Dresscode, giao tiếp lịch sự — đúng vai trò.' },
      { t: 'Phối hợp một cửa', d: 'Giảm nhiễu giữa nhiều nhà cung cấp.' },
      { t: 'Linh hoạt ca', d: 'Scale nhân sự theo quy mô buổi lễ.' },
    ],
    features: [
      { t: 'Vận hành', d: 'Showcaller phụ, stage manager, timekeeper.' },
      { t: 'Lễ tân &amp; PG', d: 'Check-in, dẫn lối, gift handling.' },
      { t: 'Kỹ thuật', d: 'A2, spotlight assist, IT support sự kiện.' },
      { t: 'Briefing', d: 'File địa điểm, SOP khẩn, contact onsite.' },
      { t: 'Quy trình', d: 'Roleplay nhanh trước giờ — giảm sai sót.' },
      { t: 'Sau sự kiện', d: 'Debrief, ghi nhận cải tiến.' },
    ],
    gallerySeed: 8,
    related: ['tiec-cuoi-nam', 'hoi-nghi', 'hoi-thao'],
  },
];

const NAME_BY_ID = Object.fromEntries(
  SERVICES.map((s) => [s.id, decodeEnt(s.h1.replace(/<[^>]+>/g, ''))])
);

function renderPage(s) {
  const canonical = `https://ftgroup.vn/services/${s.file}`;
  const titlePlain = decodeEnt(s.title);
  const descPlain = decodeEnt(s.desc);
  const kwPlain = decodeEnt(s.keywords);
  const h1Plain = decodeEnt(s.h1.replace(/<[^>]+>/g, ''));
  const gallery = rotateGallery(s.gallerySeed);
  const relatedHtml = s.related
    .map((rid) => {
      const name = NAME_BY_ID[rid] || rid;
      const href = `${rid}.html`;
      return `        <a class="srv-related-card reveal" href="${esc(href)}"><span>Dịch vụ liên quan</span><strong>${esc(name)}</strong></a>`;
    })
    .join('\n');

  const benefitsHtml = s.benefits
    .map(
      (b) => `          <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg><div><strong>${b.t}</strong><p>${b.d}</p></div></li>`
    )
    .join('\n');

  const featuresHtml = s.features
    .map(
      (f, i) => `
        <article class="srv-feature-card reveal" data-delay="${(i % 3) + 1}">
          <div class="srv-feature-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l3 7 7 .5-5 5 1 7-6-3.5L6 21.5l1-7-5-5 7-.5L12 2z"/></svg></div>
          <h3>${f.t}</h3>
          <p>${f.d}</p>
        </article>`
    )
    .join('');

  const processHtml = PROCESS.map(
    (st, i) => `
        <div class="srv-step reveal" data-delay="${(i % 3) + 1}">
          <span class="srv-step-num">${i + 1}</span>
          <h3>${st.t}</h3>
          <p>${st.p}</p>
        </div>`
  ).join('');

  const galleryItems = gallery
    .map(
      (url, i) => `
        <figure class="srv-gallery-item">
          <img src="${esc(url)}" alt="${esc(h1Plain)} — hình ảnh dự án ${i + 1}" width="420" height="280" loading="lazy" decoding="async">
        </figure>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#0f0f10">
  <title>${esc(titlePlain)}</title>
  <meta name="description" content="${esc(descPlain)}">
  <meta name="keywords" content="${esc(kwPlain)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="vi_VN">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${esc(titlePlain)}">
  <meta property="og:description" content="${esc(descPlain)}">
  <meta property="og:image" content="${esc(s.heroImg)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/variables.css">
  <link rel="stylesheet" href="../css/animations.css">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/responsive.css">
  <link rel="stylesheet" href="../css/services.css">
  <link rel="icon" type="image/x-icon" href="../assets/images/logo.ico" sizes="any">
  <script type="application/ld+json">
  ${JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: decodeEnt(s.h1.replace(/<[^>]+>/g, '')),
      description: descPlain,
      url: canonical,
      provider: {
        '@type': 'Organization',
        name: 'Công ty TNHH Du lịch Sự kiện và Giáo dục trải nghiệm FT Group',
        url: 'https://ftgroup.vn/',
      },
      areaServed: { '@type': 'Place', name: 'Miền Bắc, Việt Nam' },
    },
    null,
    2
  )}
  </script>
</head>
<body class="srv-subpage">

<header class="site-header" id="siteHeader">
  <a href="../index.html#home" class="brand brand-with-logo" aria-label="FT GROUP E&amp;E — về trang chủ">
    <img class="brand-logo" src="../assets/images/logo.png" width="160" height="48" alt="Logo FT GROUP E&amp;E" loading="eager">
    <span class="brand-name">FT GROUP <span class="accent">E&amp;E</span></span>
  </a>
  <nav aria-label="Main navigation">
    <ul class="nav-links">
      <li><a href="../index.html#gallery">Dự Án</a></li>
      <li><a href="../index.html#company-intro">Giới Thiệu</a></li>
      <li><a href="../index.html#danh-sach-dich-vu">Danh Sách Dịch Vụ</a></li>
      <li><a href="../index.html#vision-mission">Tầm Nhìn</a></li>
      <li><a href="../index.html#contact">Liên Hệ</a></li>
    </ul>
  </nav>
  <a href="tel:+84964236197" class="nav-cta">Gọi Ngay</a>
  <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileMenu">
    <span></span><span></span><span></span>
  </button>
</header>
<div class="mobile-menu" id="mobileMenu" role="dialog" aria-label="Mobile menu">
  <a href="../index.html#gallery">Dự Án</a>
  <a href="../index.html#company-intro">Giới Thiệu</a>
  <a href="../index.html#danh-sach-dich-vu">Danh Sách Dịch Vụ</a>
  <a href="../index.html#vision-mission">Tầm Nhìn</a>
  <a href="../index.html#contact">Liên Hệ</a>
</div>

<main class="srv-page">
  <article>
    <header class="srv-hero">
      <div class="srv-hero__bg" style="background-image:url('${esc(s.heroImg)}');" role="presentation"></div>
      <div class="srv-hero__tint" aria-hidden="true"></div>
      <div class="srv-hero__content">
        <nav class="srv-breadcrumb" aria-label="Breadcrumb">
          <a href="../index.html#home">Trang chủ</a>
          <span aria-hidden="true"> · </span>
          <a href="../index.html#danh-sach-dich-vu">Danh sách dịch vụ</a>
          <span aria-hidden="true"> · </span>
          <span aria-current="page">${esc(h1Plain)}</span>
        </nav>
        <h1>${s.h1}</h1>
        <p class="srv-hero__lede">${s.heroLede}</p>
      </div>
    </header>

    <section class="srv-section srv-section--alt" aria-labelledby="srv-intro-heading">
      <div class="srv-intro-grid">
        <div class="srv-intro-body">
          <div class="srv-section-head">
            <span class="srv-section-eyebrow">Tổng quan</span>
            <h2 id="srv-intro-heading">${s.introH2}</h2>
          </div>
          <p>${s.introP[0]}</p>
          <p>${s.introP[1]}</p>
          <h3>Vì sao chọn FT GROUP E&amp;E?</h3>
          <p>Kinh nghiệm triển khai đa định dạng sự kiện giáo dục &amp; doanh nghiệp; quy trình rõ ràng, tư vấn gần gũi và báo giá theo hạng mục — phù hợp mục tiêu truyền thông và ngân sách.</p>
        </div>
        <aside aria-labelledby="benefits-heading">
          <h3 id="benefits-heading" class="visually-hidden">Lợi ích</h3>
          <ul class="srv-benefits">
${benefitsHtml}
          </ul>
        </aside>
      </div>
    </section>

    <section class="srv-section" aria-labelledby="features-heading">
      <div class="srv-section-head">
        <span class="srv-section-eyebrow">Năng lực triển khai</span>
        <h2 id="features-heading">Hạng mục &amp; quy trình</h2>
        <p class="srv-section-lede">Thiết bị, nhân sự, tổ chức ý tưởng, lắp đặt và vận hành — gói trọn hoặc tách module theo nhu cầu.</p>
      </div>
      <div class="srv-features-grid">
${featuresHtml}
      </div>
    </section>

    <section class="srv-portfolio" aria-labelledby="portfolio-heading">
      <div class="srv-section-head">
        <span class="srv-section-eyebrow">Portfolio</span>
        <h2 id="portfolio-heading">Hình ảnh thực chiến</h2>
        <p class="srv-section-lede">Một số tham chiếu chất lượng hình ảnh &amp; bố cục sân khấu — vuốt hoặc dùng nút để xem tiếp.</p>
      </div>
      <div class="srv-gallery-wrap srv-gallery" data-srv-gallery>
        <button type="button" class="srv-gallery-nav srv-gallery-prev" aria-label="Ảnh trước"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
        <div class="srv-gallery-rail">
${galleryItems}
        </div>
        <button type="button" class="srv-gallery-nav srv-gallery-next" aria-label="Ảnh sau"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
      </div>
    </section>

    <section class="srv-section srv-section--alt" aria-labelledby="process-heading">
      <div class="srv-section-head">
        <span class="srv-section-eyebrow">Quy trình</span>
        <h2 id="process-heading">Cách chúng tôi làm việc</h2>
        <p class="srv-section-lede">Năm bước chuẩn agency — minh bạch timeline và trách nhiệm từng bên.</p>
      </div>
      <div class="srv-process-track">
${processHtml}
      </div>
    </section>

    <section class="srv-cta reveal" aria-labelledby="cta-heading">
      <h2 id="cta-heading">Nhận báo giá ngay</h2>
      <p>Để lại thông tin hoặc gọi trực tiếp — đội ngũ FT GROUP E&amp;E phản hồi tư vấn &amp; phương án sơ bộ trong thời gian sớm nhất.</p>
      <div class="srv-cta-actions">
        <a class="srv-btn srv-btn--primary" href="mailto:ftgroup1929@gmail.com?subject=Báo%20giá%20dịch%20vụ">Nhận báo giá ngay</a>
        <a class="srv-btn srv-btn--ghost" href="https://zalo.me/0964236197" target="_blank" rel="noopener">Chat Zalo</a>
        <a class="srv-btn srv-btn--ghost" href="tel:+84964236197">Gọi 0964 236 197</a>
      </div>
    </section>

    <section class="srv-section" aria-labelledby="related-heading">
      <div class="srv-section-head">
        <span class="srv-section-eyebrow">Khác</span>
        <h2 id="related-heading">Dịch vụ liên quan</h2>
        <p class="srv-section-lede">Liên kết nội bộ giúp bạn khám phá thêm gói phù hợp chiến dịch.</p>
      </div>
      <div class="srv-related-grid">
${relatedHtml}
      </div>
    </section>
  </article>
</main>

<footer class="site-footer" id="contact">
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="../index.html#home" class="brand brand-with-logo brand-footer">
        <img class="brand-logo" src="../assets/images/logo.png" width="160" height="48" alt="Logo FT GROUP E&amp;E" loading="lazy">
        <span class="brand-name">FT GROUP <span class="accent">E&amp;E</span></span>
      </a>
      <p><strong>Công ty TNHH Du lịch Sự kiện và Giáo dục trải nghiệm FT Group</strong> — giáo dục trải nghiệm, tổ chức sự kiện trọn gói và thiết bị sân khấu. <strong>MST:</strong> 0110845698</p>
      <div class="footer-socials">
        <a href="mailto:ftgroup1929@gmail.com" class="social-btn" aria-label="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
        </a>
        <a href="https://zalo.me/0964236197" class="social-btn" aria-label="Zalo" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.5 2 2 5.9 2 10.7c0 2.6 1.4 4.9 3.5 6.4-.1.9-.5 2.4-.5 2.6 0 .3.1.4.4.3.2-.1 2.3-1.5 3.2-2.1.9.2 1.9.3 2.9.3 5.5 0 10-3.9 10-8.7C22 5.9 17.5 2 12 2z"/></svg>
        </a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Khám phá</h4>
      <ul>
        <li><a href="../index.html#gallery">Dự Án</a></li>
        <li><a href="../index.html#danh-sach-dich-vu">Danh sách dịch vụ</a></li>
        <li><a href="../index.html#contact">Liên hệ</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Liên hệ</h4>
      <div class="contact-row">
        <span>Thôn Đông, Tàm Xá, Đông Anh, Hà Nội</span>
      </div>
      <div class="contact-row">
        <a href="tel:+84964236197">0964 236 197</a> · <a href="tel:+84382032759">0382 032 759</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div>© <span id="currentYear">2026</span> FT GROUP E&amp;E.</div>
  </div>
</footer>

<div class="float-stack" aria-label="Liên hệ nhanh">
  <a href="https://zalo.me/0964236197" class="float-btn float-zalo" target="_blank" rel="noopener" aria-label="Chat Zalo">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.5 2 2 5.9 2 10.7c0 2.6 1.4 4.9 3.5 6.4-.1.9-.5 2.4-.5 2.6 0 .3.1.4.4.3.2-.1 2.3-1.5 3.2-2.1.9.2 1.9.3 2.9.3 5.5 0 10-3.9 10-8.7C22 5.9 17.5 2 12 2z"/></svg>
    <span class="float-tip">Chat Zalo</span>
  </a>
  <a href="tel:+84964236197" class="float-btn float-call" aria-label="Gọi ngay">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
    <span class="float-tip">0964 236 197</span>
  </a>
</div>

<script src="../js/navbar.js" defer></script>
<script src="../js/service-gallery.js" defer></script>
<script src="../js/main.js" defer></script>
</body>
</html>`;
}

mkdirSync(outDir, { recursive: true });
for (const s of SERVICES) {
  writeFileSync(join(outDir, s.file), renderPage(s), 'utf8');
}
console.log('Wrote', SERVICES.length, 'service pages to', outDir);
