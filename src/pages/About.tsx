
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, Phone, Users, Award, Heart } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header 
        cart={[]}
        updateQuantity={() => {}}
        removeFromCart={() => {}}
        handleWhatsAppOrder={() => {}}
        deliveryCost={4000}
      />

      {/* Hero Section with Background */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')`
        }}
      >
        <div className="container mx-auto text-center text-white">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-white hover:text-orange-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Menú
          </Button>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sobre{" "}
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Nosotros
            </span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubre la historia detrás de los sabores que conquistan corazones
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Our Story */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <Heart className="h-8 w-8 text-orange-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Nuestra Historia</h2>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Restaurante Delicia nació en 2015 con un sueño simple pero poderoso: crear un lugar donde cada bocado fuera una experiencia memorable. Fundado por la familia Rodríguez, nuestro restaurante ha crecido desde un pequeño local en el barrio hasta convertirse en el punto de encuentro favorito de la comunidad.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Nos especializamos en combinar recetas tradicionales con toques modernos, utilizando siempre ingredientes frescos y de la más alta calidad. Cada plato que servimos lleva el amor y la dedicación de nuestro equipo de chefs, quienes trabajan incansablemente para sorprender tu paladar.
              </p>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <Award className="h-8 w-8 text-orange-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Nuestros Valores</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 restaurant-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Pasión</h3>
                <p className="text-gray-600">
                  Cada plato es preparado con amor y dedicación, porque creemos que la pasión se siente en cada bocado.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 restaurant-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Calidad</h3>
                <p className="text-gray-600">
                  Seleccionamos cuidadosamente cada ingrediente para garantizar la mejor experiencia gastronómica.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 restaurant-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Comunidad</h3>
                <p className="text-gray-600">
                  Somos más que un restaurante, somos parte de la familia de cada cliente que nos visita.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-center mb-8">
              <MapPin className="h-8 w-8 text-orange-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Encuéntranos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <MapPin className="h-6 w-6 text-orange-500 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                <p className="text-gray-600">Calle 123 #45-67<br />Bogotá, Colombia</p>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="h-6 w-6 text-orange-500 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                <p className="text-gray-600">+57 312 714 2928</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-6 w-6 text-orange-500 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Horarios</h3>
                <p className="text-gray-600">Lunes a Domingo<br />11:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Listo para vivir la experiencia Delicia?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Te invitamos a visitarnos y descubrir por qué somos el restaurante favorito de la ciudad.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="restaurant-gradient text-white hover:opacity-90 transition-opacity"
            size="lg"
          >
            Ver Nuestro Menú
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
