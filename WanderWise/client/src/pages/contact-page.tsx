import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Globe, 
  Send, 
  CheckCircle 
} from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    // In a real application, you would send this data to your backend
    console.log(data);
    
    // Simulate successful form submission
    setTimeout(() => {
      setFormSubmitted(true);
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | TravelTour</title>
        <meta
          name="description"
          content="Get in touch with our travel experts. We're here to help you plan your perfect trip."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header Banner */}
        <div
          className="relative h-[250px] md:h-[300px] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-2 text-center">
              Contact Us
            </h1>
            <p className="text-lg max-w-2xl text-center">
              Our travel experts are ready to help you plan your perfect adventure
            </p>
          </div>
        </div>

        {/* Contact Content */}
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-8">
                Have questions about our tours or need help planning your trip? Our friendly
                team is here to assist you. Fill out the form or reach out to us directly using
                the contact information below.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardContent className="flex items-start p-6">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Our Address</h3>
                      <p className="text-muted-foreground">
                        123 Adventure Avenue, <br />
                        Explorer's District, <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start p-6">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Email Us</h3>
                      <p className="text-muted-foreground">info@traveltour.com</p>
                      <p className="text-muted-foreground">bookings@traveltour.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start p-6">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Call Us</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground">+1 (800) TOUR-NOW</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start p-6">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center mb-6">
                    <Globe className="h-6 w-6 text-primary mr-2" />
                    <h2 className="text-2xl font-bold font-poppins">Send us a Message</h2>
                  </div>

                  {formSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <CheckCircle className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                      <p className="text-center text-muted-foreground">
                        Your message has been sent successfully. One of our travel experts
                        will get back to you shortly.
                      </p>
                      <Button
                        className="mt-6"
                        onClick={() => {
                          setFormSubmitted(false);
                          form.reset();
                        }}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 (555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Tour inquiry"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us what you're looking for or ask us a question..."
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full">
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-[400px] mt-12">
          <div className="bg-muted h-full w-full flex items-center justify-center">
            <div className="text-center">
              <Globe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Interactive map would be displayed here in a production environment.
                This would show our office location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;