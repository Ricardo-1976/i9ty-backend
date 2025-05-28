import type { CultureProps } from "../../../domain/interface/culture/culture.interface";

export class Culture {
  private props: CultureProps
  
  public get id(): number {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

}
