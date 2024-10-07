export type ReturnValue =
    | {
          success: true
      }
    | {
          success: false
          error: string
      }

export type ReturnValueWithData<T> =
    | {
          success: true
          data: T
      }
    | {
          success: false
          error: string
      }
