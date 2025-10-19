import { z } from 'zod';

/**
 * Trip schema - represents a fishing trip offering
 */
declare const tripSchema: z.ZodObject<{
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
declare const policiesSchema: z.ZodObject<{
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
declare const charterFormSchema: z.ZodObject<{
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
type CharterFormValues = z.infer<typeof charterFormSchema>;
declare const basicsStepSchema: z.ZodObject<{
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
    postcode: z.ZodString;
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
}, z.core.$strip>;
declare const experienceStepSchema: z.ZodObject<{
    policies: z.ZodObject<{
        licenseProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndKeep: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        catchAndRelease: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        childFriendly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        liveBaitProvided: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        alcoholNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        smokingNotAllowed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, z.core.$strip>;
    boat: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        lengthFeet: z.ZodOptional<z.ZodNumber>;
        capacity: z.ZodOptional<z.ZodNumber>;
        features: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    }, z.core.$strip>;
    amenities: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>>;
    pickup: z.ZodObject<{
        available: z.ZodBoolean;
        fee: z.ZodNullable<z.ZodNumber>;
        areas: z.ZodArray<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const tripsStepSchema: z.ZodObject<{
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
declare const mediaPricingStepSchema: z.ZodObject<{
    photos: z.ZodArray<z.ZodAny>;
    videos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodAny>>>;
}, z.core.$strip>;
declare const descriptionStepSchema: z.ZodObject<{
    description: z.ZodString;
    generatedDescription: z.ZodOptional<z.ZodString>;
    tone: z.ZodDefault<z.ZodEnum<{
        friendly: "friendly";
        adventurous: "adventurous";
        professional: "professional";
    }>>;
}, z.core.$strip>;

/**
 * Schema for partial charter update (edit mode save)
 * Used in PATCH /api/charters/[id] route
 */
declare const CharterUpdateSchema: z.ZodObject<{
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
        backupPhone: z.ZodOptional<z.ZodString>;
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
        promoPrice: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
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

/**
 * Schema for draft patch payload (server-side validation)
 * Used when updating a charter draft with partial data
 */
declare const DraftPatchSchema: z.ZodObject<{
    dataPartial: z.ZodAny;
    clientVersion: z.ZodNumber;
    currentStep: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;

/**
 * Media file schema - Generic media file (image or video)
 * Used for finalize media payload validation
 */
declare const MediaFileSchema: z.ZodObject<{
    name: z.ZodString;
    url: z.ZodString;
    mimeType: z.ZodOptional<z.ZodString>;
    sizeBytes: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Finalize media schema - Used when finalizing charter with media
 * Includes images, videos, ordering, and cover indices
 */
declare const FinalizeMediaSchema: z.ZodObject<{
    media: z.ZodObject<{
        images: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            sizeBytes: z.ZodOptional<z.ZodNumber>;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        videos: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            sizeBytes: z.ZodOptional<z.ZodNumber>;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        imagesOrder: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
        videosOrder: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
        imagesCoverIndex: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        videosCoverIndex: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        avatar: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            sizeBytes: z.ZodOptional<z.ZodNumber>;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Normalized finalize media interface
 * Simplified shape consumed by charter creation logic
 */
interface NormalizedFinalizeMedia {
    images: {
        name: string;
        url: string;
    }[];
    videos: {
        name: string;
        url: string;
    }[];
    imagesOrder?: number[];
    videosOrder?: number[];
    imagesCoverIndex?: number;
    videosCoverIndex?: number;
    avatar: {
        name: string;
        url: string;
    } | null;
}
/**
 * Normalize finalize media payload
 * Extracts and validates media data from raw payload
 */
declare function normalizeFinalizeMedia(raw: unknown): NormalizedFinalizeMedia | null;
/**
 * Schema for incoming media update (edit mode)
 * Used when updating charter media in edit mode
 */
declare const IncomingMediaSchema: z.ZodObject<{
    media: z.ZodObject<{
        images: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            thumbnailUrl: z.ZodOptional<z.ZodString>;
            durationSeconds: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        videos: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            thumbnailUrl: z.ZodOptional<z.ZodString>;
            durationSeconds: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        deleteKeys: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>;
    deleteKeys: z.ZodOptional<z.ZodArray<z.ZodString>>;
    order: z.ZodOptional<z.ZodObject<{
        images: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
        videos: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema for media removal request
 */
declare const MediaRemovalSchema: z.ZodObject<{
    mediaId: z.ZodOptional<z.ZodString>;
    storageKey: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Schema for video thumbnail upload
 * Used when uploading a custom thumbnail for a video
 */
declare const VideoThumbnailSchema: z.ZodObject<{
    storageKey: z.ZodString;
    dataUrl: z.ZodString;
    durationSeconds: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;

/**
 * Video processing status enum
 * Tracks the lifecycle of a video from queue to ready/failed state
 */
declare const ProcessStatusEnum: z.ZodEnum<{
    queued: "queued";
    processing: "processing";
    ready: "ready";
    failed: "failed";
}>;
type ProcessStatus = z.infer<typeof ProcessStatusEnum>;
/**
 * Schema for creating a new video upload
 * Used when initiating a video upload flow
 *
 * Note: Mobile devices may not set proper MIME types, so we accept:
 * - video/* MIME types
 * - Empty strings (will validate by file extension)
 * - application/octet-stream (generic fallback used by some mobile browsers)
 */
declare const CreateUploadSchema: z.ZodObject<{
    fileName: z.ZodString;
    fileType: z.ZodString;
}, z.core.$strip>;
/**
 * Schema for finishing/finalizing a video upload
 * Includes trim metadata and processing details
 */
declare const FinishFormSchema: z.ZodObject<{
    videoUrl: z.ZodString;
    startSec: z.ZodNumber;
    endSec: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    originalDurationSec: z.ZodOptional<z.ZodNumber>;
    ownerId: z.ZodString;
    didFallback: z.ZodOptional<z.ZodBoolean>;
    fallbackReason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Schema for video transcoding payload sent to worker
 */
declare const TranscodePayloadSchema: z.ZodObject<{
    videoUrl: z.ZodString;
    startSec: z.ZodNumber;
    videoId: z.ZodString;
}, z.core.$strip>;
/**
 * Schema for listing videos by owner
 */
declare const ListQuerySchema: z.ZodObject<{
    ownerId: z.ZodString;
}, z.core.$strip>;
/**
 * Validate thumbnail file constraints
 * @param file - File to validate
 * @returns true if valid, false otherwise
 */
declare function validateThumbFile(file: File): boolean;

/**
 * Centralized video upload domain types
 * These types model the lifecycle of a short-form video upload within the new queue system.
 */
type VideoUploadStatus = "pending" | "uploading" | "processing" | "done" | "error" | "canceled";
type QueuePriority = "low" | "normal" | "high" | "urgent";
interface QueueAnalytics {
    totalItems: number;
    activeUploads: number;
    completedUploads: number;
    failedUploads: number;
    averageUploadTime: number;
    totalBytesUploaded: number;
    queueWaitTime: number;
}
interface BaseVideoUploadItem {
    id: string;
    file: File;
    sizeBytes: number;
    createdAt: number;
    progress: number;
    priority: QueuePriority;
    queuePosition?: number;
    trim?: {
        startSec: number;
        endSec: number;
        width?: number;
        height?: number;
        originalDurationSec?: number;
        didFallback?: boolean;
        fallbackReason?: string | null;
    };
}
interface PendingUploadItem extends BaseVideoUploadItem {
    status: "pending";
    progress: 0;
}
interface UploadingUploadItem extends BaseVideoUploadItem {
    status: "uploading";
    startedAt: number;
    progress: number;
    progressDetails?: ProgressDetails;
}
interface ProcessingUploadItem extends BaseVideoUploadItem {
    status: "processing";
    startedAt: number;
    uploadedAt: number;
    progress: number;
    blobKey: string;
    videoUrl: string;
    progressDetails?: ProgressDetails;
}
interface DoneUploadItem extends BaseVideoUploadItem {
    status: "done";
    startedAt: number;
    uploadedAt: number;
    completedAt: number;
    progress: 1;
    blobKey: string;
    videoUrl: string;
}
interface ErrorDetails {
    code: string;
    message: string;
    category: "network" | "server" | "client" | "validation";
    recoverable: boolean;
    retryAfter?: number;
    details?: Record<string, unknown>;
}
interface RetryPolicy {
    maxAttempts: number;
    baseDelayMs: number;
    maxDelayMs: number;
    backoffMultiplier: number;
    jitterEnabled: boolean;
}
interface ProgressDetails {
    phase: "uploading" | "processing" | "finalizing";
    bytesUploaded: number;
    totalBytes: number;
    transferSpeed?: number;
    estimatedTimeRemaining?: number;
    chunkProgress?: {
        completed: number;
        total: number;
    };
}
interface ErrorUploadItem extends BaseVideoUploadItem {
    status: "error";
    progress: number;
    startedAt?: number;
    uploadedAt?: number;
    blobKey?: string;
    videoUrl?: string;
    error: string;
    errorDetails?: ErrorDetails;
    retryCount?: number;
    lastRetryAt?: number;
}
interface CanceledUploadItem extends BaseVideoUploadItem {
    status: "canceled";
    progress: number;
    startedAt?: number;
    canceledAt: number;
}
type VideoUploadItem = PendingUploadItem | UploadingUploadItem | ProcessingUploadItem | DoneUploadItem | ErrorUploadItem | CanceledUploadItem;
interface VideoQueueConfig {
    maxConcurrent: number;
    captureThumbnail: boolean;
    autoStart: boolean;
    maxQueueSize: number;
    cleanupPolicy: {
        maxCompletedItems: number;
        maxFailedItems: number;
        autoCleanupAfterMs: number;
    };
    priorityWeights: {
        urgent: number;
        high: number;
        normal: number;
        low: number;
    };
    analytics: {
        enabled: boolean;
        sampleRate: number;
    };
    retryPolicy?: {
        maxAttempts: number;
        baseDelayMs: number;
        maxDelayMs: number;
        backoffMultiplier: number;
        jitterEnabled: boolean;
    };
    progressTracking?: {
        enableSpeedCalculation: boolean;
        speedSampleWindowMs: number;
        enableTimeEstimation: boolean;
    };
}
declare const defaultRetryPolicy: RetryPolicy;
declare const defaultVideoQueueConfig: VideoQueueConfig;
declare const isActiveUpload: (i: VideoUploadItem) => i is UploadingUploadItem | ProcessingUploadItem;
declare const isTerminalUpload: (i: VideoUploadItem) => i is DoneUploadItem | ErrorUploadItem | CanceledUploadItem;

export { type CanceledUploadItem, type CharterFormValues, CharterUpdateSchema, CreateUploadSchema, type DoneUploadItem, DraftPatchSchema, type ErrorDetails, type ErrorUploadItem, FinalizeMediaSchema, FinishFormSchema, IncomingMediaSchema, ListQuerySchema, MediaFileSchema, MediaRemovalSchema, type NormalizedFinalizeMedia, type PendingUploadItem, type ProcessStatus, ProcessStatusEnum, type ProcessingUploadItem, type ProgressDetails, type QueueAnalytics, type QueuePriority, type RetryPolicy, TranscodePayloadSchema, type UploadingUploadItem, type VideoQueueConfig, VideoThumbnailSchema, type VideoUploadItem, type VideoUploadStatus, basicsStepSchema, charterFormSchema, defaultRetryPolicy, defaultVideoQueueConfig, descriptionStepSchema, experienceStepSchema, isActiveUpload, isTerminalUpload, mediaPricingStepSchema, normalizeFinalizeMedia, policiesSchema, tripSchema, tripsStepSchema, validateThumbFile };
