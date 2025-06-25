
import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LocationInputProps {
  onLocationChange: (location: string) => void;
  location: string;
}

export const LocationInput = ({ onLocationChange, location }: LocationInputProps) => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { toast } = useToast();

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocalización no disponible",
        description: "Tu navegador no soporta geolocalización",
        variant: "destructive",
      });
      return;
    }

    setIsGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Usamos una API gratuita para obtener la dirección aproximada
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`
          );
          
          if (response.ok) {
            const data = await response.json();
            const address = `${data.locality || ''}, ${data.principalSubdivision || ''}, ${data.countryName || ''}`.replace(/^,\s*|,\s*$/g, '');
            onLocationChange(address || `${latitude}, ${longitude}`);
            
            toast({
              title: "¡Ubicación obtenida!",
              description: "Tu ubicación se ha agregado exitosamente",
            });
          } else {
            onLocationChange(`${latitude}, ${longitude}`);
          }
        } catch (error) {
          const { latitude, longitude } = position.coords;
          onLocationChange(`${latitude}, ${longitude}`);
          
          toast({
            title: "Ubicación obtenida",
            description: "Se usaron las coordenadas como referencia",
          });
        }
        
        setIsGettingLocation(false);
      },
      (error) => {
        setIsGettingLocation(false);
        
        let message = "No se pudo obtener tu ubicación";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Permiso de ubicación denegado";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Ubicación no disponible";
            break;
          case error.TIMEOUT:
            message = "Tiempo de espera agotado";
            break;
        }
        
        toast({
          title: "Error de ubicación",
          description: message,
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

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
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          className="w-full text-xs"
        >
          {isGettingLocation ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
              Obteniendo ubicación...
            </>
          ) : (
            <>
              <MapPin className="h-3 w-3 mr-1" />
              Usar mi ubicación actual
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
