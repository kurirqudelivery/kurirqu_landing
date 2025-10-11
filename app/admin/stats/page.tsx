"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Save, Plus, Trash2, TrendingUp, BarChart3, Eye } from 'lucide-react'
import { StatsContent } from '@/lib/models'

interface Stat {
  id: string
  label: string
  value: string
  description: string
  order: number
}

export default function StatsManagement() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [stats, setStats] = useState<Stat[]>([])
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data: StatsContent = await response.json()
        // Transform StatsItem to Stat format for the form
        const transformedStats = data.stats?.map((stat, index) => ({
          id: stat._id?.toString() || index.toString(),
          label: stat.label,
          value: stat.value,
          description: stat.description,
          order: stat.order
        })) || []
        setStats(transformedStats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      setMessage('Error loading statistics')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: 'Statistik Kami',
          subtitle: 'Pencapaian kami dalam angka',
          stats 
        }),
      })

      if (response.ok) {
        setMessage('✅ Statistics saved successfully!')
      } else {
        setMessage('❌ Error saving statistics')
      }
    } catch (error) {
      console.error('Error saving stats:', error)
      setMessage('❌ Error saving statistics')
    } finally {
      setSaving(false)
    }
  }

  const addStat = () => {
    const newStat: Stat = {
      id: Date.now().toString(),
      label: '',
      value: '',
      description: '',
      order: stats.length + 1
    }
    setStats([...stats, newStat])
  }

  const removeStat = (id: string) => {
    setStats(stats.filter(stat => stat.id !== id))
  }

  const updateStat = (id: string, field: keyof Stat, value: string) => {
    setStats(stats.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ))
  }

  const moveStat = (id: string, direction: 'up' | 'down') => {
    const index = stats.findIndex(stat => stat.id === id)
    if (index === -1) return

    const newStats = [...stats]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    if (targetIndex >= 0 && targetIndex < newStats.length) {
      // Swap positions
      [newStats[index], newStats[targetIndex]] = [newStats[targetIndex], newStats[index]]
      
      // Update order values
      newStats.forEach((stat, idx) => {
        stat.order = idx + 1
      })
      
      setStats(newStats)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading statistics...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center">
          <BarChart3 className="mr-3 h-8 w-8 text-blue-600" />
          Statistics Management
        </h2>
        <p className="text-gray-600 mt-2">Manage company statistics and achievements that will be displayed on the landing page</p>
        
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => router.push('/admin')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="mr-2 h-4 w-4" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
            <Button onClick={addStat}>
              <Plus className="mr-2 h-4 w-4" />
              Add Statistic
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Eye className="mr-2 h-5 w-5" />
              Live Preview
            </CardTitle>
            <CardDescription>
              This is how your statistics will appear on the landing page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.filter(stat => stat.label && stat.value).map((stat) => (
                <div key={stat.id} className="text-center p-6 bg-white rounded-lg shadow-sm border">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              ))}
            </div>
            {stats.filter(stat => stat.label && stat.value).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Add statistics to see the preview</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {message && (
        <Alert className={message.includes('✅') ? 'border-green-200 bg-green-50 mb-6' : 'border-red-200 bg-red-50 mb-6'}>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {/* Statistics Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
            Statistics Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.length}</div>
              <div className="text-sm text-gray-600">Total Stats</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {stats.filter(stat => stat.label && stat.value).length}
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {stats.filter(stat => !stat.label || !stat.value).length}
              </div>
              <div className="text-sm text-gray-600">Incomplete</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {stats.filter(stat => stat.description).length}
              </div>
              <div className="text-sm text-gray-600">With Description</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics List */}
      <div className="space-y-4">
        {stats.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Statistics Yet</h3>
              <p className="text-gray-600 mb-4">Start by adding your first statistic to showcase your company achievements</p>
              <Button onClick={addStat}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Statistic
              </Button>
            </CardContent>
          </Card>
        ) : (
          stats.map((stat, index) => (
            <Card key={stat.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <div className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded mr-3">
                      #{index + 1}
                    </div>
                    Statistic {index + 1}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveStat(stat.id, 'up')}
                      disabled={index === 0}
                    >
                      ↑
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveStat(stat.id, 'down')}
                      disabled={index === stats.length - 1}
                    >
                      ↓
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeStat(stat.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`label-${stat.id}`}>Label *</Label>
                    <Input
                      id={`label-${stat.id}`}
                      value={stat.label}
                      onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                      placeholder="e.g., Happy Customers"
                      className={!stat.label ? 'border-red-300' : ''}
                    />
                    {!stat.label && (
                      <p className="text-xs text-red-500">Label is required</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`value-${stat.id}`}>Value *</Label>
                    <Input
                      id={`value-${stat.id}`}
                      value={stat.value}
                      onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                      placeholder="e.g., 10,000+"
                      className={!stat.value ? 'border-red-300' : ''}
                    />
                    {!stat.value && (
                      <p className="text-xs text-red-500">Value is required</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`description-${stat.id}`}>Description</Label>
                    <Input
                      id={`description-${stat.id}`}
                      value={stat.description}
                      onChange={(e) => updateStat(stat.id, 'description', e.target.value)}
                      placeholder="e.g., Satisfied customers nationwide"
                    />
                  </div>
                </div>
                
                {/* Mini Preview */}
                {(stat.label || stat.value) && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                    <p className="text-xs text-gray-500 mb-2">Preview:</p>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">{stat.value || 'Value'}</div>
                      <div className="text-sm font-semibold text-gray-900">{stat.label || 'Label'}</div>
                      <div className="text-xs text-gray-600">{stat.description || 'Description'}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Save Section */}
      {stats.length > 0 && (
        <div className="mt-8 flex justify-end">
          <Card className="w-full md:w-auto">
            <CardContent className="p-4">
              <div className="flex items-center justify-between space-x-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {stats.filter(stat => stat.label && stat.value).length} of {stats.length} statistics complete
                  </p>
                  <p className="text-xs text-gray-500">
                    Only complete statistics will be displayed
                  </p>
                </div>
                <Button onClick={handleSave} disabled={saving}>
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
