/**
 * Consolidated schema and type definitions
 *
 * This folder contains all runtime validators (Zod), TypeScript types/interfaces,
 * DTOs representing API payloads/events, and event contract shapes used across
 * the fishon-captain repository.
 *
 * **Purpose:**
 * Temporary consolidation of all schemas before extraction into a shared package
 * `@fishon/schemas` that can be used across multiple FishOn services.
 *
 * **Usage:**
 * Import schemas and types from this barrel export:
 * ```typescript
 * import { CharterFormValues, charterFormSchema } from '@/schemas';
 * import { VideoUploadStatus, ProcessStatusEnum } from '@/schemas';
 * ```
 *
 * **Next Steps:**
 * 1. Extract these schemas into `@fishon/schemas` package
 * 2. Publish as npm package
 * 3. Update imports across services
 *
 * **Important:**
 * All exported names are preserved from their original locations to maintain
 * backward compatibility. Do not rename exports without coordinating with
 * consuming code.
 */

// Charter schemas
export {
  basicsStepSchema,
  charterFormSchema,
  descriptionStepSchema,
  experienceStepSchema,
  mediaPricingStepSchema,
  policiesSchema,
  tripSchema,
  tripsStepSchema,
  type CharterFormValues,
} from "./charter";

// Charter update schemas (API)
export { CharterUpdateSchema } from "./charter-update";

// Draft schemas
export { DraftPatchSchema } from "./draft";

// Media schemas
export {
  FinalizeMediaSchema,
  IncomingMediaSchema,
  MediaFileSchema,
  MediaRemovalSchema,
  normalizeFinalizeMedia,
  VideoThumbnailSchema,
  type NormalizedFinalizeMedia,
} from "./media";

// Video schemas
export {
  CreateUploadSchema,
  FinishFormSchema,
  isValidVideoFile,
  ListQuerySchema,
  ProcessStatusEnum,
  TranscodePayloadSchema,
  validateThumbFile,
  type ProcessStatus,
} from "./video";

// Video upload types
export {
  defaultRetryPolicy,
  defaultVideoQueueConfig,
  isActiveUpload,
  isTerminalUpload,
  type CanceledUploadItem,
  type DoneUploadItem,
  type ErrorDetails,
  type ErrorUploadItem,
  type PendingUploadItem,
  type ProcessingUploadItem,
  type ProgressDetails,
  type QueueAnalytics,
  type QueuePriority,
  type RetryPolicy,
  type UploadingUploadItem,
  type VideoQueueConfig,
  type VideoUploadItem,
  type VideoUploadStatus,
} from "./video-upload-types";
