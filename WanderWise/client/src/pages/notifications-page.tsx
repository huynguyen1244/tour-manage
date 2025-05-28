import { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Mail,
  MessageSquare,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  Settings2,
  Clock,
  Filter,
  Palette,
} from "lucide-react";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState({
    // Email Notifications
    emailBookingConfirmation: true,
    emailBookingReminders: true,
    emailPromotions: false,
    emailNewsletters: true,
    emailSecurityAlerts: true,

    // Push Notifications
    pushBookingUpdates: true,
    pushPromotions: false,
    pushReminders: true,
    pushSecurityAlerts: true,

    // SMS Notifications
    smsBookingConfirmation: false,
    smsEmergencyAlerts: true,

    // In-App Notifications
    inAppMessages: true,
    inAppUpdates: true,
    inAppPromotions: false,
  });

  const [preferences, setPreferences] = useState({
    frequency: "immediate",
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
    language: "en",
    timezone: "auto",
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const notificationGroups = [
    {
      title: "Email Notifications",
      icon: Mail,
      description: "Receive updates via email",
      items: [
        {
          key: "emailBookingConfirmation",
          label: "Booking Confirmations",
          description: "Get confirmation emails when you book a tour",
          important: true,
        },
        {
          key: "emailBookingReminders",
          label: "Booking Reminders",
          description: "Reminders about upcoming tours",
        },
        {
          key: "emailPromotions",
          label: "Promotional Offers",
          description: "Special deals and discounts",
        },
        {
          key: "emailNewsletters",
          label: "Travel Newsletter",
          description: "Monthly travel tips and destination highlights",
        },
        {
          key: "emailSecurityAlerts",
          label: "Security Alerts",
          description: "Important account security notifications",
          important: true,
        },
      ],
    },
    {
      title: "Push Notifications",
      icon: Smartphone,
      description: "Instant notifications on your device",
      items: [
        {
          key: "pushBookingUpdates",
          label: "Booking Updates",
          description: "Real-time updates about your bookings",
          important: true,
        },
        {
          key: "pushPromotions",
          label: "Promotions",
          description: "Limited-time offers and flash sales",
        },
        {
          key: "pushReminders",
          label: "Travel Reminders",
          description: "Reminders about check-in, departure times",
        },
        {
          key: "pushSecurityAlerts",
          label: "Security Alerts",
          description: "Login attempts and security events",
          important: true,
        },
      ],
    },
    {
      title: "SMS Notifications",
      icon: MessageSquare,
      description: "Text messages to your phone",
      items: [
        {
          key: "smsBookingConfirmation",
          label: "Booking Confirmations",
          description: "SMS confirmation for successful bookings",
        },
        {
          key: "smsEmergencyAlerts",
          label: "Emergency Alerts",
          description: "Critical travel advisories and emergencies",
          important: true,
        },
      ],
    },
    {
      title: "In-App Notifications",
      icon: Bell,
      description: "Notifications within the app",
      items: [
        {
          key: "inAppMessages",
          label: "Messages",
          description: "Customer support and tour guide messages",
        },
        {
          key: "inAppUpdates",
          label: "System Updates",
          description: "App updates and new features",
        },
        {
          key: "inAppPromotions",
          label: "Promotional Banners",
          description: "In-app promotional content",
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Notification Settings | TravelTour</title>
        <meta
          name="description"
          content="Manage your notification preferences for bookings, promotions, and updates."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
                Notification Settings
              </h1>
              <p className="text-muted-foreground">
                Choose how and when you want to receive notifications about your
                bookings and account.
              </p>
            </div>

            {/* Quick Actions */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const allOff = Object.fromEntries(
                        Object.keys(notifications).map((key) => [key, false])
                      ) as typeof notifications;
                      setNotifications({
                        ...allOff,
                        emailSecurityAlerts: true,
                        pushSecurityAlerts: true,
                        smsEmergencyAlerts: true,
                      });
                    }}
                  >
                    <VolumeX className="h-4 w-4 mr-2" />
                    Turn Off All (Keep Security)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Use type assertion to ensure type compatibility
                      const allOn = Object.fromEntries(
                        Object.keys(notifications).map((key) => [key, true])
                      ) as typeof notifications;
                      setNotifications(allOn);
                    }}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Enable All Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Groups */}
            <div className="space-y-6 mb-8">
              {notificationGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <Card key={group.title}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Icon className="h-5 w-5 mr-2" />
                        {group.title}
                      </CardTitle>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {group.items.map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <h3 className="font-medium">{item.label}</h3>
                              {item.important && (
                                <Badge
                                  variant="secondary"
                                  className="ml-2 text-xs"
                                >
                                  Important
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <Switch
                            checked={
                              notifications[
                                item.key as keyof typeof notifications
                              ]
                            }
                            onCheckedChange={(checked) =>
                              handleNotificationChange(item.key, checked)
                            }
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Notification Preferences */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings2 className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Customize how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Notification Frequency
                    </label>
                    <Select
                      value={preferences.frequency}
                      onValueChange={(value) =>
                        handlePreferenceChange("frequency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="hourly">Hourly Digest</SelectItem>
                        <SelectItem value="daily">Daily Summary</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Quiet Hours
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Pause non-urgent notifications during specified hours
                      </p>
                    </div>
                    <Switch
                      checked={preferences.quietHours}
                      onCheckedChange={(checked) =>
                        handlePreferenceChange("quietHours", checked)
                      }
                    />
                  </div>

                  {preferences.quietHours && (
                    <div className="grid grid-cols-2 gap-4 pl-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Start Time
                        </label>
                        <Select
                          value={preferences.quietStart}
                          onValueChange={(value) =>
                            handlePreferenceChange("quietStart", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => {
                              const hour = i.toString().padStart(2, "0");
                              return (
                                <SelectItem key={hour} value={`${hour}:00`}>
                                  {hour}:00
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          End Time
                        </label>
                        <Select
                          value={preferences.quietEnd}
                          onValueChange={(value) =>
                            handlePreferenceChange("quietEnd", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => {
                              const hour = i.toString().padStart(2, "0");
                              return (
                                <SelectItem key={hour} value={`${hour}:00`}>
                                  {hour}:00
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Notification Language
                    </label>
                    <Select
                      value={preferences.language}
                      onValueChange={(value) =>
                        handlePreferenceChange("language", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="it">Italiano</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Timezone
                    </label>
                    <Select
                      value={preferences.timezone}
                      onValueChange={(value) =>
                        handlePreferenceChange("timezone", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-detect</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="CET">
                          Central European Time
                        </SelectItem>
                        <SelectItem value="JST">Japan Standard Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Settings */}
            <div className="flex justify-end">
              <Button>Save Notification Settings</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
