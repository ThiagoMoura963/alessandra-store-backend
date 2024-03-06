export class ListProductDto {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly categoryId: number,
    readonly price: number,
  ) {}
}
