# KurirQu Admin Dashboard Setup

## Overview
This admin dashboard allows you to manage the content of the KurirQu landing page dynamically through a web interface.

## Features
- 🔐 Secure admin authentication
- 📝 Dynamic content management for all landing page sections
- 🖼️ Image upload support (S3 integration ready)
- 📱 Responsive design
- 🚀 Real-time content updates

## Accessing the Admin Dashboard

1. **Development Server**: The application is running on `http://localhost:3001`

2. **Admin Login**: Navigate to `http://localhost:3001/admin/login`

3. **Default Credentials**:
   - Email: `admin@kurirqu.com`
   - Password: `admin123`

4. **Admin Dashboard**: After login, you'll be redirected to `http://localhost:3001/admin`

## Available Content Management Sections

### 1. Hero Section (`/admin/hero`)
- Main title and subtitle
- Logo URL
- WhatsApp contact URL
- 3-step process instructions

### 2. Services (`/admin/services`)
- Service titles and descriptions
- Service icons
- Ordering

### 3. Testimonials (`/admin/testimonials`)
- Customer testimonials
- Ratings
- Avatar images

### 4. Gallery (`/admin/gallery`)
- Image gallery management
- Image upload functionality

### 5. Statistics (`/admin/stats`)
- Company statistics
- Metrics display

### 6. Why Choose Us (`/admin/why-choose`)
- Value propositions
- Feature highlights

### 7. Call to Action (`/admin/cta`)
- CTA section content
- Button customization

### 8. Footer (`/admin/footer`)
- Company information
- Social media links
- Contact details

## API Endpoints

### Public Content API
- `GET /api/content` - Returns all landing page content

### Admin APIs (Protected)
- `GET /api/admin/hero` - Get hero content
- `PUT /api/admin/hero` - Update hero content
- `GET /api/admin/services` - Get services content
- `PUT /api/admin/services` - Update services content
- ... (similar endpoints for all sections)

## Database Setup

The admin dashboard uses MongoDB for content storage. The connection is configured via environment variables in `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/kurirqu_landing
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3001
```

## Authentication

The admin system uses NextAuth.js for authentication with credentials provider. Admin users are stored in MongoDB with encrypted passwords.

## Dynamic Content Integration

The landing page components now fetch content dynamically from the API:

- Hero section uses `GET /api/content` endpoint
- Content updates in admin dashboard reflect immediately on the landing page
- Fallback content is provided if database is not available

## Image Storage

The system is prepared for S3 (non-AWS) image storage integration:
- Multer is configured for file uploads
- S3 client setup is ready (needs credentials)
- Image upload endpoints can be added as needed

## Security Features

- Session-based authentication
- Protected API routes
- Password hashing with bcrypt
- CSRF protection via NextAuth.js

## Future Enhancements

- [ ] Complete image upload functionality
- [ ] Add more content management sections
- [ ] Implement content versioning
- [ ] Add content preview functionality
- [ ] Implement role-based access control

## Troubleshooting

1. **MongoDB Connection**: Ensure MongoDB is running and the URI is correct
2. **Environment Variables**: Check that all required variables are set in `.env.local`
3. **Admin User**: Run `npm run init-admin` to create the default admin user
4. **Content Not Loading**: Check browser console for API errors

## Development Notes

- The admin dashboard is built with Next.js 15.2.4 and App Router
- Uses Tailwind CSS for styling
- Radix UI components for consistent design
- TypeScript for type safety
