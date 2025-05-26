export interface FarmProps {
  id: string;
  cpfCnpj: string;
  producerName: string;
  farmName: string;
  city: string;
  state: string;
  totalAreaHa: number;
  arableAreaHa: number;
  vegetationAreaHa: number;
  createdAt: Date;
  updatedAt: Date;
}
