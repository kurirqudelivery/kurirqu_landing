"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Save } from 'lucide-react'

interface PartnershipSettings {
  showPartnershipMenu: boolean
  partnershipButtonText: string
  partnershipDescription?: string
}

export default function PartnershipSettingsPage() {
  const [settings, setSettings] = useState<PartnershipSettings>({
    showPartnershipMenu: false,
    partnershipButtonText: 'Jadilah Mitra Kami',
    partnershipDescription: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/partnership-settings')
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch partnership settings',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/partnership-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      toast({
        title: 'Success',
        description: 'Partnership settings saved successfully'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save partnership settings',
        variant: 'destructive'
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
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
          <h1 className="text-3xl font-bold">Partnership Settings</h1>
          <p className="text-gray-600">Manage partnership program settings</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-red-600 hover:bg-red-700"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Partnership Menu Settings</CardTitle>
          <CardDescription>
            Configure the partnership menu visibility and text
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-menu">Show Partnership Menu</Label>
              <p className="text-sm text-gray-600">
                When enabled, the partnership button will appear in the navigation
              </p>
            </div>
            <Switch
              id="show-menu"
              checked={settings.showPartnershipMenu}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ ...prev, showPartnershipMenu: checked }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="button-text">Button Text</Label>
            <Input
              id="button-text"
              value={settings.partnershipButtonText}
              onChange={(e) => 
                setSettings(prev => ({ ...prev, partnershipButtonText: e.target.value }))
              }
              placeholder="Jadilah Mitra Kami"
            />
            <p className="text-sm text-gray-600">
              Text that will appear on the partnership button
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <textarea
              id="description"
              className="w-full min-h-[100px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={settings.partnershipDescription || ''}
              onChange={(e) => 
                setSettings(prev => ({ ...prev, partnershipDescription: e.target.value }))
              }
              placeholder="Additional description for the partnership program..."
            />
            <p className="text-sm text-gray-600">
              Additional description that can be used on the partnership page
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            See how the partnership button will appear
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg bg-gray-50">
            {settings.showPartnershipMenu ? (
              <Button className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] hover:from-[#5a1315] hover:to-[#9a1719] text-white rounded-full px-6 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                {settings.partnershipButtonText}
              </Button>
            ) : (
              <div className="text-center text-gray-500 py-2">
                Partnership menu is currently disabled
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
