import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl } from '../constants/api';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState({})

  const fetchEvent = async() =>{
    const res = await fetch(`${baseUrl}/events/${id}`)
    const data= await res.json()
    setEventData(data.data.data)
  }

  useEffect(()=>{
    fetchEvent()
  },[])

  if (!eventData) return <div>Event not found</div>;
// console.log(eventData)
  return (
    <div className="container mx-auto px-4 py-8">
      <img src={eventData.posterImage} alt={eventData.title} className="w-full h-64 object-cover rounded-lg mb-8" />
      <h1 className="text-3xl font-bold mb-4">{eventData.title}</h1>
      <p className="text-gray-600 mb-4">{eventData.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <p><strong>Date:</strong> {new Date(eventData.date).toLocaleString()}</p>
          <p><strong>Location:</strong> {eventData.location}</p>
          <p><strong>Capacity:</strong> {eventData.capacity}</p>
          <p><strong>Category:</strong> {eventData.category}</p>
        </div>
        <div>
          {/* <h2 className="text-xl font-semibold mb-2">Organizer</h2> */}
          {/* <p>{eventData}</p> */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">Register for Event</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;