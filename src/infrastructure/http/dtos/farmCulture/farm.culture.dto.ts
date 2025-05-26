import { IsUUID, IsNotEmpty } from 'class-validator';

export class FarmCultureDto {

  @IsUUID('4', { message: 'Farm ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Farm ID is required.' })
  farmId: string;

  @IsNotEmpty({ message: 'Culture ID is required.' })
  cultureId: number;
}
