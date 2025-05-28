import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  HelpCircle,
  MessageCircle,
  Book,
  FileText,
  Phone,
  Mail,
  Video,
} from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";

const HelpAndSupportPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Help & Support</h1>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to the most common questions about using
                  WanderWise.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I book a tour?</AccordionTrigger>
                    <AccordionContent>
                      To book a tour, browse our available tours, select the one
                      you're interested in, and click the "Book Now" button.
                      Follow the prompts to select your preferred date, number
                      of travelers, and any additional options. Complete the
                      payment process to finalize your booking.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How can I cancel or modify my booking?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can cancel or modify your booking by navigating to "My
                      Bookings" in your account dashboard. Select the booking
                      you wish to change, and click either "Cancel Booking" or
                      "Modify Booking". Please note that cancellation policies
                      vary by tour and timeframe.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      What payment methods do you accept?
                    </AccordionTrigger>
                    <AccordionContent>
                      We accept major credit cards (Visa, Mastercard, American
                      Express), PayPal, and in select regions, we offer Apple
                      Pay and Google Pay. You can manage your payment methods in
                      the "Payment Methods" section of your account.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      Is travel insurance included in my booking?
                    </AccordionTrigger>
                    <AccordionContent>
                      Travel insurance is not automatically included in your
                      booking. However, we highly recommend purchasing travel
                      insurance for your trip. You can add insurance during the
                      checkout process or arrange it separately through your
                      preferred provider.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      How do I leave a review for a tour?
                    </AccordionTrigger>
                    <AccordionContent>
                      After completing a tour, you'll receive an email
                      invitation to leave a review. Alternatively, you can go to
                      "My Bookings" in your account dashboard, find the
                      completed tour, and click "Leave a Review". Your feedback
                      helps other travelers and our tour operators improve their
                      services.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Get in touch with our customer support team for personalized
                  assistance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Send us a message
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-1"
                        >
                          Name
                        </label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-1"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email address"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium mb-1"
                        >
                          Subject
                        </label>
                        <Input id="subject" placeholder="What's this about?" />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-1"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="How can we help you?"
                          rows={5}
                        />
                      </div>
                      <Button className="w-full">Send Message</Button>
                    </form>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Other ways to connect
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Phone className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-medium">Phone Support</p>
                          <p className="text-sm text-muted-foreground">
                            +1 (800) 123-4567
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Monday-Friday, 9am-6pm EST
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Mail className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-medium">Email Support</p>
                          <p className="text-sm text-muted-foreground">
                            support@wanderwise.com
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Response time: 24-48 hours
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MessageCircle className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-medium">Live Chat</p>
                          <p className="text-sm text-muted-foreground">
                            Available 24/7
                          </p>
                          <Button variant="outline" className="mt-2">
                            Start Chat
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Video className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-medium">Video Support</p>
                          <p className="text-sm text-muted-foreground">
                            Book a video call with our support team
                          </p>
                          <Button variant="outline" className="mt-2">
                            Schedule Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>
                  Comprehensive guides and resources for using WanderWise.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "User Guide",
                      description:
                        "Complete guide to using the WanderWise platform",
                      icon: Book,
                    },
                    {
                      title: "Booking Process",
                      description: "Step-by-step guide to booking tours",
                      icon: FileText,
                    },
                    {
                      title: "Payment & Refunds",
                      description:
                        "Understanding payment methods and refund policies",
                      icon: FileText,
                    },
                    {
                      title: "Account Management",
                      description: "Managing your profile and preferences",
                      icon: FileText,
                    },
                    {
                      title: "Traveler Resources",
                      description:
                        "Useful resources for before and during your trip",
                      icon: FileText,
                    },
                    {
                      title: "API Documentation",
                      description:
                        "For developers integrating with our platform",
                      icon: FileText,
                    },
                  ].map((doc, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="p-4 border-b">
                        <div className="flex items-center space-x-2">
                          <doc.icon className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">{doc.title}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-3">
                          {doc.description}
                        </p>
                        <Button variant="outline" size="sm">
                          View Documentation
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>
                  Learn how to use WanderWise with our step-by-step video
                  guides.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Getting Started with WanderWise",
                      duration: "5:24",
                      thumbnail: "https://placehold.co/400x225",
                    },
                    {
                      title: "How to Book the Perfect Tour",
                      duration: "8:12",
                      thumbnail: "https://placehold.co/400x225",
                    },
                    {
                      title: "Managing Your Bookings",
                      duration: "3:45",
                      thumbnail: "https://placehold.co/400x225",
                    },
                    {
                      title: "Customizing Your User Profile",
                      duration: "4:18",
                      thumbnail: "https://placehold.co/400x225",
                    },
                  ].map((video, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg border bg-card shadow"
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full bg-black/50 hover:bg-black/70"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-8 w-8"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="text-base font-medium">{video.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HelpAndSupportPage;
