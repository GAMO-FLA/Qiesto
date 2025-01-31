import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import {
  Settings,
  Shield,
  Mail,
  Palette,
  Code,
  Globe,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPanel() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'GenLink',
    siteUrl: 'https://genlink.com',
    supportEmail: 'support@genlink.com',
    enableRegistration: true,
    enableNotifications: true,
    maintenanceMode: false,
    apiKey: '**********************',
    theme: 'light'
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white p-1 rounded-lg shadow-sm">
          <TabsTrigger value="general" className="space-x-2">
            <Settings className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="space-x-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="space-x-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="space-x-2">
            <Code className="h-4 w-4" />
            <span>API</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="space-x-2">
            <Palette className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Site Name
                  </label>
                  <Input
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Site URL
                  </label>
                  <Input
                    value={settings.siteUrl}
                    onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Registration</p>
                    <p className="text-sm text-gray-500">Allow new users to register</p>
                  </div>
                  <Switch
                    checked={settings.enableRegistration}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, enableRegistration: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-gray-500">Put site in maintenance mode</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, maintenanceMode: checked})}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            {/* Security settings content */}
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="p-6">
            {/* Email settings content */}
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="p-6">
            {/* API settings content */}
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="p-6">
            {/* Appearance settings content */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}