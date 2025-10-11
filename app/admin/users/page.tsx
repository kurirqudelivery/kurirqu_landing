"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, Plus, Trash2, Mail, Shield, Eye, EyeOff } from 'lucide-react'

interface User {
  email: string
  name: string
  role: 'admin' | 'superadmin'
  isActive: boolean
  createdAt: string
  lastLogin?: string
}

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({})
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    role: 'admin' as 'admin' | 'superadmin',
    password: ''
  })
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      const result = await response.json()
      if (result.success) {
        setUsers(result.users || [])
      } else {
        setMessage({ type: 'error', text: result.error || 'Gagal memuat data pengguna' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Gagal memuat data pengguna' })
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async () => {
    if (!newUser.email || !newUser.name || !newUser.password) {
      setMessage({ type: 'error', text: 'Semua field harus diisi' })
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      const result = await response.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Pengguna berhasil ditambahkan!' })
        setNewUser({ email: '', name: '', role: 'admin', password: '' })
        setShowAddForm(false)
        fetchUsers()
      } else {
        setMessage({ type: 'error', text: result.error || 'Gagal menambahkan pengguna' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat menambahkan pengguna' })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteUser = async (email: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/users/${email}`, {
        method: 'DELETE',
      })

      const result = await response.json()
      if (result.success) {
        setMessage({ type: 'success', text: 'Pengguna berhasil dihapus!' })
        fetchUsers()
      } else {
        setMessage({ type: 'error', text: result.error || 'Gagal menghapus pengguna' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat menghapus pengguna' })
    }
  }

  const toggleShowPassword = (email: string) => {
    setShowPassword(prev => ({
      ...prev,
      [email]: !prev[email]
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Admin Users</h2>
        <p className="text-gray-600 mt-2">Kelola akun admin dan superadmin</p>
      </div>

      {message && (
        <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {/* Add User Button */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Tambah Pengguna Baru</CardTitle>
              <Button 
                onClick={() => setShowAddForm(!showAddForm)}
                variant={showAddForm ? "outline" : "default"}
              >
                {showAddForm ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Sembunyikan Form
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Pengguna
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          {showAddForm && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newEmail">Email</Label>
                  <Input
                    id="newEmail"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="newName">Nama Lengkap</Label>
                  <Input
                    id="newName"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nama lengkap"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Minimal 6 karakter"
                  />
                </div>
                <div>
                  <Label htmlFor="newRole">Role</Label>
                  <select
                    id="newRole"
                    value={newUser.role}
                    onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as 'admin' | 'superadmin' }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Superadmin</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddUser} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Menambahkan...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Tambah Pengguna
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Belum ada pengguna yang terdaftar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.email} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-lg">{user.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'superadmin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role === 'superadmin' ? 'Superadmin' : 'Admin'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Aktif' : 'Tidak Aktif'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="h-4 w-4" />
                            <span>Password: {showPassword[user.email] ? '********' : '••••••'}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleShowPassword(user.email)}
                              className="h-6 w-6 p-0"
                            >
                              {showPassword[user.email] ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Dibuat: {new Date(user.createdAt).toLocaleDateString('id-ID')}
                          {user.lastLogin && (
                            <span className="ml-4">
                              Login terakhir: {new Date(user.lastLogin).toLocaleDateString('id-ID')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleDeleteUser(user.email)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
