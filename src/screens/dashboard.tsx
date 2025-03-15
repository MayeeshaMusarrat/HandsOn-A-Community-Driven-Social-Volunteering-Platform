import { useState } from "react"
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { imageStrings } from "@/utils/image_strings"
import { EventCard } from "@/components/custom/eventcard"

export default function Dashboard() {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false)
  const [isLocationOpen, setLocationOpen] = useState(false)
  const [isFiltersOpen, setFiltersOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLocation, setSelectedLocation] = useState("Any Location")

  const categories = [
    "Environment",
    "Education",
    "Community",
    "Health",
    "Animals",
    "Arts & Culture"
  ]

  const locations = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Miami",
    "San Francisco"
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-[#e5e7eb]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img src={imageStrings.logo} alt="HandsOn Logo" className="object-contain" />
              </div>
        
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-[#4f46e5] font-medium">
                Events
              </a>
              <a href="#" className="text-[#4b5563] hover:text-[#4f46e5]">
                Community
              </a>
              <a href="#" className="text-[#4b5563] hover:text-[#4f46e5]">
                About
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white rounded-lg">
              <span className="mr-1">+</span> Create Event
            </Button>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

     {/* Search and Filters */}
     <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af]" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2.5 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            />
          </div>
          
          <div className="flex gap-4">
            {/* Categories Dropdown */}
            <div className="relative min-w-[200px]">
              <button 
                className="w-full flex items-center justify-between px-4 py-2.5 border border-[#e5e7eb] rounded-lg bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setCategoriesOpen(!isCategoriesOpen)}
                aria-expanded={isCategoriesOpen}
              >
                <span>{selectedCategory}</span>
                <ChevronDown size={20} className="text-[#4b5563]" />
              </button>
              {isCategoriesOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-[#e5e7eb] rounded-lg shadow-lg">
                  {categories.map(category => (
                    <button
                      key={category}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      onClick={() => {
                        setSelectedCategory(category)
                        setCategoriesOpen(false)
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Location Dropdown */}
            <div className="relative min-w-[200px]">
              <button 
                className="w-full flex items-center justify-between px-4 py-2.5 border border-[#e5e7eb] rounded-lg bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setLocationOpen(!isLocationOpen)}
                aria-expanded={isLocationOpen}
              >
                <span>{selectedLocation}</span>
                <ChevronDown size={20} className="text-[#4b5563]" />
              </button>
              {isLocationOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-[#e5e7eb] rounded-lg shadow-lg">
                  {locations.map(location => (
                    <button
                      key={location}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      onClick={() => {
                        setSelectedLocation(location)
                        setLocationOpen(false)
                      }}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filters Button */}
            <div className="relative">
              <button 
                className="p-2.5 border border-[#e5e7eb] rounded-lg bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setFiltersOpen(!isFiltersOpen)}
                aria-label="Open filters"
              >
                <SlidersHorizontal size={20} className="text-[#4b5563]" />
              </button>
              {isFiltersOpen && (
                <div className="absolute z-10 right-0 mt-2 w-64 bg-white border border-[#e5e7eb] rounded-lg shadow-lg p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Date Range</label>
                      <input type="date" className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Type</label>
                      <select className="w-full p-2 border rounded">
                        <option>Any Type</option>
                        <option>Volunteering</option>
                        <option>Donation</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <EventCard
            title="Beach Cleanup Drive"
            description="Join us for our monthly beach cleanup initiative to protect marine life and keep our shores clean."
            category="Environment"
            date="Mar 15, 2025"
            time="9:00 AM"
            participants={15}
            imageUrl="src/assets/placeholder1.png"
            categoryColor="bg-[#10b981]"
          />
        </div>
      </div>

    </div>
  )
}