import {
  IsDate,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidationArguments,
} from 'class-validator';

export class CreateTaskDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString({
    message: (args: ValidationArguments) => {
      return `Title must be string, got type=${typeof args.value}`;
    },
  })
  title: string;
  
  @IsString()
  @IsDefined()
  description: string;

  @IsInt()
  @Min(0)
  @Max(4)
  priority: number;

  @IsInt()
  @IsPositive()
  @IsDefined()
  employee_id: number;

  //@IsDate()
  deadline: Date | undefined;

  @IsInt()
  @IsPositive()
  @IsDefined()
  project_id: number;

  constructor(
    title: string,
    description: string,
    priority: number,
    employee_id: number,
    deadline: Date | undefined,
    project_id: number,
  ) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.employee_id = employee_id;
    this.deadline = deadline;
    this.project_id = project_id;
  }
}
