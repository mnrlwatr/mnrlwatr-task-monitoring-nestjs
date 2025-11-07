import { PartialType } from '@nestjs/mapped-types';
import { CreateRahbarDto } from './create-rahbar.dto';

export class UpdateRahbarDto extends PartialType(CreateRahbarDto) {}
