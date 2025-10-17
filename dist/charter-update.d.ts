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
    }, "strip", z.ZodTypeAny, {
        charterType?: string;
        name?: string;
        state?: string;
        city?: string;
        startingPoint?: string;
        postcode?: string;
        latitude?: number;
        longitude?: number;
        description?: string;
        tone?: string;
    }, {
        charterType?: string;
        name?: string;
        state?: string;
        city?: string;
        startingPoint?: string;
        postcode?: string;
        latitude?: number;
        longitude?: number;
        description?: string;
        tone?: string;
    }>>;
    captain: z.ZodOptional<z.ZodObject<{
        displayName: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        bio: z.ZodOptional<z.ZodString>;
        experienceYrs: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYrs?: number;
    }, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYrs?: number;
    }>>;
    boat: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        lengthFt: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        capacity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        features: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        type?: string;
        lengthFt?: number;
        capacity?: number;
        features?: string[];
    }, {
        name?: string;
        type?: string;
        lengthFt?: number;
        capacity?: number;
        features?: string[];
    }>>;
    amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    features: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    policies: z.ZodOptional<z.ZodObject<{
        licenseProvided: z.ZodOptional<z.ZodBoolean>;
        catchAndKeep: z.ZodOptional<z.ZodBoolean>;
        catchAndRelease: z.ZodOptional<z.ZodBoolean>;
        childFriendly: z.ZodOptional<z.ZodBoolean>;
        liveBaitProvided: z.ZodOptional<z.ZodBoolean>;
        alcoholNotAllowed: z.ZodOptional<z.ZodBoolean>;
        smokingNotAllowed: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        licenseProvided?: boolean;
        catchAndKeep?: boolean;
        catchAndRelease?: boolean;
        childFriendly?: boolean;
        liveBaitProvided?: boolean;
        alcoholNotAllowed?: boolean;
        smokingNotAllowed?: boolean;
    }, {
        licenseProvided?: boolean;
        catchAndKeep?: boolean;
        catchAndRelease?: boolean;
        childFriendly?: boolean;
        liveBaitProvided?: boolean;
        alcoholNotAllowed?: boolean;
        smokingNotAllowed?: boolean;
    }>>;
    pickup: z.ZodOptional<z.ZodObject<{
        available: z.ZodOptional<z.ZodBoolean>;
        fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        notes: z.ZodOptional<z.ZodString>;
        areas: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }>>;
    trips: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        name: z.ZodOptional<z.ZodString>;
        tripType: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        durationHours: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        maxAnglers: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        style: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startTimes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        species: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        techniques: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        _delete: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        description?: string;
        id?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        style?: string;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        _delete?: boolean;
    }, {
        name?: string;
        description?: string;
        id?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        style?: string;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        _delete?: boolean;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    charter?: {
        charterType?: string;
        name?: string;
        state?: string;
        city?: string;
        startingPoint?: string;
        postcode?: string;
        latitude?: number;
        longitude?: number;
        description?: string;
        tone?: string;
    };
    captain?: {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYrs?: number;
    };
    features?: string[];
    boat?: {
        name?: string;
        type?: string;
        lengthFt?: number;
        capacity?: number;
        features?: string[];
    };
    amenities?: string[];
    policies?: {
        licenseProvided?: boolean;
        catchAndKeep?: boolean;
        catchAndRelease?: boolean;
        childFriendly?: boolean;
        liveBaitProvided?: boolean;
        alcoholNotAllowed?: boolean;
        smokingNotAllowed?: boolean;
    };
    pickup?: {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    };
    trips?: {
        name?: string;
        description?: string;
        id?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        style?: string;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        _delete?: boolean;
    }[];
}, {
    charter?: {
        charterType?: string;
        name?: string;
        state?: string;
        city?: string;
        startingPoint?: string;
        postcode?: string;
        latitude?: number;
        longitude?: number;
        description?: string;
        tone?: string;
    };
    captain?: {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYrs?: number;
    };
    features?: string[];
    boat?: {
        name?: string;
        type?: string;
        lengthFt?: number;
        capacity?: number;
        features?: string[];
    };
    amenities?: string[];
    policies?: {
        licenseProvided?: boolean;
        catchAndKeep?: boolean;
        catchAndRelease?: boolean;
        childFriendly?: boolean;
        liveBaitProvided?: boolean;
        alcoholNotAllowed?: boolean;
        smokingNotAllowed?: boolean;
    };
    pickup?: {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    };
    trips?: {
        name?: string;
        description?: string;
        id?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        style?: string;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        _delete?: boolean;
    }[];
}>;
