'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'react-hot-toast';

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        siteTitle: '',
        siteDescription: '',
        contactEmail: '',
        contactPhone: '',
        darkMode: true,
        logo: null,
    });

    useEffect(() => {
        // fetchSettings(); // if dynamic from API
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };

    const handleToggle = () => {
        setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setSettings({ ...settings, logo: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // API POST or PUT here with settings
        toast.success('Settings saved!');
    };

    return (
        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
            <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <div>
                    <Label htmlFor="siteTitle">Site Title</Label>
                    <Input
                        id="siteTitle"
                        name="siteTitle"
                        value={settings.siteTitle}
                        onChange={handleChange}
                        placeholder="e.g. My E-Commerce"
                    />
                </div>

                <div>
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input
                        id="siteDescription"
                        name="siteDescription"
                        value={settings.siteDescription}
                        onChange={handleChange}
                        placeholder="Short description of your platform"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                            id="contactEmail"
                            name="contactEmail"
                            value={settings.contactEmail}
                            onChange={handleChange}
                            type="email"
                        />
                    </div>
                    <div>
                        <Label htmlFor="contactPhone">Contact Phone</Label>
                        <Input
                            id="contactPhone"
                            name="contactPhone"
                            value={settings.contactPhone}
                            onChange={handleChange}
                            type="tel"
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="logo">Site Logo</Label>
                    <Input
                        id="logo"
                        name="logo"
                        type="file"
                        onChange={handleLogoChange}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <span className="font-medium">Enable Dark Mode</span>
                    <Switch checked={settings.darkMode} onCheckedChange={handleToggle} />
                </div>

                <Button type="submit" className="mt-4">
                    Save Settings
                </Button>
            </form>
        </div>
    );
};

export default SettingsPage;
