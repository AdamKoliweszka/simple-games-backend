import { Module } from '@nestjs/common';
import { TokensFabricService } from './tokens-fabric.service';

@Module({
  providers: [TokensFabricService]
})
export class TokensFabricModule {}
