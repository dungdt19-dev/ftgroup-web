import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  renderMasonryGallery,
  renderBenefitsStrip,
  renderContactCta,
  renderLightboxMarkup,
  SERVICE_PAGE_ASSETS,
  SERVICE_PAGE_SCRIPTS,
} from './service-shared.mjs';
import { getServiceHeroImage } from './service-images.mjs';
import { toAbsoluteSeoImage } from './seo-url.mjs';
import {
  renderSiteNav,
  renderSiteFooter,
  renderFloatStack,
  renderChromeStyles,
} from './site-chrome.mjs';

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
  { t: 'Tư vấn &amp; khảo sát', p: 'Lắng nghe mục tiêu, ngân sách và đặc thù địa điểm; khảo sát địa điểm &amp; timeline rõ ràng.' },
  { t: 'Lập kế hoạch &amp; kịch bản', p: 'Concept, rundown, phân luồng nhân sự — bản vẽ sân khấu &amp; danh mục thiết bị minh bạch.' },
  { t: 'Chuẩn bị &amp; setup', p: 'Thiết bị, decor, âm thanh — kiểm tra kỹ thuật, dry-run theo checklist an toàn.' },
  { t: 'Vận hành sự kiện', p: 'Điều phối tại sự kiện, xử lý sự cố, đồng bộ MC — kỹ thuật và nội dung chương trình.' },
  { t: 'Đánh giá &amp; bàn giao', p: 'Tổng kết, hạ màn, thu dọn — đề xuất tối ưu cho lần tiếp theo.' },
];

const SERVICES = [
  {
    id: 'khai-truong',
    file: 'khai-truong.html',
    title: 'Tổ chức khai trương Hà Nội chuyên nghiệp | FT GROUP E&amp;E',
    desc:
      'Tổ chức khai trương Hà Nội trọn gói: sân khấu, âm thanh ánh sáng, MC, kịch bản cắt băng. FT GROUP E&amp;E — Trao giá trị, tạo niềm tin. Miền Bắc.',
    h1: 'Tổ chức khai trương Hà Nội',
    heroLede:
      'Khai trương cửa hàng, showroom, chi nhánh — concept ấn tượng, dàn dựng sang trọng, vận hành ổn định trong phạm vi miền Bắc.',
    heroImg:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, tổ chức khai trương Hà Nội`,
    introH2: 'Giới thiệu dịch vụ khai trương',
    introP: [
      'Lễ khai trương là điểm chạm đầu tiên với khách hàng và đối tác. FT GROUP E&amp;E thiết kế trải nghiệm có nhịp — từ welcome, ribbon cutting đến mini show — sao cho thương hiệu được nhớ và chia sẻ.',
      'Chúng tôi phối hợp trang trí, âm thanh, ánh sáng và nhân sự sự kiện theo một quy trình chuẩn, hạn chế rủi ro và tối ưu thời lượng khoảnh khắc trọng điểm cho báo chí &amp; mạng xã hội.',
    ],
    benefits: [
      { t: 'Ấn tượng thương hiệu', d: 'Câu chuyện trên sân khấu, backdrop và ánh sáng nhấn đúng key visual.' },
      { t: 'An toàn &amp; đúng giờ', d: 'Rà soát điện, tải âm thanh, phân luồng khách — kịch bản rõ ràng.' },
      { t: 'Một đầu mối', d: 'Từ thiết bị đến nhân sự; giao tiếp rõ ràng, báo giá minh bạch.' },
    ],
    features: [
      { t: 'Thiết bị sân khấu', d: 'Loa line array, mixer, wireless mic, LED backdrop theo quy mô không gian.' },
      { t: 'Nhân sự', d: 'Điều phối, MC/host, hỗ trợ lễ tân và kỹ thuật âm thanh tại chỗ.' },
      { t: 'Kế hoạch sự kiện', d: 'Rundown, phân công, kịch bản ribbon — tối ưu cho không gian hẹp hoặc mở.' },
      { t: 'Setup &amp; chạy show', d: 'Lắp đặt, soundcheck, rehearsal ngắn trước giờ diễn ra.' },
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
      'Đêm gala gắn kết — kịch bản tương tác, ánh sáng sân khấu, âm thanh đầy năng lượng cho tập thể.',
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
      { t: 'Hậu kỳ', d: 'Thu dọn đúng tiến độ trong khung giờ bàn giao địa điểm.' },
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
      { t: 'Uy tín triển khai', d: 'Kỹ thuật viên túc trực, xử lý nhanh feedback và chuyển tiết mục.' },
      { t: 'Rõ ràng &amp; minh bạch', d: 'Danh mục thiết bị, timeline setup trước giờ khai mạc.' },
      { t: 'Đồng bộ thương hiệu', d: 'Backdrop, signage dẫn lối, ánh sáng chụp ảnh đại biểu.' },
    ],
    features: [
      { t: 'Âm thanh hội trường', d: 'Mixer digital, wireless handheld &amp; headset, processor.' },
      { t: 'Hình ảnh', d: 'LED indoor, switcher, signal path redundant khi cần.' },
      { t: 'Kế hoạch', d: 'Rundown phiên họp, rehearsal đại diễn giả, backup slide.' },
      { t: 'Setup', d: 'Trước giờ diễn ra 1–2 ca — test đủ điều kiện AC và line.' },
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
    introH2: 'Sự kiện ra mắt sản phẩm',
    introP: [
      'Sự kiện ra mắt cần điểm nhấn chương trình được dựng có chủ đích: timeline reveal, video product, ánh sáng chase nhịp brand.',
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
      'Danh mục đa dạng — đặt theo danh mục hoặc trọn gói với đội kỹ thuật &amp; vận chuyển trong phạm vi miền Bắc.',
    heroImg:
      'https://images.unsplash.com/photo-1598653222000-6b7b7f552368?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, cho thuê thiết bị sự kiện, thuê âm thanh ánh sáng Hà Nội`,
    introH2: 'Thuê thiết bị &amp; vận hành',
    introP: [
      'Cho thuê thiết bị sự kiện linh hoạt theo catalog — từ bộ âm thanh nhỏ đến dàn beam + LED indoor/outdoor. Báo giá theo ngày/ca và đội kỹ thuật đi kèm.',
      'FT GROUP E&amp;E cam kết kiểm tra thiết bị trước xuất kho, dự phòng cable &amp; máy dự phòng theo tier gói.',
    ],
    benefits: [
      { t: 'Minh bạch catalog', d: 'Model, số lượng, công suất — tránh chi phí phát sinh.' },
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
      'Con người là mấu chốt trải nghiệm — đội ngũ được briefing kỹ, đồng phục và phong thái chuyên nghiệp trước giờ diễn ra.',
    heroImg:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, cung cấp nhân sự sự kiện, PG sự kiện Hà Nội`,
    introH2: 'Nhân sự sự kiện',
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
  {
    id: 'to-chuc-su-kien',
    file: 'to-chuc-su-kien.html',
    title: 'Tổ chức sự kiện trọn gói | FT GROUP E&amp;E',
    desc:
      'Tổ chức sự kiện trọn gói miền Bắc: concept, kịch bản, sân khấu, âm thanh ánh sáng, vận hành sự kiện. FT GROUP E&amp;E — Trao giá trị, tạo niềm tin.',
    h1: 'Tổ chức sự kiện trọn gói',
    heroLede:
      'Một đầu mối cho toàn hành trình: tư vấn concept, kịch bản, sân khấu — âm thanh, ánh sáng — đội ngũ sự kiện và hậu kỳ trong phạm vi miền Bắc.',
    heroImg:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, tổ chức sự kiện trọn gói`,
    introH2: 'Tổ chức sự kiện theo mục tiêu thương hiệu',
    introP: [
      'Chúng tôi đồng hành từ giai đoạn chào thầu ý tưởng đến giờ diễn ra: dàn dựng không gian, điều phối rundown, xử lý sự cố kỹ thuật và đảm bảo trải nghiệm khách mời nhất quán với key visual.',
      'Phương án có thể triển khai trọn gói hoặc tách module theo ngân sách — luôn có báo giá theo hạng mục, timeline rõ ràng và checklist an toàn tại địa điểm.',
    ],
    benefits: [
      { t: 'Kịch bản &amp; sân khấu', d: 'Rundown, bản vẽ bố cục, ánh sáng nhấn đúng thông điệp.' },
      { t: 'Vận hành trọn gói', d: 'Âm thanh, LED, MC/host, kỹ thuật — phối hợp một đầu mối.' },
      { t: 'Miền Bắc', d: 'Tối ưu logistics thiết bị và nhân sự trong khu vực.' },
    ],
    features: [
      { t: 'Concept &amp; kịch bản', d: 'Brief → storyboard → rundown minute-by-minute.' },
      { t: 'Sân khấu &amp; thiết bị', d: 'Âm thanh, ánh sáng, LED — catalog minh bạch.' },
      { t: 'Nhân sự sự kiện', d: 'Điều phối, MC, kỹ thuật — briefing trước giờ diễn ra.' },
      { t: 'Setup &amp; rehearsal', d: 'Soundcheck, dry-run, checklist an toàn.' },
      { t: 'Vận hành show', d: 'Showcaller, xử lý sự cố, đồng bộ creative &amp; kỹ thuật.' },
      { t: 'Hậu kỳ', d: 'Hạ màn, thu dọn, debrief cải tiến lần sau.' },
    ],
    related: ['thiet-bi-san-khau', 'in-quang-cao', 'trai-nghiem-tai-truong'],
    breadcrumbParent: 'Dịch vụ nổi bật',
    breadcrumbAnchor: '#service-highlight',
  },
  {
    id: 'trai-nghiem-tai-truong',
    file: 'trai-nghiem-tai-truong.html',
    title: 'Trải nghiệm tại trường | FT GROUP E&amp;E',
    desc:
      'Chương trình giáo dục trải nghiệm tại trường: thiết kế theo cấp học, hoạt động an toàn, gắn kết cộng đồng. FT GROUP E&amp;E — Miền Bắc.',
    h1: 'Trải nghiệm tại trường',
    heroLede:
      'Ngày hội, chuyên đề, hoạt động ngoại khóa — kịch bản phù hợp lứa tuổi, đạo cụ an toàn và nhân sự dẫn chương trình chuyên nghiệp.',
    heroImg:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, trải nghiệm tại trường, giáo dục trải nghiệm`,
    introH2: 'Giáo dục trải nghiệm theo từng cấp học',
    introP: [
      'FT GROUP E&amp;E thiết kế chương trình gắn mục tiêu giáo dục: kỹ năng mềm, STEM, văn hoá — với timeline rõ và phân luồng học sinh an toàn.',
      'Đồng bộ đạo cụ, âm thanh nhẹ, MC dẫn chương trình và checklist an toàn sân trường — một đầu mối từ ý tưởng đến thu dọn.',
    ],
    benefits: [
      { t: 'Phù hợp lứa tuổi', d: 'Nội dung &amp; đạo cụ theo mầm non, tiểu học, THCS/THPT.' },
      { t: 'An toàn học đường', d: 'Phân khu chơi, giám sát, briefing giáo viên.' },
      { t: 'Gắn kết cộng đồng', d: 'Phụ huynh, tình nguyện — trải nghiệm có ý nghĩa.' },
    ],
    features: [
      { t: 'Thiết kế chương trình', d: 'Chủ đề, trạm trải nghiệm, thời lượng từng khối.' },
      { t: 'Đạo cụ &amp; decor', d: 'Trang trí sân, booth, vật liệu thân thiện.' },
      { t: 'Nhân sự dẫn chương trình', d: 'MC, điều phối trạm, hỗ trợ giáo viên.' },
      { t: 'Âm thanh &amp; sân khấu', d: 'Loa di động, backdrop — phù hợp sân trường.' },
      { t: 'Vận hành', d: 'Phân luồng lớp, xử lý thời tiết, plan B.' },
      { t: 'Bàn giao', d: 'Tổng kết, ảnh sự kiện, đề xuất chủ đề lần sau.' },
    ],
    related: ['dao-cu-teambuilding', 'to-chuc-su-kien', 'in-quang-cao'],
    breadcrumbParent: 'Dịch vụ nổi bật',
    breadcrumbAnchor: '#service-highlight',
  },
  {
    id: 'in-quang-cao',
    file: 'in-quang-cao.html',
    title: 'In quảng cáo sự kiện | FT GROUP E&amp;E',
    desc:
      'In ấn backdrop, standee, POSM, OOH cho sự kiện — gia công, giao hàng đúng timeline setup. FT GROUP E&amp;E Hà Nội &amp; miền Bắc.',
    h1: 'In quảng cáo',
    heroLede:
      'Ấn phẩm in ấn cho kênh OOH và sự kiện — key visual thống nhất từ backdrop, counter đến tờ rơi và vật phẩm POSM.',
    heroImg:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, in quảng cáo sự kiện, in backdrop`,
    introH2: 'Chất liệu &amp; gia công theo brand guideline',
    introP: [
      'Từ file thiết kế đến in proof, chúng tôi tư vấn khổ cắt, loại giấy, cán màng và gia công sau in để sản phẩm đứng ngoài trời hoặc trong hall bền màu theo thời gian lắp dựng.',
      'Đặt lịch in theo timeline sự kiện — đồng bộ với đội dựng backdrop &amp; sân khấu để mảng visual thông suốt một đầu mối.',
    ],
    benefits: [
      { t: 'OOH &amp; POSM', d: 'Standee, phông nền, banner lối vào, tờ rơi chương trình.' },
      { t: 'Gia công', d: 'Cán màng, die-cut, ghép khối theo thiết kế.' },
      { t: 'Tiến độ', d: 'Đối soát proof và giao hàng trước ngày setup.' },
    ],
    features: [
      { t: 'Backdrop &amp; banner', d: 'Khổ lớn, treo hoặc khung — indoor/outdoor.' },
      { t: 'POSM &amp; quà tặng', d: 'Túi, thẻ, voucher in theo chiến dịch.' },
      { t: 'Duyệt mẫu', d: 'Proof màu, chỉnh sửa trước chạy số lượng.' },
      { t: 'Giao hàng', d: 'Đóng gói, giao venue hoặc kho tập kết.' },
      { t: 'Phối hợp dựng', d: 'Đồng bộ team sân khấu &amp; decor.' },
      { t: 'Tái sử dụng', d: 'Tư vấn vật liệu bền cho roadshow.' },
    ],
    related: ['san-xuat-dao-cu', 'to-chuc-su-kien', 'thiet-bi-san-khau'],
    breadcrumbParent: 'Dịch vụ nổi bật',
    breadcrumbAnchor: '#service-highlight',
  },
  {
    id: 'thiet-bi-san-khau',
    file: 'thiet-bi-san-khau.html',
    title: 'Thiết bị sân khấu âm thanh ánh sáng | FT GROUP E&amp;E',
    desc:
      'Thiết bị sân khấu: âm thanh, ánh sáng, LED — khảo sát, báo giá và vận hành kỹ thuật tại Hà Nội &amp; miền Bắc.',
    h1: 'Thiết bị sân khấu',
    heroLede:
      'Hệ âm thanh, ánh sáng, LED và cấu trúc sân khấu theo quy mô hội trường — kèm kỹ thuật soundcheck và vận hành suốt chương trình.',
    heroImg:
      'https://images.unsplash.com/photo-1598653222000-6b7b7f552368?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, thiết bị sân khấu, âm thanh ánh sáng`,
    introH2: 'Chọn cấu hình thiết bị theo không gian &amp; thể loại sự kiện',
    introP: [
      'FT GROUP E&amp;E tính toán tải loa, góc phủ, pixel pitch LED và phân bổ nguồn điện — bàn giao rundown kỹ thuật cho MC và đạo diễn chương trình.',
      'Có thể kết hợp với gói tổ chức trọn gói hoặc chỉ cung cấp thiết bị + kỹ thuật viên tại chỗ theo ngày chạy show.',
    ],
    benefits: [
      { t: 'Âm thanh', d: 'Line array, sub, mixer digital, micro không dây.' },
      { t: 'Ánh sáng &amp; LED', d: 'Beam/wash, pipe, màn hình LED trong nhà và ngoài trời.' },
      { t: 'Vận hành', d: 'Setup, ca máy, fly cue — đồng bộ với ban tổ chức.' },
    ],
    features: [
      { t: 'Khảo sát địa điểm', d: 'Sơ đồ, tải điện, điểm treo — báo cáo kỹ thuật.' },
      { t: 'Catalog thiết bị', d: 'Model, số lượng — báo giá minh bạch.' },
      { t: 'Lắp đặt', d: 'Truss, LED, focus đèn — checklist an toàn.' },
      { t: 'Soundcheck', d: 'Test mic, playback, monitor cho band.' },
      { t: 'Vận hành show', d: 'Kỹ thuật túc trực, backup máy khi cần.' },
      { t: 'Thu dọn', d: 'Hạ hình đúng slot bàn giao địa điểm.' },
    ],
    related: ['cho-thue-thiet-bi', 'to-chuc-su-kien', 'in-quang-cao'],
    breadcrumbParent: 'Dịch vụ nổi bật',
    breadcrumbAnchor: '#service-highlight',
  },
  {
    id: 'dao-cu-teambuilding',
    file: 'dao-cu-teambuilding.html',
    title: 'Đạo cụ Teambuilding | FT GROUP E&amp;E',
    desc:
      'Thiết kế &amp; cung ứng đạo cụ teambuilding: trò chơi nhóm, thiết bị an toàn, concept theo mục tiêu HR. Miền Bắc.',
    h1: 'Đạo cụ Teambuilding',
    heroLede:
      'Bộ trò chơi và đạo cụ phục vụ hoạt động gắn kết nhóm — tập trung an toàn, luật chơi rõ và dễ vận hành trên sân.',
    heroImg:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, đạo cụ teambuilding, team building`,
    introH2: 'Concept đồng hành mục tiêu doanh nghiệp',
    introP: [
      'Chúng tôi đề xuất format phù hợp văn hoá tổ chức — từ icebreaker ngắn đến roadshow ngoài trời — kèm đạo cụ được kiểm tra trước giờ chơi và hướng dẫn MC/điều phối.',
      'Có thể kết hợp với sản xuất đạo cụ riêng khi cần branding theo chiến dịch.',
    ],
    benefits: [
      { t: 'An toàn', d: 'Vật liệu &amp; cách chơi phù hợp số lượng người.' },
      { t: 'Đồng bộ MC', d: 'Kịch bản luật, phân luồng đội — bàn giao tài liệu vận hành.' },
      { t: 'Mở rộng', d: 'Nối với gói tổ chức trọn gói hoặc sản xuất đạo cụ.' },
    ],
    features: [
      { t: 'Thiết kế game', d: 'Icebreaker, thử thách nhóm, đua checkpoint.' },
      { t: 'Đạo cụ chuẩn', d: 'Bộ kit kiểm tra trước giờ diễn ra.' },
      { t: 'Hướng dẫn vận hành', d: 'SOP cho MC và trưởng đội.' },
      { t: 'Outdoor / indoor', d: 'Phương án theo địa hình &amp; thời tiết.' },
      { t: 'Branding', d: 'Áo, cờ, vật phẩm mang logo khi cần.' },
      { t: 'Kết hợp sự kiện', d: 'Gắn year-end party hoặc kick-off.' },
    ],
    related: ['san-xuat-dao-cu', 'to-chuc-su-kien', 'trai-nghiem-tai-truong'],
    breadcrumbParent: 'Dịch vụ nổi bật',
    breadcrumbAnchor: '#service-highlight',
  },
  {
    id: 'san-xuat-dao-cu',
    file: 'san-xuat-dao-cu.html',
    title: 'Sản xuất đạo cụ sự kiện | FT GROUP E&amp;E',
    desc:
      'Gia công prop, mô hình trưng bày và đạo cụ chương trình theo file thiết kế — FT GROUP E&amp;E miền Bắc.',
    h1: 'Sản xuất đạo cụ',
    heroLede:
      'Gia công prop, mô hình trưng bày và đạo cụ chương trình theo file thiết kế — bám timeline dựng sân &amp; duyệt mẫu.',
    heroImg:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80',
    keywords: `${COMMON_KEYWORDS}, sản xuất đạo cụ sự kiện`,
    introH2: 'Từ bản vẽ đến lắp ráp tại địa điểm',
    introP: [
      'FT GROUP E&amp;E hỗ trợ chọn vật liệu theo điều kiện indoor/outdoor, trọng lượng treo – đặt và yêu cầu an toàn cháy nổ khi cần.',
      'Quy trình: duyệt mockup — sản xuất — kiểm tra bàn giao — giao đến venue hoặc kho lưu theo kế hoạch sự kiện.',
    ],
    benefits: [
      { t: 'Đúng brief', d: 'Màu sắc, logo và kích thước theo thiết kế.' },
      { t: 'Tiến độ', d: 'Milestone rõ cho ngày setup &amp; tổng duyệt.' },
      { t: 'Đồng bộ dựng', d: 'Phối hợp team sân khấu &amp; âm thanh ánh sáng.' },
    ],
    features: [
      { t: 'Mockup &amp; duyệt mẫu', d: 'Ảnh 3D hoặc mẫu thật trước sản xuất số lượng.' },
      { t: 'Gia công xưởng', d: 'Mica, gỗ, foam, composite theo spec.' },
      { t: 'Sơn &amp; hoàn thiện', d: 'Bề mặt bền cho outdoor khi cần.' },
      { t: 'Vận chuyển', d: 'Đóng kiện, giao venue đúng giờ.' },
      { t: 'Lắp tại chỗ', d: 'Đội dựng phối hợp kỹ thuật sân khấu.' },
      { t: 'Lưu kho', d: 'Bảo quản prop tái sử dụng roadshow.' },
    ],
    related: ['dao-cu-teambuilding', 'in-quang-cao', 'to-chuc-su-kien'],
    breadcrumbParent: 'Dịch vụ nổi bật',
    breadcrumbAnchor: '#service-highlight',
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
  const breadcrumbParent = s.breadcrumbParent || 'Dịch vụ';
  const breadcrumbAnchor = s.breadcrumbAnchor || '#service-highlight';
  const heroImg = getServiceHeroImage(s.id) || s.heroImg;
  const seoImage = toAbsoluteSeoImage(heroImg);
  const galleryHtml = renderMasonryGallery(s.id, h1Plain);
  const glanceHtml = renderBenefitsStrip(s.benefits);
  const contactHtml = renderContactCta(h1Plain);
  const relatedHtml = s.related
    .map((rid) => {
      const name = NAME_BY_ID[rid] || rid;
      const href = `${rid}.html`;
      return `        <a class="srv-related-card reveal" href="${esc(href)}"><span>Dịch vụ liên quan</span><strong>${esc(name)}</strong></a>`;
    })
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
  <meta property="og:image" content="${esc(seoImage)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/variables.css">
  <link rel="stylesheet" href="../css/animations.css">
${renderChromeStyles(1)}
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/responsive.css">
  <link rel="stylesheet" href="../css/services.css">
${SERVICE_PAGE_ASSETS}
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

${renderSiteNav({ depth: 1, activeNav: 'services' })}

<main class="srv-page">
  <article>
    <header class="srv-hero">
      <div class="srv-hero__bg" style="background-image:url('${esc(heroImg)}');" role="presentation"></div>
      <div class="srv-hero__tint" aria-hidden="true"></div>
      <div class="srv-hero__content">
        <nav class="srv-breadcrumb" aria-label="Breadcrumb">
          <a href="../index.html#home">Trang chủ</a>
          <span aria-hidden="true"> · </span>
          <a href="../index.html${breadcrumbAnchor}">${breadcrumbParent}</a>
          <span aria-hidden="true"> · </span>
          <span aria-current="page">${esc(h1Plain)}</span>
        </nav>
        <h1>${s.h1}</h1>
        <p class="srv-hero__lede">${s.heroLede}</p>
      </div>
    </header>

${glanceHtml}

${galleryHtml}

    <section class="srv-section srv-section--tight" aria-labelledby="features-heading">
      <div class="srv-section-head srv-section-head--compact">
        <span class="srv-section-eyebrow">Hạng mục</span>
        <h2 id="features-heading">Phạm vi triển khai</h2>
      </div>
      <div class="srv-features-grid">
${featuresHtml}
      </div>
    </section>

    <section class="srv-section srv-section--alt srv-section--tight" aria-labelledby="process-heading">
      <div class="srv-section-head srv-section-head--compact">
        <span class="srv-section-eyebrow">Quy trình</span>
        <h2 id="process-heading">Quy trình triển khai</h2>
      </div>
      <div class="srv-process-track">
${processHtml}
      </div>
    </section>

    <details class="srv-more reveal">
      <summary>Tổng quan chi tiết</summary>
      <div class="srv-more__body">
        <h2 id="srv-intro-heading">${s.introH2}</h2>
        <p>${s.introP[0]}</p>
        <p>${s.introP[1]}</p>
      </div>
    </details>

${contactHtml}

    <section class="srv-section" aria-labelledby="related-heading">
      <div class="srv-section-head">
        <span class="srv-section-eyebrow">Khác</span>
        <h2 id="related-heading">Dịch vụ liên quan</h2>
        <p class="srv-section-lede">Các hạng mục liên quan trong hệ sinh thái dịch vụ FT GROUP E&amp;E.</p>
      </div>
      <div class="srv-related-grid">
${relatedHtml}
      </div>
    </section>
  </article>
</main>

${renderSiteFooter({ depth: 1 })}

${renderLightboxMarkup()}

${renderFloatStack({ depth: 1 })}

<script src="../js/navbar.js" defer></script>
${SERVICE_PAGE_SCRIPTS}
<script src="../js/main.js" defer></script>
</body>
</html>`;
}

mkdirSync(outDir, { recursive: true });
for (const s of SERVICES) {
  writeFileSync(join(outDir, s.file), renderPage(s), 'utf8');
}
console.log('Wrote', SERVICES.length, 'service pages to', outDir);
