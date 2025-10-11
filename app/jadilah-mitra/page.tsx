"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Upload, User, Car, FileText, Info, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PartnershipSettings {
  showPartnershipMenu: boolean
  partnershipButtonText: string
  partnershipDescription?: string
}

export default function PartnershipApplicationPage() {
  const [settings, setSettings] = useState<PartnershipSettings>({
    showPartnershipMenu: false,
    partnershipButtonText: 'Jadilah Mitra Kami'
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState({
    // Data Pribadi
    email: '',
    nama: '',
    jenisKelamin: '',
    tanggalLahir: '',
    alamatRumah: '',
    nomorHp: '',
    nomorWhatsApp: '',
    
    // Data Kendaraan
    jenisKendaraan: '',
    merkTypeKendaraan: '',
    nomorPolisi: '',
    tahunKendaraan: '',
    fotoSTNK: null as File | null,
    
    // Dokumen Pendukung
    fotoKTP: null as File | null,
    fotoSIM: null as File | null,
    fotoSelfie: null as File | null,
    
    // Informasi Tambahan
    pernahJadiKurir: false,
    pengalamanKurir: '',
    waktuKerja: [] as string[],
    siapTraining: false,
    setujuBPJS: false,
    
    // Persetujuan
    dataBenar: false,
    setujuSyarat: false
  })
  
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/partnership-settings')
      const data = await response.json()
      setSettings(data)
      
      if (!data.showPartnershipMenu) {
        router.push('/')
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.email && formData.nama && formData.jenisKelamin && 
                formData.tanggalLahir && formData.alamatRumah && formData.nomorHp && 
                formData.nomorWhatsApp)
      case 2:
        return !!(formData.jenisKendaraan && formData.merkTypeKendaraan && 
                formData.nomorPolisi && formData.tahunKendaraan && formData.fotoSTNK)
      case 3:
        return !!(formData.fotoKTP && formData.fotoSIM && formData.fotoSelfie)
      case 4:
        return !!(formData.waktuKerja.length > 0 && formData.siapTraining && formData.setujuBPJS)
      case 5:
        return !!(formData.dataBenar && formData.setujuSyarat)
      default:
        return false
    }
  }

  const nextStep = () => {
    // Check validation and set errors
    const errors: Record<string, boolean> = {}
    
    switch (currentStep) {
      case 1:
        if (!formData.email) errors.email = true
        if (!formData.nama) errors.nama = true
        if (!formData.jenisKelamin) errors.jenisKelamin = true
        if (!formData.tanggalLahir) errors.tanggalLahir = true
        if (!formData.alamatRumah) errors.alamatRumah = true
        if (!formData.nomorHp) errors.nomorHp = true
        if (!formData.nomorWhatsApp) errors.nomorWhatsApp = true
        break
      case 2:
        if (!formData.jenisKendaraan) errors.jenisKendaraan = true
        if (!formData.merkTypeKendaraan) errors.merkTypeKendaraan = true
        if (!formData.nomorPolisi) errors.nomorPolisi = true
        if (!formData.tahunKendaraan) errors.tahunKendaraan = true
        if (!formData.fotoSTNK) errors.fotoSTNK = true
        break
      case 3:
        if (!formData.fotoKTP) errors.fotoKTP = true
        if (!formData.fotoSIM) errors.fotoSIM = true
        if (!formData.fotoSelfie) errors.fotoSelfie = true
        break
      case 4:
        if (formData.waktuKerja.length === 0) errors.waktuKerja = true
        if (!formData.siapTraining) errors.siapTraining = true
        if (!formData.setujuBPJS) errors.setujuBPJS = true
        break
    }
    
    setValidationErrors(errors)
    
    if (Object.keys(errors).length === 0) {
      setCurrentStep(prev => Math.min(prev + 1, 5))
      setValidationErrors({}) // Clear errors when moving to next step
    } else {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      })
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error('Failed to upload file')
    }
    
    const data = await response.json()
    return data.url
  }

  const handleSubmit = async () => {
    // Check validation for step 5 and set errors
    const errors: Record<string, boolean> = {}
    
    if (!formData.dataBenar) errors.dataBenar = true
    if (!formData.setujuSyarat) errors.setujuSyarat = true
    
    setValidationErrors(errors)
    
    if (Object.keys(errors).length > 0) {
      toast({
        title: 'Validation Error',
        description: 'Please accept all terms and conditions',
        variant: 'destructive'
      })
      return
    }

    setSubmitting(true)
    try {
      // Upload files
      const [fotoSTNK, fotoKTP, fotoSIM, fotoSelfie] = await Promise.all([
        uploadFile(formData.fotoSTNK!),
        uploadFile(formData.fotoKTP!),
        uploadFile(formData.fotoSIM!),
        uploadFile(formData.fotoSelfie!)
      ])

      // Prepare submission data
      const submissionData = {
        ...formData,
        tahunKendaraan: parseInt(formData.tahunKendaraan),
        fotoSTNK,
        fotoKTP,
        fotoSIM,
        fotoSelfie
      }

      console.log('Submitting application with data:', {
        ...submissionData,
        fotoSTNK: '[FILE_URL]',
        fotoKTP: '[FILE_URL]',
        fotoSIM: '[FILE_URL]',
        fotoSelfie: '[FILE_URL]',
      })

      // Submit application
      const response = await fetch('/api/partnership/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      const responseData = await response.json()
      console.log('Response data:', responseData)

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to submit application')
      }

      toast({
        title: 'Success!',
        description: 'Your application has been submitted successfully. We will contact you soon.',
      })

      // Reset form
      setFormData({
        email: '',
        nama: '',
        jenisKelamin: '',
        tanggalLahir: '',
        alamatRumah: '',
        nomorHp: '',
        nomorWhatsApp: '',
        jenisKendaraan: '',
        merkTypeKendaraan: '',
        nomorPolisi: '',
        tahunKendaraan: '',
        fotoSTNK: null,
        fotoKTP: null,
        fotoSIM: null,
        fotoSelfie: null,
        pernahJadiKurir: false,
        pengalamanKurir: '',
        waktuKerja: [],
        siapTraining: false,
        setujuBPJS: false,
        dataBenar: false,
        setujuSyarat: false
      })
      setCurrentStep(1)

      // Redirect to home after success
      setTimeout(() => {
        router.push('/')
      }, 3000)

    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit application',
        variant: 'destructive'
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!settings.showPartnershipMenu) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Partnership Program Not Available</h1>
          <p className="text-gray-600 mb-6">The partnership program is currently not available.</p>
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </div>
      </div>
    )
  }

  const steps = [
    { id: 1, title: 'Data Pribadi', icon: User },
    { id: 2, title: 'Data Kendaraan', icon: Car },
    { id: 3, title: 'Dokumen Pendukung', icon: FileText },
    { id: 4, title: 'Informasi Tambahan', icon: Info },
    { id: 5, title: 'Persetujuan', icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {settings.partnershipButtonText}
          </h1>
          {settings.partnershipDescription && (
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6">{settings.partnershipDescription}</p>
          )}
          
          {/* Progress Steps - Enhanced Mobile Friendly */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile: Enhanced Vertical Progress with Numbers */}
            <div className="block sm:hidden">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-200">
                  <div 
                    className="w-full bg-gradient-to-b from-red-600 to-red-400 transition-all duration-500 ease-out"
                    style={{ height: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  />
                </div>
                
                {/* Steps */}
                <div className="space-y-4">
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = currentStep === step.id
                    const isCompleted = currentStep > step.id
                    const isUpcoming = currentStep < step.id
                    
                    return (
                      <div key={step.id} className="relative flex items-center">
                        {/* Step Circle with Animation */}
                        <div className="relative z-10">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 transform ${
                            isActive 
                              ? 'border-red-600 bg-red-600 text-white scale-110 shadow-lg shadow-red-200' 
                              : isCompleted 
                                ? 'border-green-600 bg-green-600 text-white scale-105 shadow-md shadow-green-200'
                                : isUpcoming
                                  ? 'border-gray-300 bg-white text-gray-400 scale-100'
                                  : 'border-gray-300 bg-white text-gray-500 scale-100'
                          }`}>
                            {isCompleted ? (
                              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className="text-xs font-bold">{step.id}</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Step Content */}
                        <div className="ml-4 flex-1">
                          <div className={`p-3 rounded-lg transition-all duration-300 ${
                            isActive 
                              ? 'bg-red-50 border border-red-200 shadow-sm' 
                              : isCompleted 
                                ? 'bg-green-50 border border-green-200 shadow-sm'
                                : 'bg-white border border-gray-200'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className={`text-sm font-semibold ${
                                  isActive 
                                    ? 'text-red-700' 
                                    : isCompleted 
                                      ? 'text-green-700'
                                      : 'text-gray-500'
                                }`}>
                                  {step.title}
                                </p>
                                <p className={`text-xs mt-1 ${
                                  isActive 
                                    ? 'text-red-600' 
                                    : isCompleted 
                                      ? 'text-green-600'
                                      : 'text-gray-400'
                                }`}>
                                  {isActive ? 'Langkah ini' : isCompleted ? 'Selesai' : 'Menunggu'}
                                </p>
                              </div>
                              <Icon className={`h-5 w-5 ${
                                isActive 
                                  ? 'text-red-600' 
                                  : isCompleted 
                                    ? 'text-green-600'
                                    : 'text-gray-400'
                              }`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            
            {/* Desktop: Horizontal Progress */}
            <div className="hidden sm:flex justify-center">
              <div className="flex items-center space-x-2 sm:space-x-4">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = currentStep === step.id
                  const isCompleted = currentStep > step.id
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 ${
                        isActive 
                          ? 'border-red-600 bg-red-600 text-white scale-110 shadow-lg shadow-red-200' 
                          : isCompleted 
                            ? 'border-green-600 bg-green-600 text-white scale-105 shadow-md shadow-green-200'
                            : 'border-gray-300 bg-white text-gray-500 scale-100'
                      }`}>
                        {isCompleted ? (
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </div>
                      <span className={`ml-1 sm:ml-2 text-xs sm:text-sm font-medium transition-colors duration-300 ${
                        isActive ? 'text-red-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                      {index < steps.length - 1 && (
                        <div className={`w-4 sm:w-8 h-0.5 mx-1 sm:mx-4 transition-all duration-500 ${
                          isCompleted ? 'bg-green-600' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            {/* Step 1: Data Pribadi */}
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Data Pribadi</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="email">Email Aktif *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="email@example.com"
                      className={validationErrors.email ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1">Email harus diisi</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="nama">Nama Lengkap *</Label>
                    <Input
                      id="nama"
                      value={formData.nama}
                      onChange={(e) => handleInputChange('nama', e.target.value)}
                      placeholder="John Doe"
                      className={validationErrors.nama ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {validationErrors.nama && (
                      <p className="text-red-500 text-sm mt-1">Nama lengkap harus diisi</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="jenisKelamin">Jenis Kelamin *</Label>
                    <Select value={formData.jenisKelamin} onValueChange={(value) => handleInputChange('jenisKelamin', value)}>
                      <SelectTrigger className={validationErrors.jenisKelamin ? "border-red-300 focus:border-red-500" : ""}>
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.jenisKelamin && (
                      <p className="text-red-500 text-sm mt-1">Jenis kelamin harus dipilih</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tanggalLahir">Tanggal Lahir *</Label>
                    <Input
                      id="tanggalLahir"
                      type="date"
                      value={formData.tanggalLahir}
                      onChange={(e) => handleInputChange('tanggalLahir', e.target.value)}
                      className={validationErrors.tanggalLahir ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {validationErrors.tanggalLahir && (
                      <p className="text-red-500 text-sm mt-1">Tanggal lahir harus diisi</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="alamatRumah">Alamat Rumah *</Label>
                    <textarea
                      id="alamatRumah"
                      className={`w-full min-h-[80px] sm:min-h-[100px] px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${validationErrors.alamatRumah ? "border-red-300 focus:border-red-500" : "border-gray-300"}`}
                      value={formData.alamatRumah}
                      onChange={(e) => handleInputChange('alamatRumah', e.target.value)}
                      placeholder="Jl. Example No. 123, Jakarta"
                    />
                    {validationErrors.alamatRumah && (
                      <p className="text-red-500 text-sm mt-1">Alamat rumah harus diisi</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="nomorHp">Nomor HP Aktif *</Label>
                    <Input
                      id="nomorHp"
                      value={formData.nomorHp}
                      onChange={(e) => handleInputChange('nomorHp', e.target.value)}
                      placeholder="08123456789"
                      className={validationErrors.nomorHp ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {validationErrors.nomorHp && (
                      <p className="text-red-500 text-sm mt-1">Nomor HP harus diisi</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="nomorWhatsApp">Nomor WhatsApp *</Label>
                    <Input
                      id="nomorWhatsApp"
                      value={formData.nomorWhatsApp}
                      onChange={(e) => handleInputChange('nomorWhatsApp', e.target.value)}
                      placeholder="08123456789"
                      className={validationErrors.nomorWhatsApp ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {validationErrors.nomorWhatsApp && (
                      <p className="text-red-500 text-sm mt-1">Nomor WhatsApp harus diisi</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Data Kendaraan */}
            {currentStep === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Data Kendaraan</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="jenisKendaraan">Jenis Kendaraan *</Label>
                    <Select value={formData.jenisKendaraan} onValueChange={(value) => handleInputChange('jenisKendaraan', value)}>
                      <SelectTrigger className={validationErrors.jenisKendaraan ? "border-red-300 focus:border-red-500" : ""}>
                        <SelectValue placeholder="Pilih jenis kendaraan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Motor">Motor</SelectItem>
                        <SelectItem value="Mobil">Mobil</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.jenisKendaraan && (
                      <p className="text-red-500 text-sm mt-1">Jenis kendaraan harus dipilih</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="merkTypeKendaraan">Merk dan Type Kendaraan *</Label>
                    <Input
                      id="merkTypeKendaraan"
                      value={formData.merkTypeKendaraan}
                      onChange={(e) => handleInputChange('merkTypeKendaraan', e.target.value)}
                      placeholder="Honda Beat 2020"
                      className={validationErrors.merkTypeKendaraan ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {validationErrors.merkTypeKendaraan && (
                      <p className="text-red-500 text-sm mt-1">Merk dan type kendaraan harus diisi</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="nomorPolisi">Nomor Polisi *</Label>
                    <Input
                      id="nomorPolisi"
                      value={formData.nomorPolisi}
                      onChange={(e) => handleInputChange('nomorPolisi', e.target.value)}
                      placeholder="B 1234 ABC"
                      className={validationErrors.nomorPolisi ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {validationErrors.nomorPolisi && (
                      <p className="text-red-500 text-sm mt-1">Nomor polisi harus diisi</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tahunKendaraan">Tahun Kendaraan *</Label>
                    <Input
                      id="tahunKendaraan"
                      type="number"
                      value={formData.tahunKendaraan}
                      onChange={(e) => handleInputChange('tahunKendaraan', e.target.value)}
                      placeholder="2020"
                      className={validationErrors.tahunKendaraan ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {validationErrors.tahunKendaraan && (
                      <p className="text-red-500 text-sm mt-1">Tahun kendaraan harus diisi</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="fotoSTNK">Foto STNK *</Label>
                    <div className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center ${validationErrors.fotoSTNK ? "border-red-300 bg-red-50" : "border-gray-300"}`}>
                      <input
                        type="file"
                        id="fotoSTNK"
                        accept="image/*"
                        onChange={(e) => handleFileChange('fotoSTNK', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label htmlFor="fotoSTNK" className="cursor-pointer">
                        {formData.fotoSTNK ? (
                          <div>
                            <p className="text-sm text-green-600">File selected: {formData.fotoSTNK.name}</p>
                          </div>
                        ) : (
                          <div>
                            <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                            <p className="text-xs sm:text-sm text-gray-600">Click to upload STNK image</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                    {validationErrors.fotoSTNK && (
                      <p className="text-red-500 text-sm mt-1">Foto STNK harus diupload</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Dokumen Pendukung */}
            {currentStep === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Dokumen Pendukung</h2>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="fotoKTP">Foto KTP *</Label>
                    <div className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center ${validationErrors.fotoKTP ? "border-red-300 bg-red-50" : "border-gray-300"}`}>
                      <input
                        type="file"
                        id="fotoKTP"
                        accept="image/*"
                        onChange={(e) => handleFileChange('fotoKTP', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label htmlFor="fotoKTP" className="cursor-pointer">
                        {formData.fotoKTP ? (
                          <div>
                            <p className="text-sm text-green-600">File selected: {formData.fotoKTP.name}</p>
                          </div>
                        ) : (
                          <div>
                            <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                            <p className="text-xs sm:text-sm text-gray-600">Click to upload KTP image</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                    {validationErrors.fotoKTP && (
                      <p className="text-red-500 text-sm mt-1">Foto KTP harus diupload</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="fotoSIM">Foto SIM *</Label>
                    <div className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center ${validationErrors.fotoSIM ? "border-red-300 bg-red-50" : "border-gray-300"}`}>
                      <input
                        type="file"
                        id="fotoSIM"
                        accept="image/*"
                        onChange={(e) => handleFileChange('fotoSIM', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label htmlFor="fotoSIM" className="cursor-pointer">
                        {formData.fotoSIM ? (
                          <div>
                            <p className="text-sm text-green-600">File selected: {formData.fotoSIM.name}</p>
                          </div>
                        ) : (
                          <div>
                            <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                            <p className="text-xs sm:text-sm text-gray-600">Click to upload SIM image</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                    {validationErrors.fotoSIM && (
                      <p className="text-red-500 text-sm mt-1">Foto SIM harus diupload</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="fotoSelfie">Foto Selfi *</Label>
                    <div className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center ${validationErrors.fotoSelfie ? "border-red-300 bg-red-50" : "border-gray-300"}`}>
                      <input
                        type="file"
                        id="fotoSelfie"
                        accept="image/*"
                        onChange={(e) => handleFileChange('fotoSelfie', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label htmlFor="fotoSelfie" className="cursor-pointer">
                        {formData.fotoSelfie ? (
                          <div>
                            <p className="text-sm text-green-600">File selected: {formData.fotoSelfie.name}</p>
                          </div>
                        ) : (
                          <div>
                            <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                            <p className="text-xs sm:text-sm text-gray-600">Click to upload selfie photo</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                    {validationErrors.fotoSelfie && (
                      <p className="text-red-500 text-sm mt-1">Foto selfie harus diupload</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Informasi Tambahan */}
            {currentStep === 4 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Informasi Tambahan</h2>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Label>Pernah menjadi Kurir sebelumnya? *</Label>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 sm:mt-2 space-y-2 sm:space-y-0">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={formData.pernahJadiKurir === true}
                          onChange={() => handleInputChange('pernahJadiKurir', true)}
                          className="mr-2"
                        />
                        Ya
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={formData.pernahJadiKurir === false}
                          onChange={() => handleInputChange('pernahJadiKurir', false)}
                          className="mr-2"
                        />
                        Tidak
                      </label>
                    </div>
                    {formData.pernahJadiKurir && (
                      <div className="mt-3 sm:mt-4">
                        <Label htmlFor="pengalamanKurir">Jelaskan pengalaman Anda</Label>
                        <textarea
                          id="pengalamanKurir"
                          className="w-full min-h-[80px] sm:min-h-[100px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mt-2"
                          value={formData.pengalamanKurir}
                          onChange={(e) => handleInputChange('pengalamanKurir', e.target.value)}
                          placeholder="Jelaskan pengalaman Anda sebagai kurir..."
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Waktu kerja (pilih semua yang sesuai) *</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-2">
                      {['Pagi', 'Siang', 'Malam'].map((waktu) => (
                        <label key={waktu} className="flex items-center">
                          <Checkbox
                            checked={formData.waktuKerja.includes(waktu)}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                handleInputChange('waktuKerja', [...formData.waktuKerja, waktu])
                              } else {
                                handleInputChange('waktuKerja', formData.waktuKerja.filter(w => w !== waktu))
                              }
                            }}
                            className="mr-2"
                          />
                          {waktu}
                        </label>
                      ))}
                    </div>
                    {validationErrors.waktuKerja && (
                      <p className="text-red-500 text-sm mt-1">Waktu kerja harus dipilih minimal satu</p>
                    )}
                  </div>

                  <div>
                    <Label>Siap mengikuti training singkat Kurirqu? *</Label>
                    <div className="flex space-x-4 mt-2">
                      <label className="flex items-center">
                        <Checkbox
                          checked={formData.siapTraining}
                          onCheckedChange={(checked: boolean) => handleInputChange('siapTraining', checked)}
                          className="mr-2"
                        />
                        Ya
                      </label>
                    </div>
                    {validationErrors.siapTraining && (
                      <p className="text-red-500 text-sm mt-1">Anda harus siap mengikuti training</p>
                    )}
                  </div>

                  <div>
                    <Label>Jika terdaftar menjadi anggota Kurirqu wajib mendaftarkan BPJS Ketenagakerjaan? *</Label>
                    <div className="flex space-x-4 mt-2">
                      <label className="flex items-center">
                        <Checkbox
                          checked={formData.setujuBPJS}
                          onCheckedChange={(checked: boolean) => handleInputChange('setujuBPJS', checked)}
                          className="mr-2"
                        />
                        Ya
                      </label>
                    </div>
                    {validationErrors.setujuBPJS && (
                      <p className="text-red-500 text-sm mt-1">Anda harus setuju dengan BPJS Ketenagakerjaan</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Persetujuan */}
            {currentStep === 5 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Persetujuan</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={formData.dataBenar}
                      onCheckedChange={(checked: boolean) => handleInputChange('dataBenar', checked)}
                      className="mt-1"
                    />
                    <label className="text-sm">
                      Saya menyatakan bahwa data yang saya berikan adalah benar.
                    </label>
                  </div>
                  {validationErrors.dataBenar && (
                    <p className="text-red-500 text-sm ml-6">Anda harus menyatakan bahwa data yang diberikan adalah benar</p>
                  )}

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={formData.setujuSyarat}
                      onCheckedChange={(checked: boolean) => handleInputChange('setujuSyarat', checked)}
                      className="mt-1"
                    />
                    <label className="text-sm">
                      Saya setuju dengan syarat dan ketentuan Kurirqu.
                    </label>
                  </div>
                  {validationErrors.setujuSyarat && (
                    <p className="text-red-500 text-sm ml-6">Anda harus setuju dengan syarat dan ketentuan</p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6">
                  <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Ringkasan Data Anda:</h3>
                  <div className="text-xs sm:text-sm text-blue-800 space-y-1">
                    <p><strong>Nama:</strong> {formData.nama}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>No. HP:</strong> {formData.nomorHp}</p>
                    <p><strong>Kendaraan:</strong> {formData.jenisKendaraan} - {formData.merkTypeKendaraan}</p>
                    <p><strong>Waktu Kerja:</strong> {formData.waktuKerja.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Previous
              </Button>

              {currentStep < 5 ? (
                <Button onClick={nextStep} className="bg-red-600 hover:bg-red-700 w-full sm:w-auto order-1 sm:order-2">
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={submitting}
                  className="bg-red-600 hover:bg-red-700 w-full sm:w-auto order-1 sm:order-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
