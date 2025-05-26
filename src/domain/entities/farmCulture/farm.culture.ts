import { FarmCultureProps } from '@/domain/interface/farmCulture/farm.culture.interface';
import { Replace } from '@/helpers/Replace';

export class FarmCulture {
    private readonly props: FarmCultureProps;
  
    constructor(
      props: Replace<FarmCultureProps, { createdAt?: Date }>,
    ) {
      this.props = {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      };
    }

    public get farmId(): string {
      return this.props.farmId;
    }
    
    public set farmId(value: string) {
      this.props.farmId = value;
    }

    public get cultureId(): number {
      return this.props.cultureId;
    }
    
    public set cultureId(value: number){
      this.props.cultureId = value;
    }

    public get createdAt(): Date {
      return this.props.createdAt;
    }
  
    public get updatedAt(): Date {
      return this.props.updatedAt;
    }
  
    public get deletedAt(): Date {
      return this.props.deletedAt;
    }
  
    public set updatedAt(value: Date) {
      this.props.updatedAt = value;
    }
  
    public set deletedAt(value: Date) {
      this.props.deletedAt = value;
    }
  }
  