import { Module } from "@nestjs/common";
import { TokensFabricService } from "./tokens-fabric.service";

@Module({
  providers: [TokensFabricService],
  exports: [TokensFabricService],
})
export class TokensFabricModule {}
