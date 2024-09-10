export type VisitOptions = {
  onBefore?: (visit?: unknown) => void
  onCancel?: () => void
  onCancelToken?: (cancelToken: unknown) => void
  onError?: (errors?: unknown) => void
  onFinish?: (visit?: unknown) => void
  onProgress?: (progress?: unknown) => void
  onStart?: (visit?: unknown) => void
  onSuccess?: (page?: unknown) => void
}
