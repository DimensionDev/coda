export interface ICodec {
  encode(input: Uint8Array): string
  decode(input: string): Uint8Array
}
