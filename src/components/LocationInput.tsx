
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocationInputProps {
  onLocationChange: (location: string) => void;
  location: string;
}

export const LocationInput = ({ onLocationChange, location }: LocationInputProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="location" className="text-sm font-medium">
        📍 Dirección de entrega (opcional)
      </Label>
      <div className="space-y-2">
        <Input
          id="location"
          type="text"
          placeholder="Ej: Cra 15 #85-32, Bogotá"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="text-sm"
        />
      </div>
    </div>
  );
};
