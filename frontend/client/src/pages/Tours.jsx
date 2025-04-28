import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Tours() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity"); // popularity, price-low, price-high, duration
  const [priceRange, setPriceRange] = useState([0, 10000]); // Minimum and maximum price values
  const [selectedDuration, setSelectedDuration] = useState("any"); // any, short, medium, long
  const [selectedCategory, setSelectedCategory] = useState("all"); // all, adventure, cultural, beach, etc.

  useEffect(() => {
    // Simulate API call to fetch tours data
    const fetchTours = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock tours data
        const mockTours = [
          {
            id: 1,
            title: "Paris Explorer",
            description: "Experience the magic of Paris in this 5-day tour",
            price: 1299,
            image:
              "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=500",
            duration: 5,
            rating: 4.8,
            category: "cultural",
            location: "Paris, France",
            reviews: 124,
            featured: true,
            availability: "Available year-round",
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
            category: "adventure",
            location: "Tokyo, Japan",
            reviews: 89,
            featured: true,
            availability: "Mar - Nov",
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
            category: "beach",
            location: "Bali, Indonesia",
            reviews: 156,
            featured: true,
            availability: "Available year-round",
          },
          {
            id: 4,
            title: "New York City Weekend",
            description:
              "Explore the Big Apple in this action-packed weekend tour",
            price: 899,
            image:
              "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=500",
            duration: 3,
            rating: 4.6,
            category: "urban",
            location: "New York, USA",
            reviews: 78,
            featured: false,
            availability: "Available year-round",
          },
          {
            id: 5,
            title: "Safari Adventure",
            description: "Witness majestic wildlife in their natural habitat",
            price: 2499,
            image:
              "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=500",
            duration: 7,
            rating: 4.9,
            category: "adventure",
            location: "Kenya & Tanzania",
            reviews: 53,
            featured: false,
            availability: "Jun - Oct",
          },
          {
            id: 6,
            title: "Rome & Amalfi Coast",
            description: "Combine ancient history with coastal beauty",
            price: 1799,
            image:
              "https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=500",
            duration: 8,
            rating: 4.8,
            category: "cultural",
            location: "Italy",
            reviews: 97,
            featured: false,
            availability: "Apr - Oct",
          },
          {
            id: 7,
            title: "Santorini Getaway",
            description: "Enjoy stunning sunsets and white-washed villages",
            price: 1599,
            image:
              "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=500",
            duration: 5,
            rating: 4.7,
            category: "beach",
            location: "Greece",
            reviews: 112,
            featured: false,
            availability: "May - Sep",
          },
          {
            id: 8,
            title: "Himalayan Trek",
            description: "Challenge yourself with breathtaking mountain views",
            price: 1899,
            image:
              "https://images.unsplash.com/photo-1501740326664-5571ff5e30a3?q=80&w=500",
            duration: 10,
            rating: 4.9,
            category: "adventure",
            location: "Nepal",
            reviews: 42,
            featured: false,
            availability: "Mar - May, Sep - Nov",
          },
          {
            id: 9,
            title: "Australian Highlights",
            description: "From Sydney to the Great Barrier Reef",
            price: 3299,
            image:
              "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=500",
            duration: 14,
            rating: 4.8,
            category: "adventure",
            location: "Australia",
            reviews: 63,
            featured: false,
            availability: "Year-round",
          },
        ];

        setTours(mockTours);
        setFilteredTours(mockTours);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    // Apply filters and search when any filter changes
    let results = [...tours];

    // Apply search term filter
    if (searchTerm) {
      results = results.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tour.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price range filter
    results = results.filter(
      (tour) => tour.price >= priceRange[0] && tour.price <= priceRange[1]
    );

    // Apply duration filter
    if (selectedDuration !== "any") {
      if (selectedDuration === "short") {
        results = results.filter((tour) => tour.duration <= 3);
      } else if (selectedDuration === "medium") {
        results = results.filter(
          (tour) => tour.duration > 3 && tour.duration <= 7
        );
      } else if (selectedDuration === "long") {
        results = results.filter((tour) => tour.duration > 7);
      }
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      results = results.filter((tour) => tour.category === selectedCategory);
    }

    // Apply sorting
    if (sortBy === "price-low") {
      results = results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      results = results.sort((a, b) => b.price - a.price);
    } else if (sortBy === "duration") {
      results = results.sort((a, b) => a.duration - b.duration);
    } else {
      // Default: Sort by popularity (rating)
      results = results.sort((a, b) => b.rating - a.rating);
    }

    setFilteredTours(results);
  }, [
    tours,
    searchTerm,
    sortBy,
    priceRange,
    selectedDuration,
    selectedCategory,
  ]);

  // Function to handle price range input changes
  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (e.target.name === "minPrice") {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Hero Section */}
      <section className="relative py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Explore Our Tours</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Discover amazing destinations and create unforgettable memories
              with our carefully curated tours.
            </p>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search destinations, tours, or activities..."
                  className="w-full px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section with Filters */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Left Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Filters
                </h2>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-2">
                    Price Range
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Min Price
                      </label>
                      <input
                        type="number"
                        name="minPrice"
                        value={priceRange[0]}
                        onChange={handlePriceRangeChange}
                        min="0"
                        max={priceRange[1]}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Max Price
                      </label>
                      <input
                        type="number"
                        name="maxPrice"
                        value={priceRange[1]}
                        onChange={handlePriceRangeChange}
                        min={priceRange[0]}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Duration Filter */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-2">
                    Duration
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="duration"
                        value="any"
                        checked={selectedDuration === "any"}
                        onChange={() => setSelectedDuration("any")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">Any Duration</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="duration"
                        value="short"
                        checked={selectedDuration === "short"}
                        onChange={() => setSelectedDuration("short")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">
                        Short (1-3 days)
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="duration"
                        value="medium"
                        checked={selectedDuration === "medium"}
                        onChange={() => setSelectedDuration("medium")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">
                        Medium (4-7 days)
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="duration"
                        value="long"
                        checked={selectedDuration === "long"}
                        onChange={() => setSelectedDuration("long")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">Long (8+ days)</span>
                    </label>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-2">
                    Category
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="all"
                        checked={selectedCategory === "all"}
                        onChange={() => setSelectedCategory("all")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">All Categories</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="adventure"
                        checked={selectedCategory === "adventure"}
                        onChange={() => setSelectedCategory("adventure")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">Adventure</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="cultural"
                        checked={selectedCategory === "cultural"}
                        onChange={() => setSelectedCategory("cultural")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">Cultural</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="beach"
                        checked={selectedCategory === "beach"}
                        onChange={() => setSelectedCategory("beach")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">
                        Beach & Relaxation
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="urban"
                        checked={selectedCategory === "urban"}
                        onChange={() => setSelectedCategory("urban")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">
                        Urban Exploration
                      </span>
                    </label>
                  </div>
                </div>

                {/* Reset Filters Button */}
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSortBy("popularity");
                    setPriceRange([0, 10000]);
                    setSelectedDuration("any");
                    setSelectedCategory("all");
                  }}
                  className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Reset All Filters
                </button>
              </div>
            </div>

            {/* Tours List - Right Side */}
            <div className="lg:w-3/4">
              {/* Sort Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
                <p className="mb-2 sm:mb-0 text-gray-600">
                  {filteredTours.length}{" "}
                  {filteredTours.length === 1 ? "tour" : "tours"} found
                </p>
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-gray-600">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="duration">Duration</option>
                  </select>
                </div>
              </div>

              {/* Loading State */}
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  {/* No Results */}
                  {filteredTours.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
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
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No tours found
                      </h3>
                      <p className="text-gray-500 mb-4">
                        We couldn't find any tours matching your criteria. Try
                        adjusting your filters.
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSortBy("popularity");
                          setPriceRange([0, 10000]);
                          setSelectedDuration("any");
                          setSelectedCategory("all");
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    /* Tours Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredTours.map((tour) => (
                        <div
                          key={tour.id}
                          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                          <Link to={`/tour/${tour.id}`} className="block">
                            <div className="relative">
                              <img
                                src={tour.image}
                                alt={tour.title}
                                className="w-full h-48 object-cover"
                              />
                              {tour.featured && (
                                <div className="absolute top-0 left-0 bg-yellow-400 text-xs font-bold px-3 py-1 m-2 rounded-full">
                                  Featured
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-1/3">
                                <div className="absolute bottom-4 left-4">
                                  <span className="text-white text-xs font-semibold bg-black bg-opacity-60 px-2 py-1 rounded-md">
                                    {tour.location}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <Link to={`/tour/${tour.id}`} className="block">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {tour.title}
                                </h3>
                              </Link>
                              <span className="flex items-center bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                  />
                                </svg>
                                {tour.rating}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">
                              {tour.description}
                            </p>
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center text-gray-700 text-sm">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span>{tour.duration} days</span>
                              </div>
                              <span className="text-gray-700 text-sm">
                                {tour.availability}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-lg text-blue-700">
                                ${tour.price}
                              </span>
                              <Link
                                to={`/tour/${tour.id}`}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-300"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
