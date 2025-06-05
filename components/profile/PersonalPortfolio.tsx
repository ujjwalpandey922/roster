"use client";

import { useState, useEffect } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

export default function PortfolioSection({
  isEditing,
}: {
  isEditing: boolean;
}) {
  const { profile, addPortfolioItem, removePortfolioItem } = useProfile();
  const [newItem, setNewItem] = useState({ imageUrl: "", label: "", link: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newItem.imageUrl || !newItem.label) {
      toast.error("Image and label are required");
      return;
    }
    const newId = Date.now().toString();
    addPortfolioItem({ id: newId, ...newItem });
    setNewItem({ imageUrl: "", label: "", link: "" });
    toast.success("Portfolio item added");
  };

  const handleRemove = (id: string) => {
    setIsRemoving(true);
    try {
      removePortfolioItem(id);
      toast.success("Item removed");
    } catch (error) {
      toast.error("Error removing item");
    } finally {
      setIsRemoving(false);
    }
  };

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const navigateGallery = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentImageIndex((prev) =>
        prev === 0 ? (profile?.portfolioItems?.length || 0) - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === (profile?.portfolioItems?.length || 0) - 1 ? 0 : prev + 1
      );
    }
  };

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!galleryOpen) return;

      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowLeft") navigateGallery("prev");
      if (e.key === "ArrowRight") navigateGallery("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryOpen]);

  return (
    <div className="space-y-6">
      {/* Gallery Modal */}
      {galleryOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => navigateGallery("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <div className="flex flex-col items-center">
              <img
                src={profile?.portfolioItems?.[currentImageIndex]?.imageUrl}
                alt={profile.portfolioItems?.[currentImageIndex]?.label}
                className="max-h-[80vh] max-w-full object-contain"
              />
              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-bold">
                  {profile?.portfolioItems?.[currentImageIndex]?.label}
                </h3>
                {profile?.portfolioItems?.[currentImageIndex]?.link && (
                  <a
                    href={profile.portfolioItems[currentImageIndex]?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-400 hover:underline"
                  >
                    View Project
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={() => navigateGallery("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>

          <div className="absolute bottom-4 flex gap-2">
            {profile?.portfolioItems?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex ? "bg-white" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Portfolio
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {profile.portfolioItems?.map((item, index) => (
          <div
            key={item.id}
            className="relative group border rounded-md overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div
              className="relative h-96 cursor-pointer"
              onClick={() => openGallery(index)}
            >
              <img
                src={item.imageUrl}
                alt={item.label}
                className="w-full h-full object-cover"
              />

              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredItem === item.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {isEditing && (
              <button
                className={`absolute top-2 right-2 p-2 bg-gray-800 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-colors ${
                  hoveredItem === item.id ? "opacity-100" : "opacity-0"
                }`}
                onClick={() => handleRemove(item.id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="border-t pt-4 mt-6">
          <h3 className="text-lg font-semibold mb-2">Add Portfolio Item</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Image URL"
              value={newItem.imageUrl}
              onChange={(e) =>
                setNewItem({ ...newItem, imageUrl: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Label"
              value={newItem.label}
              onChange={(e) =>
                setNewItem({ ...newItem, label: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Link (optional)"
              value={newItem.link}
              onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <Button
              onClick={handleAdd}
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              disabled={isAdding}
            >
              <Plus className="h-4 w-4" /> Add Item
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
