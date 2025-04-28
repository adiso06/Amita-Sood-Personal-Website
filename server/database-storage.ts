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
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Property methods
  async getProperties(): Promise<Property[]> {
    return await db.select().from(properties).orderBy(desc(properties.id));
  }
  
  async getPropertyById(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }
  
  async getPropertiesByStatus(status: string): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.status, status)).orderBy(desc(properties.id));
  }
  
  async getPropertiesByType(propertyType: string): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.propertyType, propertyType)).orderBy(desc(properties.id));
  }
  
  async getPropertiesByCounty(county: string): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.county, county)).orderBy(desc(properties.id));
  }
  
  async getLuxuryProperties(): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.isLuxury, true)).orderBy(desc(properties.id));
  }
  
  async createProperty(property: InsertProperty): Promise<Property> {
    const [newProperty] = await db
      .insert(properties)
      .values(property)
      .returning();
    return newProperty;
  }
  
  async updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const [updatedProperty] = await db
      .update(properties)
      .set(property)
      .where(eq(properties.id, id))
      .returning();
    return updatedProperty || undefined;
  }
  
  async deleteProperty(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(properties)
      .where(eq(properties.id, id))
      .returning({ id: properties.id });
    return !!deleted;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(testimonials.id));
  }
  
  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || undefined;
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return newTestimonial;
  }
  
  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.id));
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return newMessage;
  }
  
  async markMessageAsRead(id: number): Promise<boolean> {
    const [updated] = await db
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id))
      .returning({ id: contactMessages.id });
    return !!updated;
  }
  
  // Areas served methods
  async getAreasServed(): Promise<AreaServed[]> {
    return await db.select().from(areasServed).orderBy(desc(areasServed.id));
  }
  
  async getAreaServedById(id: number): Promise<AreaServed | undefined> {
    const [area] = await db.select().from(areasServed).where(eq(areasServed.id, id));
    return area || undefined;
  }
  
  async createAreaServed(area: InsertAreaServed): Promise<AreaServed> {
    const [newArea] = await db
      .insert(areasServed)
      .values(area)
      .returning();
    return newArea;
  }
}