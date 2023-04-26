import { IsOptional, IsString } from "class-validator";
import { IQuery } from "src/dto/query";

export class GetToDoDto {
  @IsString()
  @IsOptional()
  description: string;
}
