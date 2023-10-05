## Table "users"

| Field       | Type       | Description            |
|-------------|------------|------------------------|
| _id         | ObjectId   | Primary key            |
| name        | String     | Tên người dùng         |
| email       | String     | Email người dùng       |
| password    | String     | Mật khẩu người dùng    |
| profilePic  | String     | Đường dẫn hình đại diện |
| createdAt   | Date       | Ngày tạo bản ghi       |
| updatedAt   | Date       | Ngày cập nhật bản ghi  |

## Table "chats"

| Field           | Type       | Description                  |
|-----------------|------------|------------------------------|
| _id             | ObjectId   | Primary key                  |
| members         | Array      | Danh sách các thành viên      |
| lastMessage     | ObjectId   | Tham chiếu đến bản ghi "message" |
| unreadMessages  | Number     | Số lượng tin nhắn chưa đọc   |
| createdAt       | Date       | Ngày tạo bản ghi             |
| updatedAt       | Date       | Ngày cập nhật bản ghi        |

## Table "messages"

| Field       | Type       | Description                 |
|-------------|------------|-----------------------------|
| _id         | ObjectId   | Primary key                 |
| chat        | ObjectId   | Tham chiếu đến bản ghi "chats" |
| sender      | ObjectId   | Tham chiếu đến bản ghi "users" |
| text        | String     | Nội dung tin nhắn           |
| read        | Boolean    | Trạng thái đã đọc tin nhắn   |
| createdAt   | Date       | Ngày tạo bản ghi            |
| updatedAt   | Date       | Ngày cập nhật bản ghi       |
