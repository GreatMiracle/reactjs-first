
function TruncateText({ text }) {
    const MAX_WORDS = 6;

    // Kiểm tra xem `text` có tồn tại và khác `undefined` không
    if (typeof text === 'undefined') {
        return null; // Hoặc bạn có thể trả về một giá trị mặc định khác
    }

    // Tạo một mảng từ các từ trong đoạn văn bản
    const words = text.trim().split(' ');

    // Kiểm tra nếu số từ lớn hơn MAX_WORDS
    if (words.length > MAX_WORDS) {
        // Cắt mảng từ thành mảng con chỉ chứa MAX_WORDS từ
        const truncatedWords = words.slice(0, MAX_WORDS);

        // Ghép các từ thành chuỗi và thêm dấu ba chấm
        const truncatedText = truncatedWords.join(' ') + '...';

        // Hiển thị đoạn văn bản cắt gọn
        return truncatedText;
    }

    // Nếu số từ không vượt quá MAX_WORDS, hiển thị đoạn văn bản ban đầu
    return text;
}

export default TruncateText;