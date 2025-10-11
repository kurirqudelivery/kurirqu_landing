"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
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
        body: JSON.stringify({ stats }),
      })

      if (response.ok) {
        setMessage('Statistics saved successfully!')
      } else {
        setMessage('Error saving statistics')
      }
    } catch (error) {
      console.error('Error saving stats:', error)
      setMessage('Error saving statistics')
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Statistics</h2>
        <p className="text-gray-600 mt-2">Manage company statistics and achievements</p>
        
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => router.push('/admin')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button onClick={addStat}>
            <Plus className="mr-2 h-4 w-4" />
            Add Statistic
          </Button>
        </div>
      </div>

      <div className="space-y-6">

        {message && (
          <Alert className={message.includes('Error') ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {stats.map((stat, index) => (
            <Card key={stat.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Statistic {index + 1}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeStat(stat.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`label-${stat.id}`}>Label</Label>
                    <Input
                      id={`label-${stat.id}`}
                      value={stat.label}
                      onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                      placeholder="e.g., Happy Customers"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`value-${stat.id}`}>Value</Label>
                    <Input
                      id={`value-${stat.id}`}
                      value={stat.value}
                      onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                      placeholder="e.g., 10,000+"
                    />
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
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}
