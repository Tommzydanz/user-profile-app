import { IResponse } from "@store/interface";

export interface BaseProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Profile extends BaseProfile {}

export interface ReadProfilePayload {
  id: number;
}

export interface UpdateProfilePayload {
  id: string;
  name: string;
  job: string;
}

export interface ReadProfileResponse extends IResponse {
  name(name: any): unknown;
  job(job: any): unknown;
  data: Profile;
}

export interface UpdateProfileResponse {
  name: string;
  job: string;
  createdAt: string;
}
