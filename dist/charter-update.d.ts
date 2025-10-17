import { z } from "zod";
/**
 * Schema for partial charter update (edit mode save)
 * Used in PATCH /api/charters/[id] route
 */
export declare const CharterUpdateSchema: z.ZodObject<{
    charter: z.ZodOptional<z.ZodObject<{
        charterType: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        startingPoint: z.ZodOptional<z.ZodString>;
        postcode: z.ZodOptional<z.ZodString>;
        latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        description: z.ZodOptional<z.ZodString>;
        tone: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    captain: z.ZodOptional<z.ZodObject<{
        displayName: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        bio: z.ZodOptional<z.ZodString>;
        experienceYrs: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    boat: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        lengthFt: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        capacity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        features: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
    amenities: z.ZodOptional<z.ZodArray<z.ZodString>>;
    features: z.ZodOptional<z.ZodArray<z.ZodString>>;
    policies: z.ZodOptional<z.ZodObject<{
        licenseProvided: z.ZodOptional<z.ZodBoolean>;
        catchAndKeep: z.ZodOptional<z.ZodBoolean>;
        catchAndRelease: z.ZodOptional<z.ZodBoolean>;
        childFriendly: z.ZodOptional<z.ZodBoolean>;
        liveBaitProvided: z.ZodOptional<z.ZodBoolean>;
        alcoholNotAllowed: z.ZodOptional<z.ZodBoolean>;
        smokingNotAllowed: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
    pickup: z.ZodOptional<z.ZodObject<{
        available: z.ZodOptional<z.ZodBoolean>;
        fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        notes: z.ZodOptional<z.ZodString>;
        areas: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
    trips: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        name: z.ZodOptional<z.ZodString>;
        tripType: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        durationHours: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        maxAnglers: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        style: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startTimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
        species: z.ZodOptional<z.ZodArray<z.ZodString>>;
        techniques: z.ZodOptional<z.ZodArray<z.ZodString>>;
        _delete: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
