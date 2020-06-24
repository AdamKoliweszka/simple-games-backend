import { Controller, Post, Body } from "@nestjs/common";
import { TokensService } from "./tokens.service";
import { CreateAccessTokenDto } from "./dto/create-access-token.dto";

@Controller("tokens")
export class TokensController {
  constructor(private tokensService: TokensService) {}

  @Post()
  create(@Body() createAccessTokenDto: CreateAccessTokenDto) {
    console.log(createAccessTokenDto);
    return this.tokensService.generateAccessToken(createAccessTokenDto);
  }
}
