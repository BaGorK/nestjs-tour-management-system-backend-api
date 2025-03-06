import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffProviderService } from './providers/staff.provider.service';

@Module({
  controllers: [StaffController],
  providers: [StaffProviderService]
})
export class StaffModule {}
