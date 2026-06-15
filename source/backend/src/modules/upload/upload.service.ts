import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('请选择文件');
    // In production, upload to OSS/COS and return URL
    // For local dev, save to local public directory
    return {
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}