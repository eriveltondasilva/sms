export type VisitOptions = {
  onBefore?: (visit?: any) => void
  onCancel?: () => void
  onCancelToken?: (cancelToken: any) => void
  onError?: (errors?: any) => void
  onFinish?: (visit?: any) => void
  onProgress?: (progress?: any) => void
  onStart?: (visit?: any) => void
  onSuccess?: (page?: any) => void
}
