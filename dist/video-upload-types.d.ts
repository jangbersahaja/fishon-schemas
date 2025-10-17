/**
 * Centralized video upload domain types
 * These types model the lifecycle of a short-form video upload within the new queue system.
 */
export type VideoUploadStatus = "pending" | "uploading" | "processing" | "done" | "error" | "canceled";
export type QueuePriority = "low" | "normal" | "high" | "urgent";
export interface QueueAnalytics {
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
export interface PendingUploadItem extends BaseVideoUploadItem {
    status: "pending";
    progress: 0;
}
export interface UploadingUploadItem extends BaseVideoUploadItem {
    status: "uploading";
    startedAt: number;
    progress: number;
    progressDetails?: ProgressDetails;
}
export interface ProcessingUploadItem extends BaseVideoUploadItem {
    status: "processing";
    startedAt: number;
    uploadedAt: number;
    progress: number;
    blobKey: string;
    videoUrl: string;
    progressDetails?: ProgressDetails;
}
export interface DoneUploadItem extends BaseVideoUploadItem {
    status: "done";
    startedAt: number;
    uploadedAt: number;
    completedAt: number;
    progress: 1;
    blobKey: string;
    videoUrl: string;
}
export interface ErrorDetails {
    code: string;
    message: string;
    category: "network" | "server" | "client" | "validation";
    recoverable: boolean;
    retryAfter?: number;
    details?: Record<string, unknown>;
}
export interface RetryPolicy {
    maxAttempts: number;
    baseDelayMs: number;
    maxDelayMs: number;
    backoffMultiplier: number;
    jitterEnabled: boolean;
}
export interface ProgressDetails {
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
export interface ErrorUploadItem extends BaseVideoUploadItem {
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
export interface CanceledUploadItem extends BaseVideoUploadItem {
    status: "canceled";
    progress: number;
    startedAt?: number;
    canceledAt: number;
}
export type VideoUploadItem = PendingUploadItem | UploadingUploadItem | ProcessingUploadItem | DoneUploadItem | ErrorUploadItem | CanceledUploadItem;
export interface VideoQueueConfig {
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
export declare const defaultRetryPolicy: RetryPolicy;
export declare const defaultVideoQueueConfig: VideoQueueConfig;
export declare const isActiveUpload: (i: VideoUploadItem) => i is UploadingUploadItem | ProcessingUploadItem;
export declare const isTerminalUpload: (i: VideoUploadItem) => i is DoneUploadItem | ErrorUploadItem | CanceledUploadItem;
export {};
