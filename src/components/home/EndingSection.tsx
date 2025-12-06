import ImageWrapper from "./ImageWrapper";

export default function EndingSection() {
  return (
    <ImageWrapper
      src="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress"
      isCompactWidth
      height={700}
      opacity={0.3}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          padding: "0 20px",
          gap: "12px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "52px",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Thank You!
        </h2>

        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "34px",
            margin: 0,
          }}
        >
          Minh Hoàng & Khánh Huyền
        </p>

        <div style={{ fontSize: "28px" }}>❤️❤️❤️</div>

        <p
          style={{
            fontSize: "18px",
            maxWidth: "780px",
            opacity: 0.9,
            lineHeight: 1.6,
            whiteSpace: 'pre-line'
          }}
        >
          {'Cảm ơn bạn đã dành thời gian ghé thăm thiệp cưới online của chúng mình.\nSự hiện diện của bạn trong ngày trọng đại là niềm hạnh phúc to lớn.'}
        </p>
      </div>
    </ImageWrapper>
  )
}