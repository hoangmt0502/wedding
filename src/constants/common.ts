import { TEvent } from "../interfaces/common";
import { scrollToSection } from "../utils/common";

export const INITIAL_PAGE = 1;
export const PER_PAGE = 10;

export const IMAGE_HEART = '/images/heart.png';
export const IMAGE_FLOWER = '/images/flower.png';
export const IMAGE_DOVE = '/images/dove.png';
export const IMAGE_SPARKLE = '/images/sparkle.png';

export const LIST_IMAGES_FALLING = [
  IMAGE_SPARKLE,
  IMAGE_FLOWER,
  IMAGE_HEART,
]

export const PLAYLIST = [
  "/audio/ngay_dau_tien.mp3",
  "/audio/mot_doi.mp3",
  "/audio/hanh_phuc_cuoi_cung.mp3",
  "/audio/cuoi_nhau_di.mp3",
  "/audio/beautiful_in_white.mp3",
];

export const COLLECTION_LEFT = [
  "/collections/web-hq/HLE08818.jpg",
  "/collections/web-hq/HLE08783.jpg",
  "/collections/web-hq/HLE09376.jpg",
  "/collections/web-hq/HLE08875.jpg",
  "/collections/web-hq/HLE09215.jpg",
  "/collections/web-hq/HLE09147_cut.jpg",
]

export const COLLECTION_RIGHT = [
  "/collections/web-hq/HLE08843.jpg",
  "/collections/web-hq/HLE09330.jpg",
  "/collections/web-hq/HLE08767.jpg", 
  "/collections/web-hq/HLE09136.jpg",
]

export const Full_COLLECTION = [
  ...COLLECTION_LEFT,
  ...COLLECTION_RIGHT,
  "/collections/web-hq/HLE09163.jpg",
  "/collections/web-hq/HLE09347.jpg",
  "/collections/web-hq/HLE08900.jpg",
  "/collections/web-hq/HLE08922.jpg",
  "/collections/web-hq/HLE08966.jpg",
  "/collections/web-hq/HLE09021.jpg",
  "/collections/web-hq/HLE09064.jpg",
  "/collections/web-hq/HLE09361.jpg",
  "/collections/web-hq/HLE09088.jpg",
  "/collections/web-hq/HLE09094.jpg",
  "/collections/web-hq/HLE09129.jpg",
  "/collections/web-hq/HLE09469.jpg",
  "/collections/web-hq/HLE09181.jpg",
  "/collections/web-hq/HLE09186.jpg",
  "/collections/web-hq/HLE09246.jpg",
  "/collections/web-hq/HLE09295.jpg",
  "/collections/web-hq/HLE09334.jpg",
  "/collections/web-hq/HLE09343.jpg",
  "/collections/web-hq/HLE09397.jpg",
  "/collections/web-hq/HLE09478.jpg"
]

export const MAIN_COLOR = '#988465';

export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx3A9zsmNt061hUORWNfKzM1r-zexDDCs915y4PWNbNeSawM0aQ5G8W2CRzpKTyi2gN/exec";

export const suggestions = [
  { message: "Chúc hai bạn trăm năm hạnh phúc, vạn điều bình an." },
  { message: "Chúc mái ấm nhỏ của hai bạn luôn ngập tràn niềm vui và tiếng cười." },
  { message: "Chúc mỗi ngày bên nhau đều là một ngày cưới." },
  { message: "Chúc hai bạn luôn giữ được tình yêu như thuở ban đầu." },
  { message: "Chúc hành trình sắp tới đầy ắp yêu thương và hạnh phúc." },
  { message: "Chúc hai bạn xây dựng một gia đình yên ấm, hòa thuận và trọn vẹn." },
  { message: "Chúc tình yêu của hai bạn luôn bền chặt qua thời gian." },
  { message: "Chúc hai bạn sớm đón thêm thiên thần nhỏ đáng yêu." },
  { message: "Chúc đôi uyên ương trọn đời bên nhau đến bạc đầu." },
  { message: "Chúc mỗi khoảnh khắc trong cuộc sống đều có nhau." },
  { message: "Chúc hôn nhân của hai bạn luôn rạng rỡ như hoa nở mùa xuân." },
  { message: "Chúc gia đình mới luôn được yêu thương, tôn trọng và sẻ chia." },
  { message: "Chúc hai bạn cùng nắm tay vượt qua mọi sóng gió cuộc đời." },
  { message: "Chúc hai bạn luôn tìm thấy điều tốt đẹp ở nhau mỗi ngày." },
  { message: "Chúc tình yêu của hai bạn mãi ngọt ngào và trọn vẹn." },
  { message: "Chúc hai bạn sống hạnh phúc bên nhau đến cuối con đường." },
  { message: "Chúc hai bạn luôn cảm nhận được bình yên khi ở cùng nhau." },
  { message: "Chúc mỗi ngày đều tràn đầy nụ cười và niềm vui." },
  { message: "Chúc hai bạn sớm xây dựng ngôi nhà mơ ước của riêng mình." },
  { message: "Chúc đôi bạn mãi yêu nhau theo cách chân thành và tử tế nhất." },
  { message: "Chúc con đường phía trước của hai bạn toàn là hoa và ánh sáng." },
  { message: "Chúc hôn lễ của hai bạn đẹp như trong truyện cổ tích." },
  { message: "Chúc hai bạn luôn nói lời yêu thương và không bao giờ quên ôm nhau mỗi ngày." },
  { message: "Chúc hai bạn cùng nhau tạo nên những kỷ niệm đáng nhớ." },
  { message: "Chúc mỗi sáng thức dậy bên nhau đều là một điều tuyệt vời." },
  { message: "Chúc gia đình nhỏ luôn hạnh phúc, đủ đầy và viên mãn." },
  { message: "Chúc hai bạn mãi đồng điệu trong suy nghĩ và sẻ chia trong mọi chuyện." },
  { message: "Chúc tình yêu của hai bạn vượt qua mọi thử thách trong cuộc sống." },
  { message: "Chúc hai bạn trọn đời chung đường và chung mộng." },
  { message: "Chúc các bạn yêu nhau nhẹ nhàng nhưng sâu sắc, bền bỉ và an yên." },
  { message: "Chúc hai bạn luôn ủng hộ nhau trong từng ước mơ và dự định." },
  { message: "Chúc mái ấm mới luôn có tiếng cười trẻ thơ." },
  { message: "Chúc hai bạn luôn biết nhường nhịn, thấu hiểu và trân quý nhau." },
  { message: "Chúc hai bạn luôn giữ được sự tin tưởng và chung thủy." },
  { message: "Chúc tình yêu của hai bạn luôn là điểm tựa mỗi khi mệt mỏi." },
  { message: "Chúc mọi điều tốt lành luôn theo hai bạn trong hôn nhân." },
  { message: "Chúc hai bạn sống cùng nhau trọn vẹn từng phút giây." },
  { message: "Chúc hai bạn xây dựng một gia đình ngọt ngào và hạnh phúc." },
  { message: "Chúc hai bạn mãi mãi bên nhau và chăm sóc nhau thật tốt." },
  { message: "Chúc hai bạn luôn biết nói lời cảm ơn và xin lỗi đúng lúc." },
  { message: "Chúc hai bạn có những chuyến đi thật đẹp cùng nhau." },
  { message: "Chúc hai bạn sống bình yên trong căn nhà đầy tình yêu." },
  { message: "Chúc gia đình nhỏ của hai bạn luôn rực rỡ như mặt trời sớm mai." },
  { message: "Chúc hai bạn sống thật chậm để cảm nhận hết yêu thương dành cho nhau." },
  { message: "Chúc hạnh phúc của hai bạn luôn lớn hơn mọi nỗi buồn." },
  { message: "Chúc hai bạn cùng nhau già đi với trái tim luôn trẻ và đầy nhiệt huyết." },
  { message: "Chúc hai bạn xây dựng một cuộc sống đơn giản nhưng tràn ngập yêu thương." },
  { message: "Chúc hai bạn có thể tựa vào nhau mỗi khi yếu lòng." },
  { message: "Chúc hôn nhân của hai bạn là hành trình của nụ cười và sự thấu hiểu." },
  { message: "Chúc ngày hôm nay là bắt đầu của những điều tốt đẹp nhất trong đời hai bạn." },
];

export const idPage = {
  guestBook: 'guest-book-page',
  event: 'event-page',
  gift: 'gift-page'
}

const openCalendar = (event: TEvent) => {
  const text = event.title;
  const details = `${event.placeLabel} - ${event.address}`;
  const location = event.address;

  const start = "20260601T080000";
  const end = "20260601T100000";

  const link = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    text
  )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
    location
  )}&dates=${start}/${end}`;

  window.open(link, "_blank");
};

export const EVENTS: TEvent[] = [
  {
    id: "bride-party",
    title: "Tiệc Cưới Nhà Gái",
    time: "11h00 Thứ 3, ngày 13/01/2026",
    placeLabel: "TTTM Himlam Plaza",
    address: "Đường Trần Đăng Ninh, Phường Điện Biên Phủ, Điện Biên",
    image:
      "https://images.pexels.com/photos/4644406/pexels-photo-4644406.jpeg",
    primaryBtn: "Xem chỉ đường",
    secondaryBtn: "Thêm vào lịch",

    onPrimaryClick: () => window.open(
      'https://maps.app.goo.gl/G1MjgcMdq8SkBski8',
      "_blank"
    ),
    onSecondaryClick: () =>
      openCalendar({
        id: "bride-party",
        title: "Tiệc Cưới Nhà Gái",
        time: "",
        placeLabel: "",
        address: "TTTM Himlam Plaza: Đường Trần Đăng Ninh, Phường Điện Biên Phủ, Điện Biên",
        image: "",
        primaryBtn: "",
        secondaryBtn: "",
      }),
  },

  {
    id: "le-vu-quy",
    title: "Lễ Vu Quy",
    time: "10h00 Thứ 3, ngày 13/01/2026",
    placeLabel: "Tư gia nhà Gái",
    address: "Ngõ 175 - Tổ 6 Đường Sùng Phái Sinh, Phường Điện Biên Phủ, Điện Biên",
    image:
      "https://images.pexels.com/photos/3843326/pexels-photo-3843326.jpeg",
    primaryBtn: "Xem chỉ đường",
    secondaryBtn: "Mừng cưới",

    onPrimaryClick: () => window.open(
      'https://maps.app.goo.gl/vZ8EQJJL7TFHXUw36',
      "_blank"
    ),
    onSecondaryClick: () => scrollToSection(idPage.gift),
  },

  {
    id: "groom-party",
    title: "Tiệc Cưới Nhà Trai",
    time: "11h00 Chủ Nhật, ngày 02/06/2026",
    placeLabel: "Nhà văn hóa tổ 14, Đức Giang",
    address: "Số 72 ngõ 638 Ngô Gia Tự, Đức Giang, Long Biên, Hà Nội",
    image:
      "https://images.pexels.com/photos/3843326/pexels-photo-3843326.jpeg",
    primaryBtn: "Xem chỉ đường",
    secondaryBtn: "Thêm vào lịch",

    onPrimaryClick: () => window.open(
      'https://maps.app.goo.gl/pNfmtcPFxmA5torUA',
      "_blank"
    ),
    onSecondaryClick: () =>
      openCalendar({
        id: "groom-party",
        title: "Tiệc Cưới Nhà Trai",
        time: "",
        placeLabel: "",
        address: "Số 72 ngõ 638 Ngô Gia Tự, Đức Giang, Long Biên, Hà Nội",
        image: "",
        primaryBtn: "",
        secondaryBtn: "",
      }),
  },

  {
    id: "le-thanh-hon",
    title: "Lễ Thành Hôn",
    time: "10h30 Chủ Nhật, ngày 02/06/2026",
    placeLabel: "Nhà văn hóa tổ 14, Đức Giang",
    address: "Số 72 ngõ 638 Ngô Gia Tự, Đức Giang, Long Biên, Hà Nội",
    image:
      "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg",
    primaryBtn: "Xem chỉ đường",
    secondaryBtn: "Mừng cưới",

    onPrimaryClick: () => window.open(
      'https://maps.app.goo.gl/pNfmtcPFxmA5torUA',
      "_blank"
    ),
    onSecondaryClick: () => scrollToSection(idPage.gift),
  },
];
