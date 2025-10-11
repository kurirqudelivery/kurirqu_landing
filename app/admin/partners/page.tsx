"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Search, Download, Eye, CheckCircle, XCircle, Clock, User } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface PartnerApplication {
  _id: string
  email: string
  nama: string
  jenisKelamin: 'Laki-laki' | 'Perempuan'
  tanggalLahir: string
  alamatRumah: string
  nomorHp: string
  nomorWhatsApp: string
  jenisKendaraan: 'Motor' | 'Mobil'
  merkTypeKendaraan: string
  nomorPolisi: string
  tahunKendaraan: number
  fotoSTNK: string
  fotoKTP: string
  fotoSIM: string
  fotoSelfie: string
  pernahJadiKurir: boolean
  pengalamanKurir?: string
  waktuKerja: ('Pagi' | 'Siang' | 'Malam')[]
  siapTraining: boolean
  setujuBPJS: boolean
  dataBenar: boolean
  setujuSyarat: boolean
  status: 'pending' | 'review' | 'approved' | 'rejected'
  createdAt: string
  updatedAt?: string
  reviewedBy?: string
  reviewedAt?: string
  notes?: string
}

interface PartnersResponse {
  applications: PartnerApplication[]
  total: number
  page: number
  totalPages: number
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  review: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
}

const statusIcons = {
  pending: Clock,
  review: Eye,
  approved: CheckCircle,
  rejected: XCircle
}

export default function PartnersPage() {
  const [applications, setApplications] = useState<PartnerApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [selectedApplication, setSelectedApplication] = useState<PartnerApplication | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [statusNotes, setStatusNotes] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<PartnerApplication['status']>('pending')
  const [sendEmailNotification, setSendEmailNotification] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchApplications()
  }, [search, statusFilter, page])

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      })
      
      if (search) params.append('search', search)
      if (statusFilter !== 'all') params.append('status', statusFilter)

      const response = await fetch(`/api/admin/partners?${params}`)
      const data: PartnersResponse = await response.json()
      
      setApplications(data.applications)
      setTotalPages(data.totalPages)
      setTotal(data.total)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch partner applications',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (applicationId: string, newStatus: PartnerApplication['status'], notes?: string) => {
    setUpdatingStatus(true)
    try {
      const response = await fetch(`/api/admin/partners/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          status: newStatus, 
          notes,
          sendEmailNotification,
          reviewedBy: 'Admin'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      const result = await response.json()
      
      toast({
        title: 'Success',
        description: `Application status updated to ${newStatus}${sendEmailNotification ? ' and email sent' : ''}`
      })

      fetchApplications()
      setShowDetailModal(false)
      setSelectedApplication(null)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update application status',
        variant: 'destructive'
      })
    } finally {
      setUpdatingStatus(false)
    }
  }

  const handleDelete = async (applicationId: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return

    try {
      const response = await fetch(`/api/admin/partners/${applicationId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete application')
      }

      toast({
        title: 'Success',
        description: 'Application deleted successfully'
      })

      fetchApplications()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete application',
        variant: 'destructive'
      })
    }
  }

  const viewApplication = (application: PartnerApplication) => {
    setSelectedApplication(application)
    setSelectedStatus(application.status)
    setStatusNotes('')
    setSendEmailNotification(true)
    setShowDetailModal(true)
  }

  if (loading && applications.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Partner Applications</h1>
          <p className="text-gray-600">Manage partnership program applications</p>
        </div>
        <div className="text-sm text-gray-600">
          Total: {total} applications
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or phone..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={(value: string) => {
                setStatusFilter(value)
                setPage(1)
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => {
                  const StatusIcon = statusIcons[application.status]
                  return (
                    <tr key={application._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.nama}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.jenisKelamin}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.email}</div>
                        <div className="text-sm text-gray-500">{application.nomorHp}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.jenisKendaraan}</div>
                        <div className="text-sm text-gray-500">{application.merkTypeKendaraan}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(application.createdAt), 'dd MMM yyyy', { locale: id })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewApplication(application)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(application._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, total)} of {total} results
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal - Full Page */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="min-h-screen">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <h2 className="text-2xl font-bold">Application Details</h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowDetailModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.nama}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.jenisKelamin}</p>
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <p className="text-sm text-gray-600">
                      {format(new Date(selectedApplication.tanggalLahir), 'dd MMMM yyyy', { locale: id })}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label>Address</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.alamatRumah}</p>
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.nomorHp}</p>
                  </div>
                  <div>
                    <Label>WhatsApp</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.nomorWhatsApp}</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Vehicle Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Vehicle Type</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.jenisKendaraan}</p>
                  </div>
                  <div>
                    <Label>Brand & Type</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.merkTypeKendaraan}</p>
                  </div>
                  <div>
                    <Label>License Plate</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.nomorPolisi}</p>
                  </div>
                  <div>
                    <Label>Year</Label>
                    <p className="text-sm text-gray-600">{selectedApplication.tahunKendaraan}</p>
                  </div>
                  <div className="col-span-2">
                    <Label>STNK Document</Label>
                    {selectedApplication.fotoSTNK ? (
                      <div className="mt-2">
                        <img 
                          src={selectedApplication.fotoSTNK} 
                          alt="STNK" 
                          className="w-48 h-32 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                          onClick={() => window.open(selectedApplication.fotoSTNK, '_blank')}
                        />
                        <p className="text-xs text-gray-500 mt-1">Click to view full size</p>
                      </div>
                    ) : (
                      <p className="text-sm text-red-600">No document uploaded</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Supporting Documents */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Supporting Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label>KTP Document</Label>
                    {selectedApplication.fotoKTP ? (
                      <div className="mt-2">
                        <img 
                          src={selectedApplication.fotoKTP} 
                          alt="KTP" 
                          className="w-full h-40 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                          onClick={() => window.open(selectedApplication.fotoKTP, '_blank')}
                        />
                        <p className="text-xs text-gray-500 mt-1">Click to view full size</p>
                      </div>
                    ) : (
                      <p className="text-sm text-red-600">No document uploaded</p>
                    )}
                  </div>
                  <div>
                    <Label>SIM Document</Label>
                    {selectedApplication.fotoSIM ? (
                      <div className="mt-2">
                        <img 
                          src={selectedApplication.fotoSIM} 
                          alt="SIM" 
                          className="w-full h-40 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                          onClick={() => window.open(selectedApplication.fotoSIM, '_blank')}
                        />
                        <p className="text-xs text-gray-500 mt-1">Click to view full size</p>
                      </div>
                    ) : (
                      <p className="text-sm text-red-600">No document uploaded</p>
                    )}
                  </div>
                  <div>
                    <Label>Selfie Photo</Label>
                    {selectedApplication.fotoSelfie ? (
                      <div className="mt-2">
                        <img 
                          src={selectedApplication.fotoSelfie} 
                          alt="Selfie" 
                          className="w-full h-40 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                          onClick={() => window.open(selectedApplication.fotoSelfie, '_blank')}
                        />
                        <p className="text-xs text-gray-500 mt-1">Click to view full size</p>
                      </div>
                    ) : (
                      <p className="text-sm text-red-600">No document uploaded</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Previous Courier Experience</Label>
                    <p className="text-sm text-gray-600">
                      {selectedApplication.pernahJadiKurir ? 'Yes' : 'No'}
                    </p>
                    {selectedApplication.pengalamanKurir && (
                      <p className="text-sm text-gray-500 mt-1">{selectedApplication.pengalamanKurir}</p>
                    )}
                  </div>
                  <div>
                    <Label>Work Time</Label>
                    <p className="text-sm text-gray-600">
                      {selectedApplication.waktuKerja.join(', ')}
                    </p>
                  </div>
                  <div>
                    <Label>Ready for Training</Label>
                    <p className="text-sm text-gray-600">
                      {selectedApplication.siapTraining ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <Label>Agree to BPJS</Label>
                    <p className="text-sm text-gray-600">
                      {selectedApplication.setujuBPJS ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Agreement Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Agreement Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Data Confirmation</Label>
                    <p className="text-sm text-gray-600">
                      {selectedApplication.dataBenar ? '✅ Confirmed data is correct' : '❌ Not confirmed'}
                    </p>
                  </div>
                  <div>
                    <Label>Terms & Conditions</Label>
                    <p className="text-sm text-gray-600">
                      {selectedApplication.setujuSyarat ? '✅ Agreed to terms' : '❌ Not agreed'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Review Information */}
              {(selectedApplication.reviewedBy || selectedApplication.reviewedAt || selectedApplication.notes) && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Review Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedApplication.reviewedBy && (
                      <div>
                        <Label>Reviewed By</Label>
                        <p className="text-sm text-gray-600">{selectedApplication.reviewedBy}</p>
                      </div>
                    )}
                    {selectedApplication.reviewedAt && (
                      <div>
                        <Label>Review Date</Label>
                        <p className="text-sm text-gray-600">
                          {format(new Date(selectedApplication.reviewedAt), 'dd MMMM yyyy HH:mm', { locale: id })}
                        </p>
                      </div>
                    )}
                    {selectedApplication.notes && (
                      <div>
                        <Label>Review Notes</Label>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedApplication.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Status Update */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Status Update</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4 items-end">
                    <div className="flex-1 max-w-xs">
                      <Label htmlFor="status">Update Status</Label>
                      <Select 
                        value={selectedStatus} 
                        onValueChange={(value: PartnerApplication['status']) => setSelectedStatus(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="review">Review</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Input
                        id="notes"
                        placeholder="Add review notes..."
                        value={statusNotes}
                        onChange={(e) => setStatusNotes(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={() => handleStatusUpdate(selectedApplication._id, selectedStatus, statusNotes)}
                      disabled={updatingStatus || selectedStatus === selectedApplication.status}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {updatingStatus ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Update Status'
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sendEmail"
                      checked={sendEmailNotification}
                      onChange={(e) => setSendEmailNotification(e.target.checked)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <Label htmlFor="sendEmail" className="text-sm text-gray-600">
                      Send email notification to applicant
                    </Label>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
