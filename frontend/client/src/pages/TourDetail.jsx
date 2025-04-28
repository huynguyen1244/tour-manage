import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [participants, setParticipants] = useState(1);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        // Simulating API fetch delay
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Mock tour data
        const mockTours = [
          {
            id: 1,
            title: "Paris Explorer",
            description: "Experience the magic of Paris in this 5-day tour",
            longDescription:
              "Explore the beautiful city of Paris with our expert guides. Visit iconic landmarks like the Eiffel Tower, Louvre Museum, Notre-Dame Cathedral, and more. Enjoy authentic French cuisine, stroll along the Seine River, and immerse yourself in Parisian culture. This all-inclusive package features luxury accommodations, guided tours, and unforgettable experiences.",
            price: 1299,
            duration: 5,
            image:
              "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800",
            rating: 4.8,
            reviews: 126,
            availableDates: [
              "2025-05-15",
              "2025-06-10",
              "2025-07-22",
              "2025-08-18",
            ],
            itinerary: [
              {
                day: 1,
                title: "Arrival & Welcome Dinner",
                description:
                  "Arrive in Paris, check-in to hotel, evening welcome dinner at a local restaurant.",
              },
              {
                day: 2,
                title: "Historic Paris",
                description:
                  "Visit Notre-Dame Cathedral, Latin Quarter, and Luxembourg Gardens. Afternoon Seine River cruise.",
              },
              {
                day: 3,
                title: "Art & Culture",
                description:
                  "Full day at the Louvre Museum and Orsay Museum with expert art historian guide.",
              },
              {
                day: 4,
                title: "Royal History",
                description:
                  "Day trip to Palace of Versailles with guided tour of the palace and gardens.",
              },
              {
                day: 5,
                title: "Iconic Paris & Departure",
                description:
                  "Morning visit to Eiffel Tower, free time for shopping, and departure assistance.",
              },
            ],
            includes: [
              "4 nights accommodation",
              "Daily breakfast",
              "Welcome dinner",
              "24/7 tour guide",
              "All entrance fees",
              "Airport transfers",
            ],
            location: "Paris, France",
            images: [
              "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800",
              "https://images.unsplash.com/photo-1499856871958-5b9088d4decd?q=80&w=800",
              "https://images.unsplash.com/photo-1541171382701-01c135838c41?q=80&w=800",
            ],
          },
          {
            id: 2,
            title: "Tokyo Adventure",
            description: "Discover the beauty of Tokyo in 7 exciting days",
            longDescription:
              "Immerse yourself in the vibrant culture and cutting-edge technology of Tokyo. From ancient temples to futuristic skyscrapers, explore the fascinating contrasts of Japan's capital. Visit historic sites like Senso-ji Temple and the Imperial Palace, experience the bustling Shibuya Crossing, and enjoy authentic Japanese cuisine. This comprehensive tour includes comfortable accommodations, guided excursions, and cultural experiences.",
            price: 1899,
            duration: 7,
            image:
              "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800",
            rating: 4.9,
            reviews: 89,
            availableDates: [
              "2025-06-05",
              "2025-07-18",
              "2025-08-22",
              "2025-09-10",
            ],
            itinerary: [
              {
                day: 1,
                title: "Arrival in Tokyo",
                description:
                  "Airport pickup, hotel check-in, and evening orientation walk with your guide.",
              },
              {
                day: 2,
                title: "Tokyo's Historic Sites",
                description:
                  "Visit Meiji Shrine, Imperial Palace Gardens, and Asakusa district with Senso-ji Temple.",
              },
              {
                day: 3,
                title: "Modern Tokyo",
                description:
                  "Explore Shibuya Crossing, Harajuku fashion district, and Shinjuku's skyscrapers.",
              },
              {
                day: 4,
                title: "Cultural Immersion",
                description:
                  "Participate in a tea ceremony, try calligraphy, and enjoy a traditional dinner with entertainment.",
              },
              {
                day: 5,
                title: "Day Trip to Kamakura",
                description:
                  "Visit the Great Buddha, ancient temples, and enjoy coastal views in this historic city.",
              },
              {
                day: 6,
                title: "Tokyo's Markets & Gardens",
                description:
                  "Early morning visit to Tsukiji Outer Market, followed by Hamarikyu Gardens and Tokyo Bay cruise.",
              },
              {
                day: 7,
                title: "Shopping & Departure",
                description:
                  "Morning free time for last-minute shopping, departure assistance in the afternoon.",
              },
            ],
            includes: [
              "6 nights accommodation",
              "Daily breakfast",
              "3 dinners including traditional Japanese feast",
              "Transportation within the city",
              "English-speaking guide",
              "All entrance fees",
              "Airport transfers",
            ],
            location: "Tokyo, Japan",
            images: [
              "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800",
              "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800",
              "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=800",
            ],
          },
          {
            id: 3,
            title: "Bali Retreat",
            description: "Relax and recharge in beautiful Bali for 6 days",
            longDescription:
              "Escape to the tropical paradise of Bali for a rejuvenating retreat that combines relaxation, adventure, and cultural experiences. Stay in luxurious accommodations surrounded by lush rice terraces and tropical forests. Enjoy yoga sessions, spa treatments, and delicious healthy cuisine. Explore ancient temples, traditional villages, and pristine beaches. This all-inclusive retreat is perfect for those seeking both relaxation and adventure.",
            price: 1499,
            duration: 6,
            image:
              "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800",
            rating: 4.7,
            reviews: 156,
            availableDates: [
              "2025-05-20",
              "2025-06-15",
              "2025-07-10",
              "2025-08-05",
            ],
            itinerary: [
              {
                day: 1,
                title: "Welcome to Paradise",
                description:
                  "Airport pickup, resort check-in, welcome dinner and sunset beach meditation.",
              },
              {
                day: 2,
                title: "Spiritual Bali",
                description:
                  "Morning yoga, visit to Tirta Empul Temple for a purification ceremony, afternoon spa treatment.",
              },
              {
                day: 3,
                title: "Rice Terraces & Waterfalls",
                description:
                  "Explore the famous Tegallalang Rice Terraces, hike to hidden waterfalls, and visit a traditional village.",
              },
              {
                day: 4,
                title: "Ocean & Wellness",
                description:
                  "Morning snorkeling trip to Blue Lagoon, afternoon cooking class using local ingredients.",
              },
              {
                day: 5,
                title: "Ubud Explorer",
                description:
                  "Visit Monkey Forest, artisan villages, and enjoy a traditional dance performance in the evening.",
              },
              {
                day: 6,
                title: "Final Relaxation & Departure",
                description:
                  "Morning yoga session, free time for last-minute shopping or beach relaxation, departure transfer.",
              },
            ],
            includes: [
              "5 nights luxury accommodation",
              "Daily breakfast and most meals",
              "3 yoga sessions",
              "1 spa treatment",
              "Cooking class",
              "All entrance fees",
              "Airport transfers",
            ],
            location: "Bali, Indonesia",
            images: [
              "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800",
              "https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=800",
              "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=800",
            ],
          },
          {
            id: 4,
            title: "New York City Weekend",
            description: "Explore the Big Apple in this action-packed weekend tour",
            longDescription:
              "Experience the excitement and energy of New York City in this compact but comprehensive weekend tour. From iconic landmarks like Times Square and the Statue of Liberty to world-class museums and Broadway shows, this tour offers the perfect introduction to the city that never sleeps. Stay in a centrally located hotel, enjoy guided tours with knowledgeable locals, and discover why NYC is one of the world's greatest cities.",
            price: 899,
            duration: 3,
            image:
              "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800",
            rating: 4.6,
            reviews: 78,
            availableDates: [
              "2025-04-18",
              "2025-05-23",
              "2025-06-20",
              "2025-07-11",
            ],
            itinerary: [
              {
                day: 1,
                title: "Arrival & Manhattan Highlights",
                description:
                  "Hotel check-in, guided walk through Times Square, Rockefeller Center, and 5th Avenue, optional Broadway show.",
              },
              {
                day: 2,
                title: "Icons & Culture",
                description:
                  "Ferry to Statue of Liberty and Ellis Island, visit to 9/11 Memorial, afternoon at The Met or MoMA.",
              },
              {
                day: 3,
                title: "Central Park & Departure",
                description:
                  "Morning in Central Park, brunch experience, free time for last-minute shopping, departure assistance.",
              },
            ],
            includes: [
              "2 nights accommodation",
              "Daily breakfast",
              "Expert local guide",
              "Statue of Liberty ferry tickets",
              "Museum admission",
              "Airport transfers",
            ],
            location: "New York, USA",
            images: [
              "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800",
              "https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80&w=800",
              "https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?q=80&w=800",
            ],
          },
          {
            id: 5,
            title: "Safari Adventure",
            description: "Witness majestic wildlife in their natural habitat",
            longDescription:
              "Embark on an unforgettable safari adventure across Kenya's most spectacular wildlife reserves. Witness the incredible diversity of African wildlife in their natural habitats, from lions and elephants to giraffes and zebras. Experience breathtaking landscapes from open savannahs to lush forests. Stay in comfortable safari lodges and luxury tented camps that blend authentic African style with modern amenities. This once-in-a-lifetime journey combines wildlife viewing with cultural encounters and natural wonders.",
            price: 2499,
            duration: 7,
            image:
              "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800",
            rating: 4.9,
            reviews: 53,
            availableDates: [
              "2025-06-12",
              "2025-07-24",
              "2025-08-16",
              "2025-09-05",
            ],
            itinerary: [
              {
                day: 1,
                title: "Arrival in Nairobi",
                description:
                  "Airport welcome, hotel check-in, visit to Giraffe Centre, welcome dinner at famous Carnivore Restaurant.",
              },
              {
                day: 2,
                title: "Amboseli National Park",
                description:
                  "Drive to Amboseli with views of Mt. Kilimanjaro, afternoon game drive to spot elephants and other wildlife.",
              },
              {
                day: 3,
                title: "Amboseli Exploration",
                description:
                  "Full day of game drives in different areas of the park, visit to a Maasai village to learn about local culture.",
              },
              {
                day: 4,
                title: "Lake Nakuru National Park",
                description:
                  "Travel to Lake Nakuru, famous for flamingos and rhinos, afternoon game drive around the lake.",
              },
              {
                day: 5,
                title: "Masai Mara Arrival",
                description:
                  "Fly to the iconic Masai Mara, afternoon game drive in search of the Big Five (lion, elephant, buffalo, leopard, rhino).",
              },
              {
                day: 6,
                title: "Masai Mara Safari",
                description:
                  "Full day exploring the Mara ecosystem with morning and afternoon game drives, optional hot air balloon ride.",
              },
              {
                day: 7,
                title: "Final Safari & Departure",
                description:
                  "Early morning game drive, flight back to Nairobi, day room for freshening up, farewell dinner, and departure assistance.",
              },
            ],
            includes: [
              "6 nights accommodation in lodges and tented camps",
              "All meals during safari",
              "Professional safari guide",
              "4x4 safari vehicle with pop-up roof",
              "Park entrance fees",
              "Domestic flight (Nakuru-Masai Mara)",
              "Airport transfers",
            ],
            location: "Kenya & Tanzania",
            images: [
              "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800",
              "https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?q=80&w=800",
              "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800",
            ],
          },
        ];

        // Find tour by ID from the URL param, using parseInt to convert string ID to number
        const requestedId = parseInt(id);
        const foundTour = mockTours.find(t => t.id === requestedId);
        
        if (foundTour) {
          setTour(foundTour);
        } else {
          setTour(null); // Will trigger the "Tour Not Found" display
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tour:", error);
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Tour Not Found</h2>
        <p className="mb-6">
          Sorry, we couldn't find the tour you're looking for.
        </p>
        <Link
          to="/tours"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
        >
          Back to Tours
        </Link>
      </div>
    );
  }

  const handleBooking = () => {
    if (!selectedDate) {
      alert("Please select a travel date");
      return;
    }

    // In a real app, this would redirect to checkout or add to cart
    alert(
      `Booking ${tour.title} for ${selectedDate} with ${participants} participants`
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      {/* Back navigation */}
      <Link
        to="/tours"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Tours
      </Link>

      {/* Tour header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{tour.title}</h1>
        <div className="flex items-center mb-4">
          <div className="flex items-center text-yellow-500 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1">
              {tour.rating} ({tour.reviews} reviews)
            </span>
          </div>
          <div className="flex items-center text-gray-700">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{tour.location}</span>
          </div>
        </div>
      </div>

      {/* Image gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2">
          <img
            src={tour.images[0]}
            alt={tour.title}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="grid grid-rows-2 gap-4">
          {tour.images.slice(1, 3).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${tour.title} ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tour details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
            <p className="text-gray-700 mb-6">{tour.longDescription}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 mr-2"
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
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{tour.duration} days</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">${tour.price} per person</p>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
            <div className="space-y-6">
              {tour.itinerary.map((item) => (
                <div key={item.day} className="flex">
                  <div className="mr-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white font-bold">
                      {item.day}
                    </div>
                    {item.day < tour.itinerary.length && (
                      <div className="h-full w-0.5 bg-gray-300 mx-auto my-2"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What's included */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">What's Included</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tour.includes.map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-2xl font-bold mb-4">Book This Tour</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="date"
              >
                Select Date
              </label>
              <select
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">-- Select a date --</option>
                {tour.availableDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="participants"
              >
                Number of Participants
              </label>
              <div className="flex items-center">
                <button
                  className="bg-gray-200 rounded-l px-3 py-1"
                  onClick={() => setParticipants(Math.max(1, participants - 1))}
                >
                  -
                </button>
                <input
                  id="participants"
                  type="number"
                  min="1"
                  value={participants}
                  onChange={(e) =>
                    setParticipants(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="shadow-sm appearance-none border text-center w-20 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  className="bg-gray-200 rounded-r px-3 py-1"
                  onClick={() => setParticipants(participants + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between mb-2">
                <span>Base Price:</span>
                <span>
                  ${tour.price} x {participants}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${tour.price * participants}</span>
              </div>
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md w-full transition-colors duration-300"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
