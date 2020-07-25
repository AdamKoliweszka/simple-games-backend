import { Module } from "@nestjs/common";
import { PermissionsRepositoryService } from "./permissions-repository.service";
import { Permission, PermissionSchema } from "./schema/permission.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  providers: [PermissionsRepositoryService],
  exports: [PermissionsRepositoryService],
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
})
export class PermissionsRepositoryModule {}
