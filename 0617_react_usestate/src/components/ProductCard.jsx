import { useState } from "react";

export default function ProductCard(props) {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const { imgUrl, title, price } = props;

    return <td style={{ "padding": 20, "textAlign": "center"}}>
        <img src={imgUrl} alt={title} width={150} />

        <h3>{title}</h3>
        <p>가격: {price.toLocaleString()}</p>

        <button type="button" onClick={() => setLikes(v => v + 1)}>
            좋아요 {likes}
        </button>
        <button type="button" onClick={() => setDislikes(v => v + 1)}>
            안좋아요 {dislikes}
        </button>
    </td>
}