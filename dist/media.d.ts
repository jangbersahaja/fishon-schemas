import { z } from "zod";
/**
 * Media file schema - Generic media file (image or video)
 * Used for finalize media payload validation
 */
export declare const MediaFileSchema: z.ZodObject<{
    name: z.ZodEffects<z.ZodString, string, string>;
    url: z.ZodString;
    mimeType: z.ZodOptional<z.ZodString>;
    sizeBytes: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    url?: string;
    mimeType?: string;
    sizeBytes?: number;
    width?: number;
    height?: number;
}, {
    name?: string;
    url?: string;
    mimeType?: string;
    sizeBytes?: number;
    width?: number;
    height?: number;
}>;
/**
 * Finalize media schema - Used when finalizing charter with media
 * Includes images, videos, ordering, and cover indices
 */
export declare const FinalizeMediaSchema: z.ZodObject<{
    media: z.ZodObject<{
        images: z.ZodArray<z.ZodObject<{
            name: z.ZodEffects<z.ZodString, string, string>;
            url: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            sizeBytes: z.ZodOptional<z.ZodNumber>;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }, {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }>, "many">;
        videos: z.ZodArray<z.ZodObject<{
            name: z.ZodEffects<z.ZodString, string, string>;
            url: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            sizeBytes: z.ZodOptional<z.ZodNumber>;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }, {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }>, "many">;
        imagesOrder: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        videosOrder: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        imagesCoverIndex: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        videosCoverIndex: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        avatar: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            name: z.ZodEffects<z.ZodString, string, string>;
            url: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            sizeBytes: z.ZodOptional<z.ZodNumber>;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }, {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        avatar?: {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        };
        videos?: {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }[];
        images?: {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }[];
        imagesOrder?: number[];
        videosOrder?: number[];
        imagesCoverIndex?: number;
        videosCoverIndex?: number;
    }, {
        avatar?: {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        };
        videos?: {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }[];
        images?: {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }[];
        imagesOrder?: number[];
        videosOrder?: number[];
        imagesCoverIndex?: number;
        videosCoverIndex?: number;
    }>;
}, "strip", z.ZodTypeAny, {
    media?: {
        avatar?: {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        };
        videos?: {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }[];
        images?: {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }[];
        imagesOrder?: number[];
        videosOrder?: number[];
        imagesCoverIndex?: number;
        videosCoverIndex?: number;
    };
}, {
    media?: {
        avatar?: {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        };
        videos?: {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }[];
        images?: {
            name?: string;
            url?: string;
            mimeType?: string;
            sizeBytes?: number;
            width?: number;
            height?: number;
        }[];
        imagesOrder?: number[];
        videosOrder?: number[];
        imagesCoverIndex?: number;
        videosCoverIndex?: number;
    };
}>;
/**
 * Normalized finalize media interface
 * Simplified shape consumed by charter creation logic
 */
export interface NormalizedFinalizeMedia {
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
export declare function normalizeFinalizeMedia(raw: unknown): NormalizedFinalizeMedia | null;
/**
 * Schema for incoming media update (edit mode)
 * Used when updating charter media in edit mode
 */
export declare const IncomingMediaSchema: z.ZodObject<{
    media: z.ZodObject<{
        images: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            thumbnailUrl: z.ZodOptional<z.ZodString>;
            durationSeconds: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name?: string;
            url?: string;
            thumbnailUrl?: string;
            durationSeconds?: number;
        }, {
            name?: string;
            url?: string;
            thumbnailUrl?: string;
            durationSeconds?: number;
        }>, "many">;
        videos: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            thumbnailUrl: z.ZodOptional<z.ZodString>;
            durationSeconds: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name?: string;
            url?: string;
            thumbnailUrl?: string;
            durationSeconds?: number;
        }, {
            name?: string;
            url?: string;
            thumbnailUrl?: string;
            durationSeconds?: number;
        }>, "many">;
        deleteKeys: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        videos?: {
            name?: string;
            url?: string;
            thumbnailUrl?: string;
            durationSeconds?: number;
        }[];
        images?: {
            name?: string;
            url?: string;
            thumbnailUrl?: string;
            durationSeconds?: number;
        }[];
        deleteKeys?: string[];
    }, {
        videos?: {
            name?: string;
            url?: string;
            thumbnailUrl?: string;
            durationSeconds?: number;
        }[];
        images?: {
            name?: string;
            url?: string;
            thumbnailUrl?: string;
            durationSeconds?: number;
        }[];
        deleteKeys?: string[];
    }>;
    deleteKeys: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    order: z.ZodOptional<z.ZodObject<{
        images: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        videos: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    }, "strip", z.ZodTypeAny, {
        videos?: number[];
        images?: number[];
    }, {
        videos?: number[];
        images?: number[];
    }>>;
}, "strip", z.ZodTypeAny, {
    media?: {
        videos?: {
            name?: string;
            url?: string;
            thumbnailUrl?: string;
            durationSeconds?: number;
        }[];
        images?: {
            name?: string;
            url?: string;
            thumbnailUrl?: string;
            durationSeconds?: number;
        }[];
        deleteKeys?: string[];
    };
    deleteKeys?: string[];
    order?: {
        videos?: number[];
        images?: number[];
    };
}, {
    media?: {
        videos?: {
            name?: string;
            url?: string;
            thumbnailUrl?: string;
            durationSeconds?: number;
        }[];
        images?: {
            name?: string;
            url?: string;
            thumbnailUrl?: string;
            durationSeconds?: number;
        }[];
        deleteKeys?: string[];
    };
    deleteKeys?: string[];
    order?: {
        videos?: number[];
        images?: number[];
    };
}>;
/**
 * Schema for media removal request
 */
export declare const MediaRemovalSchema: z.ZodObject<{
    mediaId: z.ZodOptional<z.ZodString>;
    storageKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    mediaId?: string;
    storageKey?: string;
}, {
    mediaId?: string;
    storageKey?: string;
}>;
/**
 * Schema for video thumbnail upload
 * Used when uploading a custom thumbnail for a video
 */
export declare const VideoThumbnailSchema: z.ZodObject<{
    storageKey: z.ZodString;
    dataUrl: z.ZodEffects<z.ZodString, string, string>;
    durationSeconds: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    durationSeconds?: number;
    storageKey?: string;
    dataUrl?: string;
}, {
    durationSeconds?: number;
    storageKey?: string;
    dataUrl?: string;
}>;
