import React, { useEffect, useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// Draggable component
function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-4 mb-4 bg-white rounded shadow hover:bg-gray-50"
    >
      {children}
    </div>
  );
}

// Droppable component
function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? "lightblue" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full md:w-1/3 p-4 border rounded shadow-md bg-gray-100 h-96 overflow-y-auto"
    >
      {children}
    </div>
  );
}

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("");
  const [activeId, setActiveId] = useState(null);

  const fetchProperties = async () => {
    try {
      console.log("Fetching properties...");
      const res = await fetch("http://localhost:5000/api/properties");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setTimeout(fetchProperties, 5000);
    }
  };

  const updatePropertyGroup = async (id, group) => {
    try {
      console.log(`Updating property ${id} to group ${group}...`);
      const res = await fetch(
        `http://localhost:5000/api/properties/${id}/group`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ group }),
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      console.log(`Updated property ${id} to group ${group}`);
      fetchProperties();
    } catch (error) {
      console.error("Error updating property group:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filterProperties = (group) => {
    return properties.filter(
      (property) =>
        property.group === group &&
        property.propertyName.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { over } = event;

    if (over) {
      const draggedProperty = properties.find((prop) => prop._id === activeId);
      updatePropertyGroup(draggedProperty._id, over.id);
    }

    setActiveId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Filter properties"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-500"
      />
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <div className="flex flex-col md:flex-row justify-around md:space-x-4 space-y-4 md:space-y-0">
          {["Exited", "Pending", "Full Property List"].map((group) => (
            <Droppable key={group} id={group}>
              <h2 className="text-xl font-bold mb-4">
                {group === "Exited"
                  ? "Cleanings Required"
                  : group === "Pending"
                  ? "Cleanings Pending"
                  : "Cleanings Done"}
              </h2>
              {filterProperties(group).map((property) => (
                <Draggable key={property._id} id={property._id}>
                  {property.propertyName}
                </Draggable>
              ))}
            </Droppable>
          ))}
        </div>
        <DragOverlay>
          {activeId ? (
            <div className="p-4 mb-4 bg-white rounded shadow">
              {properties.find((prop) => prop._id === activeId)?.propertyName}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      <button
        onClick={() => (window.location.href = "/add-property")}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
      >
        Add New Property
      </button>
    </div>
  );
};

export default HomePage;

