import { Module } from "@nestjs/common";
import { PermissionsRepositoryModule } from "src/permissions-repository/permissions-repository.module";
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [PermissionsRepositoryModule],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
