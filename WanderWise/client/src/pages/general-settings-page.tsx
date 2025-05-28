import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Settings,
  Bell,
  Eye,
  Lock,
  Key,
  RefreshCw,
  Download,
  Trash2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const GeneralSettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [animationReduced, setAnimationReduced] = useState(false);
  const [searchHistory, setSearchHistory] = useState(true);

  // Font size slider
  const [fontSize, setFontSize] = useState([16]);

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value[0]}px`;
  };

  const resetSettings = () => {
    setEmailNotifications(true);
    setPushNotifications(true);
    setMarketingEmails(false);
    setAutoSave(true);
    setHighContrast(false);
    setLargeText(false);
    setAnimationReduced(false);
    setSearchHistory(true);
    setFontSize([16]);
    document.documentElement.style.fontSize = "16px";
  };
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">General Settings</h1>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Data</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>
                  Customize how the application works for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Auto-save preferences</h3>
                      <p className="text-sm text-muted-foreground">
                        Automatically save your search filters and preferences
                      </p>
                    </div>
                    <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Default currency</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <select
                        className="w-full p-2 border rounded-md"
                        defaultValue="usd"
                      >
                        <option value="usd">USD ($)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="jpy">JPY (¥)</option>
                        <option value="aud">AUD ($)</option>
                        <option value="cad">CAD ($)</option>
                      </select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Distance unit</h3>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="distance" defaultChecked />
                        <span>Kilometers</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="distance" />
                        <span>Miles</span>
                      </label>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Temperature unit</h3>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="temperature" defaultChecked />
                        <span>Celsius</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="temperature" />
                        <span>Fahrenheit</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Update your account information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="current-email">Current Email</Label>
                      <Input
                        id="current-email"
                        value="user@example.com"
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-email">New Email</Label>
                      <Input
                        id="new-email"
                        placeholder="Enter new email address"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <Button variant="outline">Update Email</Button>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <Button variant="outline">Change Password</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Choose how and when you want to be notified.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive booking confirmations and updates via email
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Push Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive real-time alerts on your device
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Marketing Emails</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive special offers and promotions
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Notification Frequency</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="frequency" defaultChecked />
                        <span>Real-time</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="frequency" />
                        <span>Daily digest</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="frequency" />
                        <span>Weekly digest</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Settings</CardTitle>
                <CardDescription>
                  Customize the application to meet your accessibility needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">High Contrast Mode</h3>
                        <p className="text-sm text-muted-foreground">
                          Increase contrast for better visibility
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={highContrast}
                      onCheckedChange={setHighContrast}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Large Text</h3>
                        <p className="text-sm text-muted-foreground">
                          Use larger text throughout the application
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={largeText}
                      onCheckedChange={setLargeText}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Reduce Animations</h3>
                        <p className="text-sm text-muted-foreground">
                          Minimize motion and animations
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={animationReduced}
                      onCheckedChange={setAnimationReduced}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Font Size</h3>
                      <span className="text-sm">{fontSize[0]}px</span>
                    </div>
                    <Slider
                      value={fontSize}
                      min={12}
                      max={24}
                      step={1}
                      onValueChange={handleFontSizeChange}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Small</span>
                      <span>Medium</span>
                      <span>Large</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Data</CardTitle>
                <CardDescription>
                  Manage your privacy settings and personal data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Save Search History</h3>
                        <p className="text-sm text-muted-foreground">
                          Store your recent searches for quicker access
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={searchHistory}
                      onCheckedChange={setSearchHistory}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Key className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Download className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Download Your Data</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Get a copy of all the data we have about you
                    </p>
                    <Button variant="outline">Request Data</Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Trash2 className="h-5 w-5 text-destructive" />
                      <h3 className="font-medium">Delete Account</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Permanently delete your account and all associated data
                    </p>
                    <Button variant="destructive">Delete My Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>{" "}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={resetSettings}>
            Reset All Settings
          </Button>
          <Button>Save Changes</Button>{" "}
        </div>
      </div>
    </>
  );
};

export default GeneralSettingsPage;
