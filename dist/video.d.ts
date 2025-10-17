import { z } from "zod";
/**
 * Video processing status enum
 * Tracks the lifecycle of a video from queue to ready/failed state
 */
export declare const ProcessStatusEnum: z.ZodEnum<["queued", "processing", "ready", "failed"]>;
export type ProcessStatus = z.infer<typeof ProcessStatusEnum>;
/**
 * Schema for creating a new video upload
 * Used when initiating a video upload flow
 *
 * Note: Mobile devices may not set proper MIME types, so we accept:
 * - video/* MIME types
 * - Empty strings (will validate by file extension)
 * - application/octet-stream (generic fallback used by some mobile browsers)
 */
export declare const CreateUploadSchema: z.ZodObject<{
    fileName: z.ZodString;
    fileType: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    fileName?: string;
    fileType?: string;
}, {
    fileName?: string;
    fileType?: string;
}>;
/**
 * Schema for finishing/finalizing a video upload
 * Includes trim metadata and processing details
 */
export declare const FinishFormSchema: z.ZodObject<{
    videoUrl: z.ZodString;
    startSec: z.ZodNumber;
    endSec: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    originalDurationSec: z.ZodOptional<z.ZodNumber>;
    ownerId: z.ZodString;
    didFallback: z.ZodOptional<z.ZodBoolean>;
    fallbackReason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    width?: number;
    height?: number;
    videoUrl?: string;
    startSec?: number;
    endSec?: number;
    originalDurationSec?: number;
    ownerId?: string;
    didFallback?: boolean;
    fallbackReason?: string;
}, {
    width?: number;
    height?: number;
    videoUrl?: string;
    startSec?: number;
    endSec?: number;
    originalDurationSec?: number;
    ownerId?: string;
    didFallback?: boolean;
    fallbackReason?: string;
}>;
/**
 * Schema for video transcoding payload sent to worker
 */
export declare const TranscodePayloadSchema: z.ZodObject<{
    videoUrl: z.ZodString;
    startSec: z.ZodNumber;
    videoId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    videoUrl?: string;
    startSec?: number;
    videoId?: string;
}, {
    videoUrl?: string;
    startSec?: number;
    videoId?: string;
}>;
/**
 * Schema for listing videos by owner
 */
export declare const ListQuerySchema: z.ZodObject<{
    ownerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ownerId?: string;
}, {
    ownerId?: string;
}>;
/**
 * Validate thumbnail file constraints
 * @param file - File to validate
 * @returns true if valid, false otherwise
 */
export declare function validateThumbFile(file: File): boolean;
/**
 * Validate video file type
 * Mobile-friendly validation that checks both MIME type and file extension
 *
 * @param file - File to validate
 * @returns true if valid video file, false otherwise
 *
 * @remarks
 * Mobile devices (especially iOS) may not set proper MIME types or may use:
 * - Empty string
 * - "application/octet-stream"
 * - Incorrect MIME types (e.g., "audio/mpeg" for .mp4 files)
 * - Unexpected video MIME types like "video/quicktime" for .mov files
 *
 * Strategy:
 * 1. If MIME type is video/*, accept immediately (most reliable case)
 * 2. Always check file extension as fallback (handles empty/wrong/generic MIME types)
 *
 * This intentionally allows files with wrong MIME types if they have valid video extensions,
 * as mobile browsers frequently misreport MIME types.
 */
export declare function isValidVideoFile(file: File): boolean;
