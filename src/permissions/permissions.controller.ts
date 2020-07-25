import {
  Controller,
  Get,
  Req,
  Post,
  Delete,
  Param,
  Body,
  Res,
} from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { AddPermissionToUserDto } from "./dto/create-friend-relation.dto";
import { Response } from "express";

@Controller("permissions")
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}
  @Get()
  getAll(@Req() req) {
    let username = req.username;
    return this.permissionsService.getAllPermissions(username);
  }

  @Post()
  async addPermissionToUser(
    @Req() req,
    @Res() resp: Response,
    @Body() addPermissionToUserDto: AddPermissionToUserDto
  ) {
    try {
      let username = req.user.username;
      let result = await this.permissionsService.addPermissionToUser(
        username,
        addPermissionToUserDto.username,
        addPermissionToUserDto.permission
      );
      resp.status(201).json(result);
    } catch (e) {
      resp.status(422).json({ errors: e });
    }
  }

  @Delete(":id")
  removePermissionFromUser(@Req() req, @Param() params) {
    let username = req.username;
    // return this.permissionsService.addPermissionToUser(username, params.id);
  }
}
