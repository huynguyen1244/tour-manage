import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserCog,
  Edit,
  CreditCard,
  Key,
  Bell,
  Shield,
  Globe,
  Palette,
  Languages,
  Phone,
  Mail,
  Calendar,
  MapPin,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const AccountSettingsPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    dateOfBirth: "",
    country: "",
    city: "",
    bio: "",
    website: "",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    profilePublic: true,
    showOnlineStatus: true,
    allowMessaging: true,
    marketingEmails: false,
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const quickActions = [
    {
      title: "Edit Profile",
      description: "Update your personal information",
      icon: Edit,
      href: "/profile",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Payment Methods",
      description: "Manage your payment cards",
      icon: CreditCard,
      href: "/payment-methods",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Change Password",
      description: "Update your account password",
      icon: Key,
      href: "/change-password",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Notifications",
      description: "Configure notification preferences",
      icon: Bell,
      href: "/notifications",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Privacy & Security",
      description: "Manage security and privacy settings",
      icon: Shield,
      href: "/privacy-security",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Color Theme",
      description: "Customize your app appearance",
      icon: Palette,
      href: "/color-theme",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Account Settings | TravelTour</title>
        <meta
          name="description"
          content="Manage your account settings and preferences."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
                Account Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account information and preferences.
              </p>
            </div>

            {/* Account Status */}
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">
                      Account Active
                    </h3>
                    <p className="text-sm text-green-800">
                      Your account is in good standing. All features are
                      available.
                    </p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Settings */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <UserCog className="h-5 w-5 mr-2" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details and contact information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="flex-1"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) =>
                              handleInputChange("dateOfBirth", e.target.value)
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Select
                            value={formData.country}
                            onValueChange={(value) =>
                              handleInputChange("country", value)
                            }
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                              <SelectItem value="fr">France</SelectItem>
                              <SelectItem value="jp">Japan</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="city">City</Label>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          className="flex-1"
                          placeholder="Enter your city"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Account Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Preferences</CardTitle>
                    <CardDescription>
                      Configure how your account behaves and what information is
                      shared.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Email Notifications</span>
                        <p className="text-sm text-muted-foreground">
                          Receive important updates via email
                        </p>
                      </div>
                      <Switch
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange("emailNotifications", checked)
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">SMS Notifications</span>
                        <p className="text-sm text-muted-foreground">
                          Receive urgent alerts via text message
                        </p>
                      </div>
                      <Switch
                        checked={preferences.smsNotifications}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange("smsNotifications", checked)
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Public Profile</span>
                        <p className="text-sm text-muted-foreground">
                          Make your profile visible to other users
                        </p>
                      </div>
                      <Switch
                        checked={preferences.profilePublic}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange("profilePublic", checked)
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Show Online Status</span>
                        <p className="text-sm text-muted-foreground">
                          Let others see when you're online
                        </p>
                      </div>
                      <Switch
                        checked={preferences.showOnlineStatus}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange("showOnlineStatus", checked)
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Marketing Emails</span>
                        <p className="text-sm text-muted-foreground">
                          Receive promotional content and offers
                        </p>
                      </div>
                      <Switch
                        checked={preferences.marketingEmails}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange("marketingEmails", checked)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Save Changes */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>

              {/* Quick Actions Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Jump to specific settings sections.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {quickActions.map((action) => (
                      <Link key={action.href} href={action.href}>
                        <div className="flex items-center p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                          <div
                            className={`p-2 rounded-lg ${action.bgColor} mr-3`}
                          >
                            <action.icon
                              className={`h-4 w-4 ${action.color}`}
                            />
                          </div>
                          <div className="flex-1">
                            <span className="font-medium text-sm">
                              {action.title}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {action.description}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>

                {/* Account Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Member Since
                      </span>
                      <span className="text-sm font-medium">Jan 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Total Bookings
                      </span>
                      <span className="text-sm font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Countries Visited
                      </span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Loyalty Points
                      </span>
                      <span className="text-sm font-medium">2,450</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Account Status
                      </span>
                      <Badge variant="default" className="text-xs">
                        Premium
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettingsPage;
