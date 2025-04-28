import { Link } from "react-router-dom";

export default function Home() {
  // Featured tours data
  const featuredTours = [
    {
      id: 1,
      title: "Paris Explorer",
      description: "Experience the magic of Paris in this 5-day tour",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=500",
      duration: 5,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Tokyo Adventure",
      description: "Discover the beauty of Tokyo in 7 exciting days",
      price: 1899,
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=500",
      duration: 7,
      rating: 4.9,
    },
    {
      id: 3,
      title: "Bali Retreat",
      description: "Relax and recharge in beautiful Bali for 6 days",
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=500",
      duration: 6,
      rating: 4.7,
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      role: "Travel Enthusiast",
      quote:
        "The Paris tour exceeded all my expectations. The guides were knowledgeable and the accommodations were top-notch. I can not wait to book my next trip!",
      tour: "Paris Explorer",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      role: "Photographer",
      quote:
        "As a photographer, I was blown away by the Tokyo tour. So many incredible photo opportunities and the local food recommendations were fantastic.",
      tour: "Tokyo Adventure",
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      role: "Yoga Instructor",
      quote:
        "The Bali retreat was exactly what I needed. The perfect balance of adventure and relaxation. I felt completely renewed after this experience.",
      tour: "Bali Retreat",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Discover the World's Most Amazing Places
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Unforgettable travel experiences tailored for you. Explore
            destinations, create memories, live your adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tours"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 px-8 rounded-md transition-colors duration-300"
            >
              Browse Tours
            </Link>
            <Link
              to="/about"
              className="bg-transparent hover:bg-white hover:text-blue-600 text-white text-lg font-medium py-3 px-8 border-2 border-white rounded-md transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Tours
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our most popular tour packages enjoyed by travelers around
              the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{tour.title}</h3>
                    <span className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                      {tour.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="flex items-center text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {tour.duration} days
                    </span>
                    <span className="font-bold text-lg text-blue-700">
                      ${tour.price}
                    </span>
                  </div>
                  <Link
                    to={`/tour/${tour.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 inline-block w-full text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/tours"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Tours
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to making your travel experiences extraordinary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Service</h3>
              <p className="text-gray-600">
                With thousands of satisfied customers and years of experience,
                we provide reliable and high-quality tour services.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Value</h3>
              <p className="text-gray-600">
                Competitive prices without compromising on quality, ensuring you
                get the best value for your investment.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Worldwide Tours</h3>
              <p className="text-gray-600">
                Explore destinations across the globe with our extensive network
                of local partners and expert guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real experiences from people who have explored the world with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="italic text-gray-700">"{testimonial.quote}"</p>
                </div>
                <p className="text-sm text-blue-600">
                  Tour: {testimonial.tour}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have experienced the world
            with us. Your dream vacation is just a click away.
          </p>
          <Link
            to="/tours"
            className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-md text-lg transition-colors duration-300 inline-block"
          >
            Explore Tours
          </Link>
        </div>
      </section>
    </div>
  );
}
