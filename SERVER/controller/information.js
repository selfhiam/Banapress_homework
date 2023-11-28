import * as Repository from '../data/information.js'

export async function datainformation(req, res) {
    try {
        const data = await Repository.getAll();
        res.status(200).json(data);
    } catch (error) {
        console.error("에러 정보 :", error);
        res.status(500).json({ error: "서버와의 연결이 불안정 합니다." });
    }
}