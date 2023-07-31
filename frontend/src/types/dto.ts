import { UserRole } from './auth.context';

export interface UserDto {
  userId: string;
  username: string;
  role: UserRole;
  email: string;
  registeredAt: Date;
}

export interface CompanyDto {
  companyId: number;
  companyName: string;
  companyRegistration: string;
  imageCompanyUrl: string;
  imageContentUrls: string[];
  body: string;
  address: string;
  sub_district: string;
  district: string;
  province: string;
  postCode: string;
  contact: string;
  tag: string[];
  userId: string;
}

export interface CompanyCardDto {
  companyId: number;
  companyName: string;
  imageCompanyUrl: string;
  imageContentUrls: string[];
  body: string;
  province: string;
  contact: string;
  tag: string[];
}

export interface PortfolioDto {
  portId: number;
  title: string;
  body: string;
  imageContents: string[];
  imageContentUrls: string[];
  tag: string[];
  address: string;
  sub_district: string;
  district: string;
  province: string;
  postCode: number;
  createAt: Date;
  updateAt: Date;

  companyId: string;
}

export interface CreadentialDto {
  accessToken: string;
}

export interface ErrorDto {
  statusCode: number;
  message: string;
  erorr: string;
}

export interface ProviceDto {
  id: number;
  name_th: string;
  name_en: string;
}

export interface AmphureDto {
  id: number;
  name_th: string;
  name_en: string;
  province_id: number;
}

export interface TambonDto {
  id: number;
  name_th: string;
  name_en: string;
  amphure_id: number;
}

export interface CommentDto {
  commentId: string;
  message: string;
  rating: number;
  userId: string;
  commentBy: {
    company: {
      companyName: string;
    }[];
    customer: {
      firstname: string;
    }[];
  };
}
