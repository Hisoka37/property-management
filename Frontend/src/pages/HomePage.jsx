import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchProperties = async () => {
    const res = await fetch('http://localhost:5000/api/properties');
    const data = await res.json();
    setProperties(data);
  };

  const updatePropertyGroup = async (id, group) => {
    await fetch(`http://localhost:5000/api/properties/${id}/group`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group }),
    });
    fetchProperties();
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const draggedProperty = properties.find(prop => prop._id === result.draggableId);
      updatePropertyGroup(draggedProperty._id, destination.droppableId);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filterProperties = (group) => {
    return properties.filter(property => property.group === group && property.propertyName.toLowerCase().includes(filter.toLowerCase()));
  };

  return (
    <div className="container mx-auto p-4">
  <input
    type="text"
    placeholder="Filter properties"
    value={filter}
    onChange={e => setFilter(e.target.value)}
    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-500"
  />
  <DragDropContext onDragEnd={handleDragEnd}>
    <div className="flex flex-col md:flex-row justify-around md:space-x-4 space-y-4 md:space-y-0">
      {['Exited', 'Pending', 'Full Property List'].map(group => (
        <Droppable key={group} droppableId={group}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-full md:w-1/3 p-4 border rounded shadow-md bg-gray-100 h-96 overflow-y-auto"
            >
              <h2 className="text-xl font-bold mb-4">
                {group === 'Exited' ? 'Cleanings Required' : group === 'Full Property List' ? 'Cleanings Done' : 'Pending cleanings'}
              </h2>
              {filterProperties(group).map((property, index) => (
                <Draggable key={property._id} draggableId={property._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 mb-4 bg-white rounded shadow hover:bg-gray-50"
                    >
                      {property.propertyName}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  </DragDropContext>
  <button
    onClick={() => window.location.href = '/add-property'}
    className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
  >
    Add New Property
  </button>
</div>
  );
};

export default HomePage;
