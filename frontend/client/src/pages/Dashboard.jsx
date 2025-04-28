import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchUserData = async () => {
      try {
        // In a real app, this would be an API call to get user data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock user data
        setUser({
          name: "John Doe",
          email: "john.doe@example.com",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          memberSince: "January 2023",
        });

        // Mock bookings data
        setBookings([
          {
            id: 1,
            tourName: "Paris Explorer",
            date: "2025-06-10",
            guests: 2,
            totalPrice: 2598,
            status: "confirmed",
            image:
              "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=300",
          },
          {
            id: 2,
            tourName: "Bali Retreat",
            date: "2025-08-15",
            guests: 1,
            totalPrice: 1499,
            status: "pending",
            image:
              "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=300",
          },
          {
            id: 3,
            tourName: "Tokyo Adventure",
            date: "2025-10-05",
            guests: 2,
            totalPrice: 3798,
            status: "confirmed",
            image:
              "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=300",
          },
        ]);

        // Mock wishlist data
        setWishlist([
          {
            id: 4,
            tourName: "New York City Weekend",
            price: 899,
            duration: 3,
            image:
              "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=300",
          },
          {
            id: 5,
            tourName: "Safari Adventure",
            price: 2499,
            duration: 7,
            image:
              "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=300",
          },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleCancelBooking = (id) => {
    // In a real app, this would make an API call
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings(
        bookings.map((booking) =>
          booking.id === id ? { ...booking, status: "cancelled" } : booking
        )
      );
    }
  };

  const handleRemoveWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-20 pb-12 px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-16 w-16 rounded-full mr-4 object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user.name}
                </h1>
                <p className="text-gray-600">Member since {user.memberSince}</p>
              </div>
            </div>
            <Link
              to="/tours"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              Browse Tours
            </Link>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "bookings"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "wishlist"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Wishlist
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Profile Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Your Bookings</h2>
              {bookings.length > 0 ? (
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4">
                          <img
                            src={booking.image}
                            alt={booking.tourName}
                            className="h-48 w-full object-cover md:h-full"
                          />
                        </div>
                        <div className="p-6 md:w-3/4 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-lg font-semibold">
                                {booking.tourName}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  booking.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {booking.status.charAt(0).toUpperCase() +
                                  booking.status.slice(1)}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-500">Date</p>
                                <p className="font-medium">{booking.date}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Guests</p>
                                <p className="font-medium">{booking.guests}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Total Price
                                </p>
                                <p className="font-medium">
                                  ${booking.totalPrice}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Booking ID
                                </p>
                                <p className="font-medium">
                                  #{booking.id.toString().padStart(6, "0")}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-3 mt-4">
                            <Link
                              to={`/tour/${booking.id}`}
                              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              View Tour
                            </Link>
                            {booking.status !== "cancelled" && (
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                              >
                                Cancel Booking
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No bookings yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Explore our tours and book your next adventure!
                  </p>
                  <Link
                    to="/tours"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Browse Tours
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Your Wishlist</h2>
              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.tourName}
                          className="w-full h-48 object-cover"
                        />
                        <button
                          onClick={() => handleRemoveWishlist(item.id)}
                          className="absolute top-2 right-2 bg-white rounded-full p-1.5 text-gray-700 hover:text-red-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {item.tourName}
                        </h3>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-600">
                            {item.duration} days
                          </span>
                          <span className="font-bold text-blue-600">
                            ${item.price}
                          </span>
                        </div>
                        <div className="flex space-x-3">
                          <Link
                            to={`/tour/${item.id}`}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700"
                          >
                            View Details
                          </Link>
                          <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Your wishlist is empty
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Save tours you're interested in for later!
                  </p>
                  <Link
                    to="/tours"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Browse Tours
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Profile Settings Tab */}
          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
              <form>
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Photo
                    </label>
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-16 w-16 rounded-full mr-4 object-cover"
                      />
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        defaultValue="John"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        defaultValue="Doe"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={user.email}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        defaultValue="+1 (555) 123-4567"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Change Password
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="current_password"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="current_password"
                          name="current_password"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                      </div>
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="new_password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            id="new_password"
                            name="new_password"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="confirm_password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Preferences
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email_notifications"
                            name="email_notifications"
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="email_notifications"
                            className="font-medium text-gray-700"
                          >
                            Email Notifications
                          </label>
                          <p className="text-gray-500">
                            Receive emails about tour updates, special offers,
                            and more.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newsletter"
                            name="newsletter"
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="newsletter"
                            className="font-medium text-gray-700"
                          >
                            Newsletter
                          </label>
                          <p className="text-gray-500">
                            Subscribe to our weekly travel newsletter.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
