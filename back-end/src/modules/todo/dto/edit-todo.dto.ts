import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class EditTodoDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  isFinished: boolean;
}
