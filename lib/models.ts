import { Db, ObjectId } from 'mongodb'

export interface HeroContent {
  _id?: ObjectId
  title: string
  subtitle: string
  description: string
  buttonText: string
  buttonUrl: string
  imageUrl: string
  logoUrl?: string
  whatsappUrl?: string
  instructions?: {
    step1?: string
    step2?: string
    step3?: string
  }
  createdAt?: Date
  updatedAt?: Date
}

export interface ServiceItem {
  _id?: ObjectId
  title: string
  description: string
  icon: string
  imageUrl?: string
  order: number
}

export interface ServicesContent {
  _id?: ObjectId
  title: string
  subtitle: string
  services: ServiceItem[]
  updatedAt?: Date
}

export interface TestimonialItem {
  _id?: ObjectId
  name: string
  role: string
  content: string
  avatarUrl: string
  rating: number
  order: number
}

export interface TestimonialsContent {
  _id?: ObjectId
  title: string
  subtitle: string
  testimonials: TestimonialItem[]
  updatedAt?: Date
}

export interface GalleryItem {
  _id?: ObjectId
  title: string
  description: string
  imageUrl: string
  category: string
  order: number
}

export interface GalleryContent {
  _id?: ObjectId
  title: string
  subtitle: string
  images: GalleryItem[]
  updatedAt?: Date
}

export interface StatsItem {
  _id?: ObjectId
  label: string
  value: string
  description: string
  order: number
}

export interface StatsContent {
  _id?: ObjectId
  title: string
  subtitle: string
  stats: StatsItem[]
  updatedAt?: Date
}

export interface WhyChooseItem {
  _id?: ObjectId
  title: string
  description: string
  icon: string
  imageUrl?: string
  order: number
}

export interface WhyChooseContent {
  _id?: ObjectId
  title: string
  subtitle: string
  items: WhyChooseItem[]
  updatedAt?: Date
}

export interface CTAContent {
  _id?: ObjectId
  title: string
  subtitle: string
  buttonText: string
  buttonUrl: string
  description?: string
  qrCodeUrl?: string
  imageUrl?: string
  updatedAt?: Date
}

export interface FooterContent {
  _id?: ObjectId
  companyName: string
  description: string
  address: string
  phone: string
  email: string
  socialLinks: {
    facebook?: string
    instagram?: string
    twitter?: string
    whatsapp?: string
  }
  updatedAt?: Date
}

export interface SiteSettings {
  _id?: ObjectId
  siteName: string
  siteTitle: string
  siteDescription: string
  siteUrl: string
  faviconUrl: string
  logoUrl: string
  address: string
  phone: string
  email: string
  whatsapp: string
  socialLinks: {
    facebook: string
    instagram: string
    twitter: string
    youtube: string
    linkedin: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string
    ogImage: string
  }
  contact: {
    email: string
    phone: string
    whatsapp: string
    address: string
    workingHours: string
  }
  business: {
    companyName: string
    registrationNumber: string
    taxId: string
  }
  updatedAt?: Date
}

export interface TentangKamiContent {
  _id?: ObjectId
  headerTitle: string
  headerSubtitle: string
  storyTitle: string
  storyContent: string[]
  servicesTitle: string
  services: {
    icon: string
    title: string
    description: string
  }[]
  whyChooseTitle: string
  benefits: string[]
  ctaTitle: string
  ctaDescription: string
  ctaButtonText: string
  ctaButtonUrl: string
  updatedAt?: Date
}

export interface SyaratKetentuanContent {
  _id?: ObjectId
  headerTitle: string
  headerSubtitle: string
  lastUpdated: string
  sections: {
    title: string
    icon?: string
    content: string[]
  }[]
  contactButtonText: string
  contactButtonUrl: string
  updatedAt?: Date
}

export interface KebijakanPrivasiContent {
  _id?: ObjectId
  headerTitle: string
  headerSubtitle: string
  sections: {
    title: string
    icon?: string
    content: string[]
  }[]
  contactButtonText: string
  contactButtonUrl: string
  updatedAt?: Date
}

// User and OTP Models
export interface User {
  _id?: ObjectId
  email: string
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt?: Date
}

export interface OTP {
  _id?: ObjectId
  email: string
  code: string
  expiresAt: Date
  isUsed: boolean
  attempts: number
  createdAt: Date
  updatedAt?: Date
}

// Partnership/Job Application Models
export interface PartnerApplication {
  _id?: ObjectId
  // Data Pribadi
  email: string
  nama: string
  jenisKelamin: 'Laki-laki' | 'Perempuan'
  tanggalLahir: Date
  alamatRumah: string
  nomorHp: string
  nomorWhatsApp: string
  
  // Data Kendaraan
  jenisKendaraan: 'Motor' | 'Mobil'
  merkTypeKendaraan: string
  nomorPolisi: string
  tahunKendaraan: number
  fotoSTNK: string
  
  // Dokumen Pendukung
  fotoKTP: string
  fotoSIM: string
  fotoSelfie: string
  
  // Informasi Tambahan
  pernahJadiKurir: boolean
  pengalamanKurir?: string
  waktuKerja: ('Pagi' | 'Siang' | 'Malam')[]
  siapTraining: boolean
  setujuBPJS: boolean
  
  // Persetujuan
  dataBenar: boolean
  setujuSyarat: boolean
  
  // Metadata
  status: 'pending' | 'review' | 'approved' | 'rejected'
  createdAt: Date
  updatedAt?: Date
  reviewedBy?: string
  reviewedAt?: Date
  notes?: string
}

export interface PartnershipSettings {
  _id?: ObjectId
  showPartnershipMenu: boolean
  partnershipButtonText: string
  partnershipDescription?: string
  updatedAt?: Date
}

export class ContentModel {
  private db: Db

  constructor(db: Db) {
    this.db = db
  }

  // Hero Content
  async getHeroContent(): Promise<HeroContent | null> {
    return await this.db.collection<HeroContent>('hero').findOne({}) as HeroContent | null
  }

  async updateHeroContent(data: Partial<HeroContent>): Promise<void> {
    await this.db.collection('hero').updateOne(
      {},
      { 
        $set: { ...data, updatedAt: new Date() } 
      },
      { upsert: true }
    )
  }

  // Services Content
  async getServicesContent(): Promise<ServicesContent | null> {
    return await this.db.collection<ServicesContent>('content').findOne({ type: 'services' }) as ServicesContent | null
  }

  async updateServicesContent(data: Partial<ServicesContent>): Promise<void> {
    await this.db.collection('content').updateOne(
      { type: 'services' },
      { 
        $set: { ...data, updatedAt: new Date() } 
      },
      { upsert: true }
    )
  }

  // Testimonials Content
  async getTestimonialsContent(): Promise<TestimonialsContent | null> {
    return await this.db.collection<TestimonialsContent>('content').findOne({ type: 'testimonials' }) as TestimonialsContent | null
  }

  async updateTestimonialsContent(data: Partial<TestimonialsContent>): Promise<void> {
    await this.db.collection('content').updateOne(
      { type: 'testimonials' },
      { 
        $set: { ...data, updatedAt: new Date() } 
      },
      { upsert: true }
    )
  }

  // Gallery Content
  async getGalleryContent(): Promise<GalleryContent | null> {
    return await this.db.collection<GalleryContent>('content').findOne({ type: 'gallery' }) as GalleryContent | null
  }

  async updateGalleryContent(data: Partial<GalleryContent>): Promise<void> {
    await this.db.collection('content').updateOne(
      { type: 'gallery' },
      { 
        $set: { ...data, updatedAt: new Date() } 
      },
      { upsert: true }
    )
  }

  // Stats Content
  async getStatsContent(): Promise<StatsContent | null> {
    return await this.db.collection<StatsContent>('stats').findOne({}) as StatsContent | null
  }

  async updateStatsContent(data: Partial<StatsContent>): Promise<void> {
    await this.db.collection('stats').updateOne(
      {},
      { 
        $set: { ...data, updatedAt: new Date() } 
      },
      { upsert: true }
    )
  }

  // Why Choose Content
  async getWhyChooseContent(): Promise<WhyChooseContent | null> {
    const result = await this.db.collection('content').findOne({ type: 'why-choose' })
    if (!result) return null
    return result as WhyChooseContent
  }

  async updateWhyChooseContent(data: Partial<WhyChooseContent>): Promise<void> {
    // Remove immutable fields and create update data
    const { _id, updatedAt, ...updateData } = data
    
    await this.db.collection('content').updateOne(
      { type: 'why-choose' },
      { 
        $set: { ...updateData, updatedAt: new Date() } 
      },
      { upsert: true }
    )
  }

  // CTA Content
  async getCTAContent(): Promise<CTAContent | null> {
    return await this.db.collection<CTAContent>('content').findOne({ type: 'cta' }) as CTAContent | null
  }

  async updateCTAContent(data: Partial<CTAContent>): Promise<void> {
    // Remove immutable fields and create update data
    const { _id, updatedAt, ...updateData } = data
    
    await this.db.collection('content').updateOne(
      { type: 'cta' },
      { 
        $set: { ...updateData, updatedAt: new Date() } 
      },
      { upsert: true }
    )
  }

  // Footer Content
  async getFooterContent(): Promise<FooterContent | null> {
    return await this.db.collection<FooterContent>('footer').findOne({}) as FooterContent | null
  }

  async updateFooterContent(data: Partial<FooterContent>): Promise<void> {
    await this.db.collection('footer').updateOne(
      {},
      { 
        $set: { ...data, updatedAt: new Date() } 
      },
      { upsert: true }
    )
  }

  // Settings Content
  async getSettingsContent(): Promise<SiteSettings | null> {
    return await this.db.collection<SiteSettings>('settings').findOne({}) as SiteSettings | null
  }

  async updateSettingsContent(data: Partial<SiteSettings>): Promise<void> {
    // Remove immutable fields and create update data
    const { _id, updatedAt, ...updateData } = data
    
    await this.db.collection('settings').updateOne(
      {},
      { 
        $set: { ...updateData, updatedAt: new Date() } 
      },
      { upsert: true }
    )
  }

  // Tentang Kami Content
  async getTentangKamiContent(): Promise<TentangKamiContent | null> {
    return await this.db.collection<TentangKamiContent>('content').findOne({ type: 'tentang-kami' }) as TentangKamiContent | null
  }

  async updateTentangKamiContent(data: Partial<TentangKamiContent>): Promise<void> {
    // Remove immutable fields and create update data
    const { _id, updatedAt, ...updateData } = data
    
    await this.db.collection('content').updateOne(
      { type: 'tentang-kami' },
      { 
        $set: { ...updateData, updatedAt: new Date() } 
      },
      { upsert: true }
    )
  }

  // Syarat Ketentuan Content
  async getSyaratKetentuanContent(): Promise<SyaratKetentuanContent | null> {
    return await this.db.collection<SyaratKetentuanContent>('content').findOne({ type: 'syarat-ketentuan' }) as SyaratKetentuanContent | null
  }

  async updateSyaratKetentuanContent(data: Partial<SyaratKetentuanContent>): Promise<void> {
    // Remove immutable fields and create update data
    const { _id, updatedAt, ...updateData } = data
    
    await this.db.collection('content').updateOne(
      { type: 'syarat-ketentuan' },
      { 
        $set: { ...updateData, updatedAt: new Date() } 
      },
      { upsert: true }
    )
  }

  // Kebijakan Privasi Content
  async getKebijakanPrivasiContent(): Promise<KebijakanPrivasiContent | null> {
    return await this.db.collection<KebijakanPrivasiContent>('content').findOne({ type: 'kebijakan-privasi' }) as KebijakanPrivasiContent | null
  }

  async updateKebijakanPrivasiContent(data: Partial<KebijakanPrivasiContent>): Promise<void> {
    // Remove immutable fields and create update data
    const { _id, updatedAt, ...updateData } = data
    
    await this.db.collection('content').updateOne(
      { type: 'kebijakan-privasi' },
      { 
        $set: { ...updateData, updatedAt: new Date() } 
      },
      { upsert: true }
    )
  }

  // User Management
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.db.collection<User>('users').findOne({ email }) as User | null
  }

  async getAllUsers(): Promise<User[]> {
    return await this.db.collection<User>('users').find({}).sort({ createdAt: -1 }).toArray() as User[]
  }

  async deleteUser(email: string): Promise<void> {
    await this.db.collection('users').deleteOne({ email })
  }

  async createOrUpdateUser(email: string): Promise<User> {
    const existingUser = await this.getUserByEmail(email)
    
    if (existingUser) {
      // Update last login
      await this.db.collection('users').updateOne(
        { email },
        { 
          $set: { 
            lastLogin: new Date(),
            updatedAt: new Date()
          } 
        }
      )
      return { ...existingUser, lastLogin: new Date() }
    } else {
      // Create new user
      const newUser: User = {
        email,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const result = await this.db.collection('users').insertOne(newUser)
      return { ...newUser, _id: result.insertedId }
    }
  }

  // OTP Management
  async createOTP(email: string, code: string, expiresAt: Date): Promise<OTP> {
    console.log('createOTP called with:', { email, code, expiresAt })
    
    // Delete any existing unused OTPs for this email (both expired and valid)
    const deleteResult = await this.db.collection('otps').deleteMany({ 
      email, 
      isUsed: false
    })
    console.log('Deleted existing OTPs:', deleteResult.deletedCount)

    const otp: OTP = {
      email,
      code,
      expiresAt,
      isUsed: false,
      attempts: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    console.log('Inserting OTP:', otp)
    const result = await this.db.collection('otps').insertOne(otp)
    console.log('OTP inserted with ID:', result.insertedId)
    
    return { ...otp, _id: result.insertedId }
  }

  async getValidOTP(email: string, code: string): Promise<OTP | null> {
    return await this.db.collection<OTP>('otps').findOne({
      email,
      code,
      isUsed: false,
      expiresAt: { $gt: new Date() }
    }) as OTP | null
  }

  async markOTPAsUsed(email: string, code: string): Promise<void> {
    await this.db.collection('otps').updateOne(
      { email, code, isUsed: false },
      { 
        $set: { 
          isUsed: true,
          updatedAt: new Date()
        } 
      }
    )
  }

  async incrementOTPAttempts(email: string, code: string): Promise<void> {
    await this.db.collection('otps').updateOne(
      { email, code, isUsed: false },
      { 
        $inc: { attempts: 1 },
        $set: { updatedAt: new Date() }
      }
    )
  }

  async cleanupExpiredOTPs(): Promise<void> {
    await this.db.collection('otps').deleteMany({
      expiresAt: { $lt: new Date() }
    })
  }

  // Partnership Management
  async createPartnerApplication(data: Omit<PartnerApplication, '_id' | 'createdAt' | 'status'>): Promise<PartnerApplication> {
    const application: PartnerApplication = {
      ...data,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await this.db.collection('partnerApplications').insertOne(application)
    return { ...application, _id: result.insertedId }
  }

  async getPartnerApplications(filter: {
    status?: PartnerApplication['status']
    page?: number
    limit?: number
    search?: string
  } = {}): Promise<{
    applications: PartnerApplication[]
    total: number
    page: number
    totalPages: number
  }> {
    const { status, page = 1, limit = 10, search } = filter
    const skip = (page - 1) * limit
    
    // Build query
    const query: any = {}
    if (status) {
      query.status = status
    }
    if (search) {
      query.$or = [
        { nama: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { nomorHp: { $regex: search, $options: 'i' } },
        { nomorWhatsApp: { $regex: search, $options: 'i' } }
      ]
    }
    
    // Get total count
    const total = await this.db.collection('partnerApplications').countDocuments(query)
    
    // Get applications
    const applications = await this.db.collection('partnerApplications')
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray() as PartnerApplication[]
    
    return {
      applications,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    }
  }

  async getPartnerApplicationById(id: string): Promise<PartnerApplication | null> {
    return await this.db.collection('partnerApplications').findOne({ 
      _id: new ObjectId(id) 
    }) as PartnerApplication | null
  }

  async updatePartnerApplicationStatus(
    id: string, 
    status: PartnerApplication['status'], 
    reviewedBy: string, 
    notes?: string
  ): Promise<void> {
    await this.db.collection('partnerApplications').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status,
          reviewedBy,
          reviewedAt: new Date(),
          notes,
          updatedAt: new Date()
        } 
      }
    )
  }

  async deletePartnerApplication(id: string): Promise<void> {
    await this.db.collection('partnerApplications').deleteOne({ 
      _id: new ObjectId(id) 
    })
  }

  async getPartnerApplicationsStats(): Promise<{
    total: number
    pending: number
    review: number
    approved: number
    rejected: number
  }> {
    const pipeline = [
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]
    
    const results = await this.db.collection('partnerApplications').aggregate(pipeline).toArray()
    
    const stats = {
      total: 0,
      pending: 0,
      review: 0,
      approved: 0,
      rejected: 0
    }
    
    results.forEach(result => {
      stats[result._id as keyof typeof stats] = result.count
      stats.total += result.count
    })
    
    return stats
  }

  // Partnership Settings
  async getPartnershipSettings(): Promise<PartnershipSettings | null> {
    return await this.db.collection<PartnershipSettings>('partnershipSettings').findOne({}) as PartnershipSettings | null
  }

  async updatePartnershipSettings(data: Partial<PartnershipSettings>): Promise<void> {
    // Remove immutable fields and create update data
    const { _id, updatedAt, ...updateData } = data
    
    await this.db.collection('partnershipSettings').updateOne(
      {},
      { 
        $set: { ...updateData, updatedAt: new Date() } 
      },
      { upsert: true }
    )
  }
}

export async function getContentModel(): Promise<ContentModel> {
  const db = await (await import('./mongodb')).getDatabase()
  return new ContentModel(db)
}
