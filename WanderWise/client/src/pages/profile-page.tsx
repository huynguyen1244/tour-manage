import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { User, Mail, Phone, Shield, LogOut, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "wouter";

// Create schema for profile form
const profileFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfilePage = () => {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const res = await apiRequest("PUT", "/api/user/profile", data);
      return await res.json();
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["/api/user"], {
        ...user,
        ...updatedUser,
      });

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    updateProfileMutation.mutate(data);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return user?.username ? user.username[0].toUpperCase() : "U";
  };
  return (
    <>
      <Helmet>
        <title>My Profile | TravelTour</title>
        <meta
          name="description"
          content="Manage your TravelTour account and profile information."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account and personal information
          </p>{" "}
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          orientation="vertical"
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-20 w-20 mb-3">
                    <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg font-bold">
                    {user?.firstName
                      ? `${user.firstName} ${user.lastName || ""}`
                      : user?.username}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>

                <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1">
                  <TabsTrigger
                    value="profile"
                    className="justify-start data-[state=active]:bg-muted w-full px-3"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="justify-start data-[state=active]:bg-muted w-full px-3"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    className="justify-start data-[state=active]:bg-muted w-full px-3"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Preferences
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/bookings">View My Bookings</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/tours">Browse Tours</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="+1 (555) 123-4567"
                                    className="pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormDescription>
                                Used for booking confirmations and tour updates.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            disabled={updateProfileMutation.isPending}
                          >
                            {updateProfileMutation.isPending
                              ? "Saving Changes..."
                              : "Save Changes"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      View your account details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Username
                        </div>
                        <div className="font-medium">{user?.username}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Email Address
                        </div>
                        <div className="font-medium">{user?.email}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Account Created
                        </div>
                        <div className="font-medium">
                          {user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="security" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>
                      Manage your password and security settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Feature Coming Soon</AlertTitle>
                      <AlertDescription>
                        Password change functionality will be available in a
                        future update.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Password</h3>
                        <p className="text-muted-foreground mb-4">
                          Password last changed: Never
                        </p>
                        <Button variant="outline" disabled>
                          Change Password
                        </Button>
                      </div>

                      <div className="pt-6 border-t border-border">
                        <h3 className="text-lg font-medium mb-2">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Add an extra layer of security to your account by
                          enabling two-factor authentication.
                        </p>
                        <Button variant="outline" disabled>
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="preferences" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Preferences</CardTitle>
                    <CardDescription>
                      Manage how we communicate with you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Feature Coming Soon</AlertTitle>
                      <AlertDescription>
                        Email preference settings will be available in a future
                        update.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Configure which types of emails you receive from us,
                        including promotional offers, booking confirmations, and
                        travel alerts.
                      </p>
                      <Button variant="outline" disabled>
                        Update Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>{" "}
              </TabsContent>{" "}
            </div>
          </div>{" "}
        </Tabs>
      </div>
    </>
  );
};

export default ProfilePage;
