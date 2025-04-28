import { Link } from "react-router-dom";

export default function About() {
  // Team members data
  const team = [
    {
      id: 1,
      name: "John Harrison",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "With 15 years of experience in the travel industry, John founded TourExplorer with a vision to create unforgettable travel experiences.",
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      role: "Chief Travel Officer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Emily has visited over 50 countries and brings her extensive knowledge to curating our unique tour packages.",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Head of Customer Experience",
      image: "https://randomuser.me/api/portraits/men/56.jpg",
      bio: "David ensures every customer receives exceptional service from the moment they book until they return home.",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Marketing Director",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio:
        "Sarah" +
        "s creative approach has helped thousands of travelers discover their perfect adventure.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About TourExplorer
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              We're passionate about travel and dedicated to creating
              unforgettable experiences for adventurers around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2010, TourExplorer began with a simple mission: to
                help travelers discover the world in comfort and style. What
                started as a small team of passionate travelers has grown into a
                leading tour operator with thousands of satisfied customers.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We believe travel has the power to transform lives, create
                lasting memories, and build bridges between cultures. Our team
                of experienced travel enthusiasts carefully designs each tour to
                provide authentic experiences that go beyond the typical tourist
                attractions.
              </p>
              <p className="text-lg text-gray-700">
                Today, we offer hundreds of tours across six continents, but our
                commitment remains the same: to provide exceptional service and
                unforgettable experiences for every traveler.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=1600"
                alt="Our team planning tours"
                className="rounded-lg shadow-md w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 rounded-lg p-6 text-white">
                <p className="font-bold text-xl">15+</p>
                <p>Years of Excellence</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-green-600 rounded-lg p-6 text-white">
                <p className="font-bold text-xl">50+</p>
                <p>Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 text-blue-600 w-14 h-14 flex items-center justify-center rounded-full mb-6">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Exceptional Experiences
              </h3>
              <p className="text-gray-600">
                We go above and beyond to create tours that surprise, delight,
                and exceed expectations, ensuring every journey is memorable.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 text-green-600 w-14 h-14 flex items-center justify-center rounded-full mb-6">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Safety & Security</h3>
              <p className="text-gray-600">
                Your well-being is our priority. We maintain rigorous safety
                standards and provide 24/7 support throughout your journey.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-purple-100 text-purple-600 w-14 h-14 flex items-center justify-center rounded-full mb-6">
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
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainable Travel</h3>
              <p className="text-gray-600">
                We're committed to responsible tourism that respects local
                communities, preserves cultures, and protects the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <p className="text-4xl font-bold text-blue-600">15+</p>
              <p className="text-lg text-gray-700 mt-2">Years of Experience</p>
            </div>
            <div className="text-center p-6">
              <p className="text-4xl font-bold text-blue-600">50+</p>
              <p className="text-lg text-gray-700 mt-2">Countries Covered</p>
            </div>
            <div className="text-center p-6">
              <p className="text-4xl font-bold text-blue-600">10,000+</p>
              <p className="text-lg text-gray-700 mt-2">Happy Travelers</p>
            </div>
            <div className="text-center p-6">
              <p className="text-4xl font-bold text-blue-600">500+</p>
              <p className="text-lg text-gray-700 mt-2">Tours Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience the World with Us?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Browse our selection of curated tours and start planning your next
            adventure today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/tours"
              className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-md transition-colors duration-300"
            >
              Explore Tours
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium py-3 px-8 rounded-md transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
