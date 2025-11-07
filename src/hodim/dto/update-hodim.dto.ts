import { PartialType } from '@nestjs/mapped-types';
import { CreateHodimDto } from './create-hodim.dto';

export class UpdateHodimDto extends PartialType(CreateHodimDto) {}
