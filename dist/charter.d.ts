import { z } from "zod";
/**
 * Trip schema - represents a fishing trip offering
 */
export declare const tripSchema: z.ZodObject<{
    name: z.ZodString;
    tripType: z.ZodString;
    price: z.ZodNumber;
    promoPrice: z.ZodOptional<z.ZodNumber>;
    durationHours: z.ZodNumber;
    startTimes: z.ZodArray<z.ZodString>;
    maxAnglers: z.ZodNumber;
    charterStyle: z.ZodEnum<{
        private: "private";
        shared: "shared";
    }>;
    description: z.ZodOptional<z.ZodString>;
    species: z.ZodDefault<z.ZodArray<z.ZodString>>;
    techniques: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
/**
 * Policies schema - represents charter policies and rules
 */
export declare const policiesSchema: z.ZodObject<{
    licenseProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    catchAndKeep: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    catchAndRelease: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    childFriendly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    liveBaitProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    alcoholNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    smokingNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
/**
 * Main charter form schema
 * Comprehensive validation for charter registration/onboarding
 */
export declare const charterFormSchema: z.ZodObject<{
    operator: z.ZodObject<{
        displayName: z.ZodString;
        experienceYears: z.ZodNumber;
        bio: z.ZodString;
        phone: z.ZodString;
        backupPhone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        avatar: z.ZodOptional<z.ZodAny>;
        avatarUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    charterType: z.ZodString;
    charterName: z.ZodString;
    state: z.ZodString;
    city: z.ZodString;
    startingPoint: z.ZodString;
    placeId: z.ZodOptional<z.ZodString>;
    postcode: z.ZodString;
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
    description: z.ZodString;
    generatedDescription: z.ZodOptional<z.ZodString>;
    tone: z.ZodDefault<z.ZodEnum<{
        friendly: "friendly";
        adventurous: "adventurous";
        professional: "professional";
    }>>;
    withoutBoat: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    boat: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        lengthFeet: z.ZodOptional<z.ZodNumber>;
        capacity: z.ZodOptional<z.ZodNumber>;
        features: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    }, z.core.$strip>;
    amenities: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>>;
    policies: z.ZodObject<{
        licenseProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndKeep: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndRelease: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        childFriendly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        liveBaitProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        alcoholNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        smokingNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, z.core.$strip>;
    pickup: z.ZodObject<{
        available: z.ZodBoolean;
        fee: z.ZodNullable<z.ZodNumber>;
        areas: z.ZodArray<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    trips: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        tripType: z.ZodString;
        price: z.ZodNumber;
        promoPrice: z.ZodOptional<z.ZodNumber>;
        durationHours: z.ZodNumber;
        startTimes: z.ZodArray<z.ZodString>;
        maxAnglers: z.ZodNumber;
        charterStyle: z.ZodEnum<{
            private: "private";
            shared: "shared";
        }>;
        description: z.ZodOptional<z.ZodString>;
        species: z.ZodDefault<z.ZodArray<z.ZodString>>;
        techniques: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
    photos: z.ZodArray<z.ZodAny>;
    videos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodAny>>>;
    uploadedPhotos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>>>>;
    uploadedVideos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
export type CharterFormValues = z.infer<typeof charterFormSchema>;
export declare const basicsStepSchema: z.ZodObject<{
    charterType: z.ZodString;
    state: z.ZodString;
    city: z.ZodString;
    startingPoint: z.ZodString;
    postcode: z.ZodString;
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
    operator: z.ZodObject<{
        displayName: z.ZodString;
        experienceYears: z.ZodNumber;
        bio: z.ZodString;
        phone: z.ZodString;
        backupPhone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        avatar: z.ZodOptional<z.ZodAny>;
        avatarUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    charterName: z.ZodString;
}, z.core.$strip>;
export declare const experienceStepSchema: z.ZodObject<{
    boat: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        lengthFeet: z.ZodOptional<z.ZodNumber>;
        capacity: z.ZodOptional<z.ZodNumber>;
        features: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    }, z.core.$strip>;
    amenities: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>>;
    policies: z.ZodObject<{
        licenseProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndKeep: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndRelease: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        childFriendly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        liveBaitProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        alcoholNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        smokingNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, z.core.$strip>;
    pickup: z.ZodObject<{
        available: z.ZodBoolean;
        fee: z.ZodNullable<z.ZodNumber>;
        areas: z.ZodArray<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const tripsStepSchema: z.ZodObject<{
    trips: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        tripType: z.ZodString;
        price: z.ZodNumber;
        promoPrice: z.ZodOptional<z.ZodNumber>;
        durationHours: z.ZodNumber;
        startTimes: z.ZodArray<z.ZodString>;
        maxAnglers: z.ZodNumber;
        charterStyle: z.ZodEnum<{
            private: "private";
            shared: "shared";
        }>;
        description: z.ZodOptional<z.ZodString>;
        species: z.ZodDefault<z.ZodArray<z.ZodString>>;
        techniques: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const mediaPricingStepSchema: z.ZodObject<{
    photos: z.ZodArray<z.ZodAny>;
    videos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodAny>>>;
}, z.core.$strip>;
export declare const descriptionStepSchema: z.ZodObject<{
    description: z.ZodString;
    tone: z.ZodDefault<z.ZodEnum<{
        friendly: "friendly";
        adventurous: "adventurous";
        professional: "professional";
    }>>;
    generatedDescription: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
