// components/EventCard.tsx
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventCardProps {
  title: string
  description: string
  category: string
  date: string
  time: string
  participants: number
  imageUrl: string
  categoryColor: string
}

export function EventCard({
  title,
  description,
  category,
  date,
  time,
  participants,
  imageUrl,
  categoryColor
}: EventCardProps) {
  return (
    <div className="border border-[#e5e7eb] rounded-xl overflow-hidden bg-white h-[500px] flex flex-col">
      <div className="relative h-64 flex-shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-4 left-4">
          <button className={`${categoryColor} text-white px-3 py-1 rounded-full text-sm hover:opacity-90 transition-opacity`}>
            {category}
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-6 text-[#4b5563] mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span className="text-sm">{time}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-[#4b5563] mb-6 flex-grow">{description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex -space-x-2">
            {[...Array(Math.min(participants, 3))].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="Participant"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            ))}
            {participants > 3 && (
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#f3f4f6] flex items-center justify-center text-xs font-medium">
                +{participants - 3}
              </div>
            )}
          </div>
          <Button className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white">Join Event</Button>
        </div>
      </div>
    </div>
  )
}