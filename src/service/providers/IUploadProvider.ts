export default interface IUploadProvaider {
  uploadImage: (file: any) => Promise<string>
  deleteImage: (urlOfImage: string) => Promise<void>
}
