export interface TMDB_PagedRespose<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface TMDB_Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TMDB_Error {
  status_code: TMDB_Error_Code
  status_message: string
  success: boolean
}

export enum TMDB_Error_Code {
  /**
   * 1 - Success.
   */
  Success = 1,
  /**
   * 2 - Invalid service: this service does not exist.
   */
  InvalidService = 2,
  /**
   * 3 - Authentication failed: You do not have permissions to access the service.
   */
  AuthenticationFailed = 3,
  /**
   * 4 - Invalid format: This service doesn't exist in that format.
   */
  InvalidFormat = 4,
  /**
   * 5 - Invalid parameters: Your request parameters are incorrect.
   */
  InvalidParameters = 5,
  /**
   * 6 - Invalid id: The pre-requisite id is invalid or not found.
   */
  InvalidPreReqId = 6,
  /**
   * 7 - Invalid API key: You must be granted a valid key.
   */
  InvalidApiKey = 7,
  /**
   * 8 - Duplicate entry: The data you tried to submit already exists.
   */
  DuplicateEntry = 8,
  /**
   * 9 - Service offline: This service is temporarily offline, try again later.
   */
  ServiceOffline = 9,
  /**
   * 10 - Suspended API key: Access to your account has been suspended, contact TMDB.
   */
  SuspendedApiKey = 10,
  /**
   * 11 - Internal error: Something went wrong, contact TMDB.
   */
  InternalError = 11,
  /**
   * 12 - The item/record was updated successfully.
   */
  RecordUpdated = 12,
  /**
   * 13 - The item/record was deleted successfully.
   */
  RecordDeleted = 13,
  /**
   * 14 - Authentication failed.
   */
  AuthenticationFailedAgain = 14,
  /**
   * 15 - Failed.
   */
  Failed = 15,
  /**
   * 16 - Device denied.
   */
  DeviceDenied = 16,
  /**
   * 17 - Session denied.
   */
  SessionDenied = 17,
  /**
   * 18 - Validation failed.
   */
  ValidationFailed = 18,
  /**
   * 19 - Invalid accept header.
   */
  InvalidAcceptHeader = 19,
  /**
   * 20 - Invalid date range: Should be a range no longer than 14 days.
   */
  InvalidDateRange = 20,
  /**
   * 21 - Entry not found: The item you are trying to edit cannot be found.
   */
  EntryNotFound = 21,
  /**
   * 22 - Invalid page: Pages start at 1 and max at 500. They are expected to be an integer.
   */
  InvalidPage = 22,
  /**
   * 23 - Invalid date: Format needs to be YYYY-MM-DD.
   */
  InvalidDate = 23,
  /**
   * 24 - Your request to the backend server timed out. Try again.
   */
  RequestTimedOut = 24,
  /**
   * 25 - Your request count (#) is over the allowed limit of (40).
   */
  RequestCountLimitExceeded = 25,
  /**
   * 26 - You must provide a username and password.
   */
  MissingUsernameAndPassword = 26,
  /**
   * 27 - Too many append to response objects: The maximum number of remote calls is 20.
   */
  TooManyAppends = 27,
  /**
   * 28 - Invalid timezone: Please consult the documentation for a valid timezone.
   */
  InvalidTimeZone = 28,
  /**
   * 29 - You must confirm this action: Please provide a confirm=true parameter.
   */
  MissingConfirmParameter = 29,
  /**
   * 30 - Invalid username and/or password: You did not provide a valid login.
   */
  InvalidUsernameAndPassword = 30,
  /**
   * 31 - Account disabled: Your account is no longer active. Contact TMDB if this is an error.
   */
  AccountDisabled = 31,
  /**
   * 32 - Email not verified: Your email address has not been verified.
   */
  EmailNotVerified = 32,
  /**
   * 33 - Invalid request token: The request token is either expired or invalid.
   */
  InvalidRequestToken = 33,
  /**
   * 34 - The resource you requested could not be found.
   */
  ResourceNotFound = 34,
  /**
   * 35 - Invalid token.
   */
  InvalidToken = 35,
  /**
   * 36 - This token hasn't been granted write permission by the user.
   */
  TokenNotGrantedWritePermission = 36,
  /**
   * 37 - The requested session could not be found.
   */
  SessionNotFound = 37,
  /**
   * 38 - You don't have permission to edit this resource.
   */
  PermissionDenied = 38,
  /**
   * 39 - This resource is private.
   */
  ResourceIsPrivate = 39,
  /**
   * 40 - Nothing to update.
   */
  NothingToUpdate = 40,
  /**
   * 41 - This request token hasn't been approved by the user.
   */
  RequestTokenNotApproved = 41,
  /**
   * 42 - This request method is not supported for this resource.
   */
  RequestMethodNotSupported = 42,
  /**
   * 43 - Could not connect to the backend server.
   */
  CouldNotConnectToBackendServer = 43,
  /**
   * 44 - The ID is invalid.
   */
  InvalidId = 44,
  /**
   * 45 - This user has been suspended.
   */
  UserSuspended = 45,
  /**
   * 46 - The API is undergoing maintenance. Try again later.
   */
  ApiUnderMaintenance = 46,
  /**
   * 47 - The input is not valid.
   */
  InvalidInput = 47,

}
