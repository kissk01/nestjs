import { IsIn } from 'class-validator';

export class AcceptRejectRequestDto {
  @IsIn(['accept', 'reject'])
  action: 'accept' | 'reject';
}
