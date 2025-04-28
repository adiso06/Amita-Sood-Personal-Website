import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import PropertyForm from "@/components/admin/PropertyForm";

const Admin = () => {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
    enabled: isAuthenticated
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/properties/${id}`, {
        method: 'DELETE'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      toast({
        title: "Property deleted",
        description: "The property has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete the property. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a simple authentication for demo purposes
    // In a real application, you would want to use proper authentication
    if (username === "amita" && password === "realtor123") {
      setIsAuthenticated(true);
      toast({
        title: "Logged in",
        description: "You are now logged in as an administrator.",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setSelectedProperty(null);
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleBack = () => {
    setIsEditing(false);
    setIsAdding(false);
    setSelectedProperty(null);
  };

  const renderPropertyList = () => {
    if (isLoading) {
      return <div className="text-center py-10">Loading properties...</div>;
    }

    if (!Array.isArray(properties) || properties.length === 0) {
      return <div className="text-center py-10">No properties found.</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property: Property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={(property.images && Array.isArray(property.images) && property.images.length > 0) ? property.images[0] : 'https://via.placeholder.com/300x200?text=No+Image'} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{property.title}</CardTitle>
              <CardDescription>
                {property.address}, {property.city}, {property.state} {property.zipCode}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-lg">${property.price.toLocaleString()}</p>
              <p>{property.bedrooms} BD | {property.bathrooms} BA | {property.squareFeet.toLocaleString()} SQFT</p>
              <div className="flex items-center mt-2">
                <span className={`px-2 py-1 text-xs rounded ${property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {property.status === 'active' ? 'Active' : 'Sold'}
                </span>
                {property.isLuxury && (
                  <span className="ml-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                    Luxury
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleEdit(property)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(property.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto max-w-md py-20">
        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to manage your properties.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">Username</label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Login</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  if (isEditing || isAdding) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Button variant="outline" onClick={handleBack} className="mb-6">
          &larr; Back to Property List
        </Button>
        <PropertyForm 
          property={selectedProperty} 
          isEditing={isEditing} 
          onComplete={() => {
            setIsEditing(false);
            setIsAdding(false);
            setSelectedProperty(null);
          }} 
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-playfair font-bold">Property Management</h1>
        <div className="flex gap-4">
          <Button onClick={handleAdd}>Add New Property</Button>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-10">
        <TabsList>
          <TabsTrigger value="all">All Properties</TabsTrigger>
          <TabsTrigger value="active">Active Listings</TabsTrigger>
          <TabsTrigger value="sold">Sold Properties</TabsTrigger>
          <TabsTrigger value="luxury">Luxury Properties</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {renderPropertyList()}
        </TabsContent>
        <TabsContent value="active">
          {!Array.isArray(properties) ? (
            <div className="text-center py-10">No properties found.</div>
          ) : properties.filter((p: Property) => p.status === 'active').length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties
                .filter((p: Property) => p.status === 'active')
                .map((property: Property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={(property.images && Array.isArray(property.images) && property.images.length > 0) ? property.images[0] : 'https://via.placeholder.com/300x200?text=No+Image'} 
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{property.title}</CardTitle>
                      <CardDescription>
                        {property.address}, {property.city}, {property.state} {property.zipCode}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold text-lg">${property.price.toLocaleString()}</p>
                      <p>{property.bedrooms} BD | {property.bathrooms} BA | {property.squareFeet.toLocaleString()} SQFT</p>
                      <div className="flex items-center mt-2">
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                          Active
                        </span>
                        {property.isLuxury && (
                          <span className="ml-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                            Luxury
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => handleEdit(property)}>
                        Edit
                      </Button>
                      <Button variant="destructive" onClick={() => handleDelete(property.id)}>
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-10">No active properties found.</div>
          )}
        </TabsContent>
        <TabsContent value="sold">
          {!Array.isArray(properties) ? (
            <div className="text-center py-10">No properties found.</div>
          ) : properties.filter((p: Property) => p.status === 'sold').length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties
                .filter((p: Property) => p.status === 'sold')
                .map((property: Property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={(property.images && Array.isArray(property.images) && property.images.length > 0) ? property.images[0] : 'https://via.placeholder.com/300x200?text=No+Image'} 
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{property.title}</CardTitle>
                      <CardDescription>
                        {property.address}, {property.city}, {property.state} {property.zipCode}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold text-lg">${property.price.toLocaleString()}</p>
                      <p>{property.bedrooms} BD | {property.bathrooms} BA | {property.squareFeet.toLocaleString()} SQFT</p>
                      <div className="flex items-center mt-2">
                        <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">
                          Sold
                        </span>
                        {property.isLuxury && (
                          <span className="ml-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                            Luxury
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => handleEdit(property)}>
                        Edit
                      </Button>
                      <Button variant="destructive" onClick={() => handleDelete(property.id)}>
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-10">No sold properties found.</div>
          )}
        </TabsContent>
        <TabsContent value="luxury">
          {!Array.isArray(properties) ? (
            <div className="text-center py-10">No properties found.</div>
          ) : properties.filter((p: Property) => p.isLuxury).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties
                .filter((p: Property) => p.isLuxury)
                .map((property: Property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={(property.images && Array.isArray(property.images) && property.images.length > 0) ? property.images[0] : 'https://via.placeholder.com/300x200?text=No+Image'} 
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{property.title}</CardTitle>
                      <CardDescription>
                        {property.address}, {property.city}, {property.state} {property.zipCode}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold text-lg">${property.price.toLocaleString()}</p>
                      <p>{property.bedrooms} BD | {property.bathrooms} BA | {property.squareFeet.toLocaleString()} SQFT</p>
                      <div className="flex items-center mt-2">
                        <span className={`px-2 py-1 text-xs rounded ${property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {property.status === 'active' ? 'Active' : 'Sold'}
                        </span>
                        <span className="ml-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                          Luxury
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => handleEdit(property)}>
                        Edit
                      </Button>
                      <Button variant="destructive" onClick={() => handleDelete(property.id)}>
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-10">No luxury properties found.</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;