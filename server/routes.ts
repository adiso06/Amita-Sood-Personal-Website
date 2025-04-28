import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPropertySchema, insertTestimonialSchema, insertContactMessageSchema, insertAreaServedSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { db } from "./db";
import bcrypt from "bcryptjs";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route("/api");
  
  // Properties routes
  app.get("/api/properties", async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      const propertyType = req.query.type as string | undefined;
      const county = req.query.county as string | undefined;
      const luxury = req.query.luxury as string | undefined;
      
      let properties;
      
      if (status) {
        properties = await storage.getPropertiesByStatus(status);
      } else if (propertyType) {
        properties = await storage.getPropertiesByType(propertyType);
      } else if (county) {
        properties = await storage.getPropertiesByCounty(county);
      } else if (luxury === 'true') {
        properties = await storage.getLuxuryProperties();
      } else {
        properties = await storage.getProperties();
      }
      
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });
  
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }
      
      const property = await storage.getPropertyById(id);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      console.error("Error fetching property:", error);
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });
  
  app.post("/api/properties", async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      console.error("Error creating property:", error);
      res.status(500).json({ message: "Failed to create property" });
    }
  });
  
  app.put("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }
      
      const validatedData = insertPropertySchema.partial().parse(req.body);
      const property = await storage.updateProperty(id, validatedData);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      console.error("Error updating property:", error);
      res.status(500).json({ message: "Failed to update property" });
    }
  });
  
  app.delete("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }
      
      const success = await storage.deleteProperty(id);
      
      if (!success) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ message: "Failed to delete property" });
    }
  });
  
  // Sold Properties route
  app.get("/api/sold-properties", async (req, res) => {
    try {
      const soldProperties = await db.execute(
        "SELECT * FROM sold_properties ORDER BY sold_date DESC"
      );
      
      res.json(soldProperties.rows);
    } catch (error) {
      console.error("Error fetching sold properties:", error);
      res.status(500).json({ message: "Failed to fetch sold properties" });
    }
  });
  
  // Testimonials routes
  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  app.get("/api/testimonials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid testimonial ID" });
      }
      
      const testimonial = await storage.getTestimonialById(id);
      
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      
      res.json(testimonial);
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      res.status(500).json({ message: "Failed to fetch testimonial" });
    }
  });
  
  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      }
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });
  
  // Contact message routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ 
        success: true,
        message: "Your message has been sent successfully. We'll get back to you soon.",
        data: message
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid contact form data", 
          errors: error.errors 
        });
      }
      console.error("Error sending contact message:", error);
      res.status(500).json({ 
        success: false,
        message: "Failed to send your message. Please try again later."
      });
    }
  });
  
  // Areas served routes
  app.get("/api/areas", async (_req, res) => {
    try {
      const areas = await storage.getAreasServed();
      res.json(areas);
    } catch (error) {
      console.error("Error fetching areas:", error);
      res.status(500).json({ message: "Failed to fetch areas" });
    }
  });
  
  app.get("/api/areas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid area ID" });
      }
      
      const area = await storage.getAreaServedById(id);
      
      if (!area) {
        return res.status(404).json({ message: "Area not found" });
      }
      
      res.json(area);
    } catch (error) {
      console.error("Error fetching area:", error);
      res.status(500).json({ message: "Failed to fetch area" });
    }
  });
  
  // User auth routes
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(validatedData.password, salt);
      
      // Create user with hashed password
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword
      });
      
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Create a user session
      if (req.session) {
        req.session.userId = user.id;
        req.session.isAuthenticated = true;
      }
      
      // Don't return the password
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        message: "Login successful",
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });
  
  app.post("/api/auth/logout", (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).json({ message: "Failed to logout" });
        }
        res.json({ message: "Logged out successfully" });
      });
    } else {
      res.json({ message: "Already logged out" });
    }
  });
  
  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session || !req.session.userId || !req.session.isAuthenticated) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(req.session.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error getting current user:", error);
      res.status(500).json({ message: "Failed to get current user" });
    }
  });
  
  // Middleware to protect routes
  const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.userId || !req.session.isAuthenticated) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  };
  
  // Protected routes
  app.post("/api/properties", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      console.error("Error creating property:", error);
      res.status(500).json({ message: "Failed to create property" });
    }
  });
  
  app.put("/api/properties/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }
      
      const validatedData = insertPropertySchema.partial().parse(req.body);
      const property = await storage.updateProperty(id, validatedData);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      console.error("Error updating property:", error);
      res.status(500).json({ message: "Failed to update property" });
    }
  });
  
  app.delete("/api/properties/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }
      
      const success = await storage.deleteProperty(id);
      
      if (!success) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ message: "Failed to delete property" });
    }
  });
  
  // Endpoint to seed the database with sample data
  app.post("/api/seed", async (req, res) => {
    try {
      // Load sample data from server/storage.ts (simplified version for example)
      
      // Sample area data
      const areasData = [
        {
          county: "Fulton",
          cities: ["Atlanta", "Alpharetta", "Sandy Springs", "Roswell", "Milton"]
        },
        {
          county: "Cobb",
          cities: ["Marietta", "Smyrna", "Kennesaw", "Vinings"]
        },
        {
          county: "DeKalb",
          cities: ["Decatur", "Dunwoody", "Brookhaven", "Stone Mountain"]
        },
        {
          county: "Gwinnett",
          cities: ["Loganville", "Norcross", "Duluth", "Suwanee", "Lilburn"]
        },
        {
          county: "Cherokee",
          cities: ["Woodstock"]
        },
        {
          county: "Forsyth",
          cities: ["Cumming"]
        },
        {
          county: "Douglas",
          cities: ["Douglasville"]
        },
        {
          county: "Walton",
          cities: ["Loganville"]
        }
      ];
      
      // Sample testimonial data
      const testimonialData = [
        {
          name: "Robert Johnson",
          relationship: "Client for 13+ years",
          text: "We've been working with Amita for over 13 years. She's helped us buy multiple investment properties and our own home. Very honest, very personable and top of her game. I highly recommend her for both buying and selling.",
          rating: 5,
          yearsWithRealtor: 13,
          image: "/images/amita-sood.jpg"
        },
        {
          name: "Sarah Williams",
          relationship: "Purchased two homes",
          text: "Amita will make home buying a breeze! She is professional, honest, and effective at negotiating with the other party. I've purchased two homes with her assistance and wouldn't hesitate to work with her again.",
          rating: 5,
          image: "/images/amita-sood.jpg"
        },
        {
          name: "Michael Thompson",
          relationship: "Landlord for 7+ years",
          text: "Amita has kept our interests as landlords in focus through multiple rental application processes over many years. She is knowledgeable, fair, and always responsive. I wouldn't trust anyone else with our properties.",
          rating: 5,
          yearsWithRealtor: 7,
          image: "/images/amita-sood.jpg"
        }
      ];
      
      // Sample property data
      const propertyData = [
        {
          title: "Elegant Estate in Buckhead",
          address: "123 Peachtree Rd",
          city: "Atlanta",
          state: "GA",
          zipCode: "30305",
          price: 1250000,
          bedrooms: 5,
          bathrooms: 4.5,
          squareFeet: 4200,
          description: "Luxurious estate in the heart of Buckhead with modern finishes and spacious rooms.",
          features: ["Gourmet Kitchen", "Swimming Pool", "Home Theater", "Wine Cellar", "Smart Home Technology"],
          status: "active",
          propertyType: "Single Family",
          yearBuilt: 2018,
          images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"],
          county: "Fulton",
          isLuxury: true
        },
        {
          title: "Modern Family Home in Roswell",
          address: "456 Oak St",
          city: "Roswell",
          state: "GA",
          zipCode: "30075",
          price: 625000,
          bedrooms: 4,
          bathrooms: 3,
          squareFeet: 2800,
          description: "Beautiful modern home in a family-friendly neighborhood with excellent schools.",
          features: ["Open Floor Plan", "Hardwood Floors", "Fenced Backyard", "Granite Countertops"],
          status: "active",
          propertyType: "Single Family",
          yearBuilt: 2015,
          images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"],
          county: "Fulton",
          isLuxury: false
        },
        {
          title: "Executive Townhome in Sandy Springs",
          address: "789 River Rd",
          city: "Sandy Springs",
          state: "GA",
          zipCode: "30328",
          price: 489000,
          bedrooms: 3,
          bathrooms: 2.5,
          squareFeet: 2100,
          description: "Stunning townhome in prime location with easy access to shopping and dining.",
          features: ["Rooftop Terrace", "Gated Community", "Stainless Steel Appliances", "Garage"],
          status: "sold",
          propertyType: "Townhome",
          yearBuilt: 2017,
          images: ["https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"],
          county: "Fulton",
          isLuxury: false
        },
        {
          title: "Luxury Estate in Johns Creek",
          address: "230 Fernly Park Dr",
          city: "Johns Creek",
          state: "GA",
          zipCode: "30022",
          price: 1125000,
          bedrooms: 5,
          bathrooms: 4.5,
          squareFeet: 4800,
          description: "Recently sold luxury estate in Johns Creek. This magnificent property offers 5 bedrooms, 4.5 bathrooms, and premium finishes in one of Atlanta's most prestigious communities.",
          features: ["Swimming Pool", "Home Theater", "Wine Cellar", "Smart Home Technology", "Three-Car Garage"],
          status: "sold",
          propertyType: "Single Family",
          yearBuilt: 2012,
          images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"],
          county: "Fulton",
          isLuxury: true
        },
        {
          title: "Estate in Marietta",
          address: "2609 Peterboro Row",
          city: "Marietta",
          state: "GA",
          zipCode: "30062",
          price: 719000,
          bedrooms: 5,
          bathrooms: 4,
          squareFeet: 3200,
          description: "Recently sold elegant home in Marietta. This impressive property features 5 bedrooms, 4 bathrooms, and sophisticated design elements throughout.",
          features: ["Office Space", "Finished Basement", "Gourmet Kitchen", "Custom Built-ins"],
          status: "sold",
          propertyType: "Single Family",
          yearBuilt: 2005,
          images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"],
          county: "Cobb",
          isLuxury: false
        },
        {
          title: "Luxury Home in Alpharetta",
          address: "1610 Trellis Pl",
          city: "Alpharetta",
          state: "GA",
          zipCode: "30004",
          price: 1345000,
          bedrooms: 6,
          bathrooms: 5.5,
          squareFeet: 5200,
          description: "Stunning luxury home in Alpharetta. This exquisite property features 6 bedrooms, 5.5 bathrooms, and premium finishes throughout.",
          features: ["Gourmet Kitchen", "Home Theater", "Wine Cellar", "Swimming Pool", "Outdoor Kitchen", "Smart Home Technology"],
          status: "sold",
          propertyType: "Single Family",
          yearBuilt: 2016,
          images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"],
          county: "Fulton",
          isLuxury: true
        }
      ];
      
      // Insert data into database
      // Insert areas
      for (const area of areasData) {
        await storage.createAreaServed(area);
      }
      
      // Insert testimonials
      for (const testimonial of testimonialData) {
        await storage.createTestimonial(testimonial);
      }
      
      // Insert properties
      for (const property of propertyData) {
        await storage.createProperty(property);
      }
      
      res.status(200).json({ 
        success: true, 
        message: "Database seeded successfully",
        counts: {
          areas: areasData.length,
          testimonials: testimonialData.length,
          properties: propertyData.length
        }
      });
    } catch (error) {
      console.error("Error seeding database:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to seed database", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
