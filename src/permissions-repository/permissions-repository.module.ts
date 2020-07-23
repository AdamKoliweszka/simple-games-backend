import { Module } from '@nestjs/common';
import { PermissionsRepositoryService } from './permissions-repository.service';

@Module({
  providers: [PermissionsRepositoryService]
})
export class PermissionsRepositoryModule {}
