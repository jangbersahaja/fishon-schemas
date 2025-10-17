import { z } from "zod";
/**
 * Media file schema - Generic media file (image or video)
 * Used for finalize media payload validation
 */
export declare const MediaFileSchema: z.ZodObject<{
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
export declare const FinalizeMediaSchema: z.ZodObject<{
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
export declare const MediaRemovalSchema: z.ZodObject<{
    mediaId: z.ZodOptional<z.ZodString>;
    storageKey: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Schema for video thumbnail upload
 * Used when uploading a custom thumbnail for a video
 */
export declare const VideoThumbnailSchema: z.ZodObject<{
    storageKey: z.ZodString;
    dataUrl: z.ZodString;
    durationSeconds: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
