export default function Header() {
    return (
        <header style={{ background: "#000", color: "#fff", padding: 15, textAlign: "center" }}>
            <h1 style={{ margin: 0, fontSize: "24px" }}>집가고싶다</h1>

            <div style={{ marginTop: '10px', fontSize: '14px', color: "#fff", gap: "20px", display: "inline-flex" }}>
                <span>홈</span>
                <span>추천</span>
                <span>마이페이지</span>
            </div>
        </header>
    )
}