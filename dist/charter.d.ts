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
    startTimes: z.ZodArray<z.ZodString, "many">;
    maxAnglers: z.ZodNumber;
    charterStyle: z.ZodEnum<["private", "shared"]>;
    description: z.ZodOptional<z.ZodString>;
    species: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    techniques: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    description?: string;
    tripType?: string;
    price?: number;
    durationHours?: number;
    maxAnglers?: number;
    startTimes?: string[];
    species?: string[];
    techniques?: string[];
    promoPrice?: number;
    charterStyle?: "private" | "shared";
}, {
    name?: string;
    description?: string;
    tripType?: string;
    price?: number;
    durationHours?: number;
    maxAnglers?: number;
    startTimes?: string[];
    species?: string[];
    techniques?: string[];
    promoPrice?: number;
    charterStyle?: "private" | "shared";
}>;
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
}>;
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
        avatar: z.ZodOptional<z.ZodEffects<z.ZodAny, any, any>>;
        avatarUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    }, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    }>;
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
    tone: z.ZodDefault<z.ZodEnum<["friendly", "adventurous", "professional"]>>;
    withoutBoat: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    boat: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        lengthFeet: z.ZodOptional<z.ZodNumber>;
        capacity: z.ZodOptional<z.ZodNumber>;
        features: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
    }, {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
    }>;
    amenities: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    policies: z.ZodObject<{
        licenseProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndKeep: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndRelease: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        childFriendly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        liveBaitProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        alcoholNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        smokingNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
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
    }>;
    pickup: z.ZodEffects<z.ZodObject<{
        available: z.ZodBoolean;
        fee: z.ZodNullable<z.ZodNumber>;
        areas: z.ZodArray<z.ZodString, "many">;
        notes: z.ZodOptional<z.ZodString>;
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
    }>, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }>;
    trips: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        tripType: z.ZodString;
        price: z.ZodNumber;
        promoPrice: z.ZodOptional<z.ZodNumber>;
        durationHours: z.ZodNumber;
        startTimes: z.ZodArray<z.ZodString, "many">;
        maxAnglers: z.ZodNumber;
        charterStyle: z.ZodEnum<["private", "shared"]>;
        description: z.ZodOptional<z.ZodString>;
        species: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        techniques: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }, {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }>, "many">;
    photos: z.ZodArray<z.ZodEffects<z.ZodAny, any, any>, "many">;
    videos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodAny, any, any>, "many">>>;
    uploadedPhotos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        url?: string;
    }, {
        name?: string;
        url?: string;
    }>, "many">>>;
    uploadedVideos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        url?: string;
    }, {
        name?: string;
        url?: string;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    charterType?: string;
    state?: string;
    city?: string;
    startingPoint?: string;
    postcode?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
    tone?: "friendly" | "adventurous" | "professional";
    boat?: {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
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
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }[];
    operator?: {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    };
    charterName?: string;
    placeId?: string;
    generatedDescription?: string;
    withoutBoat?: boolean;
    photos?: any[];
    videos?: any[];
    uploadedPhotos?: {
        name?: string;
        url?: string;
    }[];
    uploadedVideos?: {
        name?: string;
        url?: string;
    }[];
}, {
    charterType?: string;
    state?: string;
    city?: string;
    startingPoint?: string;
    postcode?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
    tone?: "friendly" | "adventurous" | "professional";
    boat?: {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
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
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }[];
    operator?: {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    };
    charterName?: string;
    placeId?: string;
    generatedDescription?: string;
    withoutBoat?: boolean;
    photos?: any[];
    videos?: any[];
    uploadedPhotos?: {
        name?: string;
        url?: string;
    }[];
    uploadedVideos?: {
        name?: string;
        url?: string;
    }[];
}>;
export type CharterFormValues = z.infer<typeof charterFormSchema>;
export declare const basicsStepSchema: z.ZodObject<Pick<{
    operator: z.ZodObject<{
        displayName: z.ZodString;
        experienceYears: z.ZodNumber;
        bio: z.ZodString;
        phone: z.ZodString;
        backupPhone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        avatar: z.ZodOptional<z.ZodEffects<z.ZodAny, any, any>>;
        avatarUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    }, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    }>;
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
    tone: z.ZodDefault<z.ZodEnum<["friendly", "adventurous", "professional"]>>;
    withoutBoat: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    boat: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        lengthFeet: z.ZodOptional<z.ZodNumber>;
        capacity: z.ZodOptional<z.ZodNumber>;
        features: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
    }, {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
    }>;
    amenities: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    policies: z.ZodObject<{
        licenseProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndKeep: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndRelease: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        childFriendly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        liveBaitProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        alcoholNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        smokingNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
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
    }>;
    pickup: z.ZodEffects<z.ZodObject<{
        available: z.ZodBoolean;
        fee: z.ZodNullable<z.ZodNumber>;
        areas: z.ZodArray<z.ZodString, "many">;
        notes: z.ZodOptional<z.ZodString>;
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
    }>, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }>;
    trips: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        tripType: z.ZodString;
        price: z.ZodNumber;
        promoPrice: z.ZodOptional<z.ZodNumber>;
        durationHours: z.ZodNumber;
        startTimes: z.ZodArray<z.ZodString, "many">;
        maxAnglers: z.ZodNumber;
        charterStyle: z.ZodEnum<["private", "shared"]>;
        description: z.ZodOptional<z.ZodString>;
        species: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        techniques: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }, {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }>, "many">;
    photos: z.ZodArray<z.ZodEffects<z.ZodAny, any, any>, "many">;
    videos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodAny, any, any>, "many">>>;
    uploadedPhotos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        url?: string;
    }, {
        name?: string;
        url?: string;
    }>, "many">>>;
    uploadedVideos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        url?: string;
    }, {
        name?: string;
        url?: string;
    }>, "many">>>;
}, "charterType" | "state" | "city" | "startingPoint" | "postcode" | "latitude" | "longitude" | "operator" | "charterName">, "strip", z.ZodTypeAny, {
    charterType?: string;
    state?: string;
    city?: string;
    startingPoint?: string;
    postcode?: string;
    latitude?: number;
    longitude?: number;
    operator?: {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    };
    charterName?: string;
}, {
    charterType?: string;
    state?: string;
    city?: string;
    startingPoint?: string;
    postcode?: string;
    latitude?: number;
    longitude?: number;
    operator?: {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    };
    charterName?: string;
}>;
export declare const experienceStepSchema: z.ZodObject<Pick<{
    operator: z.ZodObject<{
        displayName: z.ZodString;
        experienceYears: z.ZodNumber;
        bio: z.ZodString;
        phone: z.ZodString;
        backupPhone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        avatar: z.ZodOptional<z.ZodEffects<z.ZodAny, any, any>>;
        avatarUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    }, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    }>;
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
    tone: z.ZodDefault<z.ZodEnum<["friendly", "adventurous", "professional"]>>;
    withoutBoat: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    boat: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        lengthFeet: z.ZodOptional<z.ZodNumber>;
        capacity: z.ZodOptional<z.ZodNumber>;
        features: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
    }, {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
    }>;
    amenities: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    policies: z.ZodObject<{
        licenseProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndKeep: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndRelease: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        childFriendly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        liveBaitProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        alcoholNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        smokingNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
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
    }>;
    pickup: z.ZodEffects<z.ZodObject<{
        available: z.ZodBoolean;
        fee: z.ZodNullable<z.ZodNumber>;
        areas: z.ZodArray<z.ZodString, "many">;
        notes: z.ZodOptional<z.ZodString>;
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
    }>, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }>;
    trips: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        tripType: z.ZodString;
        price: z.ZodNumber;
        promoPrice: z.ZodOptional<z.ZodNumber>;
        durationHours: z.ZodNumber;
        startTimes: z.ZodArray<z.ZodString, "many">;
        maxAnglers: z.ZodNumber;
        charterStyle: z.ZodEnum<["private", "shared"]>;
        description: z.ZodOptional<z.ZodString>;
        species: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        techniques: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }, {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }>, "many">;
    photos: z.ZodArray<z.ZodEffects<z.ZodAny, any, any>, "many">;
    videos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodAny, any, any>, "many">>>;
    uploadedPhotos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        url?: string;
    }, {
        name?: string;
        url?: string;
    }>, "many">>>;
    uploadedVideos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        url?: string;
    }, {
        name?: string;
        url?: string;
    }>, "many">>>;
}, "boat" | "amenities" | "policies" | "pickup">, "strip", z.ZodTypeAny, {
    boat?: {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
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
}, {
    boat?: {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
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
}>;
export declare const tripsStepSchema: z.ZodObject<Pick<{
    operator: z.ZodObject<{
        displayName: z.ZodString;
        experienceYears: z.ZodNumber;
        bio: z.ZodString;
        phone: z.ZodString;
        backupPhone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        avatar: z.ZodOptional<z.ZodEffects<z.ZodAny, any, any>>;
        avatarUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    }, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    }>;
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
    tone: z.ZodDefault<z.ZodEnum<["friendly", "adventurous", "professional"]>>;
    withoutBoat: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    boat: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        lengthFeet: z.ZodOptional<z.ZodNumber>;
        capacity: z.ZodOptional<z.ZodNumber>;
        features: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
    }, {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
    }>;
    amenities: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    policies: z.ZodObject<{
        licenseProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndKeep: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndRelease: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        childFriendly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        liveBaitProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        alcoholNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        smokingNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
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
    }>;
    pickup: z.ZodEffects<z.ZodObject<{
        available: z.ZodBoolean;
        fee: z.ZodNullable<z.ZodNumber>;
        areas: z.ZodArray<z.ZodString, "many">;
        notes: z.ZodOptional<z.ZodString>;
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
    }>, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }>;
    trips: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        tripType: z.ZodString;
        price: z.ZodNumber;
        promoPrice: z.ZodOptional<z.ZodNumber>;
        durationHours: z.ZodNumber;
        startTimes: z.ZodArray<z.ZodString, "many">;
        maxAnglers: z.ZodNumber;
        charterStyle: z.ZodEnum<["private", "shared"]>;
        description: z.ZodOptional<z.ZodString>;
        species: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        techniques: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }, {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }>, "many">;
    photos: z.ZodArray<z.ZodEffects<z.ZodAny, any, any>, "many">;
    videos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodAny, any, any>, "many">>>;
    uploadedPhotos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        url?: string;
    }, {
        name?: string;
        url?: string;
    }>, "many">>>;
    uploadedVideos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        url?: string;
    }, {
        name?: string;
        url?: string;
    }>, "many">>>;
}, "trips">, "strip", z.ZodTypeAny, {
    trips?: {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }[];
}, {
    trips?: {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }[];
}>;
export declare const mediaPricingStepSchema: z.ZodObject<Pick<{
    operator: z.ZodObject<{
        displayName: z.ZodString;
        experienceYears: z.ZodNumber;
        bio: z.ZodString;
        phone: z.ZodString;
        backupPhone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        avatar: z.ZodOptional<z.ZodEffects<z.ZodAny, any, any>>;
        avatarUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    }, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    }>;
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
    tone: z.ZodDefault<z.ZodEnum<["friendly", "adventurous", "professional"]>>;
    withoutBoat: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    boat: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        lengthFeet: z.ZodOptional<z.ZodNumber>;
        capacity: z.ZodOptional<z.ZodNumber>;
        features: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
    }, {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
    }>;
    amenities: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    policies: z.ZodObject<{
        licenseProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndKeep: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndRelease: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        childFriendly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        liveBaitProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        alcoholNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        smokingNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
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
    }>;
    pickup: z.ZodEffects<z.ZodObject<{
        available: z.ZodBoolean;
        fee: z.ZodNullable<z.ZodNumber>;
        areas: z.ZodArray<z.ZodString, "many">;
        notes: z.ZodOptional<z.ZodString>;
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
    }>, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }>;
    trips: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        tripType: z.ZodString;
        price: z.ZodNumber;
        promoPrice: z.ZodOptional<z.ZodNumber>;
        durationHours: z.ZodNumber;
        startTimes: z.ZodArray<z.ZodString, "many">;
        maxAnglers: z.ZodNumber;
        charterStyle: z.ZodEnum<["private", "shared"]>;
        description: z.ZodOptional<z.ZodString>;
        species: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        techniques: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }, {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }>, "many">;
    photos: z.ZodArray<z.ZodEffects<z.ZodAny, any, any>, "many">;
    videos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodAny, any, any>, "many">>>;
    uploadedPhotos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        url?: string;
    }, {
        name?: string;
        url?: string;
    }>, "many">>>;
    uploadedVideos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        url?: string;
    }, {
        name?: string;
        url?: string;
    }>, "many">>>;
}, "photos" | "videos">, "strip", z.ZodTypeAny, {
    photos?: any[];
    videos?: any[];
}, {
    photos?: any[];
    videos?: any[];
}>;
export declare const descriptionStepSchema: z.ZodObject<Pick<{
    operator: z.ZodObject<{
        displayName: z.ZodString;
        experienceYears: z.ZodNumber;
        bio: z.ZodString;
        phone: z.ZodString;
        backupPhone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        avatar: z.ZodOptional<z.ZodEffects<z.ZodAny, any, any>>;
        avatarUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    }, {
        displayName?: string;
        phone?: string;
        bio?: string;
        experienceYears?: number;
        backupPhone?: string;
        avatar?: any;
        avatarUrl?: string;
    }>;
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
    tone: z.ZodDefault<z.ZodEnum<["friendly", "adventurous", "professional"]>>;
    withoutBoat: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    boat: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        lengthFeet: z.ZodOptional<z.ZodNumber>;
        capacity: z.ZodOptional<z.ZodNumber>;
        features: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
    }, {
        name?: string;
        type?: string;
        capacity?: number;
        features?: string[];
        lengthFeet?: number;
    }>;
    amenities: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    policies: z.ZodObject<{
        licenseProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndKeep: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndRelease: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        childFriendly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        liveBaitProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        alcoholNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        smokingNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
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
    }>;
    pickup: z.ZodEffects<z.ZodObject<{
        available: z.ZodBoolean;
        fee: z.ZodNullable<z.ZodNumber>;
        areas: z.ZodArray<z.ZodString, "many">;
        notes: z.ZodOptional<z.ZodString>;
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
    }>, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }, {
        available?: boolean;
        fee?: number;
        notes?: string;
        areas?: string[];
    }>;
    trips: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        tripType: z.ZodString;
        price: z.ZodNumber;
        promoPrice: z.ZodOptional<z.ZodNumber>;
        durationHours: z.ZodNumber;
        startTimes: z.ZodArray<z.ZodString, "many">;
        maxAnglers: z.ZodNumber;
        charterStyle: z.ZodEnum<["private", "shared"]>;
        description: z.ZodOptional<z.ZodString>;
        species: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        techniques: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }, {
        name?: string;
        description?: string;
        tripType?: string;
        price?: number;
        durationHours?: number;
        maxAnglers?: number;
        startTimes?: string[];
        species?: string[];
        techniques?: string[];
        promoPrice?: number;
        charterStyle?: "private" | "shared";
    }>, "many">;
    photos: z.ZodArray<z.ZodEffects<z.ZodAny, any, any>, "many">;
    videos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodAny, any, any>, "many">>>;
    uploadedPhotos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        url?: string;
    }, {
        name?: string;
        url?: string;
    }>, "many">>>;
    uploadedVideos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        url?: string;
    }, {
        name?: string;
        url?: string;
    }>, "many">>>;
}, "description" | "tone" | "generatedDescription">, "strip", z.ZodTypeAny, {
    description?: string;
    tone?: "friendly" | "adventurous" | "professional";
    generatedDescription?: string;
}, {
    description?: string;
    tone?: "friendly" | "adventurous" | "professional";
    generatedDescription?: string;
}>;
