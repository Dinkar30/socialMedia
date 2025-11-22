# Hello - Social Media Platform

A full-stack social media web application built with the MERN stack, allowing users to share posts, like and comment on other posts.

**Live Demo:** [CheckOut](https://hellosocial.vercel.app)

## 🚀 Features

- **User Authentication** - Secure signup/login with JWT tokens
- **Create Posts** - Upload images with captions
- **Like & Comment** - Interact with posts
- **User Profiles** - View user profiles and their posts
- **Search Users** - Find users by username
- **Responsive Design** - Mobile-friendly interface

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (file uploads)
- Cloudinary (image storage)
- Bcrypt (password hashing)

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- Cloudinary account

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/Dinkar30/socialMedia.git
cd socialMedia
```

2. Install backend dependencies
```bash
npm install
```

3. Create `.env` file in root directory
```env
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CORS_ORIGIN=http://localhost:5173
PORT=8000 
```

4. Start the backend server
```bash
npm start
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install frontend dependencies
```bash
npm install
```

3. Update API base URL in `src/utils/api.js`
```javascript
baseURL: 'http://localhost:8000/api/v1'
```

4. Start the frontend dev server
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🌐 Deployment

**Frontend:** Deployed on [Vercel](https://hellosocial.vercel.app)

**Backend:** Deployed on [Render](https://hello-social.onrender.com)


## 📂 Project Structure
```
wyre/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── utils/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── public/
├── .env
└── package.json
```

## 🔑 API Endpoints

### Authentication
- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `POST /users/logout` - Logout user

### Posts
- `GET /posts/feed` - Get all posts
- `GET /posts/get-post/:postId` - Get single post
- `POST /posts/create-post` - Create new post
- `POST /posts/like-post/:postId` - Like/unlike post
- `POST /posts/add-comment/:postId` - Add comment

### Users
- `GET users/get-profile/:username` - Get user profile

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Dinkar Pathak**
- GitHub: [@Dinkar30](https://github.com/Dinkar30)
- Email: dkcan00@gmail.com

## 🙏 Acknowledgments

- Inspiration from Instagram and Twitter
- Built as a learning project to understand full-stack development

---

Made with ❤️ using MERN Stack