import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CreditCard,
  XCircle,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { Link } from "wouter";

const BookingHistoryPage = () => {
  const { toast } = useToast();
  const [bookingToCancel, setBookingToCancel] = useState<number | null>(null);

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/bookings"],
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: number) => {
      const res = await apiRequest("POST", `/api/bookings/${bookingId}/cancel`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled.",
      });
      setBookingToCancel(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Cancellation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCancelBooking = (bookingId: number) => {
    setBookingToCancel(bookingId);
  };

  const confirmCancelBooking = () => {
    if (bookingToCancel) {
      cancelBookingMutation.mutate(bookingToCancel);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>My Bookings | TravelTour</title>
        <meta
          name="description"
          content="View and manage your tour bookings with TravelTour."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow bg-background">
          <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
                My Bookings
              </h1>
              <p className="text-muted-foreground">
                View and manage your tour reservations
              </p>
            </div>

            {isLoading ? (
              <div className="grid gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="pb-0">
                      <div className="flex justify-between mb-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>
                      <Skeleton className="h-8 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="py-6">
                      <div className="grid md:grid-cols-4 gap-6">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Skeleton className="h-10 w-24" />
                      <Skeleton className="h-10 w-36" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Error Loading Bookings</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't load your bookings. Please try again.
                </p>
                <Button
                  onClick={() =>
                    queryClient.invalidateQueries({ queryKey: ["/api/bookings"] })
                  }
                >
                  Retry
                </Button>
              </div>
            ) : bookings?.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">🌍</div>
                <h2 className="text-xl font-bold mb-2">No Bookings Yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't made any tour bookings yet. Start exploring our tours
                  to begin your next adventure!
                </p>
                <Button asChild>
                  <Link href="/tours">Find Tours</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {bookings.map((booking: any) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex flex-wrap justify-between items-center">
                        <CardTitle className="text-xl">
                          {booking.tour.title}
                        </CardTitle>
                        {getStatusBadge(booking.status)}
                      </div>
                      <CardDescription>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>
                            {booking.tour.destination}, {booking.tour.destinationCountry}
                          </span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div className="flex flex-col p-3 bg-muted rounded-lg">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Travel Dates</span>
                          </div>
                          <div className="font-medium">
                            {format(new Date(booking.tourDate.startDate), "MMM d, yyyy")} -{" "}
                            {format(new Date(booking.tourDate.endDate), "MMM d, yyyy")}
                          </div>
                        </div>
                        <div className="flex flex-col p-3 bg-muted rounded-lg">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <Users className="h-4 w-4 mr-2" />
                            <span>Travelers</span>
                          </div>
                          <div className="font-medium">
                            {booking.numberOfTravelers} {booking.numberOfTravelers === 1 ? "Person" : "People"}
                          </div>
                        </div>
                        <div className="flex flex-col p-3 bg-muted rounded-lg">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Duration</span>
                          </div>
                          <div className="font-medium">
                            {booking.tour.duration} {booking.tour.duration === 1 ? "Day" : "Days"}
                          </div>
                        </div>
                        <div className="flex flex-col p-3 bg-muted rounded-lg">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <CreditCard className="h-4 w-4 mr-2" />
                            <span>Total Price</span>
                          </div>
                          <div className="font-medium">
                            ${booking.totalPrice.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link href={`/tours/${booking.tourId}`}>View Tour</Link>
                      </Button>
                      {booking.status === "confirmed" && (
                        <Button
                          variant="destructive"
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={cancelBookingMutation.isPending}
                        >
                          {cancelBookingMutation.isPending &&
                          bookingToCancel === booking.id
                            ? "Cancelling..."
                            : "Cancel Booking"}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>

      <AlertDialog
        open={bookingToCancel !== null}
        onOpenChange={(open) => !open && setBookingToCancel(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? This action cannot be
              undone. You may be eligible for a refund according to our
              cancellation policy.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelBooking}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingHistoryPage;
