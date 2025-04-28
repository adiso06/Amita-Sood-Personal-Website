import { 
  users, 
  properties, 
  testimonials, 
  contactMessages, 
  areasServed,
  type User, 
  type InsertUser,
  type Property,
  type InsertProperty,
  type Testimonial,
  type InsertTestimonial,
  type ContactMessage,
  type InsertContactMessage,
  type AreaServed,
  type InsertAreaServed
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property methods
  getProperties(): Promise<Property[]>;
  getPropertyById(id: number): Promise<Property | undefined>;
  getPropertiesByStatus(status: string): Promise<Property[]>;
  getPropertiesByType(propertyType: string): Promise<Property[]>;
  getPropertiesByCounty(county: string): Promise<Property[]>;
  getLuxuryProperties(): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  
  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonialById(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact message methods
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: number): Promise<boolean>;
  
  // Areas served methods
  getAreasServed(): Promise<AreaServed[]>;
  getAreaServedById(id: number): Promise<AreaServed | undefined>;
  createAreaServed(area: InsertAreaServed): Promise<AreaServed>;
}

// In-memory implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private testimonials: Map<number, Testimonial>;
  private contactMessages: Map<number, ContactMessage>;
  private areasServed: Map<number, AreaServed>;
  
  private userIdCounter: number;
  private propertyIdCounter: number;
  private testimonialIdCounter: number;
  private messageIdCounter: number;
  private areaIdCounter: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.testimonials = new Map();
    this.contactMessages = new Map();
    this.areasServed = new Map();
    
    this.userIdCounter = 1;
    this.propertyIdCounter = 1;
    this.testimonialIdCounter = 1;
    this.messageIdCounter = 1;
    this.areaIdCounter = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }
  
  private initializeSampleData() {
    // Initialize areas served
    const areasData: InsertAreaServed[] = [
      {
        county: "Fulton",
        cities: ["Atlanta", "Alpharetta", "Sandy Springs", "Roswell", "Johns Creek", "Milton"]
      },
      {
        county: "DeKalb",
        cities: ["Brookhaven", "Decatur", "Druid Hills", "Dunwoody"]
      },
      {
        county: "Cobb",
        cities: ["Marietta", "Kennesaw", "Smyrna"]
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
    
    areasData.forEach(area => this.createAreaServed(area));
    
    // Initialize testimonials
    const testimonialData: InsertTestimonial[] = [
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
    
    testimonialData.forEach(testimonial => this.createTestimonial(testimonial));
    
    // Initialize properties
    const propertyData: InsertProperty[] = [
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
        address: "340 Kincardine Way",
        city: "Alpharetta",
        state: "GA",
        zipCode: "30022",
        price: 1140000,
        bedrooms: 6,
        bathrooms: 5,
        squareFeet: 4500,
        description: "Stunning luxury home in Alpharetta with 6 bedrooms and 5 bathrooms. This spacious property offers elegant finishes, open floor plan, and beautiful landscaping in a sought-after neighborhood.",
        features: ["Gourmet Kitchen", "Hardwood Floors", "Master Suite", "Media Room", "Landscaped Yard", "High Ceilings"],
        status: "active",
        propertyType: "Single Family",
        yearBuilt: 2010,
        images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"],
        county: "Fulton",
        isLuxury: true
      }
    ];
    
    propertyData.forEach(property => this.createProperty(property));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Property methods
  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }
  
  async getPropertyById(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }
  
  async getPropertiesByStatus(status: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      property => property.status === status
    );
  }
  
  async getPropertiesByType(propertyType: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      property => property.propertyType === propertyType
    );
  }
  
  async getPropertiesByCounty(county: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      property => property.county === county
    );
  }
  
  async getLuxuryProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      property => property.isLuxury
    );
  }
  
  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.propertyIdCounter++;
    const timestamp = new Date();
    
    // Ensure all required properties have default values if not provided
    const newProperty: Property = { 
      ...property, 
      id,
      createdAt: timestamp,
      status: property.status || "active",
      images: property.images || [],
      features: property.features || [],
      isLuxury: property.isLuxury !== undefined ? property.isLuxury : false,
      county: property.county || "",
      yearBuilt: property.yearBuilt || null
    };
    
    this.properties.set(id, newProperty);
    return newProperty;
  }
  
  async updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const existingProperty = this.properties.get(id);
    
    if (!existingProperty) {
      return undefined;
    }
    
    const updatedProperty: Property = {
      ...existingProperty,
      ...property
    };
    
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }
  
  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialIdCounter++;
    const timestamp = new Date();
    const newTestimonial: Testimonial = {
      ...testimonial,
      id,
      createdAt: timestamp,
      image: testimonial.image || null,
      yearsWithRealtor: testimonial.yearsWithRealtor || null
    };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
  
  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageIdCounter++;
    const timestamp = new Date();
    const newMessage: ContactMessage = {
      ...message,
      id,
      createdAt: timestamp,
      isRead: false,
      phone: message.phone || null
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
  
  async markMessageAsRead(id: number): Promise<boolean> {
    const message = this.contactMessages.get(id);
    
    if (!message) {
      return false;
    }
    
    const updatedMessage: ContactMessage = {
      ...message,
      isRead: true
    };
    
    this.contactMessages.set(id, updatedMessage);
    return true;
  }
  
  // Areas served methods
  async getAreasServed(): Promise<AreaServed[]> {
    return Array.from(this.areasServed.values());
  }
  
  async getAreaServedById(id: number): Promise<AreaServed | undefined> {
    return this.areasServed.get(id);
  }
  
  async createAreaServed(area: InsertAreaServed): Promise<AreaServed> {
    const id = this.areaIdCounter++;
    const newArea: AreaServed = {
      ...area,
      id
    };
    this.areasServed.set(id, newArea);
    return newArea;
  }
}

// Import the DatabaseStorage implementation
import { DatabaseStorage } from "./database-storage";

// Use DatabaseStorage instead of MemStorage for persistent storage
export const storage = new DatabaseStorage();
