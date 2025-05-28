import type { FarmProps } from "../../../domain/interface/farm/farm.interface";
import type { Replace } from "../../../helpers/Replace";

export class Farm {
  private props: FarmProps;

  constructor(
    props: Replace<FarmProps, { createdAt?: Date, }>
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public get cpfCnpj(): string {
    return this.props.cpfCnpj;
  }

  public set cpfCnpj(cpfCnpj: string) {
    this.props.cpfCnpj = cpfCnpj;
  }

  public get producerName(): string {
    return this.props.producerName;
  }

  public set producerName(producerName: string) {
    this.props.producerName = producerName;
  }

  public get farmName(): string {
    return this.props.farmName;
  }

  public set farmName(farmName: string) {
    this.props.farmName = farmName;
  }

  public get city(): string {
    return this.props.city;
  }

  public set city(city: string) {
    this.props.city = city;
  }

  public get state(): string {
    return this.props.state;
  }

  public set state(state: string) {
    this.props.state = state;
  }

  public get totalAreaHa(): number {
    return this.props.totalAreaHa;
  }

  public set totalAreaHa(totalAreaHa: number) {
    this.props.totalAreaHa = totalAreaHa;
  }

  public get arableAreaHa(): number {
    return this.props.arableAreaHa;
  }

  public set arableAreaHa(arableAreaHa: number) {
    this.props.arableAreaHa = arableAreaHa;
  }

  public get vegetationAreaHa(): number {
    return this.props.vegetationAreaHa;
  }

  public set vegetationAreaHa(vegetationAreaHa: number) {
    this.props.vegetationAreaHa = vegetationAreaHa;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt ?? new Date();
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}
