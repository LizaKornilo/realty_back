import { JwtPayloadDto } from './../auth/dto/jwt-payload.dto';
import { Request } from "express";
import atob = require('atob');

export const getUserId = (req: Request): number => {
  const decodedJwtPayload = req.headers.authorization.split('.')[1];

  const jwtPayload: JwtPayloadDto = JSON.parse(atob(decodedJwtPayload));
  return Number(jwtPayload.sub);
}